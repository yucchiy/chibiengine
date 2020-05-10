export class Renderer {
    private canvas : HTMLCanvasElement;
    private gl : WebGLRenderingContext;

    constructor() {
        var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas') as HTMLCanvasElement;
        canvas.width = 0; 
        canvas.height = 0;

        this.canvas = canvas;

        var gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;

        this.canvas = canvas;
        this.gl = gl;

        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.CULL_FACE);
    }

    get domElement() {
        return this.canvas;
    }

    get context() {
        return this.gl;
    }

    setSize(width : number, height : number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    render(scene : any, deltaTime : number) {
        var gl = this.gl;

        gl.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        scene.update(gl, deltaTime);

        gl.flush();
    }
}
