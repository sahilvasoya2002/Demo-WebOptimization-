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

## 📂 Folder Structure

The project follows a feature-based (or domain-driven) architecture to maintain modularity, scalability, and clean code separation. Below is the directory map of the `src/` folder:

```text
src/
├── api/                  # Global API client configuration and network service calls
│   ├── client.ts         # Axios/Fetch client configuration
│   └── services.ts       # Service methods for Rick and Morty API endpoints
├── assets/               # Static visual media assets (images, icons)
├── components/           # Reusable generic UI components (UI kit / primitives)
│   ├── skeleton/         # Shared skeleton loaders
│   └── ...               # BrutalBox, RemoteImage, ErrorBoundary, etc.
├── db/                   # Local database configuration (SQLite initialization)
├── features/             # Domain-specific modules
│   ├── characters/       # Characters feature (cards, filters, hooks, screens)
│   ├── episodes/         # Episodes feature (modals, list items, hooks, screens)
│   ├── favourites/       # Favourites feature (favorite screen)
│   └── locations/        # Locations feature (rows, hooks, screens)
├── hooks/                # App-wide custom React hooks (scroll tracking, debouncing, etc.)
├── navigation/           # Routing configuration, navigators, and type definitions
├── store/                # Global Redux state management (slices, store configuration)
├── theme/                # Global theme configuration (typography, colors, layouts)
├── types/                # App-wide TypeScript interfaces and type definitions
└── utils/                # Helper utility files (responsiveness, error boundaries, URL helpers)
```

### Architectural Decisions & Folder Structure Justifications

To ensure clean code boundaries and ease of maintenance, the codebase employs the following architectural paradigms:

1. **Feature-Based Domain Isolation (`src/features`)**:
   Instead of grouping all files of the same type (like screens or hooks) globally, code is organized by features (e.g., `characters`, `episodes`). Each feature has its own `components/`, `hooks/`, and `screens/`. This ensures that domain-specific components/hooks do not pollute the global namespace and makes it easy to refactor or remove entire features.
   
2. **Separation of Generic vs. Feature-Specific UI (`src/components` vs. `src/features/*/components`)**:
   - **Shared Components**: Primitive layout or design system blocks (e.g., `BrutalBox`, `BrutalScreenHeader`, `RemoteImage`) are placed in the root `/components` folder because they are used app-wide.
   - **Feature Components**: Components that are domain-dependent (like `CharacterCard` or `EpisodeCharactersModal`) are located inside their specific feature components folder to keep the architecture clean and decoupled.

3. **Global State Integration (`src/store`)**:
   Redux stores the global UI states (like filters and favorites cache) in a central location (`src/store`) rather than inside separate feature folders. This provides a single, unified store instance and avoids circular dependency loops between different features.

4. **Persistence Layer Isolation (`src/db`)**:
   SQLite setup and direct execution blocks are abstracted into `src/db`. By decoupling the local storage driver from both features and Redux, the persistence engine can be updated or swapped with minimal code modification.

## Libraries Used
- **@op-engineering/op-sqlite** - Local SQLite database to save favorites.
- **@d11/react-native-fast-image** - High-performance image rendering and caching.
- **@tanstack/react-query** - Async state management and data fetching.
- **@reduxjs/toolkit** - Global state management.
- **@react-navigation/native** - Screen routing and navigation.

## Known Issues / Limitations
- **Local Caching Only**: Favourites are stored strictly on-device in a local SQLite database and do not sync to a server.
- **Cloudflare Rate Limiting (HTTP 429 / Error 1015)**: The Rick and Morty API is protected by Cloudflare. Fast or frequent queries (such as rapid scrolling through character feeds or loading large rosters) can trigger Cloudflare Error 1015 (`You are being rate-limited by the website owner's configuration.`). When this occurs, wait at least 30 seconds before retrying.

