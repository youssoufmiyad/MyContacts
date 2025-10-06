import express from "express";
import contactController from "../controllers/contact.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const contactRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Gestion des contacts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           example: 652a41e7b4b7f9c1a2c45d23
 *         firstName:
 *           type: string
 *           example: Jean
 *         lastName:
 *           type: string
 *           example: Dupont
 *         phone:
 *           type: string
 *           example: "+33 6 12 34 56 78"
 *         email:
 *           type: string
 *           example: jean.dupont@example.com
 *         slug:
 *           type: string
 *           example: jean-dupont
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Récupère la liste de tous les contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Liste de contacts récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       500:
 *         description: Erreur serveur
 */
contactRouter.get("/", contactController.getContacts);

/**
 * @swagger
 * /contacts/id/{id}:
 *   get:
 *     summary: Récupère un contact par son ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 */
contactRouter.get("/id/:id", contactController.getContactById);

/**
 * @swagger
 * /contacts/{slug}:
 *   get:
 *     summary: Récupère un contact par son slug
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug du contact
 *     responses:
 *       200:
 *         description: Contact trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 */
contactRouter.get("/:slug", contactController.getContactBySlug);

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Crée un nouveau contact
 *     tags: [Contacts]
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
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Alice
 *               lastName:
 *                 type: string
 *                 example: Martin
 *               phone:
 *                 type: string
 *                 example: "+33 7 55 44 33 22"
 *               email:
 *                 type: string
 *                 example: alice.martin@example.com
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact created successfully
 *                 contact:
 *                   $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Format d'email ou de téléphone invalide, ou email déjà utilisé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email format
 *       500:
 *         description: Erreur serveur
 */
contactRouter.post("/", contactController.addContact);

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Met à jour un contact existant
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à modifier
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: Bearer <token>
 *         description: Token JWT pour l'authentification
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: Pierre
 *               lastName:
 *                 type: string
 *                 example: Durand
 *               phone:
 *                 type: string
 *                 example: "+33 6 77 88 99 00"
 *               email:
 *                 type: string
 *                 example: pierre.durand@example.com
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Format d'email ou de téléphone invalide
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 */
contactRouter.patch("/:id", requireAuth, contactController.modifyContact);

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Supprime un contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact à supprimer
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *           example: Bearer <token>
 *         description: Token JWT pour l'authentification
 *         required : true
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact deleted successfully
 *       404:
 *         description: Contact non trouvé
 *       500:
 *         description: Erreur serveur
 */
contactRouter.delete("/:id", requireAuth, contactController.deleteContact);

export default contactRouter;
