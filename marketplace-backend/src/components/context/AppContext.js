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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApp = exports.AppProvider = void 0;
var react_1 = require("react");
var initialState = {
    auth: {
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
    },
    cart: {
        items: [],
        total: 0,
    },
};
var appReducer = function (state, action) {
    switch (action.type) {
        case 'LOGIN_START':
            return __assign(__assign({}, state), { auth: __assign(__assign({}, state.auth), { isLoading: true }) });
        case 'LOGIN_SUCCESS':
            return __assign(__assign({}, state), { auth: __assign(__assign({}, state.auth), { user: action.payload.user, token: action.payload.token, isLoading: false, isAuthenticated: true }) });
        case 'LOGIN_FAILURE':
            return __assign(__assign({}, state), { auth: __assign(__assign({}, state.auth), { isLoading: false }) });
        case 'LOGOUT':
            return __assign(__assign({}, state), { auth: { user: null, token: null, isLoading: false, isAuthenticated: false }, cart: { items: [], total: 0 } });
        case 'SET_USER':
            return __assign(__assign({}, state), { auth: __assign(__assign({}, state.auth), { user: action.payload }) });
        case 'SET_LOADING':
            return __assign(__assign({}, state), { auth: __assign(__assign({}, state.auth), { isLoading: action.payload }) });
        case 'ADD_TO_CART':
            var existingItem = state.cart.items.find(function (item) { return item.id === action.payload.id; });
            var newItems = void 0;
            if (existingItem) {
                newItems = state.cart.items.map(function (item) {
                    return item.id === action.payload.id
                        ? __assign(__assign({}, item), { quantity: item.quantity + action.payload.quantity }) : item;
                });
            }
            else {
                newItems = __spreadArray(__spreadArray([], state.cart.items, true), [action.payload], false);
            }
            var newTotal = newItems.reduce(function (total, item) { return total + item.price * item.quantity; }, 0);
            return __assign(__assign({}, state), { cart: { items: newItems, total: newTotal } });
        case 'REMOVE_FROM_CART':
            var filteredItems = state.cart.items.filter(function (item) { return item.id !== action.payload; });
            var filteredTotal = filteredItems.reduce(function (total, item) { return total + item.price * item.quantity; }, 0);
            return __assign(__assign({}, state), { cart: { items: filteredItems, total: filteredTotal } });
        case 'UPDATE_CART_ITEM':
            var updatedItems = state.cart.items.map(function (item) {
                return item.id === action.payload.id
                    ? __assign(__assign({}, item), { quantity: action.payload.quantity }) : item;
            });
            var updatedTotal = updatedItems.reduce(function (total, item) { return total + item.price * item.quantity; }, 0);
            return __assign(__assign({}, state), { cart: { items: updatedItems, total: updatedTotal } });
        case 'CLEAR_CART':
            return __assign(__assign({}, state), { cart: { items: [], total: 0 } });
        case 'SET_CART_ITEMS':
            var cartTotal = action.payload.reduce(function (total, item) { return total + item.price * item.quantity; }, 0);
            return __assign(__assign({}, state), { cart: { items: action.payload, total: cartTotal } });
        default:
            return state;
    }
};
var AppContext = (0, react_1.createContext)(undefined);
var AppProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useReducer)(appReducer, initialState), state = _b[0], dispatch = _b[1];
    var login = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var user, token;
        return __generator(this, function (_a) {
            dispatch({ type: 'LOGIN_START' });
            try {
                user = {
                    id: '1',
                    name: 'John Doe',
                    email: email,
                    role: 'buyer',
                    avatar: 'https://example.com/avatar.jpg',
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                token = 'mock-jwt-token';
                dispatch({ type: 'LOGIN_SUCCESS', payload: { user: user, token: token } });
            }
            catch (error) {
                dispatch({ type: 'LOGIN_FAILURE' });
                throw error;
            }
            return [2 /*return*/];
        });
    }); };
    var logout = function () {
        dispatch({ type: 'LOGOUT' });
    };
    var addToCart = function (item) {
        dispatch({ type: 'ADD_TO_CART', payload: item });
    };
    var removeFromCart = function (id) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };
    var updateCartItem = function (id, quantity) {
        dispatch({ type: 'UPDATE_CART_ITEM', payload: { id: id, quantity: quantity } });
    };
    var clearCart = function () {
        dispatch({ type: 'CLEAR_CART' });
    };
    var setUser = function (user) {
        dispatch({ type: 'SET_USER', payload: user });
    };
    var value = {
        state: state,
        dispatch: dispatch,
        login: login,
        logout: logout,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        updateCartItem: updateCartItem,
        clearCart: clearCart,
        setUser: setUser,
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
exports.AppProvider = AppProvider;
var useApp = function () {
    var context = (0, react_1.useContext)(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
exports.useApp = useApp;
