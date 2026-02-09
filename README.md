# Zubale Mobile Challenge - Task Execution App

An **Offline-First** mobile application built with **React Native (Expo)**, designed to handle task execution in low-connectivity environments.

## 🚀 Features

- **Offline-First Architecture:** Tasks are stored locally using SQLite. The app works 100% without internet.
- **Background Synchronization:** Uses `expo-background-task` to sync completed tasks even when the app is closed or in the background.
- **Conflict Resolution:** Implements a "Local-Wins" strategy. If a task is audited locally, server updates won't overwrite the user's work until synced.
- **Reactive UI:** Real-time feedback using Redux Toolkit and Optimistic Updates.

## 🏗 Architecture

The project follows a **Feature-Based Architecture** combined with **Clean Architecture** principles to ensure scalability and testability.

### Folder Structure (`src/`)

- **`features/`**: Contains the core business logic (Redux Slices, Repositories, Hooks).
  - `tasks/`: Handles task logic, SQLite interactions, and state management.
- **`services/`**: External dependencies (API, Database, Background Jobs).
- **`screens/`**: UI Components organized by screen (TaskList, TaskDetail).
- **`models/`**: TypeScript interfaces and DTOs.
- **`store/`**: Redux store configuration.
- **`navigation/`**: Navigation configuration.
- **`components/`**: Reusable UI components.
- **`styles/`**: Global styles and constants.
- **`utils/`**: Utility functions.

### Key Decisions

1.  **State Management:** **Redux Toolkit** was chosen for its predictable state container and easy debugging.
2.  **Local Database:** **Expo SQLite** provides a robust SQL engine for complex queries and data persistence.
3.  **Sync Strategy:** A custom `SyncManager` monitors network connectivity and app state to trigger synchronization automatically without blocking the UI.

## 🛠 Tech Stack

- **Framework:** React Native (Expo SDK 52)
- **Language:** TypeScript
- **State:** Redux Toolkit
- **Persistence:** expo-sqlite
- **Background Tasks:** expo-background-task & expo-task-manager
- **Navigation:** React Navigation

## 📱 How to Run

1.  **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Run on iOS/Android:**
    ```bash
    npx expo start
    ```
    _Note: For Background Sync testing on iOS, a real device is recommended, although the logic includes a simulation trigger._

## ✅ Bonus Points Achieved

- [x] **Conflict Resolution:** The `TaskRepository` checks the `sync_status` before merging remote data to prevent data loss.
- [x] **Background Sync:** Implemented a background task that wakes up the app (minimum interval ~15 min) to upload pending audits.
- [x] **Performance:** Optimized `FlatList` with memoized components to ensure 60fps scrolling.

---

**Developed by:** [Julian Andres Rodriguez]
