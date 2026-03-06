# ClaudiusAuthApp

A React Native 0.84+ authentication application built with TypeScript, featuring Login, Signup, Loading, and Home screens with local authentication state management.

## Features

- **User Authentication**: Complete login and signup flow with form validation
- **TypeScript**: Fully typed codebase with strict TypeScript configuration
- **React Navigation v7**: Native stack navigation with auth-conditional routing
- **Context API**: Centralized authentication state management with loading states
- **AsyncStorage**: Session persistence for logged-in users
- **Form Validation**: Inline error messages for all form fields
- **Password Visibility Toggle**: Eye icon to show/hide passwords
- **Modern UI**: Clean, responsive design with Material Icons and FontAwesome
- **Reusable Components**: Custom AppButton, AppText, and AppTextInput components
- **Loading States**: Dedicated loading screen for authentication state restoration
- **Illustrations**: External image assets for login and signup screens
- **New Architecture**: React Native 0.84+ with New Architecture enabled

## Tech Stack

| Technology | Version |
|------------|---------|
| React Native | 0.84.1 |
| React | 19.2.3 |
| TypeScript | 5.8.3 |
| React Navigation | v7.1.33 |
| AsyncStorage | @react-native-async-storage/async-storage ^3.0.1 |
| Vector Icons | @react-native-vector-icons/* ^12.4.0 |
| Safe Area Context | react-native-safe-area-context ^5.5.2 |
| Screens | react-native-screens ^4.24.0 |
| Node.js | >= 22.11.0 |

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── AppButton.tsx         # Reusable button component with variants
│   │   ├── AppText.tsx           # Reusable text component with variants
│   │   └── AppTextInput.tsx     # Reusable text input with icons and validation
│   ├── config/
│   │   └── assets.ts             # External image assets configuration
│   ├── context/
│   │   └── AuthContext.tsx       # Auth context + provider + useAuth hook
│   ├── screens/
│   │   ├── LoadingScreen.tsx     # Loading screen for auth state restoration
│   │   ├── LoginScreen.tsx       # Login form, validation, error display
│   │   ├── SignupScreen.tsx      # Signup form, validation, error display
│   │   └── HomeScreen.tsx        # User info display + logout
│   ├── navigation/
│   │   └── AppNavigator.tsx      # Auth-conditional native stack navigator
│   ├── utils/
│   │   └── validators.ts         # Pure validation helper functions
│   └── types/
│       └── index.ts              # Shared TypeScript types & interfaces
├── App.tsx                       # Root: AuthProvider wrapping AppNavigator
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Prerequisites

- Node.js >= 22.11.0
- npm or yarn
- React Native CLI
- For iOS: macOS with Xcode
- For Android: Android Studio with SDK

## Installation

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd claudiusauth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS pods** (iOS only)
   ```bash
   cd ios && bundle exec pod install && cd ..
   ```

## Running the App

### iOS

```bash
npm run ios
```

### Android

```bash
npm run android
```

### Start Metro Bundler

```bash
npm start
```

**Note**: This project uses Metro bundler on port 8082 instead of the default 8081 to avoid conflicts with other React Native projects.

## Usage

### App Launch

1. Launch the app
2. A loading screen appears while restoring authentication state from AsyncStorage
3. If a session exists, you'll be redirected to the Home screen
4. If no session exists, you'll be redirected to the Login screen

### Signup

1. Tap "Sign up" on the login screen
2. Enter your name, email, and password (minimum 6 characters)
3. Tap "Sign Up" to create your account
4. You'll be automatically logged in and redirected to the Home screen

### Login

1. Enter your registered email and password
2. Tap "Login" to sign in
3. You'll be redirected to the Home screen

### Home Screen

- View your name and email
- Tap "Logout" to sign out (returns to login screen)

## Authentication Flow

The app uses a local authentication system with the following flow:

1. **App Launch**: Loading screen appears while checking AsyncStorage for existing session
2. **Signup**: User data is stored in memory and persisted to AsyncStorage
3. **Login**: Credentials are validated against stored users
4. **Session**: Auth state is persisted and restored on app launch
5. **Logout**: Session is cleared and user returns to login screen

## Validation Rules

### Login Screen
- Email: Required, must be valid email format
- Password: Required

### Signup Screen
- Name: Required
- Email: Required, must be valid email format, must be unique
- Password: Required, minimum 6 characters

## Key Implementation Details

### Authentication Context

The [`AuthContext`](src/context/AuthContext.tsx) provides:
- `user`: Current logged-in user object or null
- `isLoading`: Boolean indicating if auth state is being restored
- `login(email, password)`: Authenticate user
- `signup(name, email, password)`: Create new user
- `logout()`: Clear session and sign out

### Navigation

The [`AppNavigator`](src/navigation/AppNavigator.tsx) uses conditional rendering:
- When `isLoading` is true: Show Loading screen
- When `user` is null: Show Login and Signup screens
- When `user` exists: Show Home screen only

### Reusable Components

The app includes three main reusable components:

- **[`AppButton`](src/components/AppButton.tsx)**: Button component with variants (primary, link, danger), icon support, and accessibility features
- **[`AppText`](src/components/AppText.tsx)**: Text component with variants (title, subtitle, label, body, error, link)
- **[`AppTextInput`](src/components/AppTextInput.tsx)**: Text input component with labels, error messages, password toggle, and icon support

### Form Validation

All validation is performed using helper functions from [`validators.ts`](src/utils/validators.ts):
- `isValidEmail()`: Validates email format
- `isValidPassword()`: Checks minimum password length
- `isNonEmpty()`: Validates non-empty strings

### Assets

External images are configured in [`assets.ts`](src/config/assets.ts):
- Login illustration image
- Signup illustration image

### TypeScript Types

The app uses TypeScript interfaces defined in [`types/index.ts`](src/types/index.ts):

- **`User`**: Basic user interface with name and email
- **`StoredUser`**: Extends User with password field (for in-memory storage)
- **`AuthContextType`**: Auth context interface with user, isLoading, and auth methods
- **`RootStackParamList`**: Navigation param list for React Navigation

## Development

### Available Scripts

- `npm start` - Start Metro bundler on port 8082
- `npm run android` - Run on Android emulator/device (uses port 8082)
- `npm run ios` - Run on iOS simulator/device (uses port 8082)
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint

### Custom Metro Port

This project uses port 8082 for the Metro bundler to avoid conflicts with other React Native projects running on the default port 8081. All npm scripts are configured to use this custom port.