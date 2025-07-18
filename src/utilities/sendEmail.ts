import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';
import CustomError from '../app/errors';
import config from '../config';

// Define a type for the mail options
interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: any;
}

// Define the sendMail function
const sendMail = async ({ from, to, subject, html }: MailOptions): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.gmail_app_user,
        pass: config.gmail_app_password,
      },
    });

    const mailOptions: SendMailOptions = {
      from,
      to,
      subject,
      html,
    };

    // Wait for the sendMail operation to complete
    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    throw new CustomError.BadRequestError('Failed to send mail!');
  }
};

export default sendMail;
