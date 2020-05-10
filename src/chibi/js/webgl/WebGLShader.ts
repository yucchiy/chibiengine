export class ChibiWebGLShader {
    private gl : WebGLRenderingContext;
    private id : number;
    private shader : WebGLShader;
    private type : GLenum;

    constructor(gl : WebGLRenderingContext, id : number, type : GLenum, source : string) {
        var shader = gl.createShader(type);

        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
        }

        this.gl = gl;
        this.id = id;
        this.type = type;
        this.shader = shader;
    }

    getShader() : WebGLShader {
        return this.shader;
    }
}