import { mat4, vec3 } from 'gl-matrix';

export class Camera {
    public position: Float32Array;
    public center: Float32Array;
    public fov : number;
    public aspect : number;
    public near : number;
    public far : number;

    constructor(position : Float32Array, center : Float32Array, fov : number, aspect : number, near : number, far : number) {
        this.position = position;
        this.center = center;
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }

    get viewMatrix() : Float32Array {
        return mat4.lookAt(mat4.create(), this.position, this.center, [0, 1, 0]);
    }

    get projectionMatrix() : Float32Array {
        return mat4.perspective(mat4.create(), this.fov, this.aspect, this.near, this.far);
    }
}