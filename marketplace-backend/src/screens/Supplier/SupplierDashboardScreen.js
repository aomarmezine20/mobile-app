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
var Image_1 = require("../ui/atoms/Image");
var SupplierDashboardScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState({
        totalProducts: 24,
        totalOrders: 156,
        totalRevenue: 12500.75,
        pendingOrders: 8,
        lowStockProducts: 3,
    }), stats = _b[0], setStats = _b[1];
    var _c = react_1.default.useState([
        {
            id: '12345',
            customer: 'John Doe',
            total: 129.98,
            status: 'pending',
            date: '2024-01-15',
        },
        {
            id: '12346',
            customer: 'Jane Smith',
            total: 89.99,
            status: 'processing',
            date: '2024-01-15',
        },
        {
            id: '12347',
            customer: 'Bob Johnson',
            total: 199.99,
            status: 'shipped',
            date: '2024-01-14',
        },
    ]), recentOrders = _c[0], setRecentOrders = _c[1];
    var _d = react_1.default.useState([
        {
            id: '1',
            name: 'Wireless Headphones',
            price: 79.99,
            stock: 45,
            sales: 234,
            image: 'https://example.com/headphones.jpg',
        },
        {
            id: '2',
            name: 'Smart Watch',
            price: 199.99,
            stock: 12,
            sales: 156,
            image: 'https://example.com/watch.jpg',
        },
        {
            id: '3',
            name: 'Bluetooth Speaker',
            price: 49.99,
            stock: 3,
            sales: 89,
            image: 'https://example.com/speaker.jpg',
        },
    ]), recentProducts = _d[0], setRecentProducts = _d[1];
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
    var renderStatsCards = function () { return (<react_native_1.View style={styles.statsContainer}>
      <react_native_1.View style={styles.statCard}>
        <react_native_1.Text style={styles.statValue}>{stats.totalProducts}</react_native_1.Text>
        <react_native_1.Text style={styles.statLabel}>Total Products</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.statCard}>
        <react_native_1.Text style={styles.statValue}>{stats.totalOrders}</react_native_1.Text>
        <react_native_1.Text style={styles.statLabel}>Total Orders</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.statCard}>
        <react_native_1.Text style={styles.statValue}>${stats.totalRevenue.toFixed(2)}</react_native_1.Text>
        <react_native_1.Text style={styles.statLabel}>Total Revenue</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.statCard}>
        <react_native_1.Text style={styles.statValue}>{stats.pendingOrders}</react_native_1.Text>
        <react_native_1.Text style={styles.statLabel}>Pending Orders</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderQuickActions = function () { return (<react_native_1.View style={styles.actionsContainer}>
      <react_native_1.TouchableOpacity style={styles.actionCard} onPress={function () { return navigation.navigate('SupplierProducts'); }}>
        <react_native_1.View style={styles.actionIcon}>
          <react_native_1.Text style={styles.actionIconText}>📦</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={styles.actionTitle}>Products</react_native_1.Text>
        <react_native_1.Text style={styles.actionSubtitle}>Manage your products</react_native_1.Text>
      </react_native_1.TouchableOpacity>
      <react_native_1.TouchableOpacity style={styles.actionCard} onPress={function () { return navigation.navigate('SupplierOrders'); }}>
        <react_native_1.View style={styles.actionIcon}>
          <react_native_1.Text style={styles.actionIconText}>📋</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={styles.actionTitle}>Orders</react_native_1.Text>
        <react_native_1.Text style={styles.actionSubtitle}>View and manage orders</react_native_1.Text>
      </react_native_1.TouchableOpacity>
      <react_native_1.TouchableOpacity style={styles.actionCard} onPress={function () { return navigation.navigate('SupplierRevenue'); }}>
        <react_native_1.View style={styles.actionIcon}>
          <react_native_1.Text style={styles.actionIconText}>💰</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={styles.actionTitle}>Revenue</react_native_1.Text>
        <react_native_1.Text style={styles.actionSubtitle}>View earnings analytics</react_native_1.Text>
      </react_native_1.TouchableOpacity>
      <react_native_1.TouchableOpacity style={styles.actionCard} onPress={function () { return navigation.navigate('SupplierAnalytics'); }}>
        <react_native_1.View style={styles.actionIcon}>
          <react_native_1.Text style={styles.actionIconText}>📊</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={styles.actionTitle}>Analytics</react_native_1.Text>
        <react_native_1.Text style={styles.actionSubtitle}>Detailed insights</react_native_1.Text>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>); };
    var renderRecentOrders = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.View style={styles.sectionHeader}>
        <react_native_1.Text style={styles.sectionTitle}>Recent Orders</react_native_1.Text>
        <react_native_1.TouchableOpacity onPress={function () { return navigation.navigate('SupplierOrders'); }}>
          <react_native_1.Text style={styles.viewAll}>View All</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
      <react_native_1.View style={styles.ordersList}>
        {recentOrders.map(function (order) { return (<react_native_1.View key={order.id} style={styles.orderItem}>
            <react_native_1.View style={styles.orderInfo}>
              <react_native_1.Text style={styles.orderId}>Order #{order.id}</react_native_1.Text>
              <react_native_1.Text style={styles.orderCustomer}>{order.customer}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={styles.orderDetails}>
              <react_native_1.Text style={styles.orderTotal}>${order.total.toFixed(2)}</react_native_1.Text>
              <react_native_1.View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                <react_native_1.Text style={styles.statusText}>{getStatusText(order.status)}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>); })}
      </react_native_1.View>
    </react_native_1.View>); };
    var renderLowStockAlert = function () { return (<react_native_1.View style={styles.alertContainer}>
      <react_native_1.View style={styles.alertIcon}>
        <react_native_1.Text style={styles.alertIconText}>⚠️</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.alertContent}>
        <react_native_1.Text style={styles.alertTitle}>Low Stock Alert</react_native_1.Text>
        <react_native_1.Text style={styles.alertMessage}>
          {stats.lowStockProducts} products are running low on stock
        </react_native_1.Text>
      </react_native_1.View>
      <react_native_1.TouchableOpacity style={styles.alertButton} onPress={function () { return navigation.navigate('SupplierProducts'); }}>
        <react_native_1.Text style={styles.alertButtonText}>Manage Stock</react_native_1.Text>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>); };
    var renderRecentProducts = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.View style={styles.sectionHeader}>
        <react_native_1.Text style={styles.sectionTitle}>Top Products</react_native_1.Text>
        <react_native_1.TouchableOpacity onPress={function () { return navigation.navigate('SupplierProducts'); }}>
          <react_native_1.Text style={styles.viewAll}>View All</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
      <react_native_1.View style={styles.productsList}>
        {recentProducts.map(function (product) { return (<react_native_1.View key={product.id} style={styles.productItem}>
            <Image_1.Image source={{ uri: product.image }} variant="rounded" size="sm" style={styles.productImage}/>
            <react_native_1.View style={styles.productInfo}>
              <react_native_1.Text style={styles.productName} numberOfLines={1}>
                {product.name}
              </react_native_1.Text>
              <react_native_1.Text style={styles.productPrice}>${product.price.toFixed(2)}</react_native_1.Text>
              <react_native_1.Text style={styles.productStock}>Stock: {product.stock}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={styles.productSales}>
              <react_native_1.Text style={styles.salesCount}>{product.sales} sold</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>); })}
      </react_native_1.View>
    </react_native_1.View>); };
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.title}>Supplier Dashboard</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>Welcome back, Supplier!</react_native_1.Text>
      </react_native_1.View>
      
      {renderStatsCards()}
      {renderQuickActions()}
      {renderRecentOrders()}
      {renderLowStockAlert()}
      {renderRecentProducts()}
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
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: constants_1.spacing.component.padding.md,
        gap: constants_1.spacing.component.margin.md,
    },
    statCard: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: constants_1.colors.background.secondary,
        borderRadius: constants_1.spacing.radius.md,
        padding: constants_1.spacing.component.padding.md,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    statValue: __assign(__assign({}, constants_1.typography.h4), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    statLabel: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted, textAlign: 'center' }),
    actionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: constants_1.spacing.component.padding.md,
        gap: constants_1.spacing.component.margin.md,
    },
    actionCard: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: constants_1.colors.background.secondary,
        borderRadius: constants_1.spacing.radius.md,
        padding: constants_1.spacing.component.padding.md,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    actionIcon: {
        width: 50,
        height: 50,
        borderRadius: constants_1.spacing.radius.md,
        backgroundColor: constants_1.colors.primary[100],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: constants_1.spacing.component.margin.sm,
    },
    actionIconText: {
        fontSize: 24,
    },
    actionTitle: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    actionSubtitle: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted, textAlign: 'center' }),
    section: {
        padding: constants_1.spacing.component.padding.md,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    sectionTitle: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary }),
    viewAll: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.primary[500] }),
    ordersList: {
        gap: constants_1.spacing.component.margin.sm,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: constants_1.spacing.component.padding.sm,
        backgroundColor: constants_1.colors.background.secondary,
        borderRadius: constants_1.spacing.radius.sm,
        borderWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    orderInfo: {
        flex: 1,
    },
    orderId: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600' }),
    orderCustomer: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    orderDetails: {
        alignItems: 'flex-end',
    },
    orderTotal: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600', marginBottom: constants_1.spacing.component.margin.xs }),
    statusBadge: {
        paddingHorizontal: constants_1.spacing.component.padding.xs,
        paddingVertical: constants_1.spacing.component.padding.xs / 2,
        borderRadius: constants_1.spacing.radius.sm,
    },
    statusText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.inverted, fontWeight: '600' }),
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: constants_1.spacing.component.padding.md,
        backgroundColor: constants_1.colors.warning[100],
        borderRadius: constants_1.spacing.radius.md,
        margin: constants_1.spacing.component.padding.md,
        borderWidth: 1,
        borderColor: constants_1.colors.warning[200],
    },
    alertIcon: {
        marginRight: constants_1.spacing.component.margin.sm,
    },
    alertIconText: {
        fontSize: 24,
    },
    alertContent: {
        flex: 1,
    },
    alertTitle: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600', marginBottom: constants_1.spacing.component.margin.xs }),
    alertMessage: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    alertButton: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
        paddingVertical: constants_1.spacing.component.padding.sm,
        backgroundColor: constants_1.colors.warning[500],
        borderRadius: constants_1.spacing.radius.sm,
    },
    alertButtonText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.inverted, fontWeight: '600' }),
    productsList: {
        gap: constants_1.spacing.component.margin.sm,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: constants_1.spacing.component.padding.sm,
        backgroundColor: constants_1.colors.background.secondary,
        borderRadius: constants_1.spacing.radius.sm,
        borderWidth: 1,
        borderColor: constants_1.colors.neutral[200],
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: constants_1.spacing.component.margin.sm,
    },
    productInfo: {
        flex: 1,
    },
    productName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    productPrice: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.primary[500], fontWeight: '600' }),
    productStock: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    productSales: {
        alignItems: 'flex-end',
    },
    salesCount: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
});
exports.default = SupplierDashboardScreen;
