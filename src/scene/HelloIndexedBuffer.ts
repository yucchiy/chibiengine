import Matrix4x4 from '../chibi/js/Matrix4x4.js';
import { Scene } from '../chibi/js/Scene';

import { ChibiWebGLProgram } from '../chibi/js/webgl/WebGLProgram';
import { ChibiWebGLShader } from '../chibi/js/webgl/WebGLShader';
import { ChibiWebGLBuffer } from '../chibi/js/webgl/WebGLBuffer';

import vertexShaderSource from '../chibi/glsl/vertexShader.glsl';
import fragmentShaderSource from '../chibi/glsl/fragmentShader.glsl';

export class HelloIndexedBuffer extends Scene {
    private vertexShader : ChibiWebGLShader;
    private fragmentShader : ChibiWebGLShader;
    private program : ChibiWebGLProgram;
    private positionVbo : ChibiWebGLBuffer<Float32Array>;
    private vertexIbo : ChibiWebGLBuffer<Int16Array>;
    private colorVbo : ChibiWebGLBuffer<Float32Array>;
    private r : any;

    initialize(gl : WebGLRenderingContext) {
        var position = [
            0.0,  1.0,  0.0,
            1.0,  0.0,  0.0,
           -1.0,  0.0,  0.0,
            0.0, -1.0,  0.0
        ];

        var color = [
           1.0, 0.0, 0.0, 1.0,
           0.0, 1.0, 0.0, 1.0,
           0.0, 0.0, 1.0, 1.0,
           1.0, 1.0, 1.0, 1.0
        ];

        var index = [
            0, 1, 2,
            1, 2, 3
        ];

        this.vertexShader = new ChibiWebGLShader(gl, 1, gl.VERTEX_SHADER, vertexShaderSource);
        this.fragmentShader = new ChibiWebGLShader(gl, 2, gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = new ChibiWebGLProgram(gl, 1, this.vertexShader, this.fragmentShader);
        this.positionVbo = new ChibiWebGLBuffer(gl, 1, gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);
        this.vertexIbo = new ChibiWebGLBuffer(gl, 1, gl.ELEMENT_ARRAY_BUFFER, new Int16Array(index), gl.STATIC_DRAW);
        this.colorVbo = new ChibiWebGLBuffer(gl, 1, gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
        this.r = [0.0, 0.0];

    }

    update(gl : WebGLRenderingContext, deltaTime : number) {
        var program = this.program;
        var positionVbo = this.positionVbo;
        var vertexIbo = this.vertexIbo;
        var colorVbo = this.colorVbo;
        var r = this.r;

        program.useProgram();

        var attributePosition = program.getAttributeLocation('position');
        positionVbo.bind();
        gl.enableVertexAttribArray(attributePosition);
        gl.vertexAttribPointer(attributePosition, 3, gl.FLOAT, false, 0, 0);

        vertexIbo.bind();

        var attributeColor = program.getAttributeLocation('color');
        colorVbo.bind();
        gl.enableVertexAttribArray(attributeColor);
        gl.vertexAttribPointer(attributeColor, 4, gl.FLOAT, false, 0, 0);

        var modelMatrix, viewMatrix, projectionMatrix, mvpMatrix;

        var uniformPosition = program.getUniformLocation('mvpMatrix');

        r[0] = r[0] + Math.PI * deltaTime * 0.001;
        r[1] = r[1] + Math.PI * deltaTime * 0.001;

        modelMatrix = Matrix4x4.identity();
        modelMatrix.multiply(Matrix4x4.scale(0.1, 0.1, 1.0));
        modelMatrix.multiply(Matrix4x4.translate(0, 0, 0));
        viewMatrix = Matrix4x4.identity();
        projectionMatrix = Matrix4x4.identity();
        mvpMatrix = Matrix4x4.identity();
        mvpMatrix.multiply(modelMatrix);
        mvpMatrix.multiply(viewMatrix);
        mvpMatrix.multiply(projectionMatrix);

        gl.uniformMatrix4fv(uniformPosition, false, mvpMatrix.raw);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }
}
