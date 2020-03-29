attribute vec3 position;
attribute vec4 color;
uniform mat4 mvpMatrix;

varying vec4 outColor;

void main(void) {
    outColor = color;
    gl_Position = mvpMatrix * vec4(position, 1.0);
}
