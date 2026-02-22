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
var Badge = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'primary' : _b, children = _a.children;
    var getBadgeStyle = function () {
        var baseStyle = {
            paddingHorizontal: constants_1.spacing.component.padding.xs,
            paddingVertical: constants_1.spacing.component.padding.xs / 2,
            borderRadius: constants_1.spacing.radius.sm,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        };
        var variantStyle = {
            primary: {
                backgroundColor: constants_1.colors.primary[500],
            },
            secondary: {
                backgroundColor: constants_1.colors.secondary[500],
            },
            success: {
                backgroundColor: constants_1.colors.success[500],
            },
            error: {
                backgroundColor: constants_1.colors.error[500],
            },
            warning: {
                backgroundColor: constants_1.colors.warning[500],
            },
        };
        return __assign(__assign({}, baseStyle), variantStyle[variant]);
    };
    var getTextStyle = function () {
        return __assign(__assign({}, constants_1.typography.text.caption), { color: constants_1.colors.text.inverted, fontWeight: '600' });
    };
    return (<react_native_1.View style={getBadgeStyle()}>
      <react_native_1.Text style={getTextStyle()}>
        {children}
      </react_native_1.Text>
    </react_native_1.View>);
};
exports.default = Badge;
