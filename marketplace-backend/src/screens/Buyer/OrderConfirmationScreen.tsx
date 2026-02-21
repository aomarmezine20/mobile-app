import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';

interface OrderConfirmationScreenProps {
  navigation: any;
}

const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({ navigation }) => {
  const [order, setOrder] = React.useState({
    id: '12345',
    date: '2024-01-15',
    status: 'processing',
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
    shippingAddress: {
      fullName: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
    },
    paymentMethod: {
      cardNumber: '**** **** **** 1234',
      cardName: 'John Doe',
    },
  });

  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  const handleViewOrder = () => {
    navigation.navigate('OrderDetail', { order });
  };

  const renderOrderSummary = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.orderItems}>
          {order.items.map((item: any) => (
            <View key={item.name} style={styles.orderItem}>
              <Image
                source={{ uri: item.image }}
                variant="rounded"
                size="xs"
                style={styles.itemImage}
              />
              <View style={styles.itemContent}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.itemPrice}>
                  ${item.price.toFixed(2)} x {item.quantity}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${order.total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax:</Text>
            <Text style={styles.summaryValue}>$10.40</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping:</Text>
            <Text style={styles.summaryValue}>FREE</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderOrderDetails = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Order Details</Text>
      <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order ID:</Text>
          <Text style={styles.detailValue}>{order.id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailValue}>{order.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Status:</Text>
          <View style={[styles.statusBadge, { backgroundColor: colors.primary[500] }]}>
            <Text style={styles.statusText}>Processing</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderShippingInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Shipping Address</Text>
      <View style={styles.address}>
        <Text style={styles.addressName}>{order.shippingAddress.fullName}</Text>
        <Text style={styles.addressStreet}>{order.shippingAddress.street}</Text>
        <Text style={styles.addressCityStateZip}>
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
        </Text>
        <Text style={styles.addressCountry}>{order.shippingAddress.country}</Text>
      </View>
    </View>
  );

  const renderPaymentInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Method</Text>
      <View style={styles.payment}>
        <Text style={styles.paymentCard}>{order.paymentMethod.cardNumber}</Text>
        <Text style={styles.paymentName}>{order.paymentMethod.cardName}</Text>
      </View>
    </View>
  );

  const renderActions = () => (
    <View style={styles.actions}>
      <Button
        variant="outline"
        onPress={handleContinueShopping}
        style={styles.continueButton}
      >
        Continue Shopping
      </Button>
      <Button
        variant="primary"
        onPress={handleViewOrder}
        style={styles.viewOrderButton}
      >
        View Order
      </Button>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order Confirmation</Text>
        <Text style={styles.subtitle}>Thank you for your purchase!</Text>
      </View>
      
      <View style={styles.confirmation}>
        <Text style={styles.confirmationIcon}>✅</Text>
        <Text style={styles.confirmationTitle}>Order Placed Successfully</Text>
        <Text style={styles.confirmationMessage}>
          Your order #{order.id} has been received and is being processed.
        </Text>
      </View>
      
      {renderOrderSummary()}
      {renderOrderDetails()}
      {renderShippingInfo()}
      {renderPaymentInfo()}
      {renderActions()}
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
  confirmation: {
    alignItems: 'center',
    padding: spacing.component.padding.md,
    marginBottom: spacing.component.margin.md,
  },
  confirmationIcon: {
    fontSize: 48,
    marginBottom: spacing.component.margin.sm,
  },
  confirmationTitle: {
    ...typography.h6,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  confirmationMessage: {
    ...typography.body,
    color: colors.text.muted,
    textAlign: 'center',
  },
  section: {
    padding: spacing.component.padding.md,
    marginBottom: spacing.component.margin.md,
  },
  sectionTitle: {
    ...typography.h6,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.md,
  },
  orderItems: {
    marginBottom: spacing.component.margin.md,
  },
  orderItem: {
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
  summary: {
    marginTop: spacing.component.margin.md,
    paddingVertical: spacing.component.padding.md,
    borderTopWidth: 1,
    borderColor: colors.neutral[200],
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.component.margin.xs,
  },
  summaryLabel: {
    ...typography.body,
    color: colors.text.primary,
  },
  summaryValue: {
    ...typography.body,
    color: colors.text.primary,
  },
  totalRow: {
    marginTop: spacing.component.margin.md,
    paddingTop: spacing.component.padding.xs,
    borderTopWidth: 1,
    borderColor: colors.neutral[200],
  },
  totalLabel: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  totalValue: {
    ...typography.body,
    color: colors.primary[500],
    fontWeight: 'bold',
  },
  orderDetails: {
    marginTop: spacing.component.margin.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.component.margin.xs,
  },
  detailLabel: {
    ...typography.body,
    color: colors.text.muted,
  },
  detailValue: {
    ...typography.body,
    color: colors.text.primary,
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
  address: {
    marginTop: spacing.component.margin.md,
  },
  addressName: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  addressStreet: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  addressCityStateZip: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  addressCountry: {
    ...typography.body,
    color: colors.text.primary,
  },
  payment: {
    marginTop: spacing.component.margin.md,
  },
  paymentCard: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  paymentName: {
    ...typography.body,
    color: colors.text.muted,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.component.margin.sm,
    padding: spacing.component.padding.md,
  },
  continueButton: {
    flex: 1,
  },
  viewOrderButton: {
    flex: 1,
  },
});

export default OrderConfirmationScreen;