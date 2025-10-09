import express from 'express';
import authController from '../controllers/auth.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Routes d'authentification des utilisateurs
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Crée un nouveau compte utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Alice
 *               lastName:
 *                 type: string
 *                 example: Dupont
 *               email:
 *                 type: string
 *                 example: alice.dupont@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Données invalides ou utilisateur déjà existant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 */
authRouter.post('/signup', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentifie un utilisateur et renvoie un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: alice.dupont@example.com
 *               password:
 *                 type: string
 *                 example: Password123!
 *               remember:
 *                 type: boolean
 *                 example: true
 *                 description: Si vrai, le token dure 7 jours au lieu de 24h
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *       400:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
authRouter.post('/login', authController.login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Récupère les informations de l'utilisateur connecté
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
authRouter.get('/me', requireAuth, authController.getCurrentUser);

/**
 * @swagger
 * /auth/email-taken:
 *   post:
 *     summary: Vérifie si l'email est déjà pris
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: alice.dupont@example.com
 *     responses:
 *       200:
 *         description: Email disponible
 *       409:
 *         description: Email déjà pris
 *       500:
 *         description: Erreur serveur
 */
authRouter.post('/email-taken', authController.emailTaken);

export default authRouter;
