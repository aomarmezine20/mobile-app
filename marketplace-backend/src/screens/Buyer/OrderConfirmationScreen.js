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
var OrderConfirmationScreen = function (_a) {
    var _b;
    var navigation = _a.navigation, route = _a.route;
    var incomingOrder = (_b = route === null || route === void 0 ? void 0 : route.params) === null || _b === void 0 ? void 0 : _b.order;
    var order = incomingOrder || {
        id: '12345',
        date: '2024-01-15',
        status: 'processing',
        total: 129.98,
        items: [
            {
                name: 'Wireless Headphones',
                price: 79.99,
                quantity: 1,
                image: 'https://example.com/headphones.jpg',
            },
            {
                name: 'Smart Watch',
                price: 199.99,
                quantity: 2,
                image: 'https://example.com/watch.jpg',
            },
        ],
        shippingAddress: {
            fullName: 'John Doe',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
        },
        paymentMethod: {
            cardNumber: '**** **** **** 1234',
            cardName: 'John Doe',
        },
    };
    var handleContinueShopping = function () {
        navigation.navigate('Home');
    };
    var handleViewOrder = function () {
        navigation.navigate('OrderDetail', { order: order });
    };
    var renderOrderSummary = function () {
        var subtotal = order.items.reduce(function (total, item) { return total + item.price * item.quantity; }, 0);
        var tax = subtotal * 0.08;
        var shipping = subtotal > 100 ? 0 : 9.99;
        var total = subtotal + tax + shipping;
        return (<react_native_1.View style={styles.section}>
        <react_native_1.Text style={styles.sectionTitle}>Order Summary</react_native_1.Text>
        <react_native_1.View style={styles.orderItems}>
          {order.items.map(function (item) { return (<react_native_1.View key={item.name} style={styles.orderItem}>
              <Image_1.Image source={{ uri: item.image }} variant="rounded" size="xs" style={styles.itemImage}/>
              <react_native_1.View style={styles.itemContent}>
                <react_native_1.Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </react_native_1.Text>
                <react_native_1.Text style={styles.itemPrice}>
                  ${item.price.toFixed(2)} x {item.quantity}
                </react_native_1.Text>
              </react_native_1.View>
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
    var renderOrderDetails = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.Text style={styles.sectionTitle}>Order Details</react_native_1.Text>
      <react_native_1.View style={styles.orderDetails}>
        <react_native_1.View style={styles.detailRow}>
          <react_native_1.Text style={styles.detailLabel}>Order ID:</react_native_1.Text>
          <react_native_1.Text style={styles.detailValue}>{order.id}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.detailRow}>
          <react_native_1.Text style={styles.detailLabel}>Date:</react_native_1.Text>
          <react_native_1.Text style={styles.detailValue}>{order.date}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.detailRow}>
          <react_native_1.Text style={styles.detailLabel}>Status:</react_native_1.Text>
          <react_native_1.View style={[styles.statusBadge, { backgroundColor: constants_1.colors.primary[500] }]}>
            <react_native_1.Text style={styles.statusText}>Processing</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderShippingInfo = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.Text style={styles.sectionTitle}>Shipping Address</react_native_1.Text>
      <react_native_1.View style={styles.address}>
        <react_native_1.Text style={styles.addressName}>{order.shippingAddress.fullName}</react_native_1.Text>
        <react_native_1.Text style={styles.addressStreet}>{order.shippingAddress.street}</react_native_1.Text>
        <react_native_1.Text style={styles.addressCityStateZip}>
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
        </react_native_1.Text>
        <react_native_1.Text style={styles.addressCountry}>{order.shippingAddress.country}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderPaymentInfo = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.Text style={styles.sectionTitle}>Payment Method</react_native_1.Text>
      <react_native_1.View style={styles.payment}>
        <react_native_1.Text style={styles.paymentCard}>{order.paymentMethod.cardNumber}</react_native_1.Text>
        <react_native_1.Text style={styles.paymentName}>{order.paymentMethod.cardName}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderActions = function () { return (<react_native_1.View style={styles.actions}>
      <Button_1.Button variant="outline" onPress={handleContinueShopping} style={styles.continueButton}>
        Continue Shopping
      </Button_1.Button>
      <Button_1.Button variant="primary" onPress={handleViewOrder} style={styles.viewOrderButton}>
        View Order
      </Button_1.Button>
    </react_native_1.View>); };
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.title}>Order Confirmation</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>Thank you for your purchase!</react_native_1.Text>
      </react_native_1.View>
      
      <react_native_1.View style={styles.confirmation}>
        <react_native_1.Text style={styles.confirmationIcon}>✅</react_native_1.Text>
        <react_native_1.Text style={styles.confirmationTitle}>Order Placed Successfully</react_native_1.Text>
        <react_native_1.Text style={styles.confirmationMessage}>
          Your order #{order.id} has been received and is being processed.
        </react_native_1.Text>
      </react_native_1.View>
      
      {renderOrderSummary()}
      {renderOrderDetails()}
      {renderShippingInfo()}
      {renderPaymentInfo()}
      {renderActions()}
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
    confirmation: {
        alignItems: 'center',
        padding: constants_1.spacing.component.padding.md,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    confirmationIcon: {
        fontSize: 48,
        marginBottom: constants_1.spacing.component.margin.sm,
    },
    confirmationTitle: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    confirmationMessage: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.muted, textAlign: 'center' }),
    section: {
        padding: constants_1.spacing.component.padding.md,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    sectionTitle: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.md }),
    orderItems: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.xs,
    },
    itemImage: {
        width: 40,
        height: 40,
        marginRight: constants_1.spacing.component.margin.sm,
    },
    itemContent: {
        flex: 1,
    },
    itemName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    itemPrice: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
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
    orderDetails: {
        marginTop: constants_1.spacing.component.margin.md,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: constants_1.spacing.component.margin.xs,
    },
    detailLabel: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.muted }),
    detailValue: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary }),
    statusBadge: {
        paddingHorizontal: constants_1.spacing.component.padding.xs,
        paddingVertical: constants_1.spacing.component.padding.xs / 2,
        borderRadius: constants_1.spacing.radius.sm,
    },
    statusText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.inverted, fontWeight: '600' }),
    address: {
        marginTop: constants_1.spacing.component.margin.md,
    },
    addressName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    addressStreet: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    addressCityStateZip: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    addressCountry: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary }),
    payment: {
        marginTop: constants_1.spacing.component.margin.md,
    },
    paymentCard: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    paymentName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.muted }),
    actions: {
        flexDirection: 'row',
        gap: constants_1.spacing.component.margin.sm,
        padding: constants_1.spacing.component.padding.md,
    },
    continueButton: {
        flex: 1,
    },
    viewOrderButton: {
        flex: 1,
    },
});
exports.default = OrderConfirmationScreen;
