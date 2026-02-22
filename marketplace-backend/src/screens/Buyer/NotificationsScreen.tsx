import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Button } from '../ui/atoms/Button';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

interface NotificationsScreenProps {
  navigation: any;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped and is on its way.',
      type: 'info',
      read: false,
      createdAt: 'Just now',
    },
    {
      id: '2',
      title: 'Order Delivered',
      message: 'Your order #12345 has been delivered successfully.',
      type: 'success',
      read: true,
      createdAt: '2 minutes ago',
    },
    {
      id: '3',
      title: 'Price Drop',
      message: 'The price of Wireless Headphones has dropped by 20%.',
      type: 'warning',
      read: false,
      createdAt: '5 minutes ago',
    },
    {
      id: '4',
      title: 'New Product Alert',
      message: 'Check out our latest collection of smart home devices.',
      type: 'info',
      read: true,
      createdAt: '30 minutes ago',
    },
    {
      id: '5',
      title: 'Order Cancelled',
      message: 'Your order #12346 has been cancelled due to stock unavailability.',
      type: 'error',
      read: true,
      createdAt: '1 hour ago',
    },
  ]);

  const [selectedNotification, setSelectedNotification] =
    React.useState<Notification | null>(null);

  const handleNotificationPress = (notification: Notification) => {
    setSelectedNotification(notification);
    setNotifications(prev =>
      prev.map(n => (n.id === notification.id ? { ...n, read: true } : n)),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
    setSelectedNotification(null);
  };

  const getNotificationColor = (type: Notification['type']) => {
    const colorsByType: Record<Notification['type'], string> = {
      info: 'blue',
      success: 'green',
      warning: 'orange',
      error: 'red',
    };
    return colorsByType[type] || 'blue';
  };

  const getNotificationIcon = (type: Notification['type']) => {
    const iconsByType: Record<Notification['type'], string> = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
    };
    return iconsByType[type] || 'ℹ️';
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notification,
        selectedNotification?.id === item.id && styles.selectedNotification,
        item.read && styles.readNotification,
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationIcon}>
        <Text
          style={[
            styles.notificationIconText,
            { color: getNotificationColor(item.type) },
          ]}
        >
          {getNotificationIcon(item.type)}
        </Text>
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.notificationTime}>{item.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSelectedNotification = () => {
    if (!selectedNotification) {
      return null;
    }

    return (
      <View style={styles.selectedNotificationView}>
        <Text style={styles.selectedNotificationTitle}>
          {selectedNotification.title}
        </Text>
        <Text style={styles.selectedNotificationMessage}>
          {selectedNotification.message}
        </Text>
        <Text style={styles.selectedNotificationTime}>
          {selectedNotification.createdAt}
        </Text>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🔔</Text>
      <Text style={styles.emptyTitle}>No notifications</Text>
      <Text style={styles.emptySubtitle}>
        You'll see your notifications here when you have them.
      </Text>
    </View>
  );

  const renderActions = () => (
    <View style={styles.actions}>
      <Button
        variant="outline"
        onPress={handleMarkAllAsRead}
        style={styles.actionButton}
      >
        Mark All as Read
      </Button>
      <Button
        variant="outline"
        onPress={handleClearAll}
        style={styles.actionButton}
      >
        Clear All
      </Button>
    </View>
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>{unreadCount} unread</Text>
      </View>

      {notifications.length > 0 ? (
        <View style={styles.notificationsList}>
          {renderActions()}
          <FlatList
            data={notifications}
            renderItem={renderNotification}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.notificationsContainer}
            scrollEnabled={false}
          />
          {renderSelectedNotification()}
        </View>
      ) : (
        renderEmptyState()
      )}
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
    borderBottomWidth: 1,
    borderColor: colors.neutral[200],
  },
  title: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  subtitle: {
    ...typography.caption,
    color: colors.text.muted,
  },
  notificationsList: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.component.margin.sm,
    padding: spacing.component.padding.md,
  },
  actionButton: {
    flex: 1,
  },
  notificationsContainer: {
    paddingHorizontal: spacing.component.padding.md,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    marginBottom: spacing.component.margin.sm,
    ...spacing.shadow.sm,
  },
  selectedNotification: {
    backgroundColor: colors.primary[50],
  },
  readNotification: {
    opacity: 0.6,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: spacing.radius.sm,
    backgroundColor: colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.component.margin.md,
  },
  notificationIconText: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.component.margin.xs,
  },
  notificationMessage: {
    ...typography.caption,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  notificationTime: {
    ...typography.caption,
    color: colors.text.muted,
  },
  selectedNotificationView: {
    padding: spacing.component.padding.md,
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    marginTop: spacing.component.margin.md,
    ...spacing.shadow.sm,
  },
  selectedNotificationTitle: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.component.margin.xs,
  },
  selectedNotificationMessage: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.md,
  },
  selectedNotificationTime: {
    ...typography.caption,
    color: colors.text.muted,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.component.padding.md,
    marginTop: spacing.component.margin.md,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.component.margin.md,
  },
  emptyTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.text.muted,
    textAlign: 'center',
  },
});

export default NotificationsScreen;

