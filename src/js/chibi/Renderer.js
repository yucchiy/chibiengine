export default class Renderer {
    constructor(parameter) {
        parameter = parameter || {};

        var canvas =  parameter.canvas !== undefined ? parameter.canvas : document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
        canvas.width = 0; 
        canvas.height = 0;

        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        this.canvas = canvas;
        this.gl = gl;
    }

    get domElement() {
        return this.canvas;
    }

    get context() {
        return this.gl;
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    render(sceneUpdater, deltaTime) {
        var gl = this.gl;

        gl.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        sceneUpdater(gl, deltaTime);

        gl.flush();
    }
}
