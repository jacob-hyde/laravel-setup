"use strict";
module.exports = {
    _options: new Map(),
    getOption: function (name) {
        if (!this._options.has(name)) {
            return null;
        }
        return this._options.get(name);
    },
    setOptions: function (options) {
        for (let key in options) {
            this._options.set(key, options[key]);
        }
    },
    setOption: function (name, value) {
        this._options.set(name, value);
    }
};
//# sourceMappingURL=Options.js.map