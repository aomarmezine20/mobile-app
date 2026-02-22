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
var ProductDetailScreen = function (_a) {
    var route = _a.route, navigation = _a.navigation;
    var product = route.params.product;
    var handleAddToCart = function () {
        // Add to cart logic
        console.log('Add to cart:', product);
    };
    var handleBuyNow = function () {
        // Buy now logic
        console.log('Buy now:', product);
    };
    var renderProductImages = function () { return (<react_native_1.View style={styles.imageContainer}>
      <Image_1.Image source={{ uri: product.image }} variant="default" style={styles.mainImage}/>
      <react_native_1.View style={styles.thumbnails}>
        <Image_1.Image source={{ uri: product.image }} variant="rounded" size="xs" style={styles.thumbnail}/>
        <Image_1.Image source={{ uri: product.image }} variant="rounded" size="xs" style={styles.thumbnail}/>
        <Image_1.Image source={{ uri: product.image }} variant="rounded" size="xs" style={styles.thumbnail}/>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderProductInfo = function () { return (<react_native_1.View style={styles.infoContainer}>
      <react_native_1.Text style={styles.productName}>{product.name}</react_native_1.Text>
      <react_native_1.View style={styles.ratingContainer}>
        <react_native_1.Text style={styles.rating}>{product.rating.toFixed(1)}</react_native_1.Text>
        <react_native_1.Text style={styles.reviews}>({product.rating * 100} reviews)</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.Text style={styles.price}>${product.price.toFixed(2)}</react_native_1.Text>
      <react_native_1.Text style={styles.description}>
        {product.description || 'High-quality product with excellent features and great value for money.'}
      </react_native_1.Text>
      
      <react_native_1.View style={styles.details}>
        <react_native_1.View style={styles.detailItem}>
          <react_native_1.Text style={styles.detailLabel}>Category:</react_native_1.Text>
          <react_native_1.Text style={styles.detailValue}>{product.category}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.detailItem}>
          <react_native_1.Text style={styles.detailLabel}>Stock:</react_native_1.Text>
          <react_native_1.Text style={styles.detailValue}>{product.stock} available</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.detailItem}>
          <react_native_1.Text style={styles.detailLabel}>SKU:</react_native_1.Text>
          <react_native_1.Text style={styles.detailValue}>{product.id}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderAddToCart = function () { return (<react_native_1.View style={styles.cartContainer}>
      <react_native_1.View style={styles.quantityContainer}>
        <Button_1.Button variant="outline" size="sm" onPress={function () { return console.log('Decrement'); }} style={styles.quantityButton}>
          -
        </Button_1.Button>
        <react_native_1.Text style={styles.quantity}>1</react_native_1.Text>
        <Button_1.Button variant="outline" size="sm" onPress={function () { return console.log('Increment'); }} style={styles.quantityButton}>
          +
        </Button_1.Button>
      </react_native_1.View>
      <Button_1.Button variant="primary" onPress={handleAddToCart} style={styles.addToCartButton}>
        Add to Cart
      </Button_1.Button>
      <Button_1.Button variant="secondary" onPress={handleBuyNow} style={styles.buyNowButton}>
        Buy Now
      </Button_1.Button>
    </react_native_1.View>); };
    var renderSimilarProducts = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.View style={styles.sectionHeader}>
        <react_native_1.Text style={styles.sectionTitle}>Similar Products</react_native_1.Text>
        <Button_1.Button variant="ghost" size="sm" onPress={function () { return console.log('View all'); }} style={styles.viewAllButton}>
          View All
        </Button_1.Button>
      </react_native_1.View>
      <FlatList data={products} keyExtractor={function (item) { return item.id; }} horizontal showsHorizontalScrollIndicator={false} renderItem={function (_a) {
            var item = _a.item;
            return (<react_native_1.TouchableOpacity style={styles.similarProduct} onPress={function () { return navigation.navigate('ProductDetail', { product: item }); }}>
            <Image_1.Image source={{ uri: item.image }} variant="rounded" size="sm" style={styles.similarProductImage}/>
            <react_native_1.Text style={styles.similarProductName} numberOfLines={1}>
              {item.name}
            </react_native_1.Text>
            <react_native_1.Text style={styles.similarProductPrice}>
              ${item.price.toFixed(2)}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>);
        }}/>
    </react_native_1.View>); };
    return (<react_native_1.ScrollView style={styles.container}>
      {renderProductImages()}
      {renderProductInfo()}
      {renderAddToCart()}
      {renderSimilarProducts()}
    </react_native_1.ScrollView>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants_1.colors.background.primary,
    },
    imageContainer: {
        backgroundColor: constants_1.colors.background.secondary,
        padding: constants_1.spacing.component.padding.md,
    },
    mainImage: {
        width: '100%',
        height: 300,
        borderRadius: constants_1.spacing.radius.md,
        marginBottom: constants_1.spacing.component.margin.sm,
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
        padding: constants_1.spacing.component.padding.md,
    },
    productName: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.sm,
    },
    rating: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.primary[500], fontWeight: 'bold', marginRight: constants_1.spacing.component.margin.xs }),
    reviews: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    price: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.primary[500], fontWeight: 'bold', marginBottom: constants_1.spacing.component.margin.md }),
    description: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.md }),
    details: {
        marginTop: constants_1.spacing.component.margin.md,
        paddingVertical: constants_1.spacing.component.padding.md,
        borderTopWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    detailItem: {
        flexDirection: 'row',
        marginBottom: constants_1.spacing.component.margin.xs,
    },
    detailLabel: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted, marginRight: constants_1.spacing.component.margin.xs }),
    detailValue: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.primary }),
    cartContainer: {
        padding: constants_1.spacing.component.padding.md,
        borderTopWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    quantityButton: {
        width: 32,
        height: 32,
        padding: 0,
        marginHorizontal: constants_1.spacing.component.margin.xs,
    },
    quantity: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginHorizontal: constants_1.spacing.component.margin.md }),
    addToCartButton: {
        marginBottom: constants_1.spacing.component.margin.sm,
    },
    buyNowButton: {
        marginBottom: constants_1.spacing.component.margin.sm,
    },
    section: {
        padding: constants_1.spacing.component.padding.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    sectionTitle: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary }),
    viewAllButton: {
        paddingHorizontal: constants_1.spacing.component.padding.xs,
    },
    similarProduct: {
        width: 120,
        marginRight: constants_1.spacing.component.margin.sm,
    },
    similarProductImage: {
        width: '100%',
        height: 120,
        borderRadius: constants_1.spacing.radius.md,
        marginBottom: constants_1.spacing.component.margin.xs,
    },
    similarProductName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    similarProductPrice: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.primary[500], fontWeight: 'bold' }),
});
var products = [
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
exports.default = ProductDetailScreen;
