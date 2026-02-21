import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Button } from '../atoms/Button';
import { Image } from '../atoms/Image';

interface OrderCardProps {
  order: {
    id: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    total: number;
    items: Array<{
      name: string;
      price: number;
      quantity: number;
      image: string;
    }>;
  };
  onPress?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onPress,
}) => {
  const getStatusColor = () => {
    const statusColors = {
      pending: colors.warning[500],
      processing: colors.primary[500],
      shipped: colors.accent[500],
      delivered: colors.success[500],
      cancelled: colors.error[500],
    };
    return statusColors[order.status];
  };

  const getStatusText = () => {
    const statusText = {
      pending: 'Pending',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return statusText[order.status];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="overline">Order #{order.id}</Text>
        <Text variant="caption" style={styles.date}>
          {order.date}
        </Text>
      </View>
      <View style={styles.items}>
        {order.items.map((item, index) => (
          <View key={item.id} style={styles.item}>
            <Image
              source={{ uri: item.image }}
              variant="rounded"
              size="xs"
              style={styles.itemImage}
            />
            <View style={styles.itemContent}>
              <Text variant="body" numberOfLines={1}>
                {item.name}
              </Text>
              <Text variant="caption" style={styles.itemPrice}>
                ${item.price.toFixed(2)} x {item.quantity}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <Text variant="body" style={styles.total}>
          Total: ${order.total.toFixed(2)}
        </Text>
        <Button
          variant="outline"
          size="sm"
          onPress={onPress}
          style={styles.button}
        >
          View Details
        </Button>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
        <Text variant="caption" style={styles.statusText}>
          {getStatusText()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    margin: spacing.component.margin.sm,
    ...spacing.shadow.sm,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.component.margin.md,
  },
  date: {
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
  itemPrice: {
    color: colors.text.muted,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.component.margin.md,
  },
  total: {
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: spacing.component.padding.xs,
  },
  statusBadge: {
    position: 'absolute',
    top: spacing.component.padding.sm,
    right: spacing.component.padding.sm,
    paddingHorizontal: spacing.component.padding.xs,
    paddingVertical: spacing.component.padding.xs / 2,
    borderRadius: spacing.radius.sm,
  },
  statusText: {
    color: colors.text.inverted,
    fontWeight: '600',
  },
});

export default OrderCard;