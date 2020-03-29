import Renderer from './Renderer.js';
import Profiler from './Profiler.js';

export default class Game {
    constructor(parameter) {
        this.renderer = new Renderer();
        this.renderer.setSize(600, 600);

        this.profiler = new Profiler();
    }

    get domElement() {
        return this.renderer.domElement;
    }

    run(scene) {
        var renderer = this.renderer, profiler = this.profiler;
        var timestamp = function() {
           return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
        };

        scene.initialize(renderer.context);

        var currentTime = timestamp(), deltaTime;
        var frame = function() {
            var previousTime = currentTime;
            currentTime = timestamp();
            deltaTime = currentTime - previousTime;

            profiler.begin();
            renderer.render(scene, deltaTime);
            profiler.end();

            window.requestAnimationFrame(frame);
        };

        frame();
    }
};
