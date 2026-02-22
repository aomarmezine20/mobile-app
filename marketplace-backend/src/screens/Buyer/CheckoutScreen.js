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
var AppContext_1 = require("../../components/context/AppContext");
var constants_1 = require("../../constants");
var Button_1 = require("../ui/atoms/Button");
var CheckoutScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = (0, AppContext_1.useApp)(), state = _b.state, clearCart = _b.clearCart;
    var _c = react_1.default.useState({
        fullName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    }), shippingInfo = _c[0], setShippingInfo = _c[1];
    var _d = react_1.default.useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: '',
    }), paymentInfo = _d[0], setPaymentInfo = _d[1];
    var _e = react_1.default.useState(false), isLoading = _e[0], setIsLoading = _e[1];
    var handlePlaceOrder = function () {
        setIsLoading(true);
        setTimeout(function () {
            setIsLoading(false);
            clearCart();
            navigation.navigate('OrderConfirmation');
        }, 2000);
    };
    var renderShippingInfo = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.Text style={styles.sectionTitle}>Shipping Information</react_native_1.Text>
      <react_native_1.View style={styles.inputGroup}>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>Full Name</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={shippingInfo.fullName} onChangeText={function (text) { return setShippingInfo(__assign(__assign({}, shippingInfo), { fullName: text })); }} placeholder="John Doe"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>Email</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={shippingInfo.email} onChangeText={function (text) { return setShippingInfo(__assign(__assign({}, shippingInfo), { email: text })); }} placeholder="john@example.com" keyboardType="email-address"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>Phone</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={shippingInfo.phone} onChangeText={function (text) { return setShippingInfo(__assign(__assign({}, shippingInfo), { phone: text })); }} placeholder="+1 555 123 4567" keyboardType="phone-pad"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>Street Address</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={shippingInfo.street} onChangeText={function (text) { return setShippingInfo(__assign(__assign({}, shippingInfo), { street: text })); }} placeholder="123 Main St"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>City</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={shippingInfo.city} onChangeText={function (text) { return setShippingInfo(__assign(__assign({}, shippingInfo), { city: text })); }} placeholder="New York"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>State</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={shippingInfo.state} onChangeText={function (text) { return setShippingInfo(__assign(__assign({}, shippingInfo), { state: text })); }} placeholder="NY"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>ZIP Code</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={shippingInfo.zipCode} onChangeText={function (text) { return setShippingInfo(__assign(__assign({}, shippingInfo), { zipCode: text })); }} placeholder="10001" keyboardType="numeric"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>Country</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={shippingInfo.country} onChangeText={function (text) { return setShippingInfo(__assign(__assign({}, shippingInfo), { country: text })); }} placeholder="United States"/>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderPaymentInfo = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.Text style={styles.sectionTitle}>Payment Information</react_native_1.Text>
      <react_native_1.View style={styles.inputGroup}>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>Card Number</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={paymentInfo.cardNumber} onChangeText={function (text) { return setPaymentInfo(__assign(__assign({}, paymentInfo), { cardNumber: text })); }} placeholder="1234 5678 9012 3456" keyboardType="numeric"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>Expiry Date</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={paymentInfo.expiryDate} onChangeText={function (text) { return setPaymentInfo(__assign(__assign({}, paymentInfo), { expiryDate: text })); }} placeholder="MM/YY" keyboardType="numeric"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>CVV</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={paymentInfo.cvv} onChangeText={function (text) { return setPaymentInfo(__assign(__assign({}, paymentInfo), { cvv: text })); }} placeholder="123" keyboardType="numeric" secureTextEntry/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>Cardholder Name</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={paymentInfo.cardName} onChangeText={function (text) { return setPaymentInfo(__assign(__assign({}, paymentInfo), { cardName: text })); }} placeholder="John Doe"/>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderOrderSummary = function () {
        var cartItems = state.cart.items;
        var subtotal = cartItems.reduce(function (total, item) { return total + item.price * item.quantity; }, 0);
        var tax = subtotal * 0.08;
        var shipping = subtotal > 100 ? 0 : 9.99;
        var total = subtotal + tax + shipping;
        return (<react_native_1.View style={styles.section}>
        <react_native_1.Text style={styles.sectionTitle}>Order Summary</react_native_1.Text>
        <react_native_1.View style={styles.orderItems}>
          {cartItems.map(function (item) { return (<react_native_1.View key={item.id} style={styles.orderItem}>
              <react_native_1.Text style={styles.orderItemName} numberOfLines={1}>
                {item.name}
              </react_native_1.Text>
              <react_native_1.Text style={styles.orderItemPrice}>
                ${item.price.toFixed(2)} x {item.quantity}
              </react_native_1.Text>
            </react_native_1.View>); })}
        </react_native_1.View>
        <react_native_1.View style={styles.summary}>
          <react_native_1.View style={styles.summaryRow}>
            <react_native_1.Text style={styles.summaryLabel}>Subtotal:</react_native_1.Text>
            <react_native_1.Text style={styles.summaryValue}>${subtotal.toFixed(2)}</react_native_1.Text>
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
            <react_native_1.Text style={styles.totalValue}>${total.toFixed(2)}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>);
    };
    var renderPlaceOrder = function () { return (<react_native_1.View style={styles.placeOrder}>
      <Button_1.Button variant="primary" onPress={handlePlaceOrder} loading={isLoading} style={styles.placeOrderButton}>
        Place Order
      </Button_1.Button>
    </react_native_1.View>); };
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.title}>Checkout</react_native_1.Text>
        <react_native_1.Text style={styles.step}>Step 2 of 2</react_native_1.Text>
      </react_native_1.View>
      
      {renderShippingInfo()}
      {renderPaymentInfo()}
      {renderOrderSummary()}
      {renderPlaceOrder()}
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
    step: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    section: {
        padding: constants_1.spacing.component.padding.md,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    sectionTitle: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.md }),
    inputGroup: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    inputItem: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    inputLabel: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted, marginBottom: constants_1.spacing.component.margin.xs }),
    input: __assign(__assign({}, constants_1.typography.body), { height: 48, backgroundColor: constants_1.colors.background.secondary, borderRadius: constants_1.spacing.radius.md, paddingHorizontal: constants_1.spacing.component.padding.sm, borderWidth: 1, borderColor: constants_1.colors.neutral[200] }),
    orderItems: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: constants_1.spacing.component.margin.xs,
    },
    orderItemName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, flex: 1 }),
    orderItemPrice: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginLeft: constants_1.spacing.component.margin.sm }),
    summary: {
        marginTop: constants_1.spacing.component.margin.md,
        paddingVertical: constants_1.spacing.component.padding.md,
        borderTopWidth: 1,
        borderColor: constants_1.colors.neutral[200],
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
    placeOrder: {
        padding: constants_1.spacing.component.padding.md,
    },
    placeOrderButton: {
        width: '100%',
    },
});
exports.default = CheckoutScreen;
