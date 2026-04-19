import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

console.log("📨 Email config loading for:", process.env.GMAIL_USER);

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error.message);
  } else {
    console.log("🚀 SMTP Server is ready to send emails");
  }
});

export const sendOTPEmail = async (to: string, otp: string): Promise<void> => {
  try {
    const info = await transporter.sendMail({
      from: `"No Reply" <${process.env.GMAIL_USER}>`,
      to,
      subject: "Your OTP Code",
      html: `
        <div style="font-family:sans-serif;max-width:400px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px">
          <h2 style="color:#02B290;margin-bottom:8px">Verify Your Email</h2>
          <p style="color:#6b7280;margin-bottom:24px">Use the OTP below to complete your request. It expires in <strong>10 minutes</strong>.</p>
          <div style="background:#f3faf8;border:1px solid #02B290;border-radius:6px;padding:16px;text-align:center;font-size:32px;font-weight:bold;letter-spacing:12px;color:#02B290">
            ${otp}
          </div>
          <p style="color:#9ca3af;font-size:12px;margin-top:24px">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    throw error;
  }
};