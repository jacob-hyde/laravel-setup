"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.option = void 0;
const Exec_1 = require("../../Utils/Exec");
const fs = require('fs');
const options = require('../../Options');
const envAdditions = `
STRIPE_KEY=your-stripe-key
STRIPE_SECRET=your-stripe-secret
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
`;
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Exec_1.inputCommand)(`composer require laravel/cashier && php artisan vendor:publish --tag="cashier-migrations"`);
    fs.appendFileSync(`${options.getOption('name')}/.env`, envAdditions);
});
exports.option = {
    name: 'Cashier',
    value: 'cashier'
};
//# sourceMappingURL=Cashier.js.map