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
var SupplierOrdersScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState([
        {
            id: '12345',
            customer: {
                name: 'John Doe',
                email: 'john@example.com',
                phone: '+1 555 123 4567',
            },
            items: [
                {
                    id: '1',
                    name: 'Wireless Headphones',
                    price: 79.99,
                    quantity: 1,
                },
                {
                    id: '2',
                    name: 'Smart Watch',
                    price: 199.99,
                    quantity: 1,
                },
            ],
            total: 279.98,
            status: 'pending',
            date: '2024-01-15',
            shippingAddress: {
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'USA',
            },
            paymentMethod: 'Credit Card',
            trackingNumber: null,
        },
        {
            id: '12346',
            customer: {
                name: 'Jane Smith',
                email: 'jane@example.com',
                phone: '+1 555 987 6543',
            },
            items: [
                {
                    id: '3',
                    name: 'Bluetooth Speaker',
                    price: 49.99,
                    quantity: 2,
                },
            ],
            total: 99.98,
            status: 'processing',
            date: '2024-01-15',
            shippingAddress: {
                street: '456 Oak Ave',
                city: 'Los Angeles',
                state: 'CA',
                zipCode: '90210',
                country: 'USA',
            },
            paymentMethod: 'PayPal',
            trackingNumber: 'TRK123456789',
        },
        {
            id: '12347',
            customer: {
                name: 'Bob Johnson',
                email: 'bob@example.com',
                phone: '+1 555 456 7890',
            },
            items: [
                {
                    id: '4',
                    name: 'Laptop Stand',
                    price: 29.99,
                    quantity: 1,
                },
            ],
            total: 29.99,
            status: 'shipped',
            date: '2024-01-14',
            shippingAddress: {
                street: '789 Pine St',
                city: 'Chicago',
                state: 'IL',
                zipCode: '60601',
                country: 'USA',
            },
            paymentMethod: 'Credit Card',
            trackingNumber: 'TRK987654321',
        },
        {
            id: '12348',
            customer: {
                name: 'Alice Brown',
                email: 'alice@example.com',
                phone: '+1 555 321 0987',
            },
            items: [
                {
                    id: '1',
                    name: 'Wireless Headphones',
                    price: 79.99,
                    quantity: 1,
                },
            ],
            total: 79.99,
            status: 'delivered',
            date: '2024-01-13',
            shippingAddress: {
                street: '321 Elm St',
                city: 'Seattle',
                state: 'WA',
                zipCode: '98101',
                country: 'USA',
            },
            paymentMethod: 'Credit Card',
            trackingNumber: 'TRK456789123',
        },
    ]), orders = _b[0], setOrders = _b[1];
    var _c = react_1.default.useState('all'), selectedStatus = _c[0], setSelectedStatus = _c[1];
    var statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    var filteredOrders = orders.filter(function (order) {
        return selectedStatus === 'all' || order.status === selectedStatus;
    });
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
    var handleUpdateOrderStatus = function (orderId, newStatus) {
        setOrders(orders.map(function (order) {
            return order.id === orderId ? __assign(__assign({}, order), { status: newStatus }) : order;
        }));
    };
    var handleViewOrderDetails = function (orderId) {
        navigation.navigate('SupplierOrderDetail', { orderId: orderId });
    };
    var handlePrintInvoice = function (orderId) {
        // Implement print functionality
        console.log('Printing invoice for order:', orderId);
    };
    var renderOrderCard = function (_a) {
        var item = _a.item;
        return (<react_native_1.View key={item.id} style={styles.orderCard}>
      <react_native_1.View style={styles.orderHeader}>
        <react_native_1.View style={styles.orderInfo}>
          <react_native_1.Text style={styles.orderId}>Order #{item.id}</react_native_1.Text>
          <react_native_1.Text style={styles.orderDate}>{item.date}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <react_native_1.Text style={styles.statusText}>{getStatusText(item.status)}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
      
      <react_native_1.View style={styles.orderCustomer}>
        <react_native_1.Text style={styles.customerName}>{item.customer.name}</react_native_1.Text>
        <react_native_1.Text style={styles.customerContact}>{item.customer.email} • {item.customer.phone}</react_native_1.Text>
      </react_native_1.View>
      
      <react_native_1.View style={styles.orderItems}>
        {item.items.map(function (orderItem, index) { return (<react_native_1.View key={index} style={styles.orderItem}>
            <react_native_1.Text style={styles.itemName}>{orderItem.name}</react_native_1.Text>
            <react_native_1.Text style={styles.itemDetails}>
              ${orderItem.price.toFixed(2)} x {orderItem.quantity}
            </react_native_1.Text>
          </react_native_1.View>); })}
      </react_native_1.View>
      
      <react_native_1.View style={styles.orderFooter}>
        <react_native_1.View style={styles.orderTotal}>
          <react_native_1.Text style={styles.totalLabel}>Total:</react_native_1.Text>
          <react_native_1.Text style={styles.totalAmount}>${item.total.toFixed(2)}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.orderActions}>
          <react_native_1.TouchableOpacity style={styles.actionButton} onPress={function () { return handleViewOrderDetails(item.id); }}>
            <react_native_1.Text style={styles.actionButtonText}>View Details</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          {item.status === 'pending' && (<react_native_1.TouchableOpacity style={[styles.actionButton, styles.processButton]} onPress={function () { return handleUpdateOrderStatus(item.id, 'processing'); }}>
              <react_native_1.Text style={styles.processButtonText}>Process</react_native_1.Text>
            </react_native_1.TouchableOpacity>)}
          {item.status === 'processing' && (<react_native_1.TouchableOpacity style={[styles.actionButton, styles.shipButton]} onPress={function () { return handleUpdateOrderStatus(item.id, 'shipped'); }}>
              <react_native_1.Text style={styles.shipButtonText}>Ship</react_native_1.Text>
            </react_native_1.TouchableOpacity>)}
          {item.status === 'shipped' && (<react_native_1.TouchableOpacity style={[styles.actionButton, styles.deliverButton]} onPress={function () { return handleUpdateOrderStatus(item.id, 'delivered'); }}>
              <react_native_1.Text style={styles.deliverButtonText}>Mark Delivered</react_native_1.Text>
            </react_native_1.TouchableOpacity>)}
          <react_native_1.TouchableOpacity style={styles.actionButton} onPress={function () { return handlePrintInvoice(item.id); }}>
            <react_native_1.Text style={styles.actionButtonText}>Print</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>);
    };
    var renderFilters = function () { return (<react_native_1.View style={styles.filtersContainer}>
      <react_native_1.Text style={styles.filterLabel}>Filter by status:</react_native_1.Text>
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
    </react_native_1.View>); };
    var renderEmptyState = function () { return (<react_native_1.View style={styles.emptyState}>
      <react_native_1.Text style={styles.emptyStateText}>No orders found</react_native_1.Text>
      <react_native_1.Text style={styles.emptyStateSubtext}>
        Try adjusting your filters or check back later
      </react_native_1.Text>
    </react_native_1.View>); };
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.View style={styles.headerContent}>
          <react_native_1.Text style={styles.title}>Orders</react_native_1.Text>
          <react_native_1.Text style={styles.subtitle}>Manage customer orders</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
      
      {renderFilters()}
      
      <react_native_1.View style={styles.ordersContainer}>
        {filteredOrders.length > 0 ? (<react_native_1.View style={styles.ordersList}>
            {filteredOrders.map(renderOrderCard)}
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
        padding: constants_1.spacing.component.padding.md,
        borderBottomWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    headerContent: {
        flex: 1,
    },
    title: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    subtitle: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    filtersContainer: {
        padding: constants_1.spacing.component.padding.md,
        backgroundColor: constants_1.colors.background.secondary,
        borderBottomWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    filterLabel: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    statusChip: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
        paddingVertical: constants_1.spacing.component.padding.sm,
        backgroundColor: constants_1.colors.neutral[200],
        borderRadius: constants_1.spacing.radius.sm,
        marginRight: constants_1.spacing.component.margin.sm,
    },
    selectedChip: {
        backgroundColor: constants_1.colors.primary[500],
    },
    statusChipText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    selectedChipText: {
        color: constants_1.colors.text.inverted,
    },
    ordersContainer: {
        flex: 1,
        padding: constants_1.spacing.component.padding.md,
    },
    ordersList: {
        gap: constants_1.spacing.component.margin.md,
    },
    orderCard: {
        backgroundColor: constants_1.colors.background.secondary,
        borderRadius: constants_1.spacing.radius.md,
        padding: constants_1.spacing.component.padding.md,
        borderWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    orderInfo: {
        flex: 1,
    },
    orderId: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600' }),
    orderDate: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    statusBadge: {
        paddingHorizontal: constants_1.spacing.component.padding.xs,
        paddingVertical: constants_1.spacing.component.padding.xs / 2,
        borderRadius: constants_1.spacing.radius.sm,
    },
    statusText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.inverted, fontWeight: '600' }),
    orderCustomer: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    customerName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600', marginBottom: constants_1.spacing.component.margin.xs }),
    customerContact: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    orderItems: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: constants_1.spacing.component.padding.xs,
        borderBottomWidth: 1,
        borderBottomColor: constants_1.colors.neutral[200],
    },
    itemName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, flex: 1 }),
    itemDetails: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    orderFooter: {
        borderTopWidth: 1,
        borderTopColor: constants_1.colors.neutral[200],
        paddingTop: constants_1.spacing.component.margin.md,
    },
    orderTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    totalLabel: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600' }),
    totalAmount: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.primary[500], fontWeight: '600' }),
    orderActions: {
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
    processButton: {
        backgroundColor: constants_1.colors.accent[500],
    },
    processButtonText: {
        color: constants_1.colors.text.inverted,
    },
    shipButton: {
        backgroundColor: constants_1.colors.warning[500],
    },
    shipButtonText: {
        color: constants_1.colors.text.inverted,
    },
    deliverButton: {
        backgroundColor: constants_1.colors.success[500],
    },
    deliverButtonText: {
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
exports.default = SupplierOrdersScreen;
