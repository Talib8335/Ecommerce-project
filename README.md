# Ecommerce Project

This is a basic eCommerce platform project that follows the MVC architecture and implements a Role-Based Access Control (RBAC) design pattern. It also includes integration with a payment gateway to facilitate online transactions.

## Features

- Role-Based Access Control (RBAC)
- Single login & signup page for User and Admin
- Authentication and Authorization mechanisms using JWT session strategy
- Middleware for protected routes
- Added CLI-based authorization for administrators
- Payment gateway integration with Webhook
- Email services (Nodemailer)

## Tech Stack

### Front-End

![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)


### Back-End

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=nodemon&logoColor=white)

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `SMTP_MAIL`
- `SMTP_PASSWORD`

## Not Sure Where to Start? Run Locally

1. **Clone the Project**

    ```bash
    git clone https://github.com/Talib8335/Ecommerce-project.git
    ```

2. **Go to the Project Directory**

    ```bash
    cd ecom-api
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Start the Server**

    ```bash
    nodemon
    ```

5. **Generate Key to Signup as Admin**

    ```bash
    npm run ad256
    ```

6. **Add Generated Key in Local-Storage**

    ```bash
    ___as : Generated key
    ```

## Snapshort

### Signup Page
![Signup Page](https://github.com/user-attachments/assets/c63aac15-a94e-44d9-b95e-62b2e2e69f12)

### Login Page
![Login Page](https://github.com/user-attachments/assets/99066f30-1432-414d-8f59-ba9414b28111)

### Forgot Password
![Forgot Password](https://github.com/user-attachments/assets/3338a8fc-26fb-44c7-b8fb-a48b6a173927)

### Homepage
![Homepage](https://github.com/user-attachments/assets/638b6967-95aa-40b0-8dc1-f248f284ea1e)

### Admin Dashboard
![Admin Dashboard](https://github.com/user-attachments/assets/869dd549-0489-4b1e-802d-5bb2fa56590d)

### Admin Console Product Section
![Admin Console Product Section](https://github.com/user-attachments/assets/d9bcb6fa-9937-470e-8fa0-64ee7f2401bc)

### Admin Customer Section
![Admin Customer Section](https://github.com/user-attachments/assets/32ee559f-a9d7-4448-9238-746c49b535ed)

### Admin Orders Section
![Admin Orders Section](https://github.com/user-attachments/assets/17c5aa94-963d-4c4e-bc69-62f4f23a23f2)

### Admin Payment Section
![Admin Payment Section](https://github.com/user-attachments/assets/a21c274a-25eb-4ef4-825b-0a1a4c3a3835)

### Customer Dashboard
![Customer Dashboard](https://github.com/user-attachments/assets/eca0373e-bf8b-4714-9fa9-04e460e27d6d)

### Customer Checkout Page
![Customer Checkout Page](https://github.com/user-attachments/assets/a1634396-ffaa-45da-a769-5edb48882bf1)

### Customer Payment
![Customer Payment](https://github.com/user-attachments/assets/17e33382-c78b-44ad-a353-32e6af35b090)

### Customer Order Page
![Customer Order Page](https://github.com/user-attachments/assets/431361c7-542c-4c96-b21f-a6b49d277214)

### Customer Cart
![Customer Cart](https://github.com/user-attachments/assets/5dcecfd9-9e22-4d26-a091-8bd7e6f44f73)
