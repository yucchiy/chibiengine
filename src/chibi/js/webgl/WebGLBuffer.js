export default class ChibiWebGLBuffer {
    constructor(gl, id, type, data, bufferType) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(type, buffer);
        gl.bufferData(type, data, bufferType);
        // TODO: これを呼び出すと描画がされない
        // gl.bindBuffer(type, null);

        this.gl = gl;
        this.id = id;
        this.type = type;
        this.data = data;
        this.buffer = buffer;
    }

    bind() {
        this.gl.bindBuffer(this.type, this.buffer);
    }
}
