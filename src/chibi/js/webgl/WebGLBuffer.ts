export class ChibiWebGLBuffer<T extends BufferSource>  {
    private gl : WebGLRenderingContext;
    private id : number;
    private type : GLenum;
    private buffer : WebGLBuffer;
    private data : T;

    constructor(gl : WebGLRenderingContext, id : number, type : GLenum, data : T, bufferType : GLenum) {
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

    getData() : T {
        return this.data;
    }
}
