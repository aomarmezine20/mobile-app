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
var constants_1 = require("../../constants");
var Text = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? 'body' : _b, _c = _a.color, color = _c === void 0 ? 'primary' : _c, children = _a.children;
    var getTextStyle = function () {
        var baseStyle = {
            color: constants_1.colors.text[color],
        };
        var variantStyle = {
            h1: constants_1.typography.text.h1,
            h2: constants_1.typography.text.h2,
            h3: constants_1.typography.text.h3,
            h4: constants_1.typography.text.h4,
            h5: constants_1.typography.text.h5,
            h6: constants_1.typography.text.h6,
            body: constants_1.typography.text.body,
            body2: constants_1.typography.text.body2,
            caption: constants_1.typography.text.caption,
            overline: constants_1.typography.text.overline,
        };
        return __assign(__assign({}, baseStyle), variantStyle[variant]);
    };
    return (<Text style={getTextStyle()}>
      {children}
    </Text>);
};
exports.default = Text;
