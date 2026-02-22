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
var Image_1 = require("../atoms/Image");
var ProfileCard = function (_a) {
    var user = _a.user, onEdit = _a.onEdit;
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.header}>
        <Image_1.Image source={{ uri: user.avatar }} variant="circle" size="lg" style={styles.avatar}/>
        <react_native_1.View style={styles.userInfo}>
          <react_native_1.Text variant="h5" style={styles.name}>
            {user.name}
          </react_native_1.Text>
          <react_native_1.Text variant="caption" style={styles.email}>
            {user.email}
          </react_native_1.Text>
          <react_native_1.Text variant="overline" style={styles.role}>
            {user.role}
          </react_native_1.Text>
        </react_native_1.View>
        {onEdit && (<TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <react_native_1.Text variant="caption" style={styles.editText}>
              Edit
            </react_native_1.Text>
          </TouchableOpacity>)}
      </react_native_1.View>
      <react_native_1.View style={styles.stats}>
        <react_native_1.View style={styles.statItem}>
          <react_native_1.Text variant="h6" style={styles.statNumber}>
            15
          </react_native_1.Text>
          <react_native_1.Text variant="caption" style={styles.statLabel}>
            Orders
          </react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.statItem}>
          <react_native_1.Text variant="h6" style={styles.statNumber}>
            4.5
          </react_native_1.Text>
          <react_native_1.Text variant="caption" style={styles.statLabel}>
            Rating
          </react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.statItem}>
          <react_native_1.Text variant="h6" style={styles.statNumber}>
            3
          </react_native_1.Text>
          <react_native_1.Text variant="caption" style={styles.statLabel}>
            Products
          </react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: __assign({ backgroundColor: constants_1.colors.background.primary, borderRadius: constants_1.spacing.radius.md, padding: constants_1.spacing.component.padding.md, margin: constants_1.spacing.component.margin.sm }, constants_1.spacing.shadow.sm),
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    avatar: {
        width: 80,
        height: 80,
        marginRight: constants_1.spacing.component.margin.md,
    },
    userInfo: {
        flex: 1,
    },
    name: {
        marginBottom: constants_1.spacing.component.margin.xs,
    },
    email: {
        color: constants_1.colors.text.muted,
        marginBottom: constants_1.spacing.component.margin.xs,
    },
    role: {
        color: constants_1.colors.primary[500],
    },
    editButton: {
        padding: constants_1.spacing.component.padding.xs,
    },
    editText: {
        color: constants_1.colors.primary[500],
        fontWeight: '600',
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderColor: constants_1.colors.neutral[200],
        paddingTop: constants_1.spacing.component.padding.md,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        color: constants_1.colors.primary[500],
        fontWeight: 'bold',
        marginBottom: constants_1.spacing.component.margin.xs,
    },
    statLabel: {
        color: constants_1.colors.text.muted,
    },
});
exports.default = ProfileCard;
