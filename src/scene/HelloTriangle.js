import Matrix4x4 from '../chibi/js/Matrix4x4.js';
import Scene from '../chibi/js/Scene.js';

import ChibiWebGLProgram from '../chibi/js/webgl/WebGLProgram.js';
import ChibiWebGLShader from '../chibi/js/webgl/WebGLShader.js';
import ChibiWebGLBuffer from '../chibi/js/webgl/WebGLBuffer.js';

import vertexShaderSource from '../chibi/glsl/vertexShader.glsl';
import fragmentShaderSource from '../chibi/glsl/fragmentShader.glsl';

export default class HelloTriangle extends Scene {
    constructor() {
        super();
        this.vertexShader = null;
        this.fragmentShader = null;
        this.program = null;
        this.positionVbo = null;
        this.colorVbo = null;
    }

    initialize(gl) {
        var positions = [
            0.0, 1, 0.0,
            -1.0, -0.5, 0.0,
            1.0, -0.5, 0.0,
        ];
        var colors = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
        ];

        this.vertexShader = new ChibiWebGLShader(gl, 1, gl.VERTEX_SHADER, vertexShaderSource);
        this.fragmentShader = new ChibiWebGLShader(gl, 2, gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = new ChibiWebGLProgram(gl, 1, this.vertexShader.shader, this.fragmentShader.shader);
        this.positionVbo = new ChibiWebGLBuffer(gl, 1, gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        this.colorVbo = new ChibiWebGLBuffer(gl, 1, gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        this.r = [0.0, 0.0];
    }

    update(gl, deltaTime) {
        var program = this.program;
        var positionVbo = this.positionVbo;
        var colorVbo = this.colorVbo;
        var fragmentShader = this.fragmentShader;
        var vertexShader = this.vertexShader;
        var r = this.r;

        program.useProgram();

        var attributePosition = program.getAttributeLocation('position');
        positionVbo.bind();
        gl.enableVertexAttribArray(attributePosition);
        gl.vertexAttribPointer(attributePosition, 3, gl.FLOAT, false, 0, 0);

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
        modelMatrix.multiply(Matrix4x4.translate(3 * Math.cos(r[0]), 3 * Math.sin(r[1]), 0));
        viewMatrix = Matrix4x4.identity();
        projectionMatrix = Matrix4x4.identity();
        mvpMatrix = Matrix4x4.identity();
        mvpMatrix.multiply(modelMatrix);
        mvpMatrix.multiply(viewMatrix);
        mvpMatrix.multiply(projectionMatrix);

        gl.uniformMatrix4fv(uniformPosition, false, mvpMatrix.raw);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
}
