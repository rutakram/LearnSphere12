exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
    return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Payment Confirmation</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
      
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }
      
              .logo {
                  max-width: 200px;
                  margin-bottom: 20px;
              }
      
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
      
              .cta {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #FFD60A;
                  color: #000000;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  font-weight: bold;
                  margin-top: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
              }
          </style>
      
      </head>
      
     <body>
          <div class="container">
              <a href="LearnSphere"><img class="logo" src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-bc6c-51f7-b409-6dc8e376ba71/raw?se=2025-04-25T16%3A13%3A24Z&sp=r&sv=2024-08-04&sr=b&scid=a07ee037-ea13-52b1-b40d-ff0215ce8acb&skoid=ac1d63ad-0c69-4017-8785-7a50eb04382c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-25T00%3A04%3A35Z&ske=2025-04-26T00%3A04%3A35Z&sks=b&skv=2024-08-04&sig=f/tZ2eaa0xpA2RtkLaq6yz%2BFqRb/j3fo//y/lYK5Pb0%3D"
                      alt="LearnSphere Logo"></a>
              <div class="message">Course Payment Confirmation</div>
              <div class="body">
                  <p>Dear ${name},</p>
                  <p>We have received a payment of <span class='highlight'>₹${amount}</span></p>.
                  <p>Your Payment ID is <b>${paymentId}</b></p>
                  <p>Your Order ID is <b>${orderId}</b></p>
              </div>
              <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                      href="mailto:info@learnsphere.com">info@learnsphere.com</a>. We are here to help!</div>
          </div>
      </body>
      
      </html>`
  }
  //https://studynotion-frontend-olive-sigma.vercel.app/