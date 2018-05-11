/**
 * H5调用原生JS库,依赖新版WebViewJavascriptBridge
 * @namespace
 * @author Demon
 * @version 1.0.0
 */
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS = CryptoJS || function(u, p) {
    var d = {},
        l = d.lib = {},
        s = function() {},
        t = l.Base = {
            extend: function(a) {
                s.prototype = this;
                var c = new s;
                a && c.mixIn(a);
                c.hasOwnProperty("init") || (c.init = function() {
                    c.$super.init.apply(this, arguments)
                });
                c.init.prototype = c;
                c.$super = this;
                return c
            },
            create: function() {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a
            },
            init: function() {},
            mixIn: function(a) {
                for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
                a.hasOwnProperty("toString") && (this.toString = a.toString)
            },
            clone: function() {
                return this.init.prototype.extend(this)
            }
        },
        r = l.WordArray = t.extend({
            init: function(a, c) {
                a = this.words = a || [];
                this.sigBytes = c != p ? c : 4 * a.length
            },
            toString: function(a) {
                return (a || v).stringify(this)
            },
            concat: function(a) {
                var c = this.words,
                    e = a.words,
                    j = this.sigBytes;
                a = a.sigBytes;
                this.clamp();
                if (j % 4)
                    for (var k = 0; k < a; k++) c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4);
                else if (65535 < e.length)
                    for (k = 0; k < a; k += 4) c[j + k >>> 2] = e[k >>> 2];
                else c.push.apply(c, e);
                this.sigBytes += a;
                return this
            },
            clamp: function() {
                var a = this.words,
                    c = this.sigBytes;
                a[c >>> 2] &= 4294967295 <<
                    32 - 8 * (c % 4);
                a.length = u.ceil(c / 4)
            },
            clone: function() {
                var a = t.clone.call(this);
                a.words = this.words.slice(0);
                return a
            },
            random: function(a) {
                for (var c = [], e = 0; e < a; e += 4) c.push(4294967296 * u.random() | 0);
                return new r.init(c, a)
            }
        }),
        w = d.enc = {},
        v = w.Hex = {
            stringify: function(a) {
                var c = a.words;
                a = a.sigBytes;
                for (var e = [], j = 0; j < a; j++) {
                    var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255;
                    e.push((k >>> 4).toString(16));
                    e.push((k & 15).toString(16))
                }
                return e.join("")
            },
            parse: function(a) {
                for (var c = a.length, e = [], j = 0; j < c; j += 2) e[j >>> 3] |= parseInt(a.substr(j,
                    2), 16) << 24 - 4 * (j % 8);
                return new r.init(e, c / 2)
            }
        },
        b = w.Latin1 = {
            stringify: function(a) {
                var c = a.words;
                a = a.sigBytes;
                for (var e = [], j = 0; j < a; j++) e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255));
                return e.join("")
            },
            parse: function(a) {
                for (var c = a.length, e = [], j = 0; j < c; j++) e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4);
                return new r.init(e, c)
            }
        },
        x = w.Utf8 = {
            stringify: function(a) {
                try {
                    return decodeURIComponent(escape(b.stringify(a)))
                } catch (c) {
                    throw Error("Malformed UTF-8 data");
                }
            },
            parse: function(a) {
                return b.parse(unescape(encodeURIComponent(a)))
            }
        },
        q = l.BufferedBlockAlgorithm = t.extend({
            reset: function() {
                this._data = new r.init;
                this._nDataBytes = 0
            },
            _append: function(a) {
                "string" == typeof a && (a = x.parse(a));
                this._data.concat(a);
                this._nDataBytes += a.sigBytes
            },
            _process: function(a) {
                var c = this._data,
                    e = c.words,
                    j = c.sigBytes,
                    k = this.blockSize,
                    b = j / (4 * k),
                    b = a ? u.ceil(b) : u.max((b | 0) - this._minBufferSize, 0);
                a = b * k;
                j = u.min(4 * a, j);
                if (a) {
                    for (var q = 0; q < a; q += k) this._doProcessBlock(e, q);
                    q = e.splice(0, a);
                    c.sigBytes -= j
                }
                return new r.init(q, j)
            },
            clone: function() {
                var a = t.clone.call(this);
                a._data = this._data.clone();
                return a
            },
            _minBufferSize: 0
        });
    l.Hasher = q.extend({
        cfg: t.extend(),
        init: function(a) {
            this.cfg = this.cfg.extend(a);
            this.reset()
        },
        reset: function() {
            q.reset.call(this);
            this._doReset()
        },
        update: function(a) {
            this._append(a);
            this._process();
            return this
        },
        finalize: function(a) {
            a && this._append(a);
            return this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(b, e) {
                return (new a.init(e)).finalize(b)
            }
        },
        _createHmacHelper: function(a) {
            return function(b, e) {
                return (new n.HMAC.init(a,
                    e)).finalize(b)
            }
        }
    });
    var n = d.algo = {};
    return d
}(Math);
(function() {
    var u = CryptoJS,
        p = u.lib.WordArray;
    u.enc.Base64 = {
        stringify: function(d) {
            var l = d.words,
                p = d.sigBytes,
                t = this._map;
            d.clamp();
            d = [];
            for (var r = 0; r < p; r += 3)
                for (var w = (l[r >>> 2] >>> 24 - 8 * (r % 4) & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - 8 * ((r + 1) % 4) & 255) << 8 | l[r + 2 >>> 2] >>> 24 - 8 * ((r + 2) % 4) & 255, v = 0; 4 > v && r + 0.75 * v < p; v++) d.push(t.charAt(w >>> 6 * (3 - v) & 63));
            if (l = t.charAt(64))
                for (; d.length % 4;) d.push(l);
            return d.join("")
        },
        parse: function(d) {
            var l = d.length,
                s = this._map,
                t = s.charAt(64);
            t && (t = d.indexOf(t), -1 != t && (l = t));
            for (var t = [], r = 0, w = 0; w <
                l; w++)
                if (w % 4) {
                    var v = s.indexOf(d.charAt(w - 1)) << 2 * (w % 4),
                        b = s.indexOf(d.charAt(w)) >>> 6 - 2 * (w % 4);
                    t[r >>> 2] |= (v | b) << 24 - 8 * (r % 4);
                    r++
                }
            return p.create(t, r)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
})();
(function(u) {
    function p(b, n, a, c, e, j, k) {
        b = b + (n & a | ~n & c) + e + k;
        return (b << j | b >>> 32 - j) + n
    }

    function d(b, n, a, c, e, j, k) {
        b = b + (n & c | a & ~c) + e + k;
        return (b << j | b >>> 32 - j) + n
    }

    function l(b, n, a, c, e, j, k) {
        b = b + (n ^ a ^ c) + e + k;
        return (b << j | b >>> 32 - j) + n
    }

    function s(b, n, a, c, e, j, k) {
        b = b + (a ^ (n | ~c)) + e + k;
        return (b << j | b >>> 32 - j) + n
    }
    for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++) b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0;
    r = r.MD5 = v.extend({
        _doReset: function() {
            this._hash = new w.init([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function(q, n) {
            for (var a = 0; 16 > a; a++) {
                var c = n + a,
                    e = q[c];
                q[c] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360
            }
            var a = this._hash.words,
                c = q[n + 0],
                e = q[n + 1],
                j = q[n + 2],
                k = q[n + 3],
                z = q[n + 4],
                r = q[n + 5],
                t = q[n + 6],
                w = q[n + 7],
                v = q[n + 8],
                A = q[n + 9],
                B = q[n + 10],
                C = q[n + 11],
                u = q[n + 12],
                D = q[n + 13],
                E = q[n + 14],
                x = q[n + 15],
                f = a[0],
                m = a[1],
                g = a[2],
                h = a[3],
                f = p(f, m, g, h, c, 7, b[0]),
                h = p(h, f, m, g, e, 12, b[1]),
                g = p(g, h, f, m, j, 17, b[2]),
                m = p(m, g, h, f, k, 22, b[3]),
                f = p(f, m, g, h, z, 7, b[4]),
                h = p(h, f, m, g, r, 12, b[5]),
                g = p(g, h, f, m, t, 17, b[6]),
                m = p(m, g, h, f, w, 22, b[7]),
                f = p(f, m, g, h, v, 7, b[8]),
                h = p(h, f, m, g, A, 12, b[9]),
                g = p(g, h, f, m, B, 17, b[10]),
                m = p(m, g, h, f, C, 22, b[11]),
                f = p(f, m, g, h, u, 7, b[12]),
                h = p(h, f, m, g, D, 12, b[13]),
                g = p(g, h, f, m, E, 17, b[14]),
                m = p(m, g, h, f, x, 22, b[15]),
                f = d(f, m, g, h, e, 5, b[16]),
                h = d(h, f, m, g, t, 9, b[17]),
                g = d(g, h, f, m, C, 14, b[18]),
                m = d(m, g, h, f, c, 20, b[19]),
                f = d(f, m, g, h, r, 5, b[20]),
                h = d(h, f, m, g, B, 9, b[21]),
                g = d(g, h, f, m, x, 14, b[22]),
                m = d(m, g, h, f, z, 20, b[23]),
                f = d(f, m, g, h, A, 5, b[24]),
                h = d(h, f, m, g, E, 9, b[25]),
                g = d(g, h, f, m, k, 14, b[26]),
                m = d(m, g, h, f, v, 20, b[27]),
                f = d(f, m, g, h, D, 5, b[28]),
                h = d(h, f,
                    m, g, j, 9, b[29]),
                g = d(g, h, f, m, w, 14, b[30]),
                m = d(m, g, h, f, u, 20, b[31]),
                f = l(f, m, g, h, r, 4, b[32]),
                h = l(h, f, m, g, v, 11, b[33]),
                g = l(g, h, f, m, C, 16, b[34]),
                m = l(m, g, h, f, E, 23, b[35]),
                f = l(f, m, g, h, e, 4, b[36]),
                h = l(h, f, m, g, z, 11, b[37]),
                g = l(g, h, f, m, w, 16, b[38]),
                m = l(m, g, h, f, B, 23, b[39]),
                f = l(f, m, g, h, D, 4, b[40]),
                h = l(h, f, m, g, c, 11, b[41]),
                g = l(g, h, f, m, k, 16, b[42]),
                m = l(m, g, h, f, t, 23, b[43]),
                f = l(f, m, g, h, A, 4, b[44]),
                h = l(h, f, m, g, u, 11, b[45]),
                g = l(g, h, f, m, x, 16, b[46]),
                m = l(m, g, h, f, j, 23, b[47]),
                f = s(f, m, g, h, c, 6, b[48]),
                h = s(h, f, m, g, w, 10, b[49]),
                g = s(g, h, f, m,
                    E, 15, b[50]),
                m = s(m, g, h, f, r, 21, b[51]),
                f = s(f, m, g, h, u, 6, b[52]),
                h = s(h, f, m, g, k, 10, b[53]),
                g = s(g, h, f, m, B, 15, b[54]),
                m = s(m, g, h, f, e, 21, b[55]),
                f = s(f, m, g, h, v, 6, b[56]),
                h = s(h, f, m, g, x, 10, b[57]),
                g = s(g, h, f, m, t, 15, b[58]),
                m = s(m, g, h, f, D, 21, b[59]),
                f = s(f, m, g, h, z, 6, b[60]),
                h = s(h, f, m, g, C, 10, b[61]),
                g = s(g, h, f, m, j, 15, b[62]),
                m = s(m, g, h, f, A, 21, b[63]);
            a[0] = a[0] + f | 0;
            a[1] = a[1] + m | 0;
            a[2] = a[2] + g | 0;
            a[3] = a[3] + h | 0
        },
        _doFinalize: function() {
            var b = this._data,
                n = b.words,
                a = 8 * this._nDataBytes,
                c = 8 * b.sigBytes;
            n[c >>> 5] |= 128 << 24 - c % 32;
            var e = u.floor(a /
                4294967296);
            n[(c + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360;
            n[(c + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
            b.sigBytes = 4 * (n.length + 1);
            this._process();
            b = this._hash;
            n = b.words;
            for (a = 0; 4 > a; a++) c = n[a], n[a] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;
            return b
        },
        clone: function() {
            var b = v.clone.call(this);
            b._hash = this._hash.clone();
            return b
        }
    });
    t.MD5 = v._createHelper(r);
    t.HmacMD5 = v._createHmacHelper(r)
})(Math);
(function() {
    var u = CryptoJS,
        p = u.lib,
        d = p.Base,
        l = p.WordArray,
        p = u.algo,
        s = p.EvpKDF = d.extend({
            cfg: d.extend({
                keySize: 4,
                hasher: p.MD5,
                iterations: 1
            }),
            init: function(d) {
                this.cfg = this.cfg.extend(d)
            },
            compute: function(d, r) {
                for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q;) {
                    n && s.update(n);
                    var n = s.update(d).finalize(r);
                    s.reset();
                    for (var a = 1; a < p; a++) n = s.finalize(n), s.reset();
                    b.concat(n)
                }
                b.sigBytes = 4 * q;
                return b
            }
        });
    u.EvpKDF = function(d, l, p) {
        return s.create(p).compute(d,
            l)
    }
})();
CryptoJS.lib.Cipher || function(u) {
    var p = CryptoJS,
        d = p.lib,
        l = d.Base,
        s = d.WordArray,
        t = d.BufferedBlockAlgorithm,
        r = p.enc.Base64,
        w = p.algo.EvpKDF,
        v = d.Cipher = t.extend({
            cfg: l.extend(),
            createEncryptor: function(e, a) {
                return this.create(this._ENC_XFORM_MODE, e, a)
            },
            createDecryptor: function(e, a) {
                return this.create(this._DEC_XFORM_MODE, e, a)
            },
            init: function(e, a, b) {
                this.cfg = this.cfg.extend(b);
                this._xformMode = e;
                this._key = a;
                this.reset()
            },
            reset: function() {
                t.reset.call(this);
                this._doReset()
            },
            process: function(e) {
                this._append(e);
                return this._process()
            },
            finalize: function(e) {
                e && this._append(e);
                return this._doFinalize()
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function(e) {
                return {
                    encrypt: function(b, k, d) {
                        return ("string" == typeof k ? c : a).encrypt(e, b, k, d)
                    },
                    decrypt: function(b, k, d) {
                        return ("string" == typeof k ? c : a).decrypt(e, b, k, d)
                    }
                }
            }
        });
    d.StreamCipher = v.extend({
        _doFinalize: function() {
            return this._process(!0)
        },
        blockSize: 1
    });
    var b = p.mode = {},
        x = function(e, a, b) {
            var c = this._iv;
            c ? this._iv = u : c = this._prevBlock;
            for (var d = 0; d < b; d++) e[a + d] ^=
                c[d]
        },
        q = (d.BlockCipherMode = l.extend({
            createEncryptor: function(e, a) {
                return this.Encryptor.create(e, a)
            },
            createDecryptor: function(e, a) {
                return this.Decryptor.create(e, a)
            },
            init: function(e, a) {
                this._cipher = e;
                this._iv = a
            }
        })).extend();
    q.Encryptor = q.extend({
        processBlock: function(e, a) {
            var b = this._cipher,
                c = b.blockSize;
            x.call(this, e, a, c);
            b.encryptBlock(e, a);
            this._prevBlock = e.slice(a, a + c)
        }
    });
    q.Decryptor = q.extend({
        processBlock: function(e, a) {
            var b = this._cipher,
                c = b.blockSize,
                d = e.slice(a, a + c);
            b.decryptBlock(e, a);
            x.call(this,
                e, a, c);
            this._prevBlock = d
        }
    });
    b = b.CBC = q;
    q = (p.pad = {}).Pkcs7 = {
        pad: function(a, b) {
            for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4) l.push(d);
            c = s.create(l, c);
            a.concat(c)
        },
        unpad: function(a) {
            a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255
        }
    };
    d.BlockCipher = v.extend({
        cfg: v.cfg.extend({
            mode: b,
            padding: q
        }),
        reset: function() {
            v.reset.call(this);
            var a = this.cfg,
                b = a.iv,
                a = a.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor;
            else c = a.createDecryptor, this._minBufferSize = 1;
            this._mode = c.call(a,
                this, b && b.words)
        },
        _doProcessBlock: function(a, b) {
            this._mode.processBlock(a, b)
        },
        _doFinalize: function() {
            var a = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                a.pad(this._data, this.blockSize);
                var b = this._process(!0)
            } else b = this._process(!0), a.unpad(b);
            return b
        },
        blockSize: 4
    });
    var n = d.CipherParams = l.extend({
            init: function(a) {
                this.mixIn(a)
            },
            toString: function(a) {
                return (a || this.formatter).stringify(this)
            }
        }),
        b = (p.format = {}).OpenSSL = {
            stringify: function(a) {
                var b = a.ciphertext;
                a = a.salt;
                return (a ? s.create([1398893684,
                    1701076831
                ]).concat(a).concat(b) : b).toString(r)
            },
            parse: function(a) {
                a = r.parse(a);
                var b = a.words;
                if (1398893684 == b[0] && 1701076831 == b[1]) {
                    var c = s.create(b.slice(2, 4));
                    b.splice(0, 4);
                    a.sigBytes -= 16
                }
                return n.create({
                    ciphertext: a,
                    salt: c
                })
            }
        },
        a = d.SerializableCipher = l.extend({
            cfg: l.extend({
                format: b
            }),
            encrypt: function(a, b, c, d) {
                d = this.cfg.extend(d);
                var l = a.createEncryptor(c, d);
                b = l.finalize(b);
                l = l.cfg;
                return n.create({
                    ciphertext: b,
                    key: c,
                    iv: l.iv,
                    algorithm: a,
                    mode: l.mode,
                    padding: l.padding,
                    blockSize: a.blockSize,
                    formatter: d.format
                })
            },
            decrypt: function(a, b, c, d) {
                d = this.cfg.extend(d);
                b = this._parse(b, d.format);
                return a.createDecryptor(c, d).finalize(b.ciphertext)
            },
            _parse: function(a, b) {
                return "string" == typeof a ? b.parse(a, this) : a
            }
        }),
        p = (p.kdf = {}).OpenSSL = {
            execute: function(a, b, c, d) {
                d || (d = s.random(8));
                a = w.create({
                    keySize: b + c
                }).compute(a, d);
                c = s.create(a.words.slice(b), 4 * c);
                a.sigBytes = 4 * b;
                return n.create({
                    key: a,
                    iv: c,
                    salt: d
                })
            }
        },
        c = d.PasswordBasedCipher = a.extend({
            cfg: a.cfg.extend({
                kdf: p
            }),
            encrypt: function(b, c, d, l) {
                l = this.cfg.extend(l);
                d = l.kdf.execute(d,
                    b.keySize, b.ivSize);
                l.iv = d.iv;
                b = a.encrypt.call(this, b, c, d.key, l);
                b.mixIn(d);
                return b
            },
            decrypt: function(b, c, d, l) {
                l = this.cfg.extend(l);
                c = this._parse(c, l.format);
                d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt);
                l.iv = d.iv;
                return a.decrypt.call(this, b, c, d.key, l)
            }
        })
}();
(function() {
    for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++) a[c] = 128 > c ? c << 1 : c << 1 ^ 283;
    for (var e = 0, j = 0, c = 0; 256 > c; c++) {
        var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4,
            k = k >>> 8 ^ k & 255 ^ 99;
        l[e] = k;
        s[k] = e;
        var z = a[e],
            F = a[z],
            G = a[F],
            y = 257 * a[k] ^ 16843008 * k;
        t[e] = y << 24 | y >>> 8;
        r[e] = y << 16 | y >>> 16;
        w[e] = y << 8 | y >>> 24;
        v[e] = y;
        y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e;
        b[k] = y << 24 | y >>> 8;
        x[k] = y << 16 | y >>> 16;
        q[k] = y << 8 | y >>> 24;
        n[k] = y;
        e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1
    }
    var H = [0, 1, 2, 4, 8,
            16, 32, 64, 128, 27, 54
        ],
        d = d.AES = p.extend({
            _doReset: function() {
                for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++)
                    if (j < d) e[j] = c[j];
                    else {
                        var k = e[j - 1];
                        j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255]) : (k = k << 8 | k >>> 24, k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255], k ^= H[j / d | 0] << 24);
                        e[j] = e[j - d] ^ k
                    }
                c = this._invKeySchedule = [];
                for (d = 0; d < a; d++) j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>>
                    8 & 255]] ^ n[l[k & 255]]
            },
            encryptBlock: function(a, b) {
                this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l)
            },
            decryptBlock: function(a, c) {
                var d = a[c + 1];
                a[c + 1] = a[c + 3];
                a[c + 3] = d;
                this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s);
                d = a[c + 1];
                a[c + 1] = a[c + 3];
                a[c + 3] = d
            },
            _doCryptBlock: function(a, b, c, d, e, j, l, f) {
                for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++) var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[n & 255] ^ c[p++],
                    s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[g & 255] ^ c[p++],
                    t =
                    d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[h & 255] ^ c[p++],
                    n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[k & 255] ^ c[p++],
                    g = q,
                    h = s,
                    k = t;
                q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[n & 255]) ^ c[p++];
                s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[g & 255]) ^ c[p++];
                t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[h & 255]) ^ c[p++];
                n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[k & 255]) ^ c[p++];
                a[b] = q;
                a[b + 1] = s;
                a[b + 2] = t;
                a[b + 3] = n
            },
            keySize: 8
        });
    u.AES = p._createHelper(d)
})();



