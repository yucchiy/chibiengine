import { makeTorus } from '../chibi/js/math/primitive';
import { Scene } from '../chibi/js/Scene';
import { Camera } from '../chibi/js/Camera';
import { vec3, mat4 } from 'gl-matrix';

import { ChibiWebGLProgram } from '../chibi/js/webgl/WebGLProgram';
import { ChibiWebGLShader } from '../chibi/js/webgl/WebGLShader';
import { ChibiWebGLBuffer } from '../chibi/js/webgl/WebGLBuffer';

import vertexShaderSource from '../chibi/glsl/directionalLightVertexShader.glsl';
import fragmentShaderSource from '../chibi/glsl/fragmentShader.glsl';
import { SphericalCameraWork } from '../chibi/js/SphericalCameraWork';

export class DirectionalLight extends Scene {
    private vertexShader : ChibiWebGLShader;
    private fragmentShader : ChibiWebGLShader;
    private program : ChibiWebGLProgram;
    private positionVbo : ChibiWebGLBuffer<Float32Array>;
    private colorVbo : ChibiWebGLBuffer<Float32Array>;
    private normalVbo : ChibiWebGLBuffer<Float32Array>;
    private vertexIbo : ChibiWebGLBuffer<Int16Array>;
    private camera : Camera;
    private cameraWork : SphericalCameraWork;
    private axis : number;

    initialize(gl : WebGLRenderingContext) {
        var position : Float32Array = null;
        var color : Float32Array = null;
        var normal : Float32Array = null;
        var index : Int16Array = null;

        var [position, color, normal, index] = makeTorus(32, 32, 1.0, 2.0);

        this.vertexShader = new ChibiWebGLShader(gl, 1, gl.VERTEX_SHADER, vertexShaderSource);
        this.fragmentShader = new ChibiWebGLShader(gl, 2, gl.FRAGMENT_SHADER, fragmentShaderSource);
        this.program = new ChibiWebGLProgram(gl, 1, this.vertexShader, this.fragmentShader);
        this.positionVbo = new ChibiWebGLBuffer(gl, 1, gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);
        this.colorVbo = new ChibiWebGLBuffer(gl, 1, gl.ARRAY_BUFFER, color, gl.STATIC_DRAW);
        this.normalVbo = new ChibiWebGLBuffer(gl, 1, gl.ARRAY_BUFFER, normal, gl.STATIC_DRAW);
        this.vertexIbo = new ChibiWebGLBuffer(gl, 1, gl.ELEMENT_ARRAY_BUFFER, index, gl.STATIC_DRAW)
        this.camera = new Camera(vec3.fromValues(0, 5, 5), vec3.fromValues(0, 0, 0), 45, 1, 0.1, 100);
        this.cameraWork = new SphericalCameraWork(this.camera, this.game.input, 4, 10);

        this.axis = 0;
    }

    update(gl : WebGLRenderingContext, deltaTime : number) {
        this.cameraWork.update(deltaTime);

        var program = this.program;
        var positionVbo = this.positionVbo;
        var colorVbo = this.colorVbo;
        var normalVbo = this.normalVbo;
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

        var attributeNormal = program.getAttributeLocation('normal');
        normalVbo.bind();
        gl.enableVertexAttribArray(attributeNormal);
        gl.vertexAttribPointer(attributeNormal, 3, gl.FLOAT, false, 0, 0);

        vertexIbo.bind();

        var modelMatrix, inversedModelMatrix, viewMatrix, projectionMatrix;

        var uniformModelMatrix = program.getUniformLocation('modelMatrix');
        var uniformInversedModelMatrix = program.getUniformLocation('inversedModelMatrix');
        var uniformViewMatrix = program.getUniformLocation('viewMatrix');
        var uniformProjectionMatrix = program.getUniformLocation('projectionMatrix');
        var uniformDirectionalLightDirection = program.getUniformLocation('directionalLightDirection');
        var uniformAmbientColor = program.getUniformLocation('ambientColor');

        this.axis += Math.PI * 0.001 * deltaTime;

        modelMatrix = mat4.rotate(mat4.create(), mat4.identity(mat4.create()), 0, [1, 0, 0]);
        inversedModelMatrix = mat4.invert(mat4.create(), modelMatrix);
        viewMatrix = this.camera.viewMatrix;
        projectionMatrix = this.camera.projectionMatrix;

        gl.uniformMatrix4fv(uniformModelMatrix, false, modelMatrix);
        gl.uniformMatrix4fv(uniformInversedModelMatrix, false, inversedModelMatrix);
        gl.uniformMatrix4fv(uniformViewMatrix, false, viewMatrix);
        gl.uniformMatrix4fv(uniformProjectionMatrix, false, projectionMatrix);
        gl.uniform3fv(uniformDirectionalLightDirection, [-0.5, 0.5, 0.5]);
        gl.uniform4fv(uniformAmbientColor, [0.1, 0.1, 0.1, 1.0]);

        gl.drawElements(gl.TRIANGLES, vertexIbo.getData().length, gl.UNSIGNED_SHORT, 0);
    }
}
