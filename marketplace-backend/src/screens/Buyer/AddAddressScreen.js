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
var AddAddressScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState({
        type: 'home',
        fullName: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    }), address = _b[0], setAddress = _b[1];
    var _c = react_1.default.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var handleSaveAddress = function () {
        setIsLoading(true);
        setTimeout(function () {
            setIsLoading(false);
            navigation.goBack();
        }, 1000);
    };
    var handleCancel = function () {
        navigation.goBack();
    };
    var renderAddressTypeSelector = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.Text style={styles.sectionTitle}>Address Type</react_native_1.Text>
      <react_native_1.View style={styles.addressTypeContainer}>
        {['home', 'work', 'other'].map(function (type) { return (<react_native_1.TouchableOpacity key={type} style={[
                styles.addressTypeButton,
                address.type === type && styles.addressTypeButtonSelected,
            ]} onPress={function () { return setAddress(__assign(__assign({}, address), { type: type })); }}>
            <react_native_1.Text style={[
                styles.addressTypeButtonText,
                address.type === type && styles.addressTypeButtonTextSelected,
            ]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </react_native_1.Text>
          </react_native_1.TouchableOpacity>); })}
      </react_native_1.View>
    </react_native_1.View>); };
    var renderAddressFields = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.Text style={styles.sectionTitle}>Address Details</react_native_1.Text>
      <react_native_1.View style={styles.inputGroup}>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>Full Name</react_native_1.Text>
          <TextInput style={styles.input} value={address.fullName} onChangeText={function (text) { return setAddress(__assign(__assign({}, address), { fullName: text })); }} placeholder="John Doe"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>Phone</react_native_1.Text>
          <TextInput style={styles.input} value={address.phone} onChangeText={function (text) { return setAddress(__assign(__assign({}, address), { phone: text })); }} placeholder="+1 555 123 4567" keyboardType="phone-pad"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>Street Address</react_native_1.Text>
          <TextInput style={styles.input} value={address.street} onChangeText={function (text) { return setAddress(__assign(__assign({}, address), { street: text })); }} placeholder="123 Main St"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>City</react_native_1.Text>
          <TextInput style={styles.input} value={address.city} onChangeText={function (text) { return setAddress(__assign(__assign({}, address), { city: text })); }} placeholder="New York"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>State</react_native_1.Text>
          <TextInput style={styles.input} value={address.state} onChangeText={function (text) { return setAddress(__assign(__assign({}, address), { state: text })); }} placeholder="NY"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>ZIP Code</react_native_1.Text>
          <TextInput style={styles.input} value={address.zipCode} onChangeText={function (text) { return setAddress(__assign(__assign({}, address), { zipCode: text })); }} placeholder="10001" keyboardType="numeric"/>
        </react_native_1.View>
        <react_native_1.View style={styles.inputItem}>
          <react_native_1.Text style={styles.inputLabel}>Country</react_native_1.Text>
          <TextInput style={styles.input} value={address.country} onChangeText={function (text) { return setAddress(__assign(__assign({}, address), { country: text })); }} placeholder="United States"/>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderActions = function () { return (<react_native_1.View style={styles.actions}>
      <Button_1.Button variant="outline" onPress={handleCancel} style={styles.cancelButton}>
        Cancel
      </Button_1.Button>
      <Button_1.Button variant="primary" onPress={handleSaveAddress} loading={isLoading} style={styles.saveButton}>
        Save Address
      </Button_1.Button>
    </react_native_1.View>); };
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.title}>Add New Address</react_native_1.Text>
      </react_native_1.View>
      
      {renderAddressTypeSelector()}
      {renderAddressFields()}
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
    addressTypeContainer: {
        flexDirection: 'row',
        gap: constants_1.spacing.component.margin.sm,
    },
    addressTypeButton: {
        flex: 1,
        padding: constants_1.spacing.component.padding.sm,
        borderRadius: constants_1.spacing.radius.sm,
        backgroundColor: constants_1.colors.neutral[50],
        alignItems: 'center',
    },
    addressTypeButtonSelected: {
        backgroundColor: constants_1.colors.primary[50],
    },
    addressTypeButtonText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.primary }),
    addressTypeButtonTextSelected: {
        color: constants_1.colors.primary[500],
        fontWeight: '600',
    },
    inputGroup: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    inputItem: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    inputLabel: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.muted, marginBottom: constants_1.spacing.component.margin.xs }),
    input: __assign(__assign({}, constants_1.typography.body), { height: 48, backgroundColor: constants_1.colors.background.secondary, borderRadius: constants_1.spacing.radius.md, paddingHorizontal: constants_1.spacing.component.padding.sm, borderWidth: 1, borderColor: constants_1.colors.neutral[200] }),
    actions: {
        flexDirection: 'row',
        gap: constants_1.spacing.component.margin.sm,
        padding: constants_1.spacing.component.padding.md,
    },
    cancelButton: {
        flex: 1,
    },
    saveButton: {
        flex: 1,
    },
});
exports.default = AddAddressScreen;
