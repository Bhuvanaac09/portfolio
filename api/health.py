from http.server import BaseHTTPRequestHandler
import json
import os
import sys
import sqlite3
from datetime import datetime

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        body = json.dumps({
            'status': 'ok',
            'server': 'Vercel Serverless Function (Python)',
            'pythonBackend': {
                'success': True,
                'python_version': sys.version,
                'sqlite_version': sqlite3.sqlite_version,
                'environment': 'vercel' if os.environ.get('VERCEL') else 'local',
            },
            'timestamp': datetime.utcnow().isoformat() + 'Z'
        }).encode('utf-8')

        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)
