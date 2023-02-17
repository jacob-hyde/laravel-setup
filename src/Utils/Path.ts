const fs = require('fs');

export const createPathIfNotExists = (path: string): void => {
	if (path.includes('.')) {
		path = path.substring(0, path.lastIndexOf('/'));
	}

	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, { recursive: true });
	}
};
