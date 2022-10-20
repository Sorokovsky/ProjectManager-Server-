"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jwt = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function generateToken(payload) {
    return jwt.sign(Object.assign({}, payload), process.env.SECRET_KEY, { expiresIn: '24h' });
}
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map