import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';
import { Card } from '../ui/molecules/Card';

interface DriverDashboardScreenProps {
  navigation: any;
}

const DriverDashboardScreen: React.FC<DriverDashboardScreenProps> = ({ navigation }) => {
  const [stats, setStats] = React.useState({
    totalDeliveries: 15,
    completedDeliveries: 12,
    earnings: 450.50,
    rating: 4.8,
  });

  const [activeDeliveries, setActiveDeliveries] = React.useState([
    {
      id: '1',
      orderId: 'ORD123456',
      customer: {
        name: 'Sarah Johnson',
        address: '123 Main St, New York, NY 10001',
      },
      items: [
        {
          name: 'Wireless Headphones',
          quantity: 1,
        },
        {
          name: 'Smart Watch',
          quantity: 1,
        },
      ],
      total: 279.98,
      status: 'assigned',
      pickupTime: '2024-01-15T10:30:00Z',
      deliveryTime: '2024-01-15T11:00:00Z',
      distance: '2.5 miles',
      paymentMethod: 'Credit Card',
    },
    {
      id: '2',
      orderId: 'ORD123457',
      customer: {
        name: 'Mike Davis',
        address: '456 Oak Ave, Los Angeles, CA 90210',
      },
      items: [
        {
          name: 'Bluetooth Speaker',
          quantity: 2,
        },
      ],
      total: 99.98,
      status: 'assigned',
      pickupTime: '2024-01-15T10:45:00Z',
      deliveryTime: '2024-01-15T11:15:00Z',
      distance: '1.8 miles',
      paymentMethod: 'PayPal',
    },
  ]);

  const [recentDeliveries, setRecentDeliveries] = React.useState([
    {
      id: '3',
      orderId: 'ORD123458',
      customer: {
        name: 'Emily Chen',
        address: '789 Pine St, Chicago, IL 60601',
      },
      items: [
        {
          name: 'Laptop Stand',
          quantity: 1,
        },
      ],
      total: 29.99,
      status: 'delivered',
      deliveryTime: '2024-01-14T14:30:00Z',
      rating: 5,
    },
    {
      id: '4',
      orderId: 'ORD123459',
      customer: {
        name: 'David Kim',
        address: '321 Elm St, Seattle, WA 98101',
      },
      items: [
        {
          name: 'Wireless Headphones',
          quantity: 1,
        },
      ],
      total: 79.99,
      status: 'delivered',
      deliveryTime: '2024-01-14T15:15:00Z',
      rating: 4,
    },
  ]);

  const handleViewDelivery = (deliveryId: string) => {
    navigation.navigate('DeliveryDetail', { deliveryId });
  };

  const handleStartNavigation = (deliveryId: string) => {
    // Implement navigation functionality
    console.log('Starting navigation for delivery:', deliveryId);
  };

  const handleCompleteDelivery = (deliveryId: string) => {
    // Implement delivery completion
    console.log('Completing delivery:', deliveryId);
  };

  const renderStatCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
    <Card style={styles.statCard}>
      <View style={styles.statIcon}>
        <Text style={styles.statIconText}>{icon}</Text>
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </Card>
  );

  const renderDeliveryCard = ({ item }: { item: any }) => (
    <Card style={styles.deliveryCard}>
      <View style={styles.deliveryHeader}>
        <View style={styles.deliveryInfo}>
          <Text style={styles.deliveryId}>Delivery #{item.id}</Text>
          <Text style={styles.deliveryStatus}>{item.status}</Text>
        </View>
        <View style={styles.deliveryTime}>
          <Text style={styles.timeLabel}>Pickup:</Text>
          <Text style={styles.timeValue}>{item.pickupTime}</Text>
        </View>
      </View>
      
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.customer.name}</Text>
        <Text style={styles.customerAddress}>{item.customer.address}</Text>
      </View>
      
      <View style={styles.itemsList}>
        {item.items.map((orderItem: any, index: number) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemName}>{orderItem.name}</Text>
            <Text style={styles.itemQuantity}>x {orderItem.quantity}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.deliveryFooter}>
        <View style={styles.deliveryDetails}>
          <Text style={styles.detailLabel}>Total:</Text>
          <Text style={styles.detailValue}>${item.total.toFixed(2)}</Text>
          <Text style={styles.detailLabel}>Distance:</Text>
          <Text style={styles.detailValue}>{item.distance}</Text>
        </View>
        <View style={styles.deliveryActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleStartNavigation(item.id)}
          >
            <Text style={styles.actionButtonText}>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={() => handleCompleteDelivery(item.id)}
          >
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  const renderRecentDeliveryCard = ({ item }: { item: any }) => (
    <Card style={styles.recentDeliveryCard}>
      <View style={styles.recentDeliveryHeader}>
        <Text style={styles.recentDeliveryId}>Delivery #{item.id}</Text>
        <Text style={styles.recentDeliveryStatus}>{item.status}</Text>
      </View>
      
      <View style={styles.recentCustomerInfo}>
        <Text style={styles.recentCustomerName}>{item.customer.name}</Text>
        <Text style={styles.recentCustomerAddress}>{item.customer.address}</Text>
      </View>
      
      <View style={styles.recentDeliveryFooter}>
        <View style={styles.recentDeliveryDetails}>
          <Text style={styles.recentDetailLabel}>Total:</Text>
          <Text style={styles.recentDetailValue}>${item.total.toFixed(2)}</Text>
          <Text style={styles.recentDetailLabel}>Rating:</Text>
          <Text style={styles.recentDetailValue}>{item.rating}/5</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Driver Dashboard</Text>
          <Text style={styles.subtitle}>Manage your deliveries</Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        {renderStatCard({ title: 'Total Deliveries', value: stats.totalDeliveries, icon: '&#128640;&#65038;' })}
        {renderStatCard({ title: 'Completed', value: stats.completedDeliveries, icon: '&#128994;&#65038;' })}
        {renderStatCard({ title: 'Earnings', value: `$${stats.earnings.toFixed(2)}`, icon: '&#127974;&#65038;' })}
        {renderStatCard({ title: 'Rating', value: `${stats.rating}/5`, icon: '&#11088;&#65038;' })}
      </View>
      
      <View style={styles.activeDeliveriesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Deliveries</Text>
          <Text style={styles.sectionSubtitle}>({activeDeliveries.length} active)</Text>
        </View>
        <View style={styles.deliveriesList}>
          {activeDeliveries.map(renderDeliveryCard)}
        </View>
      </View>
      
      <View style={styles.recentDeliveriesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Deliveries</Text>
          <Text style={styles.sectionSubtitle}>(Last 7 days)</Text>
        </View>
        <View style={styles.recentDeliveriesList}>
          {recentDeliveries.map(renderRecentDeliveryCard)}
        </View>
      </View>
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
  headerContent: {
    flex: 1,
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
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.component.margin.sm,
    padding: spacing.component.padding.md,
  },
  statCard: {
    flex: 1,
    maxWidth: 'calc(50% - 10px)',
    padding: spacing.component.padding.md,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.component.margin.xs,
  },
  statIconText: {
    ...typography.h5,
    color: colors.primary[500],
  },
  statContent: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h6,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.component.margin.xs,
  },
  statTitle: {
    ...typography.caption,
    color: colors.text.muted,
  },
  activeDeliveriesSection: {
    padding: spacing.component.padding.md,
    borderBottomWidth: 1,
    borderColor: colors.neutral[200],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.component.margin.md,
  },
  sectionTitle: {
    ...typography.h6,
    color: colors.text.primary,
    fontWeight: '600',
  },
  sectionSubtitle: {
    ...typography.caption,
    color: colors.text.muted,
  },
  deliveriesList: {
    gap: spacing.component.margin.md,
  },
  deliveryCard: {
    padding: spacing.component.padding.md,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.component.margin.md,
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryId: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.component.margin.xs,
  },
  deliveryStatus: {
    ...typography.caption,
    color: colors.primary[500],
    fontWeight: '600',
  },
  deliveryTime: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  timeValue: {
    ...typography.caption,
    color: colors.text.primary,
  },
  customerInfo: {
    marginBottom: spacing.component.margin.md,
  },
  customerName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.component.margin.xs,
  },
  customerAddress: {
    ...typography.caption,
    color: colors.text.muted,
  },
  itemsList: {
    marginBottom: spacing.component.margin.md,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.component.padding.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  itemName: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
  itemQuantity: {
    ...typography.caption,
    color: colors.text.muted,
  },
  deliveryFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingTop: spacing.component.margin.md,
  },
  deliveryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.component.margin.md,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  detailValue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  deliveryActions: {
    flexDirection: 'row',
    gap: spacing.component.margin.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.component.padding.sm,
    backgroundColor: colors.primary[500],
    borderRadius: spacing.radius.sm,
    alignItems: 'center',
  },
  actionButtonText: {
    ...typography.caption,
    color: colors.text.inverted,
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: colors.success[500],
  },
  completeButtonText: {
    color: colors.text.inverted,
  },
  recentDeliveriesSection: {
    padding: spacing.component.padding.md,
  },
  recentDeliveriesList: {
    gap: spacing.component.margin.md,
  },
  recentDeliveryCard: {
    padding: spacing.component.padding.md,
  },
  recentDeliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.component.margin.md,
  },
  recentDeliveryId: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  recentDeliveryStatus: {
    ...typography.caption,
    color: colors.success[500],
    fontWeight: '600',
  },
  recentCustomerInfo: {
    marginBottom: spacing.component.margin.md,
  },
  recentCustomerName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.component.margin.xs,
  },
  recentCustomerAddress: {
    ...typography.caption,
    color: colors.text.muted,
  },
  recentDeliveryFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingTop: spacing.component.margin.md,
  },
  recentDeliveryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentDetailLabel: {
    ...typography.caption,
    color: colors.text.muted,
  },
  recentDetailValue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
});

export default DriverDashboardScreen;