var tsApp = (function(document) {

    var $ = function(selector, context) {
        context = context || document;
        if (!selector)
            return wrap();
        if (typeof selector === 'object')
            return wrap([selector], null);
        if (typeof selector === 'function')
            return $.ready(selector);
        if (typeof selector === 'string') {
            try {
                selector = selector.trim();
                if (idSelectorRE.test(selector)) {
                    var found = document.getElementById(RegExp.$1);
                    return wrap(found ? [found] : []);
                }
                return wrap($.qsa(selector, context), selector);
            } catch (e) {}
        }
        return wrap();
    };
    var wrap = function(dom, selector) {
        dom = dom || [];
        Object.setPrototypeOf(dom, $.fn);
        dom.selector = selector || '';
        return dom;
    };
    /**
     * 对象继承
     * @name  extend
     * @function
     * @param {type} target
     * @param {type} source
     * @param {type} deep
     * @returns {unresolved}
     */
    $.extend = function() { //from jquery2
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !$.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && $.isArray(src) ? src : [];
                        } else {
                            clone = src && $.isPlainObject(src) ? src : {};
                        }
                        target[name] = $.extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };
    return $;
})(document);

/**
 * 公共方法
 * */
(function($, window) {
    //
    /**
     * AES加密   
     * tsApp.generateMixed(5) //return str
     @example
     tsApp.aesEncrypt('str');
     * */

    $.aesEncrypt = function(str) {
        var key = CryptoJS.enc.Utf8.parse("983e5375751057f4");
        var iv = CryptoJS.enc.Utf8.parse('16-Bytes--String');
        srcs = CryptoJS.enc.Utf8.parse(str);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    };
    //AES解密
    $.aesDecrypt = function(str) {
        var key = CryptoJS.enc.Utf8.parse("983e5375751057f4");
        var iv = CryptoJS.enc.Utf8.parse('16-Bytes--String');
        var encryptedHexStr = CryptoJS.enc.Hex.parse(str);
        var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        var decrypt = CryptoJS.AES.decrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    };
    /**
     * 获取随机数 参数n代表生成后的随机数个数    
     * tsApp.generateMixed(5) //return str
     * */
    $.generateMixed = function(n) {
        var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var res = "";
        for (var i = 0; i < n; i++) {
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    };
    /**
     * 去掉字符串头尾空格
     * @version 1.0
     * @name trim
     * @function
     * @return {number}  
     * @example
     * tsApp.trim() //return str
     * */
    $.trim = function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };
    /**
     * 判断身份证格式
     * @version 1.0
     * @name isCard
     * @function
     * @return {number}  
     * @example
     * tsApp.isCard() //return str
     * */
    $.isCard = function(str) {
        console.log(str);
        var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        console.log(regIdCard.test(str));
        return regIdCard.test(str);
    };
    /**
     * 返回ie浏览器版本
     * @version 1.0
     * @name internetExplorerVersion
     * @function
     * @return {number}  7表示ie7
     * @example
     * tsApp.internetExplorerVersion() //return
     * */
    $.internetExplorerVersion = function() {
        var browser = navigator.appName;
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        if (version.length > 1) {
            var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
            return trim_Version;

        };
    };
    /**
     * 判断客户端来源
     * @version 4.1.1
     * @name getClientBrowser
     * @function
     * @return {String|undefined}  'yx'表示天搜app, 'wx'表示微信app, 'browser' 表示手机浏览器, 'undefined' 表示非手机浏览器
     * @example
     * tsApp.getClientBrowser() //return
     * */
    $.getClientBrowser = function() {
        var _userAgent = navigator.userAgent;
        var _broMark;
        //如果是手机浏览器
        if (/Mobile/gi.test(_userAgent)) {
            if (/MicroMessenger/gi.test(_userAgent)) {
                _broMark = 'wx';
            }else if (/ycBrowser/gi.test(_userAgent)) {
                _broMark = 'yx';
            } else if (/Alipay/gi.test(_userAgent)) {
                _broMark = 'Alipay';
            } else {
                _broMark = 'browser';
            };
            //低版本判断是否为天搜APP
            var _search = window.location.search;
            if (/ver/g.test(_search)) {
                _broMark = 'yx';
            };
        };

        return _broMark
    };


    /**
     * 中英文混合字符截取功能，中文按照2个英文截取
     * @name  newSubStr
     * @function
     * @param {String} string 需要截取的字符串
     * @param {Number} num  截取的字数
     * @return {String} String
     * @extends  String
     * @example tsApp.newSubStr("中文English",5); // "中文E..."
     */
    $.newSubStr = function(string, num) {
        //正则，判断中文字符
        var strReg = /[^\x00-\xff]/g;
        var _str = string.replace(strReg, "**");
        var _len = _str.length;
        if (typeof num != "number") {
            //判断参数是否为数字
            throw "Please enter the number";
        } else {
            if (_len > num) {
                var _newLen = Math.floor(num / 2);
                var _strLen = string.length;
                for (var i = _newLen; i < _strLen; i++) {
                    var _newStr = string.substr(0, i).replace(strReg, "**");
                    if (_newStr.length >= num) {
                        return string.substr(0, i) + "...";
                        break;
                    }
                }
            } else {
                return string;
            }
        }
    };
    /**
     * 判断字符串是否为金额格式
     * @name  isMoney
     * @function
     * @return {Boolean} Boolean
     * @param {String} string 需要截取的字符串
     * @example tsApp.isMoney("9.99") //true
     * */
    $.isMoney = function(string) {
        return /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.test(string);
    };

    /**
     * 判断手机号是否正确
     * @name  isPhoneNum
     * @function
     * @return {Boolean} Boolean
     * @param {String} string 需要判断的手机号
     * @example tsApp.isPhoneNum("13916422635") //true
     * */
    $.isPhoneNum = function(string) {
        return /^1[3|4|5|7|8]\d{9}$/.test(string);
    };
    /**
     * 判断邮箱是否正确
     * @name  isMail
     * @function
     * @return {Boolean} Boolean
     * @param {String} string 需要截取的字符串
     * @example tsApp.isMail("13916422635@qq.com") //true
     * */
    $.isMail = function(string) {
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(string);
    };
    /**
     * 获取URL指定参数
     * @name  getUrlparam
     * @function
     * @return {String} String
     * @param {String} keyName 参数字段名称
     * @example tsApp.getUrlParam("keyName") //
     * */
    $.getUrlparam = function(keyName) {
        /*
         * 获取URL
         * */
        var _url = window.location.href.split("?")[1];
        if (_url != undefined) {
            var _index;
            var _arr = _url.split("&");
            for (var i = 0, _len = _arr.length; i < _len; i++) {
                if (_arr[i].indexOf(keyName + "=") >= 0) {
                    _index = i;
                    break;
                } else {
                    _index = -1;
                }
            }
            if (_index >= 0) {
                var _key = _arr[_index].split("=")[1];
                return _key;
            }
        }
    };
    /**
     * 金额千位符处理
     * @name  formatPrice
     * @function
     * @return {String} String
     * @param {String|Numbe} price 参数字段名称
     * @example tsApp.formatPrice(1234) //1,234
     * */
    $.formatPrice = function(price) {
        var _price = price.toString().replace(/,/g, "");
        var digit = _price.indexOf(".");
        var int = _price.substr(0, digit);
        var i;
        var mag = new Array();
        var word;
        if (_price.indexOf(".") == -1) {
            i = _price.length;
            while (i > 0) {
                word = _price.substring(i, i - 3);
                i -= 3;
                mag.unshift(word)
            }
            _price = mag.toString();
        } else {
            i = int.length;
            while (i > 0) {
                word = int.substring(i, i - 3);
                i -= 3;
                mag.unshift(word)
            }
            _price = mag + _price.substring(digit)

        }
        return _price
    };

    /**
     * 卡号四位分段处理
     * @name  formatNum
     * @function
     * @return {String} String
     * @param {String|Numbe} num 参数字段名称
     * @example tsApp.formatPrice(1234) //1,234
     * */
    $.formatNum = function(num) {
        var _num = num.toString();
        var _num = _num.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
        return _num;
    };
    /**
     * 加密业务
     * @name  josnArr
     * @function
     * @return {String} String
     * @jsonObj {obj} num 传的data对象
     * @example 对参数排序后进行sha1加密 返回密码后的字符串
     * */
    $.josnArr = function(jsonObj) {
        //console.log(jsonObj);   
        var jsonArr = [];
        for (i in jsonObj) {
            jsonArr.push(i);
        };
        jsonArr.sort();
        var shaData = "";
        for (var i in jsonArr) {
            shaData = shaData + jsonArr[i] + "=" + jsonObj[jsonArr[i]] + "&"
        };
        shaData = shaData + 'key=4c1dde4fa3bcd0c1c03a637c95adb593';
        //加密start
        //console.log(shaData);   
        var shaObj = new $.jsSHA('SHA-1', 'TEXT');
        shaObj.update(shaData);
        //  console.log(jsonData+'&key=4c1dde4fa3bcd0c1c03a637c95adb593');
        var signature = shaObj.getHash("HEX");

        return signature;
    };
    /**
     * 控制台打印日志
     * @name  log
     * @function
     * */
    $.log = function(selector, bool) {
        if (typeof selector == "Object") {
            var _str = JSON.stringify(selector);
            console.log(_str);
            if (bool) {
                alert(_str);
            }
        } else {
            console.log(selector);
            if (bool) {
                alert(_str);
            }
        }
    };
    /**
     * 判断是否为iPhone
     * @name  isIphone
     * @function
     * @example
     * tsApp.iphone();
     * //或
     * tsApp.isIphone();
     * @return {Boolean} boolean
     * */
    $.isIphone = $.iphone = function() {
        return navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/);
    };
    /**
     * 判断是否为安卓
     * @name isAndroid
     * @function
     * @example
     * tsApp.Android();
     * //或
     * tsApp.isAndroid();
     * @return {Boolean} boolean
     * */
    $.isAndroid = $.Android = function() {
        return navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
    };

    /**
     * 判断是否为数字
     * @name isNum
     * @function
     * @example
    
     * tsApp.isNum();
     * @return {Boolean} boolean
     * */
    $.isNum = function(num) {
        var reg = new RegExp("^(0|[1-9][0-9]*)$");
        return reg.test(num);
    };

    /**
     * 判断是否为数字
     * @name isNum
     * @function
     * @example
    
     * tsApp.isNum();
     * @return {Boolean} boolean
     * */
    $.checkNum = function(num) {
        console.log(num)
        //var reg = new RegExp("^-?\d+(\.\d{1,3})?$");
        return /^-?\d+(\.\d{1,3})?$/.test(num);
    };

    
    /**
     * 判断是否为整数
     * @name isInteger
     * @function
     * @example
    
     * tsApp.isInteger();
     * @return {Boolean} boolean
     * */
    $.isInteger = function(obj) {
        
        if ($.isNum(obj)) {
            return obj % 1 === 0;
        } else {
            return false;
        }

    };


    /**
     * 判断是否为空
     * @name isNull
     * @function
     * @example    
     * tsApp.isNull();
     * @return {Boolean} boolean
     * */
    $.isNull = function(str) {
        if (str == null || str == undefined || str == '') {
            return true;
        } else {
            return false;
        }
    };

    /**
     * 实现GMT转换成.当前系统区域设置格式
     * @name isNull
     * @function
     * @example    
     * tsApp.DateUtilFormat();
     * @return DateUtilFormat(Thu Nov 9 20:30:37 UTC+0800 2006 ")  
     * */
    $.DateUtilFormat = function(date) {
        var tt = date.toLocaleDateString().replace(/[\/]/g, "-");
        if(tt.split("-")[1] <10 && tt.split("-")[2] > 9){  
    tt = tt.split("-")[0] +"-0"+ tt.split("-")[1] +"-"+ tt.split("-")[2] ;  
   }else if(tt.split("-")[2] < 10 && tt.split("-")[1] > 9){  
    tt = tt.split("-")[0] +"-"+ tt.split("-")[1] +"-0"+ tt.split("-")[2];  
   }else if(tt.split("-")[1] < 10 && tt.split("-")[2] < 10){  
    tt = tt.split("-")[0] +"-0"+ tt.split("-")[1] +"-0"+ tt.split("-")[2];  
   } 
   
        return tt;
    };
    /**
     * 图片对象转URL(兼容)
     * @name isNull
     * @function
     * @example    
     * tsApp.getObjectURL();
     * @return getObjectURL(fileObj)  
     * */

    $.getObjectURL = function(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    };


}(tsApp, window));
/**
 * SHA1加密
 * @name  SHA
 * @example
 var shaObj = new tsApp.jsSHA('SHA-1', 'TEXT');               
shaObj.update('0');
var signature = shaObj.getHash("HEX");
 *  //return
 */
