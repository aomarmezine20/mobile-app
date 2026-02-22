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
var Button_1 = require("../atoms/Button");
var Image_1 = require("../atoms/Image");
var OrderCard = function (_a) {
    var order = _a.order, onPress = _a.onPress;
    var getStatusColor = function () {
        var statusColors = {
            pending: constants_1.colors.warning[500],
            processing: constants_1.colors.primary[500],
            shipped: constants_1.colors.accent[500],
            delivered: constants_1.colors.success[500],
            cancelled: constants_1.colors.error[500],
        };
        return statusColors[order.status];
    };
    var getStatusText = function () {
        var statusText = {
            pending: 'Pending',
            processing: 'Processing',
            shipped: 'Shipped',
            delivered: 'Delivered',
            cancelled: 'Cancelled',
        };
        return statusText[order.status];
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.header}>
        <react_native_1.Text variant="overline">Order #{order.id}</react_native_1.Text>
        <react_native_1.Text variant="caption" style={styles.date}>
          {order.date}
        </react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.items}>
        {order.items.map(function (item, index) { return (<react_native_1.View key={item.id} style={styles.item}>
            <Image_1.Image source={{ uri: item.image }} variant="rounded" size="xs" style={styles.itemImage}/>
            <react_native_1.View style={styles.itemContent}>
              <react_native_1.Text variant="body" numberOfLines={1}>
                {item.name}
              </react_native_1.Text>
              <react_native_1.Text variant="caption" style={styles.itemPrice}>
                ${item.price.toFixed(2)} x {item.quantity}
              </react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>); })}
      </react_native_1.View>
      <react_native_1.View style={styles.footer}>
        <react_native_1.Text variant="body" style={styles.total}>
          Total: ${order.total.toFixed(2)}
        </react_native_1.Text>
        <Button_1.Button variant="outline" size="sm" onPress={onPress} style={styles.button}>
          View Details
        </Button_1.Button>
      </react_native_1.View>
      <react_native_1.View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
        <react_native_1.Text variant="caption" style={styles.statusText}>
          {getStatusText()}
        </react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: __assign(__assign({ backgroundColor: constants_1.colors.background.primary, borderRadius: constants_1.spacing.radius.md, padding: constants_1.spacing.component.padding.md, margin: constants_1.spacing.component.margin.sm }, constants_1.spacing.shadow.sm), { position: 'relative' }),
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    date: {
        color: constants_1.colors.text.muted,
    },
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
    itemPrice: {
        color: constants_1.colors.text.muted,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: constants_1.spacing.component.margin.md,
    },
    total: {
        fontWeight: 'bold',
    },
    button: {
        paddingHorizontal: constants_1.spacing.component.padding.xs,
    },
    statusBadge: {
        position: 'absolute',
        top: constants_1.spacing.component.padding.sm,
        right: constants_1.spacing.component.padding.sm,
        paddingHorizontal: constants_1.spacing.component.padding.xs,
        paddingVertical: constants_1.spacing.component.padding.xs / 2,
        borderRadius: constants_1.spacing.radius.sm,
    },
    statusText: {
        color: constants_1.colors.text.inverted,
        fontWeight: '600',
    },
});
exports.default = OrderCard;
