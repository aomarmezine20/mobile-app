import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';

interface OrderHistoryScreenProps {
  navigation: any;
}

const OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({ navigation }) => {
  const [orders, setOrders] = React.useState<any[]>([
    {
      id: '1',
      date: '2024-01-15',
      status: 'delivered',
      total: 129.98,
      items: [
        {
          name: 'Wireless Headphones',
          price: 79.99,
          quantity: 1,
          image: 'https://example.com/headphones.jpg',
        },
        {
          name: 'Smart Watch',
          price: 199.99,
          quantity: 2,
          image: 'https://example.com/watch.jpg',
        },
      ],
    },
    {
      id: '2',
      date: '2024-01-10',
      status: 'shipped',
      total: 89.99,
      items: [
        {
          name: 'Running Shoes',
          price: 89.99,
          quantity: 1,
          image: 'https://example.com/shoes.jpg',
        },
      ],
    },
    {
      id: '3',
      date: '2024-01-05',
      status: 'processing',
      total: 39.99,
      items: [
        {
          name: 'Laptop Stand',
          price: 39.99,
          quantity: 1,
          image: 'https://example.com/stand.jpg',
        },
      ],
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

  const renderOrder = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderDetail', { order: item })}
    >
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      
      <View style={styles.items}>
        {item.items.map((product: any, index: number) => (
          <View key={product.name} style={styles.item}>
            <Image
              source={{ uri: product.image }}
              variant="rounded"
              size="xs"
              style={styles.itemImage}
            />
            <View style={styles.itemContent}>
              <Text style={styles.itemName} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.itemPrice}>
                ${product.price.toFixed(2)} x {product.quantity}
              </Text>
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${item.total.toFixed(2)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Image
        source={{ uri: 'https://example.com/empty-orders.png' }}
        variant="rounded"
        size="lg"
        style={styles.emptyImage}
      />
      <Text style={styles.emptyTitle}>No orders yet</Text>
      <Text style={styles.emptySubtitle}>
        Start shopping to see your order history here
      </Text>
      <Button
        variant="primary"
        onPress={() => navigation.navigate('Home')}
        style={styles.continueShoppingButton}
      >
        Start Shopping
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
        <Text style={styles.subtitle}>View all your past orders</Text>
      </View>
      
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
    </View>
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
  ordersList: {
    paddingHorizontal: spacing.component.padding.md,
  },
  orderCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    marginBottom: spacing.component.margin.sm,
    ...spacing.shadow.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.component.margin.md,
  },
  orderId: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  orderDate: {
    ...typography.caption,
    color: colors.text.muted,
  },
  items: {
    marginBottom: spacing.component.margin.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.component.margin.xs,
  },
  itemImage: {
    width: 40,
    height: 40,
    marginRight: spacing.component.margin.sm,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  itemPrice: {
    ...typography.caption,
    color: colors.text.muted,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: 'bold',
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.component.padding.md,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: spacing.component.margin.md,
  },
  emptyTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.sm,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.text.muted,
    textAlign: 'center',
    marginBottom: spacing.component.margin.md,
  },
  continueShoppingButton: {
    width: '100%',
  },
});

export default OrderHistoryScreen;