import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';

interface ProductDetailScreenProps {
  route: any;
  navigation: any;
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ route, navigation }) => {
  const { product } = route.params;

  const handleAddToCart = () => {
    // Add to cart logic
    console.log('Add to cart:', product);
  };

  const handleBuyNow = () => {
    // Buy now logic
    console.log('Buy now:', product);
  };

  const renderProductImages = () => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: product.image }}
        variant="default"
        style={styles.mainImage}
      />
      <View style={styles.thumbnails}>
        <Image
          source={{ uri: product.image }}
          variant="rounded"
          size="xs"
          style={styles.thumbnail}
        />
        <Image
          source={{ uri: product.image }}
          variant="rounded"
          size="xs"
          style={styles.thumbnail}
        />
        <Image
          source={{ uri: product.image }}
          variant="rounded"
          size="xs"
          style={styles.thumbnail}
        />
      </View>
    </View>
  );

  const renderProductInfo = () => (
    <View style={styles.infoContainer}>
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
        <Text style={styles.reviews}>({product.rating * 100} reviews)</Text>
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>
        {product.description || 'High-quality product with excellent features and great value for money.'}
      </Text>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Category:</Text>
          <Text style={styles.detailValue}>{product.category}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Stock:</Text>
          <Text style={styles.detailValue}>{product.stock} available</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>SKU:</Text>
          <Text style={styles.detailValue}>{product.id}</Text>
        </View>
      </View>
    </View>
  );

  const renderAddToCart = () => (
    <View style={styles.cartContainer}>
      <View style={styles.quantityContainer}>
        <Button
          variant="outline"
          size="sm"
          onPress={() => console.log('Decrement')}
          style={styles.quantityButton}
        >
          -
        </Button>
        <Text style={styles.quantity}>1</Text>
        <Button
          variant="outline"
          size="sm"
          onPress={() => console.log('Increment')}
          style={styles.quantityButton}
        >
          +
        </Button>
      </View>
      <Button
        variant="primary"
        onPress={handleAddToCart}
        style={styles.addToCartButton}
      >
        Add to Cart
      </Button>
      <Button
        variant="secondary"
        onPress={handleBuyNow}
        style={styles.buyNowButton}
      >
        Buy Now
      </Button>
    </View>
  );

  const renderSimilarProducts = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Similar Products</Text>
        <Button
          variant="ghost"
          size="sm"
          onPress={() => console.log('View all')}
          style={styles.viewAllButton}
        >
          View All
        </Button>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.similarProduct}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image
              source={{ uri: item.image }}
              variant="rounded"
              size="sm"
              style={styles.similarProductImage}
            />
            <Text style={styles.similarProductName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.similarProductPrice}>
              ${item.price.toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderProductImages()}
      {renderProductInfo()}
      {renderAddToCart()}
      {renderSimilarProducts()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  imageContainer: {
    backgroundColor: colors.background.secondary,
    padding: spacing.component.padding.md,
  },
  mainImage: {
    width: '100%',
    height: 300,
    borderRadius: spacing.radius.md,
    marginBottom: spacing.component.margin.sm,
  },
  thumbnails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  thumbnail: {
    width: 60,
    height: 60,
  },
  infoContainer: {
    padding: spacing.component.padding.md,
  },
  productName: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.component.margin.sm,
  },
  rating: {
    ...typography.body,
    color: colors.primary[500],
    fontWeight: 'bold',
    marginRight: spacing.component.margin.xs,
  },
  reviews: {
    ...typography.caption,
    color: colors.text.muted,
  },
  price: {
    ...typography.h6,
    color: colors.primary[500],
    fontWeight: 'bold',
    marginBottom: spacing.component.margin.md,
  },
  description: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.md,
  },
  details: {
    marginTop: spacing.component.margin.md,
    paddingVertical: spacing.component.padding.md,
    borderTopWidth: 1,
    borderColor: colors.neutral[200],
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: spacing.component.margin.xs,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.text.muted,
    marginRight: spacing.component.margin.xs,
  },
  detailValue: {
    ...typography.caption,
    color: colors.text.primary,
  },
  cartContainer: {
    padding: spacing.component.padding.md,
    borderTopWidth: 1,
    borderColor: colors.neutral[200],
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.component.margin.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    padding: 0,
    marginHorizontal: spacing.component.margin.xs,
  },
  quantity: {
    ...typography.body,
    color: colors.text.primary,
    marginHorizontal: spacing.component.margin.md,
  },
  addToCartButton: {
    marginBottom: spacing.component.margin.sm,
  },
  buyNowButton: {
    marginBottom: spacing.component.margin.sm,
  },
  section: {
    padding: spacing.component.padding.md,
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
  viewAllButton: {
    paddingHorizontal: spacing.component.padding.xs,
  },
  similarProduct: {
    width: 120,
    marginRight: spacing.component.margin.sm,
  },
  similarProductImage: {
    width: '100%',
    height: 120,
    borderRadius: spacing.radius.md,
    marginBottom: spacing.component.margin.xs,
  },
  similarProductName: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  similarProductPrice: {
    ...typography.body,
    color: colors.primary[500],
    fontWeight: 'bold',
  },
});

const products = [
  {
    id: '7',
    name: 'Wireless Earbuds',
    price: 49.99,
    image: 'https://example.com/earbuds.jpg',
    category: 'Electronics',
    rating: 4.4,
    stock: 20,
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    price: 89.99,
    image: 'https://example.com/speaker.jpg',
    category: 'Electronics',
    rating: 4.6,
    stock: 15,
  },
  {
    id: '9',
    name: 'USB-C Cable',
    price: 14.99,
    image: 'https://example.com/cable.jpg',
    category: 'Electronics',
    rating: 4.2,
    stock: 50,
  },
];

export default ProductDetailScreen;