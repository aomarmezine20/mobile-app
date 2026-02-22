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
var Input = function (_a) {
    var label = _a.label, error = _a.error, _b = _a.variant, variant = _b === void 0 ? 'default' : _b, style = _a.style, props = __rest(_a, ["label", "error", "variant", "style"]);
    var getContainerStyle = function () {
        var baseStyle = {
            marginBottom: constants_1.spacing.component.margin.md,
        };
        var variantStyle = {
            default: {},
            outlined: {
                backgroundColor: constants_1.colors.background.secondary,
                borderRadius: constants_1.spacing.radius.md,
                padding: constants_1.spacing.component.padding.sm,
                borderWidth: 1,
                borderColor: error ? constants_1.colors.error[500] : constants_1.colors.neutral[300],
            },
        };
        return __assign(__assign({}, baseStyle), variantStyle[variant]);
    };
    var getLabelStyle = function () {
        return __assign(__assign({}, constants_1.typography.text.body2), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.xs });
    };
    var getInputStyle = function () {
        var baseStyle = __assign(__assign({}, constants_1.typography.text.body), { color: constants_1.colors.text.primary, padding: 0, height: 40 });
        var variantStyle = {
            default: {},
            outlined: {
                backgroundColor: 'transparent',
                padding: 0,
            },
        };
        return __assign(__assign(__assign({}, baseStyle), variantStyle[variant]), style);
    };
    var getErrorStyle = function () {
        return __assign(__assign({}, constants_1.typography.text.caption), { color: constants_1.colors.error[500], marginTop: constants_1.spacing.component.margin.xs });
    };
    return (<react_native_2.View style={getContainerStyle()}>
      {label && (<react_native_2.Text style={getLabelStyle()}>
          {label}
        </react_native_2.Text>)}
      <react_native_1.TextInput style={getInputStyle()} placeholderTextColor={constants_1.colors.text.muted} {...props}/>
      {error && (<react_native_2.Text style={getErrorStyle()}>
          {error}
        </react_native_2.Text>)}
    </react_native_2.View>);
};
exports.default = Input;
