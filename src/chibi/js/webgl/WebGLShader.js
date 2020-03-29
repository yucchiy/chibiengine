export default class ChibiWebGLShader {
    constructor(gl, id, type, source) {
        var shader = gl.createShader(type)

        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
        }

        this.gl = gl;
        this.id = id;
        this.type = type;
        this.source = source;
        this.shader = shader;
    }
}
