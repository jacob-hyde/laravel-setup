module.exports = {
	_options: new Map(),
	getOption: function(name: string) {
		if (!this._options.has(name)) {
			return null;
		}
		return this._options.get(name);
	},
	setOptions: function(options: Object) {
		for (let key in options) {
			this._options.set(key, options[key]);
		}
	},
	setOption: function(name: string, value: any) {
		this._options.set(name, value);
	}
};
