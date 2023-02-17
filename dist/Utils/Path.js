"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPathIfNotExists = void 0;
const fs = require('fs');
const createPathIfNotExists = (path) => {
    if (path.includes('.')) {
        path = path.substring(0, path.lastIndexOf('/'));
    }
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
};
exports.createPathIfNotExists = createPathIfNotExists;
//# sourceMappingURL=Path.js.map