export default class Matrix4x4 {
    constructor() {
        this._matrix = new Float32Array(16);
    }

    get raw() {
        return this._matrix;
    }

    multiply(matrix) {
        var m1 = this.raw;
        var m2 = matrix.raw;

        var a = m1[0];
        var b = m1[1];
        var c = m1[2];
        var d = m1[3];

        var e = m1[4];
        var f = m1[5];
        var g = m1[6];
        var h = m1[7];

        var i = m1[8];
        var j = m1[9];
        var k = m1[10];
        var l = m1[11];

        var m = m1[12];
        var n = m1[13];
        var o = m1[14];
        var p = m1[15];

        var A = m2[0];
        var B = m2[1];
        var C = m2[2];
        var D = m2[3];

        var E = m2[4];
        var F = m2[5];
        var G = m2[6];
        var H = m2[7];

        var I = m2[8];
        var J = m2[9];
        var K = m2[10];
        var L = m2[11];

        var M = m2[12];
        var N = m2[13];
        var O = m2[14];
        var P = m2[15];

        m1[0]  = A * a + B * e + C * i + D * m;
        m1[1]  = A * b + B * f + C * j + D * n;
        m1[2]  = A * c + B * g + C * k + D * o;
        m1[3]  = A * d + B * h + C * l + D * p;
        m1[4]  = E * a + F * e + G * i + H * m;
        m1[5]  = E * b + F * f + G * j + H * n;
        m1[6]  = E * c + F * g + G * k + H * o;
        m1[7]  = E * d + F * h + G * l + H * p;
        m1[8]  = I * a + J * e + K * i + L * m;
        m1[9]  = I * b + J * f + K * j + L * n;
        m1[10] = I * c + J * g + K * k + L * o;
        m1[11] = I * d + J * h + K * l + L * p;
        m1[12] = M * a + N * e + O * i + P * m;
        m1[13] = M * b + N * f + O * j + P * n;
        m1[14] = M * c + N * g + O * k + P * o;
        m1[15] = M * d + N * h + O * l + P * p;

        return ;
    }

    static identity() {
        var matrix = new Matrix4x4();
        var m = matrix.raw;

        m[0] = 1; m[4] = 0; m[ 8] = 0; m[12] = 0;
        m[1] = 0; m[5] = 1; m[ 9] = 0; m[13] = 0;
        m[2] = 0; m[6] = 0; m[10] = 1; m[14] = 0;
        m[3] = 0; m[7] = 0; m[11] = 0; m[15] = 1;

        return matrix;
    }

    static translate(x, y, z) {
        var matrix = new Matrix4x4();
        var m = matrix.raw;

        m[0] = 1; m[4] = 0; m[ 8] = 0; m[12] = x;
        m[1] = 0; m[5] = 1; m[ 9] = 0; m[13] = y;
        m[2] = 0; m[6] = 0; m[10] = 1; m[14] = z;
        m[3] = 0; m[7] = 0; m[11] = 0; m[15] = 1;

        return matrix;
    }

    static rotateX(theta) {
        var matrix = new Matrix4x4();
        var m = matrix.raw;

        m[0] = 1; m[4] =               0; m[ 8] =                0; m[12] = 0;
        m[1] = 0; m[5] = Math.cos(theta); m[ 9] = -Math.sin(theta); m[13] = 0;
        m[2] = 0; m[6] = Math.sin(theta); m[10] =  Math.cos(theta); m[14] = 0;
        m[3] = 0; m[7] =               0; m[11] =                0; m[15] = 1;

        return matrix;
    }

    static rotateY(theta) {
        var matrix = new Matrix4x4();
        var m = matrix.raw;

        m[0] =  Math.cos(theta);   m[4] = 0; m[ 8] = Math.sin(theta); m[12] = 0;
        m[1] =                0;   m[5] = 1; m[ 9] =               0; m[13] = 0;
        m[2] = -Math.sin(theta);   m[6] = 0; m[10] = Math.cos(theta); m[14] = 0;
        m[3] =                0;   m[7] = 0; m[11] =               0; m[15] = 1;

        return matrix;
    }

    static rotateZ(theta) {
        var matrix = new Matrix4x4();
        var m = matrix.raw;

        m[0] = Math.cos(theta); m[4] = -Math.sin(theta); m[ 8] = 0; m[12] = 0;
        m[1] = Math.sin(theta); m[5] =  Math.cos(theta); m[ 9] = 0; m[13] = 0;
        m[2] =               0; m[6] =                0; m[10] = 1; m[14] = 0;
        m[3] =               0; m[7] =                0; m[11] = 0; m[15] = 1;

        return matrix;
    }

    static scale(scaleX, scaleY, scaleZ) {
        var matrix = new Matrix4x4();
        var m = matrix.raw;

        m[0] = scaleX; m[4] = 0;       m[ 8] =      0; m[12] = 0;
        m[1] = 0;      m[5] = scaleY;  m[ 9] =      0; m[13] = 0;
        m[2] = 0;      m[6] = 0;       m[10] = scaleZ; m[14] = 0;
        m[3] = 0;      m[7] = 0;       m[11] =      0; m[15] = 1;

        return matrix;
    }
}
