import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../../constants';
import { Image } from './Image';
import { Text } from './Text';
import { Badge } from './Badge';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    stock: number;
  };
  onPress?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
}) => {
  const getBadgeVariant = () => {
    if (product.stock === 0) return 'error';
    if (product.stock <= 5) return 'warning';
    return 'success';
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          variant="rounded"
          size="lg"
          style={styles.image}
        />
        {product.stock > 0 && (
          <Badge variant={getBadgeVariant()}>
            {product.stock} left
          </Badge>
        )}
      </View>
      <View style={styles.content}>
        <Text variant="body" numberOfLines={2}>
          {product.name}
        </Text>
        <Text variant="caption" style={styles.category}>
          {product.category}
        </Text>
        <View style={styles.priceContainer}>
          <Text variant="h5" style={styles.price}>
            ${product.price.toFixed(2)}
          </Text>
          {product.rating && (
            <Text variant="caption" style={styles.rating}>
              {product.rating}/5
            </Text>
          )}
        </View>
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
  },
  imageContainer: {
    position: 'relative',
    marginBottom: spacing.component.margin.md,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: spacing.radius.md,
  },
  content: {
    flex: 1,
  },
  category: {
    color: colors.text.muted,
    marginBottom: spacing.component.margin.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.component.margin.xs,
  },
  price: {
    color: colors.primary[500],
    fontWeight: 'bold',
  },
  rating: {
    color: colors.text.muted,
  },
});

export default ProductCard;