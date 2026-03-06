# ClaudiusAuthApp

A React Native 0.84+ authentication application built with TypeScript, featuring Login, Signup, and Home screens with local authentication state management.

## Features

- **User Authentication**: Complete login and signup flow with form validation
- **TypeScript**: Fully typed codebase with strict TypeScript configuration
- **React Navigation v7**: Native stack navigation with auth-conditional routing
- **Context API**: Centralized authentication state management
- **AsyncStorage**: Session persistence for logged-in users
- **Form Validation**: Inline error messages for all form fields
- **Password Visibility Toggle**: Eye icon to show/hide passwords
- **Modern UI**: Clean, responsive design with Material Icons
- **New Architecture**: React Native 0.84+ with New Architecture enabled

## Tech Stack

| Technology | Version |
|------------|---------|
| React Native | 0.84.1 |
| React | 19.2.3 |
| TypeScript | 5.8.3 |
| React Navigation | v7 |
| AsyncStorage | @react-native-async-storage/async-storage |
| Vector Icons | react-native-vector-icons |

## Project Structure

```
/
├── src/
│   ├── context/
│   │   └── AuthContext.tsx       # Auth context + provider + useAuth hook
│   ├── screens/
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

## Usage

### Signup

1. Launch the app
2. Tap "Sign up" on the login screen
3. Enter your name, email, and password (minimum 6 characters)
4. Tap "Sign Up" to create your account

### Login

1. Enter your registered email and password
2. Tap "Login" to sign in

### Home Screen

- View your name and email
- Tap "Logout" to sign out (returns to login screen)

## Authentication Flow

The app uses a local authentication system with the following flow:

1. **Signup**: User data is stored in memory and persisted to AsyncStorage
2. **Login**: Credentials are validated against stored users
3. **Session**: Auth state is persisted and restored on app launch
4. **Logout**: Session is cleared and user returns to login screen

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
- `login(email, password)`: Authenticate user
- `signup(name, email, password)`: Create new user
- `logout()`: Clear session and sign out

### Navigation

The [`AppNavigator`](src/navigation/AppNavigator.tsx) uses conditional rendering:
- When `user` is null: Show Login and Signup screens
- When `user` exists: Show Home screen only

### Form Validation

All validation is performed using helper functions from [`validators.ts`](src/utils/validators.ts):
- `isValidEmail()`: Validates email format
- `isValidPassword()`: Checks minimum password length
- `isNonEmpty()`: Validates non-empty strings

## TypeScript Configuration

The project uses strict TypeScript with:
- `strict: true`
- `noImplicitAny: true`
- Path aliases: `@/*` maps to `src/*`

## Styling Guidelines

All styles use `StyleSheet.create()` with explicit typing:
- Input wrapper: `borderWidth: 1`, `borderRadius: 8`
- Active border: `borderColor: '#4f46e5'`
- Buttons: `backgroundColor: '#4f46e5'`, `borderRadius: 8`
- Error text: `color: '#dc2626'`, `fontSize: 12`

## Development

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint

### Code Style

The project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

## Troubleshooting

### iOS Build Issues

If you encounter iOS build issues:
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
npm run ios
```

### Android Build Issues

If you encounter Android build issues:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Metro Bundler Issues

If Metro bundler has issues:
```bash
npm start -- --reset-cache
```

## Future Enhancements

Potential improvements for the app:
- Password reset functionality
- Remember me option
- Social media login integration
- Biometric authentication
- Profile editing
- Email verification
- Backend API integration

## License

This project is for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
