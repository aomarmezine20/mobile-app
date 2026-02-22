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
var OrderHistoryScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState([
        {
            id: '1',
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
        },
        {
            id: '2',
            date: '2024-01-10',
            status: 'shipped',
            total: 89.99,
            items: [
                {
                    name: 'Running Shoes',
                    price: 89.99,
                    quantity: 1,
                    image: 'https://example.com/shoes.jpg',
                },
            ],
        },
        {
            id: '3',
            date: '2024-01-05',
            status: 'processing',
            total: 39.99,
            items: [
                {
                    name: 'Laptop Stand',
                    price: 39.99,
                    quantity: 1,
                    image: 'https://example.com/stand.jpg',
                },
            ],
        },
    ]), orders = _b[0], setOrders = _b[1];
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
    var renderOrder = function (_a) {
        var item = _a.item;
        return (<react_native_1.TouchableOpacity style={styles.orderCard} onPress={function () { return navigation.navigate('OrderDetail', { order: item }); }}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.orderId}>Order #{item.id}</react_native_1.Text>
        <react_native_1.Text style={styles.orderDate}>{item.date}</react_native_1.Text>
      </react_native_1.View>
      
      <react_native_1.View style={styles.items}>
        {item.items.map(function (product, index) { return (<react_native_1.View key={product.name} style={styles.item}>
            <Image_1.Image source={{ uri: product.image }} variant="rounded" size="xs" style={styles.itemImage}/>
            <react_native_1.View style={styles.itemContent}>
              <react_native_1.Text style={styles.itemName} numberOfLines={1}>
                {product.name}
              </react_native_1.Text>
              <react_native_1.Text style={styles.itemPrice}>
                ${product.price.toFixed(2)} x {product.quantity}
              </react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>); })}
      </react_native_1.View>
      
      <react_native_1.View style={styles.footer}>
        <react_native_1.Text style={styles.total}>Total: ${item.total.toFixed(2)}</react_native_1.Text>
        <react_native_1.View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <react_native_1.Text style={styles.statusText}>{getStatusText(item.status)}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.TouchableOpacity>);
    };
    var renderEmptyState = function () { return (<react_native_1.View style={styles.emptyState}>
      <Image_1.Image source={{ uri: 'https://example.com/empty-orders.png' }} variant="rounded" size="lg" style={styles.emptyImage}/>
      <react_native_1.Text style={styles.emptyTitle}>No orders yet</react_native_1.Text>
      <react_native_1.Text style={styles.emptySubtitle}>
        Start shopping to see your order history here
      </react_native_1.Text>
      <Button_1.Button variant="primary" onPress={function () { return navigation.navigate('Home'); }} style={styles.continueShoppingButton}>
        Start Shopping
      </Button_1.Button>
    </react_native_1.View>); };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.title}>Order History</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>View all your past orders</react_native_1.Text>
      </react_native_1.View>
      
      {orders.length > 0 ? (<react_native_1.FlatList data={orders} renderItem={renderOrder} keyExtractor={function (item) { return item.id; }} contentContainerStyle={styles.ordersList} showsVerticalScrollIndicator={false}/>) : (renderEmptyState())}
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
    subtitle: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    ordersList: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
    },
    orderCard: __assign({ backgroundColor: constants_1.colors.background.secondary, borderRadius: constants_1.spacing.radius.md, padding: constants_1.spacing.component.padding.md, marginBottom: constants_1.spacing.component.margin.sm }, constants_1.spacing.shadow.sm),
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    orderId: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: 'bold' }),
    orderDate: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    items: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    item: {
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    total: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: 'bold' }),
    statusBadge: {
        paddingHorizontal: constants_1.spacing.component.padding.xs,
        paddingVertical: constants_1.spacing.component.padding.xs / 2,
        borderRadius: constants_1.spacing.radius.sm,
    },
    statusText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.inverted, fontWeight: '600' }),
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
});
exports.default = OrderHistoryScreen;
