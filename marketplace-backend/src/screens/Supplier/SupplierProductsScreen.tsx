import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { colors, spacing, typography } from '../../constants';
import { Badge } from '../ui/atoms/Badge';
import { Button } from '../ui/atoms/Button';
import { Image } from '../ui/atoms/Image';

interface SupplierProductsScreenProps {
  navigation: any;
}

const SupplierProductsScreen: React.FC<SupplierProductsScreenProps> = ({ navigation }) => {
  const [products, setProducts] = React.useState([
    {
      id: '1',
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 79.99,
      stock: 45,
      category: 'Electronics',
      status: 'active',
      image: 'https://example.com/headphones.jpg',
      sales: 234,
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Smart Watch',
      description: 'Advanced smartwatch with health monitoring features',
      price: 199.99,
      stock: 12,
      category: 'Electronics',
      status: 'active',
      image: 'https://example.com/watch.jpg',
      sales: 156,
      rating: 4.2,
    },
    {
      id: '3',
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with premium sound quality',
      price: 49.99,
      stock: 3,
      category: 'Electronics',
      status: 'active',
      image: 'https://example.com/speaker.jpg',
      sales: 89,
      rating: 4.0,
    },
    {
      id: '4',
      name: 'Laptop Stand',
      description: 'Ergonomic laptop stand for better posture',
      price: 29.99,
      stock: 0,
      category: 'Accessories',
      status: 'inactive',
      image: 'https://example.com/stand.jpg',
      sales: 67,
      rating: 4.3,
    },
  ]);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedStatus, setSelectedStatus] = React.useState('all');

  const categories = ['all', 'Electronics', 'Accessories', 'Clothing', 'Home'];
  const statuses = ['all', 'active', 'inactive'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const statusColors = {
      active: colors.success[500],
      inactive: colors.error[500],
      pending: colors.warning[500],
    };
    return statusColors[status] || colors.text.muted;
  };

  const getStatusText = (status: string) => {
    const statusText = {
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
    };
    return statusText[status] || status;
  };

  const handleEditProduct = (productId: string) => {
    navigation.navigate('SupplierEditProduct', { productId });
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleAddProduct = () => {
    navigation.navigate('SupplierAddProduct');
  };

  const renderProductCard = ({ item }: { item: any }) => (
    <View key={item.id} style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: item.image }}
          variant="rounded"
          size="md"
          style={styles.productImage}
        />
        {item.stock === 0 && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.productMeta}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <Text style={styles.productStock}>Stock: {item.stock}</Text>
          <Text style={styles.productSales}>{item.sales} sold</Text>
        </View>
        <View style={styles.productActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditProduct(item.id)}
          >
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteProduct(item.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.categoryFilter}>
        <Text style={styles.filterLabel}>Category:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.selectedChip,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category && styles.selectedChipText,
              ]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.statusFilter}>
        <Text style={styles.filterLabel}>Status:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {statuses.map(status => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusChip,
                selectedStatus === status && styles.selectedChip,
              ]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text style={[
                styles.statusChipText,
                selectedStatus === status && styles.selectedChipText,
              ]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No products found</Text>
      <Text style={styles.emptyStateSubtext}>
        Try adjusting your filters or add a new product
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Products</Text>
          <Text style={styles.subtitle}>Manage your inventory</Text>
        </View>
        <Button
          variant="primary"
          onPress={handleAddProduct}
          style={styles.addButton}
        >
          Add Product
        </Button>
      </View>
      
      {renderFilters()}
      
      <View style={styles.productsContainer}>
        {filteredProducts.length > 0 ? (
          <View style={styles.productsList}>
            {filteredProducts.map(renderProductCard)}
          </View>
        ) : (
          renderEmptyState()
        )}
      </View>
    </ScrollView>
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
    padding: spacing.component.padding.md,
    borderBottomWidth: 1,
    borderColor: colors.neutral[200],
  },
  headerContent: {
    flex: 1,
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
  addButton: {
    marginLeft: spacing.component.margin.md,
  },
  filtersContainer: {
    padding: spacing.component.padding.md,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderColor: colors.neutral[200],
  },
  searchContainer: {
    marginBottom: spacing.component.margin.md,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: spacing.radius.sm,
    padding: spacing.component.padding.sm,
    backgroundColor: colors.background.primary,
    ...typography.body,
    color: colors.text.primary,
  },
  categoryFilter: {
    marginBottom: spacing.component.margin.md,
  },
  statusFilter: {
    marginBottom: spacing.component.margin.md,
  },
  filterLabel: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  categoryChip: {
    paddingHorizontal: spacing.component.padding.md,
    paddingVertical: spacing.component.padding.sm,
    backgroundColor: colors.neutral[200],
    borderRadius: spacing.radius.sm,
    marginRight: spacing.component.margin.sm,
  },
  selectedChip: {
    backgroundColor: colors.primary[500],
  },
  categoryChipText: {
    ...typography.caption,
    color: colors.text.muted,
  },
  selectedChipText: {
    color: colors.text.inverted,
  },
  statusChip: {
    paddingHorizontal: spacing.component.padding.md,
    paddingVertical: spacing.component.padding.sm,
    backgroundColor: colors.neutral[200],
    borderRadius: spacing.radius.sm,
    marginRight: spacing.component.margin.sm,
  },
  statusChipText: {
    ...typography.caption,
    color: colors.text.muted,
  },
  productsContainer: {
    flex: 1,
    padding: spacing.component.padding.md,
  },
  productsList: {
    gap: spacing.component.margin.md,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.radius.md,
    padding: spacing.component.padding.md,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  productImageContainer: {
    position: 'relative',
    marginRight: spacing.component.margin.md,
  },
  productImage: {
    width: 80,
    height: 80,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.error[500],
    paddingHorizontal: spacing.component.padding.xs,
    paddingVertical: spacing.component.padding.xs / 2,
    borderRadius: spacing.radius.sm,
  },
  outOfStockText: {
    ...typography.caption,
    color: colors.text.inverted,
    fontWeight: '600',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    ...typography.h6,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  productDescription: {
    ...typography.body,
    color: colors.text.muted,
    marginBottom: spacing.component.margin.md,
    lineHeight: 16,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.component.margin.md,
  },
  productPrice: {
    ...typography.body,
    color: colors.primary[500],
    fontWeight: '600',
  },
  productStock: {
    ...typography.caption,
    color: colors.text.muted,
  },
  productSales: {
    ...typography.caption,
    color: colors.text.muted,
  },
  productActions: {
    flexDirection: 'row',
    gap: spacing.component.margin.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.component.padding.sm,
    backgroundColor: colors.primary[500],
    borderRadius: spacing.radius.sm,
    alignItems: 'center',
  },
  actionButtonText: {
    ...typography.caption,
    color: colors.text.inverted,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: colors.error[500],
  },
  deleteButtonText: {
    color: colors.text.inverted,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.component.padding.md,
  },
  emptyStateText: {
    ...typography.h6,
    color: colors.text.primary,
    marginBottom: spacing.component.margin.xs,
  },
  emptyStateSubtext: {
    ...typography.caption,
    color: colors.text.muted,
    textAlign: 'center',
  },
});

export default SupplierProductsScreen;