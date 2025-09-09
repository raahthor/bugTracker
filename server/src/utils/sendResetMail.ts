import axios from "axios";
import { env } from "./env";

export default async function sendResetMail(mailId: string, token: string) {
  const clientResetLink = `${env.CLIENT_URL}/reset-password?token=${token}`;
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Bug Tracker", email: "veersng1@gmail.com" },
        to: [{ email: mailId }],
        subject: "Reset your password",
        htmlContent: `
        <p>Reset your password</p>
        <p><a href="${clientResetLink}">Click here to reset your password</a><p>
        <p>The link will expire in 30 minutes</p>
        `,
      },
      {
        headers: {
          "api-key": env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return {
      message: "Reset email sent successfully to your registered email",
    };
  } catch (err) {
    // console.error(err);
    return { message: "An error occured while sending email" };
  }
}
