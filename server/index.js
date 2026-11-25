import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { properties, getProperty } from '../src/data/properties.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 8000;
const STORAGE_DIR = process.env.STORAGE_DIR || path.join(__dirname, 'storage');

const app = express();
app.use(express.json({ limit: '128kb' }));

const isEmail = (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
const clean = (value, max = 2000) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

async function appendRecord(collection, record) {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
  const file = path.join(STORAGE_DIR, `${collection}.json`);
  let list = [];
  try {
    list = JSON.parse(await fs.readFile(file, 'utf8'));
  } catch {
    list = [];
  }
  list.push(record);
  await fs.writeFile(file, JSON.stringify(list, null, 2));
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/properties', (req, res) => {
  const featuredOnly = req.query.featured === 'true';
  res.json(featuredOnly ? properties.filter((property) => property.featured) : properties);
});

app.get('/api/properties/:slug', (req, res) => {
  const property = getProperty(req.params.slug);
  if (!property) return res.status(404).json({ error: 'Property not found.' });
  res.json(property);
});

app.post('/api/inquiries', async (req, res) => {
  const body = req.body || {};
  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 2000);
  const kind = body.kind === 'viewing' ? 'viewing' : 'contact';
  const propertySlug = clean(body.propertySlug, 120);

  if (!name) return res.status(400).json({ error: 'Please tell us your name.' });
  if (!isEmail(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (kind === 'viewing' && !clean(body.preferredDate, 40)) {
    return res.status(400).json({ error: 'Please choose a preferred date.' });
  }
  if (propertySlug && !getProperty(propertySlug)) {
    return res.status(400).json({ error: 'Unknown property.' });
  }

  const record = {
    id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    kind,
    name,
    email,
    phone,
    message,
    propertySlug: propertySlug || null,
    preferredDate: clean(body.preferredDate, 40) || null,
    preferredTime: clean(body.preferredTime, 40) || null,
    createdAt: new Date().toISOString(),
  };

  try {
    await appendRecord('inquiries', record);
    res.status(201).json({ ok: true, id: record.id });
  } catch (error) {
    console.error('Failed to store inquiry', error);
    res.status(500).json({ error: 'We could not send your message. Please try again.' });
  }
});

app.post('/api/newsletter', async (req, res) => {
  const email = clean(req.body?.email, 160);
  if (!isEmail(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  try {
    await appendRecord('subscribers', { email: email.toLowerCase(), createdAt: new Date().toISOString() });
    res.status(201).json({ ok: true });
  } catch (error) {
    console.error('Failed to store subscriber', error);
    res.status(500).json({ error: 'Subscription failed. Please try again.' });
  }
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Horizon Properties API listening on ${PORT}`);
});
