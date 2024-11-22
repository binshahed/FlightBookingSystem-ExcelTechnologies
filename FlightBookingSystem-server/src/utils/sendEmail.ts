
import nodemailer from 'nodemailer';
import config from '../app/config';

export const sendEmail = async (receiverEmail: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Use 587 for STARTTLS, or 465 for SSL
      secure: config.nodeEnv === 'production',  // Set to false for STARTTLS
      auth: {
        user: 'shahed.emsl@gmail.com',
        pass: 'invp lydk wubo yakf', // App Password (not the Gmail password)
      },
    });

    // Send email with defined transport object
    await transporter.sendMail({
      from: 'shahed.emsl@gmail.com',
      to: receiverEmail,
      subject: 'Flight Booking Info',
      text: 'Hello world?', // plain text body
      html, // HTML body
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
