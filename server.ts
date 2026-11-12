// Disable HMR in cloud preview environment
process.env.DISABLE_HMR = 'true';

import express, { Request, Response } from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to execute Python backend script with stdin payload
function runPythonContactBackend(action: 'submit' | 'list' | 'version', payload?: Record<string, unknown>): Promise<{ statusCode: number; data: unknown }> {
  return new Promise((resolve) => {
    const pythonScript = path.resolve(__dirname, 'backend', 'contact.py');
    const child = spawn('python3', [pythonScript, action]);

    let stdoutData = '';
    let stderrData = '';

    if (payload && action === 'submit') {
      child.stdin.write(JSON.stringify(payload));
      child.stdin.end();
    }

    child.stdout.on('data', (chunk) => {
      stdoutData += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderrData += chunk.toString();
    });

    child.on('close', (code) => {
      try {
        const json = JSON.parse(stdoutData.trim() || '{}');
        const statusCode = code === 0 ? 200 : (json.errors ? 400 : 500);
        resolve({ statusCode, data: json });
      } catch {
        resolve({
          statusCode: 500,
          data: {
            success: false,
            error: 'Failed to parse Python backend response',
            raw: stdoutData,
            stderr: stderrData,
          },
        });
      }
    });

    child.on('error', (err) => {
      resolve({
        statusCode: 500,
        data: {
          success: false,
          error: `Could not launch Python backend: ${err.message}`,
        },
      });
    });
  });
}

// ============================================================================
// API ROUTES (Python Backend Integration)
// ============================================================================

// Submit contact message to Python backend
app.post('/api/contact', async (req: Request, res: Response) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const payload = {
    ...req.body,
    ip: Array.isArray(ip) ? ip[0] : ip,
  };

  const { statusCode, data } = await runPythonContactBackend('submit', payload);
  res.status(statusCode).json(data);
});

// Retrieve messages stored in Python SQLite database
app.get('/api/contact/messages', async (_req: Request, res: Response) => {
  const { statusCode, data } = await runPythonContactBackend('list');
  res.status(statusCode).json(data);
});

// Health & runtime check
app.get('/api/health', async (_req: Request, res: Response) => {
  const pythonStatus = await runPythonContactBackend('version');
  res.json({
    status: 'ok',
    server: 'Express',
    pythonBackend: pythonStatus.data,
    timestamp: new Date().toISOString(),
  });
});

// ============================================================================
// VITE SPA INTEGRATION (Dev: vite.middlewares, Prod: dist/ static)
// ============================================================================
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (Python backend connected)`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
