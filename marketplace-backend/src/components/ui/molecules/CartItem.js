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
var CartItem = function (_a) {
    var item = _a.item, onQuantityChange = _a.onQuantityChange, onRemove = _a.onRemove;
    var handleIncrement = function () {
        onQuantityChange(item.id, item.quantity + 1);
    };
    var handleDecrement = function () {
        if (item.quantity > 1) {
            onQuantityChange(item.id, item.quantity - 1);
        }
    };
    var handleRemove = function () {
        onRemove(item.id);
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.imageContainer}>
        <Image_1.Image source={{ uri: item.image }} variant="rounded" size="sm" style={styles.image}/>
      </react_native_1.View>
      <react_native_1.View style={styles.content}>
        <react_native_1.Text variant="body" numberOfLines={2}>
          {item.name}
        </react_native_1.Text>
        <react_native_1.Text variant="caption" style={styles.price}>
          ${item.price.toFixed(2)} each
        </react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.quantityContainer}>
        <Button_1.Button variant="outline" size="sm" onPress={handleDecrement} style={styles.quantityButton}>
          -
        </Button_1.Button>
        <react_native_1.Text variant="body" style={styles.quantity}>
          {item.quantity}
        </react_native_1.Text>
        <Button_1.Button variant="outline" size="sm" onPress={handleIncrement} style={styles.quantityButton}>
          +
        </Button_1.Button>
      </react_native_1.View>
      <Button_1.Button variant="ghost" size="sm" onPress={handleRemove} style={styles.removeButton}>
        Remove
      </Button_1.Button>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: __assign({ flexDirection: 'row', alignItems: 'center', backgroundColor: constants_1.colors.background.primary, borderRadius: constants_1.spacing.radius.md, padding: constants_1.spacing.component.padding.md, margin: constants_1.spacing.component.margin.sm }, constants_1.spacing.shadow.sm),
    imageContainer: {
        marginRight: constants_1.spacing.component.margin.md,
    },
    image: {
        width: 60,
        height: 60,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    price: {
        color: constants_1.colors.text.muted,
        marginTop: constants_1.spacing.component.margin.xs,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: constants_1.spacing.component.margin.md,
    },
    quantityButton: {
        width: 24,
        height: 24,
        padding: 0,
        marginHorizontal: constants_1.spacing.component.margin.xs,
    },
    quantity: {
        marginHorizontal: constants_1.spacing.component.margin.sm,
    },
    removeButton: {
        paddingHorizontal: constants_1.spacing.component.padding.xs,
    },
});
exports.default = CartItem;
