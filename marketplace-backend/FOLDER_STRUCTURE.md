src/
├── components/
│   ├── ui/
│   │   ├── atoms/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
≐2   │   │   ├── Text.tsx
│   │   │   ├── Image.tsx
│   │   │   └── Icon.tsx
│   │   ├── molecules/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CategoryFilter.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── CartItem.tsx
│   │   │   ├── OrderCard.tsx
│   │   │   └── ProfileCard.tsx
│   │   ├── organisms/
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── CartList.tsx
│   │   │   ├── OrderList.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── AnalyticsCard.tsx
│   │   └── templates/
│   │       ├── Header.tsx
│   │       ├── BottomNavigation.tsx
│   │       ├── Modal.tsx
│   │       ├── BottomSheet.tsx
│   │       └── LoadingSkeleton.tsx
│   ├── screens/
│   │   ├── buyer/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── ProductDetailScreen.tsx
│   │   │   ├── CartScreen.tsx
│   │   │   ├── CheckoutScreen.tsx
│   │   │   ├── OrderHistoryScreen.tsx
│   │   │   ├── ProfileScreen.tsx
│   │   │   └── NotificationsScreen.tsx
│   │   ├── supplier/
│   │   │   ├── DashboardScreen.tsx
│   │   │   ├── ProductManagementScreen.tsx
│   │   │   ├── OrderManagementScreen.tsx
│   │   │   └── RevenueScreen.tsx
│   │   ├── driver/
│   │   │   ├── DeliveryListScreen.tsx
│   │   │   ├── DeliveryDetailScreen.tsx
│   │   │   └── NavigationScreen.tsx
│   │   └── admin/
│   │       ├── AdminDashboardScreen.tsx
│   │       ├── UserManagementScreen.tsx
│   │       ├── ProductModerationScreen.tsx
│   │       ├── OrderOverviewScreen.tsx
│   │       └── ReportsScreen.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useApi.ts
│   │   ├── useAnimation.ts
│   │   └── useRole.ts
│   ├── services/
│   │   ├── api/
│   │   │   ├── index.ts
│   │   │   ├── auth.ts
│   │   │   ├── products.ts
│   │   │   ├── orders.ts
│   │   │   ├── users.ts
│   │   │   └── notifications.ts
│   │   └── storage/
│   │       ├── index.ts
│   │       └── secureStorage.ts
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   ├── MainTabNavigator.tsx
│   │   ├── RoleNavigator.tsx
│   │   └── ProtectedRoute.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   └── RoleContext.tsx
│   └── types/
│       ├── index.ts
│       ├── product.ts
│       ├── order.ts
│       ├── user.ts
│       └── notification.ts
├── assets/
│   ├── images/
│   │   ├── icons/
│   │   └── illustrations/
│   └── fonts/
├── constants/
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── routes.ts
├── utils/
│   ├── format.ts
│   ├── validation.ts
│   └── helpers.ts
├── App.tsx
├── app.json
└── package.json