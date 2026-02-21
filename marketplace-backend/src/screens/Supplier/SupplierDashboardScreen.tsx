import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';

interface SupplierDashboardScreenProps {
  navigation: any;
}

const SupplierDashboardScreen: React.FC<SupplierDashboardScreenProps> = ({ navigation }) => {
  const [stats, setStats] = React.useState({
    totalProducts: 24,
    totalOrders: 156,
    totalRevenue: 12500.75,
    pendingOrders: 8,
    lowStockProducts: 3,
  });

  const [recentOrders, setRecentOrders] = React.useState([
    {
      id: '12345',
      customer: 'John Doe',
      total: 129.98,
      status: 'pending',
      date: '2024-01-15',
    },
    {
      id: '12346',
      customer: 'Jane Smith',
      total: 89.99,
      status: 'processing',
      date: '2024-01-15',
    },
    {
      id: '12347',
      customer: 'Bob Johnson',
      total: 199.99,
      status: 'shipped',
      date: '2024-01-14',
    },
  ]);

  const [recentProducts, setRecentProducts] = React.useState([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 79.99,
      stock: 45,
      sales: 234,
      image: 'https://example.com/headphones.jpg',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      stock: 12,
      sales: 156,
      image: 'https://example.com/watch.jpg',
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      price: 49.99,
      stock: 3,
      sales: 89,
      image: 'https://example.com/speaker.jpg',
    },
  ]);

  const getStatusColor = (status: string) => {
    const statusColors = {
      pending: colors.warning[500],
      processing: colors.primary[500],
      shipped: colors.accent[500],
      delivered: colors.success[500],
      cancelled: colors.error[500],
    };
    return statusColors[status] || colors.text.muted;
  };

  const getStatusText = (status: string) => {
    const statusText = {
      pending: 'Pending',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return statusText[status] || status;
  };

  const renderStatsCards = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{stats.totalProducts}</Text>
        <Text style={styles.statLabel}>Total Products</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{stats.totalOrders}</Text>
        <Text style={styles.statLabel}>Total Orders</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>${stats.totalRevenue.toFixed(2)}</Text>
        <Text style={styles.statLabel}>Total Revenue</Text>
      </View>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{stats.pendingOrders}</Text>
        <Text style={styles.statLabel}>Pending Orders</Text>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate('SupplierProducts')}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionIconText}>📦</Text>
        </View>
        <Text style={styles.actionTitle}>Products</Text>
        <Text style={styles.actionSubtitle}>Manage your products</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate('SupplierOrders')}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionIconText}>📋</Text>
        </View>
        <Text style={styles.actionTitle}>Orders</Text>
        <Text style={styles.actionSubtitle}>View and manage orders</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate('SupplierRevenue')}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionIconText}>💰</Text>
        </View>
        <Text style={styles.actionTitle}>Revenue</Text>
        <Text style={styles.actionSubtitle}>View earnings analytics</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate('SupplierAnalytics')}
      >
        <View style={styles.actionIcon}>
          <Text style={styles.actionIconText}>📊</Text>
        </View>
        <Text style={styles.actionTitle}>Analytics</Text>
        <Text style={styles.actionSubtitle}>Detailed insights</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRecentOrders = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SupplierOrders')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ordersList}>
        {recentOrders.map((order) => (
          <View key={order.id} style={styles.orderItem}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderId}>Order #{order.id}</Text>
              <Text style={styles.orderCustomer}>{order.customer}</Text>
            </View>
            <View style={styles.orderDetails}>
              <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                <Text style={styles.statusText}>{getStatusText(order.status)}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderLowStockAlert = () => (
    <View style={styles.alertContainer}>
      <View style={styles.alertIcon}>
        <Text style={styles.alertIconText}>⚠️</Text>
      </View>
      <View style={styles.alertContent}>
        <Text style={styles.alertTitle}>Low Stock Alert</Text>
        <Text style={styles.alertMessage}>
          {stats.lowStockProducts} products are running low on stock
        </Text>
      </View>
      <TouchableOpacity
        style={styles.alertButton}
        onPress={() => navigation.navigate('SupplierProducts')}
      >
        <Text style={styles.alertButtonText}>Manage Stock</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRecentProducts = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Products</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SupplierProducts')}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productsList}>
        {recentProducts.map((product) => (
          <View key={product.id} style={styles.productItem}>
            <Image
              source={{ uri: product.image }}
              variant="rounded"
              size="sm"
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              <Text style={styles.productStock}>Stock: {product.stock}</Text>
            </View>
            <View style={styles.productSales}>
              <Text style={styles.salesCount}>{product.sales} sold</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Supplier Dashboard</Text>
        <Text style={styles.subtitle}>Welcome back, Supplier!</Text>
      </View>
      
      {renderStatsCards()}
      {renderQuickActions()}
      {renderRecentOrders()}
      {renderLowStockAlert()}
      {renderRecentProducts()}
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
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.component.padding.md,
    gap: spacing.component.margin.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  statValue: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.muted,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.component.padding.md,
    gap: spacing.component.margin.md,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: spacing.radius.md,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.component.margin.sm,
  },
  actionIconText: {
    fontSize: 24,
  },
  actionTitle: {
    ...typography.h6,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  actionSubtitle: {
    ...typography.caption,
    color: colors.text.muted,
    textAlign: 'center',
  },
  section: {
    padding: spacing.component.padding.md,
    marginBottom: spacing.component.margin.md,
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
  },
  viewAll: {
    ...typography.caption,
    color: colors.primary[500],
  },
  ordersList: {
    gap: spacing.component.margin.sm,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.component.padding.sm,
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.sm,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  orderCustomer: {
    ...typography.caption,
    color: colors.text.muted,
  },
  orderDetails: {
    alignItems: 'flex-end',
  },
  orderTotal: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.component.margin.xs,
  },
  statusBadge: {
    paddingHorizontal: spacing.component.padding.xs,
    paddingVertical: spacing.component.padding.xs / 2,
    borderRadius: spacing.radius.sm,
  },
  statusText: {
    ...typography.caption,
    color: colors.text.inverted,
    fontWeight: '600',
  },
  alertContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.component.padding.md,
    backgroundColor: colors.warning[100],
    borderRadius: spacing.radius.md,
    margin: spacing.component.padding.md,
    borderWidth: 1,
    borderColor: colors.warning[200],
  },
  alertIcon: {
    marginRight: spacing.component.margin.sm,
  },
  alertIconText: {
    fontSize: 24,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.component.margin.xs,
  },
  alertMessage: {
    ...typography.caption,
    color: colors.text.muted,
  },
  alertButton: {
    paddingHorizontal: spacing.component.padding.md,
    paddingVertical: spacing.component.padding.sm,
    backgroundColor: colors.warning[500],
    borderRadius: spacing.radius.sm,
  },
  alertButtonText: {
    ...typography.caption,
    color: colors.text.inverted,
    fontWeight: '600',
  },
  productsList: {
    gap: spacing.component.margin.sm,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.component.padding.sm,
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.sm,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: spacing.component.margin.sm,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  productPrice: {
    ...typography.caption,
    color: colors.primary[500],
    fontWeight: '600',
  },
  productStock: {
    ...typography.caption,
    color: colors.text.muted,
  },
  productSales: {
    alignItems: 'flex-end',
  },
  salesCount: {
    ...typography.caption,
    color: colors.text.muted,
  },
});

export default SupplierDashboardScreen;