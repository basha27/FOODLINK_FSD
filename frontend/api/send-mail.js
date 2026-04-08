import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS Headers to allow Secure Render Connection
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { to, subject, html, user, pass } = req.body;

  if (!user || !pass || !to || !subject || !html) {
    return res.status(400).json({ error: 'Missing required secure parameters' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, 
      auth: { user, pass }
    });

    const info = await transporter.sendMail({
      from: `"Food Link Enterprise" <${user}>`,
      to,
      subject,
      html
    });

    res.status(200).json({ success: true, message: 'Email forcefully dispatched via Vercel Network', infoId: info.messageId });
  } catch (error) {
    console.error('Vercel Email Sender Critial Error:', error);
    res.status(500).json({ error: error.message });
  }
}
