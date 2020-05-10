import { ChibiWebGLShader } from "./WebGLShader";

export class ChibiWebGLProgram {
    private gl : WebGLRenderingContext;
    private id : number;
    private program : WebGLProgram;

    constructor(gl : WebGLRenderingContext, id : number, vertexShader : ChibiWebGLShader, fragmentShader : ChibiWebGLShader) {
        var program = gl.createProgram();

        gl.attachShader(program, vertexShader.getShader());
        gl.attachShader(program, fragmentShader.getShader());
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert(gl.getProgramInfoLog(program));
        }

        this.gl = gl;
        this.id = id;
        this.program = program;
    }

    getAttributeLocation(name : string) : number{
        return this.gl.getAttribLocation(this.program, name);
    }

    getUniformLocation(name : string) : WebGLUniformLocation | null {
        return this.gl.getUniformLocation(this.program, name);
    }

    useProgram() {
        this.gl.useProgram(this.program);
    }
}
