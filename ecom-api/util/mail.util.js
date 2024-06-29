const nodemailer = require("nodemailer")

const conn = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD
   }
})

const getHtml = (template, payload)=>{
   if(template === "paymentFailed")
   {
      return (
         `
            <!DOCTYPE html>
            <html lang="en">
            <head>
               <meta charset="UTF-8">
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
               <title>Email Template</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
               <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff;">
                  <tr>
                        <td align="center" style="padding: 40px 0; background-image: linear-gradient( 93.2deg, rgba(24,95,246,1) 14.4%, rgba(27,69,166,1) 90.8% );">
                           <h1 style="margin: 0; color: #ffffff; font-size: 24px;">${process.env.APP_NAME}</h1>
                        </td>
                  </tr>
                  <tr>
                        <td style="padding: 20px 30px;">
                           <h2 style="color: #333333;">Hello, ${payload.email.split("@")[0]}!</h2>
                           <p style="color: #666666; font-size: 16px; line-height: 1.5;">We noticed that your recent payment attempt failed for <span style="text-transform: capitalize; color: black; font-weight: bold">${payload.description}</span>. Please review your payment details and try again.</p>
                           <p style="color: #666666; font-size: 16px; line-height: 1.5;">If you have any questions or need assistance, feel free to reach out to our support team.</p>
                           <p style="color: #666666; font-size: 16px; line-height: 1.5;">Best Regards,</p>
                           <p style="color: #666666; font-size: 16px; line-height: 1.5;">${process.env.APP_NAME}</p>
                        </td>
                  </tr>

                  <tr>
                        <td align="center" style="padding: 20px;">
                           <img src="https://via.placeholder.com/150" alt="Product Image" style="display: block; border: 0; outline: none; text-decoration: none; max-width: 100%;">
                        </td>
                  </tr>
 
                  <tr>
                        <td align="center" style="padding: 20px;">
                           <a href="https://www.democompany.com/buy-now" style="background-color: #1e87f0; color: #ffffff; padding: 15px 25px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Buy Now</a>
                        </td>
                  </tr>

                  <tr>
                        <td align="center" style="padding: 30px 0; background-image: linear-gradient( 93.2deg, rgba(24,95,246,1) 14.4%, rgba(27,69,166,1) 90.8% );">
                           <p style="margin: 0; color: #ffffff; font-size: 14px;">&copy; 2024 DemoCompany. All rights reserved.</p>
                           <p style="margin: 0; color: #ffffff; font-size: 14px;">1234 Demo Street, Demo City, DS 56789</p>
                           <p style="margin: 0; color: #ffffff; font-size: 14px;">
                              <a href="https://www.democompany.com" style="color: #ffffff; text-decoration: none;">Visit our website</a> | 
                              <a href="mailto:info@democompany.com" style="color: #ffffff; text-decoration: none;">Contact Us</a>
                           </p>
                        </td>
                  </tr>
               </table>
            </body>
         </html>
         `
      )
   }

   if(template === "paymentSuccess")
   {
      return (
         `
             <!DOCTYPE html>
             <html lang="en">
             <head>
                 <meta charset="UTF-8">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <title>Email Template</title>
             </head>
             <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                 <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff;">
                     <!-- Header Section -->
                     <tr>
                         <td align="center" style="padding: 40px 0; background-image: linear-gradient( 93.2deg, rgba(24,95,246,1) 14.4%, rgba(27,69,166,1) 90.8% );">
                             <h1 style="margin: 0; color: #ffffff; font-size: 24px;">${process.env.APP_NAME}</h1>
                         </td>
                     </tr>
                     <!-- Body Section -->
                     <tr>
                         <td style="padding: 20px 30px;">
                             <h2 style="color: #333333;">Hello, ${payload.email.split("@")[0]}!</h2>
                             <p style="color: #666666; font-size: 16px; line-height: 1.5;">Thank you for your purchase! We are pleased to inform you that your order <span style="text-transform: capitalize; color: black; font-weight: bold">${payload.description}</span> was successful. We will send you the dispatch details soon.</p>
                             <p style="color: #666666; font-size: 16px; line-height: 1.5;">If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
                             <p style="color: #666666; font-size: 16px; line-height: 1.5;">Best Regards,</p>
                             <p style="color: #666666; font-size: 16px; line-height: 1.5;">${process.env.APP_NAME}</p>
                         </td>
                     </tr>
                     <!-- Product Image Section -->
                     <tr>
                         <td align="center" style="padding: 20px;">
                             <img src="https://via.placeholder.com/150" alt="Product Image" style="display: block; border: 0; outline: none; text-decoration: none; max-width: 100%;">
                         </td>
                     </tr>
                     <!-- Footer Section -->
                     <tr>
                         <td align="center" style="padding: 30px 0; background-image: linear-gradient( 93.2deg, rgba(24,95,246,1) 14.4%, rgba(27,69,166,1) 90.8% );">
                             <p style="margin: 0; color: #ffffff; font-size: 14px;">&copy; 2024 DemoCompany. All rights reserved.</p>
                             <p style="margin: 0; color: #ffffff; font-size: 14px;">1234 Demo Street, Demo City, DS 56789</p>
                             <p style="margin: 0; color: #ffffff; font-size: 14px;">
                                 <a href="https://www.democompany.com" style="color: #ffffff; text-decoration: none;">Visit our website</a> | 
                                 <a href="mailto:info@democompany.com" style="color: #ffffff; text-decoration: none;">Contact Us</a>
                             </p>
                         </td>
                     </tr>
                 </table>
             </body>
             </html>
     
         `
     )
   }

   return `<h1>Template is not available</h1>`
}

const sendMail = async (to, subject, template, payload=null)=>{
   const receipt = {
      from: process.env.SMTP_MAIL,
      to: to,
      subject: subject,
      html: getHtml(template, payload)
   }

   try {
      await conn.sendMail(receipt)
      return true
   }
   catch(err)
   {
      return false
   }
}

module.exports = sendMail