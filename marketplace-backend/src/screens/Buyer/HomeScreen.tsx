import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { ProductCard } from '../ui/molecules/ProductCard';
import { SearchBar } from '../ui/molecules/SearchBar';
import { CategoryFilter } from '../ui/molecules/CategoryFilter';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';

interface HomeScreenProps {
  navigation: any;
}

const categories: Array<{
  id: string;
  name: string;
  icon: string;
  color: string;
}> = [
  { id: '1', name: 'Electronics', icon: 'phone', color: 'blue' },
  { id: '2', name: 'Clothing', icon: 'shirt', color: 'purple' },
  { id: '3', name: 'Home', icon: 'home', color: 'green' },
  { id: '4', name: 'Sports', icon: 'basketball', color: 'orange' },
  { id: '5', name: 'Books', icon: 'book', color: 'red' },
  { id: '6', name: 'Toys', icon: 'cube', color: 'pink' },
];

const products: any[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    image: 'https://example.com/headphones.jpg',
    category: 'Electronics',
    rating: 4.5,
    stock: 12,
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    image: 'https://example.com/watch.jpg',
    category: 'Electronics',
    rating: 4.2,
    stock: 8,
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 89.99,
    image: 'https://example.com/shoes.jpg',
    category: 'Sports',
    rating: 4.7,
    stock: 5,
  },
  {
    id: '4',
    name: 'Laptop Stand',
    price: 39.99,
    image: 'https://example.com/stand.jpg',
    category: 'Home',
    rating: 4.3,
    stock: 0,
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    price: 29.99,
    image: 'https://example.com/mouse.jpg',
    category: 'Electronics',
    rating: 4.1,
    stock: 15,
  },
  {
    id: '6',
    name: 'Desk Lamp',
    price: 24.99,
    image: 'https://example.com/lamp.jpg',
    category: 'Home',
    rating: 4.6,
    stock: 3,
  },
];

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = React.useState(products);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProducts(query, selectedCategory);
  };

  const handleCategorySelect = (categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newCategory);
    filterProducts(searchQuery, newCategory);
  };

  const filterProducts = (query: string, category: string | null) => {
    let result = products;
    
    if (query) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (category) {
      result = result.filter(product => product.category === categories.find(c => c.id === category)?.name);
    }
    
    setFilteredProducts(result);
  };

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Discover Products</Text>
      <View style={styles.stats}>
        <Badge variant="success">New</Badge>
        <Badge variant="primary">Sale</Badge>
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <SearchBar
      placeholder="Search products..."
      value={searchQuery}
      onChangeText={handleSearch}
    />
  );

  const renderCategories = () => (
    <CategoryFilter
      categories={categories}
      selectedCategory={selectedCategory}
      onCategorySelect={handleCategorySelect}
    />
  );

  const renderProducts = () => (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => handleProductPress(item)}
        />
      )}
      contentContainerStyle={styles.productsContainer}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No products found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your search or filter criteria
      </Text>
      <Button
        variant="outline"
        onPress={() => {
          setSearchQuery('');
          setSelectedCategory(null);
          setFilteredProducts(products);
        }}
        style={styles.resetButton}
      >
        Reset Filters
      </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderSearchBar()}
      {renderCategories()}
      {filteredProducts.length > 0 ? renderProducts() : renderEmptyState()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.component.padding.md,
    paddingTop: spacing.component.padding.md,
    paddingBottom: spacing.component.padding.sm,
  },
  title: {
    ...typography.h5,
    color: colors.text.primary,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.component.margin.xs,
  },
  productsContainer: {
    paddingHorizontal: spacing.component.padding.sm,
    paddingTop: spacing.component.padding.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.component.padding.md,
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
  resetButton: {
    marginTop: spacing.component.margin.md,
  },
});

export default HomeScreen;