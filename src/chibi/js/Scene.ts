import {Game} from "./Game";

export abstract class Scene {
    game : Game;
    abstract initialize(gl : WebGLRenderingContext) : void;
    abstract update(gl : WebGLRenderingContext, deltaTime : number) : void;
}
