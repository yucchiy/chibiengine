import * as Stats from 'stats.js';

export default class Profiler {
    constructor() {
        this._stats = new Stats();
        this._stats.showPanel(0);
        document.body.appendChild(this._stats.dom);
    }

    begin() {
        this._stats.begin();
    }

    end() {
        this._stats.end();
    }
};
