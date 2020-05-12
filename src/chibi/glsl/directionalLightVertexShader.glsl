attribute vec3 position;
attribute vec3 normal;
attribute vec4 color;
uniform mat4 modelMatrix;
uniform mat4 inversedModelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform vec3 directionalLightDirection;

varying vec4 outColor;

void main(void) {
    vec3 inversedDirectionalLightDirection = normalize(inversedModelMatrix * vec4(directionalLightDirection, 0.0)).xyz;
    float diffuse = clamp(dot(normal, inversedDirectionalLightDirection), 0.1, 1.0);
    outColor = color * vec4(vec3(diffuse), 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
