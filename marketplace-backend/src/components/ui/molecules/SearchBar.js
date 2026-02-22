"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var constants_1 = require("../../constants");
var vector_icons_1 = require("@expo/vector-icons");
var SearchBar = function (_a) {
    var _b = _a.placeholder, placeholder = _b === void 0 ? 'Search products...' : _b, value = _a.value, onChangeText = _a.onChangeText, onSearch = _a.onSearch, onClear = _a.onClear;
    var handleClear = function () {
        onChangeText('');
        if (onClear)
            onClear();
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.searchContainer}>
        <vector_icons_1.Ionicons name="search" size={20} color={constants_1.colors.text.muted} style={styles.icon}/>
        <react_native_1.TextInput style={styles.input} placeholder={placeholder} placeholderTextColor={constants_1.colors.text.muted} value={value} onChangeText={onChangeText} autoCapitalize="none" autoCorrect={false} clearButtonMode="never"/>
        {value.length > 0 && (<react_native_1.TouchableOpacity onPress={handleClear}>
            <vector_icons_1.Ionicons name="close-circle" size={20} color={constants_1.colors.text.muted}/>
          </react_native_1.TouchableOpacity>)}
      </react_native_1.View>
      {onSearch && (<react_native_1.TouchableOpacity onPress={onSearch} style={styles.searchButton}>
          <vector_icons_1.Ionicons name="search" size={20} color={constants_1.colors.primary[500]}/>
        </react_native_1.TouchableOpacity>)}
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: constants_1.colors.background.secondary,
        borderRadius: constants_1.spacing.radius.md,
        padding: constants_1.spacing.component.padding.sm,
        marginHorizontal: constants_1.spacing.component.margin.sm,
        marginVertical: constants_1.spacing.component.margin.sm,
        alignItems: 'center',
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: constants_1.colors.background.primary,
        borderRadius: constants_1.spacing.radius.md,
        paddingHorizontal: constants_1.spacing.component.padding.sm,
    },
    icon: {
        marginRight: constants_1.spacing.component.margin.xs,
    },
    input: {
        flex: 1,
        height: 40,
        color: constants_1.colors.text.primary,
    },
    searchButton: {
        marginLeft: constants_1.spacing.component.margin.sm,
        padding: constants_1.spacing.component.padding.xs,
    },
});
exports.default = SearchBar;
