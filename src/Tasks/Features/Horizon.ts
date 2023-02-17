import { inputCommand } from '../../Utils/Exec';
export default async () => {
	await inputCommand(`composer require laravel/horizon && php artisan horizon:install`);
};
export const option = {
	name: 'Horizon',
	value: 'horizon'
};
