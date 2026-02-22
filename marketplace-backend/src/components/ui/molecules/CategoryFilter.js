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
var Badge_1 = require("../atoms/Badge");
var CategoryFilter = function (_a) {
    var categories = _a.categories, selectedCategory = _a.selectedCategory, onCategorySelect = _a.onCategorySelect;
    return (<react_native_1.View style={styles.container}>
      {categories.map(function (category) { return (<react_native_1.TouchableOpacity key={category} style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedButton,
            ]} onPress={function () { return onCategorySelect(category); }}>
          <react_native_1.Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedText,
            ]}>
            {category}
          </react_native_1.Text>
          {selectedCategory === category && (<Badge_1.Badge variant="primary">
              {category.charAt(0).toUpperCase()}
            </Badge_1.Badge>)}
        </react_native_1.TouchableOpacity>); })}
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: constants_1.spacing.component.margin.sm,
        marginBottom: constants_1.spacing.component.margin.md,
    },
    categoryButton: {
        backgroundColor: constants_1.colors.background.secondary,
        paddingHorizontal: constants_1.spacing.component.padding.sm,
        paddingVertical: constants_1.spacing.component.padding.xs,
        borderRadius: constants_1.spacing.radius.sm,
        marginRight: constants_1.spacing.component.margin.xs,
        marginBottom: constants_1.spacing.component.margin.xs,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: constants_1.colors.primary[50],
        borderWidth: 1,
        borderColor: constants_1.colors.primary[500],
    },
    categoryText: __assign(__assign({}, constants_1.typography.text.caption), { color: constants_1.colors.text.primary }),
    selectedText: {
        color: constants_1.colors.primary[500],
        fontWeight: '600',
    },
});
exports.default = CategoryFilter;
