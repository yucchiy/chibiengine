import { Renderer } from './Renderer';
import { Profiler } from './Profiler';
import { Scene } from './Scene';

export class Game {
    renderer : Renderer;
    profiler : any;

    constructor() {
        this.renderer = new Renderer();
        this.renderer.setSize(600, 600);

        this.profiler = new Profiler();
    }

    get domElement() {
        return this.renderer.domElement;
    }

    run(scene: Scene) {
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
