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
var OrderDetailScreen = function (_a) {
    var _b;
    var navigation = _a.navigation, route = _a.route;
    var order = ((_b = route.params) === null || _b === void 0 ? void 0 : _b.order) || {
        id: '12345',
        date: '2024-01-15',
        status: 'delivered',
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
        tracking: {
            number: 'TRK123456789',
            carrier: 'UPS',
            status: 'Delivered',
            progress: [
                { date: '2024-01-15', status: 'Order placed' },
                { date: '2024-01-16', status: 'Order confirmed' },
                { date: '2024-01-17', status: 'Shipped' },
                { date: '2024-01-18', status: 'Out for delivery' },
                { date: '2024-01-19', status: 'Delivered' },
            ],
        },
    };
    var getStatusColor = function (status) {
        var statusColors = {
            pending: constants_1.colors.warning[500],
            processing: constants_1.colors.primary[500],
            shipped: constants_1.colors.accent[500],
            delivered: constants_1.colors.success[500],
            cancelled: constants_1.colors.error[500],
        };
        return statusColors[status] || constants_1.colors.text.muted;
    };
    var getStatusText = function (status) {
        var statusText = {
            pending: 'Pending',
            processing: 'Processing',
            shipped: 'Shipped',
            delivered: 'Delivered',
            cancelled: 'Cancelled',
        };
        return statusText[status] || status;
    };
    var renderOrderSummary = function () {
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
            <react_native_1.Text style={styles.summaryValue}>${order.total.toFixed(2)}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.summaryRow}>
            <react_native_1.Text style={styles.summaryLabel}>Tax:</react_native_1.Text>
            <react_native_1.Text style={styles.summaryValue}>$10.40</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.summaryRow}>
            <react_native_1.Text style={styles.summaryLabel}>Shipping:</react_native_1.Text>
            <react_native_1.Text style={styles.summaryValue}>FREE</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={[styles.summaryRow, styles.totalRow]}>
            <react_native_1.Text style={styles.totalLabel}>Total:</react_native_1.Text>
            <react_native_1.Text style={styles.totalValue}>${order.total.toFixed(2)}</react_native_1.Text>
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
          <react_native_1.View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
            <react_native_1.Text style={styles.statusText}>{getStatusText(order.status)}</react_native_1.Text>
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
    var renderTrackingInfo = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.Text style={styles.sectionTitle}>Tracking Information</react_native_1.Text>
      <react_native_1.View style={styles.tracking}>
        <react_native_1.View style={styles.trackingHeader}>
          <react_native_1.Text style={styles.trackingNumber}>Tracking Number: {order.tracking.number}</react_native_1.Text>
          <react_native_1.Text style={styles.trackingCarrier}>Carrier: {order.tracking.carrier}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.trackingStatus}>
          <react_native_1.Text style={styles.trackingStatusText}>{order.tracking.status}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.trackingProgress}>
          {order.tracking.progress.map(function (step, index) { return (<react_native_1.View key={step.date} style={styles.trackingStep}>
              <react_native_1.View style={styles.trackingStepLine}>
                <react_native_1.View style={[
                styles.trackingStepDot,
                index === order.tracking.progress.length - 1 && styles.trackingStepDotActive,
            ]}></react_native_1.View>
              </react_native_1.View>
              <react_native_1.View style={styles.trackingStepContent}>
                <react_native_1.Text style={styles.trackingStepDate}>{step.date}</react_native_1.Text>
                <react_native_1.Text style={styles.trackingStepStatus}>{step.status}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>); })}
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderActions = function () { return (<react_native_1.View style={styles.actions}>
      <Button_1.Button variant="outline" onPress={function () { return navigation.goBack(); }} style={styles.backButton}>
        Back to Orders
      </Button_1.Button>
    </react_native_1.View>); };
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.title}>Order #{order.id}</react_native_1.Text>
      </react_native_1.View>
      
      {renderOrderSummary()}
      {renderOrderDetails()}
      {renderShippingInfo()}
      {renderPaymentInfo()}
      {renderTrackingInfo()}
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
    title: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary }),
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
    tracking: {
        marginTop: constants_1.spacing.component.margin.md,
    },
    trackingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    trackingNumber: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary }),
    trackingCarrier: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.muted }),
    trackingStatus: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    trackingStatusText: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.success[500], fontWeight: 'bold' }),
    trackingProgress: {
        marginTop: constants_1.spacing.component.margin.md,
    },
    trackingStep: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    trackingStepLine: {
        width: 2,
        height: '100%',
        backgroundColor: constants_1.colors.neutral[200],
        position: 'relative',
        marginRight: constants_1.spacing.component.margin.sm,
    },
    trackingStepDot: {
        width: 8,
        height: 8,
        backgroundColor: constants_1.colors.neutral[200],
        borderRadius: 4,
        position: 'absolute',
        top: 0,
        left: -3,
    },
    trackingStepDotActive: {
        backgroundColor: constants_1.colors.success[500],
    },
    trackingStepContent: {
        flex: 1,
    },
    trackingStepDate: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted, marginBottom: constants_1.spacing.component.margin.xs }),
    trackingStepStatus: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary }),
    actions: {
        padding: constants_1.spacing.component.padding.md,
    },
    backButton: {
        width: '100%',
    },
});
exports.default = OrderDetailScreen;
