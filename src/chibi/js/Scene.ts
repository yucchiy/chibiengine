export abstract class Scene {
    abstract initialize(gl : WebGLRenderingContext) : void;
    abstract update(gl : WebGLRenderingContext, deltaTime : number) : void;
}
