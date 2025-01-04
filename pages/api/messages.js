import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'json', 'prompts.json');

  try {
    switch (req.method) {
      case 'GET':
        const data = await fs.readFile(filePath, 'utf8');
        res.status(200).json(JSON.parse(data));
        break;

      case 'POST':
        await fs.writeFile(filePath, JSON.stringify(req.body, null, 2));
        res.status(200).json({ success: true });
        break;

      case 'DELETE':
        await fs.writeFile(filePath, JSON.stringify([], null, 2));
        res.status(200).json({ success: true });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}