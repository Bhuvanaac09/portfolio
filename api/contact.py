from http.server import BaseHTTPRequestHandler
import json
import os
import re
import sqlite3
from datetime import datetime

# In Vercel serverless environment, /tmp is the only writable directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
APP_DIR = os.path.dirname(BASE_DIR)
DATA_DIR = '/tmp' if os.environ.get('VERCEL') else os.path.join(APP_DIR, 'data')
os.makedirs(DATA_DIR, exist_ok=True)
DB_PATH = os.path.join(DATA_DIR, 'contacts.db')

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')


def init_db():
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


class handler(BaseHTTPRequestHandler):
    def _send_json(self, status_code, data):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            payload = json.loads(post_data.decode('utf-8')) if post_data else {}
        except Exception as e:
            self._send_json(400, {'success': False, 'error': f'Invalid JSON payload: {str(e)}'})
            return

        ip = self.headers.get('x-forwarded-for', self.client_address[0] if self.client_address else '127.0.0.1')
        payload['ip'] = ip.split(',')[0].strip() if ip else '127.0.0.1'

        errors, sanitized = validate_contact(payload)
        if errors:
            self._send_json(400, {
                'success': False,
                'errors': errors,
                'message': 'Validation failed'
            })
            return

        saved = save_contact(
            name=sanitized['name'],
            email=sanitized['email'],
            message=sanitized['message'],
            ip=sanitized['ip']
        )
        self._send_json(201, {
            'success': True,
            'message': f"Thank you, {saved['name']}! Your message has been saved by the Python backend.",
            'data': saved
        })

    def do_GET(self):
        init_db()
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute('SELECT id, name, email, message, created_at FROM contacts ORDER BY id DESC LIMIT 50')
        rows = [dict(r) for r in cursor.fetchall()]
        conn.close()
        self._send_json(200, {'success': True, 'count': len(rows), 'data': rows})
