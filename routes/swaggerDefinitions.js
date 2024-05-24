// USER SCHEMA

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *           example: 'voosh_foods'
 *         email:
 *           type: string
 *           description: The user's email
 *           example: 'richa@voosh.in'
 *         password:
 *           type: string
 *           description: The user's password
 *           example: 'secret_password123!'
 *         profile:
 *           type: object
 *           properties:
 *             photo:
 *               type: string
 *               description: The user's profile photo's URL
 *               example: 'https://media.licdn.com/dms/image/D4E35AQHX-1_f35VXHA/profile-framedphoto-shrink_400_400/0/1710848410690?e=1717156800&v=beta&t=f1oBk9wpmF75v3FW33ZyOTTCr1qJjGbap1EVps6_KB8'
 *             name:
 *               type: string
 *               description: The user's name
 *               example: Voosh
 *             bio:
 *               type: string
 *               description: The user's bio
 *               example: 'Effortlessly maximize your third-party delivery earnings!'
 *             phone:
 *               type: string
 *               description: The user's phone number
 *               example: 8302839284
 *             isPublic:
 *               type: boolean
 *               description: Whether the user's profile is public
 *         role:
 *           type: string
 *           description: The user's role
 *           enum: [user, admin]
 *         googleId:
 *           type: string
 *           description: The user's Google ID if Sign in with Google is used
 *           example: '112541333833512227133'
 *       required:
 *         - username
 *         - email
 *         - password
 */


// REGISTRATION
/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegistration:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: A JWT for the registered user
 *       400:
 *         description: User already exists
 *       500:
 *         description: There was a server error
 */


// LOGIN

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLoginWithEmail:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *           example: 'richa@voosh.in'
 *         password:
 *           type: string
 *           description: The user's password
 *           example: 'secret_password123!'
 *     UserLoginWithUsername:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *           example: 'voosh_foods'
 *         password:
 *           type: string
 *           description: The user's password
 *           example: 'secret_password123!'
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/UserLoginWithEmail'
 *               - $ref: '#/components/schemas/UserLoginWithUsername'
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: A JWT for the logged in user
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: There was a server error
 */

// Get PROFILE

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * /api/users/profile:
 *   get:
 *     summary: Get the profile of the user sending the request or of another user by supplying username query parameter
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *         description: The username of the user you want to find
 *     responses:
 *       200:
 *         description: The user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: User not found or Private Profile
 *       500:
 *         description: There was a server error
 */

// UPDATE PROFILE

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Update the profile of the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 description: The URL of the user's profile photo
 *               name:
 *                 type: string
 *                 description: The user's name
 *               bio:
 *                 type: string
 *                 description: The user's bio
 *               phone:
 *                 type: string
 *                 description: The user's phone number
 *               isPublic:
 *                 type: boolean
 *                 description: The user's profile visibility
 *     responses:
 *       200:
 *         description: The updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         email:
 *           type: string
 *           description: The user's email
 *         bio:
 *           type: string
 *           description: The user's bio
 *         isPublic:
 *           type: boolean
 *           description: The user's profile visibility
 */
