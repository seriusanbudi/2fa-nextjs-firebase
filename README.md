Quick example for 2FA using nextjs, node-2fa and firebase

Requirement:

- Firebase auth (email)
- Firebase firestore

How to install:

- Clone this repo
- run `npm install`
- run `npm run dev` and open localhost:3000

App Flow:

1. Create account
2. Signin using your account
3. Activate 2FA and follow the instruction
4. Signout and try to login using user that already setup the 2FA
