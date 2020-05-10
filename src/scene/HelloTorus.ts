import Matrix4x4 from '../chibi/js/Matrix4x4.js';
import { makeTorus } from '../chibi/js/math/primitive';
import { Scene } from '../chibi/js/Scene';
import { mat4 } from 'gl-matrix';

import { ChibiWebGLProgram } from '../chibi/js/webgl/WebGLProgram';
import { ChibiWebGLShader } from '../chibi/js/webgl/WebGLShader';
import { ChibiWebGLBuffer } from '../chibi/js/webgl/WebGLBuffer';

import vertexShaderSource from '../chibi/glsl/vertexShader.glsl';
import fragmentShaderSource from '../chibi/glsl/fragmentShader.glsl';

export class HelloTorus extends Scene {
    private vertexShader : ChibiWebGLShader;
    private fragmentShader : ChibiWebGLShader;
    private program : ChibiWebGLProgram;
    private positionVbo : ChibiWebGLBuffer<Float32Array>;
    private colorVbo : ChibiWebGLBuffer<Float32Array>;
    private vertexIbo : ChibiWebGLBuffer<Int16Array>;
    private axis : number;

    initialize(gl : WebGLRenderingContext) {
        // var position : Float32Array = null;
        // var color : Float32Array = null;
        // var index : Int16Array = null;

        var position = new Float32Array([
            0.0,  1.0,  0.0,
            1.0,  0.0,  0.0,
           -1.0,  0.0,  0.0,
            0.0, -1.0,  0.0
        ]);

        var color = new Float32Array([
           1.0, 0.0, 0.0, 1.0,
           0.0, 1.0, 0.0, 1.0,
           0.0, 0.0, 1.0, 1.0,
           1.0, 1.0, 1.0, 1.0
        ]);

        var index = new Int16Array([
            0, 1, 2,
            1, 2, 3
        ]);

        var [position, color, index] = makeTorus(32, 32, 1.0, 2.0);

        this.vertexShader = new ChibiWebGLShader(gl, 1, gl.VERTEX_SHADER, vertexShaderSource);
        this.fragmentShader = new ChibiWebGLShader(gl, 2, gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = new ChibiWebGLProgram(gl, 1, this.vertexShader, this.fragmentShader);
        this.positionVbo = new ChibiWebGLBuffer(gl, 1, gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);
        this.colorVbo = new ChibiWebGLBuffer(gl, 1, gl.ARRAY_BUFFER, color, gl.STATIC_DRAW);
        this.vertexIbo = new ChibiWebGLBuffer(gl, 1, gl.ELEMENT_ARRAY_BUFFER, index, gl.STATIC_DRAW)
        this.axis = 0;
    }

    update(gl : WebGLRenderingContext, deltaTime : number) {
        var program = this.program;
        var positionVbo = this.positionVbo;
        var colorVbo = this.colorVbo;
        var vertexIbo = this.vertexIbo;

        program.useProgram();

        var attributePosition = program.getAttributeLocation('position');
        positionVbo.bind();
        gl.enableVertexAttribArray(attributePosition);
        gl.vertexAttribPointer(attributePosition, 3, gl.FLOAT, false, 0, 0);

        var attributeColor = program.getAttributeLocation('color');
        colorVbo.bind();
        gl.enableVertexAttribArray(attributeColor);
        gl.vertexAttribPointer(attributeColor, 4, gl.FLOAT, false, 0, 0);

        vertexIbo.bind();

        var modelMatrix, viewMatrix, projectionMatrix;

        var uniformModelMatrix = program.getUniformLocation('modelMatrix');
        var uniformViewMatrix = program.getUniformLocation('viewMatrix');
        var uniformProjectionMatrix = program.getUniformLocation('projectionMatrix');

        this.axis += Math.PI * 0.001 * deltaTime;

        modelMatrix = mat4.rotate(mat4.create(), mat4.identity(mat4.create()), this.axis, [1, 1, 1]);
        viewMatrix = mat4.lookAt(mat4.create(), [0, 5, 5], [0, 0, 0], [0, 1, 0]);
        projectionMatrix = mat4.perspective(mat4.create(), 45, 1, 0.1, 100);

        gl.uniformMatrix4fv(uniformModelMatrix, false, modelMatrix);
        gl.uniformMatrix4fv(uniformViewMatrix, false, viewMatrix);
        gl.uniformMatrix4fv(uniformProjectionMatrix, false, projectionMatrix);

        gl.drawElements(gl.TRIANGLES, vertexIbo.getData().length, gl.UNSIGNED_SHORT, 0);
    }
}
