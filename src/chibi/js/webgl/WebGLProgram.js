export default class ChibiWebGLProgram {
    constructor(gl, id, vertexShader, fragmentShader) {
        var program = gl.createProgram();

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert(gl.getProgramInfoLog(program));
        }

        this.gl = gl;
        this.id = id;
        this.program = program;
    }

    getAttributeLocation(name) {
        return this.gl.getAttribLocation(this.program, name);
    }

    getUniformLocation(name) {
        return this.gl.getUniformLocation(this.program, name);
    }

    useProgram() {
        this.gl.useProgram(this.program);
    }
}
