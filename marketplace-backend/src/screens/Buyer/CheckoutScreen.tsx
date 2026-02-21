import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useApp } from '../../components/context/AppContext';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';

interface CheckoutScreenProps {
  navigation: any;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation }) => {
  const { state, clearCart } = useApp();
  const [shippingInfo, setShippingInfo] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [paymentInfo, setPaymentInfo] = React.useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const handlePlaceOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      clearCart();
      navigation.navigate('OrderConfirmation');
    }, 2000);
  };

  const renderShippingInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Shipping Information</Text>
      <View style={styles.inputGroup}>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.fullName}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, fullName: text })}
            placeholder="John Doe"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.email}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, email: text })}
            placeholder="john@example.com"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.phone}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, phone: text })}
            placeholder="+1 555 123 4567"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Street Address</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.street}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, street: text })}
            placeholder="123 Main St"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>City</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.city}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, city: text })}
            placeholder="New York"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>State</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.state}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, state: text })}
            placeholder="NY"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>ZIP Code</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.zipCode}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, zipCode: text })}
            placeholder="10001"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Country</Text>
          <TextInput
            style={styles.input}
            value={shippingInfo.country}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, country: text })}
            placeholder="United States"
          />
        </View>
      </View>
    </View>
  );

  const renderPaymentInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Payment Information</Text>
      <View style={styles.inputGroup}>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Card Number</Text>
          <TextInput
            style={styles.input}
            value={paymentInfo.cardNumber}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cardNumber: text })}
            placeholder="1234 5678 9012 3456"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            value={paymentInfo.expiryDate}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, expiryDate: text })}
            placeholder="MM/YY"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>CVV</Text>
          <TextInput
            style={styles.input}
            value={paymentInfo.cvv}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cvv: text })}
            placeholder="123"
            keyboardType="numeric"
            secureTextEntry
          />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputLabel}>Cardholder Name</Text>
          <TextInput
            style={styles.input}
            value={paymentInfo.cardName}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cardName: text })}
            placeholder="John Doe"
          />
        </View>
      </View>
    </View>
  );

  const renderOrderSummary = () => {
    const cartItems = state.cart.items;
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.orderItems}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.orderItemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.orderItemPrice}>
                ${item.price.toFixed(2)} x {item.quantity}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax:</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping:</Text>
            <Text style={styles.summaryValue}>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderPlaceOrder = () => (
    <View style={styles.placeOrder}>
      <Button
        variant="primary"
        onPress={handlePlaceOrder}
        loading={isLoading}
        style={styles.placeOrderButton}
      >
        Place Order
      </Button>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.step}>Step 2 of 2</Text>
      </View>
      
      {renderShippingInfo()}
      {renderPaymentInfo()}
      {renderOrderSummary()}
      {renderPlaceOrder()}
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
  step: {
    ...typography.caption,
    color: colors.text.muted,
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
  inputGroup: {
    marginBottom: spacing.component.margin.md,
  },
  inputItem: {
    marginBottom: spacing.component.margin.md,
  },
  inputLabel: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.component.margin.xs,
  },
  input: {
    ...typography.body,
    height: 48,
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    paddingHorizontal: spacing.component.padding.sm,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  orderItems: {
    marginBottom: spacing.component.margin.md,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.component.margin.xs,
  },
  orderItemName: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
  orderItemPrice: {
    ...typography.body,
    color: colors.text.primary,
    marginLeft: spacing.component.margin.sm,
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
  placeOrder: {
    padding: spacing.component.padding.md,
  },
  placeOrderButton: {
    width: '100%',
  },
});

export default CheckoutScreen;