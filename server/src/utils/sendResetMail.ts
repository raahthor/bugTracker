import axios from "axios";
import { env } from "./env";

export default async function sendResetMail(mailId: string, token: string) {
  const clientResetLink = `${env.CLIENT_URL}/reset-password?token=${token}`;
  const htmlForEmail = `<html>
                      <head>
                        <style>
                          body {
                            font-family: Arial, sans-serif;
                            background-color: #f9fafb;
                            margin: 0;
                            padding: 0;
                          }
                          .container {
                            max-width: 480px;
                            margin: 40px auto;
                            padding: 30px;
                            background: #ffffff;
                            border-radius: 12px;
                            box-shadow: 0 2px 6px rgba(0,0,0,0.08);
                            text-align: center;
                          }
                          .brand {
                            font-size: 18px;
                            font-weight: bold;
                            color: #2563eb;
                            margin-bottom: 20px;
                          }
                          h2 {
                            color: #111827;
                            margin-bottom: 16px;
                          }
                          p {
                            color: #374151;
                            line-height: 1.5;
                            margin: 8px 0;
                          }
                          .button {
                            display: inline-block;
                            margin: 20px 0;
                            padding: 14px 28px;
                            background-color: #2563eb;
                            color: #ffffff !important;
                            text-decoration: none;
                            font-weight: 600;
                            border-radius: 8px;
                            font-size: 15px;
                          }
                          .footer {
                            font-size: 12px;
                            color: #6b7280;
                            margin-top: 30px;
                          }
                        </style>
                      </head>
                      <body>
                        <div class="container">
                          <div class="brand">BugTracker SaaS</div>
                          <h2>Let's get you back in</h2>
                          <p>You requested to reset your password. Click the button below to create a new one.</p>
                          <a href="${clientResetLink}" class="button">Reset Password</a>
                          <p>If the button doesn't work, copy and paste this link into your browser:</p>
                          <p><a href="${clientResetLink}">${clientResetLink}</a></p>
                          <div class="footer">
                            This link will expire in 30 minutes.<br/>
                            Didn't request this? You can safely ignore this email.
                          </div>
                        </div>
                      </body>
                    </html>`;

  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Bug Tracker", email: "veersng1@gmail.com" },
        to: [{ email: mailId }],
        subject: "Reset your password",
        htmlContent: htmlForEmail,
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
