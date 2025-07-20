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
      html: `<p>You've been invited to a collaborative whiteboard.</p>
             <p><a href="http://localhost:5173/whiteboard/${roomid}">Click here to join the whiteboard</a></p>`,
    });


    console.log("✅ Email sent:", result.response);

    res.send({ success: true });
  } catch (error) {
    console.error("❌ Error sending mail:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
