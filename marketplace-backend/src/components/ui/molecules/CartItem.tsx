import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Button } from '../atoms/Button';
import { Image } from '../atoms/Image';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const handleIncrement = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          variant="rounded"
          size="sm"
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text variant="body" numberOfLines={2}>
          {item.name}
        </Text>
        <Text variant="caption" style={styles.price}>
          ${item.price.toFixed(2)} each
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <Button
          variant="outline"
          size="sm"
          onPress={handleDecrement}
          style={styles.quantityButton}
        >
          -
        </Button>
        <Text variant="body" style={styles.quantity}>
          {item.quantity}
        </Text>
        <Button
          variant="outline"
          size="sm"
          onPress={handleIncrement}
          style={styles.quantityButton}
        >
          +
        </Button>
      </View>
      <Button
        variant="ghost"
        size="sm"
        onPress={handleRemove}
        style={styles.removeButton}
      >
        Remove
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    margin: spacing.component.margin.sm,
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
    justifyContent: 'center',
  },
  price: {
    color: colors.text.muted,
    marginTop: spacing.component.margin.xs,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.component.margin.md,
  },
  quantityButton: {
    width: 24,
    height: 24,
    padding: 0,
    marginHorizontal: spacing.component.margin.xs,
  },
  quantity: {
    marginHorizontal: spacing.component.margin.sm,
  },
  removeButton: {
    paddingHorizontal: spacing.component.padding.xs,
  },
});

export default CartItem;