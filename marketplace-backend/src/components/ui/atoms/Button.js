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
var react_native_2 = require("react-native");
var constants_1 = require("../../constants");
var Button = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, children = _a.children, _d = _a.loading, loading = _d === void 0 ? false : _d, props = __rest(_a, ["variant", "size", "children", "loading"]);
    var getButtonStyle = function () {
        var baseStyle = {
            paddingHorizontal: constants_1.spacing.component.padding[size],
            paddingVertical: constants_1.spacing.component.padding[size] / 2,
            borderRadius: constants_1.spacing.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            minWidth: size === 'lg' ? 150 : 100,
        };
        var variantStyle = {
            primary: {
                backgroundColor: constants_1.colors.primary[500],
                borderColor: constants_1.colors.primary[500],
            },
            secondary: {
                backgroundColor: constants_1.colors.secondary[500],
                borderColor: constants_1.colors.secondary[500],
            },
            outline: {
                backgroundColor: 'transparent',
                borderColor: constants_1.colors.primary[500],
                borderWidth: 1,
            },
            ghost: {
                backgroundColor: 'transparent',
                borderColor: 'transparent',
            },
        };
        return __assign(__assign({}, baseStyle), variantStyle[variant]);
    };
    var getTextStyle = function () {
        var baseStyle = __assign(__assign({}, constants_1.typography.text.button), { color: variant === 'outline' || variant === 'ghost'
                ? constants_1.colors.primary[500]
                : constants_1.colors.text.inverted });
        return baseStyle;
    };
    return (<react_native_1.TouchableOpacity style={getButtonStyle()} {...props} disabled={loading}>
      {loading ? (<react_native_2.View style={{
                width: 16,
                height: 16,
                borderWidth: 2,
                borderColor: '#FFFFFF',
                borderTopColor: 'transparent',
                borderRadius: 8,
                marginRight: 8,
            }}>
        </react_native_2.View>) : null}
      <react_native_2.Text style={getTextStyle()}>
        {children}
      </react_native_2.Text>
    </react_native_1.TouchableOpacity>);
};
exports.default = Button;
