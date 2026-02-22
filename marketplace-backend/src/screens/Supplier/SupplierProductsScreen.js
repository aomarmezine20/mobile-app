"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var constants_1 = require("../../constants");
var Button_1 = require("../ui/atoms/Button");
var Image_1 = require("../ui/atoms/Image");
var SupplierProductsScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState([
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
    ]), products = _b[0], setProducts = _b[1];
    var _c = react_1.default.useState(''), searchQuery = _c[0], setSearchQuery = _c[1];
    var _d = react_1.default.useState('all'), selectedCategory = _d[0], setSelectedCategory = _d[1];
    var _e = react_1.default.useState('all'), selectedStatus = _e[0], setSelectedStatus = _e[1];
    var categories = ['all', 'Electronics', 'Accessories', 'Clothing', 'Home'];
    var statuses = ['all', 'active', 'inactive'];
    var filteredProducts = products.filter(function (product) {
        var matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        var matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        var matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });
    var getStatusColor = function (status) {
        var statusColors = {
            active: constants_1.colors.success[500],
            inactive: constants_1.colors.error[500],
            pending: constants_1.colors.warning[500],
        };
        return statusColors[status] || constants_1.colors.text.muted;
    };
    var getStatusText = function (status) {
        var statusText = {
            active: 'Active',
            inactive: 'Inactive',
            pending: 'Pending',
        };
        return statusText[status] || status;
    };
    var handleEditProduct = function (productId) {
        navigation.navigate('SupplierEditProduct', { productId: productId });
    };
    var handleDeleteProduct = function (productId) {
        setProducts(products.filter(function (product) { return product.id !== productId; }));
    };
    var handleAddProduct = function () {
        navigation.navigate('SupplierAddProduct');
    };
    var renderProductCard = function (_a) {
        var item = _a.item;
        return (<react_native_1.View key={item.id} style={styles.productCard}>
      <react_native_1.View style={styles.productImageContainer}>
        <Image_1.Image source={{ uri: item.image }} variant="rounded" size="md" style={styles.productImage}/>
        {item.stock === 0 && (<react_native_1.View style={styles.outOfStockBadge}>
            <react_native_1.Text style={styles.outOfStockText}>Out of Stock</react_native_1.Text>
          </react_native_1.View>)}
      </react_native_1.View>
      <react_native_1.View style={styles.productInfo}>
        <react_native_1.Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </react_native_1.Text>
        <react_native_1.Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </react_native_1.Text>
        <react_native_1.View style={styles.productMeta}>
          <react_native_1.Text style={styles.productPrice}>${item.price.toFixed(2)}</react_native_1.Text>
          <react_native_1.Text style={styles.productStock}>Stock: {item.stock}</react_native_1.Text>
          <react_native_1.Text style={styles.productSales}>{item.sales} sold</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.productActions}>
          <react_native_1.TouchableOpacity style={styles.actionButton} onPress={function () { return handleEditProduct(item.id); }}>
            <react_native_1.Text style={styles.actionButtonText}>Edit</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={function () { return handleDeleteProduct(item.id); }}>
            <react_native_1.Text style={styles.deleteButtonText}>Delete</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>);
    };
    var renderFilters = function () { return (<react_native_1.View style={styles.filtersContainer}>
      <react_native_1.View style={styles.searchContainer}>
        <react_native_1.TextInput style={styles.searchInput} placeholder="Search products..." value={searchQuery} onChangeText={setSearchQuery}/>
      </react_native_1.View>
      <react_native_1.View style={styles.categoryFilter}>
        <react_native_1.Text style={styles.filterLabel}>Category:</react_native_1.Text>
        <react_native_1.ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(function (category) { return (<react_native_1.TouchableOpacity key={category} style={[
                styles.categoryChip,
                selectedCategory === category && styles.selectedChip,
            ]} onPress={function () { return setSelectedCategory(category); }}>
              <react_native_1.Text style={[
                styles.categoryChipText,
                selectedCategory === category && styles.selectedChipText,
            ]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </react_native_1.Text>
            </react_native_1.TouchableOpacity>); })}
        </react_native_1.ScrollView>
      </react_native_1.View>
      <react_native_1.View style={styles.statusFilter}>
        <react_native_1.Text style={styles.filterLabel}>Status:</react_native_1.Text>
        <react_native_1.ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {statuses.map(function (status) { return (<react_native_1.TouchableOpacity key={status} style={[
                styles.statusChip,
                selectedStatus === status && styles.selectedChip,
            ]} onPress={function () { return setSelectedStatus(status); }}>
              <react_native_1.Text style={[
                styles.statusChipText,
                selectedStatus === status && styles.selectedChipText,
            ]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </react_native_1.Text>
            </react_native_1.TouchableOpacity>); })}
        </react_native_1.ScrollView>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderEmptyState = function () { return (<react_native_1.View style={styles.emptyState}>
      <react_native_1.Text style={styles.emptyStateText}>No products found</react_native_1.Text>
      <react_native_1.Text style={styles.emptyStateSubtext}>
        Try adjusting your filters or add a new product
      </react_native_1.Text>
    </react_native_1.View>); };
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.View style={styles.headerContent}>
          <react_native_1.Text style={styles.title}>Products</react_native_1.Text>
          <react_native_1.Text style={styles.subtitle}>Manage your inventory</react_native_1.Text>
        </react_native_1.View>
        <Button_1.Button variant="primary" onPress={handleAddProduct} style={styles.addButton}>
          Add Product
        </Button_1.Button>
      </react_native_1.View>
      
      {renderFilters()}
      
      <react_native_1.View style={styles.productsContainer}>
        {filteredProducts.length > 0 ? (<react_native_1.View style={styles.productsList}>
            {filteredProducts.map(renderProductCard)}
          </react_native_1.View>) : (renderEmptyState())}
      </react_native_1.View>
    </react_native_1.ScrollView>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants_1.colors.background.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: constants_1.spacing.component.padding.md,
        borderBottomWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    headerContent: {
        flex: 1,
    },
    title: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    subtitle: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    addButton: {
        marginLeft: constants_1.spacing.component.margin.md,
    },
    filtersContainer: {
        padding: constants_1.spacing.component.padding.md,
        backgroundColor: constants_1.colors.background.secondary,
        borderBottomWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    searchContainer: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    searchInput: __assign(__assign({ borderWidth: 1, borderColor: constants_1.colors.neutral[300], borderRadius: constants_1.spacing.radius.sm, padding: constants_1.spacing.component.padding.sm, backgroundColor: constants_1.colors.background.primary }, constants_1.typography.body), { color: constants_1.colors.text.primary }),
    categoryFilter: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    statusFilter: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    filterLabel: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    categoryChip: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
        paddingVertical: constants_1.spacing.component.padding.sm,
        backgroundColor: constants_1.colors.neutral[200],
        borderRadius: constants_1.spacing.radius.sm,
        marginRight: constants_1.spacing.component.margin.sm,
    },
    selectedChip: {
        backgroundColor: constants_1.colors.primary[500],
    },
    categoryChipText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    selectedChipText: {
        color: constants_1.colors.text.inverted,
    },
    statusChip: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
        paddingVertical: constants_1.spacing.component.padding.sm,
        backgroundColor: constants_1.colors.neutral[200],
        borderRadius: constants_1.spacing.radius.sm,
        marginRight: constants_1.spacing.component.margin.sm,
    },
    statusChipText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    productsContainer: {
        flex: 1,
        padding: constants_1.spacing.component.padding.md,
    },
    productsList: {
        gap: constants_1.spacing.component.margin.md,
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: constants_1.colors.background.secondary,
        borderRadius: constants_1.spacing.radius.md,
        padding: constants_1.spacing.component.padding.md,
        borderWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    productImageContainer: {
        position: 'relative',
        marginRight: constants_1.spacing.component.margin.md,
    },
    productImage: {
        width: 80,
        height: 80,
    },
    outOfStockBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: constants_1.colors.error[500],
        paddingHorizontal: constants_1.spacing.component.padding.xs,
        paddingVertical: constants_1.spacing.component.padding.xs / 2,
        borderRadius: constants_1.spacing.radius.sm,
    },
    outOfStockText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.inverted, fontWeight: '600' }),
    productInfo: {
        flex: 1,
    },
    productName: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    productDescription: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.muted, marginBottom: constants_1.spacing.component.margin.md, lineHeight: 16 }),
    productMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    productPrice: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.primary[500], fontWeight: '600' }),
    productStock: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    productSales: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    productActions: {
        flexDirection: 'row',
        gap: constants_1.spacing.component.margin.sm,
    },
    actionButton: {
        flex: 1,
        paddingVertical: constants_1.spacing.component.padding.sm,
        backgroundColor: constants_1.colors.primary[500],
        borderRadius: constants_1.spacing.radius.sm,
        alignItems: 'center',
    },
    actionButtonText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.inverted, fontWeight: '600' }),
    deleteButton: {
        backgroundColor: constants_1.colors.error[500],
    },
    deleteButtonText: {
        color: constants_1.colors.text.inverted,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: constants_1.spacing.component.padding.md,
    },
    emptyStateText: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    emptyStateSubtext: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted, textAlign: 'center' }),
});
exports.default = SupplierProductsScreen;
