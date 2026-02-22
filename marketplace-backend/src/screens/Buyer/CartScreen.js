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
var CartScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState([
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
    ]), cartItems = _b[0], setCartItems = _b[1];
    var _c = react_1.default.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var calculateTotal = function () {
        return cartItems.reduce(function (total, item) { return total + item.price * item.quantity; }, 0);
    };
    var handleQuantityChange = function (id, quantity) {
        setCartItems(function (prevItems) {
            return prevItems.map(function (item) {
                return item.id === id ? __assign(__assign({}, item), { quantity: quantity }) : item;
            });
        });
    };
    var handleRemoveItem = function (id) {
        setCartItems(function (prevItems) { return prevItems.filter(function (item) { return item.id !== id; }); });
    };
    var handleCheckout = function () {
        setIsLoading(true);
        setTimeout(function () {
            setIsLoading(false);
            navigation.navigate('Checkout');
        }, 1000);
    };
    var renderCartItem = function (_a) {
        var item = _a.item;
        return (<react_native_1.View style={styles.cartItem}>
      <react_native_1.View style={styles.imageContainer}>
        <Image_1.Image source={{ uri: item.image }} variant="rounded" size="sm" style={styles.image}/>
      </react_native_1.View>
      <react_native_1.View style={styles.content}>
        <react_native_1.Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </react_native_1.Text>
        <react_native_1.Text style={styles.price}>${item.price.toFixed(2)}</react_native_1.Text>
        <react_native_1.View style={styles.quantityContainer}>
          <Button_1.Button variant="outline" size="sm" onPress={function () { return handleQuantityChange(item.id, Math.max(1, item.quantity - 1)); }} style={styles.quantityButton}>
            -
          </Button_1.Button>
          <react_native_1.Text style={styles.quantity}>{item.quantity}</react_native_1.Text>
          <Button_1.Button variant="outline" size="sm" onPress={function () { return handleQuantityChange(item.id, item.quantity + 1); }} style={styles.quantityButton}>
            +
          </Button_1.Button>
        </react_native_1.View>
      </react_native_1.View>
      <Button_1.Button variant="ghost" size="sm" onPress={function () { return handleRemoveItem(item.id); }} style={styles.removeButton}>
        Remove
      </Button_1.Button>
    </react_native_1.View>);
    };
    var renderEmptyState = function () { return (<react_native_1.View style={styles.emptyState}>
      <Image_1.Image source={{ uri: 'https://example.com/empty-cart.png' }} variant="rounded" size="lg" style={styles.emptyImage}/>
      <react_native_1.Text style={styles.emptyTitle}>Your cart is empty</react_native_1.Text>
      <react_native_1.Text style={styles.emptySubtitle}>
        Add some products to get started
      </react_native_1.Text>
      <Button_1.Button variant="primary" onPress={function () { return navigation.navigate('Home'); }} style={styles.continueShoppingButton}>
        Continue Shopping
      </Button_1.Button>
    </react_native_1.View>); };
    var renderCheckout = function () {
        var total = calculateTotal();
        var tax = total * 0.08;
        var shipping = total > 100 ? 0 : 9.99;
        var grandTotal = total + tax + shipping;
        return (<react_native_1.View style={styles.checkout}>
        <react_native_1.View style={styles.summary}>
          <react_native_1.View style={styles.summaryRow}>
            <react_native_1.Text style={styles.summaryLabel}>Subtotal:</react_native_1.Text>
            <react_native_1.Text style={styles.summaryValue}>${total.toFixed(2)}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.summaryRow}>
            <react_native_1.Text style={styles.summaryLabel}>Tax:</react_native_1.Text>
            <react_native_1.Text style={styles.summaryValue}>${tax.toFixed(2)}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.summaryRow}>
            <react_native_1.Text style={styles.summaryLabel}>Shipping:</react_native_1.Text>
            <react_native_1.Text style={styles.summaryValue}>
              {shipping === 0 ? 'FREE' : "$".concat(shipping.toFixed(2))}
            </react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={[styles.summaryRow, styles.totalRow]}>
            <react_native_1.Text style={styles.totalLabel}>Total:</react_native_1.Text>
            <react_native_1.Text style={styles.totalValue}>${grandTotal.toFixed(2)}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        <Button_1.Button variant="primary" onPress={handleCheckout} loading={isLoading} style={styles.checkoutButton}>
          Proceed to Checkout
        </Button_1.Button>
      </react_native_1.View>);
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.title}>Shopping Cart</react_native_1.Text>
        <react_native_1.Text style={styles.itemCount}>
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
        </react_native_1.Text>
      </react_native_1.View>
      
      {cartItems.length > 0 ? (<react_native_1.FlatList data={cartItems} renderItem={renderCartItem} keyExtractor={function (item) { return item.id; }} contentContainerStyle={styles.cartList} showsVerticalScrollIndicator={false}/>) : (renderEmptyState())}
      
      {cartItems.length > 0 && renderCheckout()}
    </react_native_1.View>);
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
    itemCount: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    cartList: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
    },
    cartItem: __assign({ flexDirection: 'row', alignItems: 'center', backgroundColor: constants_1.colors.background.secondary, borderRadius: constants_1.spacing.radius.md, padding: constants_1.spacing.component.padding.md, marginBottom: constants_1.spacing.component.margin.sm }, constants_1.spacing.shadow.sm),
    imageContainer: {
        marginRight: constants_1.spacing.component.margin.md,
    },
    image: {
        width: 60,
        height: 60,
    },
    content: {
        flex: 1,
    },
    productName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    price: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.primary[500], fontWeight: 'bold', marginBottom: constants_1.spacing.component.margin.xs }),
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 24,
        height: 24,
        padding: 0,
        marginHorizontal: constants_1.spacing.component.margin.xs,
    },
    quantity: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginHorizontal: constants_1.spacing.component.margin.sm }),
    removeButton: {
        paddingHorizontal: constants_1.spacing.component.padding.xs,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: constants_1.spacing.component.padding.md,
    },
    emptyImage: {
        width: 200,
        height: 200,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    emptyTitle: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.sm }),
    emptySubtitle: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.muted, textAlign: 'center', marginBottom: constants_1.spacing.component.margin.md }),
    continueShoppingButton: {
        width: '100%',
    },
    checkout: {
        padding: constants_1.spacing.component.padding.md,
        borderTopWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    summary: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: constants_1.spacing.component.margin.xs,
    },
    summaryLabel: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary }),
    summaryValue: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary }),
    totalRow: {
        marginTop: constants_1.spacing.component.margin.md,
        paddingTop: constants_1.spacing.component.padding.xs,
        borderTopWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    totalLabel: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: 'bold' }),
    totalValue: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.primary[500], fontWeight: 'bold' }),
    checkoutButton: {
        width: '100%',
    },
});
exports.default = CartScreen;
