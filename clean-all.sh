#!/bin/bash

# Script to clear all builds, caches, and node modules
# Usage: ./clean-all.shj

set -e

echo "🧹 Starting cleanup process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# 1. Clear Android build
echo ""
echo "📱 Clearing Android build..."
if [ -d "android/app/build" ]; then
    rm -rf android/app/build
    print_success "Android build cleared"
else
    print_warning "Android build directory not found"
fi

if [ -d "android/.gradle" ]; then
    rm -rf android/.gradle
    print_success "Android .gradle cleared"
fi

if [ -d "android/build" ]; then
    rm -rf android/build
    print_success "Android root build cleared"
fi

# 2. Clear iOS build
echo ""
echo "🍎 Clearing iOS build..."
if [ -d "ios/build" ]; then
    rm -rf ios/build
    print_success "iOS build cleared"
else
    print_warning "iOS build directory not found"
fi

if [ -d "ios/Pods" ]; then
    rm -rf ios/Pods
    print_success "iOS Pods cleared"
fi

if [ -f "ios/Podfile.lock" ]; then
    rm -f ios/Podfile.lock
    print_success "Podfile.lock removed"
fi

if [ -d "ios/DerivedData" ]; then
    rm -rf ios/DerivedData
    print_success "iOS DerivedData cleared"
fi

# 3. Clear Watchman cache
echo ""
echo "👁️  Clearing Watchman cache..."
if command -v watchman &> /dev/null; then
    watchman watch-del-all 2>/dev/null || print_warning "No watchman watches to remove"
    print_success "Watchman watches cleared"
else
    print_warning "Watchman not installed"
fi

# 4. Clear Metro bundler cache
echo ""
echo "🚇 Clearing Metro bundler cache..."
if [ -d "$TMPDIR/react-*" ]; then
    rm -rf $TMPDIR/react-*
    print_success "Metro temp cache cleared"
else
    print_warning "Metro temp cache not found"
fi

if [ -d "$TMPDIR/metro-*" ]; then
    rm -rf $TMPDIR/metro-*
    print_success "Metro bundler cache cleared"
else
    print_warning "Metro bundler cache not found"
fi

if [ -f "$TMPDIR/haste-map-*" ]; then
    rm -f $TMPDIR/haste-map-*
    print_success "Haste map cache cleared"
fi

# Clear .cache directory if exists
if [ -d ".cache" ]; then
    rm -rf .cache
    print_success ".cache directory cleared"
fi

# 5. Clear node_modules
echo ""
echo "📦 Clearing node_modules..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
    print_success "node_modules cleared"
else
    print_warning "node_modules directory not found"
fi

# 6. Clear package-lock.json
echo ""
echo "🔒 Clearing package-lock.json..."
if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    print_success "package-lock.json removed"
else
    print_warning "package-lock.json not found"
fi

# 7. Clear yarn cache if using yarn
if [ -f "yarn.lock" ]; then
    echo ""
    echo "🧶 Clearing Yarn cache..."
    if command -v yarn &> /dev/null; then
        yarn cache clean
        print_success "Yarn cache cleared"
    fi
fi

# 8. Clear npm cache if using npm
if [ ! -f "yarn.lock" ] && command -v npm &> /dev/null; then
    echo ""
    echo "📋 Clearing npm cache..."
    npm cache clean --force
    print_success "npm cache cleared"
fi

# 9. Clear .bundle directory if exists
if [ -d ".bundle" ]; then
    rm -rf .bundle
    print_success ".bundle directory cleared"
fi

# 10. Clear any remaining temp files
echo ""
echo "🗑️  Clearing temporary files..."
find . -name "*.log" -type f -delete 2>/dev/null || true
find . -name ".DS_Store" -type f -delete 2>/dev/null || true
print_success "Temporary files cleared"

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✨ Cleanup completed successfully!   ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo "Next steps:"
echo "  1. Run: npm install (or yarn install)"
echo "  2. Run: cd ios && pod install"
echo "  3. Run: npx react-native run-android (or run-ios)"
echo ""
