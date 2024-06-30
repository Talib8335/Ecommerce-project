
# Ecommerce project

This is a basic eCommerce platform Project. The project follows the MVC architecture and implements a Role-Based Access Control (RBAC) design pattern. It also includes integration with a payment gateway to facilitate online transactions.


## Features

- Role Base Access Control (RBAC)
- single login & signup page for User and Admin
- Admin signup Security with AD256
- Payment Gateway Integration with Webhook
- Email services (Nodemailer)


## Tech Stack

**Front-End:** Html, Javascript, TailwindCSS

**Back-end:** Node, Express, MongoDB


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. 
Generate the Test Razorpay_key_id & key_secrete .

`RAZORPAY_KEY_ID` 

`RAZORPAY_KEY_SECRET`

`SMTP_MAIL`

`SMTP_PASSWORD`

## Run Locally

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
