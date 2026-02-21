import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [user, setUser] = React.useState({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'buyer',
    avatar: 'https://example.com/avatar.jpg',
    phone: '+1 555 123 4567',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
  });

  const [ordersCount, setOrdersCount] = React.useState(15);
  const [rating, setRating] = React.useState(4.5);
  const [productsCount, setProductsCount] = React.useState(3);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleOrders = () => {
    navigation.navigate('OrderHistory');
  };

  const handleFavorites = () => {
    navigation.navigate('Favorites');
  };

  const handleAddresses = () => {
    navigation.navigate('Addresses');
  };

  const handleNotifications = () => {
    navigation.navigate('Notifications');
  };

  const handleLogout = () => {
    // Logout logic
    console.log('Logout');
  };

  const renderProfileHeader = () => (
    <View style={styles.header}>
      <Image
        source={{ uri: user.avatar }}
        variant="circle"
        size="lg"
        style={styles.avatar}
      />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.role}>{user.role}</Text>
      </View>
      <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStats = () => (
    <View style={styles.stats}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{ordersCount}</Text>
        <Text style={styles.statLabel}>Orders</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{rating.toFixed(1)}</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{productsCount}</Text>
        <Text style={styles.statLabel}>Products</Text>
      </View>
    </View>
  );

  const renderMenuItems = () => (
    <View style={styles.menu}>
      <TouchableOpacity style={styles.menuItem} onPress={handleOrders}>
        <View style={styles.menuIcon}>
          <Text style={styles.menuIconText}>📦</Text>
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>My Orders</Text>
          <Text style={styles.menuSubtitle}>View all your orders</Text>
        </View>
        <View style={styles.menuArrow}>
          <Text style={styles.menuArrowText}>→</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleFavorites}>
        <View style={styles.menuIcon}>
          <Text style={styles.menuIconText}>⭐</Text>
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>Favorites</Text>
          <Text style={styles.menuSubtitle}>Your favorite products</Text>
        </View>
        <View style={styles.menuArrow}>
          <Text style={styles.menuArrowText}>→</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleAddresses}>
        <View style={styles.menuIcon}>
          <Text style={styles.menuIconText}>��</Text>
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>Addresses</Text>
          <Text style={styles.menuSubtitle}>Manage shipping addresses</Text>
        </View>
        <View style={styles.menuArrow}>
          <Text style={styles.menuArrowText}>→</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleNotifications}>
        <View style={styles.menuIcon}>
          <Text style={styles.menuIconText}>��</Text>
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>Notifications</Text>
          <Text style={styles.menuSubtitle}>Your notifications</Text>
        </View>
        <View style={styles.menuArrow}>
          <Text style={styles.menuArrowText}>→</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIcon}>
          <Text style={styles.menuIconText}>��</Text>
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>Payment Methods</Text>
          <Text style={styles.menuSubtitle}>Manage your cards</Text>
        </View>
        <View style={styles.menuArrow}>
          <Text style={styles.menuArrowText}>→</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIcon}>
          <Text style={styles.menuIconText}>��</Text>
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>Account Settings</Text>
          <Text style={styles.menuSubtitle}>Update your profile</Text>
        </View>
        <View style={styles.menuArrow}>
          <Text style={styles.menuArrowText}>→</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIcon}>
          <Text style={styles.menuIconText}>��</Text>
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>Privacy & Security</Text>
          <Text style={styles.menuSubtitle}>Security settings</Text>
        </View>
        <View style={styles.menuArrow}>
          <Text style={styles.menuArrowText}>→</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIcon}>
          <Text style={styles.menuIconText}>��</Text>
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>Help & Support</Text>
          <Text style={styles.menuSubtitle}>Get help and support</Text>
        </View>
        <View style={styles.menuArrow}>
          <Text style={styles.menuArrowText}>→</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderLogout = () => (
    <View style={styles.logout}>
      <Button
        variant="ghost"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Logout
      </Button>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderProfileHeader()}
      {renderStats()}
      {renderMenuItems()}
      {renderLogout()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    padding: spacing.component.padding.md,
    alignItems: 'center',
    marginBottom: spacing.component.margin.md,
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: spacing.component.margin.md,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: spacing.component.margin.md,
  },
  name: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  email: {
    ...typography.body,
    color: colors.text.muted,
    marginBottom: spacing.component.margin.xs,
  },
  role: {
    ...typography.caption,
    color: colors.primary[500],
  },
  editButton: {
    padding: spacing.component.padding.xs,
  },
  editText: {
    ...typography.caption,
    color: colors.primary[500],
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.component.padding.md,
    marginBottom: spacing.component.margin.md,
    borderBottomWidth: 1,
    borderColor: colors.neutral[200],
    paddingBottom: spacing.component.padding.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...typography.h6,
    color: colors.primary[500],
    fontWeight: 'bold',
    marginBottom: spacing.component.margin.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  menu: {
    paddingHorizontal: spacing.component.padding.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    marginBottom: spacing.component.margin.sm,
    ...spacing.shadow.sm,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: spacing.radius.sm,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.component.margin.md,
  },
  menuIconText: {
    fontSize: 20,
    color: colors.primary[500],
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  menuSubtitle: {
    ...typography.caption,
    color: colors.text.muted,
  },
  menuArrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuArrowText: {
    fontSize: 16,
    color: colors.text.muted,
  },
  logout: {
    padding: spacing.component.padding.md,
    marginTop: spacing.component.margin.md,
  },
  logoutButton: {
    width: '100%',
  },
});

export default ProfileScreen;