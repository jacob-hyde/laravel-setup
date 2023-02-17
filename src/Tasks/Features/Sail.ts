import { inputCommand } from '../../Utils/Exec';
const options = require('../../Options');
export default async () => {
	options.setOption('sail', true);
	await inputCommand('composer require laravel/sail --dev && php artisan sail:install');
};
export const option = {
	name: 'Sail',
	value: 'sail'
};
