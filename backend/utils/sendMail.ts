import * as nodemailer from 'nodemailer';

export const sendMail = async (email: string, code: string) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.email,
      pass: process.env.pass
    },
  });

  await transporter.sendMail({
    from: process.env.email,
    to: email,
    subject: 'Digit code',
    text: `${code}`,
  });
};
