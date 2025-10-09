# MyContact

## Objectif

Développer une application web **fullstack JavaScript** (React + Node/Express + MongoDB) permettant à chaque utilisateur de gérer son carnet de contacts personnel.

L’application doit être sécurisée par une authentification JWT et offrir un CRUD complet sur les contacts.

## Structure du projet

- **client/** : Coté frontend de l'application développé avec React (vite)
- **server/** : Coté backend, API Node.js/Express liée à une base de données MongoDB

## Fonctionnalités

- Authentification utilisateur (JWT)
- Gestion des contacts (création, lecture, modification, suppression)
- Protection des routes sensibles (middleware requireAuth)
- Recherche de contact par mail / nom / numéro
- Documentation interactive avec Swagger

## Installation

### Backend

#### Variables d'environements
à mettre dans le .env à la racine du dossier server
```bash
DATABASE_URL=<url de connexion mongodb>
JWT_SECRET=<jwt_secret>
PORT=3000
```

#### Commandes de lancement

```bash
cd server
npm install
npm run start
```

Les call http seront à faire à l'adresse suivante : [http://localhost:3000/mycontacts](http://localhost:3000/mycontacts) (3000 par défaut, en fonction de la variable PORT)
La documentation Swagger : [http://localhost:3000/mycontacts/api-docs](http://localhost:3000/mycontacts/api-docs/)

### Frontend

#### Variable d'environnement
à mettre dans le .env à la racine du dossier client
```bash
VITE_API_URL=<url de l'api>
```

#### Commandes de lancement
Pour le développement :
```bash
cd client
npm install
npm run dev
```
L’application React sera disponible sur [http://localhost:5173](http://localhost:5173)

Pour le déploiement : 
```bash
cd client
npm install
npm run build
```

## Lien démo

[https://mycontacts-frontend-679f.onrender.com/](https://mycontacts-frontend-679f.onrender.com/)

## Technologies

- Node.js / Express
- MongoDB Atlas
- React (vite)
- Swagger
- JWT / bcrypt
- jest
