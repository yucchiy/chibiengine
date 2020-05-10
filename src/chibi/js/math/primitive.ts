export function makeTorus(row : number, column : number, irad : number, orad : number) : [Float32Array, Float32Array, Int16Array] {
    var outPosition = Array();
    var outColor = Array();
    var outIndex = Array();

    var positionOffset = 0;
    var colorOffset = 0;
    for (var i = 0; i <= row; ++i) {
        var r = Math.PI * 2 / row * i;
        var rr = Math.cos(r);
        var ry = Math.sin(r);
        for (var ii = 0; ii <= column; ++ii) {
            var tr = Math.PI * 2 / column * ii;
            var tx = (rr* irad + orad) * Math.cos(tr);
            var ty = ry * irad;
            var tz = (rr * irad + orad) * Math.sin(tr);
            outPosition.push(tx, ty, tz);

            var tc = hsva2rgba(360 / column * ii, 1, 1, 1);
            outColor.push(tc[0], tc[1], tc[2], tc[3]);
        }
    }

    for (var i = 0; i < row; ++i) {
        for (var ii = 0; ii < column; ++ii) {
            var r = (column + 1) * i + ii;
            outIndex.push(r, r + column + 1, r + 1);
            outIndex.push(r + column + 1, r + column + 2, r + 1);
        }
    }

    var a = new Float32Array(outPosition);
    var b = new Float32Array(outColor);
    var c = new Int16Array(outIndex);

    return [a, b, c];
}

export function hsva2rgba(h : number, s : number, v : number, a : number) : Float32Array {
    var color = new Float32Array(4);

    var th = h % 360;
    var i = Math.floor(th / 60);
    var f = th / 60 - i;
    var m = v * (1 - s);
    var n = v * (1 - s * f);
    var k = v * (1 - s * (1 - f));

    var r = new Array(v, n, m, m, k, v);
    var g = new Array(k, v, v, n, m, m);
    var b = new Array(m, m, k, v, v, n);

    color[0] = r[i];
    color[1] = g[i];
    color[2] = b[i];
    color[3] = a;

    return color;
}