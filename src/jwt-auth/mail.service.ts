import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendResetPasswordEmail(email: string, token: string) {
    const resetLink = `http://localhost:3000/jwt-auth/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Password',
      html: `
        <h2>Reset Password</h2>
        <p>Click below to reset your password</p>

        <a href="${resetLink}">
          Reset Password
        </a>
      `,
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const verifyLink = `http://localhost:3000/jwt-auth/verify-email?token=${token}`;

    console.log('VERIFY EMAIL LINK:', verifyLink);

    return {
      message: 'Verification email simulated',
    };
  }
}
