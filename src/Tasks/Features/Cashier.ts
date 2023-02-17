import { inputCommand } from '../../Utils/Exec';
const fs = require('fs');
const options = require('../../Options');

const envAdditions = `
STRIPE_KEY=your-stripe-key
STRIPE_SECRET=your-stripe-secret
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
`;

export default async () => {
	await inputCommand(`composer require laravel/cashier && php artisan vendor:publish --tag="cashier-migrations"`);
	fs.appendFileSync(`${options.getOption('name')}/.env`, envAdditions);
};
export const option = {
	name: 'Cashier',
	value: 'cashier'
};
