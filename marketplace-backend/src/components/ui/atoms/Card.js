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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var constants_1 = require("../../constants");
var Card = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'default' : _b, children = _a.children, onPress = _a.onPress, props = __rest(_a, ["variant", "children", "onPress"]);
    var getCardStyle = function () {
        var baseStyle = __assign({ backgroundColor: constants_1.colors.background.primary, borderRadius: constants_1.spacing.radius.md, padding: constants_1.spacing.component.padding.md, margin: constants_1.spacing.component.margin.sm }, props.style);
        var variantStyle = {
            default: {},
            elevated: __assign({}, constants_1.spacing.shadow.md),
            outlined: {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: constants_1.colors.neutral[200],
            },
        };
        return __assign(__assign({}, baseStyle), variantStyle[variant]);
    };
    if (onPress) {
        return (<react_native_1.View style={getCardStyle()}>
        <TouchableOpacity onPress={onPress}>
          {children}
        </TouchableOpacity>
      </react_native_1.View>);
    }
    return <react_native_1.View style={getCardStyle()}>{children}</react_native_1.View>;
};
exports.default = Card;
