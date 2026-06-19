const express    = require('express');
const router     = express.Router();
const rateLimit  = require('express-rate-limit');
const nodemailer = require('nodemailer');
const Contact    = require('../models/Contact');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages sent. Please try again later.' }
});

const createTransporter = () => nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/', limiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ error: 'Name, email, and message are required.' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ error: 'Invalid email address.' });

    if (require('mongoose').connection.readyState === 1) {
      const contact = new Contact({ name, email, subject, message });
      await contact.save();
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();

        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          replyTo: email,
          subject: `New Message: ${subject || 'Portfolio Contact'} — from ${name}`,
          html: `
            <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0F0F1E;color:#E0E0F0;border-radius:12px;overflow:hidden;">
              <div style="background:linear-gradient(135deg,#7C3AED,#06B6D4);padding:28px 32px;">
                <h2 style="margin:0;color:#fff;font-size:1.3rem;font-weight:700;">New Portfolio Message</h2>
                <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:0.9rem;">Someone reached out via your portfolio</p>
              </div>
              <div style="padding:32px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#888;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em;width:100px;">Name</td>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#E0E0F0;font-weight:500;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#888;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em;">Email</td>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);"><a href="mailto:${email}" style="color:#06B6D4;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#888;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em;">Subject</td>
                    <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#E0E0F0;">${subject || '—'}</td>
                  </tr>
                </table>
                <div style="margin-top:24px;">
                  <p style="color:#888;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;">Message</p>
                  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:18px;color:#E0E0F0;line-height:1.7;white-space:pre-wrap;">${message}</div>
                </div>
                <div style="margin-top:28px;">
                  <a href="mailto:${email}?subject=Re: ${subject || 'Your message'}" style="display:inline-block;background:linear-gradient(135deg,#7C3AED,#06B6D4);color:#fff;font-weight:600;padding:12px 28px;border-radius:999px;text-decoration:none;font-size:0.9rem;">Reply to ${name}</a>
                </div>
              </div>
              <div style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.06);color:#444;font-size:0.75rem;">
                Sent from your portfolio contact form
              </div>
            </div>
          `,
        });

        await transporter.sendMail({
          from: `"Soyal Chawhan" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: `Got your message, ${name}!`,
          html: `
            <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0F0F1E;color:#E0E0F0;border-radius:12px;overflow:hidden;">
              <div style="background:linear-gradient(135deg,#7C3AED,#06B6D4);padding:28px 32px;">
                <h2 style="margin:0;color:#fff;font-size:1.3rem;font-weight:700;">Thanks for reaching out!</h2>
              </div>
              <div style="padding:32px;">
                <p style="color:#E0E0F0;line-height:1.75;">Hi <strong>${name}</strong>,</p>
                <p style="color:#888;line-height:1.75;margin-top:12px;">
                  I've received your message and will get back to you within
                  <strong style="color:#06B6D4;">24 hours</strong>.
                </p>
                <p style="color:#888;line-height:1.75;margin-top:24px;">— Soyal Chawhan<br/>Full Stack Developer</p>
              </div>
            </div>
          `,
        });

      } catch (emailErr) {
        console.error('Email sending failed:', emailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: `Thanks ${name}! Your message is received. I'll reply within 24 hours.`
    });

  } catch (err) {
    console.error('Contact route error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;