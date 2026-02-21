import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';

interface FavoritesScreenProps {
  navigation: any;
}

const FavoritesScreen: React.FC<FavoritesScreenProps> = ({ navigation }) => {
  const [favorites, setFavorites] = React.useState<any[]>([
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.5,
      reviews: 234,
      image: 'https://example.com/headphones.jpg',
      category: 'Electronics',
      brand: 'Sony',
      inStock: true,
      favorite: true,
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      rating: 4.7,
      reviews: 156,
      image: 'https://example.com/watch.jpg',
      category: 'Electronics',
      brand: 'Apple',
      inStock: true,
      favorite: true,
    },
    {
      id: '3',
      name: 'Running Shoes',
      price: 89.99,
      originalPrice: 119.99,
      discount: 25,
      rating: 4.3,
      reviews: 89,
      image: 'https://example.com/shoes.jpg',
      category: 'Sports',
      brand: 'Nike',
      inStock: true,
      favorite: true,
    },
    {
      id: '4',
      name: 'Laptop Stand',
      price: 39.99,
      originalPrice: 59.99,
      discount: 33,
      rating: 4.8,
      reviews: 412,
      image: 'https://example.com/stand.jpg',
      category: 'Office',
      brand: 'Ergonomic',
      inStock: true,
      favorite: true,
    },
    {
      id: '5',
      name: 'Coffee Maker',
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      rating: 4.6,
      reviews: 178,
      image: 'https://example.com/coffee.jpg',
      category: 'Home',
      brand: 'Breville',
      inStock: true,
      favorite: true,
    },
  ]);

  const [selectedProduct, setSelectedProduct] = React.useState<any | null>(null);

  const handleProductPress = (product: any) => {
    setSelectedProduct(product);
    navigation.navigate('ProductDetail', { product });
  };

  const handleRemoveFromFavorites = (productId: string) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(product => product.id !== productId)
    );
  };

  const handleAddToCart = (product: any) => {
    // Add to cart logic
    console.log('Add to cart:', product);
  };

  const renderProduct = ({ item }: { item: any }) => (
    <View style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          variant="rounded"
          size="md"
          style={styles.productImage}
        />
        {item.discount > 0 && (
          <Badge variant="discount">-{item.discount}%</Badge>
        )}
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productBrand} numberOfLines={1}>
          {item.brand}
        </Text>
        
        <View style={styles.productRating}>
          <Text style={styles.productRatingText}>
            {item.rating.toFixed(1)}
          </Text>
          <Text style={styles.productReviews}>
            ({item.reviews})
          </Text>
        </View>
        
        <View style={styles.productPrice}>
          <Text style={styles.productPriceCurrent}>
            ${item.price.toFixed(2)}
          </Text>
          {item.originalPrice > item.price && (
            <Text style={styles.productPriceOriginal}>
              ${item.originalPrice.toFixed(2)}
            </Text>
          )}
        </View>
        
        <View style={styles.productActions}>
          <Button
            variant="outline"
            onPress={() => handleAddToCart(item)}
            style={styles.addToCartButton}
          >
            Add to Cart
          </Button>
          <TouchableOpacity
            onPress={() => handleRemoveFromFavorites(item.id)}
            style={styles.removeFromFavoritesButton}
          >
            <Text style={styles.removeFromFavoritesText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>⭐</Text>
      <Text style={styles.emptyTitle}>No favorites yet</Text>
      <Text style={styles.emptySubtitle}>
        Add products to your favorites to see them here
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.subtitle}>
          {favorites.length} saved products
        </Text>
      </View>
      
      {favorites.length > 0 ? (
        <View style={styles.productsList}>
          <FlatList
            data={favorites}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.productsContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        renderEmptyState()
      )}
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
  productsList: {
    flex: 1,
  },
  productsContainer: {
    paddingHorizontal: spacing.component.padding.md,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    marginBottom: spacing.component.margin.sm,
    ...spacing.shadow.sm,
  },
  imageContainer: {
    position: 'relative',
    marginRight: spacing.component.margin.md,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  productBrand: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.component.margin.sm,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.component.margin.sm,
  },
  productRatingText: {
    ...typography.caption,
    color: colors.text.primary,
    fontWeight: 'bold',
    marginRight: spacing.component.margin.xs,
  },
  productReviews: {
    ...typography.caption,
    color: colors.text.muted,
  },
  productPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.component.margin.sm,
  },
  productPriceCurrent: {
    ...typography.body,
    color: colors.primary[500],
    fontWeight: 'bold',
    marginRight: spacing.component.margin.sm,
  },
  productPriceOriginal: {
    ...typography.caption,
    color: colors.text.muted,
    textDecorationLine: 'line-through',
  },
  productActions: {
    flexDirection: 'row',
    gap: spacing.component.margin.sm,
  },
  addToCartButton: {
    flex: 1,
  },
  removeFromFavoritesButton: {
    paddingHorizontal: spacing.component.padding.sm,
    paddingVertical: spacing.component.padding.xs,
    borderRadius: spacing.radius.sm,
    backgroundColor: colors.error[50],
  },
  removeFromFavoritesText: {
    ...typography.caption,
    color: colors.error[500],
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.component.padding.md,
    marginTop: spacing.component.margin.md,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.component.margin.md,
  },
  emptyTitle: {
    ...typography.h5,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
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

export default FavoritesScreen;