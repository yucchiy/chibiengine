import { vec2 } from 'gl-matrix';

export class Input {
    private element : Element;
    public isDragging : boolean;
    public mousePosition : Float32Array;
    public mousePreviousPosition : Float32Array;
    public mouseDeltaPosition : Float32Array;

    constructor(element : Element) {
        this.element = element;
        this.isDragging = false;

        this.mousePosition = vec2.create();
        this.mousePreviousPosition = vec2.create();
        this.mouseDeltaPosition = vec2.create();

        this.element.addEventListener('mousemove', this.onMouseMove, true);
        this.element.addEventListener('mousedown', this.onMouseDown, true);
        this.element.addEventListener('mouseup', this.onMouseUp, true);
    }

    private onMouseMove(event : MouseEvent) {
        vec2.copy(this.mousePreviousPosition, this.mousePosition)
        vec2.set(this.mousePosition, event.offsetX, event.offsetY);
        vec2.substruct(this.mouseDeltaPosition, this.mousePosition, this.mousePreviousPosition);
    }

    private onMouseDown(event : MouseEvent) {
        this.isDragging = true;
    }

    private onMouseUp(event : MouseEvent) {
        this.isDragging = false;
    }
}