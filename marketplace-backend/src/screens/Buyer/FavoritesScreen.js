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
var Badge_1 = require("../ui/atoms/Badge");
var Button_1 = require("../ui/atoms/Button");
var Image_1 = require("../ui/atoms/Image");
var FavoritesScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState([
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
    ]), favorites = _b[0], setFavorites = _b[1];
    var _c = react_1.default.useState(null), selectedProduct = _c[0], setSelectedProduct = _c[1];
    var handleProductPress = function (product) {
        setSelectedProduct(product);
        navigation.navigate('ProductDetail', { product: product });
    };
    var handleRemoveFromFavorites = function (productId) {
        setFavorites(function (prevFavorites) {
            return prevFavorites.filter(function (product) { return product.id !== productId; });
        });
    };
    var handleAddToCart = function (product) {
        // Add to cart logic
        console.log('Add to cart:', product);
    };
    var renderProduct = function (_a) {
        var item = _a.item;
        return (<react_native_1.View style={styles.productCard}>
      <react_native_1.View style={styles.imageContainer}>
        <Image_1.Image source={{ uri: item.image }} variant="rounded" size="md" style={styles.productImage}/>
        {item.discount > 0 && (<Badge_1.Badge variant="discount">-{item.discount}%</Badge_1.Badge>)}
      </react_native_1.View>
      
      <react_native_1.View style={styles.productInfo}>
        <react_native_1.Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </react_native_1.Text>
        <react_native_1.Text style={styles.productBrand} numberOfLines={1}>
          {item.brand}
        </react_native_1.Text>
        
        <react_native_1.View style={styles.productRating}>
          <react_native_1.Text style={styles.productRatingText}>
            {item.rating.toFixed(1)}
          </react_native_1.Text>
          <react_native_1.Text style={styles.productReviews}>
            ({item.reviews})
          </react_native_1.Text>
        </react_native_1.View>
        
        <react_native_1.View style={styles.productPrice}>
          <react_native_1.Text style={styles.productPriceCurrent}>
            ${item.price.toFixed(2)}
          </react_native_1.Text>
          {item.originalPrice > item.price && (<react_native_1.Text style={styles.productPriceOriginal}>
              ${item.originalPrice.toFixed(2)}
            </react_native_1.Text>)}
        </react_native_1.View>
        
        <react_native_1.View style={styles.productActions}>
          <Button_1.Button variant="outline" onPress={function () { return handleAddToCart(item); }} style={styles.addToCartButton}>
            Add to Cart
          </Button_1.Button>
          <react_native_1.TouchableOpacity onPress={function () { return handleRemoveFromFavorites(item.id); }} style={styles.removeFromFavoritesButton}>
            <react_native_1.Text style={styles.removeFromFavoritesText}>Remove</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>);
    };
    var renderEmptyState = function () { return (<react_native_1.View style={styles.emptyState}>
      <react_native_1.Text style={styles.emptyIcon}>⭐</react_native_1.Text>
      <react_native_1.Text style={styles.emptyTitle}>No favorites yet</react_native_1.Text>
      <react_native_1.Text style={styles.emptySubtitle}>
        Add products to your favorites to see them here
      </react_native_1.Text>
      <Button_1.Button variant="primary" onPress={function () { return navigation.navigate('Home'); }} style={styles.continueShoppingButton}>
        Start Shopping
      </Button_1.Button>
    </react_native_1.View>); };
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.title}>My Favorites</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>
          {favorites.length} saved products
        </react_native_1.Text>
      </react_native_1.View>
      
      {favorites.length > 0 ? (<react_native_1.View style={styles.productsList}>
          <FlatList data={favorites} renderItem={renderProduct} keyExtractor={function (item) { return item.id; }} contentContainerStyle={styles.productsContainer} showsVerticalScrollIndicator={false}/>
        </react_native_1.View>) : (renderEmptyState())}
    </react_native_1.ScrollView>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants_1.colors.background.primary,
    },
    header: {
        padding: constants_1.spacing.component.padding.md,
        borderBottomWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    title: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    subtitle: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    productsList: {
        flex: 1,
    },
    productsContainer: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
    },
    productCard: __assign({ flexDirection: 'row', backgroundColor: constants_1.colors.background.secondary, borderRadius: constants_1.spacing.radius.md, padding: constants_1.spacing.component.padding.md, marginBottom: constants_1.spacing.component.margin.sm }, constants_1.spacing.shadow.sm),
    imageContainer: {
        position: 'relative',
        marginRight: constants_1.spacing.component.margin.md,
    },
    productImage: {
        width: 100,
        height: 100,
    },
    productInfo: {
        flex: 1,
    },
    productName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    productBrand: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted, marginBottom: constants_1.spacing.component.margin.sm }),
    productRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.sm,
    },
    productRatingText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.primary, fontWeight: 'bold', marginRight: constants_1.spacing.component.margin.xs }),
    productReviews: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    productPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.sm,
    },
    productPriceCurrent: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.primary[500], fontWeight: 'bold', marginRight: constants_1.spacing.component.margin.sm }),
    productPriceOriginal: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted, textDecorationLine: 'line-through' }),
    productActions: {
        flexDirection: 'row',
        gap: constants_1.spacing.component.margin.sm,
    },
    addToCartButton: {
        flex: 1,
    },
    removeFromFavoritesButton: {
        paddingHorizontal: constants_1.spacing.component.padding.sm,
        paddingVertical: constants_1.spacing.component.padding.xs,
        borderRadius: constants_1.spacing.radius.sm,
        backgroundColor: constants_1.colors.error[50],
    },
    removeFromFavoritesText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.error[500], fontWeight: '600' }),
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: constants_1.spacing.component.padding.md,
        marginTop: constants_1.spacing.component.margin.md,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    emptyTitle: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    emptySubtitle: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.muted, textAlign: 'center', marginBottom: constants_1.spacing.component.margin.md }),
    continueShoppingButton: {
        width: '100%',
    },
});
exports.default = FavoritesScreen;
