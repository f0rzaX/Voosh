# VOOSH Backend Assignment

This is an API for user authentication and profile management, supporting both traditional email/password authentication and Google OAuth authentication. The API is built using Node.js, Express, Mongoose.

## Features

- User registration with email and password
- User login with email and password
- User profile management
- Google OAuth authentication
- JWT-based authentication and authorization
- Middleware for protected routes
- Swagger documentation

## Deployment

The API is deployed at: [http://ec2-3-110-127-251.ap-south-1.compute.amazonaws.com:3000](http://ec2-3-110-127-251.ap-south-1.compute.amazonaws.com:3000)

To facilitate the evaluation of the APIs, I recommend using Swagger dashboard. You can access it via the following link:
[Swagger Dashboard](http://ec2-3-110-127-251.ap-south-1.compute.amazonaws.com:3000/docs)

## Admin Credentials for Testing

- Username: admin
- Email: admin@email.com
- Password: admin


## Note on Google OAuth Testing

Google's OAuth service requires that test users be added to a whitelist in the Google Cloud Console. This is a security measure to prevent unauthorized use of the OAuth credentials.

If you wish to test the Google OAuth functionality, please provide your Google email ID. I will then add your email to the 'Test Users' list in the Google Cloud Console. Once your email is added, you will be able to authenticate using Google OAuth.

Please note that without this step, Google's OAuth service will not allow you to authenticate using the test credentials.