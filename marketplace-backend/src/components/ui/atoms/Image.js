"use strict";
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
var Image = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'default' : _b, _c = _a.size, size = _c === void 0 ? 'md' : _c, style = _a.style, props = __rest(_a, ["variant", "size", "style"]);
    var getSize = function () {
        var sizeMap = {
            sm: 40,
            md: 60,
            lg: 80,
        };
        return sizeMap[size];
    };
    var getBorderRadius = function () {
        var borderRadiusMap = {
            default: constants_1.spacing.radius.sm,
            rounded: constants_1.spacing.radius.md,
            circle: constants_1.spacing.radius.circle,
        };
        return borderRadiusMap[variant];
    };
    var getImageStyle = function () {
        return [
            {
                width: getSize(),
                height: getSize(),
                borderRadius: getBorderRadius(),
            },
            style,
        ];
    };
    return (<react_native_1.View style={{
            borderRadius: getBorderRadius(),
            overflow: 'hidden',
        }}>
      <Image style={getImageStyle()} resizeMode="cover" {...props}/>
    </react_native_1.View>);
};
exports.default = Image;