(function(F) {
    function sha(d, a, c) {
        var g = 0,
            b = [],
            e = 0,
            f, k, l, h, m, u, q, v = !1,
            n = [],
            r = [],
            t, p = !1;
        c = c || {};
        f = c.encoding || "UTF8";
        t = c.numRounds || 1;
        l = y(a, f);
        if (t !== parseInt(t, 10) || 1 > t) throw Error("numRounds must a integer >= 1");
        if ("SHA-1" === d) m = 512, u = z, q = G, h = 160;
        else throw Error("Chosen SHA variant is not supported");
        k = w(d);
        this.setHMACKey = function(a, b, e) {
            var c;
            if (!0 === v) throw Error("HMAC key already set");
            if (!0 === p) throw Error("Cannot set HMAC key after calling update");
            f = (e || {}).encoding || "UTF8";
            b =
                y(b, f)(a);
            a = b.binLen;
            b = b.value;
            c = m >>> 3;
            e = c / 4 - 1;
            if (c < a / 8) {
                for (b = q(b, a, 0, w(d)); b.length <= e;) b.push(0);
                b[e] &= 4294967040
            } else if (c > a / 8) {
                for (; b.length <= e;) b.push(0);
                b[e] &= 4294967040
            }
            for (a = 0; a <= e; a += 1) n[a] = b[a] ^ 909522486, r[a] = b[a] ^ 1549556828;
            k = u(n, k);
            g = m;
            v = !0
        };
        this.update = function(a) {
            var c, d, f, h = 0,
                q = m >>> 5;
            c = l(a, b, e);
            a = c.binLen;
            d = c.value;
            c = a >>> 5;
            for (f = 0; f < c; f += q) h + m <= a && (k = u(d.slice(f, f + q), k), h += m);
            g += h;
            b = d.slice(h >>> 5);
            e = a % m;
            p = !0
        };
        this.getHash = function(a, c) {
            var f, l, m, n;
            if (!0 === v) throw Error("Cannot call getHash after setting HMAC key");
            m = A(c);
            switch (a) {
                case "HEX":
                    f = function(a) {
                        return B(a, m)
                    };
                    break;
                case "B64":
                    f = function(a) {
                        return C(a, m)
                    };
                    break;
                case "BYTES":
                    f = D;
                    break;
                case "ARRAYBUFFER":
                    try {
                        l = new ArrayBuffer(0)
                    } catch (L) {
                        throw Error("ARRAYBUFFER not supported by this environment");
                    }
                    f = E;
                    break;
                default:
                    throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER");
            }
            n = q(b.slice(), e, g, k.slice());
            for (l = 1; l < t; l += 1) n = q(n, h, 0, w(d));
            return f(n)
        };
        this.getHMAC = function(a, c) {
            var f, l, n, p;
            if (!1 === v) throw Error("Cannot call getHMAC without first setting HMAC key");
            n = A(c);
            switch (a) {
                case "HEX":
                    f = function(a) {
                        return B(a, n)
                    };
                    break;
                case "B64":
                    f = function(a) {
                        return C(a, n)
                    };
                    break;
                case "BYTES":
                    f = D;
                    break;
                case "ARRAYBUFFER":
                    try {
                        f = new ArrayBuffer(0)
                    } catch (t) {
                        throw Error("ARRAYBUFFER not supported by this environment");
                    }
                    f = E;
                    break;
                default:
                    throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER");
            }
            l = q(b.slice(), e, g, k.slice());
            p = u(r, w(d));
            p = q(l, h, m, p);
            return f(p)
        }
    }

    function H(d, a, c) {
        var g = d.length,
            b, e, f, k, l;
        a = a || [0];
        c = c || 0;
        l = c >>> 3;
        if (0 !== g % 2) throw Error("String of HEX type must be in byte increments");
        for (b = 0; b < g; b += 2) {
            e = parseInt(d.substr(b, 2), 16);
            if (isNaN(e)) throw Error("String of HEX type contains invalid characters");
            k = (b >>> 1) + l;
            for (f = k >>> 2; a.length <= f;) a.push(0);
            a[f] |= e << 8 * (3 - k % 4)
        }
        return {
            value: a,
            binLen: 4 * g + c
        }
    }

    function I(d, a, c) {
        var g = [],
            b, e, f, k, g = a || [0];
        c = c || 0;
        e = c >>> 3;
        for (b = 0; b < d.length; b += 1) a = d.charCodeAt(b), k = b + e, f = k >>> 2, g.length <= f && g.push(0), g[f] |= a << 8 * (3 - k % 4);
        return {
            value: g,
            binLen: 8 * d.length + c
        }
    }

    function J(d, a, c) {
        var g = [],
            b = 0,
            e, f, k, l, h, m, g = a || [0];
        c = c || 0;
        a = c >>> 3;
        if (-1 === d.search(/^[a-zA-Z0-9=+\/]+$/)) throw Error("Invalid character in base-64 string");
        f = d.indexOf("=");
        d = d.replace(/\=/g, "");
        if (-1 !== f && f < d.length) throw Error("Invalid '=' found in base-64 string");
        for (f = 0; f < d.length; f += 4) {
            h = d.substr(f, 4);
            for (k = l = 0; k < h.length; k += 1) e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(h[k]), l |= e << 18 - 6 * k;
            for (k = 0; k < h.length - 1; k += 1) {
                m = b + a;
                for (e = m >>> 2; g.length <= e;) g.push(0);
                g[e] |= (l >>> 16 - 8 * k & 255) << 8 * (3 - m % 4);
                b += 1
            }
        }
        return {
            value: g,
            binLen: 8 * b + c
        }
    }

    function K(d, a, c) {
        var g = [],
            b, e, f, g = a || [0];
        c = c || 0;
        b = c >>> 3;
        for (a = 0; a < d.byteLength; a += 1) f = a +
            b, e = f >>> 2, g.length <= e && g.push(0), g[e] |= d[a] << 8 * (3 - f % 4);
        return {
            value: g,
            binLen: 8 * d.byteLength + c
        }
    }

    function B(d, a) {
        var c = "",
            g = 4 * d.length,
            b, e;
        for (b = 0; b < g; b += 1) e = d[b >>> 2] >>> 8 * (3 - b % 4), c += "0123456789abcdef".charAt(e >>> 4 & 15) + "0123456789abcdef".charAt(e & 15);
        return a.outputUpper ? c.toUpperCase() : c
    }

    function C(d, a) {
        var c = "",
            g = 4 * d.length,
            b, e, f;
        for (b = 0; b < g; b += 3)
            for (f = b + 1 >>> 2, e = d.length <= f ? 0 : d[f], f = b + 2 >>> 2, f = d.length <= f ? 0 : d[f], f = (d[b >>> 2] >>> 8 * (3 - b % 4) & 255) << 16 | (e >>> 8 * (3 - (b + 1) % 4) & 255) << 8 | f >>> 8 * (3 - (b + 2) % 4) & 255, e = 0; 4 >
                e; e += 1) 8 * b + 6 * e <= 32 * d.length ? c += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f >>> 6 * (3 - e) & 63) : c += a.b64Pad;
        return c
    }

    function D(d) {
        var a = "",
            c = 4 * d.length,
            g, b;
        for (g = 0; g < c; g += 1) b = d[g >>> 2] >>> 8 * (3 - g % 4) & 255, a += String.fromCharCode(b);
        return a
    }

    function E(d) {
        var a = 4 * d.length,
            c, g = new ArrayBuffer(a);
        for (c = 0; c < a; c += 1) g[c] = d[c >>> 2] >>> 8 * (3 - c % 4) & 255;
        return g
    }

    function A(d) {
        var a = {
            outputUpper: !1,
            b64Pad: "="
        };
        d = d || {};
        a.outputUpper = d.outputUpper || !1;
        !0 === d.hasOwnProperty("b64Pad") && (a.b64Pad =
            d.b64Pad);
        if ("boolean" !== typeof a.outputUpper) throw Error("Invalid outputUpper formatting option");
        if ("string" !== typeof a.b64Pad) throw Error("Invalid b64Pad formatting option");
        return a
    }

    function y(d, a) {
        var c;
        switch (a) {
            case "UTF8":
            case "UTF16BE":
            case "UTF16LE":
                break;
            default:
                throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");
        }
        switch (d) {
            case "HEX":
                c = H;
                break;
            case "TEXT":
                c = function(c, b, e) {
                    var f = [],
                        d = [],
                        l = 0,
                        h, m, n, q, p, f = b || [0];
                    b = e || 0;
                    n = b >>> 3;
                    if ("UTF8" === a)
                        for (h = 0; h < c.length; h += 1)
                            for (e = c.charCodeAt(h),
                                d = [], 128 > e ? d.push(e) : 2048 > e ? (d.push(192 | e >>> 6), d.push(128 | e & 63)) : 55296 > e || 57344 <= e ? d.push(224 | e >>> 12, 128 | e >>> 6 & 63, 128 | e & 63) : (h += 1, e = 65536 + ((e & 1023) << 10 | c.charCodeAt(h) & 1023), d.push(240 | e >>> 18, 128 | e >>> 12 & 63, 128 | e >>> 6 & 63, 128 | e & 63)), m = 0; m < d.length; m += 1) {
                                p = l + n;
                                for (q = p >>> 2; f.length <= q;) f.push(0);
                                f[q] |= d[m] << 8 * (3 - p % 4);
                                l += 1
                            } else if ("UTF16BE" === a || "UTF16LE" === a)
                                for (h = 0; h < c.length; h += 1) {
                                    e = c.charCodeAt(h);
                                    "UTF16LE" === a && (m = e & 255, e = m << 8 | e >>> 8);
                                    p = l + n;
                                    for (q = p >>> 2; f.length <= q;) f.push(0);
                                    f[q] |= e << 8 * (2 - p % 4);
                                    l += 2
                                }
                    return {
                        value: f,
                        binLen: 8 * l + b
                    }
                };
                break;
            case "B64":
                c = J;
                break;
            case "BYTES":
                c = I;
                break;
            case "ARRAYBUFFER":
                try {
                    c = new ArrayBuffer(0)
                } catch (g) {
                    throw Error("ARRAYBUFFER not supported by this environment");
                }
                c = K;
                break;
            default:
                throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER");
        }
        return c
    }

    function n(d, a) {
        return d << a | d >>> 32 - a
    }

    function r(d, a) {
        var c = (d & 65535) + (a & 65535);
        return ((d >>> 16) + (a >>> 16) + (c >>> 16) & 65535) << 16 | c & 65535
    }

    function x(d, a, c, g, b) {
        var e = (d & 65535) + (a & 65535) + (c & 65535) + (g & 65535) + (b & 65535);
        return ((d >>> 16) +
            (a >>> 16) + (c >>> 16) + (g >>> 16) + (b >>> 16) + (e >>> 16) & 65535) << 16 | e & 65535
    }

    function w(d) {
        if ("SHA-1" === d) d = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
        else throw Error("No SHA variants supported");
        return d
    }

    function z(d, a) {
        var c = [],
            g, b, e, f, k, l, h;
        g = a[0];
        b = a[1];
        e = a[2];
        f = a[3];
        k = a[4];
        for (h = 0; 80 > h; h += 1) c[h] = 16 > h ? d[h] : n(c[h - 3] ^ c[h - 8] ^ c[h - 14] ^ c[h - 16], 1), l = 20 > h ? x(n(g, 5), b & e ^ ~b & f, k, 1518500249, c[h]) : 40 > h ? x(n(g, 5), b ^ e ^ f, k, 1859775393, c[h]) : 60 > h ? x(n(g, 5), b & e ^ b & f ^ e & f, k, 2400959708, c[h]) : x(n(g, 5), b ^ e ^ f, k, 3395469782,
            c[h]), k = f, f = e, e = n(b, 30), b = g, g = l;
        a[0] = r(g, a[0]);
        a[1] = r(b, a[1]);
        a[2] = r(e, a[2]);
        a[3] = r(f, a[3]);
        a[4] = r(k, a[4]);
        return a
    }

    function G(d, a, c, g) {
        var b;
        for (b = (a + 65 >>> 9 << 4) + 15; d.length <= b;) d.push(0);
        d[a >>> 5] |= 128 << 24 - a % 32;
        a += c;
        d[b] = a & 4294967295;
        d[b - 1] = a / 4294967296 | 0;
        a = d.length;
        for (b = 0; b < a; b += 16) g = z(d.slice(b, b + 16), g);
        return g
    }
    "function" === typeof define && define.amd ? define(function() {
            return p
        }) : "undefined" !== typeof exports ? "undefined" !== typeof module && module.exports ? module.exports = exports = p : exports = p : F.jsSHA =
        sha
})(tsApp);


