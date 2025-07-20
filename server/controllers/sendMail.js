import nodemailer from "nodemailer";

export const sendMail = async (req, res) => {
  const { email, roomid } = req.body;

  if (!email || !roomid) {
    return res.status(400).json({ error: "Email and Room ID are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Join the Whiteboard Session",
      html: `
        <div style="font-family: Arial, sans-serif; background: #f7f8fa; padding: 32px;">
          <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 32px 24px;">
            <h2 style="color: #2563eb; margin-bottom: 12px;">You're Invited to a Collaborative Whiteboard!</h2>
            <p style="color: #222; font-size: 16px; margin-bottom: 24px;">
              Hello,<br/>
              You have been invited to join a real-time collaborative whiteboard session.
            </p>
            <a href="https://collaborative-white-board-six.vercel.app/whiteboard/${roomid}" 
               style="display: inline-block; padding: 12px 28px; background: #2563eb; color: #fff; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px; margin-bottom: 24px;">
              Join Whiteboard
            </a>
            <p style="color: #555; font-size: 14px; margin-top: 24px;">
              If the button above doesn't work, copy and paste this link into your browser:<br/>
              <span style="color: #2563eb;">https://collaborative-white-board-six.vercel.app/whiteboard/${roomid}</span>
            </p>
            <hr style="margin: 32px 0 16px 0; border: none; border-top: 1px solid #eee;">
            <div style="color: #aaa; font-size: 12px; text-align: center;">
              Collaborative Whiteboard &copy; ${new Date().getFullYear()}
            </div>
          </div>
        </div>
      `,
    });

    console.log("✅ Email sent:", result.response);

    res.send({ success: true });
  } catch (error) {
    console.error("❌ Error sending mail:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
