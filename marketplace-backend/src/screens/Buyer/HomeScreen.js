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
var ProductCard_1 = require("../ui/molecules/ProductCard");
var SearchBar_1 = require("../ui/molecules/SearchBar");
var CategoryFilter_1 = require("../ui/molecules/CategoryFilter");
var Badge_1 = require("../ui/atoms/Badge");
var Button_1 = require("../ui/atoms/Button");
var categories = [
    { id: '1', name: 'Electronics', icon: 'phone', color: 'blue' },
    { id: '2', name: 'Clothing', icon: 'shirt', color: 'purple' },
    { id: '3', name: 'Home', icon: 'home', color: 'green' },
    { id: '4', name: 'Sports', icon: 'basketball', color: 'orange' },
    { id: '5', name: 'Books', icon: 'book', color: 'red' },
    { id: '6', name: 'Toys', icon: 'cube', color: 'pink' },
];
var products = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 79.99,
        image: 'https://example.com/headphones.jpg',
        category: 'Electronics',
        rating: 4.5,
        stock: 12,
    },
    {
        id: '2',
        name: 'Smart Watch',
        price: 199.99,
        image: 'https://example.com/watch.jpg',
        category: 'Electronics',
        rating: 4.2,
        stock: 8,
    },
    {
        id: '3',
        name: 'Running Shoes',
        price: 89.99,
        image: 'https://example.com/shoes.jpg',
        category: 'Sports',
        rating: 4.7,
        stock: 5,
    },
    {
        id: '4',
        name: 'Laptop Stand',
        price: 39.99,
        image: 'https://example.com/stand.jpg',
        category: 'Home',
        rating: 4.3,
        stock: 0,
    },
    {
        id: '5',
        name: 'Wireless Mouse',
        price: 29.99,
        image: 'https://example.com/mouse.jpg',
        category: 'Electronics',
        rating: 4.1,
        stock: 15,
    },
    {
        id: '6',
        name: 'Desk Lamp',
        price: 24.99,
        image: 'https://example.com/lamp.jpg',
        category: 'Home',
        rating: 4.6,
        stock: 3,
    },
];
var HomeScreen = function (_a) {
    var navigation = _a.navigation;
    var _b = react_1.default.useState(''), searchQuery = _b[0], setSearchQuery = _b[1];
    var _c = react_1.default.useState(null), selectedCategory = _c[0], setSelectedCategory = _c[1];
    var _d = react_1.default.useState(products), filteredProducts = _d[0], setFilteredProducts = _d[1];
    var handleSearch = function (query) {
        setSearchQuery(query);
        filterProducts(query, selectedCategory);
    };
    var handleCategorySelect = function (categoryId) {
        var newCategory = selectedCategory === categoryId ? null : categoryId;
        setSelectedCategory(newCategory);
        filterProducts(searchQuery, newCategory);
    };
    var filterProducts = function (query, category) {
        var result = products;
        if (query) {
            result = result.filter(function (product) {
                return product.name.toLowerCase().includes(query.toLowerCase());
            });
        }
        if (category) {
            result = result.filter(function (product) { var _a; return product.category === ((_a = categories.find(function (c) { return c.id === category; })) === null || _a === void 0 ? void 0 : _a.name); });
        }
        setFilteredProducts(result);
    };
    var handleProductPress = function (product) {
        navigation.navigate('ProductDetail', { product: product });
    };
    var renderHeader = function () { return (<react_native_1.View style={styles.header}>
      <react_native_1.Text style={styles.title}>Discover Products</react_native_1.Text>
      <react_native_1.View style={styles.stats}>
        <Badge_1.Badge variant="success">New</Badge_1.Badge>
        <Badge_1.Badge variant="primary">Sale</Badge_1.Badge>
      </react_native_1.View>
    </react_native_1.View>); };
    var renderSearchBar = function () { return (<SearchBar_1.SearchBar placeholder="Search products..." value={searchQuery} onChangeText={handleSearch}/>); };
    var renderCategories = function () { return (<CategoryFilter_1.CategoryFilter categories={categories} selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect}/>); };
    var renderProducts = function () { return (<react_native_1.FlatList data={filteredProducts} keyExtractor={function (item) { return item.id; }} numColumns={2} renderItem={function (_a) {
            var item = _a.item;
            return (<ProductCard_1.ProductCard product={item} onPress={function () { return handleProductPress(item); }}/>);
        }} contentContainerStyle={styles.productsContainer} showsVerticalScrollIndicator={false}/>); };
    var renderEmptyState = function () { return (<react_native_1.View style={styles.emptyState}>
      <react_native_1.Text style={styles.emptyTitle}>No products found</react_native_1.Text>
      <react_native_1.Text style={styles.emptySubtitle}>
        Try adjusting your search or filter criteria
      </react_native_1.Text>
      <Button_1.Button variant="outline" onPress={function () {
            setSearchQuery('');
            setSelectedCategory(null);
            setFilteredProducts(products);
        }} style={styles.resetButton}>
        Reset Filters
      </Button_1.Button>
    </react_native_1.View>); };
    return (<react_native_1.View style={styles.container}>
      {renderHeader()}
      {renderSearchBar()}
      {renderCategories()}
      {filteredProducts.length > 0 ? renderProducts() : renderEmptyState()}
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants_1.colors.background.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: constants_1.spacing.component.padding.md,
        paddingTop: constants_1.spacing.component.padding.md,
        paddingBottom: constants_1.spacing.component.padding.sm,
    },
    title: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary }),
    stats: {
        flexDirection: 'row',
        gap: constants_1.spacing.component.margin.xs,
    },
    productsContainer: {
        paddingHorizontal: constants_1.spacing.component.padding.sm,
        paddingTop: constants_1.spacing.component.padding.sm,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: constants_1.spacing.component.padding.md,
    },
    emptyTitle: __assign(__assign({}, constants_1.typography.h5), { color: constants_1.colors.text.primary, marginBottom: constants_1.spacing.component.margin.sm }),
    emptySubtitle: __assign(__assign({}, constants_1.typography.body), { color: constants_1.colors.text.muted, textAlign: 'center', marginBottom: constants_1.spacing.component.margin.md }),
    resetButton: {
        marginTop: constants_1.spacing.component.margin.md,
    },
});
exports.default = HomeScreen;