/*
 * MD5加密
 * */
(function($, window) {
    /**
     * MD5加密操作
     * @name hexMd5
     * @function
     * @example
     * tsApp.hexMd5("111");//698d51a19d8a121ce581499d7b701668
     * */
    var hexcase = 0;
    var chrsz = 8;
    $.hexMd5 = function(s) {
        return binl2hex(core_md5(str2binl(s), s.length * chrsz));
    };

    function str2binl(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz)
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
        return bin;
    }

    function binl2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
        }
        return str;
    }

    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }

    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }

    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    function core_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;

        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;

            a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
            d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

            a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
            a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
            c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
            d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);
    }
}(tsApp, window));

(function($, window) {
    /**
     * ajax重写封装,加入验签操作(只对POST做验证),需要引入zepto或者jQuery以及cookie插件
     * @name ajax
     * @function
     * @example
     * tsApp.ajax({
         type: "POST",
          url: "http://192.168.60.213/Customer/Test/TestCheck",
          dataType: "JSON",
          data: {"aaa":"11"},
          success: function (data) {
          },
          error: function (e,b) {
          }
     * })
     * */
    $.ajax = function(opts) {
        console.log(opts.data);
        var _$ = Zepto || jQuery;
        if (opts.type.toLowerCase() == "post") {
            var _SourceType = 1;
            var _UserTicket = _$.cookie("Web_UserTicket") || "";
            var _getClientBrowser = $.getClientBrowser();
            var _UserPermit = "";

            switch (_getClientBrowser) {
                case "yc":
                    _SourceType = 2;
                    _UserPermit = clientUser || "";
                    break;
                case "wx":
                    _SourceType = 3;
                    _UserPermit = _$.cookie("YC51_Web_OpenId") || "";
                    break;
                case "browser":
                    break;
                default:
            }
            var _SignStrin = "[" + JSON.stringify(opts.data) + "]" + "[" + _SourceType + "]" + "[" + _UserPermit + "]" + "[" + _UserTicket + "]";
            //  alert(_SignStrin)
            var _SignCode = $.hexMd5(_SignStrin);


            console.log(opts.data);
            opts.data = {
                //"data":JSON.stringify(opts.data)
                "data": JSON.stringify(opts.data)
            }

        }
        //  alert(JSON.stringify(opts))
        var _opts = opts;
        return _$.ajax(_opts);

    }
})(tsApp, window);

