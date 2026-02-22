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
var Badge_1 = require("../ui/atoms/Badge");
var EditProfileScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 555 123 4567',
        bio: 'Passionate about technology and innovation.',
        profileImage: 'https://example.com/profile.jpg',
    }), profile = _b[0], setProfile = _b[1];
    var _c = react_1.default.useState(false), isSaving = _c[0], setIsSaving = _c[1];
    var handleSaveProfile = function () {
        setIsSaving(true);
        setTimeout(function () {
            setIsSaving(false);
            navigation.goBack();
        }, 1500);
    };
    var handleCancel = function () {
        navigation.goBack();
    };
    var handleInputChange = function (field, value) {
        setProfile(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    };
    var renderProfileImage = function () { return (<react_native_1.View style={styles.profileImageContainer}>
      <react_native_1.Image source={{ uri: profile.profileImage }} variant="rounded" size="lg" style={styles.profileImage}/>
      <react_native_1.TouchableOpacity style={styles.changePhotoButton}>
        <react_native_1.Text style={styles.changePhotoText}>Change Photo</react_native_1.Text>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>); };
    var renderPersonalInfo = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.Text style={styles.sectionTitle}>Personal Information</react_native_1.Text>
      <react_native_1.View style={styles.formGroup}>
        <react_native_1.Text style={styles.label}>First Name</react_native_1.Text>
        <react_native_1.TextInput style={styles.input} value={profile.firstName} onChangeText={function (value) { return handleInputChange('firstName', value); }} placeholder="Enter first name"/>
      </react_native_1.View>
      <react_native_1.View style={styles.formGroup}>
        <react_native_1.Text style={styles.label}>Last Name</react_native_1.Text>
        <react_native_1.TextInput style={styles.input} value={profile.lastName} onChangeText={function (value) { return handleInputChange('lastName', value); }} placeholder="Enter last name"/>
      </react_native_1.View>
      <react_native_1.View style={styles.formGroup}>
        <react_native_1.Text style={styles.label}>Email</react_native_1.Text>
        <react_native_1.TextInput style={styles.input} value={profile.email} onChangeText={function (value) { return handleInputChange('email', value); }} placeholder="Enter email" keyboardType="email-address" autoCapitalize="none"/>
      </react_native_1.View>
      <react_native_1.View style={styles.formGroup}>
        <react_native_1.Text style={styles.label}>Phone</react_native_1.Text>
        <react_native_1.TextInput style={styles.input} value={profile.phone} onChangeText={function (value) { return handleInputChange('phone', value); }} placeholder="Enter phone number" keyboardType="phone-pad"/>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderBioSection = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.Text style={styles.sectionTitle}>Bio</react_native_1.Text>
      <react_native_1.View style={styles.formGroup}>
        <react_native_1.Text style={styles.label}>About Me</react_native_1.Text>
        <react_native_1.TextInput style={[styles.input, styles.textArea]} value={profile.bio} onChangeText={function (value) { return handleInputChange('bio', value); }} placeholder="Tell us about yourself..." multiline numberOfLines={4} textAlignVertical="top"/>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderAccountSettings = function () { return (<react_native_1.View style={styles.section}>
      <react_native_1.Text style={styles.sectionTitle}>Account Settings</react_native_1.Text>
      <react_native_1.View style={styles.settingItem}>
        <react_native_1.Text style={styles.settingLabel}>Email Notifications</react_native_1.Text>
        <Badge_1.Badge variant="success" style={styles.settingBadge}>
          Enabled
        </Badge_1.Badge>
      </react_native_1.View>
      <react_native_1.View style={styles.settingItem}>
        <react_native_1.Text style={styles.settingLabel}>Push Notifications</react_native_1.Text>
        <Badge_1.Badge variant="success" style={styles.settingBadge}>
          Enabled
        </Badge_1.Badge>
      </react_native_1.View>
      <react_native_1.View style={styles.settingItem}>
        <react_native_1.Text style={styles.settingLabel}>Two-Factor Authentication</react_native_1.Text>
        <Badge_1.Badge variant="warning" style={styles.settingBadge}>
          Disabled
        </Badge_1.Badge>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderActions = function () { return (<react_native_1.View style={styles.actions}>
      <Button_1.Button variant="outline" onPress={handleCancel} style={styles.cancelButton}>
        Cancel
      </Button_1.Button>
      <Button_1.Button isLoading={isSaving} onPress={handleSaveProfile} style={styles.saveButton}>
        Save Changes
      </Button_1.Button>
    </react_native_1.View>); };
    return (<react_native_1.ScrollView style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text style={styles.title}>Edit Profile</react_native_1.Text>
      </react_native_1.View>
      
      {renderProfileImage()}
      {renderPersonalInfo()}
      {renderBioSection()}
      {renderAccountSettings()}
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
    profileImageContainer: {
        alignItems: 'center',
        padding: constants_1.spacing.component.padding.md,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    profileImage: {
        width: 100,
        height: 100,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    changePhotoButton: {
        paddingHorizontal: constants_1.spacing.component.padding.md,
        paddingVertical: constants_1.spacing.component.padding.sm,
        backgroundColor: constants_1.colors.primary[500],
        borderRadius: constants_1.spacing.radius.sm,
    },
    changePhotoText: __assign(__assign({}, constants_1.typography.caption), { color: constants_1.colors.text.inverted, fontWeight: '600' }),
    section: {
        padding: constants_1.spacing.component.padding.md,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    sectionTitle: __assign(__assign({}, constants_1.typography.h6), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.md }),
    formGroup: {
        marginBottom: constants_1.spacing.component.margin.md,
    },
    label: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.muted, marginBottom: constants_1.spacing.component.margin.xs }),
    input: __assign(__assign({ borderWidth: 1, borderColor: constants_1.colors.neutral[300], borderRadius: constants_1.spacing.radius.sm, padding: constants_1.spacing.component.padding.sm, backgroundColor: constants_1.colors.background.secondary }, constants_1.typography.body), { color: constants_1.colors.text.primary }),
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: constants_1.spacing.component.padding.sm,
        borderBottomWidth: 1,
        borderBottomColor: constants_1.colors.neutral[200],
    },
    settingLabel: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.primary }),
    settingBadge: {
        paddingHorizontal: constants_1.spacing.component.padding.xs,
        paddingVertical: constants_1.spacing.component.padding.xs / 2,
        borderRadius: constants_1.spacing.radius.sm,
    },
    actions: {
        padding: constants_1.spacing.component.padding.md,
        flexDirection: 'row',
        gap: constants_1.spacing.component.margin.md,
    },
    cancelButton: {
        flex: 1,
    },
    saveButton: {
        flex: 1,
    },
});
exports.default = EditProfileScreen;
