# Windtell

Windtell est une application interactive autour des légendes, énigmes et événements de Nouvelle-Calédonie. Elle permet de tirer des cartes (énigmes, événements, master) pour animer des parties ou des ateliers ludiques.

## Démo en ligne

L’application est accessible ici : [https://windtell.vercel.app/](https://windtell.vercel.app/)

## Fonctionnalités

- Tirage aléatoire de cartes parmi trois catégories : énigmes, événements, master.
- Affichage des réponses et explications pour les énigmes.
- Gestion des cartes déjà tirées pour éviter les doublons.
- Interface responsive adaptée à tous les supports.

## Structure du projet

- `App.js` : Composant principal React Native.
- `cartes.json` : Données des cartes (énigmes, événements, master).
- `assets/` : Images et logos utilisés dans l’application.
- `webpack.config.js` : Configuration Webpack pour Expo.
- `package.json` : Dépendances et scripts.
- `.expo/`, `.vercel/` : Dossiers de configuration pour Expo et Vercel.

## Installation

```sh
npm install
```

## Lancement en local

```sh
npm start
```

Pour lancer sur Android, iOS ou Web :

```sh
npm run android
npm run ios
npm run web
```

## Export web (pour Vercel)

```sh
npm run build
```

Le dossier `web-build/` est généré et déployé automatiquement sur Vercel.

## Dépendances principales

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Vercel](https://vercel.com/)

## Auteur

© 2025 ELITZ. Tous droits réservés.

---

*Pour toute question ou suggestion, n’hésite pas à ouvrir une issue sur le repo.*
