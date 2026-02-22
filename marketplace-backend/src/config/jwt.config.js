"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
var config_1 = require("@nestjs/config");
exports.jwtConfig = (0, config_1.registerAs)('jwt', function () { return ({
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
}); });
