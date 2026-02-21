import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';

interface CartScreenProps {
  navigation: any;
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const [cartItems, setCartItems] = React.useState<any[]>([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 79.99,
      quantity: 1,
      image: 'https://example.com/headphones.jpg',
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      quantity: 2,
      image: 'https://example.com/watch.jpg',
    },
  ]);

  const [isLoading, setIsLoading] = React.useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Checkout');
    }, 1000);
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          variant="rounded"
          size="sm"
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <Button
            variant="outline"
            size="sm"
            onPress={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
            style={styles.quantityButton}
          >
            -
          </Button>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Button
            variant="outline"
            size="sm"
            onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
            style={styles.quantityButton}
          >
            +
          </Button>
        </View>
      </View>
      <Button
        variant="ghost"
        size="sm"
        onPress={() => handleRemoveItem(item.id)}
        style={styles.removeButton}
      >
        Remove
      </Button>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Image
        source={{ uri: 'https://example.com/empty-cart.png' }}
        variant="rounded"
        size="lg"
        style={styles.emptyImage}
      />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>
        Add some products to get started
      </Text>
      <Button
        variant="primary"
        onPress={() => navigation.navigate('Home')}
        style={styles.continueShoppingButton}
      >
        Continue Shopping
      </Button>
    </View>
  );

  const renderCheckout = () => {
    const total = calculateTotal();
    const tax = total * 0.08;
    const shipping = total > 100 ? 0 : 9.99;
    const grandTotal = total + tax + shipping;

    return (
      <View style={styles.checkout}>
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
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
            <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
          </View>
        </View>
        <Button
          variant="primary"
          onPress={handleCheckout}
          loading={isLoading}
          style={styles.checkoutButton}
        >
          Proceed to Checkout
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        <Text style={styles.itemCount}>
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
        </Text>
      </View>
      
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cartList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
      
      {cartItems.length > 0 && renderCheckout()}
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
  itemCount: {
    ...typography.caption,
    color: colors.text.muted,
  },
  cartList: {
    paddingHorizontal: spacing.component.padding.md,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    marginBottom: spacing.component.margin.sm,
    ...spacing.shadow.sm,
  },
  imageContainer: {
    marginRight: spacing.component.margin.md,
  },
  image: {
    width: 60,
    height: 60,
  },
  content: {
    flex: 1,
  },
  productName: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  price: {
    ...typography.body,
    color: colors.primary[500],
    fontWeight: 'bold',
    marginBottom: spacing.component.margin.xs,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 24,
    height: 24,
    padding: 0,
    marginHorizontal: spacing.component.margin.xs,
  },
  quantity: {
    ...typography.body,
    color: colors.text.primary,
    marginHorizontal: spacing.component.margin.sm,
  },
  removeButton: {
    paddingHorizontal: spacing.component.padding.xs,
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
  checkout: {
    padding: spacing.component.padding.md,
    borderTopWidth: 1,
    borderColor: colors.neutral[200],
  },
  summary: {
    marginBottom: spacing.component.margin.md,
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
  checkoutButton: {
    width: '100%',
  },
});

export default CartScreen;