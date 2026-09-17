import { kv } from '@vercel/kv';

const KEY = 'mesas_diego_angie_state';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const state = await kv.get(KEY);
      res.status(200).json(state || null);
      return;
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!body || !Array.isArray(body.mesas)) {
        res.status(400).json({ error: 'Formato inválido: se espera { mesas: [...], assign: {...} }' });
        return;
      }
      await kv.set(KEY, body);
      res.status(200).json({ ok: true });
      return;
    }

    res.setHeader('Allow', 'GET, POST');
    res.status(405).json({ error: 'Método no permitido' });
  } catch (err) {
    console.error('Error en /api/mesas:', err);
    res.status(500).json({ error: 'Error interno', detail: String(err && err.message || err) });
  }
}
