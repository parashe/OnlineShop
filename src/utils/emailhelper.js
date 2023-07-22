const nodemailer = require("nodemailer");

// Create a nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use the email service you want to use (e.g., Gmail, Outlook, etc.)
  auth: {
    user: "parash.giri11@gmail.com", // Replace with your email
    pass: "Barsha@1998-04-14", // Replace with your email password
  },
});

// Helper function to send the password reset email
const sendPasswordResetEmail = (email, resetToken) => {
  // Compose the email
  const mailOptions = {
    from: "parash.giri11@gmail.com", // Replace with your email
    to: email, // Recipient's email address
    subject: "Password Reset",
    html: `<p>Click the following link to reset your password:</p>
          <p><a href="http://your_website.com/reset-password/${resetToken}">Reset Password</a></p>
          <p>This link will expire in 1 hour.</p>`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendPasswordResetEmail;
