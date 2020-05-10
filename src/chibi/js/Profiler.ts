import * as Stats from 'stats.js';

export class Profiler {
    private stats : any;

    constructor() {
        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);
    }

    begin() {
        this.stats.begin();
    }

    end() {
        this.stats.end();
    }
};
