# Club Mitos Mobile

React Native app with Expo for Club Mitos membership platform.

## Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Run on iOS
pnpm ios

# Run on Android
pnpm android
```

## Features
- Google OAuth authentication
- Invite code validation
- Profile photo upload with camera/gallery
- Tab navigation (Home, Profile, Admin)
- Admin dashboard with user management

## Build for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## Requirements
- Expo SDK 51
- React Native 0.74
- NativeWind for styling
