#!/usr/bin/env python3
"""
Python Backend for Chyavan Rohan's Portfolio Contact Form.
Handles input validation, SQLite persistence, and message querying.
Can be executed as a CLI command, via stdio JSON pipe, or as a standalone HTTP microservice.
"""

import sys
import os
import json
import re
import sqlite3
from datetime import datetime

# Database file location
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
APP_DIR = os.path.dirname(BASE_DIR)
DATA_DIR = os.path.join(APP_DIR, 'data')
os.makedirs(DATA_DIR, exist_ok=True)
DB_PATH = os.path.join(DATA_DIR, 'contacts.db')

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')


def init_db():
    """Initialize the SQLite contact messages table."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT,
            ip TEXT,
            created_at TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()


def validate_contact(data):
    """Validate contact form submission fields."""
    errors = {}

    name = str(data.get('name', '')).strip()
    if not name:
        errors['name'] = 'Name is required'
    elif len(name) < 2:
        errors['name'] = 'Name must be at least 2 characters'
    elif len(name) > 100:
        errors['name'] = 'Name must be under 100 characters'

    email = str(data.get('email', '')).strip()
    if not email:
        errors['email'] = 'Email is required'
    elif not EMAIL_REGEX.match(email):
        errors['email'] = 'Please enter a valid email address'
    elif len(email) > 150:
        errors['email'] = 'Email must be under 150 characters'

    message = str(data.get('message', '')).strip()
    if len(message) > 3000:
        errors['message'] = 'Message must be under 3000 characters'

    return errors, {
        'name': name,
        'email': email,
        'message': message,
        'ip': str(data.get('ip', '127.0.0.1'))
    }


def save_contact(name, email, message, ip='127.0.0.1'):
    """Save a validated message to SQLite."""
    init_db()
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    now_iso = datetime.utcnow().isoformat() + 'Z'

    cursor.execute('''
        INSERT INTO contacts (name, email, message, ip, created_at)
        VALUES (?, ?, ?, ?, ?)
    ''', (name, email, message, ip, now_iso))

    contact_id = cursor.lastrowid
    conn.commit()
    conn.close()

    return {
        'id': contact_id,
        'name': name,
        'email': email,
        'message': message,
        'created_at': now_iso
    }


def get_all_contacts(limit=50):
    """Retrieve saved messages ordered by latest first."""
    init_db()
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute('''
        SELECT id, name, email, message, created_at
        FROM contacts
        ORDER BY id DESC
        LIMIT ?
    ''', (limit,))

    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows


def handle_submit(payload):
    """Full submission workflow with validation and response formatting."""
    errors, sanitized = validate_contact(payload)
    if errors:
        return {
            'success': False,
            'errors': errors,
            'message': 'Validation failed'
        }, 400

    saved = save_contact(
        name=sanitized['name'],
        email=sanitized['email'],
        message=sanitized['message'],
        ip=sanitized.get('ip', '127.0.0.1')
    )

    return {
        'success': True,
        'message': f"Thank you, {saved['name']}! Your message has been saved by the Python backend.",
        'data': saved
    }, 201


def handle_cli():
    """Command line handler for subprocessing or testing."""
    init_db()
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'help'

    if cmd == 'submit':
        # Read JSON from stdin
        raw = sys.stdin.read()
        try:
            payload = json.loads(raw) if raw.strip() else {}
        except Exception as e:
            print(json.dumps({'success': False, 'error': f"Invalid JSON: {str(e)}"}))
            sys.exit(1)

        result, status = handle_submit(payload)
        print(json.dumps(result))
        sys.exit(0 if status in (200, 201) else 1)

    elif cmd == 'list':
        contacts = get_all_contacts()
        print(json.dumps({'success': True, 'count': len(contacts), 'data': contacts}))
        sys.exit(0)

    elif cmd == 'version':
        print(json.dumps({
            'success': True,
            'python_version': sys.version,
            'sqlite_version': sqlite3.sqlite_version,
            'db_path': DB_PATH
        }))
        sys.exit(0)

    else:
        print("Usage: python3 contact.py [submit|list|version]")
        sys.exit(1)


if __name__ == '__main__':
    handle_cli()
