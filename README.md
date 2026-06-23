# DemoApp

A React Native application for exploring characters, locations, and episodes from the Rick and Morty API, featuring a Neo-Brutalist design.

*Requires Node.js `>= 22.11.0` (tested on `v24.15.0`)*
*Tested on physical Android device or emulator with API level 29+*

## 🚀 Setup Steps

### 1. Install Dependencies
```sh
npm install
```

### 2. Run Android
```sh
npm run android
```

### 3. Run iOS
```sh
cd ios && pod install
cd ..
npm run ios
```

## Libraries Used
- **@op-engineering/op-sqlite** - Local SQLite database to save favorites.
- **@d11/react-native-fast-image** - High-performance image rendering and caching.
- **@tanstack/react-query** - Async state management and data fetching.
- **@reduxjs/toolkit** - Global state management.
- **@react-navigation/native** - Screen routing and navigation.

## Known Issues / Limitations
- **Local Caching Only**: Favourites are stored strictly on-device in a local SQLite database and do not sync to a server.
- **Cloudflare Rate Limiting (HTTP 429 / Error 1015)**: The Rick and Morty API is protected by Cloudflare. Fast or frequent queries (such as rapid scrolling through character feeds or loading large rosters) can trigger Cloudflare Error 1015 (`You are being rate-limited by the website owner's configuration.`). When this occurs, wait at least 30 seconds before retrying.
