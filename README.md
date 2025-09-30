# Windtell

Windtell is an interactive application centered around the legends, riddles, and events of New Caledonia. It allows you to draw cards (riddles, events, master) to animate games or fun workshops.

## Online Demo

The app is available here: [https://windtell.vercel.app/](https://windtell.vercel.app/)

## Features

- Random card drawing from three categories: riddles, events, master.
- Display of answers and explanations for riddles.
- Management of already drawn cards to avoid duplicates.
- Responsive interface suitable for all devices.

## Project Structure

- `App.js`: Main React Native component.
- `cartes.json`: Card data (riddles, events, master).
- `assets/`: Images and logos used in the app.
- `webpack.config.js`: Webpack configuration for Expo.
- `package.json`: Dependencies and scripts.
- `.expo/`, `.vercel/`: Configuration folders for Expo and Vercel.

## Installation

```sh
npm install
```

## Local Launch

```sh
npm start
```

To run on Android, iOS, or Web:

```sh
npm run android
npm run ios
npm run web
```

## Web Export (for Vercel)

```sh
npm run build
```

The `web-build/` folder is generated and automatically deployed on Vercel.

## Main Dependencies

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Vercel](https://vercel.com/)

## Author

© 2025 ELITZ. All rights reserved.

---

*For any questions or suggestions, feel free to open an issue on the repo.*
