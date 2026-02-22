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
var Badge_1 = require("../ui/atoms/Badge");
var Button_1 = require("../ui/atoms/Button");
var AddressesScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState([
        {
            id: '1',
            type: 'home',
            fullName: 'John Doe',
            phone: '+1 555 123 4567',
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
            isDefault: true,
        },
        {
            id: '2',
            type: 'work',
            fullName: 'John Doe',
            phone: '+1 555 123 4567',
            street: '456 Business Ave',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
            isDefault: false,
        },
        {
            id: '3',
            type: 'other',
            fullName: 'John Doe',
            phone: '+1 555 123 4567',
            street: '789 Other St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
            isDefault: false,
        },
    ]), addresses = _b[0], setAddresses = _b[1];
    var _c = react_1.default.useState(null), selectedAddress = _c[0], setSelectedAddress = _c[1];
    var handleAddressPress = function (address) {
        setSelectedAddress(address);
    };
    var handleAddAddress = function () {
        navigation.navigate('AddAddress');
    };
    var handleEditAddress = function (addressId) {
        navigation.navigate('EditAddress', { addressId: addressId });
    };
    var handleRemoveAddress = function (addressId) {
        setAddresses(function (prevAddresses) {
            return prevAddresses.filter(function (address) { return address.id !== addressId; });
        });
    };
    var handleSetDefault = function (addressId) {
        setAddresses(function (prevAddresses) {
            return prevAddresses.map(function (address) {
                return address.id === addressId
                    ? __assign(__assign({}, address), { isDefault: true }) : __assign(__assign({}, address), { isDefault: false });
            });
        });
    };
    var getAddressTypeLabel = function (type) {
        var labels = {
            home: 'Home',
            work: 'Work',
            other: 'Other',
        };
        return labels[type] || type;
    };
    var renderAddress = function (_a) {
        var item = _a.item;
        return (<react_native_1.TouchableOpacity style={[
                styles.addressCard,
                (selectedAddress === null || selectedAddress === void 0 ? void 0 : selectedAddress.id) === item.id && styles.selectedAddressCard,
            ]} onPress={function () { return handleAddressPress(item); }}>
      <react_native_1.View style={styles.addressHeader}>
        <react_native_1.Text style={styles.addressType}>
          {getAddressTypeLabel(item.type)}
        </react_native_1.Text>
        {item.isDefault && (<Badge_1.Badge variant="primary">Default</Badge_1.Badge>)}
      </react_native_1.View>
      
      <react_native_1.Text style={styles.addressName}>{item.fullName}</react_native_1.Text>
      <react_native_1.Text style={styles.addressPhone}>{item.phone}</react_native_1.Text>
      <react_native_1.Text style={styles.addressStreet}>{item.street}</react_native_1.Text>
      <react_native_1.Text style={styles.addressCityStateZip}>
        {item.city}, {item.state} {item.zipCode}
      </react_native_1.Text>
      <react_native_1.Text style={styles.addressCountry}>{item.country}</react_native_1.Text>
      
      <react_native_1.View style={styles.addressActions}>
        <react_native_1.TouchableOpacity onPress={function () { return handleSetDefault(item.id); }} style={styles.actionButton}>
          <react_native_1.Text style={styles.actionButtonText}>
            {item.isDefault ? 'Default' : 'Set as Default'}
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity onPress={function () { return handleEditAddress(item.id); }} style={styles.actionButton}>
          <react_native_1.Text style={styles.actionButtonText}>Edit</react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity onPress={function () { return handleRemoveAddress(item.id); }} style={styles.actionButton}>
          <react_native_1.Text style={styles.actionButtonText}>Remove</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.TouchableOpacity>);
    };
    var renderEmptyState = function () { return (<react_native_1.View style={styles.emptyState}>
      <react_native_1.Text style={styles.emptyIcon}>��</react_native_1.Text>
      <react_native_1.Text style={styles.emptyTitle}>No addresses yet</react_native_1.Text>
      <react_native_1.Text style={styles.emptySubtitle}>
        Add your shipping addresses to make checkout faster
      </react_native_1.Text>
      <Button_1.Button variant="primary" onPress={handleAddAddress} style={styles.addAddressButton}>
        Add Address
      </Button_1.Button>
    </react_native_1.View>); };
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.title}>My Addresses</react_native_1.Text>
        <react_native_1.Text style={styles.subtitle}>
          Manage your shipping addresses
        </react_native_1.Text>
      </react_native_1.View>
      
      {addresses.length > 0 ? (<react_native_1.View style={styles.addressesList}>
          <FlatList data={addresses} renderItem={renderAddress} keyExtractor={function (item) { return item.id; }} contentContainerStyle={styles.addressesContainer} showsVerticalScrollIndicator={false}/>
        </react_native_1.View>) : (renderEmptyState())}
      
      <react_native_1.View style={styles.addButton}>
        <Button_1.Button variant="primary" onPress={handleAddAddress} style={styles.addAddressButton}>
          + Add New Address
        </Button_1.Button>
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
    title: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    subtitle: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted }),
    addressesList: {
        flex: 1,
    },
    addressesContainer: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
    },
    addressCard: __assign({ backgroundColor: constants_1.colors.background.secondary, borderRadius: constants_1.spacing.radius.md, padding: constants_1.spacing.component.padding.md, marginBottom: constants_1.spacing.component.margin.sm }, constants_1.spacing.shadow.sm),
    selectedAddressCard: {
        backgroundColor: constants_1.colors.primary[50],
    },
    addressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.sm,
    },
    addressType: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, fontWeight: 'bold', marginRight: constants_1.spacing.component.margin.sm }),
    addressName: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    addressPhone: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted, marginBottom: constants_1.spacing.component.margin.sm }),
    addressStreet: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    addressCityStateZip: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs }),
    addressCountry: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.md }),
    addressActions: {
        flexDirection: 'row',
        gap: constants_1.spacing.component.margin.sm,
    },
    actionButton: {
        paddingHorizontal: constants_1.spacing.component.padding.sm,
        paddingVertical: constants_1.spacing.component.padding.xs,
        borderRadius: constants_1.spacing.radius.sm,
        backgroundColor: constants_1.colors.neutral[50],
    },
    actionButtonText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.primary, fontWeight: '600' }),
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
    emptySubtitle: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.muted, textAlign: 'center', marginBottom: constants_1.spacing.component.margin.md }),
    addAddressButton: {
        width: '100%',
    },
    addButton: {
        padding: constants_1.spacing.component.padding.md,
    },
});
exports.default = AddressesScreen;
