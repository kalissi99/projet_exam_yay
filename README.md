# Gestion Approvisionnement (Projet TypeScript)

## Structure du projet

- `app.back` : Backend mocké avec JSON Server (TypeScript)
- `app.front` : Frontend Vite + TypeScript + Bootstrap

## Prérequis
- Node.js (v18 ou supérieur recommandé)

## Installation

### Backend
```bash
cd app.back
npm install
```

### Frontend
```bash
cd app.front
npm install
```

## Lancement

### 1. Lancer le backend (JSON Server)
```bash
cd app.back
npm run json-server
```
L’API sera disponible sur http://localhost:3000

### 2. Lancer le frontend (Vite)
```bash
cd app.front
npm run dev
```
Le site sera accessible sur http://localhost:5173 (ou le port affiché par Vite)

## Fonctionnalités
- **Nouveau** : Ajout d’un approvisionnement (sélection fournisseur, articles, quantités, prix)
- **Approvisionnement** : Liste des approvisionnements, recherche dynamique par référence

## Données de test
Des exemples de fournisseurs, articles et approvisionnements sont déjà présents dans `app.back/db.json`.

## Astuces
- Pour ajouter/supprimer des données, modifiez `db.json` ou utilisez le frontend.
- Le projet est 100% TypeScript, modulaire et simple à maintenir.

---
Projet réalisé selon les consignes (voir `instructions.txt`). 