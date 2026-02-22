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
var Image_1 = require("./Image");
var Text_1 = require("./Text");
var Badge_1 = require("./Badge");
var ProductCard = function (_a) {
    var product = _a.product, onPress = _a.onPress;
    var getBadgeVariant = function () {
        if (product.stock === 0)
            return 'error';
        if (product.stock <= 5)
            return 'warning';
        return 'success';
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.imageContainer}>
        <Image_1.Image source={{ uri: product.image }} variant="rounded" size="lg" style={styles.image}/>
        {product.stock > 0 && (<Badge_1.Badge variant={getBadgeVariant()}>
            {product.stock} left
          </Badge_1.Badge>)}
      </react_native_1.View>
      <react_native_1.View style={styles.content}>
        <Text_1.Text variant="body" numberOfLines={2}>
          {product.name}
        </Text_1.Text>
        <Text_1.Text variant="caption" style={styles.category}>
          {product.category}
        </Text_1.Text>
        <react_native_1.View style={styles.priceContainer}>
          <Text_1.Text variant="h5" style={styles.price}>
            ${product.price.toFixed(2)}
          </Text_1.Text>
          {product.rating && (<Text_1.Text variant="caption" style={styles.rating}>
              {product.rating}/5
            </Text_1.Text>)}
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: __assign({ backgroundColor: constants_1.colors.background.primary, borderRadius: constants_1.spacing.radius.md, padding: constants_1.spacing.component.padding.md, margin: constants_1.spacing.component.margin.sm }, constants_1.spacing.shadow.sm),
    imageContainer: {
        position: 'relative',
        marginBottom: constants_1.spacing.component.margin.md,
    },
    image: {
        width: '100%',
        height: 180,
        borderRadius: constants_1.spacing.radius.md,
    },
    content: {
        flex: 1,
    },
    category: {
        color: constants_1.colors.text.muted,
        marginBottom: constants_1.spacing.component.margin.xs,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: constants_1.spacing.component.margin.xs,
    },
    price: {
        color: constants_1.colors.primary[500],
        fontWeight: 'bold',
    },
    rating: {
        color: constants_1.colors.text.muted,
    },
});
exports.default = ProductCard;
