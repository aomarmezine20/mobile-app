import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';

interface SupplierOrdersScreenProps {
  navigation: any;
}

const SupplierOrdersScreen: React.FC<SupplierOrdersScreenProps> = ({ navigation }) => {
  const [orders, setOrders] = React.useState([
    {
      id: '12345',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 555 123 4567',
      },
      items: [
        {
          id: '1',
          name: 'Wireless Headphones',
          price: 79.99,
          quantity: 1,
        },
        {
          id: '2',
          name: 'Smart Watch',
          price: 199.99,
          quantity: 1,
        },
      ],
      total: 279.98,
      status: 'pending',
      date: '2024-01-15',
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      paymentMethod: 'Credit Card',
      trackingNumber: null,
    },
    {
      id: '12346',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 555 987 6543',
      },
      items: [
        {
          id: '3',
          name: 'Bluetooth Speaker',
          price: 49.99,
          quantity: 2,
        },
      ],
      total: 99.98,
      status: 'processing',
      date: '2024-01-15',
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        country: 'USA',
      },
      paymentMethod: 'PayPal',
      trackingNumber: 'TRK123456789',
    },
    {
      id: '12347',
      customer: {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '+1 555 456 7890',
      },
      items: [
        {
          id: '4',
          name: 'Laptop Stand',
          price: 29.99,
          quantity: 1,
        },
      ],
      total: 29.99,
      status: 'shipped',
      date: '2024-01-14',
      shippingAddress: {
        street: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA',
      },
      paymentMethod: 'Credit Card',
      trackingNumber: 'TRK987654321',
    },
    {
      id: '12348',
      customer: {
        name: 'Alice Brown',
        email: 'alice@example.com',
        phone: '+1 555 321 0987',
      },
      items: [
        {
          id: '1',
          name: 'Wireless Headphones',
          price: 79.99,
          quantity: 1,
        },
      ],
      total: 79.99,
      status: 'delivered',
      date: '2024-01-13',
      shippingAddress: {
        street: '321 Elm St',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA',
      },
      paymentMethod: 'Credit Card',
      trackingNumber: 'TRK456789123',
    },
  ]);

  const [selectedStatus, setSelectedStatus] = React.useState('all');

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  const filteredOrders = orders.filter(order => {
    return selectedStatus === 'all' || order.status === selectedStatus;
  });

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

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleViewOrderDetails = (orderId: string) => {
    navigation.navigate('SupplierOrderDetail', { orderId });
  };

  const handlePrintInvoice = (orderId: string) => {
    // Implement print functionality
    console.log('Printing invoice for order:', orderId);
  };

  const renderOrderCard = ({ item }: { item: any }) => (
    <View key={item.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>Order #{item.id}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      
      <View style={styles.orderCustomer}>
        <Text style={styles.customerName}>{item.customer.name}</Text>
        <Text style={styles.customerContact}>{item.customer.email} • {item.customer.phone}</Text>
      </View>
      
      <View style={styles.orderItems}>
        {item.items.map((orderItem: any, index: number) => (
          <View key={index} style={styles.orderItem}>
            <Text style={styles.itemName}>{orderItem.name}</Text>
            <Text style={styles.itemDetails}>
              ${orderItem.price.toFixed(2)} x {orderItem.quantity}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.orderFooter}>
        <View style={styles.orderTotal}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>
        </View>
        <View style={styles.orderActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleViewOrderDetails(item.id)}
          >
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>
          {item.status === 'pending' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.processButton]}
              onPress={() => handleUpdateOrderStatus(item.id, 'processing')}
            >
              <Text style={styles.processButtonText}>Process</Text>
            </TouchableOpacity>
          )}
          {item.status === 'processing' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.shipButton]}
              onPress={() => handleUpdateOrderStatus(item.id, 'shipped')}
            >
              <Text style={styles.shipButtonText}>Ship</Text>
            </TouchableOpacity>
          )}
          {item.status === 'shipped' && (
            <TouchableOpacity
              style={[styles.actionButton, styles.deliverButton]}
              onPress={() => handleUpdateOrderStatus(item.id, 'delivered')}
            >
              <Text style={styles.deliverButtonText}>Mark Delivered</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handlePrintInvoice(item.id)}
          >
            <Text style={styles.actionButtonText}>Print</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <Text style={styles.filterLabel}>Filter by status:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {statuses.map(status => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusChip,
              selectedStatus === status && styles.selectedChip,
            ]}
            onPress={() => setSelectedStatus(status)}
          >
            <Text style={[
              styles.statusChipText,
              selectedStatus === status && styles.selectedChipText,
            ]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No orders found</Text>
      <Text style={styles.emptyStateSubtext}>
        Try adjusting your filters or check back later
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Orders</Text>
          <Text style={styles.subtitle}>Manage customer orders</Text>
        </View>
      </View>
      
      {renderFilters()}
      
      <View style={styles.ordersContainer}>
        {filteredOrders.length > 0 ? (
          <View style={styles.ordersList}>
            {filteredOrders.map(renderOrderCard)}
          </View>
        ) : (
          renderEmptyState()
        )}
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
  filtersContainer: {
    padding: spacing.component.padding.md,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderColor: colors.neutral[200],
  },
  filterLabel: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  statusChip: {
    paddingHorizontal: spacing.component.padding.md,
    paddingVertical: spacing.component.padding.sm,
    backgroundColor: colors.neutral[200],
    borderRadius: spacing.radius.sm,
    marginRight: spacing.component.margin.sm,
  },
  selectedChip: {
    backgroundColor: colors.primary[500],
  },
  statusChipText: {
    ...typography.caption,
    color: colors.text.muted,
  },
  selectedChipText: {
    color: colors.text.inverted,
  },
  ordersContainer: {
    flex: 1,
    padding: spacing.component.padding.md,
  },
  ordersList: {
    gap: spacing.component.margin.md,
  },
  orderCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.component.margin.md,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  orderDate: {
    ...typography.caption,
    color: colors.text.muted,
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
  orderCustomer: {
    marginBottom: spacing.component.margin.md,
  },
  customerName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.component.margin.xs,
  },
  customerContact: {
    ...typography.caption,
    color: colors.text.muted,
  },
  orderItems: {
    marginBottom: spacing.component.margin.md,
  },
  orderItem: {
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
  itemDetails: {
    ...typography.caption,
    color: colors.text.muted,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingTop: spacing.component.margin.md,
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.component.margin.md,
  },
  totalLabel: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  totalAmount: {
    ...typography.h6,
    color: colors.primary[500],
    fontWeight: '600',
  },
  orderActions: {
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
  processButton: {
    backgroundColor: colors.accent[500],
  },
  processButtonText: {
    color: colors.text.inverted,
  },
  shipButton: {
    backgroundColor: colors.warning[500],
  },
  shipButtonText: {
    color: colors.text.inverted,
  },
  deliverButton: {
    backgroundColor: colors.success[500],
  },
  deliverButtonText: {
    color: colors.text.inverted,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.component.padding.md,
  },
  emptyStateText: {
    ...typography.h6,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  emptyStateSubtext: {
    ...typography.caption,
    color: colors.text.muted,
    textAlign: 'center',
  },
});

export default SupplierOrdersScreen;