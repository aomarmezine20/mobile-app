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
var NotificationsScreen = function () {
    var _a = react_1.default.useState([
        {
            id: '1',
            title: 'Order Shipped',
            message: 'Your order #12345 has been shipped and is on its way.',
            type: 'info',
            read: false,
            createdAt: 'Just now',
        },
        {
            id: '2',
            title: 'Order Delivered',
            message: 'Your order #12345 has been delivered successfully.',
            type: 'success',
            read: true,
            createdAt: '2 minutes ago',
        },
        {
            id: '3',
            title: 'Price Drop',
            message: 'The price of Wireless Headphones has dropped by 20%.',
            type: 'warning',
            read: false,
            createdAt: '5 minutes ago',
        },
        {
            id: '4',
            title: 'New Product Alert',
            message: 'Check out our latest collection of smart home devices.',
            type: 'info',
            read: true,
            createdAt: '30 minutes ago',
        },
        {
            id: '5',
            title: 'Order Cancelled',
            message: 'Your order #12346 has been cancelled due to stock unavailability.',
            type: 'error',
            read: true,
            createdAt: '1 hour ago',
        },
    ]), notifications = _a[0], setNotifications = _a[1];
    var _b = react_1.default.useState(null), selectedNotification = _b[0], setSelectedNotification = _b[1];
    var handleNotificationPress = function (notification) {
        setSelectedNotification(notification);
        setNotifications(function (prev) {
            return prev.map(function (n) { return (n.id === notification.id ? __assign(__assign({}, n), { read: true }) : n); });
        });
    };
    var handleMarkAllAsRead = function () {
        setNotifications(function (prev) { return prev.map(function (n) { return (__assign(__assign({}, n), { read: true })); }); });
    };
    var handleClearAll = function () {
        setNotifications([]);
        setSelectedNotification(null);
    };
    var getNotificationColor = function (type) {
        var colorsByType = {
            info: 'blue',
            success: 'green',
            warning: 'orange',
            error: 'red',
        };
        return colorsByType[type] || 'blue';
    };
    var getNotificationIcon = function (type) {
        var iconsByType = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌',
        };
        return iconsByType[type] || 'ℹ️';
    };
    var renderNotification = function (_a) {
        var item = _a.item;
        return (<react_native_1.TouchableOpacity style={[
                styles.notification,
                (selectedNotification === null || selectedNotification === void 0 ? void 0 : selectedNotification.id) === item.id && styles.selectedNotification,
                item.read && styles.readNotification,
            ]} onPress={function () { return handleNotificationPress(item); }}>
      <react_native_1.View style={styles.notificationIcon}>
        <react_native_1.Text style={[
                styles.notificationIconText,
                { color: getNotificationColor(item.type) },
            ]}>
          {getNotificationIcon(item.type)}
        </react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.notificationContent}>
        <react_native_1.Text style={styles.notificationTitle}>{item.title}</react_native_1.Text>
        <react_native_1.Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </react_native_1.Text>
        <react_native_1.Text style={styles.notificationTime}>{item.createdAt}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.TouchableOpacity>);
    };
    var renderSelectedNotification = function () {
        if (!selectedNotification) {
            return null;
        }
        return (<react_native_1.View style={styles.selectedNotificationView}>
        <react_native_1.Text style={styles.selectedNotificationTitle}>
          {selectedNotification.title}
        </react_native_1.Text>
        <react_native_1.Text style={styles.selectedNotificationMessage}>
          {selectedNotification.message}
        </react_native_1.Text>
        <react_native_1.Text style={styles.selectedNotificationTime}>
          {selectedNotification.createdAt}
        </react_native_1.Text>
      </react_native_1.View>);
    };
    var renderEmptyState = function () { return (<react_native_1.View style={styles.emptyState}>
      <react_native_1.Text style={styles.emptyIcon}>🔔</react_native_1.Text>
      <react_native_1.Text style={styles.emptyTitle}>No notifications</react_native_1.Text>
      <react_native_1.Text style={styles.emptySubtitle}>
        You'll see your notifications here when you have them.
      </react_native_1.Text>
    </react_native_1.View>); };
    var renderActions = function () { return (<react_native_1.View style={styles.actions}>
      <Button_1.Button variant="outline" onPress={handleMarkAllAsRead} style={styles.actionButton}>
        Mark All as Read
      </Button_1.Button>
      <Button_1.Button variant="outline" onPress={handleClearAll} style={styles.actionButton}>
        Clear All
      </Button_1.Button>
    </react_native_1.View>); };
    var unreadCount = notifications.filter(function (n) { return !n.read; }).length;
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.title}>Notifications</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>{unreadCount} unread</react_native_1.Text>
      </react_native_1.View>

      {notifications.length > 0 ? (<react_native_1.View style={styles.notificationsList}>
          {renderActions()}
          <react_native_1.FlatList data={notifications} renderItem={renderNotification} keyExtractor={function (item) { return item.id; }} contentContainerStyle={styles.notificationsContainer} scrollEnabled={false}/>
          {renderSelectedNotification()}
        </react_native_1.View>) : (renderEmptyState())}
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
    notificationsList: {
        flex: 1,
    },
    actions: {
        flexDirection: 'row',
        gap: constants_1.spacing.component.margin.sm,
        padding: constants_1.spacing.component.padding.md,
    },
    actionButton: {
        flex: 1,
    },
    notificationsContainer: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
    },
    notification: __assign({ flexDirection: 'row', alignItems: 'center', backgroundColor: constants_1.colors.background.secondary, borderRadius: constants_1.spacing.radius.md, padding: constants_1.spacing.component.padding.md, marginBottom: constants_1.spacing.component.margin.sm }, constants_1.spacing.shadow.sm),
    selectedNotification: {
        backgroundColor: constants_1.colors.primary[50],
    },
    readNotification: {
        opacity: 0.6,
    },
    notificationIcon: {
        width: 40,
        height: 40,
        borderRadius: constants_1.spacing.radius.sm,
        backgroundColor: constants_1.colors.primary[50],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: constants_1.spacing.component.margin.md,
    },
    notificationIconText: {
        fontSize: 20,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600', marginBottom: constants_1.spacing.component.margin.xs }),
    notificationMessage: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    notificationTime: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    selectedNotificationView: __assign({ padding: constants_1.spacing.component.padding.md, backgroundColor: constants_1.colors.background.secondary, borderRadius: constants_1.spacing.radius.md, marginTop: constants_1.spacing.component.margin.md }, constants_1.spacing.shadow.sm),
    selectedNotificationTitle: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: '600', marginBottom: constants_1.spacing.component.margin.xs }),
    selectedNotificationMessage: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.md }),
    selectedNotificationTime: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: constants_1.spacing.component.padding.md,
        marginTop: constants_1.spacing.component.margin.md,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    emptyTitle: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    emptySubtitle: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.muted, textAlign: 'center' }),
});
exports.default = NotificationsScreen;
