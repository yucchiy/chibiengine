import Game from './js/chibi/Game.js';
import Matrix4x4 from './js/chibi/Matrix4x4.js';

import ChibiWebGLProgram from './js/webgl/WebGLProgram.js';
import ChibiWebGLShader from './js/webgl/WebGLShader.js';
import ChibiWebGLBuffer from './js/webgl/WebGLBuffer.js';

import vertexShaderSource from './shaders/vertexShader.glsl';
import fragmentShaderSource from './shaders/fragmentShader.glsl';

window.onload = function() {
    var game = new Game();
    document.body.appendChild(game.domElement);

    var vertexShader, fragmentShader, program, positionVbo, colorVbo;
    var r = [0.0, 0.0];
    game.run(
    (gl) => {
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

        vertexShader = new ChibiWebGLShader(gl, 1, gl.VERTEX_SHADER, vertexShaderSource);
        fragmentShader = new ChibiWebGLShader(gl, 2, gl.FRAGMENT_SHADER, fragmentShaderSource);
        program = new ChibiWebGLProgram(gl, 1, vertexShader.shader, fragmentShader.shader);
        positionVbo = new ChibiWebGLBuffer(gl, 1, gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
        colorVbo = new ChibiWebGLBuffer(gl, 1, gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    },
    (gl, deltaTime) => {
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
    });
};
