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
var ProfileScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'buyer',
        avatar: 'https://example.com/avatar.jpg',
        phone: '+1 555 123 4567',
        address: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
        },
    }), user = _b[0], setUser = _b[1];
    var _c = react_1.default.useState(15), ordersCount = _c[0], setOrdersCount = _c[1];
    var _d = react_1.default.useState(4.5), rating = _d[0], setRating = _d[1];
    var _e = react_1.default.useState(3), productsCount = _e[0], setProductsCount = _e[1];
    var handleEditProfile = function () {
        navigation.navigate('EditProfile');
    };
    var handleOrders = function () {
        navigation.navigate('OrderHistory');
    };
    var handleFavorites = function () {
        navigation.navigate('Favorites');
    };
    var handleAddresses = function () {
        navigation.navigate('Addresses');
    };
    var handleNotifications = function () {
        navigation.navigate('Notifications');
    };
    var handleLogout = function () {
        // Logout logic
        console.log('Logout');
    };
    var renderProfileHeader = function () { return (<react_native_1.View style={styles.header}>
      <Image_1.Image source={{ uri: user.avatar }} variant="circle" size="lg" style={styles.avatar}/>
      <react_native_1.View style={styles.userInfo}>
        <react_native_1.Text style={styles.name}>{user.name}</react_native_1.Text>
        <react_native_1.Text style={styles.email}>{user.email}</react_native_1.Text>
        <react_native_1.Text style={styles.role}>{user.role}</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
        <react_native_1.Text style={styles.editText}>Edit</react_native_1.Text>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>); };
    var renderStats = function () { return (<react_native_1.View style={styles.stats}>
      <react_native_1.View style={styles.statItem}>
        <react_native_1.Text style={styles.statNumber}>{ordersCount}</react_native_1.Text>
        <react_native_1.Text style={styles.statLabel}>Orders</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.statItem}>
        <react_native_1.Text style={styles.statNumber}>{rating.toFixed(1)}</react_native_1.Text>
        <react_native_1.Text style={styles.statLabel}>Rating</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.statItem}>
        <react_native_1.Text style={styles.statNumber}>{productsCount}</react_native_1.Text>
        <react_native_1.Text style={styles.statLabel}>Products</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderMenuItems = function () { return (<react_native_1.View style={styles.menu}>
      <react_native_1.TouchableOpacity style={styles.menuItem} onPress={handleOrders}>
        <react_native_1.View style={styles.menuIcon}>
          <react_native_1.Text style={styles.menuIconText}>📦</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuContent}>
          <react_native_1.Text style={styles.menuTitle}>My Orders</react_native_1.Text>
          <react_native_1.Text style={styles.menuSubtitle}>View all your orders</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuArrow}>
          <react_native_1.Text style={styles.menuArrowText}>→</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>

      <react_native_1.TouchableOpacity style={styles.menuItem} onPress={handleFavorites}>
        <react_native_1.View style={styles.menuIcon}>
          <react_native_1.Text style={styles.menuIconText}>⭐</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuContent}>
          <react_native_1.Text style={styles.menuTitle}>Favorites</react_native_1.Text>
          <react_native_1.Text style={styles.menuSubtitle}>Your favorite products</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuArrow}>
          <react_native_1.Text style={styles.menuArrowText}>→</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>

      <react_native_1.TouchableOpacity style={styles.menuItem} onPress={handleAddresses}>
        <react_native_1.View style={styles.menuIcon}>
          <react_native_1.Text style={styles.menuIconText}>��</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuContent}>
          <react_native_1.Text style={styles.menuTitle}>Addresses</react_native_1.Text>
          <react_native_1.Text style={styles.menuSubtitle}>Manage shipping addresses</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuArrow}>
          <react_native_1.Text style={styles.menuArrowText}>→</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>

      <react_native_1.TouchableOpacity style={styles.menuItem} onPress={handleNotifications}>
        <react_native_1.View style={styles.menuIcon}>
          <react_native_1.Text style={styles.menuIconText}>��</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuContent}>
          <react_native_1.Text style={styles.menuTitle}>Notifications</react_native_1.Text>
          <react_native_1.Text style={styles.menuSubtitle}>Your notifications</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuArrow}>
          <react_native_1.Text style={styles.menuArrowText}>→</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>

      <react_native_1.TouchableOpacity style={styles.menuItem}>
        <react_native_1.View style={styles.menuIcon}>
          <react_native_1.Text style={styles.menuIconText}>��</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuContent}>
          <react_native_1.Text style={styles.menuTitle}>Payment Methods</react_native_1.Text>
          <react_native_1.Text style={styles.menuSubtitle}>Manage your cards</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuArrow}>
          <react_native_1.Text style={styles.menuArrowText}>→</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>

      <react_native_1.TouchableOpacity style={styles.menuItem}>
        <react_native_1.View style={styles.menuIcon}>
          <react_native_1.Text style={styles.menuIconText}>��</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuContent}>
          <react_native_1.Text style={styles.menuTitle}>Account Settings</react_native_1.Text>
          <react_native_1.Text style={styles.menuSubtitle}>Update your profile</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuArrow}>
          <react_native_1.Text style={styles.menuArrowText}>→</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>

      <react_native_1.TouchableOpacity style={styles.menuItem}>
        <react_native_1.View style={styles.menuIcon}>
          <react_native_1.Text style={styles.menuIconText}>��</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuContent}>
          <react_native_1.Text style={styles.menuTitle}>Privacy & Security</react_native_1.Text>
          <react_native_1.Text style={styles.menuSubtitle}>Security settings</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuArrow}>
          <react_native_1.Text style={styles.menuArrowText}>→</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>

      <react_native_1.TouchableOpacity style={styles.menuItem}>
        <react_native_1.View style={styles.menuIcon}>
          <react_native_1.Text style={styles.menuIconText}>��</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuContent}>
          <react_native_1.Text style={styles.menuTitle}>Help & Support</react_native_1.Text>
          <react_native_1.Text style={styles.menuSubtitle}>Get help and support</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.menuArrow}>
          <react_native_1.Text style={styles.menuArrowText}>→</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>); };
    var renderLogout = function () { return (<react_native_1.View style={styles.logout}>
      <Button_1.Button variant="ghost" onPress={handleLogout} style={styles.logoutButton}>
        Logout
      </Button_1.Button>
    </react_native_1.View>); };
    return (<react_native_1.ScrollView style={styles.container}>
      {renderProfileHeader()}
      {renderStats()}
      {renderMenuItems()}
      {renderLogout()}
    </react_native_1.ScrollView>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants_1.colors.background.primary,
    },
    header: {
        padding: constants_1.spacing.component.padding.md,
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    avatar: {
        width: 100,
        height: 100,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    name: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    email: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.muted, marginBottom: constants_1.spacing.component.margin.xs }),
    role: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.primary[500] }),
    editButton: {
        padding: constants_1.spacing.component.padding.xs,
    },
    editText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.primary[500], fontWeight: '600' }),
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: constants_1.spacing.component.padding.md,
        marginBottom: constants_1.spacing.component.margin.md,
        borderBottomWidth: 1,
        borderColor: constants_1.colors.neutral[200],
        paddingBottom: constants_1.spacing.component.padding.md,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.primary[500], fontWeight: 'bold', marginBottom: constants_1.spacing.component.margin.xs }),
    statLabel: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    menu: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
    },
    menuItem: __assign({ flexDirection: 'row', alignItems: 'center', backgroundColor: constants_1.colors.background.secondary, borderRadius: constants_1.spacing.radius.md, padding: constants_1.spacing.component.padding.md, marginBottom: constants_1.spacing.component.margin.sm }, constants_1.spacing.shadow.sm),
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: constants_1.spacing.radius.sm,
        backgroundColor: constants_1.colors.primary[50],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: constants_1.spacing.component.margin.md,
    },
    menuIconText: {
        fontSize: 20,
        color: constants_1.colors.primary[500],
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    menuSubtitle: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    menuArrow: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuArrowText: {
        fontSize: 16,
        color: constants_1.colors.text.muted,
    },
    logout: {
        padding: constants_1.spacing.component.padding.md,
        marginTop: constants_1.spacing.component.margin.md,
    },
    logoutButton: {
        width: '100%',
    },
});
exports.default = ProfileScreen;
