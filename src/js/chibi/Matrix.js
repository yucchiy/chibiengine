export default class Matrix4x4 {
    constructor() {
        this._matrix = new Float32Array(16);
    }

    get matrix() {
        return this._matrix;
    }

    multiply(matrix) {
        var mat1 = this._matrix;
        var mat2 = matrix.matrix;

        var a = mat1[0];
        var b = mat1[1];
        var c = mat1[2];
        var d = mat1[3];

        var e = mat1[4];
        var f = mat1[5];
        var g = mat1[6];
        var h = mat1[7];

        var i = mat1[8];
        var j = mat1[9];
        var k = mat1[10];
        var l = mat1[11];

        var m = mat1[12];
        var n = mat1[13];
        var o = mat1[14];
        var p = mat1[15];

        var A = mat2[0];
        var B = mat2[1];
        var C = mat2[2];
        var D = mat2[3];

        var E = mat2[4];
        var F = mat2[5];
        var G = mat2[6];
        var H = mat2[7];

        var I = mat2[8];
        var J = mat2[9];
        var K = mat2[10];
        var L = mat2[11];

        var M = mat2[12];
        var N = mat2[13];
        var O = mat2[14];
        var P = mat2[15];

        mat1[0]  = A * a + B * e + C * i + D * m;
        mat1[1]  = A * b + B * f + C * j + D * n;
        mat1[2]  = A * c + B * g + C * k + D * o;
        mat1[3]  = A * d + B * h + C * l + D * p;
        mat1[4]  = E * a + F * e + G * i + H * m;
        mat1[5]  = E * b + F * f + G * j + H * n;
        mat1[6]  = E * c + F * g + G * k + H * o;
        mat1[7]  = E * d + F * h + G * l + H * p;
        mat1[8]  = I * a + J * e + K * i + L * m;
        mat1[9]  = I * b + J * f + K * j + L * n;
        mat1[10] = I * c + J * g + K * k + L * o;
        mat1[11] = I * d + J * h + K * l + L * p;
        mat1[12] = M * a + N * e + O * i + P * m;
        mat1[13] = M * b + N * f + O * j + P * n;
        mat1[14] = M * c + N * g + O * k + P * o;
        mat1[15] = M * d + N * h + O * l + P * p;

        this._matrix = mat1;
    }

    static identity() {
        var matrix = new Matrix4x4();
        var m = matrix.matrix;

        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;

        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;

        m[ 8] = 0;
        m[ 9] = 0;
        m[10] = 1;
        m[11] = 0;

        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return matrix;
    }

    static lookAt(eye, center, up) {
        var matrix = new Matrix4x4();
        var m = matrix.matrix;

        var eyeX = eye[0];
        var eyeY = eye[1];
        var eyeZ = eye[2];

        var centerX = center[0];
        var centerY = center[1];
        var centerZ = center[2];

        var upX = up[0];
        var upY = up[1];
        var upZ = up[2];

        var x0, x1, x2, y0, y1, y2, z0, z1, z2;

        z0 = eyeX - centerX;
        z1 = eyeY - centerY;
        z2 = eyeZ - centerZ;

        var lz = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= lz;
        z1 *= lz;
        z2 *= lz;

        x0 = upY * z2 - upZ * z1;
        x1 = upZ * z0 - upX * z2;
        x2 = upZ * z1 - upY * z0;
        var lx = 1 / Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!lx) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        } else {
            lx = 1 / lx;
            x0 *= lx;
            x1 *= lx;
            x2 *= lx;
        }

        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;
        var ly = 1 / Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!ly) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        } else {
            ly = 1 / ly;
            y0 *= ly;
            y1 *= ly;
            y2 *= ly;
        }

        m[0] = x0;
        m[1] = x1;
        m[2] = x2;
        m[3] = 0;

        m[4] = y0;
        m[5] = y1;
        m[6] = y2;
        m[7] = 0;

        m[ 8] = z0;
        m[ 9] = z1;
        m[10] = z2;
        m[11] = 0;

        m[12] = -(x0 * eyeX + x1 * eyeY + x2 * eyeZ);
        m[13] = -(y0 * eyeX + y1 * eyeY + y2 * eyeZ);
        m[14] = -(z0 * eyeX + z1 * eyeY + z2 * eyeZ);
        m[15] = 1;

        return matrix;
    }

    static perspective(fovy, aspect, near, far) {
        var matrix = new Matrix4x4();
        var m = matrix.matrix;

        var t = near * Math.tan(fovy * Math.PI / 360);
        var r = t * aspect;
        var a = r * 2;
        var b = t * 2;
        var c = far - near;

        m[0] = near * 2 / a;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;

        m[4] = near * 2 / a;
        m[5] = 0;
        m[6] = 0;
        m[7] = 0;

        m[ 8] = -(far + near) / c;
        m[ 9] = -1;
        m[10] = 0;
        m[11] = 0;

        m[12] = 0;
        m[13] = 0;
        m[14] = -(far * near * 2) / c;
        m[15] = 0;

        return matrix;
    }
}
