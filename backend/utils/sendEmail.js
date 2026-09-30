import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Use Ethereal for testing if no real credentials are provided
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
    port: process.env.EMAIL_PORT || 587,
    auth: {
      user: process.env.EMAIL_USER || 'test@ethereal.email',
      pass: process.env.EMAIL_PASS || 'password',
    },
  });

  const mailOptions = {
    from: 'Elyon E-Commerce <noreply@elyonecommerce.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${options.email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
