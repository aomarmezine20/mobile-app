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
var DeliveryDetailScreen = function (_a) {
    var _b;
    var navigation = _a.navigation, route = _a.route;
    var deliveryId = (_b = route.params) === null || _b === void 0 ? void 0 : _b.deliveryId;
    var _c = react_1.default.useState({
        id: deliveryId || '1',
        orderId: 'ORD123456',
        customer: {
            name: 'Sarah Johnson',
            email: 'sarah@example.com',
            phone: '+1 555 123 4567',
            address: '123 Main St, New York, NY 10001',
        },
        items: [
            {
                name: 'Wireless Headphones',
                price: 79.99,
                quantity: 1,
            },
            {
                name: 'Smart Watch',
                price: 199.99,
                quantity: 1,
            },
        ],
        total: 279.98,
        status: 'assigned',
        pickupTime: '2024-01-15T10:30:00Z',
        deliveryTime: '2024-01-15T11:00:00Z',
        distance: '2.5 miles',
        paymentMethod: 'Credit Card',
        trackingNumber: 'TRK123456789',
        notes: 'Please leave package at front door if no one is available',
        specialInstructions: 'Customer is allergic to peanuts',
    }), delivery = _c[0], setDelivery = _c[1];
    var _d = react_1.default.useState(delivery.status), deliveryStatus = _d[0], setDeliveryStatus = _d[1];
    var handleUpdateStatus = function (newStatus) {
        setDeliveryStatus(newStatus);
        // Update delivery status in backend
        console.log('Updating delivery status to:', newStatus);
    };
    var handleStartNavigation = function () {
        // Implement navigation functionality
        console.log('Starting navigation to:', delivery.customer.address);
    };
    var handleCompleteDelivery = function () {
        // Implement delivery completion
        console.log('Completing delivery:', delivery.id);
        handleUpdateStatus('delivered');
    };
    var getStatusColor = function (status) {
        var statusColors = {
            assigned: constants_1.colors.warning[500],
            picked_up: constants_1.colors.primary[500],
            in_transit: constants_1.colors.accent[500],
            delivered: constants_1.colors.success[500],
            cancelled: constants_1.colors.error[500],
        };
        return statusColors[status] || constants_1.colors.text.muted;
    };
    var getStatusText = function (status) {
        var statusText = {
            assigned: 'Assigned',
            picked_up: 'Picked Up',
            in_transit: 'In Transit',
            delivered: 'Delivered',
            cancelled: 'Cancelled',
        };
        return statusText[status] || status;
    };
    var renderStatusButton = function (_a) {
        var status = _a.status, label = _a.label;
        return (<react_native_1.TouchableOpacity style={[
                styles.statusButton,
                deliveryStatus === status && styles.statusButtonActive,
            ]} onPress={function () { return handleUpdateStatus(status); }}>
      <react_native_1.Text style={[
                styles.statusButtonText,
                deliveryStatus === status && styles.statusButtonTextActive,
            ]}>
        {label}
      </react_native_1.Text>
    </react_native_1.TouchableOpacity>);
    };
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.View style={styles.headerContent}>
          <react_native_1.Text style={styles.title}>Delivery Details</react_native_1.Text>
          <react_native_1.Text style={styles.subtitle}>Delivery #{delivery.id}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
      
      <react_native_1.View style={styles.statusContainer}>
        <react_native_1.View style={styles.statusBadge}>
          <react_native_1.Text style={styles.statusText}>
            {getStatusText(deliveryStatus)}
          </react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.statusActions}>
          {deliveryStatus === 'assigned' && (<>
              {renderStatusButton({ status: 'picked_up', label: 'Picked Up' })}
              {renderStatusButton({ status: 'cancelled', label: 'Cancel' })}
            </>)}
          {deliveryStatus === 'picked_up' && (<>
              {renderStatusButton({ status: 'in_transit', label: 'In Transit' })}
              {renderStatusButton({ status: 'cancelled', label: 'Cancel' })}
            </>)}
          {deliveryStatus === 'in_transit' && (<>
              {renderStatusButton({ status: 'delivered', label: 'Delivered' })}
              {renderStatusButton({ status: 'cancelled', label: 'Cancel' })}
            </>)}
        </react_native_1.View>
      </react_native_1.View>
      
      <Card_1.Card style={styles.deliveryCard}>
        <react_native_1.View style={styles.deliveryHeader}>
          <react_native_1.View style={styles.deliveryInfo}>
            <react_native_1.Text style={styles.deliveryId}>Order #{delivery.orderId}</react_native_1.Text>
            <react_native_1.Text style={styles.deliveryStatus}>
              {getStatusText(deliveryStatus)}
            </react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.deliveryTime}>
            <react_native_1.Text style={styles.timeLabel}>Pickup:</react_native_1.Text>
            <react_native_1.Text style={styles.timeValue}>{delivery.pickupTime}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        
        <react_native_1.View style={styles.customerInfo}>
          <react_native_1.Text style={styles.customerName}>{delivery.customer.name}</react_native_1.Text>
          <react_native_1.Text style={styles.customerContact}>
            {delivery.customer.email} • {delivery.customer.phone}
          </react_native_1.Text>
          <react_native_1.Text style={styles.customerAddress}>{delivery.customer.address}</react_native_1.Text>
        </react_native_1.View>
        
        <react_native_1.View style={styles.itemsList}>
          {delivery.items.map(function (orderItem, index) { return (<react_native_1.View key={index} style={styles.item}>
              <react_native_1.Text style={styles.itemName}>{orderItem.name}</react_native_1.Text>
              <react_native_1.Text style={styles.itemDetails}>
                ${orderItem.price.toFixed(2)} x {orderItem.quantity}
              </react_native_1.Text>
            </react_native_1.View>); })}
        </react_native_1.View>
        
        <react_native_1.View style={styles.deliveryFooter}>
          <react_native_1.View style={styles.deliveryDetails}>
            <react_native_1.Text style={styles.detailLabel}>Total:</react_native_1.Text>
            <react_native_1.Text style={styles.detailValue}>${delivery.total.toFixed(2)}</react_native_1.Text>
            <react_native_1.Text style={styles.detailLabel}>Distance:</react_native_1.Text>
            <react_native_1.Text style={styles.detailValue}>{delivery.distance}</react_native_1.Text>
            <react_native_1.Text style={styles.detailLabel}>Payment:</react_native_1.Text>
            <react_native_1.Text style={styles.detailValue}>{delivery.paymentMethod}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.deliveryActions}>
            <react_native_1.TouchableOpacity style={styles.actionButton} onPress={handleStartNavigation}>
              <react_native_1.Text style={styles.actionButtonText}>Navigate</react_native_1.Text>
            </react_native_1.TouchableOpacity>
            {deliveryStatus === 'in_transit' && (<react_native_1.TouchableOpacity style={[styles.actionButton, styles.completeButton]} onPress={handleCompleteDelivery}>
                <react_native_1.Text style={styles.completeButtonText}>Complete</react_native_1.Text>
              </react_native_1.TouchableOpacity>)}
          </react_native_1.View>
        </react_native_1.View>
      </Card_1.Card>
      
      {delivery.notes && (<Card_1.Card style={styles.notesCard}>
          <react_native_1.View style={styles.notesHeader}>
            <react_native_1.Text style={styles.notesTitle}>Delivery Notes</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.Text style={styles.notesContent}>{delivery.notes}</react_native_1.Text>
        </Card_1.Card>)}
      
      {delivery.specialInstructions && (<Card_1.Card style={styles.instructionsCard}>
          <react_native_1.View style={styles.instructionsHeader}>
            <react_native_1.Text style={styles.instructionsTitle}>Special Instructions</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.Text style={styles.instructionsContent}>{delivery.specialInstructions}</react_native_1.Text>
        </Card_1.Card>)}
      
      <Card_1.Card style={styles.trackingCard}>
        <react_native_1.View style={styles.trackingHeader}>
          <react_native_1.Text style={styles.trackingTitle}>Tracking Information</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.trackingContent}>
          <react_native_1.Text style={styles.trackingNumber}>Tracking #: {delivery.trackingNumber}</react_native_1.Text>
          <react_native_1.Text style={styles.trackingStatus}>Status: {getStatusText(deliveryStatus)}</react_native_1.Text>
        </react_native_1.View>
      </Card_1.Card>
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
    statusContainer: {
        padding: constants_1.spacing.component.padding.md,
        backgroundColor: constants_1.colors.background.secondary,
        borderBottomWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    statusBadge: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
        paddingVertical: constants_1.spacing.component.padding.sm,
        backgroundColor: getStatusColor(deliveryStatus),
        borderRadius: constants_1.spacing.radius.md,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    statusText: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.inverted, fontWeight: '600', textAlign: 'center' }),
    statusActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: constants_1.spacing.component.margin.sm,
    },
    statusButton: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
        paddingVertical: constants_1.spacing.component.padding.sm,
        backgroundColor: constants_1.colors.neutral[200],
        borderRadius: constants_1.spacing.radius.sm,
    },
    statusButtonActive: {
        backgroundColor: constants_1.colors.primary[500],
    },
    statusButtonText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted, fontWeight: '600' }),
    statusButtonTextActive: {
        color: constants_1.colors.text.inverted,
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
    deliveryStatus: __assign(__assign({}, constants_1.typography.caption), { color: getStatusColor(deliveryStatus), fontWeight: '600' }),
    deliveryTime: {
        alignItems: 'flex-end',
    },
    timeLabel: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    timeValue: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.primary }),
    customerInfo: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    customerName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600', marginBottom: constants_1.spacing.component.margin.xs }),
    customerContact: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted, marginBottom: constants_1.spacing.component.margin.xs }),
    customerAddress: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.primary }),
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
    itemDetails: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
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
    notesCard: {
        padding: constants_1.spacing.component.padding.md,
        backgroundColor: constants_1.colors.background.secondary,
        borderWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    notesHeader: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    notesTitle: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary, fontWeight: '600' }),
    notesContent: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary }),
    instructionsCard: {
        padding: constants_1.spacing.component.padding.md,
        backgroundColor: constants_1.colors.background.secondary,
        borderWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    instructionsHeader: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    instructionsTitle: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary, fontWeight: '600' }),
    instructionsContent: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary }),
    trackingCard: {
        padding: constants_1.spacing.component.padding.md,
        backgroundColor: constants_1.colors.background.secondary,
        borderWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    trackingHeader: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    trackingTitle: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary, fontWeight: '600' }),
    trackingContent: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary }),
    trackingNumber: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    trackingStatus: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
});
exports.default = DeliveryDetailScreen;