/*
 * H5调用原生
 * */
(function($, window, document) {
    /**
     * 扩展API加载完毕后执行
     * @name  plusReady
     * @function
     * @version 4.0.2
     * @example
     * tsApp.plusReady(function(plus){
     * //plus参数为全局对象WebViewJavascriptBridge
     * })
     * @return undefined
     * */
    $.plusReady = function(callback) {
        //赋值全局变量
        $.browser = $.getClientBrowser();
        if (window.clientLoadComplete == undefined && $.browser == "yc") {
            window.clientLoadComplete = function() {
                $.callWebViewBridge(callback);
            }
        } else {

            $.callWebViewBridge(callback);
        }

    };
    $.callWebViewBridge = function(callback) {
        //如果全局变量中有Bridge了,
        if (window.WebViewJavascriptBridge) {
            $.plus = window.WebViewJavascriptBridge;
            $.plus.init();
            if (typeof callback == "function") {
                callback($.plus)
            }
        } else if ($.browser != "yc") {

            if (typeof callback == "function") {
                callback()
            }
        } else {
            //监听API是否加载完毕
            document.addEventListener('WebViewJavascriptBridgeReady', function() {
                //加载完API，赋值给全局，方便后面调用
                $.plus = window.WebViewJavascriptBridge;
                $.plus.init();
                if (typeof callback == "function") {
                    callback($.plus)
                }
            }, false)
        }
    };
    var callApp = function(method, parameter, callback) {
        //如果第二参数是function，则直接回调
        var _data;
        var _len = arguments.length;
        var _argumentss = arguments;
        if (_len == 2 && typeof _argumentss[1] == "function") {
            var callback = _argumentss[1];
            $.plus.callHandler(method, "", function(data) {
                callback(data)
            });
        } else if (_len == 3) {

            $.plus.callHandler(method, parameter, function(data) {
                if (typeof _argumentss[2] == "function") {
                    callback(data)
                }
            });
        } else {
            $.plus.callHandler(method, "", function(data) {
                _data = data;
            });
        }
    };
    /**
     * H5+ 事件注册方法
     * @name  on
     * @param {String} method
     * @param {Function} callback
     * @function
     * @example
     * tsApp.on("ycBridge_onResume",function(data, responseCallback){
     * })
     * @return undefined
     * */
    $.on = function(method, callback) {
        if ($.browser == "yc") {
            $.plus.registerHandler(method, function(data, responseCallback) {
                callback(data, responseCallback)
            })
        }
    };
    /**
     * 调取经纬度
     * @name  getLocation
     * @function
     * @param function
     * @example
     * tsApp.getLocation(function(data){
     * //data: {lat:31.21445,lng:121.54154}
     * })
     * @return undefined
     * */
    $.getLocation = function(callback) {
        callApp("ycBridge_getLocation", callback)
    };
    /**
     * 调取车型信息
     * @name  getCarInfo
     * @function
     * @param {Function} callback
     * @example tsApp.getCarInfo(function(data){
     * //data: Object
     * })
     * @return undefined
     * */
    $.getCarInfo = function(callback) {
        callApp("ycBridge_getCar", callback)
    };
    /**
     * 打开新页面 url网址 4.0.5以上版本
     * @version 4.0.5
     * @param {String} url
     * @param {Function} callback
     * @name openPage
     * @function
     * @example
     * tsApp.openPage('http://www.baidu.com')
     * @return undefined
     * */
    $.openPage = function(url, callback) {
        var data = {
            url: url
        };
        callApp("ycBridge_openPage", JSON.stringify(data), callback);
    };
    /**
     * 打开app页面 4.0.5以上版本
     * @version 4.0.5
     * @name callPage
     * @function
     * @param {String} appUrl
     * @param {Function} callback
     * @example
     * tsApp.callPage('yangche51:OrderDetail?orderId=1111')
     * @return undefined
     * */
    $.callPage = function(appUrl, callback) {
        var _url = appUrl;

        callApp("ycBridge_callUrl", _url, callback);
    };
    /**
     * open集合方法 通过url参数判断执行callPage或openPage
     * @version 4.0.5
     * @name openWin
     * @function
     * @example
     * tsApp.openWin({
     *   url:'http;//www.baidu.com', // 可使用 yangche51:OrderDetail?orderId=11
     *   loc:false
     * })
     * //或
     * tsApp.open({
     *  url:'/test.html',
     *  loc:true
     * })
     * @param {Object} opts
     * @param opts.url 跳转的url地址
     * @param opts.loc 跳转的url是外链还是项目本地
     * @param {Function} callback
     * @return undefined
     * */
    $.openWin = function(opts, callback) {
        var url = opts.url;
        var isLoc = opts.loc || false;

        var expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        var _clientVersion = clientVersion.split(".");
        if (isLoc) {
            //如果是本地非外链
            var _pathName = window.location.pathname.split("/");
            var _pathLen = _pathName.length;
            var _newName = _pathName[_pathLen - 1];
            if (_newName != undefined) {
                var _reg = /\/\w+\.(shtml|html)/gi;
                var _locUrl = window.location.href;
                var _locUrlArr = _locUrl.split("?");
                if (_reg.test(_locUrl)) {
                    url = _locUrlArr[0].replace(_reg, url);
                } else {

                    url = _locUrlArr[0].replace(/\/$/gi, "") + url;
                }
            }
        }
        //在4.1.1版本之后如果不是APP客户端打开,则直接通过window.location跳转
        /* var _browser=$.getClientBrowser();
         if(_browser!="yc" && typeof clientVersion=="undefined"){
             window.location.href=url;
             return;
         }*/
        if ($.Android() || ($.iphone() && _clientVersion.length > 1)) {
            if (expression.test(url)) {
                //如果是http的url
                $.openPage(url, callback);
            } else {

                $.callPage(url, callback);
            }
        } else {
            var _openElem = document.querySelector("#openElem");
            if (_openElem == null) {
                var _openElem = document.createElement("a");
                _openElem.id = "openElem";
                document.body.appendChild(_openElem);
            }
            _openElem.href = url;
            _openElem.click();
        }
    };
    /**
     * 跳转支付页面
     * @name jumpPay
     * @function
     * @param {String} orderId
     * @param {Function} callback
     * @example
     * tsApp.jumpPay("1111",function(){
     * })
     * @return undefined
     * */
    $.jumpPay = function(orderId, callback) {
        var _orderId = orderId.toString();
        callApp("ycBridge_jumpPay", _orderId, callback);
    };
    /**
     * 跳转新支付页面(含回调)
     * @version 4.0.5
     * @name jumpPayNew
     * @function
     * @param {Object} data
     * @param {String} data.orderId
     * @param {Function} callback
     * @example
     * tsApp.jumpPayNew({orderId:11111},function(data){
     *  //data:String  返回1或者0
     * })
     * @return undefined
     * */
    $.jumpPayNew = function(data, callback) {
        var _data = JSON.stringify(data);

        callApp("ycBridge_jumpPayNew", _data, callback);
    };
    /**
     * 充油卡特殊规则 临时性，参数需要带上orderID
     * @param opts.url 跳转的url地址
     * @param opts.loc 是否为本地跳转
     * @return undefined
     * */
    $.cky = function(opts, callback) {
        var _clientVersion = clientVersion.split(".");
        var isLoc = opts.loc || false;
        var url = opts.url;
        var orderId = opts.orderId;
        if (isLoc) {
            //如果是本地非外链
            var _pathName = window.location.pathname.split("/");
            var _pathLen = _pathName.length;
            var _newName = _pathName[_pathLen - 1];
            if (_newName != undefined) {
                var _reg = /\/\w+\.(shtml|html)/gi;
                var _locUrl = window.location.href;
                if (_reg.test(_locUrl)) {
                    url = _locUrl.replace(_reg, url);
                } else {
                    var _locUrlArr = _locUrl.split("?");
                    url = _locUrlArr[0] + url;
                }
            }
        }
        if ($.iphone() && _clientVersion.length <= 1) {
            callApp("ycBridge_jumpPay", orderId, callback);
            callApp("ycBridge_cyk", url, callback);
        }
    };
    /**
     * 获取基本信息，包括车型，版本号，用户ID等
     * @version 4.0.5
     * @name getBaseInfo
     * @function
     * @param {Function} callback
     * @example
     * tsApp.getBaseInfo(function(data){
     *  //data:Object
     * })
     * @return undefined
     * */
    $.getBaseInfo = function(callback) {
        callApp("ycBridge_getBaseInfo", callback);
    };
    /**
     * 通知app开始调取H5注册事件
     * @version 4.0.5
     * @return undefined
     * */
    $.noticeCall = function(callback) {
        callApp("ycBridge_isCallHandler", callback)
    };
    /**
     * 选择车型
     * @version Android 4.0.5 | IOS 4.1.1
     * @name getNewCarInfo
     * @function
     * @param {Function} callback
     * @example
     * tsApp.getNewCarInfo(function(data){
     *  //data:Object
     * })
     * @return undefined
     * */
    $.getNewCarInfo = function(callback) {
        callApp("ycBridge_jumpAutoBrand", callback)
    };
    /**
     * 选择车型列表
     * @version Android 4.1.1 | IOS 4.1.1
     * @name getCarList
     * @function
     * @param {Function} callback
     * @example
     * tsApp.getCarList(function(data){
     *  //data:Object
     * })
     * @return undefined
     * */
    $.getCarList = function(callback) {
        callApp("ycBridge_jumpCarList", callback)
    };
    /**
     * 登录回调接口
     * @version Android 4.1.1 | IOS 4.1.1
     * @name getLogin
     * @function
     * @param {Function} callback
     * @example
     * tsApp.getLogin(function(data){
     *  //data:Object
     * })
     * @return undefined
     * */
    $.getLogin = function(callback) {
        callApp("ycBridge_jumpLogin", callback)
    };
}(tsApp, window, document));