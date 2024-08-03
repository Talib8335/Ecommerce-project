
# Ecommerce project

This is a basic eCommerce platform Project. The project follows the MVC architecture and implements a Role-Based Access Control (RBAC) design pattern. It also includes integration with a payment gateway to facilitate online transactions.


## Features

- Role Base Access Control (RBAC)
- single login & signup page for User and Admin
- Admin signup Security with AD256
- Payment Gateway Integration with Webhook
- Email services (Nodemailer)


## Tech Stack

## Front-End

  ![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
  ![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)

## Back-End

 ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
 ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
 ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
 ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=nodemon&logoColor=white)



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. 
Generate the Test Razorpay_key_id & key_secrete .

`RAZORPAY_KEY_ID` 

`RAZORPAY_KEY_SECRET`

`SMTP_MAIL`

`SMTP_PASSWORD`

## Not sure where to start?  Run Locally

Clone the project

```bash
  git clone https://github.com/Talib8335/Ecommerce-project.git
```

Go to the project directory

```bash
  cd ecom-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon
```
Generate key to signup as Admin

```bash
  npm run ad256
```

Add Generated key in Local-Storage

```bash
  ___as : Generated key
```
## Screenshots
![Screenshot 2024-06-29 171038](https://github.com/Talib8335/Ecommerce-project/assets/173677170/2365483f-ec92-40cb-aca7-7661a518a0f2)

![Screenshot 2024-06-29 172749](https://github.com/Talib8335/Ecommerce-project/assets/173677170/b9b58ddd-0325-4521-9ced-1d04784e9fc6)

![Screenshot 2024-06-29 172840](https://github.com/Talib8335/Ecommerce-project/assets/173677170/d7995966-14b0-4081-886a-c7e0fa65ef66)
