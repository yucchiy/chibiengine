import Renderer from './Renderer.js';

export default class Game {
    constructor(parameter) {
        this.renderer = new Renderer();
        this.renderer.setSize(600, 600);
    }

    get domElement() {
        return this.renderer.domElement;
    }

    run(initializer, updater) {
        initializer(this.renderer.context);
        this.renderer.render(updater);
    }
};
