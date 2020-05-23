import { Input } from "./Input";
import { Camera } from "./Camera";
import { vec3 } from 'gl-matrix';

export class SphericalCameraWork {
    center : Float32Array;
    private camera : Camera;
    private input : Input;
    private minDistance : number;
    private maxDistance : number;
    private distanceRatio : number;
    private verticalRatio : number;
    private horizontalRatio : number;

    constructor(camera : Camera, input : Input, minDistance : number, maxDistance : number) {
        this.camera = camera;
        this.input = input;
        this.center = vec3.create();

        this.minDistance = minDistance;
        this.maxDistance = maxDistance;

        this.distanceRatio = 0.5;
        this.verticalRatio = 0.5;
        this.horizontalRatio = 0.5;
    }

    update(deltaTime : number) {
        if (!this.input.isDragging) return;

        var horizontalRatio = this.horizontalRatio + 0.1 * deltaTime / 1000 * this.input.mouseDeltaPosition[0];
        if (horizontalRatio > 1) horizontalRatio -= 1;
        else if (horizontalRatio < 0) horizontalRatio += 1;
        this.horizontalRatio = Math.min(Math.max(horizontalRatio, 0.0001), 0.9999);

        var verticalRatio = this.verticalRatio + 0.1 * deltaTime / 1000 * this.input.mouseDeltaPosition[1];
        // if (verticalRatio > 1) verticalRatio -= 1;
        // else if (verticalRatio < 0) verticalRatio += 1;
        this.verticalRatio = Math.min(Math.max(verticalRatio, 0.0001), 0.9999);

        var phi = this.horizontalRatio * 2 * Math.PI;
        var theta = this.verticalRatio * Math.PI;

        var distance = (this.maxDistance - this.minDistance) * this.distanceRatio + this.minDistance;

        var position = vec3.fromValues(
            distance * Math.sin(theta) * Math.cos(phi),
            distance * Math.cos(theta),
            distance * Math.sin(theta) * Math.sin(phi)
        );

        vec3.add(this.camera.position, position, this.center);
        vec3.copy(this.camera.center, this.center);
    }
}