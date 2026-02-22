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
var Card_1 = require("../ui/molecules/Card");
var DriverDashboardScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState({
        totalDeliveries: 15,
        completedDeliveries: 12,
        earnings: 450.50,
        rating: 4.8,
    }), stats = _b[0], setStats = _b[1];
    var _c = react_1.default.useState([
        {
            id: '1',
            orderId: 'ORD123456',
            customer: {
                name: 'Sarah Johnson',
                address: '123 Main St, New York, NY 10001',
            },
            items: [
                {
                    name: 'Wireless Headphones',
                    quantity: 1,
                },
                {
                    name: 'Smart Watch',
                    quantity: 1,
                },
            ],
            total: 279.98,
            status: 'assigned',
            pickupTime: '2024-01-15T10:30:00Z',
            deliveryTime: '2024-01-15T11:00:00Z',
            distance: '2.5 miles',
            paymentMethod: 'Credit Card',
        },
        {
            id: '2',
            orderId: 'ORD123457',
            customer: {
                name: 'Mike Davis',
                address: '456 Oak Ave, Los Angeles, CA 90210',
            },
            items: [
                {
                    name: 'Bluetooth Speaker',
                    quantity: 2,
                },
            ],
            total: 99.98,
            status: 'assigned',
            pickupTime: '2024-01-15T10:45:00Z',
            deliveryTime: '2024-01-15T11:15:00Z',
            distance: '1.8 miles',
            paymentMethod: 'PayPal',
        },
    ]), activeDeliveries = _c[0], setActiveDeliveries = _c[1];
    var _d = react_1.default.useState([
        {
            id: '3',
            orderId: 'ORD123458',
            customer: {
                name: 'Emily Chen',
                address: '789 Pine St, Chicago, IL 60601',
            },
            items: [
                {
                    name: 'Laptop Stand',
                    quantity: 1,
                },
            ],
            total: 29.99,
            status: 'delivered',
            deliveryTime: '2024-01-14T14:30:00Z',
            rating: 5,
        },
        {
            id: '4',
            orderId: 'ORD123459',
            customer: {
                name: 'David Kim',
                address: '321 Elm St, Seattle, WA 98101',
            },
            items: [
                {
                    name: 'Wireless Headphones',
                    quantity: 1,
                },
            ],
            total: 79.99,
            status: 'delivered',
            deliveryTime: '2024-01-14T15:15:00Z',
            rating: 4,
        },
    ]), recentDeliveries = _d[0], setRecentDeliveries = _d[1];
    var handleViewDelivery = function (deliveryId) {
        navigation.navigate('DeliveryDetail', { deliveryId: deliveryId });
    };
    var handleStartNavigation = function (deliveryId) {
        // Implement navigation functionality
        console.log('Starting navigation for delivery:', deliveryId);
    };
    var handleCompleteDelivery = function (deliveryId) {
        // Implement delivery completion
        console.log('Completing delivery:', deliveryId);
    };
    var renderStatCard = function (_a) {
        var title = _a.title, value = _a.value, icon = _a.icon;
        return (<Card_1.Card style={styles.statCard}>
      <react_native_1.View style={styles.statIcon}>
        <react_native_1.Text style={styles.statIconText}>{icon}</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.statContent}>
        <react_native_1.Text style={styles.statValue}>{value}</react_native_1.Text>
        <react_native_1.Text style={styles.statTitle}>{title}</react_native_1.Text>
      </react_native_1.View>
    </Card_1.Card>);
    };
    var renderDeliveryCard = function (_a) {
        var item = _a.item;
        return (<Card_1.Card style={styles.deliveryCard}>
      <react_native_1.View style={styles.deliveryHeader}>
        <react_native_1.View style={styles.deliveryInfo}>
          <react_native_1.Text style={styles.deliveryId}>Delivery #{item.id}</react_native_1.Text>
          <react_native_1.Text style={styles.deliveryStatus}>{item.status}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.deliveryTime}>
          <react_native_1.Text style={styles.timeLabel}>Pickup:</react_native_1.Text>
          <react_native_1.Text style={styles.timeValue}>{item.pickupTime}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
      
      <react_native_1.View style={styles.customerInfo}>
        <react_native_1.Text style={styles.customerName}>{item.customer.name}</react_native_1.Text>
        <react_native_1.Text style={styles.customerAddress}>{item.customer.address}</react_native_1.Text>
      </react_native_1.View>
      
      <react_native_1.View style={styles.itemsList}>
        {item.items.map(function (orderItem, index) { return (<react_native_1.View key={index} style={styles.item}>
            <react_native_1.Text style={styles.itemName}>{orderItem.name}</react_native_1.Text>
            <react_native_1.Text style={styles.itemQuantity}>x {orderItem.quantity}</react_native_1.Text>
          </react_native_1.View>); })}
      </react_native_1.View>
      
      <react_native_1.View style={styles.deliveryFooter}>
        <react_native_1.View style={styles.deliveryDetails}>
          <react_native_1.Text style={styles.detailLabel}>Total:</react_native_1.Text>
          <react_native_1.Text style={styles.detailValue}>${item.total.toFixed(2)}</react_native_1.Text>
          <react_native_1.Text style={styles.detailLabel}>Distance:</react_native_1.Text>
          <react_native_1.Text style={styles.detailValue}>{item.distance}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.deliveryActions}>
          <react_native_1.TouchableOpacity style={styles.actionButton} onPress={function () { return handleStartNavigation(item.id); }}>
            <react_native_1.Text style={styles.actionButtonText}>Navigate</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={[styles.actionButton, styles.completeButton]} onPress={function () { return handleCompleteDelivery(item.id); }}>
            <react_native_1.Text style={styles.completeButtonText}>Complete</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.View>
    </Card_1.Card>);
    };
    var renderRecentDeliveryCard = function (_a) {
        var item = _a.item;
        return (<Card_1.Card style={styles.recentDeliveryCard}>
      <react_native_1.View style={styles.recentDeliveryHeader}>
        <react_native_1.Text style={styles.recentDeliveryId}>Delivery #{item.id}</react_native_1.Text>
        <react_native_1.Text style={styles.recentDeliveryStatus}>{item.status}</react_native_1.Text>
      </react_native_1.View>
      
      <react_native_1.View style={styles.recentCustomerInfo}>
        <react_native_1.Text style={styles.recentCustomerName}>{item.customer.name}</react_native_1.Text>
        <react_native_1.Text style={styles.recentCustomerAddress}>{item.customer.address}</react_native_1.Text>
      </react_native_1.View>
      
      <react_native_1.View style={styles.recentDeliveryFooter}>
        <react_native_1.View style={styles.recentDeliveryDetails}>
          <react_native_1.Text style={styles.recentDetailLabel}>Total:</react_native_1.Text>
          <react_native_1.Text style={styles.recentDetailValue}>${item.total.toFixed(2)}</react_native_1.Text>
          <react_native_1.Text style={styles.recentDetailLabel}>Rating:</react_native_1.Text>
          <react_native_1.Text style={styles.recentDetailValue}>{item.rating}/5</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
    </Card_1.Card>);
    };
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.View style={styles.headerContent}>
          <react_native_1.Text style={styles.title}>Driver Dashboard</react_native_1.Text>
          <react_native_1.Text style={styles.subtitle}>Manage your deliveries</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
      
      <react_native_1.View style={styles.statsContainer}>
        {renderStatCard({ title: 'Total Deliveries', value: stats.totalDeliveries, icon: '&#128640;&#65038;' })}
        {renderStatCard({ title: 'Completed', value: stats.completedDeliveries, icon: '&#128994;&#65038;' })}
        {renderStatCard({ title: 'Earnings', value: "$".concat(stats.earnings.toFixed(2)), icon: '&#127974;&#65038;' })}
        {renderStatCard({ title: 'Rating', value: "".concat(stats.rating, "/5"), icon: '&#11088;&#65038;' })}
      </react_native_1.View>
      
      <react_native_1.View style={styles.activeDeliveriesSection}>
        <react_native_1.View style={styles.sectionHeader}>
          <react_native_1.Text style={styles.sectionTitle}>Active Deliveries</react_native_1.Text>
          <react_native_1.Text style={styles.sectionSubtitle}>({activeDeliveries.length} active)</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.deliveriesList}>
          {activeDeliveries.map(renderDeliveryCard)}
        </react_native_1.View>
      </react_native_1.View>
      
      <react_native_1.View style={styles.recentDeliveriesSection}>
        <react_native_1.View style={styles.sectionHeader}>
          <react_native_1.Text style={styles.sectionTitle}>Recent Deliveries</react_native_1.Text>
          <react_native_1.Text style={styles.sectionSubtitle}>(Last 7 days)</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.recentDeliveriesList}>
          {recentDeliveries.map(renderRecentDeliveryCard)}
        </react_native_1.View>
      </react_native_1.View>
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
    headerContent: {
        flex: 1,
    },
    title: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    subtitle: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: constants_1.spacing.component.margin.sm,
        padding: constants_1.spacing.component.padding.md,
    },
    statCard: {
        flex: 1,
        maxWidth: 'calc(50% - 10px)',
        padding: constants_1.spacing.component.padding.md,
    },
    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: constants_1.colors.primary[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.xs,
    },
    statIconText: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.primary[500] }),
    statContent: {
        alignItems: 'center',
    },
    statValue: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary, fontWeight: '600', marginBottom: constants_1.spacing.component.margin.xs }),
    statTitle: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    activeDeliveriesSection: {
        padding: constants_1.spacing.component.padding.md,
        borderBottomWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    sectionTitle: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary, fontWeight: '600' }),
    sectionSubtitle: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    deliveriesList: {
        gap: constants_1.spacing.component.margin.md,
    },
    deliveryCard: {
        padding: constants_1.spacing.component.padding.md,
    },
    deliveryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    deliveryInfo: {
        flex: 1,
    },
    deliveryId: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600', marginBottom: constants_1.spacing.component.margin.xs }),
    deliveryStatus: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.primary[500], fontWeight: '600' }),
    deliveryTime: {
        alignItems: 'flex-end',
    },
    timeLabel: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    timeValue: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.primary }),
    customerInfo: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    customerName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600', marginBottom: constants_1.spacing.component.margin.xs }),
    customerAddress: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    itemsList: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: constants_1.spacing.component.padding.xs,
        borderBottomWidth: 1,
        borderBottomColor: constants_1.colors.neutral[200],
    },
    itemName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, flex: 1 }),
    itemQuantity: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    deliveryFooter: {
        borderTopWidth: 1,
        borderTopColor: constants_1.colors.neutral[200],
        paddingTop: constants_1.spacing.component.margin.md,
    },
    deliveryDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    detailLabel: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    detailValue: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600' }),
    deliveryActions: {
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
    completeButton: {
        backgroundColor: constants_1.colors.success[500],
    },
    completeButtonText: {
        color: constants_1.colors.text.inverted,
    },
    recentDeliveriesSection: {
        padding: constants_1.spacing.component.padding.md,
    },
    recentDeliveriesList: {
        gap: constants_1.spacing.component.margin.md,
    },
    recentDeliveryCard: {
        padding: constants_1.spacing.component.padding.md,
    },
    recentDeliveryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    recentDeliveryId: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600' }),
    recentDeliveryStatus: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.success[500], fontWeight: '600' }),
    recentCustomerInfo: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    recentCustomerName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600', marginBottom: constants_1.spacing.component.margin.xs }),
    recentCustomerAddress: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    recentDeliveryFooter: {
        borderTopWidth: 1,
        borderTopColor: constants_1.colors.neutral[200],
        paddingTop: constants_1.spacing.component.margin.md,
    },
    recentDeliveryDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    recentDetailLabel: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    recentDetailValue: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600' }),
});
exports.default = DriverDashboardScreen;
