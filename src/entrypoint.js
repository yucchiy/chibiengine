import Game from './js/chibi/Game.js';

import ChibiWebGLProgram from './js/webgl/WebGLProgram.js';
import ChibiWebGLShader from './js/webgl/WebGLShader.js';
import ChibiWebGLBuffer from './js/webgl/WebGLBuffer.js';

import vertexShaderSource from './shaders/vertexShader.glsl';
import fragmentShaderSource from './shaders/fragmentShader.glsl';

window.onload = function() {
    var game = new Game();
    document.body.appendChild(game.domElement);

    var vertexShader, fragmentShader, program, vbo;
    game.run(
    (gl) => {
        var vertices = [
            0.0, 0.8, 0.0,
            0.8, 0.0, 0.0,
            -0.8, 0.0, 0.0,
        ];

        vertexShader = new ChibiWebGLShader(gl, 1, gl.VERTEX_SHADER, vertexShaderSource);
        fragmentShader = new ChibiWebGLShader(gl, 2, gl.FRAGMENT_SHADER, fragmentShaderSource);
        program = new ChibiWebGLProgram(gl, 1, vertexShader.shader, fragmentShader.shader);
        vbo = new ChibiWebGLBuffer(gl, 1, gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    },
    (gl) => {
        program.useProgram();

        var attributePosition = program.getAttributeLocation('position');
        gl.enableVertexAttribArray(attributePosition);
        gl.vertexAttribPointer(attributePosition, 3, gl.FLOAT, false, 0, 0);

        vbo.bind();
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
};
