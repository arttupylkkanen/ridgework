import { t as __commonJSMin } from "../../_runtime.mjs";
import { $t as $ZodArray, An as installLazyProp, Cn as safeParse, Dn as $constructor, En as prettifyError, Ht as _any, Jt as _isoDateTime, Mn as own, Nn as shallowClone, On as NEVER, Qt as $ZodAny, Sn as parseAsync, Tn as $ZodError, Ut as _boolean, Xt as _string, Yt as _number, Zt as _unknown, _n as $ZodTransform, an as $ZodIntersection, bn as $ZodUnknown, cn as $ZodNullable, dn as $ZodObject, en as $ZodBoolean, fn as $ZodOptional, gn as $ZodStringFormat, hn as $ZodString, in as $ZodISODateTime, jn as normalizeParams, kn as clone, ln as $ZodNumber, mn as $ZodRecord, nn as $ZodDefault, on as $ZodLazy, pn as $ZodPipe, qt as _int, rn as $ZodEnum, sn as $ZodLiteral, un as $ZodNumberFormat, vn as $ZodType, wn as safeParseAsync, xn as parse, yn as $ZodUnion } from "../@better-auth/core+[...].mjs";
//#region node_modules/@stablelib/base64/lib/base64.js
var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __extends = exports && exports.__extends || (function() {
		var extendStatics = function(d, b) {
			extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
				d.__proto__ = b;
			} || function(d, b) {
				for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
			};
			return extendStatics(d, b);
		};
		return function(d, b) {
			extendStatics(d, b);
			function __() {
				this.constructor = d;
			}
			d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	* Package base64 implements Base64 encoding and decoding.
	*/
	var INVALID_BYTE = 256;
	/**
	* Implements standard Base64 encoding.
	*
	* Operates in constant time.
	*/
	var Coder = function() {
		function Coder(_paddingCharacter) {
			if (_paddingCharacter === void 0) _paddingCharacter = "=";
			this._paddingCharacter = _paddingCharacter;
		}
		Coder.prototype.encodedLength = function(length) {
			if (!this._paddingCharacter) return (length * 8 + 5) / 6 | 0;
			return (length + 2) / 3 * 4 | 0;
		};
		Coder.prototype.encode = function(data) {
			var out = "";
			var i = 0;
			for (; i < data.length - 2; i += 3) {
				var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
				out += this._encodeByte(c >>> 18 & 63);
				out += this._encodeByte(c >>> 12 & 63);
				out += this._encodeByte(c >>> 6 & 63);
				out += this._encodeByte(c >>> 0 & 63);
			}
			var left = data.length - i;
			if (left > 0) {
				var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
				out += this._encodeByte(c >>> 18 & 63);
				out += this._encodeByte(c >>> 12 & 63);
				if (left === 2) out += this._encodeByte(c >>> 6 & 63);
				else out += this._paddingCharacter || "";
				out += this._paddingCharacter || "";
			}
			return out;
		};
		Coder.prototype.maxDecodedLength = function(length) {
			if (!this._paddingCharacter) return (length * 6 + 7) / 8 | 0;
			return length / 4 * 3 | 0;
		};
		Coder.prototype.decodedLength = function(s) {
			return this.maxDecodedLength(s.length - this._getPaddingLength(s));
		};
		Coder.prototype.decode = function(s) {
			if (s.length === 0) return /* @__PURE__ */ new Uint8Array(0);
			var paddingLength = this._getPaddingLength(s);
			var length = s.length - paddingLength;
			var out = new Uint8Array(this.maxDecodedLength(length));
			var op = 0;
			var i = 0;
			var haveBad = 0;
			var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
			for (; i < length - 4; i += 4) {
				v0 = this._decodeChar(s.charCodeAt(i + 0));
				v1 = this._decodeChar(s.charCodeAt(i + 1));
				v2 = this._decodeChar(s.charCodeAt(i + 2));
				v3 = this._decodeChar(s.charCodeAt(i + 3));
				out[op++] = v0 << 2 | v1 >>> 4;
				out[op++] = v1 << 4 | v2 >>> 2;
				out[op++] = v2 << 6 | v3;
				haveBad |= v0 & INVALID_BYTE;
				haveBad |= v1 & INVALID_BYTE;
				haveBad |= v2 & INVALID_BYTE;
				haveBad |= v3 & INVALID_BYTE;
			}
			if (i < length - 1) {
				v0 = this._decodeChar(s.charCodeAt(i));
				v1 = this._decodeChar(s.charCodeAt(i + 1));
				out[op++] = v0 << 2 | v1 >>> 4;
				haveBad |= v0 & INVALID_BYTE;
				haveBad |= v1 & INVALID_BYTE;
			}
			if (i < length - 2) {
				v2 = this._decodeChar(s.charCodeAt(i + 2));
				out[op++] = v1 << 4 | v2 >>> 2;
				haveBad |= v2 & INVALID_BYTE;
			}
			if (i < length - 3) {
				v3 = this._decodeChar(s.charCodeAt(i + 3));
				out[op++] = v2 << 6 | v3;
				haveBad |= v3 & INVALID_BYTE;
			}
			if (haveBad !== 0) throw new Error("Base64Coder: incorrect characters for decoding");
			return out;
		};
		Coder.prototype._encodeByte = function(b) {
			var result = b;
			result += 65;
			result += 25 - b >>> 8 & 6;
			result += 51 - b >>> 8 & -75;
			result += 61 - b >>> 8 & -15;
			result += 62 - b >>> 8 & 3;
			return String.fromCharCode(result);
		};
		Coder.prototype._decodeChar = function(c) {
			var result = INVALID_BYTE;
			result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
			result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
			result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
			result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
			result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
			return result;
		};
		Coder.prototype._getPaddingLength = function(s) {
			var paddingLength = 0;
			if (this._paddingCharacter) {
				for (var i = s.length - 1; i >= 0; i--) {
					if (s[i] !== this._paddingCharacter) break;
					paddingLength++;
				}
				if (s.length < 4 || paddingLength > 2) throw new Error("Base64Coder: incorrect padding");
			}
			return paddingLength;
		};
		return Coder;
	}();
	exports.Coder = Coder;
	var stdCoder = new Coder();
	function encode(data) {
		return stdCoder.encode(data);
	}
	exports.encode = encode;
	function decode(s) {
		return stdCoder.decode(s);
	}
	exports.decode = decode;
	/**
	* Implements URL-safe Base64 encoding.
	* (Same as Base64, but '+' is replaced with '-', and '/' with '_').
	*
	* Operates in constant time.
	*/
	var URLSafeCoder = function(_super) {
		__extends(URLSafeCoder, _super);
		function URLSafeCoder() {
			return _super !== null && _super.apply(this, arguments) || this;
		}
		URLSafeCoder.prototype._encodeByte = function(b) {
			var result = b;
			result += 65;
			result += 25 - b >>> 8 & 6;
			result += 51 - b >>> 8 & -75;
			result += 61 - b >>> 8 & -13;
			result += 62 - b >>> 8 & 49;
			return String.fromCharCode(result);
		};
		URLSafeCoder.prototype._decodeChar = function(c) {
			var result = INVALID_BYTE;
			result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
			result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
			result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
			result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
			result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
			return result;
		};
		return URLSafeCoder;
	}(Coder);
	exports.URLSafeCoder = URLSafeCoder;
	var urlSafeCoder = new URLSafeCoder();
	function encodeURLSafe(data) {
		return urlSafeCoder.encode(data);
	}
	exports.encodeURLSafe = encodeURLSafe;
	function decodeURLSafe(s) {
		return urlSafeCoder.decode(s);
	}
	exports.decodeURLSafe = decodeURLSafe;
	exports.encodedLength = function(length) {
		return stdCoder.encodedLength(length);
	};
	exports.maxDecodedLength = function(length) {
		return stdCoder.maxDecodedLength(length);
	};
	exports.decodedLength = function(s) {
		return stdCoder.decodedLength(s);
	};
}));
//#endregion
//#region node_modules/fast-sha256/sha256.js
var require_sha256 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		var exports$1 = {};
		factory(exports$1);
		var sha256 = exports$1["default"];
		for (var k in exports$1) sha256[k] = exports$1[k];
		if (typeof module === "object" && typeof module.exports === "object") module.exports = sha256;
		else if (typeof define === "function" && define.amd) define(function() {
			return sha256;
		});
		else root.sha256 = sha256;
	})(exports, function(exports$2) {
		"use strict";
		exports$2.__esModule = true;
		exports$2.digestLength = 32;
		exports$2.blockSize = 64;
		var K = new Uint32Array([
			1116352408,
			1899447441,
			3049323471,
			3921009573,
			961987163,
			1508970993,
			2453635748,
			2870763221,
			3624381080,
			310598401,
			607225278,
			1426881987,
			1925078388,
			2162078206,
			2614888103,
			3248222580,
			3835390401,
			4022224774,
			264347078,
			604807628,
			770255983,
			1249150122,
			1555081692,
			1996064986,
			2554220882,
			2821834349,
			2952996808,
			3210313671,
			3336571891,
			3584528711,
			113926993,
			338241895,
			666307205,
			773529912,
			1294757372,
			1396182291,
			1695183700,
			1986661051,
			2177026350,
			2456956037,
			2730485921,
			2820302411,
			3259730800,
			3345764771,
			3516065817,
			3600352804,
			4094571909,
			275423344,
			430227734,
			506948616,
			659060556,
			883997877,
			958139571,
			1322822218,
			1537002063,
			1747873779,
			1955562222,
			2024104815,
			2227730452,
			2361852424,
			2428436474,
			2756734187,
			3204031479,
			3329325298
		]);
		function hashBlocks(w, v, p, pos, len) {
			var a, b, c, d, e, f, g, h, u, i, j, t1, t2;
			while (len >= 64) {
				a = v[0];
				b = v[1];
				c = v[2];
				d = v[3];
				e = v[4];
				f = v[5];
				g = v[6];
				h = v[7];
				for (i = 0; i < 16; i++) {
					j = pos + i * 4;
					w[i] = (p[j] & 255) << 24 | (p[j + 1] & 255) << 16 | (p[j + 2] & 255) << 8 | p[j + 3] & 255;
				}
				for (i = 16; i < 64; i++) {
					u = w[i - 2];
					t1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ u >>> 10;
					u = w[i - 15];
					t2 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ u >>> 3;
					w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
				}
				for (i = 0; i < 64; i++) {
					t1 = (((e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
					t2 = ((a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10)) + (a & b ^ a & c ^ b & c) | 0;
					h = g;
					g = f;
					f = e;
					e = d + t1 | 0;
					d = c;
					c = b;
					b = a;
					a = t1 + t2 | 0;
				}
				v[0] += a;
				v[1] += b;
				v[2] += c;
				v[3] += d;
				v[4] += e;
				v[5] += f;
				v[6] += g;
				v[7] += h;
				pos += 64;
				len -= 64;
			}
			return pos;
		}
		var Hash = function() {
			function Hash() {
				this.digestLength = exports$2.digestLength;
				this.blockSize = exports$2.blockSize;
				this.state = /* @__PURE__ */ new Int32Array(8);
				this.temp = /* @__PURE__ */ new Int32Array(64);
				this.buffer = /* @__PURE__ */ new Uint8Array(128);
				this.bufferLength = 0;
				this.bytesHashed = 0;
				this.finished = false;
				this.reset();
			}
			Hash.prototype.reset = function() {
				this.state[0] = 1779033703;
				this.state[1] = 3144134277;
				this.state[2] = 1013904242;
				this.state[3] = 2773480762;
				this.state[4] = 1359893119;
				this.state[5] = 2600822924;
				this.state[6] = 528734635;
				this.state[7] = 1541459225;
				this.bufferLength = 0;
				this.bytesHashed = 0;
				this.finished = false;
				return this;
			};
			Hash.prototype.clean = function() {
				for (var i = 0; i < this.buffer.length; i++) this.buffer[i] = 0;
				for (var i = 0; i < this.temp.length; i++) this.temp[i] = 0;
				this.reset();
			};
			Hash.prototype.update = function(data, dataLength) {
				if (dataLength === void 0) dataLength = data.length;
				if (this.finished) throw new Error("SHA256: can't update because hash was finished.");
				var dataPos = 0;
				this.bytesHashed += dataLength;
				if (this.bufferLength > 0) {
					while (this.bufferLength < 64 && dataLength > 0) {
						this.buffer[this.bufferLength++] = data[dataPos++];
						dataLength--;
					}
					if (this.bufferLength === 64) {
						hashBlocks(this.temp, this.state, this.buffer, 0, 64);
						this.bufferLength = 0;
					}
				}
				if (dataLength >= 64) {
					dataPos = hashBlocks(this.temp, this.state, data, dataPos, dataLength);
					dataLength %= 64;
				}
				while (dataLength > 0) {
					this.buffer[this.bufferLength++] = data[dataPos++];
					dataLength--;
				}
				return this;
			};
			Hash.prototype.finish = function(out) {
				if (!this.finished) {
					var bytesHashed = this.bytesHashed;
					var left = this.bufferLength;
					var bitLenHi = bytesHashed / 536870912 | 0;
					var bitLenLo = bytesHashed << 3;
					var padLength = bytesHashed % 64 < 56 ? 64 : 128;
					this.buffer[left] = 128;
					for (var i = left + 1; i < padLength - 8; i++) this.buffer[i] = 0;
					this.buffer[padLength - 8] = bitLenHi >>> 24 & 255;
					this.buffer[padLength - 7] = bitLenHi >>> 16 & 255;
					this.buffer[padLength - 6] = bitLenHi >>> 8 & 255;
					this.buffer[padLength - 5] = bitLenHi >>> 0 & 255;
					this.buffer[padLength - 4] = bitLenLo >>> 24 & 255;
					this.buffer[padLength - 3] = bitLenLo >>> 16 & 255;
					this.buffer[padLength - 2] = bitLenLo >>> 8 & 255;
					this.buffer[padLength - 1] = bitLenLo >>> 0 & 255;
					hashBlocks(this.temp, this.state, this.buffer, 0, padLength);
					this.finished = true;
				}
				for (var i = 0; i < 8; i++) {
					out[i * 4 + 0] = this.state[i] >>> 24 & 255;
					out[i * 4 + 1] = this.state[i] >>> 16 & 255;
					out[i * 4 + 2] = this.state[i] >>> 8 & 255;
					out[i * 4 + 3] = this.state[i] >>> 0 & 255;
				}
				return this;
			};
			Hash.prototype.digest = function() {
				var out = new Uint8Array(this.digestLength);
				this.finish(out);
				return out;
			};
			Hash.prototype._saveState = function(out) {
				for (var i = 0; i < this.state.length; i++) out[i] = this.state[i];
			};
			Hash.prototype._restoreState = function(from, bytesHashed) {
				for (var i = 0; i < this.state.length; i++) this.state[i] = from[i];
				this.bytesHashed = bytesHashed;
				this.finished = false;
				this.bufferLength = 0;
			};
			return Hash;
		}();
		exports$2.Hash = Hash;
		var HMAC = function() {
			function HMAC(key) {
				this.inner = new Hash();
				this.outer = new Hash();
				this.blockSize = this.inner.blockSize;
				this.digestLength = this.inner.digestLength;
				var pad = new Uint8Array(this.blockSize);
				if (key.length > this.blockSize) new Hash().update(key).finish(pad).clean();
				else for (var i = 0; i < key.length; i++) pad[i] = key[i];
				for (var i = 0; i < pad.length; i++) pad[i] ^= 54;
				this.inner.update(pad);
				for (var i = 0; i < pad.length; i++) pad[i] ^= 106;
				this.outer.update(pad);
				this.istate = /* @__PURE__ */ new Uint32Array(8);
				this.ostate = /* @__PURE__ */ new Uint32Array(8);
				this.inner._saveState(this.istate);
				this.outer._saveState(this.ostate);
				for (var i = 0; i < pad.length; i++) pad[i] = 0;
			}
			HMAC.prototype.reset = function() {
				this.inner._restoreState(this.istate, this.inner.blockSize);
				this.outer._restoreState(this.ostate, this.outer.blockSize);
				return this;
			};
			HMAC.prototype.clean = function() {
				for (var i = 0; i < this.istate.length; i++) this.ostate[i] = this.istate[i] = 0;
				this.inner.clean();
				this.outer.clean();
			};
			HMAC.prototype.update = function(data) {
				this.inner.update(data);
				return this;
			};
			HMAC.prototype.finish = function(out) {
				if (this.outer.finished) this.outer.finish(out);
				else {
					this.inner.finish(out);
					this.outer.update(out, this.digestLength).finish(out);
				}
				return this;
			};
			HMAC.prototype.digest = function() {
				var out = new Uint8Array(this.digestLength);
				this.finish(out);
				return out;
			};
			return HMAC;
		}();
		exports$2.HMAC = HMAC;
		function hash(data) {
			var h = new Hash().update(data);
			var digest = h.digest();
			h.clean();
			return digest;
		}
		exports$2.hash = hash;
		exports$2["default"] = hash;
		function hmac(key, data) {
			var h = new HMAC(key).update(data);
			var digest = h.digest();
			h.clean();
			return digest;
		}
		exports$2.hmac = hmac;
		function fillBuffer(buffer, hmac, info, counter) {
			var num = counter[0];
			if (num === 0) throw new Error("hkdf: cannot expand more");
			hmac.reset();
			if (num > 1) hmac.update(buffer);
			if (info) hmac.update(info);
			hmac.update(counter);
			hmac.finish(buffer);
			counter[0]++;
		}
		var hkdfSalt = new Uint8Array(exports$2.digestLength);
		function hkdf(key, salt, info, length) {
			if (salt === void 0) salt = hkdfSalt;
			if (length === void 0) length = 32;
			var counter = new Uint8Array([1]);
			var hmac_ = new HMAC(hmac(salt, key));
			var buffer = new Uint8Array(hmac_.digestLength);
			var bufpos = buffer.length;
			var out = new Uint8Array(length);
			for (var i = 0; i < length; i++) {
				if (bufpos === buffer.length) {
					fillBuffer(buffer, hmac_, info, counter);
					bufpos = 0;
				}
				out[i] = buffer[bufpos++];
			}
			hmac_.clean();
			buffer.fill(0);
			counter.fill(0);
			return out;
		}
		exports$2.hkdf = hkdf;
		function pbkdf2(password, salt, iterations, dkLen) {
			var prf = new HMAC(password);
			var len = prf.digestLength;
			var ctr = /* @__PURE__ */ new Uint8Array(4);
			var t = new Uint8Array(len);
			var u = new Uint8Array(len);
			var dk = new Uint8Array(dkLen);
			for (var i = 0; i * len < dkLen; i++) {
				var c = i + 1;
				ctr[0] = c >>> 24 & 255;
				ctr[1] = c >>> 16 & 255;
				ctr[2] = c >>> 8 & 255;
				ctr[3] = c >>> 0 & 255;
				prf.reset();
				prf.update(salt);
				prf.update(ctr);
				prf.finish(u);
				for (var j = 0; j < len; j++) t[j] = u[j];
				for (var j = 2; j <= iterations; j++) {
					prf.reset();
					prf.update(u).finish(u);
					for (var k = 0; k < len; k++) t[k] ^= u[k];
				}
				for (var j = 0; j < len && i * len + j < dkLen; j++) dk[i * len + j] = t[j];
			}
			for (var i = 0; i < len; i++) t[i] = u[i] = 0;
			for (var i = 0; i < 4; i++) ctr[i] = 0;
			prf.clean();
			return dk;
		}
		exports$2.pbkdf2 = pbkdf2;
	});
}));
//#endregion
//#region node_modules/standardwebhooks/dist/timing_safe_equal.js
var require_timing_safe_equal = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.timingSafeEqual = timingSafeEqual;
	function assert(expr, msg = "") {
		if (!expr) throw new Error(msg);
	}
	function timingSafeEqual(a, b) {
		if (a.byteLength !== b.byteLength) return false;
		if (!(a instanceof DataView)) a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
		if (!(b instanceof DataView)) b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
		assert(a instanceof DataView);
		assert(b instanceof DataView);
		const length = a.byteLength;
		let out = 0;
		let i = -1;
		while (++i < length) out |= a.getUint8(i) ^ b.getUint8(i);
		return out === 0;
	}
}));
//#endregion
//#region node_modules/standardwebhooks/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.Webhook = exports.WebhookVerificationError = void 0;
	var base64 = require_base64();
	var sha256 = require_sha256();
	var timing_safe_equal_1 = require_timing_safe_equal();
	var WEBHOOK_TOLERANCE_IN_SECONDS = 300;
	var ExtendableError = class ExtendableError extends Error {
		constructor(message) {
			super(message);
			Object.setPrototypeOf(this, ExtendableError.prototype);
			this.name = "ExtendableError";
			this.stack = new Error(message).stack;
		}
	};
	var WebhookVerificationError = class WebhookVerificationError extends ExtendableError {
		constructor(message) {
			super(message);
			Object.setPrototypeOf(this, WebhookVerificationError.prototype);
			this.name = "WebhookVerificationError";
		}
	};
	exports.WebhookVerificationError = WebhookVerificationError;
	var Webhook = class Webhook {
		constructor(secret, options) {
			if ((options === null || options === void 0 ? void 0 : options.format) === "raw") {
				if (secret instanceof Uint8Array) this.key = secret;
				else this.key = Uint8Array.from(secret, (c) => c.charCodeAt(0));
			} else {
				if (typeof secret !== "string") throw new Error("Expected secret to be of type string");
				if (secret.startsWith(Webhook.prefix)) secret = secret.substring(Webhook.prefix.length);
				this.key = base64.decode(secret);
			}
			if (this.key.length === 0) throw new Error("Secret can't be empty.");
		}
		verify(payload, headers, options) {
			var _a;
			const jsonParse = (_a = options === null || options === void 0 ? void 0 : options.jsonParse) !== null && _a !== void 0 ? _a : true;
			const normalizedHeaders = {};
			for (const key of Object.keys(headers)) normalizedHeaders[key.toLowerCase()] = headers[key];
			const msgId = normalizedHeaders["webhook-id"];
			const msgSignature = normalizedHeaders["webhook-signature"];
			const msgTimestamp = normalizedHeaders["webhook-timestamp"];
			if (!msgSignature || !msgId || !msgTimestamp) throw new WebhookVerificationError("Missing required headers");
			const timestamp = this.verifyTimestamp(msgTimestamp);
			const expectedSignature = this.sign(msgId, timestamp, payload).split(",")[1];
			const passedSignatures = msgSignature.split(" ");
			const encoder = new globalThis.TextEncoder();
			for (const versionedSignature of passedSignatures) {
				const [version, signature] = versionedSignature.split(",");
				if (version !== "v1") continue;
				if ((0, timing_safe_equal_1.timingSafeEqual)(encoder.encode(signature), encoder.encode(expectedSignature))) {
					const payloadString = payload.toString();
					if (payloadString === "") return;
					if (jsonParse) return JSON.parse(payloadString);
					else return;
				}
			}
			throw new WebhookVerificationError("No matching signature found");
		}
		sign(msgId, timestamp, payload) {
			if (typeof payload === "string") {} else if (payload.constructor.name === "Buffer") payload = payload.toString();
			else throw new Error("Expected payload to be of type string or Buffer.");
			const encoder = new TextEncoder();
			const timestampNumber = Math.floor(timestamp.getTime() / 1e3);
			const toSign = encoder.encode(`${msgId}.${timestampNumber}.${payload}`);
			return `v1,${base64.encode(sha256.hmac(this.key, toSign))}`;
		}
		verifyTimestamp(timestampHeader) {
			const now = Math.floor(Date.now() / 1e3);
			const timestamp = parseInt(timestampHeader, 10);
			if (Number.isNaN(timestamp)) throw new WebhookVerificationError("Invalid Signature Headers");
			if (now - timestamp > WEBHOOK_TOLERANCE_IN_SECONDS) throw new WebhookVerificationError("Message timestamp too old");
			if (timestamp > now + WEBHOOK_TOLERANCE_IN_SECONDS) throw new WebhookVerificationError("Message timestamp too new");
			return /* @__PURE__ */ new Date(timestamp * 1e3);
		}
	};
	exports.Webhook = Webhook;
	Webhook.prefix = "whsec_";
}));
//#endregion
//#region node_modules/zod/v4/mini/schemas.js
var ZodMiniType = /*@__PURE__*/ $constructor("ZodMiniType", (inst, def) => {
	if (!inst._zod) throw new Error("Uninitialized schema in ZodMiniType.");
	$ZodType.init(inst, def);
	inst.def = def;
	inst.type = def.type;
}, {
	get with() {
		return this.check;
	},
	set with(value) {
		own(this, "with", value);
	},
	parse(data, params) {
		return parse(this, data, params, { callee: this.parse });
	},
	parseAsync(data, params) {
		return parseAsync(this, data, params, { callee: this.parseAsync });
	},
	safeParse(data, params) {
		return safeParse(this, data, params);
	},
	safeParseAsync(data, params) {
		return safeParseAsync(this, data, params);
	},
	check(...checks) {
		const def = this.def;
		return this.clone({
			...def,
			checks: [...def.checks ?? [], ...checks.map((ch) => typeof ch === "function" ? { _zod: {
				check: ch,
				def: { check: "custom" },
				onattach: []
			} } : ch)]
		}, { parent: true });
	},
	clone(_def, params) {
		return clone(this, _def, params);
	},
	brand() {
		return this;
	},
	register(reg, meta) {
		reg.add(this, meta);
		return this;
	},
	apply(fn, ...args) {
		return args.length === 0 ? fn(this) : fn(this, ...args);
	}
});
var ZodMiniString = /*@__PURE__*/ $constructor("ZodMiniString", (inst, def) => {
	$ZodString.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function string(params) {
	return _string(ZodMiniString, params);
}
var ZodMiniStringFormat = /*@__PURE__*/ $constructor("ZodMiniStringFormat", (inst, def) => {
	$ZodStringFormat.init(inst, def);
	ZodMiniString.init(inst, def);
});
var ZodMiniNumber = /*@__PURE__*/ $constructor("ZodMiniNumber", (inst, def) => {
	$ZodNumber.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function number(params) {
	return _number(ZodMiniNumber, params);
}
var ZodMiniNumberFormat = /*@__PURE__*/ $constructor("ZodMiniNumberFormat", (inst, def) => {
	$ZodNumberFormat.init(inst, def);
	ZodMiniNumber.init(inst, def);
});
function int(params) {
	return _int(ZodMiniNumberFormat, params);
}
var ZodMiniBoolean = /*@__PURE__*/ $constructor("ZodMiniBoolean", (inst, def) => {
	$ZodBoolean.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function boolean(params) {
	return _boolean(ZodMiniBoolean, params);
}
var ZodMiniAny = /*@__PURE__*/ $constructor("ZodMiniAny", (inst, def) => {
	$ZodAny.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function any() {
	return _any(ZodMiniAny);
}
var ZodMiniUnknown = /*@__PURE__*/ $constructor("ZodMiniUnknown", (inst, def) => {
	$ZodUnknown.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function unknown() {
	return _unknown(ZodMiniUnknown);
}
var ZodMiniArray = /*@__PURE__*/ $constructor("ZodMiniArray", (inst, def) => {
	$ZodArray.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function array(element, params) {
	return new ZodMiniArray({
		type: "array",
		element,
		...normalizeParams(params)
	});
}
var ZodMiniObject = /*@__PURE__*/ $constructor("ZodMiniObject", (inst, def) => {
	$ZodObject.init(inst, def);
	ZodMiniType.init(inst, def);
	installLazyProp(inst, "shape", (self) => self._zod.def.shape, false);
});
// @__NO_SIDE_EFFECTS__
function object(shape, params) {
	return new ZodMiniObject({
		type: "object",
		shape: shape ?? {},
		...normalizeParams(params)
	});
}
var ZodMiniUnion = /*@__PURE__*/ $constructor("ZodMiniUnion", (inst, def) => {
	$ZodUnion.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function union(options, params) {
	return new ZodMiniUnion({
		type: "union",
		options,
		...normalizeParams(params)
	});
}
var ZodMiniIntersection = /*@__PURE__*/ $constructor("ZodMiniIntersection", (inst, def) => {
	$ZodIntersection.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function intersection(left, right) {
	return new ZodMiniIntersection({
		type: "intersection",
		left,
		right
	});
}
var ZodMiniRecord = /*@__PURE__*/ $constructor("ZodMiniRecord", (inst, def) => {
	$ZodRecord.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function record(keyType, valueType, params) {
	if (!valueType || !valueType._zod) return new ZodMiniRecord({
		type: "record",
		keyType: /* @__PURE__ */ string(),
		valueType: keyType,
		...normalizeParams(valueType)
	});
	return new ZodMiniRecord({
		type: "record",
		keyType,
		valueType,
		...normalizeParams(params)
	});
}
var ZodMiniEnum = /*@__PURE__*/ $constructor("ZodMiniEnum", (inst, def) => {
	$ZodEnum.init(inst, def);
	ZodMiniType.init(inst, def);
	inst.options = Object.values(def.entries);
});
// @__NO_SIDE_EFFECTS__
function _enum(values, params) {
	return new ZodMiniEnum({
		type: "enum",
		entries: Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values,
		...normalizeParams(params)
	});
}
var ZodMiniLiteral = /*@__PURE__*/ $constructor("ZodMiniLiteral", (inst, def) => {
	$ZodLiteral.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function literal(value, params) {
	return new ZodMiniLiteral({
		type: "literal",
		values: Array.isArray(value) ? value : [value],
		...normalizeParams(params)
	});
}
var ZodMiniTransform = /*@__PURE__*/ $constructor("ZodMiniTransform", (inst, def) => {
	$ZodTransform.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function transform(fn) {
	return new ZodMiniTransform({
		type: "transform",
		transform: fn
	});
}
var ZodMiniOptional = /*@__PURE__*/ $constructor("ZodMiniOptional", (inst, def) => {
	$ZodOptional.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function optional(innerType) {
	return new ZodMiniOptional({
		type: "optional",
		innerType
	});
}
var ZodMiniNullable = /*@__PURE__*/ $constructor("ZodMiniNullable", (inst, def) => {
	$ZodNullable.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function nullable(innerType) {
	return new ZodMiniNullable({
		type: "nullable",
		innerType
	});
}
var ZodMiniDefault = /*@__PURE__*/ $constructor("ZodMiniDefault", (inst, def) => {
	$ZodDefault.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _default(innerType, defaultValue) {
	return new ZodMiniDefault({
		type: "default",
		innerType,
		get defaultValue() {
			return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
		}
	});
}
var ZodMiniPipe = /*@__PURE__*/ $constructor("ZodMiniPipe", (inst, def) => {
	$ZodPipe.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function pipe(in_, out) {
	return new ZodMiniPipe({
		type: "pipe",
		in: in_,
		out
	});
}
var ZodMiniLazy = /*@__PURE__*/ $constructor("ZodMiniLazy", (inst, def) => {
	$ZodLazy.init(inst, def);
	ZodMiniType.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function _lazy(getter) {
	return new ZodMiniLazy({
		type: "lazy",
		getter
	});
}
//#endregion
//#region node_modules/zod/v4/mini/iso.js
var ZodMiniISODateTime = /*@__PURE__*/ $constructor("ZodMiniISODateTime", (inst, def) => {
	$ZodISODateTime.init(inst, def);
	ZodMiniStringFormat.init(inst, def);
});
// @__NO_SIDE_EFFECTS__
function datetime(params) {
	return _isoDateTime(ZodMiniISODateTime, params);
}
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/errors/sdkvalidationerror.js
var import_dist = require_dist();
var SDKValidationError = class extends Error {
	static [Symbol.hasInstance](instance) {
		if (!(instance instanceof Error)) return false;
		if (!("rawValue" in instance)) return false;
		if (!("rawMessage" in instance)) return false;
		if (!("pretty" in instance)) return false;
		if (typeof instance.pretty !== "function") return false;
		return true;
	}
	constructor(message, cause, rawValue) {
		super(`${message}: ${cause}`);
		this.name = "SDKValidationError";
		this.cause = cause;
		this.rawValue = rawValue;
		this.rawMessage = message;
	}
	/**
	* Return a pretty-formatted error message if the underlying validation error
	* is a ZodError or some other recognized error type, otherwise return the
	* default error message.
	*/
	pretty() {
		if (this.cause instanceof $ZodError) return `${this.rawMessage}\n${formatZodError(this.cause)}`;
		else return this.toString();
	}
};
function formatZodError(err) {
	return prettifyError(err);
}
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/lib/primitives.js
/**
* Converts or omits an object's keys according to a mapping.
*
* @param inp An object whose keys will be remapped
* @param mappings A mapping of original keys to new keys. If a key is not present in the mapping, it will be left as is. If a key is mapped to `null`, it will be removed in the resulting object.
* @returns A new object with keys remapped or omitted according to the mappings
*/
function remap(inp, mappings) {
	let out = {};
	if (!Object.keys(mappings).length) {
		out = inp;
		return out;
	}
	for (const [k, v] of Object.entries(inp)) {
		const j = mappings[k];
		if (j === null) continue;
		out[j ?? k] = v;
	}
	return out;
}
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitcustomproperties.js
/** @internal */
var BenefitCustomProperties$inboundSchema = /* @__PURE__ */ object({ note: /* @__PURE__ */ nullable(/* @__PURE__ */ string()) });
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/types/unrecognized.js
function unrecognized(value) {
	globalCount++;
	return value;
}
var globalCount = 0;
var refCount = 0;
function startCountingUnrecognized() {
	refCount++;
	const start = globalCount;
	return { 
	/**
	* Ends counting and returns the delta.
	* @param delta - If provided, only this amount is added to the parent counter
	*   (used for nested unions where we only want to record the winning option's count).
	*   If not provided, records all counts since start().
	*/
end: (delta) => {
		const count = globalCount - start;
		globalCount = start + (delta ?? count);
		if (--refCount === 0) globalCount = 0;
		return count;
	} };
}
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/types/enums.js
function inboundSchema(enumObj) {
	return /* @__PURE__ */ union([...Object.values(enumObj).map((x) => /* @__PURE__ */ literal(x)), /* @__PURE__ */ pipe(/* @__PURE__ */ string(), /* @__PURE__ */ transform((x) => unrecognized(x)))]);
}
function outboundSchema(_) {
	return /* @__PURE__ */ string();
}
/** @internal */
var BenefitVisibility$inboundSchema = inboundSchema({
	Draft: "draft",
	Private: "private",
	Public: "public"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/types/rfcdate.js
var dateRE = /^\d{4}-\d{2}-\d{2}$/;
var RFCDate = class RFCDate {
	/**
	* Creates a new RFCDate instance using today's date.
	*/
	static today() {
		return new RFCDate(/* @__PURE__ */ new Date());
	}
	/**
	* Creates a new RFCDate instance using the provided input.
	* If a string is used then in must be in the format YYYY-MM-DD.
	*
	* @param date A Date object or a date string in YYYY-MM-DD format
	* @example
	* new RFCDate("2022-01-01")
	* @example
	* new RFCDate(new Date())
	*/
	constructor(date) {
		if (typeof date === "string" && !dateRE.test(date)) throw new RangeError("RFCDate: date strings must be in the format YYYY-MM-DD: " + date);
		const value = new Date(date);
		if (isNaN(+value)) throw new RangeError("RFCDate: invalid date provided: " + date);
		this.serialized = value.toISOString().slice(0, 10);
		if (!dateRE.test(this.serialized)) throw new TypeError(`RFCDate: failed to build valid date with given value: ${date} serialized to ${this.serialized}`);
	}
	toJSON() {
		return this.toString();
	}
	toString() {
		return this.serialized;
	}
};
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/types/smartUnion.js
/**
* Smart union parser that tries all schemas and returns the best match
* based on the number of populated fields.
*/
function smartUnion(options) {
	return /* @__PURE__ */ pipe(/* @__PURE__ */ unknown(), /* @__PURE__ */ transform((input, ctx) => {
		const candidates = [];
		const errors = options.map(() => []);
		const parentUnrecognizedCtr = startCountingUnrecognized();
		for (const [i, option] of options.entries()) {
			const unrecognizedCtr = startCountingUnrecognized();
			const result = option.safeParse(input);
			const inexactCount = unrecognizedCtr.end();
			const zeroDefaultCount = 0;
			if (result.success) {
				candidates.push({
					data: result.data,
					inexactCount,
					zeroDefaultCount,
					fieldCount: -1
				});
				continue;
			}
			errors[i].push(...result.error.issues);
		}
		if (candidates.length === 0) {
			parentUnrecognizedCtr.end(0);
			ctx.issues.push({
				input,
				code: "invalid_union",
				errors
			});
			return NEVER;
		}
		let best = candidates[0];
		for (const candidate of candidates) {
			if (candidates.length > 1) candidate.fieldCount = countFieldsRecursive(candidate.data);
			best = better(candidate, best);
		}
		parentUnrecognizedCtr.end(best.inexactCount);
		return best.data;
	}));
}
function better(a, b) {
	const aIsExact = a.inexactCount === 0;
	if (aIsExact !== (b.inexactCount === 0)) return aIsExact ? a : b;
	const actualFieldCountA = a.fieldCount - a.zeroDefaultCount;
	const actualFieldCountB = b.fieldCount - b.zeroDefaultCount;
	if (actualFieldCountA !== actualFieldCountB) return actualFieldCountA > actualFieldCountB ? a : b;
	return a.inexactCount < b.inexactCount ? a : b;
}
/**
* Counts the number of fields in a parsed value recursively.
* @param `parsed` assumed to *not* contain cycles
* fieldCount: total number of fields found
* inexactCount: number of primitive values that are not unrecognized enum values
*/
function countFieldsRecursive(parsed) {
	let fieldCount = 0;
	const queue = [parsed];
	let index = 0;
	while (index < queue.length) {
		const value = queue[index++];
		if (value === void 0) continue;
		const type = typeof value;
		if (value === null || type === "number" || type === "string" || type === "boolean" || type === "bigint" || value instanceof Date || value instanceof RFCDate) {
			fieldCount++;
			continue;
		}
		if (Array.isArray(value)) {
			queue.push(...value);
			continue;
		}
		if (type === "object") queue.push(...Object.values(value));
	}
	return fieldCount;
}
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/metadataoutputtype.js
/** @internal */
var MetadataOutputType$inboundSchema = smartUnion([
	/* @__PURE__ */ string(),
	int(),
	/* @__PURE__ */ number(),
	/* @__PURE__ */ boolean()
]);
int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitcustom.js
/** @internal */
var BenefitCustom$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	type: /* @__PURE__ */ literal("custom"),
	description: /* @__PURE__ */ string(),
	selectable: /* @__PURE__ */ boolean(),
	deletable: /* @__PURE__ */ boolean(),
	is_deleted: /* @__PURE__ */ boolean(),
	organization_id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	visibility: BenefitVisibility$inboundSchema,
	properties: BenefitCustomProperties$inboundSchema,
	visibility_configurable: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"is_deleted": "isDeleted",
		"organization_id": "organizationId",
		"visibility_configurable": "visibilityConfigurable"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitdiscord.js
/** @internal */
var BenefitDiscord$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	type: /* @__PURE__ */ literal("discord"),
	description: /* @__PURE__ */ string(),
	selectable: /* @__PURE__ */ boolean(),
	deletable: /* @__PURE__ */ boolean(),
	is_deleted: /* @__PURE__ */ boolean(),
	organization_id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	visibility: BenefitVisibility$inboundSchema,
	properties: /* @__PURE__ */ pipe(/* @__PURE__ */ object({
		guild_id: /* @__PURE__ */ string(),
		role_id: /* @__PURE__ */ string(),
		kick_member: /* @__PURE__ */ boolean(),
		guild_token: /* @__PURE__ */ string()
	}), /* @__PURE__ */ transform((v) => {
		return remap(v, {
			"guild_id": "guildId",
			"role_id": "roleId",
			"kick_member": "kickMember",
			"guild_token": "guildToken"
		});
	})),
	visibility_configurable: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"is_deleted": "isDeleted",
		"organization_id": "organizationId",
		"visibility_configurable": "visibilityConfigurable"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitdownloadables.js
/** @internal */
var BenefitDownloadables$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	type: /* @__PURE__ */ literal("downloadables"),
	description: /* @__PURE__ */ string(),
	selectable: /* @__PURE__ */ boolean(),
	deletable: /* @__PURE__ */ boolean(),
	is_deleted: /* @__PURE__ */ boolean(),
	organization_id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	visibility: BenefitVisibility$inboundSchema,
	properties: /* @__PURE__ */ object({
		archived: /* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ boolean()),
		files: /* @__PURE__ */ array(/* @__PURE__ */ string())
	}),
	visibility_configurable: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"is_deleted": "isDeleted",
		"organization_id": "organizationId",
		"visibility_configurable": "visibilityConfigurable"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitfeatureflag.js
/** @internal */
var BenefitFeatureFlag$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	type: /* @__PURE__ */ literal("feature_flag"),
	description: /* @__PURE__ */ string(),
	selectable: /* @__PURE__ */ boolean(),
	deletable: /* @__PURE__ */ boolean(),
	is_deleted: /* @__PURE__ */ boolean(),
	organization_id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	visibility: BenefitVisibility$inboundSchema,
	properties: /* @__PURE__ */ object({}),
	visibility_configurable: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"is_deleted": "isDeleted",
		"organization_id": "organizationId",
		"visibility_configurable": "visibilityConfigurable"
	});
}));
/** @internal */
var Permission$inboundSchema = inboundSchema({
	Pull: "pull",
	Triage: "triage",
	Push: "push",
	Maintain: "maintain",
	Admin: "admin"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgithubrepository.js
/** @internal */
var BenefitGitHubRepository$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	type: /* @__PURE__ */ literal("github_repository"),
	description: /* @__PURE__ */ string(),
	selectable: /* @__PURE__ */ boolean(),
	deletable: /* @__PURE__ */ boolean(),
	is_deleted: /* @__PURE__ */ boolean(),
	organization_id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	visibility: BenefitVisibility$inboundSchema,
	properties: /* @__PURE__ */ pipe(/* @__PURE__ */ object({
		repository_owner: /* @__PURE__ */ string(),
		repository_name: /* @__PURE__ */ string(),
		permission: Permission$inboundSchema
	}), /* @__PURE__ */ transform((v) => {
		return remap(v, {
			"repository_owner": "repositoryOwner",
			"repository_name": "repositoryName"
		});
	})),
	visibility_configurable: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"is_deleted": "isDeleted",
		"organization_id": "organizationId",
		"visibility_configurable": "visibilityConfigurable"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitlicensekeyactivationproperties.js
/** @internal */
var BenefitLicenseKeyActivationProperties$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	limit: int(),
	enable_customer_admin: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, { "enable_customer_admin": "enableCustomerAdmin" });
}));
int();
/** @internal */
var Timeframe$inboundSchema = inboundSchema({
	Year: "year",
	Month: "month",
	Day: "day"
});
/** @internal */
var BenefitLicenseKeyExpirationProperties$inboundSchema = /* @__PURE__ */ object({
	ttl: int(),
	timeframe: Timeframe$inboundSchema
});
int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitlicensekeysproperties.js
/** @internal */
var BenefitLicenseKeysProperties$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	prefix: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	expires: /* @__PURE__ */ nullable(BenefitLicenseKeyExpirationProperties$inboundSchema),
	activations: /* @__PURE__ */ nullable(BenefitLicenseKeyActivationProperties$inboundSchema),
	limit_usage: /* @__PURE__ */ nullable(int())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, { "limit_usage": "limitUsage" });
}));
int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitlicensekeys.js
/** @internal */
var BenefitLicenseKeys$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	type: /* @__PURE__ */ literal("license_keys"),
	description: /* @__PURE__ */ string(),
	selectable: /* @__PURE__ */ boolean(),
	deletable: /* @__PURE__ */ boolean(),
	is_deleted: /* @__PURE__ */ boolean(),
	organization_id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	visibility: BenefitVisibility$inboundSchema,
	properties: BenefitLicenseKeysProperties$inboundSchema,
	visibility_configurable: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"is_deleted": "isDeleted",
		"organization_id": "organizationId",
		"visibility_configurable": "visibilityConfigurable"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitmetercreditproperties.js
/** @internal */
var BenefitMeterCreditProperties$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	units: int(),
	rollover: /* @__PURE__ */ boolean(),
	meter_id: /* @__PURE__ */ string()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, { "meter_id": "meterId" });
}));
int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitmetercredit.js
/** @internal */
var BenefitMeterCredit$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	type: /* @__PURE__ */ literal("meter_credit"),
	description: /* @__PURE__ */ string(),
	selectable: /* @__PURE__ */ boolean(),
	deletable: /* @__PURE__ */ boolean(),
	is_deleted: /* @__PURE__ */ boolean(),
	organization_id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	visibility: BenefitVisibility$inboundSchema,
	properties: BenefitMeterCreditProperties$inboundSchema,
	visibility_configurable: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"is_deleted": "isDeleted",
		"organization_id": "organizationId",
		"visibility_configurable": "visibilityConfigurable"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitslacksharedchannel.js
/** @internal */
var BenefitSlackSharedChannel$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	type: /* @__PURE__ */ literal("slack_shared_channel"),
	description: /* @__PURE__ */ string(),
	selectable: /* @__PURE__ */ boolean(),
	deletable: /* @__PURE__ */ boolean(),
	is_deleted: /* @__PURE__ */ boolean(),
	organization_id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	visibility: BenefitVisibility$inboundSchema,
	properties: /* @__PURE__ */ pipe(/* @__PURE__ */ object({
		slack_integration_id: /* @__PURE__ */ string(),
		channel_name_template: /* @__PURE__ */ string(),
		private: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), true),
		welcome_message: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
		archive_on_revoke: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), true),
		team_invitees: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string()))
	}), /* @__PURE__ */ transform((v) => {
		return remap(v, {
			"slack_integration_id": "slackIntegrationId",
			"channel_name_template": "channelNameTemplate",
			"welcome_message": "welcomeMessage",
			"archive_on_revoke": "archiveOnRevoke",
			"team_invitees": "teamInvitees"
		});
	})),
	visibility_configurable: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"is_deleted": "isDeleted",
		"organization_id": "organizationId",
		"visibility_configurable": "visibilityConfigurable"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefit.js
/** @internal */
var Benefit$inboundSchema = /* @__PURE__ */ union([
	BenefitCustom$inboundSchema,
	BenefitDiscord$inboundSchema,
	BenefitDownloadables$inboundSchema,
	BenefitFeatureFlag$inboundSchema,
	BenefitGitHubRepository$inboundSchema,
	BenefitLicenseKeys$inboundSchema,
	BenefitMeterCredit$inboundSchema,
	BenefitSlackSharedChannel$inboundSchema
]);
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookbenefitcreatedpayload.js
/** @internal */
var WebhookBenefitCreatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("benefit.created"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Benefit$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantcustomproperties.js
/** @internal */
var BenefitGrantCustomProperties$inboundSchema = /* @__PURE__ */ object({});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgranterror.js
/** @internal */
var BenefitGrantError$inboundSchema = /* @__PURE__ */ object({
	message: /* @__PURE__ */ string(),
	type: /* @__PURE__ */ string(),
	timestamp: /* @__PURE__ */ string()
});
/** @internal */
var AddressCountryAlpha2$inboundSchema = inboundSchema({
	Ad: "AD",
	Ae: "AE",
	Af: "AF",
	Ag: "AG",
	Ai: "AI",
	Al: "AL",
	Am: "AM",
	Ao: "AO",
	Aq: "AQ",
	Ar: "AR",
	As: "AS",
	At: "AT",
	Au: "AU",
	Aw: "AW",
	Ax: "AX",
	Az: "AZ",
	Ba: "BA",
	Bb: "BB",
	Bd: "BD",
	Be: "BE",
	Bf: "BF",
	Bg: "BG",
	Bh: "BH",
	Bi: "BI",
	Bj: "BJ",
	Bl: "BL",
	Bm: "BM",
	Bn: "BN",
	Bo: "BO",
	Bq: "BQ",
	Br: "BR",
	Bs: "BS",
	Bt: "BT",
	Bv: "BV",
	Bw: "BW",
	By: "BY",
	Bz: "BZ",
	Ca: "CA",
	Cc: "CC",
	Cd: "CD",
	Cf: "CF",
	Cg: "CG",
	Ch: "CH",
	Ci: "CI",
	Ck: "CK",
	Cl: "CL",
	Cm: "CM",
	Cn: "CN",
	Co: "CO",
	Cr: "CR",
	Cu: "CU",
	Cv: "CV",
	Cw: "CW",
	Cx: "CX",
	Cy: "CY",
	Cz: "CZ",
	De: "DE",
	Dj: "DJ",
	Dk: "DK",
	Dm: "DM",
	Do: "DO",
	Dz: "DZ",
	Ec: "EC",
	Ee: "EE",
	Eg: "EG",
	Eh: "EH",
	Er: "ER",
	Es: "ES",
	Et: "ET",
	Fi: "FI",
	Fj: "FJ",
	Fk: "FK",
	Fm: "FM",
	Fo: "FO",
	Fr: "FR",
	Ga: "GA",
	Gb: "GB",
	Gd: "GD",
	Ge: "GE",
	Gf: "GF",
	Gg: "GG",
	Gh: "GH",
	Gi: "GI",
	Gl: "GL",
	Gm: "GM",
	Gn: "GN",
	Gp: "GP",
	Gq: "GQ",
	Gr: "GR",
	Gs: "GS",
	Gt: "GT",
	Gu: "GU",
	Gw: "GW",
	Gy: "GY",
	Hk: "HK",
	Hm: "HM",
	Hn: "HN",
	Hr: "HR",
	Ht: "HT",
	Hu: "HU",
	Id: "ID",
	Ie: "IE",
	Il: "IL",
	Im: "IM",
	In: "IN",
	Io: "IO",
	Iq: "IQ",
	Ir: "IR",
	Is: "IS",
	It: "IT",
	Je: "JE",
	Jm: "JM",
	Jo: "JO",
	Jp: "JP",
	Ke: "KE",
	Kg: "KG",
	Kh: "KH",
	Ki: "KI",
	Km: "KM",
	Kn: "KN",
	Kp: "KP",
	Kr: "KR",
	Kw: "KW",
	Ky: "KY",
	Kz: "KZ",
	La: "LA",
	Lb: "LB",
	Lc: "LC",
	Li: "LI",
	Lk: "LK",
	Lr: "LR",
	Ls: "LS",
	Lt: "LT",
	Lu: "LU",
	Lv: "LV",
	Ly: "LY",
	Ma: "MA",
	Mc: "MC",
	Md: "MD",
	Me: "ME",
	Mf: "MF",
	Mg: "MG",
	Mh: "MH",
	Mk: "MK",
	Ml: "ML",
	Mm: "MM",
	Mn: "MN",
	Mo: "MO",
	Mp: "MP",
	Mq: "MQ",
	Mr: "MR",
	Ms: "MS",
	Mt: "MT",
	Mu: "MU",
	Mv: "MV",
	Mw: "MW",
	Mx: "MX",
	My: "MY",
	Mz: "MZ",
	Na: "NA",
	Nc: "NC",
	Ne: "NE",
	Nf: "NF",
	Ng: "NG",
	Ni: "NI",
	Nl: "NL",
	No: "NO",
	Np: "NP",
	Nr: "NR",
	Nu: "NU",
	Nz: "NZ",
	Om: "OM",
	Pa: "PA",
	Pe: "PE",
	Pf: "PF",
	Pg: "PG",
	Ph: "PH",
	Pk: "PK",
	Pl: "PL",
	Pm: "PM",
	Pn: "PN",
	Pr: "PR",
	Ps: "PS",
	Pt: "PT",
	Pw: "PW",
	Py: "PY",
	Qa: "QA",
	Re: "RE",
	Ro: "RO",
	Rs: "RS",
	Ru: "RU",
	Rw: "RW",
	Sa: "SA",
	Sb: "SB",
	Sc: "SC",
	Sd: "SD",
	Se: "SE",
	Sg: "SG",
	Sh: "SH",
	Si: "SI",
	Sj: "SJ",
	Sk: "SK",
	Sl: "SL",
	Sm: "SM",
	Sn: "SN",
	So: "SO",
	Sr: "SR",
	Ss: "SS",
	St: "ST",
	Sv: "SV",
	Sx: "SX",
	Sy: "SY",
	Sz: "SZ",
	Tc: "TC",
	Td: "TD",
	Tf: "TF",
	Tg: "TG",
	Th: "TH",
	Tj: "TJ",
	Tk: "TK",
	Tl: "TL",
	Tm: "TM",
	Tn: "TN",
	To: "TO",
	Tr: "TR",
	Tt: "TT",
	Tv: "TV",
	Tw: "TW",
	Tz: "TZ",
	Ua: "UA",
	Ug: "UG",
	Um: "UM",
	Us: "US",
	Uy: "UY",
	Uz: "UZ",
	Va: "VA",
	Vc: "VC",
	Ve: "VE",
	Vg: "VG",
	Vi: "VI",
	Vn: "VN",
	Vu: "VU",
	Wf: "WF",
	Ws: "WS",
	Ye: "YE",
	Yt: "YT",
	Za: "ZA",
	Zm: "ZM",
	Zw: "ZW"
});
/** @internal */
var Address$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	line1: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	line2: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	postal_code: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	city: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	state: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	country: AddressCountryAlpha2$inboundSchema
}), /* @__PURE__ */ transform((v) => {
	return remap(v, { "postal_code": "postalCode" });
}));
/** @internal */
var TaxIDFormat$inboundSchema = inboundSchema({
	AdNrt: "ad_nrt",
	AeTrn: "ae_trn",
	ArCuit: "ar_cuit",
	AuAbn: "au_abn",
	AuArn: "au_arn",
	BgUic: "bg_uic",
	BhVat: "bh_vat",
	BoTin: "bo_tin",
	BrCnpj: "br_cnpj",
	BrCpf: "br_cpf",
	CaBn: "ca_bn",
	CaGstHst: "ca_gst_hst",
	CaPstBc: "ca_pst_bc",
	CaPstMb: "ca_pst_mb",
	CaPstSk: "ca_pst_sk",
	CaQst: "ca_qst",
	ChUid: "ch_uid",
	ChVat: "ch_vat",
	ClTin: "cl_tin",
	CnTin: "cn_tin",
	CoNit: "co_nit",
	CrTin: "cr_tin",
	DeStn: "de_stn",
	DoRcn: "do_rcn",
	EcRuc: "ec_ruc",
	EgTin: "eg_tin",
	EsCif: "es_cif",
	EuOssVat: "eu_oss_vat",
	EuVat: "eu_vat",
	GbVat: "gb_vat",
	GeVat: "ge_vat",
	HkBr: "hk_br",
	HrOib: "hr_oib",
	HuTin: "hu_tin",
	IdNpwp: "id_npwp",
	IlVat: "il_vat",
	InGst: "in_gst",
	IsVat: "is_vat",
	JpCn: "jp_cn",
	JpRn: "jp_rn",
	JpTrn: "jp_trn",
	KePin: "ke_pin",
	KrBrn: "kr_brn",
	KzBin: "kz_bin",
	LiUid: "li_uid",
	MkVat: "mk_vat",
	MxRfc: "mx_rfc",
	MyFrp: "my_frp",
	MyItn: "my_itn",
	MySst: "my_sst",
	NgTin: "ng_tin",
	NoVat: "no_vat",
	NoVoec: "no_voec",
	NzGst: "nz_gst",
	OmVat: "om_vat",
	PeRuc: "pe_ruc",
	PhTin: "ph_tin",
	RoTin: "ro_tin",
	RsPib: "rs_pib",
	RuInn: "ru_inn",
	RuKpp: "ru_kpp",
	SaVat: "sa_vat",
	SgGst: "sg_gst",
	SgUen: "sg_uen",
	SiTin: "si_tin",
	SvNit: "sv_nit",
	ThVat: "th_vat",
	TrTin: "tr_tin",
	TwVat: "tw_vat",
	UaVat: "ua_vat",
	UsEin: "us_ein",
	UyRuc: "uy_ruc",
	VeRif: "ve_rif",
	VnTin: "vn_tin",
	ZaVat: "za_vat",
	MuTan: "mu_tan"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/customer.js
/** @internal */
var Customer$inboundSchema = /* @__PURE__ */ union([/* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	external_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	email: /* @__PURE__ */ string(),
	email_verified: /* @__PURE__ */ boolean(),
	type: /* @__PURE__ */ literal("individual"),
	name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_address: /* @__PURE__ */ nullable(Address$inboundSchema),
	tax_id: /* @__PURE__ */ nullable(/* @__PURE__ */ array(/* @__PURE__ */ nullable(smartUnion([/* @__PURE__ */ string(), TaxIDFormat$inboundSchema])))),
	locale: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	organization_id: /* @__PURE__ */ string(),
	default_payment_method_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	deleted_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	avatar_url: /* @__PURE__ */ nullable(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"external_id": "externalId",
		"email_verified": "emailVerified",
		"billing_name": "billingName",
		"billing_address": "billingAddress",
		"tax_id": "taxId",
		"organization_id": "organizationId",
		"default_payment_method_id": "defaultPaymentMethodId",
		"deleted_at": "deletedAt",
		"avatar_url": "avatarUrl"
	});
})), /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	external_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	email: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	email_verified: /* @__PURE__ */ boolean(),
	type: /* @__PURE__ */ literal("team"),
	name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_address: /* @__PURE__ */ nullable(Address$inboundSchema),
	tax_id: /* @__PURE__ */ nullable(/* @__PURE__ */ array(/* @__PURE__ */ nullable(smartUnion([/* @__PURE__ */ string(), TaxIDFormat$inboundSchema])))),
	locale: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	organization_id: /* @__PURE__ */ string(),
	default_payment_method_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	deleted_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	avatar_url: /* @__PURE__ */ nullable(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"external_id": "externalId",
		"email_verified": "emailVerified",
		"billing_name": "billingName",
		"billing_address": "billingAddress",
		"tax_id": "taxId",
		"organization_id": "organizationId",
		"default_payment_method_id": "defaultPaymentMethodId",
		"deleted_at": "deletedAt",
		"avatar_url": "avatarUrl"
	});
}))]);
/** @internal */
var MemberRole$inboundSchema = inboundSchema({
	Owner: "owner",
	BillingManager: "billing_manager",
	Member: "member"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/member.js
/** @internal */
var Member$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	customer_id: /* @__PURE__ */ string(),
	email: /* @__PURE__ */ string(),
	name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	external_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	role: MemberRole$inboundSchema
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"customer_id": "customerId",
		"external_id": "externalId"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantcustomwebhook.js
/** @internal */
var BenefitGrantCustomWebhook$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	granted_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_granted: /* @__PURE__ */ boolean(),
	revoked_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_revoked: /* @__PURE__ */ boolean(),
	subscription_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	order_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_id: /* @__PURE__ */ string(),
	member_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	benefit_id: /* @__PURE__ */ string(),
	error: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantError$inboundSchema)),
	customer: Customer$inboundSchema,
	member: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(Member$inboundSchema)),
	benefit: BenefitCustom$inboundSchema,
	properties: BenefitGrantCustomProperties$inboundSchema,
	previous_properties: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantCustomProperties$inboundSchema))
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"granted_at": "grantedAt",
		"is_granted": "isGranted",
		"revoked_at": "revokedAt",
		"is_revoked": "isRevoked",
		"subscription_id": "subscriptionId",
		"order_id": "orderId",
		"customer_id": "customerId",
		"member_id": "memberId",
		"benefit_id": "benefitId",
		"previous_properties": "previousProperties"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantdiscordproperties.js
/** @internal */
var BenefitGrantDiscordProperties$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	account_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	guild_id: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	role_id: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	granted_account_id: /* @__PURE__ */ optional(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"account_id": "accountId",
		"guild_id": "guildId",
		"role_id": "roleId",
		"granted_account_id": "grantedAccountId"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantdiscordwebhook.js
/** @internal */
var BenefitGrantDiscordWebhook$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	granted_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_granted: /* @__PURE__ */ boolean(),
	revoked_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_revoked: /* @__PURE__ */ boolean(),
	subscription_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	order_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_id: /* @__PURE__ */ string(),
	member_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	benefit_id: /* @__PURE__ */ string(),
	error: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantError$inboundSchema)),
	customer: Customer$inboundSchema,
	member: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(Member$inboundSchema)),
	benefit: BenefitDiscord$inboundSchema,
	properties: BenefitGrantDiscordProperties$inboundSchema,
	previous_properties: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantDiscordProperties$inboundSchema))
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"granted_at": "grantedAt",
		"is_granted": "isGranted",
		"revoked_at": "revokedAt",
		"is_revoked": "isRevoked",
		"subscription_id": "subscriptionId",
		"order_id": "orderId",
		"customer_id": "customerId",
		"member_id": "memberId",
		"benefit_id": "benefitId",
		"previous_properties": "previousProperties"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantdownloadablesproperties.js
/** @internal */
var BenefitGrantDownloadablesProperties$inboundSchema = /* @__PURE__ */ object({ files: /* @__PURE__ */ optional(/* @__PURE__ */ array(/* @__PURE__ */ string())) });
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantdownloadableswebhook.js
/** @internal */
var BenefitGrantDownloadablesWebhook$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	granted_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_granted: /* @__PURE__ */ boolean(),
	revoked_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_revoked: /* @__PURE__ */ boolean(),
	subscription_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	order_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_id: /* @__PURE__ */ string(),
	member_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	benefit_id: /* @__PURE__ */ string(),
	error: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantError$inboundSchema)),
	customer: Customer$inboundSchema,
	member: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(Member$inboundSchema)),
	benefit: BenefitDownloadables$inboundSchema,
	properties: BenefitGrantDownloadablesProperties$inboundSchema,
	previous_properties: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantDownloadablesProperties$inboundSchema))
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"granted_at": "grantedAt",
		"is_granted": "isGranted",
		"revoked_at": "revokedAt",
		"is_revoked": "isRevoked",
		"subscription_id": "subscriptionId",
		"order_id": "orderId",
		"customer_id": "customerId",
		"member_id": "memberId",
		"benefit_id": "benefitId",
		"previous_properties": "previousProperties"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantfeatureflagproperties.js
/** @internal */
var BenefitGrantFeatureFlagProperties$inboundSchema = /* @__PURE__ */ object({});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantfeatureflagwebhook.js
/** @internal */
var BenefitGrantFeatureFlagWebhook$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	granted_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_granted: /* @__PURE__ */ boolean(),
	revoked_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_revoked: /* @__PURE__ */ boolean(),
	subscription_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	order_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_id: /* @__PURE__ */ string(),
	member_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	benefit_id: /* @__PURE__ */ string(),
	error: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantError$inboundSchema)),
	customer: Customer$inboundSchema,
	member: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(Member$inboundSchema)),
	benefit: BenefitFeatureFlag$inboundSchema,
	properties: BenefitGrantFeatureFlagProperties$inboundSchema,
	previous_properties: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantFeatureFlagProperties$inboundSchema))
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"granted_at": "grantedAt",
		"is_granted": "isGranted",
		"revoked_at": "revokedAt",
		"is_revoked": "isRevoked",
		"subscription_id": "subscriptionId",
		"order_id": "orderId",
		"customer_id": "customerId",
		"member_id": "memberId",
		"benefit_id": "benefitId",
		"previous_properties": "previousProperties"
	});
}));
/** @internal */
var BenefitGrantGitHubRepositoryPropertiesPermission$inboundSchema = inboundSchema({
	Pull: "pull",
	Triage: "triage",
	Push: "push",
	Maintain: "maintain",
	Admin: "admin"
});
/** @internal */
var BenefitGrantGitHubRepositoryProperties$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	account_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	repository_owner: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	repository_name: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	permission: /* @__PURE__ */ optional(BenefitGrantGitHubRepositoryPropertiesPermission$inboundSchema),
	granted_account_id: /* @__PURE__ */ optional(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"account_id": "accountId",
		"repository_owner": "repositoryOwner",
		"repository_name": "repositoryName",
		"granted_account_id": "grantedAccountId"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantgithubrepositorywebhook.js
/** @internal */
var BenefitGrantGitHubRepositoryWebhook$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	granted_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_granted: /* @__PURE__ */ boolean(),
	revoked_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_revoked: /* @__PURE__ */ boolean(),
	subscription_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	order_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_id: /* @__PURE__ */ string(),
	member_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	benefit_id: /* @__PURE__ */ string(),
	error: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantError$inboundSchema)),
	customer: Customer$inboundSchema,
	member: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(Member$inboundSchema)),
	benefit: BenefitGitHubRepository$inboundSchema,
	properties: BenefitGrantGitHubRepositoryProperties$inboundSchema,
	previous_properties: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantGitHubRepositoryProperties$inboundSchema))
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"granted_at": "grantedAt",
		"is_granted": "isGranted",
		"revoked_at": "revokedAt",
		"is_revoked": "isRevoked",
		"subscription_id": "subscriptionId",
		"order_id": "orderId",
		"customer_id": "customerId",
		"member_id": "memberId",
		"benefit_id": "benefitId",
		"previous_properties": "previousProperties"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantlicensekeysproperties.js
/** @internal */
var BenefitGrantLicenseKeysProperties$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	user_provided_key: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	license_key_id: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	display_key: /* @__PURE__ */ optional(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"user_provided_key": "userProvidedKey",
		"license_key_id": "licenseKeyId",
		"display_key": "displayKey"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantlicensekeyswebhook.js
/** @internal */
var BenefitGrantLicenseKeysWebhook$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	granted_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_granted: /* @__PURE__ */ boolean(),
	revoked_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_revoked: /* @__PURE__ */ boolean(),
	subscription_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	order_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_id: /* @__PURE__ */ string(),
	member_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	benefit_id: /* @__PURE__ */ string(),
	error: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantError$inboundSchema)),
	customer: Customer$inboundSchema,
	member: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(Member$inboundSchema)),
	benefit: BenefitLicenseKeys$inboundSchema,
	properties: BenefitGrantLicenseKeysProperties$inboundSchema,
	previous_properties: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantLicenseKeysProperties$inboundSchema))
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"granted_at": "grantedAt",
		"is_granted": "isGranted",
		"revoked_at": "revokedAt",
		"is_revoked": "isRevoked",
		"subscription_id": "subscriptionId",
		"order_id": "orderId",
		"customer_id": "customerId",
		"member_id": "memberId",
		"benefit_id": "benefitId",
		"previous_properties": "previousProperties"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantmetercreditproperties.js
/** @internal */
var BenefitGrantMeterCreditProperties$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	last_credited_meter_id: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	last_credited_units: /* @__PURE__ */ optional(int()),
	last_credited_at: /* @__PURE__ */ optional(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"last_credited_meter_id": "lastCreditedMeterId",
		"last_credited_units": "lastCreditedUnits",
		"last_credited_at": "lastCreditedAt"
	});
}));
int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantmetercreditwebhook.js
/** @internal */
var BenefitGrantMeterCreditWebhook$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	granted_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_granted: /* @__PURE__ */ boolean(),
	revoked_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	is_revoked: /* @__PURE__ */ boolean(),
	subscription_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	order_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_id: /* @__PURE__ */ string(),
	member_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	benefit_id: /* @__PURE__ */ string(),
	error: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantError$inboundSchema)),
	customer: Customer$inboundSchema,
	member: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(Member$inboundSchema)),
	benefit: BenefitMeterCredit$inboundSchema,
	properties: BenefitGrantMeterCreditProperties$inboundSchema,
	previous_properties: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantMeterCreditProperties$inboundSchema))
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"granted_at": "grantedAt",
		"is_granted": "isGranted",
		"revoked_at": "revokedAt",
		"is_revoked": "isRevoked",
		"subscription_id": "subscriptionId",
		"order_id": "orderId",
		"customer_id": "customerId",
		"member_id": "memberId",
		"benefit_id": "benefitId",
		"previous_properties": "previousProperties"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantslacksharedchannelproperties.js
/** @internal */
var BenefitGrantSlackSharedChannelProperties$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	invited_email: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	channel_id: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	channel_name: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	invite_id: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	invite_url: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	connected_team_id: /* @__PURE__ */ optional(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"invited_email": "invitedEmail",
		"channel_id": "channelId",
		"channel_name": "channelName",
		"invite_id": "inviteId",
		"invite_url": "inviteUrl",
		"connected_team_id": "connectedTeamId"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitgrantwebhook.js
/** @internal */
var BenefitGrantWebhook$inboundSchema = smartUnion([
	BenefitGrantDiscordWebhook$inboundSchema,
	BenefitGrantCustomWebhook$inboundSchema,
	BenefitGrantGitHubRepositoryWebhook$inboundSchema,
	BenefitGrantDownloadablesWebhook$inboundSchema,
	BenefitGrantLicenseKeysWebhook$inboundSchema,
	BenefitGrantMeterCreditWebhook$inboundSchema,
	BenefitGrantFeatureFlagWebhook$inboundSchema,
	/* @__PURE__ */ pipe(/* @__PURE__ */ object({
		created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
		modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
		id: /* @__PURE__ */ string(),
		granted_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
		is_granted: /* @__PURE__ */ boolean(),
		revoked_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
		is_revoked: /* @__PURE__ */ boolean(),
		subscription_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
		order_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
		customer_id: /* @__PURE__ */ string(),
		member_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
		benefit_id: /* @__PURE__ */ string(),
		error: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantError$inboundSchema)),
		customer: Customer$inboundSchema,
		member: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(Member$inboundSchema)),
		benefit: BenefitSlackSharedChannel$inboundSchema,
		properties: BenefitGrantSlackSharedChannelProperties$inboundSchema,
		previous_properties: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(BenefitGrantSlackSharedChannelProperties$inboundSchema))
	}), /* @__PURE__ */ transform((v) => {
		return remap(v, {
			"created_at": "createdAt",
			"modified_at": "modifiedAt",
			"granted_at": "grantedAt",
			"is_granted": "isGranted",
			"revoked_at": "revokedAt",
			"is_revoked": "isRevoked",
			"subscription_id": "subscriptionId",
			"order_id": "orderId",
			"customer_id": "customerId",
			"member_id": "memberId",
			"benefit_id": "benefitId",
			"previous_properties": "previousProperties"
		});
	}))
]);
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookbenefitgrantcreatedpayload.js
/** @internal */
var WebhookBenefitGrantCreatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("benefit_grant.created"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: BenefitGrantWebhook$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookbenefitgrantrevokedpayload.js
/** @internal */
var WebhookBenefitGrantRevokedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("benefit_grant.revoked"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: BenefitGrantWebhook$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookbenefitgrantupdatedpayload.js
/** @internal */
var WebhookBenefitGrantUpdatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("benefit_grant.updated"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: BenefitGrantWebhook$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookbenefitgrantcycledpayload.js
/** @internal */
var WebhookBenefitGrantCycledPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("benefit_grant.cycled"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: BenefitGrantWebhook$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookbenefitupdatedpayload.js
/** @internal */
var WebhookBenefitUpdatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("benefit.updated"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Benefit$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/customfieldcheckbox.js
/** @internal */
var CustomFieldCheckbox$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	type: /* @__PURE__ */ literal("checkbox"),
	slug: /* @__PURE__ */ string(),
	name: /* @__PURE__ */ string(),
	organization_id: /* @__PURE__ */ string(),
	properties: /* @__PURE__ */ pipe(/* @__PURE__ */ object({
		form_label: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
		form_help_text: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
		form_placeholder: /* @__PURE__ */ optional(/* @__PURE__ */ string())
	}), /* @__PURE__ */ transform((v) => {
		return remap(v, {
			"form_label": "formLabel",
			"form_help_text": "formHelpText",
			"form_placeholder": "formPlaceholder"
		});
	}))
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"organization_id": "organizationId"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/customfielddateproperties.js
/** @internal */
var CustomFieldDateProperties$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	form_label: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	form_help_text: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	form_placeholder: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	ge: /* @__PURE__ */ optional(int()),
	le: /* @__PURE__ */ optional(int())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"form_label": "formLabel",
		"form_help_text": "formHelpText",
		"form_placeholder": "formPlaceholder"
	});
}));
int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/customfielddate.js
/** @internal */
var CustomFieldDate$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	type: /* @__PURE__ */ literal("date"),
	slug: /* @__PURE__ */ string(),
	name: /* @__PURE__ */ string(),
	organization_id: /* @__PURE__ */ string(),
	properties: CustomFieldDateProperties$inboundSchema
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"organization_id": "organizationId"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/customfieldnumberproperties.js
/** @internal */
var CustomFieldNumberProperties$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	form_label: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	form_help_text: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	form_placeholder: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	ge: /* @__PURE__ */ optional(int()),
	le: /* @__PURE__ */ optional(int())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"form_label": "formLabel",
		"form_help_text": "formHelpText",
		"form_placeholder": "formPlaceholder"
	});
}));
int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/customfieldnumber.js
/** @internal */
var CustomFieldNumber$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	type: /* @__PURE__ */ literal("number"),
	slug: /* @__PURE__ */ string(),
	name: /* @__PURE__ */ string(),
	organization_id: /* @__PURE__ */ string(),
	properties: CustomFieldNumberProperties$inboundSchema
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"organization_id": "organizationId"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/customfieldselect.js
/** @internal */
var CustomFieldSelect$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	type: /* @__PURE__ */ literal("select"),
	slug: /* @__PURE__ */ string(),
	name: /* @__PURE__ */ string(),
	organization_id: /* @__PURE__ */ string(),
	properties: /* @__PURE__ */ pipe(/* @__PURE__ */ object({
		form_label: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
		form_help_text: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
		form_placeholder: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
		options: /* @__PURE__ */ array(/* @__PURE__ */ object({
			value: /* @__PURE__ */ string(),
			label: /* @__PURE__ */ string()
		}))
	}), /* @__PURE__ */ transform((v) => {
		return remap(v, {
			"form_label": "formLabel",
			"form_help_text": "formHelpText",
			"form_placeholder": "formPlaceholder"
		});
	}))
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"organization_id": "organizationId"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/customfieldtextproperties.js
/** @internal */
var CustomFieldTextProperties$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	form_label: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	form_help_text: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	form_placeholder: /* @__PURE__ */ optional(/* @__PURE__ */ string()),
	textarea: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()),
	min_length: /* @__PURE__ */ optional(int()),
	max_length: /* @__PURE__ */ optional(int())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"form_label": "formLabel",
		"form_help_text": "formHelpText",
		"form_placeholder": "formPlaceholder",
		"min_length": "minLength",
		"max_length": "maxLength"
	});
}));
int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/attachedcustomfield.js
/** @internal */
var AttachedCustomField$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	custom_field_id: /* @__PURE__ */ string(),
	custom_field: /* @__PURE__ */ union([
		CustomFieldCheckbox$inboundSchema,
		CustomFieldDate$inboundSchema,
		CustomFieldNumber$inboundSchema,
		CustomFieldSelect$inboundSchema,
		/* @__PURE__ */ pipe(/* @__PURE__ */ object({
			created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
			modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
			id: /* @__PURE__ */ string(),
			metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
			type: /* @__PURE__ */ literal("text"),
			slug: /* @__PURE__ */ string(),
			name: /* @__PURE__ */ string(),
			organization_id: /* @__PURE__ */ string(),
			properties: CustomFieldTextProperties$inboundSchema
		}), /* @__PURE__ */ transform((v) => {
			return remap(v, {
				"created_at": "createdAt",
				"modified_at": "modifiedAt",
				"organization_id": "organizationId"
			});
		}))
	]),
	order: int(),
	required: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"custom_field_id": "customFieldId",
		"custom_field": "customField"
	});
}));
int();
/** @internal */
var BillingAddressFieldMode$inboundSchema = inboundSchema({
	Required: "required",
	Optional: "optional",
	Disabled: "disabled"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/checkoutbillingaddressfields.js
/** @internal */
var CheckoutBillingAddressFields$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	country: BillingAddressFieldMode$inboundSchema,
	state: BillingAddressFieldMode$inboundSchema,
	city: BillingAddressFieldMode$inboundSchema,
	postal_code: BillingAddressFieldMode$inboundSchema,
	line1: BillingAddressFieldMode$inboundSchema,
	line2: BillingAddressFieldMode$inboundSchema
}), /* @__PURE__ */ transform((v) => {
	return remap(v, { "postal_code": "postalCode" });
}));
/** @internal */
var DiscountDuration$inboundSchema = inboundSchema({
	Once: "once",
	Forever: "forever",
	Repeating: "repeating"
});
/** @internal */
var DiscountType$inboundSchema = inboundSchema({
	Fixed: "fixed",
	Percentage: "percentage"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/checkoutdiscountfixedonceforeverduration.js
/** @internal */
var CheckoutDiscountFixedOnceForeverDuration$inboundSchema = /* @__PURE__ */ object({
	duration: DiscountDuration$inboundSchema,
	type: DiscountType$inboundSchema,
	amount: int(),
	currency: /* @__PURE__ */ string(),
	amounts: /* @__PURE__ */ record(/* @__PURE__ */ string(), int()),
	id: /* @__PURE__ */ string(),
	name: /* @__PURE__ */ string(),
	code: /* @__PURE__ */ nullable(/* @__PURE__ */ string())
});
int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/checkoutdiscountfixedrepeatduration.js
/** @internal */
var CheckoutDiscountFixedRepeatDuration$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	duration: DiscountDuration$inboundSchema,
	duration_in_months: int(),
	type: DiscountType$inboundSchema,
	amount: int(),
	currency: /* @__PURE__ */ string(),
	amounts: /* @__PURE__ */ record(/* @__PURE__ */ string(), int()),
	id: /* @__PURE__ */ string(),
	name: /* @__PURE__ */ string(),
	code: /* @__PURE__ */ nullable(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, { "duration_in_months": "durationInMonths" });
}));
int(), int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/checkoutdiscountpercentageonceforeverduration.js
/** @internal */
var CheckoutDiscountPercentageOnceForeverDuration$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	duration: DiscountDuration$inboundSchema,
	type: DiscountType$inboundSchema,
	basis_points: int(),
	id: /* @__PURE__ */ string(),
	name: /* @__PURE__ */ string(),
	code: /* @__PURE__ */ nullable(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, { "basis_points": "basisPoints" });
}));
int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/checkoutdiscountpercentagerepeatduration.js
/** @internal */
var CheckoutDiscountPercentageRepeatDuration$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	duration: DiscountDuration$inboundSchema,
	duration_in_months: int(),
	type: DiscountType$inboundSchema,
	basis_points: int(),
	id: /* @__PURE__ */ string(),
	name: /* @__PURE__ */ string(),
	code: /* @__PURE__ */ nullable(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"duration_in_months": "durationInMonths",
		"basis_points": "basisPoints"
	});
}));
int(), int();
/** @internal */
var BenefitType$inboundSchema = inboundSchema({
	Custom: "custom",
	Discord: "discord",
	GithubRepository: "github_repository",
	Downloadables: "downloadables",
	LicenseKeys: "license_keys",
	MeterCredit: "meter_credit",
	FeatureFlag: "feature_flag",
	SlackSharedChannel: "slack_shared_channel"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/benefitpublic.js
/** @internal */
var BenefitPublic$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	type: BenefitType$inboundSchema,
	description: /* @__PURE__ */ string(),
	selectable: /* @__PURE__ */ boolean(),
	deletable: /* @__PURE__ */ boolean(),
	is_deleted: /* @__PURE__ */ boolean(),
	organization_id: /* @__PURE__ */ string()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"is_deleted": "isDeleted",
		"organization_id": "organizationId"
	});
}));
/** @internal */
var ProductPriceSource$inboundSchema = inboundSchema({
	Catalog: "catalog",
	AdHoc: "ad_hoc"
});
/** @internal */
var RecurringInterval$inboundSchema = inboundSchema({
	Day: "day",
	Week: "week",
	Month: "month",
	Year: "year"
});
/** @internal */
var TaxBehaviorOption$inboundSchema = inboundSchema({
	Location: "location",
	Inclusive: "inclusive",
	Exclusive: "exclusive"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/legacyrecurringproductpricecustom.js
/** @internal */
var LegacyRecurringProductPriceCustom$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	source: ProductPriceSource$inboundSchema,
	amount_type: /* @__PURE__ */ literal("custom"),
	price_currency: /* @__PURE__ */ string(),
	tax_behavior: /* @__PURE__ */ nullable(TaxBehaviorOption$inboundSchema),
	is_archived: /* @__PURE__ */ boolean(),
	product_id: /* @__PURE__ */ string(),
	type: /* @__PURE__ */ literal("recurring"),
	recurring_interval: RecurringInterval$inboundSchema,
	minimum_amount: int(),
	maximum_amount: /* @__PURE__ */ nullable(int()),
	preset_amount: /* @__PURE__ */ nullable(int()),
	legacy: /* @__PURE__ */ literal(true)
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"amount_type": "amountType",
		"price_currency": "priceCurrency",
		"tax_behavior": "taxBehavior",
		"is_archived": "isArchived",
		"product_id": "productId",
		"recurring_interval": "recurringInterval",
		"minimum_amount": "minimumAmount",
		"maximum_amount": "maximumAmount",
		"preset_amount": "presetAmount"
	});
}));
int(), int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/legacyrecurringproductpricefixed.js
/** @internal */
var LegacyRecurringProductPriceFixed$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	source: ProductPriceSource$inboundSchema,
	amount_type: /* @__PURE__ */ literal("fixed"),
	price_currency: /* @__PURE__ */ string(),
	tax_behavior: /* @__PURE__ */ nullable(TaxBehaviorOption$inboundSchema),
	is_archived: /* @__PURE__ */ boolean(),
	product_id: /* @__PURE__ */ string(),
	type: /* @__PURE__ */ literal("recurring"),
	recurring_interval: RecurringInterval$inboundSchema,
	price_amount: int(),
	legacy: /* @__PURE__ */ literal(true)
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"amount_type": "amountType",
		"price_currency": "priceCurrency",
		"tax_behavior": "taxBehavior",
		"is_archived": "isArchived",
		"product_id": "productId",
		"recurring_interval": "recurringInterval",
		"price_amount": "priceAmount"
	});
}));
int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/legacyrecurringproductprice.js
/** @internal */
var LegacyRecurringProductPrice$inboundSchema = /* @__PURE__ */ union([LegacyRecurringProductPriceCustom$inboundSchema, LegacyRecurringProductPriceFixed$inboundSchema]);
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/productmediafileread.js
/** @internal */
var ProductMediaFileRead$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	organization_id: /* @__PURE__ */ string(),
	name: /* @__PURE__ */ string(),
	path: /* @__PURE__ */ string(),
	mime_type: /* @__PURE__ */ string(),
	size: int(),
	storage_version: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	checksum_etag: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	checksum_sha256_base64: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	checksum_sha256_hex: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	last_modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	version: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	service: /* @__PURE__ */ literal("product_media"),
	is_uploaded: /* @__PURE__ */ boolean(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	size_readable: /* @__PURE__ */ string(),
	public_url: /* @__PURE__ */ string()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"organization_id": "organizationId",
		"mime_type": "mimeType",
		"storage_version": "storageVersion",
		"checksum_etag": "checksumEtag",
		"checksum_sha256_base64": "checksumSha256Base64",
		"checksum_sha256_hex": "checksumSha256Hex",
		"last_modified_at": "lastModifiedAt",
		"is_uploaded": "isUploaded",
		"created_at": "createdAt",
		"size_readable": "sizeReadable",
		"public_url": "publicUrl"
	});
}));
int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/productpricecustom.js
/** @internal */
var ProductPriceCustom$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	source: ProductPriceSource$inboundSchema,
	amount_type: /* @__PURE__ */ literal("custom"),
	price_currency: /* @__PURE__ */ string(),
	tax_behavior: /* @__PURE__ */ nullable(TaxBehaviorOption$inboundSchema),
	is_archived: /* @__PURE__ */ boolean(),
	product_id: /* @__PURE__ */ string(),
	minimum_amount: int(),
	maximum_amount: /* @__PURE__ */ nullable(int()),
	preset_amount: /* @__PURE__ */ nullable(int())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"amount_type": "amountType",
		"price_currency": "priceCurrency",
		"tax_behavior": "taxBehavior",
		"is_archived": "isArchived",
		"product_id": "productId",
		"minimum_amount": "minimumAmount",
		"maximum_amount": "maximumAmount",
		"preset_amount": "presetAmount"
	});
}));
int(), int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/productpricefixed.js
/** @internal */
var ProductPriceFixed$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	source: ProductPriceSource$inboundSchema,
	amount_type: /* @__PURE__ */ literal("fixed"),
	price_currency: /* @__PURE__ */ string(),
	tax_behavior: /* @__PURE__ */ nullable(TaxBehaviorOption$inboundSchema),
	is_archived: /* @__PURE__ */ boolean(),
	product_id: /* @__PURE__ */ string(),
	price_amount: int()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"amount_type": "amountType",
		"price_currency": "priceCurrency",
		"tax_behavior": "taxBehavior",
		"is_archived": "isArchived",
		"product_id": "productId",
		"price_amount": "priceAmount"
	});
}));
int();
/** @internal */
var MeterUnit$inboundSchema = inboundSchema({
	Scalar: "scalar",
	Token: "token",
	Custom: "custom"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/productpricemeter.js
/** @internal */
var ProductPriceMeter$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	name: /* @__PURE__ */ string(),
	unit: MeterUnit$inboundSchema,
	custom_label: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	custom_multiplier: /* @__PURE__ */ nullable(int())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"custom_label": "customLabel",
		"custom_multiplier": "customMultiplier"
	});
}));
int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/productpricemeteredunit.js
/** @internal */
var ProductPriceMeteredUnit$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	source: ProductPriceSource$inboundSchema,
	amount_type: /* @__PURE__ */ literal("metered_unit"),
	price_currency: /* @__PURE__ */ string(),
	tax_behavior: /* @__PURE__ */ nullable(TaxBehaviorOption$inboundSchema),
	is_archived: /* @__PURE__ */ boolean(),
	product_id: /* @__PURE__ */ string(),
	unit_amount: /* @__PURE__ */ string(),
	cap_amount: /* @__PURE__ */ nullable(int()),
	meter_id: /* @__PURE__ */ string(),
	meter: ProductPriceMeter$inboundSchema
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"amount_type": "amountType",
		"price_currency": "priceCurrency",
		"tax_behavior": "taxBehavior",
		"is_archived": "isArchived",
		"product_id": "productId",
		"unit_amount": "unitAmount",
		"cap_amount": "capAmount",
		"meter_id": "meterId"
	});
}));
int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/productpriceseattier.js
/** @internal */
var ProductPriceSeatTier$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	min_seats: int(),
	max_seats: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(int())),
	price_per_seat: int()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"min_seats": "minSeats",
		"max_seats": "maxSeats",
		"price_per_seat": "pricePerSeat"
	});
}));
int(), int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/productpriceseattiersoutput.js
/** @internal */
var ProductPriceSeatTiersOutput$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	seat_tier_type: /* @__PURE__ */ optional(inboundSchema({
		Volume: "volume",
		Graduated: "graduated"
	})),
	tiers: /* @__PURE__ */ array(ProductPriceSeatTier$inboundSchema),
	minimum_seats: int(),
	maximum_seats: /* @__PURE__ */ nullable(int())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"seat_tier_type": "seatTierType",
		"minimum_seats": "minimumSeats",
		"maximum_seats": "maximumSeats"
	});
}));
int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/productprice.js
/** @internal */
var ProductPrice$inboundSchema = /* @__PURE__ */ union([
	ProductPriceCustom$inboundSchema,
	ProductPriceFixed$inboundSchema,
	ProductPriceMeteredUnit$inboundSchema,
	/* @__PURE__ */ pipe(/* @__PURE__ */ object({
		created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
		modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
		id: /* @__PURE__ */ string(),
		source: ProductPriceSource$inboundSchema,
		amount_type: /* @__PURE__ */ literal("seat_based"),
		price_currency: /* @__PURE__ */ string(),
		tax_behavior: /* @__PURE__ */ nullable(TaxBehaviorOption$inboundSchema),
		is_archived: /* @__PURE__ */ boolean(),
		product_id: /* @__PURE__ */ string(),
		seat_tiers: ProductPriceSeatTiersOutput$inboundSchema
	}), /* @__PURE__ */ transform((v) => {
		return remap(v, {
			"created_at": "createdAt",
			"modified_at": "modifiedAt",
			"amount_type": "amountType",
			"price_currency": "priceCurrency",
			"tax_behavior": "taxBehavior",
			"is_archived": "isArchived",
			"product_id": "productId",
			"seat_tiers": "seatTiers"
		});
	}))
]);
/** @internal */
var ProductVisibility$inboundSchema = inboundSchema({
	Draft: "draft",
	Private: "private",
	Public: "public"
});
/** @internal */
var TrialInterval$inboundSchema = inboundSchema({
	Day: "day",
	Week: "week",
	Month: "month",
	Year: "year"
});
/** @internal */
var CheckoutProduct$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	trial_interval: /* @__PURE__ */ nullable(TrialInterval$inboundSchema),
	trial_interval_count: /* @__PURE__ */ nullable(int()),
	name: /* @__PURE__ */ string(),
	description: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	visibility: ProductVisibility$inboundSchema,
	recurring_interval: /* @__PURE__ */ nullable(RecurringInterval$inboundSchema),
	recurring_interval_count: /* @__PURE__ */ nullable(int()),
	meter_interval: /* @__PURE__ */ nullable(RecurringInterval$inboundSchema),
	meter_interval_count: /* @__PURE__ */ nullable(int()),
	is_recurring: /* @__PURE__ */ boolean(),
	is_archived: /* @__PURE__ */ boolean(),
	organization_id: /* @__PURE__ */ string(),
	prices: /* @__PURE__ */ array(smartUnion([LegacyRecurringProductPrice$inboundSchema, ProductPrice$inboundSchema])),
	benefits: /* @__PURE__ */ array(BenefitPublic$inboundSchema),
	medias: /* @__PURE__ */ array(ProductMediaFileRead$inboundSchema)
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"trial_interval": "trialInterval",
		"trial_interval_count": "trialIntervalCount",
		"recurring_interval": "recurringInterval",
		"recurring_interval_count": "recurringIntervalCount",
		"meter_interval": "meterInterval",
		"meter_interval_count": "meterIntervalCount",
		"is_recurring": "isRecurring",
		"is_archived": "isArchived",
		"organization_id": "organizationId"
	});
}));
int(), int(), int();
/** @internal */
var CheckoutStatus$inboundSchema = inboundSchema({
	Open: "open",
	Expired: "expired",
	Confirmed: "confirmed",
	Succeeded: "succeeded",
	Failed: "failed"
});
/** @internal */
var PaymentProcessor$inboundSchema = /* @__PURE__ */ _enum({ Stripe: "stripe" });
/** @internal */
var TaxBehavior$inboundSchema = inboundSchema({
	Inclusive: "inclusive",
	Exclusive: "exclusive"
});
int();
int();
int();
int();
/** @internal */
var Checkout$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	custom_field_data: /* @__PURE__ */ optional(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ nullable(smartUnion([
		/* @__PURE__ */ string(),
		int(),
		/* @__PURE__ */ boolean(),
		/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))
	])))),
	payment_processor: PaymentProcessor$inboundSchema,
	status: CheckoutStatus$inboundSchema,
	client_secret: /* @__PURE__ */ string(),
	url: /* @__PURE__ */ string(),
	expires_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	success_url: /* @__PURE__ */ string(),
	return_url: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	embed_origin: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	amount: int(),
	seats: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(int())),
	min_seats: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(int())),
	max_seats: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(int())),
	discount_amount: int(),
	net_amount: int(),
	tax_amount: /* @__PURE__ */ nullable(int()),
	tax_behavior: /* @__PURE__ */ nullable(TaxBehavior$inboundSchema),
	total_amount: int(),
	currency: /* @__PURE__ */ string(),
	allow_trial: /* @__PURE__ */ nullable(/* @__PURE__ */ boolean()),
	active_trial_interval: /* @__PURE__ */ nullable(TrialInterval$inboundSchema),
	active_trial_interval_count: /* @__PURE__ */ nullable(int()),
	trial_end: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	organization_id: /* @__PURE__ */ string(),
	product_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	product_price_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	discount_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	allow_discount_codes: /* @__PURE__ */ boolean(),
	require_billing_address: /* @__PURE__ */ boolean(),
	is_discount_applicable: /* @__PURE__ */ boolean(),
	is_free_product_price: /* @__PURE__ */ boolean(),
	is_payment_required: /* @__PURE__ */ boolean(),
	is_payment_setup_required: /* @__PURE__ */ boolean(),
	is_payment_form_required: /* @__PURE__ */ boolean(),
	customer_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	is_business_customer: /* @__PURE__ */ boolean(),
	customer_name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_email: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_ip_address: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_billing_name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_billing_address: /* @__PURE__ */ nullable(Address$inboundSchema),
	customer_tax_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	locale: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	payment_processor_metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ string()),
	billing_address_fields: CheckoutBillingAddressFields$inboundSchema,
	trial_interval: /* @__PURE__ */ nullable(TrialInterval$inboundSchema),
	trial_interval_count: /* @__PURE__ */ nullable(int()),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	external_customer_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	products: /* @__PURE__ */ array(CheckoutProduct$inboundSchema),
	product: /* @__PURE__ */ nullable(CheckoutProduct$inboundSchema),
	product_price: /* @__PURE__ */ nullable(smartUnion([LegacyRecurringProductPrice$inboundSchema, ProductPrice$inboundSchema])),
	prices: /* @__PURE__ */ nullable(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ array(smartUnion([LegacyRecurringProductPrice$inboundSchema, ProductPrice$inboundSchema])))),
	discount: /* @__PURE__ */ nullable(smartUnion([
		CheckoutDiscountFixedRepeatDuration$inboundSchema,
		CheckoutDiscountFixedOnceForeverDuration$inboundSchema,
		CheckoutDiscountPercentageRepeatDuration$inboundSchema,
		CheckoutDiscountPercentageOnceForeverDuration$inboundSchema
	])),
	subscription_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	attached_custom_fields: /* @__PURE__ */ nullable(/* @__PURE__ */ array(AttachedCustomField$inboundSchema)),
	customer_metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), smartUnion([
		/* @__PURE__ */ string(),
		int(),
		/* @__PURE__ */ boolean()
	]))
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"custom_field_data": "customFieldData",
		"payment_processor": "paymentProcessor",
		"client_secret": "clientSecret",
		"expires_at": "expiresAt",
		"success_url": "successUrl",
		"return_url": "returnUrl",
		"embed_origin": "embedOrigin",
		"min_seats": "minSeats",
		"max_seats": "maxSeats",
		"discount_amount": "discountAmount",
		"net_amount": "netAmount",
		"tax_amount": "taxAmount",
		"tax_behavior": "taxBehavior",
		"total_amount": "totalAmount",
		"allow_trial": "allowTrial",
		"active_trial_interval": "activeTrialInterval",
		"active_trial_interval_count": "activeTrialIntervalCount",
		"trial_end": "trialEnd",
		"organization_id": "organizationId",
		"product_id": "productId",
		"product_price_id": "productPriceId",
		"discount_id": "discountId",
		"allow_discount_codes": "allowDiscountCodes",
		"require_billing_address": "requireBillingAddress",
		"is_discount_applicable": "isDiscountApplicable",
		"is_free_product_price": "isFreeProductPrice",
		"is_payment_required": "isPaymentRequired",
		"is_payment_setup_required": "isPaymentSetupRequired",
		"is_payment_form_required": "isPaymentFormRequired",
		"customer_id": "customerId",
		"is_business_customer": "isBusinessCustomer",
		"customer_name": "customerName",
		"customer_email": "customerEmail",
		"customer_ip_address": "customerIpAddress",
		"customer_billing_name": "customerBillingName",
		"customer_billing_address": "customerBillingAddress",
		"customer_tax_id": "customerTaxId",
		"payment_processor_metadata": "paymentProcessorMetadata",
		"billing_address_fields": "billingAddressFields",
		"trial_interval": "trialInterval",
		"trial_interval_count": "trialIntervalCount",
		"external_customer_id": "externalCustomerId",
		"product_price": "productPrice",
		"subscription_id": "subscriptionId",
		"attached_custom_fields": "attachedCustomFields",
		"customer_metadata": "customerMetadata"
	});
}));
int(), int(), int(), int(), int(), int(), int(), int(), int(), int(), int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookcheckoutcreatedpayload.js
/** @internal */
var WebhookCheckoutCreatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("checkout.created"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Checkout$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookcheckoutupdatedpayload.js
/** @internal */
var WebhookCheckoutUpdatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("checkout.updated"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Checkout$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/discountfixedonceforeverdurationbase.js
/** @internal */
var DiscountFixedOnceForeverDurationBase$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	duration: DiscountDuration$inboundSchema,
	type: DiscountType$inboundSchema,
	amount: int(),
	currency: /* @__PURE__ */ string(),
	amounts: /* @__PURE__ */ record(/* @__PURE__ */ string(), int()),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	name: /* @__PURE__ */ string(),
	code: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	starts_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	ends_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	max_redemptions: /* @__PURE__ */ nullable(int()),
	redemptions_count: int(),
	organization_id: /* @__PURE__ */ string()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"starts_at": "startsAt",
		"ends_at": "endsAt",
		"max_redemptions": "maxRedemptions",
		"redemptions_count": "redemptionsCount",
		"organization_id": "organizationId"
	});
}));
int(), int(), int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/discountfixedrepeatdurationbase.js
/** @internal */
var DiscountFixedRepeatDurationBase$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	duration: DiscountDuration$inboundSchema,
	duration_in_months: int(),
	type: DiscountType$inboundSchema,
	amount: int(),
	currency: /* @__PURE__ */ string(),
	amounts: /* @__PURE__ */ record(/* @__PURE__ */ string(), int()),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	name: /* @__PURE__ */ string(),
	code: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	starts_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	ends_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	max_redemptions: /* @__PURE__ */ nullable(int()),
	redemptions_count: int(),
	organization_id: /* @__PURE__ */ string()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"duration_in_months": "durationInMonths",
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"starts_at": "startsAt",
		"ends_at": "endsAt",
		"max_redemptions": "maxRedemptions",
		"redemptions_count": "redemptionsCount",
		"organization_id": "organizationId"
	});
}));
int(), int(), int(), int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/discountpercentageonceforeverdurationbase.js
/** @internal */
var DiscountPercentageOnceForeverDurationBase$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	duration: DiscountDuration$inboundSchema,
	type: DiscountType$inboundSchema,
	basis_points: int(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	name: /* @__PURE__ */ string(),
	code: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	starts_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	ends_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	max_redemptions: /* @__PURE__ */ nullable(int()),
	redemptions_count: int(),
	organization_id: /* @__PURE__ */ string()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"basis_points": "basisPoints",
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"starts_at": "startsAt",
		"ends_at": "endsAt",
		"max_redemptions": "maxRedemptions",
		"redemptions_count": "redemptionsCount",
		"organization_id": "organizationId"
	});
}));
int(), int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/discountpercentagerepeatdurationbase.js
/** @internal */
var DiscountPercentageRepeatDurationBase$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	duration: DiscountDuration$inboundSchema,
	duration_in_months: int(),
	type: DiscountType$inboundSchema,
	basis_points: int(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	name: /* @__PURE__ */ string(),
	code: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	starts_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	ends_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	max_redemptions: /* @__PURE__ */ nullable(int()),
	redemptions_count: int(),
	organization_id: /* @__PURE__ */ string()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"duration_in_months": "durationInMonths",
		"basis_points": "basisPoints",
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"starts_at": "startsAt",
		"ends_at": "endsAt",
		"max_redemptions": "maxRedemptions",
		"redemptions_count": "redemptionsCount",
		"organization_id": "organizationId"
	});
}));
int(), int(), int(), int();
/** @internal */
var OrderBillingReason$inboundSchema = inboundSchema({
	Purchase: "purchase",
	SubscriptionCreate: "subscription_create",
	SubscriptionCycle: "subscription_cycle",
	SubscriptionUpdate: "subscription_update"
});
/** @internal */
var CustomerType$inboundSchema = inboundSchema({
	Individual: "individual",
	Team: "team"
});
/** @internal */
var OrderCustomer$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	external_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	email: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	email_verified: /* @__PURE__ */ boolean(),
	type: CustomerType$inboundSchema,
	name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_address: /* @__PURE__ */ nullable(Address$inboundSchema),
	tax_id: /* @__PURE__ */ nullable(/* @__PURE__ */ array(/* @__PURE__ */ nullable(smartUnion([/* @__PURE__ */ string(), TaxIDFormat$inboundSchema])))),
	locale: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	organization_id: /* @__PURE__ */ string(),
	default_payment_method_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	deleted_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	avatar_url: /* @__PURE__ */ nullable(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"external_id": "externalId",
		"email_verified": "emailVerified",
		"billing_name": "billingName",
		"billing_address": "billingAddress",
		"tax_id": "taxId",
		"organization_id": "organizationId",
		"default_payment_method_id": "defaultPaymentMethodId",
		"deleted_at": "deletedAt",
		"avatar_url": "avatarUrl"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/orderitemschema.js
/** @internal */
var OrderItemSchema$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	label: /* @__PURE__ */ string(),
	amount: int(),
	tax_amount: int(),
	proration: /* @__PURE__ */ boolean(),
	product_price_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"tax_amount": "taxAmount",
		"product_price_id": "productPriceId"
	});
}));
int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/orderproduct.js
/** @internal */
var OrderProduct$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	trial_interval: /* @__PURE__ */ nullable(TrialInterval$inboundSchema),
	trial_interval_count: /* @__PURE__ */ nullable(int()),
	name: /* @__PURE__ */ string(),
	description: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	visibility: ProductVisibility$inboundSchema,
	recurring_interval: /* @__PURE__ */ nullable(RecurringInterval$inboundSchema),
	recurring_interval_count: /* @__PURE__ */ nullable(int()),
	meter_interval: /* @__PURE__ */ nullable(RecurringInterval$inboundSchema),
	meter_interval_count: /* @__PURE__ */ nullable(int()),
	is_recurring: /* @__PURE__ */ boolean(),
	is_archived: /* @__PURE__ */ boolean(),
	organization_id: /* @__PURE__ */ string()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"trial_interval": "trialInterval",
		"trial_interval_count": "trialIntervalCount",
		"recurring_interval": "recurringInterval",
		"recurring_interval_count": "recurringIntervalCount",
		"meter_interval": "meterInterval",
		"meter_interval_count": "meterIntervalCount",
		"is_recurring": "isRecurring",
		"is_archived": "isArchived",
		"organization_id": "organizationId"
	});
}));
int(), int(), int();
/** @internal */
var OrderStatus$inboundSchema = inboundSchema({
	Draft: "draft",
	Pending: "pending",
	Paid: "paid",
	Refunded: "refunded",
	PartiallyRefunded: "partially_refunded",
	Void: "void"
});
/** @internal */
var CustomerCancellationReason$inboundSchema = inboundSchema({
	CustomerService: "customer_service",
	LowQuality: "low_quality",
	MissingFeatures: "missing_features",
	SwitchedService: "switched_service",
	TooComplex: "too_complex",
	TooExpensive: "too_expensive",
	Unused: "unused",
	Other: "other"
});
/** @internal */
var SubscriptionStatus$inboundSchema = inboundSchema({
	Incomplete: "incomplete",
	IncompleteExpired: "incomplete_expired",
	Trialing: "trialing",
	Active: "active",
	PastDue: "past_due",
	Canceled: "canceled",
	Unpaid: "unpaid",
	Paused: "paused"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/ordersubscription.js
/** @internal */
var OrderSubscription$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	amount: int(),
	currency: /* @__PURE__ */ string(),
	recurring_interval: RecurringInterval$inboundSchema,
	recurring_interval_count: int(),
	status: SubscriptionStatus$inboundSchema,
	current_period_start: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	current_period_end: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	current_meter_period_start: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	current_meter_period_end: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	trial_start: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	trial_end: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	cancel_at_period_end: /* @__PURE__ */ boolean(),
	canceled_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	started_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	ends_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	ended_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	past_due_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	pause_at_period_end: /* @__PURE__ */ boolean(),
	paused_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	resumes_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	customer_id: /* @__PURE__ */ string(),
	product_id: /* @__PURE__ */ string(),
	discount_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	checkout_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	seats: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(int())),
	customer_cancellation_reason: /* @__PURE__ */ nullable(CustomerCancellationReason$inboundSchema),
	customer_cancellation_comment: /* @__PURE__ */ nullable(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"recurring_interval": "recurringInterval",
		"recurring_interval_count": "recurringIntervalCount",
		"current_period_start": "currentPeriodStart",
		"current_period_end": "currentPeriodEnd",
		"current_meter_period_start": "currentMeterPeriodStart",
		"current_meter_period_end": "currentMeterPeriodEnd",
		"trial_start": "trialStart",
		"trial_end": "trialEnd",
		"cancel_at_period_end": "cancelAtPeriodEnd",
		"canceled_at": "canceledAt",
		"started_at": "startedAt",
		"ends_at": "endsAt",
		"ended_at": "endedAt",
		"past_due_at": "pastDueAt",
		"pause_at_period_end": "pauseAtPeriodEnd",
		"paused_at": "pausedAt",
		"resumes_at": "resumesAt",
		"customer_id": "customerId",
		"product_id": "productId",
		"discount_id": "discountId",
		"checkout_id": "checkoutId",
		"customer_cancellation_reason": "customerCancellationReason",
		"customer_cancellation_comment": "customerCancellationComment"
	});
}));
int(), int(), int();
int();
int();
/** @internal */
var Order$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	status: OrderStatus$inboundSchema,
	paid: /* @__PURE__ */ boolean(),
	subtotal_amount: int(),
	discount_amount: int(),
	net_amount: int(),
	tax_amount: int(),
	total_amount: int(),
	applied_balance_amount: int(),
	due_amount: int(),
	refunded_amount: int(),
	refunded_tax_amount: int(),
	currency: /* @__PURE__ */ string(),
	billing_reason: OrderBillingReason$inboundSchema,
	billing_name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_address: /* @__PURE__ */ nullable(Address$inboundSchema),
	invoice_number: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	is_invoice_generated: /* @__PURE__ */ boolean(),
	receipt_number: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	seats: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(int())),
	customer_id: /* @__PURE__ */ string(),
	product_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	discount_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	subscription_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	checkout_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	next_payment_attempt_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	custom_field_data: /* @__PURE__ */ optional(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ nullable(smartUnion([
		/* @__PURE__ */ string(),
		int(),
		/* @__PURE__ */ boolean(),
		/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))
	])))),
	platform_fee_amount: int(),
	platform_fee_currency: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer: OrderCustomer$inboundSchema,
	product: /* @__PURE__ */ nullable(OrderProduct$inboundSchema),
	discount: /* @__PURE__ */ nullable(smartUnion([
		DiscountFixedRepeatDurationBase$inboundSchema,
		DiscountFixedOnceForeverDurationBase$inboundSchema,
		DiscountPercentageRepeatDurationBase$inboundSchema,
		DiscountPercentageOnceForeverDurationBase$inboundSchema
	])),
	subscription: /* @__PURE__ */ nullable(OrderSubscription$inboundSchema),
	items: /* @__PURE__ */ array(OrderItemSchema$inboundSchema),
	description: /* @__PURE__ */ string(),
	refundable_amount: int(),
	refundable_tax_amount: int()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"subtotal_amount": "subtotalAmount",
		"discount_amount": "discountAmount",
		"net_amount": "netAmount",
		"tax_amount": "taxAmount",
		"total_amount": "totalAmount",
		"applied_balance_amount": "appliedBalanceAmount",
		"due_amount": "dueAmount",
		"refunded_amount": "refundedAmount",
		"refunded_tax_amount": "refundedTaxAmount",
		"billing_reason": "billingReason",
		"billing_name": "billingName",
		"billing_address": "billingAddress",
		"invoice_number": "invoiceNumber",
		"is_invoice_generated": "isInvoiceGenerated",
		"receipt_number": "receiptNumber",
		"customer_id": "customerId",
		"product_id": "productId",
		"discount_id": "discountId",
		"subscription_id": "subscriptionId",
		"checkout_id": "checkoutId",
		"next_payment_attempt_at": "nextPaymentAttemptAt",
		"custom_field_data": "customFieldData",
		"platform_fee_amount": "platformFeeAmount",
		"platform_fee_currency": "platformFeeCurrency",
		"refundable_amount": "refundableAmount",
		"refundable_tax_amount": "refundableTaxAmount"
	});
}));
int(), int(), int(), int(), int(), int(), int(), int(), int(), int(), int(), int(), int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookordercreatedpayload.js
/** @internal */
var WebhookOrderCreatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("order.created"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Order$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookorderrefundedpayload.js
/** @internal */
var WebhookOrderRefundedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("order.refunded"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Order$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookorderupdatedpayload.js
/** @internal */
var WebhookOrderUpdatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("order.updated"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Order$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookorderpaidpayload.js
/** @internal */
var WebhookOrderPaidPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("order.paid"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Order$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/organizationcapabilities.js
/** @internal */
var OrganizationCapabilities$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	checkout_payments: /* @__PURE__ */ boolean(),
	subscription_renewals: /* @__PURE__ */ boolean(),
	payouts: /* @__PURE__ */ boolean(),
	refunds: /* @__PURE__ */ boolean(),
	api_access: /* @__PURE__ */ boolean(),
	dashboard_access: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"checkout_payments": "checkoutPayments",
		"subscription_renewals": "subscriptionRenewals",
		"api_access": "apiAccess",
		"dashboard_access": "dashboardAccess"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/organizationcustomeremailsettings.js
/** @internal */
var OrganizationCustomerEmailSettings$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	order_confirmation: /* @__PURE__ */ boolean(),
	subscription_cancellation: /* @__PURE__ */ boolean(),
	subscription_confirmation: /* @__PURE__ */ boolean(),
	subscription_cycled: /* @__PURE__ */ boolean(),
	subscription_cycled_after_trial: /* @__PURE__ */ boolean(),
	subscription_past_due: /* @__PURE__ */ boolean(),
	subscription_paused: /* @__PURE__ */ boolean(),
	subscription_resumed: /* @__PURE__ */ boolean(),
	subscription_renewal_reminder: /* @__PURE__ */ boolean(),
	subscription_revoked: /* @__PURE__ */ boolean(),
	subscription_trial_conversion_reminder: /* @__PURE__ */ boolean(),
	subscription_uncanceled: /* @__PURE__ */ boolean(),
	subscription_updated: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"order_confirmation": "orderConfirmation",
		"subscription_cancellation": "subscriptionCancellation",
		"subscription_confirmation": "subscriptionConfirmation",
		"subscription_cycled": "subscriptionCycled",
		"subscription_cycled_after_trial": "subscriptionCycledAfterTrial",
		"subscription_past_due": "subscriptionPastDue",
		"subscription_paused": "subscriptionPaused",
		"subscription_resumed": "subscriptionResumed",
		"subscription_renewal_reminder": "subscriptionRenewalReminder",
		"subscription_revoked": "subscriptionRevoked",
		"subscription_trial_conversion_reminder": "subscriptionTrialConversionReminder",
		"subscription_uncanceled": "subscriptionUncanceled",
		"subscription_updated": "subscriptionUpdated"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/organizationcustomerportalsettings.js
/** @internal */
var OrganizationCustomerPortalSettings$inboundSchema = /* @__PURE__ */ object({
	usage: /* @__PURE__ */ object({ show: /* @__PURE__ */ boolean() }),
	subscription: /* @__PURE__ */ pipe(/* @__PURE__ */ object({
		update_seats: /* @__PURE__ */ boolean(),
		update_plan: /* @__PURE__ */ boolean(),
		pause: /* @__PURE__ */ optional(/* @__PURE__ */ boolean())
	}), /* @__PURE__ */ transform((v) => {
		return remap(v, {
			"update_seats": "updateSeats",
			"update_plan": "updatePlan"
		});
	})),
	customer: /* @__PURE__ */ optional(/* @__PURE__ */ pipe(/* @__PURE__ */ object({ allow_email_change: /* @__PURE__ */ optional(/* @__PURE__ */ boolean()) }), /* @__PURE__ */ transform((v) => {
		return remap(v, { "allow_email_change": "allowEmailChange" });
	})))
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/organizationfeaturesettings.js
/** @internal */
var OrganizationFeatureSettings$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	issue_funding_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false),
	seat_based_pricing_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false),
	wallets_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false),
	member_model_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false),
	checkout_localization_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false),
	overview_metrics: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ array(/* @__PURE__ */ string()))),
	reset_proration_behavior_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false),
	off_session_charges_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false),
	slack_benefit_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false),
	preview_access_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false),
	disputes_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false),
	sso_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false),
	compass_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false),
	merchant_migration_enabled: /* @__PURE__ */ _default(/* @__PURE__ */ boolean(), false)
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"issue_funding_enabled": "issueFundingEnabled",
		"seat_based_pricing_enabled": "seatBasedPricingEnabled",
		"wallets_enabled": "walletsEnabled",
		"member_model_enabled": "memberModelEnabled",
		"checkout_localization_enabled": "checkoutLocalizationEnabled",
		"overview_metrics": "overviewMetrics",
		"reset_proration_behavior_enabled": "resetProrationBehaviorEnabled",
		"off_session_charges_enabled": "offSessionChargesEnabled",
		"slack_benefit_enabled": "slackBenefitEnabled",
		"preview_access_enabled": "previewAccessEnabled",
		"disputes_enabled": "disputesEnabled",
		"sso_enabled": "ssoEnabled",
		"compass_enabled": "compassEnabled",
		"merchant_migration_enabled": "merchantMigrationEnabled"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/organizationsociallink.js
/** @internal */
var OrganizationSocialLink$inboundSchema = /* @__PURE__ */ object({
	platform: inboundSchema({
		X: "x",
		Github: "github",
		Facebook: "facebook",
		Instagram: "instagram",
		Youtube: "youtube",
		Tiktok: "tiktok",
		Linkedin: "linkedin",
		Threads: "threads",
		Discord: "discord",
		Other: "other"
	}),
	url: /* @__PURE__ */ string()
});
/** @internal */
var OrganizationStatus$inboundSchema = inboundSchema({
	Created: "created",
	Review: "review",
	Snoozed: "snoozed",
	Denied: "denied",
	Active: "active",
	Blocked: "blocked",
	Offboarding: "offboarding",
	Offboarded: "offboarded"
});
/** @internal */
var PublicSubscriptionProrationBehavior$inboundSchema = inboundSchema({
	Invoice: "invoice",
	Prorate: "prorate",
	NextPeriod: "next_period"
});
/** @internal */
var OrganizationSubscriptionSettings$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	allow_multiple_subscriptions: /* @__PURE__ */ boolean(),
	proration_behavior: PublicSubscriptionProrationBehavior$inboundSchema,
	benefit_revocation_grace_period: int(),
	prevent_trial_abuse: /* @__PURE__ */ boolean(),
	allow_customer_updates: /* @__PURE__ */ boolean()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"allow_multiple_subscriptions": "allowMultipleSubscriptions",
		"proration_behavior": "prorationBehavior",
		"benefit_revocation_grace_period": "benefitRevocationGracePeriod",
		"prevent_trial_abuse": "preventTrialAbuse",
		"allow_customer_updates": "allowCustomerUpdates"
	});
}));
int();
/** @internal */
var SubscriptionProrationBehavior$inboundSchema = inboundSchema({
	Invoice: "invoice",
	Prorate: "prorate",
	NextPeriod: "next_period",
	Reset: "reset"
});
/** @internal */
var CountryAlpha2$inboundSchema = inboundSchema({
	Ad: "AD",
	Ae: "AE",
	Af: "AF",
	Ag: "AG",
	Ai: "AI",
	Al: "AL",
	Am: "AM",
	Ao: "AO",
	Aq: "AQ",
	Ar: "AR",
	As: "AS",
	At: "AT",
	Au: "AU",
	Aw: "AW",
	Ax: "AX",
	Az: "AZ",
	Ba: "BA",
	Bb: "BB",
	Bd: "BD",
	Be: "BE",
	Bf: "BF",
	Bg: "BG",
	Bh: "BH",
	Bi: "BI",
	Bj: "BJ",
	Bl: "BL",
	Bm: "BM",
	Bn: "BN",
	Bo: "BO",
	Bq: "BQ",
	Br: "BR",
	Bs: "BS",
	Bt: "BT",
	Bv: "BV",
	Bw: "BW",
	By: "BY",
	Bz: "BZ",
	Ca: "CA",
	Cc: "CC",
	Cd: "CD",
	Cf: "CF",
	Cg: "CG",
	Ch: "CH",
	Ci: "CI",
	Ck: "CK",
	Cl: "CL",
	Cm: "CM",
	Cn: "CN",
	Co: "CO",
	Cr: "CR",
	Cu: "CU",
	Cv: "CV",
	Cw: "CW",
	Cx: "CX",
	Cy: "CY",
	Cz: "CZ",
	De: "DE",
	Dj: "DJ",
	Dk: "DK",
	Dm: "DM",
	Do: "DO",
	Dz: "DZ",
	Ec: "EC",
	Ee: "EE",
	Eg: "EG",
	Eh: "EH",
	Er: "ER",
	Es: "ES",
	Et: "ET",
	Fi: "FI",
	Fj: "FJ",
	Fk: "FK",
	Fm: "FM",
	Fo: "FO",
	Fr: "FR",
	Ga: "GA",
	Gb: "GB",
	Gd: "GD",
	Ge: "GE",
	Gf: "GF",
	Gg: "GG",
	Gh: "GH",
	Gi: "GI",
	Gl: "GL",
	Gm: "GM",
	Gn: "GN",
	Gp: "GP",
	Gq: "GQ",
	Gr: "GR",
	Gs: "GS",
	Gt: "GT",
	Gu: "GU",
	Gw: "GW",
	Gy: "GY",
	Hk: "HK",
	Hm: "HM",
	Hn: "HN",
	Hr: "HR",
	Ht: "HT",
	Hu: "HU",
	Id: "ID",
	Ie: "IE",
	Il: "IL",
	Im: "IM",
	In: "IN",
	Io: "IO",
	Iq: "IQ",
	Ir: "IR",
	Is: "IS",
	It: "IT",
	Je: "JE",
	Jm: "JM",
	Jo: "JO",
	Jp: "JP",
	Ke: "KE",
	Kg: "KG",
	Kh: "KH",
	Ki: "KI",
	Km: "KM",
	Kn: "KN",
	Kp: "KP",
	Kr: "KR",
	Kw: "KW",
	Ky: "KY",
	Kz: "KZ",
	La: "LA",
	Lb: "LB",
	Lc: "LC",
	Li: "LI",
	Lk: "LK",
	Lr: "LR",
	Ls: "LS",
	Lt: "LT",
	Lu: "LU",
	Lv: "LV",
	Ly: "LY",
	Ma: "MA",
	Mc: "MC",
	Md: "MD",
	Me: "ME",
	Mf: "MF",
	Mg: "MG",
	Mh: "MH",
	Mk: "MK",
	Ml: "ML",
	Mm: "MM",
	Mn: "MN",
	Mo: "MO",
	Mp: "MP",
	Mq: "MQ",
	Mr: "MR",
	Ms: "MS",
	Mt: "MT",
	Mu: "MU",
	Mv: "MV",
	Mw: "MW",
	Mx: "MX",
	My: "MY",
	Mz: "MZ",
	Na: "NA",
	Nc: "NC",
	Ne: "NE",
	Nf: "NF",
	Ng: "NG",
	Ni: "NI",
	Nl: "NL",
	No: "NO",
	Np: "NP",
	Nr: "NR",
	Nu: "NU",
	Nz: "NZ",
	Om: "OM",
	Pa: "PA",
	Pe: "PE",
	Pf: "PF",
	Pg: "PG",
	Ph: "PH",
	Pk: "PK",
	Pl: "PL",
	Pm: "PM",
	Pn: "PN",
	Pr: "PR",
	Ps: "PS",
	Pt: "PT",
	Pw: "PW",
	Py: "PY",
	Qa: "QA",
	Re: "RE",
	Ro: "RO",
	Rs: "RS",
	Ru: "RU",
	Rw: "RW",
	Sa: "SA",
	Sb: "SB",
	Sc: "SC",
	Sd: "SD",
	Se: "SE",
	Sg: "SG",
	Sh: "SH",
	Si: "SI",
	Sj: "SJ",
	Sk: "SK",
	Sl: "SL",
	Sm: "SM",
	Sn: "SN",
	So: "SO",
	Sr: "SR",
	Ss: "SS",
	St: "ST",
	Sv: "SV",
	Sx: "SX",
	Sy: "SY",
	Sz: "SZ",
	Tc: "TC",
	Td: "TD",
	Tf: "TF",
	Tg: "TG",
	Th: "TH",
	Tj: "TJ",
	Tk: "TK",
	Tl: "TL",
	Tm: "TM",
	Tn: "TN",
	To: "TO",
	Tr: "TR",
	Tt: "TT",
	Tv: "TV",
	Tw: "TW",
	Tz: "TZ",
	Ua: "UA",
	Ug: "UG",
	Um: "UM",
	Us: "US",
	Uy: "UY",
	Uz: "UZ",
	Va: "VA",
	Vc: "VC",
	Ve: "VE",
	Vg: "VG",
	Vi: "VI",
	Vn: "VN",
	Vu: "VU",
	Wf: "WF",
	Ws: "WS",
	Ye: "YE",
	Yt: "YT",
	Za: "ZA",
	Zm: "ZM",
	Zw: "ZW"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookorganizationupdatedpayload.js
/** @internal */
var WebhookOrganizationUpdatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("organization.updated"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: /* @__PURE__ */ pipe(/* @__PURE__ */ object({
		created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
		modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
		id: /* @__PURE__ */ string(),
		name: /* @__PURE__ */ string(),
		slug: /* @__PURE__ */ string(),
		avatar_url: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
		proration_behavior: SubscriptionProrationBehavior$inboundSchema,
		allow_customer_updates: /* @__PURE__ */ boolean(),
		email: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
		website: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
		socials: /* @__PURE__ */ array(OrganizationSocialLink$inboundSchema),
		status: OrganizationStatus$inboundSchema,
		details_submitted_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
		sso_enforced: /* @__PURE__ */ boolean(),
		default_presentment_currency: /* @__PURE__ */ string(),
		default_tax_behavior: TaxBehaviorOption$inboundSchema,
		feature_settings: /* @__PURE__ */ nullable(OrganizationFeatureSettings$inboundSchema),
		subscription_settings: OrganizationSubscriptionSettings$inboundSchema,
		customer_email_settings: OrganizationCustomerEmailSettings$inboundSchema,
		customer_portal_settings: OrganizationCustomerPortalSettings$inboundSchema,
		country: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(CountryAlpha2$inboundSchema)),
		account_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
		payout_account_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
		capabilities: OrganizationCapabilities$inboundSchema
	}), /* @__PURE__ */ transform((v) => {
		return remap(v, {
			"created_at": "createdAt",
			"modified_at": "modifiedAt",
			"avatar_url": "avatarUrl",
			"proration_behavior": "prorationBehavior",
			"allow_customer_updates": "allowCustomerUpdates",
			"details_submitted_at": "detailsSubmittedAt",
			"sso_enforced": "ssoEnforced",
			"default_presentment_currency": "defaultPresentmentCurrency",
			"default_tax_behavior": "defaultTaxBehavior",
			"feature_settings": "featureSettings",
			"subscription_settings": "subscriptionSettings",
			"customer_email_settings": "customerEmailSettings",
			"customer_portal_settings": "customerPortalSettings",
			"account_id": "accountId",
			"payout_account_id": "payoutAccountId"
		});
	}))
});
/** @internal */
var Product$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	trial_interval: /* @__PURE__ */ nullable(TrialInterval$inboundSchema),
	trial_interval_count: /* @__PURE__ */ nullable(int()),
	name: /* @__PURE__ */ string(),
	description: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	visibility: ProductVisibility$inboundSchema,
	recurring_interval: /* @__PURE__ */ nullable(RecurringInterval$inboundSchema),
	recurring_interval_count: /* @__PURE__ */ nullable(int()),
	meter_interval: /* @__PURE__ */ nullable(RecurringInterval$inboundSchema),
	meter_interval_count: /* @__PURE__ */ nullable(int()),
	is_recurring: /* @__PURE__ */ boolean(),
	is_archived: /* @__PURE__ */ boolean(),
	organization_id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	prices: /* @__PURE__ */ array(smartUnion([LegacyRecurringProductPrice$inboundSchema, ProductPrice$inboundSchema])),
	benefits: /* @__PURE__ */ array(Benefit$inboundSchema),
	medias: /* @__PURE__ */ array(ProductMediaFileRead$inboundSchema),
	attached_custom_fields: /* @__PURE__ */ array(AttachedCustomField$inboundSchema)
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"trial_interval": "trialInterval",
		"trial_interval_count": "trialIntervalCount",
		"recurring_interval": "recurringInterval",
		"recurring_interval_count": "recurringIntervalCount",
		"meter_interval": "meterInterval",
		"meter_interval_count": "meterIntervalCount",
		"is_recurring": "isRecurring",
		"is_archived": "isArchived",
		"organization_id": "organizationId",
		"attached_custom_fields": "attachedCustomFields"
	});
}));
int(), int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookproductcreatedpayload.js
/** @internal */
var WebhookProductCreatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("product.created"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Product$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookproductupdatedpayload.js
/** @internal */
var WebhookProductUpdatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("product.updated"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Product$inboundSchema
});
/** @internal */
var DisputeStatus$inboundSchema = inboundSchema({
	Prevented: "prevented",
	EarlyWarning: "early_warning",
	NeedsResponse: "needs_response",
	UnderReview: "under_review",
	Lost: "lost",
	Won: "won"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/refunddispute.js
/** @internal */
var RefundDispute$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	status: DisputeStatus$inboundSchema,
	resolved: /* @__PURE__ */ boolean(),
	closed: /* @__PURE__ */ boolean(),
	amount: int(),
	tax_amount: int(),
	currency: /* @__PURE__ */ string(),
	reason: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	evidence_due_by: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	past_due: /* @__PURE__ */ boolean(),
	order_id: /* @__PURE__ */ string(),
	payment_id: /* @__PURE__ */ string()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"tax_amount": "taxAmount",
		"evidence_due_by": "evidenceDueBy",
		"past_due": "pastDue",
		"order_id": "orderId",
		"payment_id": "paymentId"
	});
}));
int(), int();
/** @internal */
var RefundReason$inboundSchema = inboundSchema({
	Duplicate: "duplicate",
	Fraudulent: "fraudulent",
	CustomerRequest: "customer_request",
	ServiceDisruption: "service_disruption",
	SatisfactionGuarantee: "satisfaction_guarantee",
	DisputePrevention: "dispute_prevention",
	Other: "other"
});
/** @internal */
var RefundStatus$inboundSchema = inboundSchema({
	Pending: "pending",
	Succeeded: "succeeded",
	Failed: "failed",
	Canceled: "canceled"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/refund.js
/** @internal */
var Refund$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	status: RefundStatus$inboundSchema,
	reason: RefundReason$inboundSchema,
	amount: int(),
	tax_amount: int(),
	currency: /* @__PURE__ */ string(),
	organization_id: /* @__PURE__ */ string(),
	order_id: /* @__PURE__ */ string(),
	subscription_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_id: /* @__PURE__ */ string(),
	revoke_benefits: /* @__PURE__ */ boolean(),
	dispute: /* @__PURE__ */ nullable(RefundDispute$inboundSchema)
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"tax_amount": "taxAmount",
		"organization_id": "organizationId",
		"order_id": "orderId",
		"subscription_id": "subscriptionId",
		"customer_id": "customerId",
		"revoke_benefits": "revokeBenefits"
	});
}));
int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookrefundcreatedpayload.js
/** @internal */
var WebhookRefundCreatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("refund.created"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Refund$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookrefundupdatedpayload.js
/** @internal */
var WebhookRefundUpdatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("refund.updated"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Refund$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/pendingsubscriptionupdate.js
/** @internal */
var PendingSubscriptionUpdate$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	applies_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	product_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	seats: /* @__PURE__ */ nullable(int())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"applies_at": "appliesAt",
		"product_id": "productId"
	});
}));
int();
/** @internal */
var SubscriptionCustomer$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	external_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	email: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	email_verified: /* @__PURE__ */ boolean(),
	type: CustomerType$inboundSchema,
	name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_address: /* @__PURE__ */ nullable(Address$inboundSchema),
	tax_id: /* @__PURE__ */ nullable(/* @__PURE__ */ array(/* @__PURE__ */ nullable(smartUnion([/* @__PURE__ */ string(), TaxIDFormat$inboundSchema])))),
	locale: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	organization_id: /* @__PURE__ */ string(),
	default_payment_method_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	deleted_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	avatar_url: /* @__PURE__ */ nullable(/* @__PURE__ */ string())
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"external_id": "externalId",
		"email_verified": "emailVerified",
		"billing_name": "billingName",
		"billing_address": "billingAddress",
		"tax_id": "taxId",
		"organization_id": "organizationId",
		"default_payment_method_id": "defaultPaymentMethodId",
		"deleted_at": "deletedAt",
		"avatar_url": "avatarUrl"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/countaggregation.js
/** @internal */
var CountAggregation$inboundSchema = /* @__PURE__ */ object({ func: /* @__PURE__ */ literal("count") });
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/filteroperator.js
var FilterOperator = {
	Eq: "eq",
	Ne: "ne",
	Gt: "gt",
	Gte: "gte",
	Lt: "lt",
	Lte: "lte",
	Like: "like",
	NotLike: "not_like"
};
/** @internal */
var FilterOperator$inboundSchema = inboundSchema(FilterOperator);
/** @internal */
var FilterOperator$outboundSchema = outboundSchema(FilterOperator);
int();
int();
/** @internal */
var FilterClause$inboundSchema = /* @__PURE__ */ object({
	property: /* @__PURE__ */ string(),
	operator: FilterOperator$inboundSchema,
	value: smartUnion([
		/* @__PURE__ */ string(),
		int(),
		/* @__PURE__ */ boolean()
	])
});
/** @internal */
var FilterClause$outboundSchema = /* @__PURE__ */ object({
	property: /* @__PURE__ */ string(),
	operator: FilterOperator$outboundSchema,
	value: smartUnion([
		/* @__PURE__ */ string(),
		int(),
		/* @__PURE__ */ boolean()
	])
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/filterconjunction.js
var FilterConjunction = {
	And: "and",
	Or: "or"
};
/** @internal */
var FilterConjunction$inboundSchema = inboundSchema(FilterConjunction);
/** @internal */
var FilterConjunction$outboundSchema = outboundSchema(FilterConjunction);
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/filter.js
/** @internal */
var Filter$inboundSchema = /* @__PURE__ */ object({
	conjunction: FilterConjunction$inboundSchema,
	clauses: /* @__PURE__ */ array(smartUnion([FilterClause$inboundSchema, /* @__PURE__ */ _lazy(() => Filter$inboundSchema)]))
});
/** @internal */
var Filter$outboundSchema = /* @__PURE__ */ object({
	conjunction: FilterConjunction$outboundSchema,
	clauses: /* @__PURE__ */ array(smartUnion([FilterClause$outboundSchema, /* @__PURE__ */ _lazy(() => Filter$outboundSchema)]))
});
/** @internal */
var PropertyAggregation$inboundSchema = /* @__PURE__ */ object({
	func: inboundSchema({
		Sum: "sum",
		Max: "max",
		Min: "min",
		Avg: "avg"
	}),
	property: /* @__PURE__ */ string()
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/uniqueaggregation.js
/** @internal */
var UniqueAggregation$inboundSchema = /* @__PURE__ */ object({
	func: /* @__PURE__ */ literal("unique"),
	property: /* @__PURE__ */ string()
});
/** @internal */
var Meter$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	name: /* @__PURE__ */ string(),
	unit: MeterUnit$inboundSchema,
	custom_label: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	custom_multiplier: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(int())),
	filter: Filter$inboundSchema,
	aggregation: /* @__PURE__ */ union([
		/* @__PURE__ */ intersection(PropertyAggregation$inboundSchema, /* @__PURE__ */ object({ func: /* @__PURE__ */ literal("avg") })),
		CountAggregation$inboundSchema,
		/* @__PURE__ */ intersection(PropertyAggregation$inboundSchema, /* @__PURE__ */ object({ func: /* @__PURE__ */ literal("max") })),
		/* @__PURE__ */ intersection(PropertyAggregation$inboundSchema, /* @__PURE__ */ object({ func: /* @__PURE__ */ literal("min") })),
		/* @__PURE__ */ intersection(PropertyAggregation$inboundSchema, /* @__PURE__ */ object({ func: /* @__PURE__ */ literal("sum") })),
		UniqueAggregation$inboundSchema
	]),
	organization_id: /* @__PURE__ */ string(),
	archived_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))))
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"custom_label": "customLabel",
		"custom_multiplier": "customMultiplier",
		"organization_id": "organizationId",
		"archived_at": "archivedAt"
	});
}));
int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/subscriptionmeter.js
/** @internal */
var SubscriptionMeter$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	consumed_units: /* @__PURE__ */ number(),
	credited_units: int(),
	amount: int(),
	meter_id: /* @__PURE__ */ string(),
	meter: Meter$inboundSchema
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"consumed_units": "consumedUnits",
		"credited_units": "creditedUnits",
		"meter_id": "meterId"
	});
}));
int(), int();
int();
int();
/** @internal */
var Subscription$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	amount: int(),
	currency: /* @__PURE__ */ string(),
	recurring_interval: RecurringInterval$inboundSchema,
	recurring_interval_count: int(),
	status: SubscriptionStatus$inboundSchema,
	current_period_start: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	current_period_end: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	current_meter_period_start: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	current_meter_period_end: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	trial_start: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	trial_end: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	cancel_at_period_end: /* @__PURE__ */ boolean(),
	canceled_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	started_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	ends_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	ended_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	past_due_at: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))))),
	pause_at_period_end: /* @__PURE__ */ boolean(),
	paused_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	resumes_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	customer_id: /* @__PURE__ */ string(),
	product_id: /* @__PURE__ */ string(),
	discount_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	checkout_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	seats: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(int())),
	customer_cancellation_reason: /* @__PURE__ */ nullable(CustomerCancellationReason$inboundSchema),
	customer_cancellation_comment: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	custom_field_data: /* @__PURE__ */ optional(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ nullable(smartUnion([
		/* @__PURE__ */ string(),
		int(),
		/* @__PURE__ */ boolean(),
		/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))
	])))),
	customer: SubscriptionCustomer$inboundSchema,
	product: Product$inboundSchema,
	discount: /* @__PURE__ */ nullable(smartUnion([
		DiscountFixedRepeatDurationBase$inboundSchema,
		DiscountFixedOnceForeverDurationBase$inboundSchema,
		DiscountPercentageRepeatDurationBase$inboundSchema,
		DiscountPercentageOnceForeverDurationBase$inboundSchema
	])),
	prices: /* @__PURE__ */ array(smartUnion([LegacyRecurringProductPrice$inboundSchema, ProductPrice$inboundSchema])),
	meters: /* @__PURE__ */ array(SubscriptionMeter$inboundSchema),
	pending_update: /* @__PURE__ */ nullable(PendingSubscriptionUpdate$inboundSchema)
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"recurring_interval": "recurringInterval",
		"recurring_interval_count": "recurringIntervalCount",
		"current_period_start": "currentPeriodStart",
		"current_period_end": "currentPeriodEnd",
		"current_meter_period_start": "currentMeterPeriodStart",
		"current_meter_period_end": "currentMeterPeriodEnd",
		"trial_start": "trialStart",
		"trial_end": "trialEnd",
		"cancel_at_period_end": "cancelAtPeriodEnd",
		"canceled_at": "canceledAt",
		"started_at": "startedAt",
		"ends_at": "endsAt",
		"ended_at": "endedAt",
		"past_due_at": "pastDueAt",
		"pause_at_period_end": "pauseAtPeriodEnd",
		"paused_at": "pausedAt",
		"resumes_at": "resumesAt",
		"customer_id": "customerId",
		"product_id": "productId",
		"discount_id": "discountId",
		"checkout_id": "checkoutId",
		"customer_cancellation_reason": "customerCancellationReason",
		"customer_cancellation_comment": "customerCancellationComment",
		"custom_field_data": "customFieldData",
		"pending_update": "pendingUpdate"
	});
}));
int(), int(), int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhooksubscriptionactivepayload.js
/** @internal */
var WebhookSubscriptionActivePayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("subscription.active"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Subscription$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhooksubscriptioncanceledpayload.js
/** @internal */
var WebhookSubscriptionCanceledPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("subscription.canceled"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Subscription$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhooksubscriptioncreatedpayload.js
/** @internal */
var WebhookSubscriptionCreatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("subscription.created"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Subscription$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhooksubscriptionrevokedpayload.js
/** @internal */
var WebhookSubscriptionRevokedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("subscription.revoked"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Subscription$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhooksubscriptionuncanceledpayload.js
/** @internal */
var WebhookSubscriptionUncanceledPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("subscription.uncanceled"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Subscription$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhooksubscriptionupdatedpayload.js
/** @internal */
var WebhookSubscriptionUpdatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("subscription.updated"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Subscription$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookcustomercreatedpayload.js
/** @internal */
var WebhookCustomerCreatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("customer.created"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Customer$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookcustomerupdatedpayload.js
/** @internal */
var WebhookCustomerUpdatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("customer.updated"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Customer$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookcustomerdeletedpayload.js
/** @internal */
var WebhookCustomerDeletedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("customer.deleted"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Customer$inboundSchema
});
/** @internal */
var CustomerStateBenefitGrant$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	granted_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	benefit_id: /* @__PURE__ */ string(),
	benefit_type: BenefitType$inboundSchema,
	benefit_metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	properties: smartUnion([
		BenefitGrantDiscordProperties$inboundSchema,
		BenefitGrantGitHubRepositoryProperties$inboundSchema,
		BenefitGrantDownloadablesProperties$inboundSchema,
		BenefitGrantLicenseKeysProperties$inboundSchema,
		BenefitGrantCustomProperties$inboundSchema,
		BenefitGrantFeatureFlagProperties$inboundSchema,
		BenefitGrantSlackSharedChannelProperties$inboundSchema
	])
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"granted_at": "grantedAt",
		"benefit_id": "benefitId",
		"benefit_type": "benefitType",
		"benefit_metadata": "benefitMetadata"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/customerstatemeter.js
/** @internal */
var CustomerStateMeter$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	meter_id: /* @__PURE__ */ string(),
	consumed_units: /* @__PURE__ */ number(),
	credited_units: int(),
	balance: /* @__PURE__ */ number()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"meter_id": "meterId",
		"consumed_units": "consumedUnits",
		"credited_units": "creditedUnits"
	});
}));
int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/customerstatesubscriptionmeter.js
/** @internal */
var CustomerStateSubscriptionMeter$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	consumed_units: /* @__PURE__ */ number(),
	credited_units: int(),
	amount: int(),
	meter_id: /* @__PURE__ */ string()
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"consumed_units": "consumedUnits",
		"credited_units": "creditedUnits",
		"meter_id": "meterId"
	});
}));
int(), int();
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/customerstatesubscription.js
var Status = {
	Active: "active",
	Trialing: "trialing"
};
int();
int();
/** @internal */
var Status$inboundSchema = inboundSchema(Status);
/** @internal */
var CustomerStateSubscription$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	custom_field_data: /* @__PURE__ */ optional(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ nullable(smartUnion([
		/* @__PURE__ */ string(),
		int(),
		/* @__PURE__ */ boolean(),
		/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))
	])))),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	status: Status$inboundSchema,
	amount: int(),
	currency: /* @__PURE__ */ string(),
	recurring_interval: RecurringInterval$inboundSchema,
	current_period_start: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	current_period_end: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	trial_start: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	trial_end: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	cancel_at_period_end: /* @__PURE__ */ boolean(),
	canceled_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	started_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	ends_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	product_id: /* @__PURE__ */ string(),
	discount_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	meters: /* @__PURE__ */ array(CustomerStateSubscriptionMeter$inboundSchema)
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"custom_field_data": "customFieldData",
		"recurring_interval": "recurringInterval",
		"current_period_start": "currentPeriodStart",
		"current_period_end": "currentPeriodEnd",
		"trial_start": "trialStart",
		"trial_end": "trialEnd",
		"cancel_at_period_end": "cancelAtPeriodEnd",
		"canceled_at": "canceledAt",
		"started_at": "startedAt",
		"ends_at": "endsAt",
		"product_id": "productId",
		"discount_id": "discountId"
	});
}));
int(), int();
/** @internal */
var CustomerStateIndividual$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	external_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	email: /* @__PURE__ */ string(),
	email_verified: /* @__PURE__ */ boolean(),
	type: /* @__PURE__ */ literal("individual"),
	name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_address: /* @__PURE__ */ nullable(Address$inboundSchema),
	tax_id: /* @__PURE__ */ nullable(/* @__PURE__ */ array(/* @__PURE__ */ nullable(smartUnion([/* @__PURE__ */ string(), TaxIDFormat$inboundSchema])))),
	locale: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	organization_id: /* @__PURE__ */ string(),
	default_payment_method_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	deleted_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	avatar_url: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	active_subscriptions: /* @__PURE__ */ array(CustomerStateSubscription$inboundSchema),
	granted_benefits: /* @__PURE__ */ array(CustomerStateBenefitGrant$inboundSchema),
	active_meters: /* @__PURE__ */ array(CustomerStateMeter$inboundSchema)
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"external_id": "externalId",
		"email_verified": "emailVerified",
		"billing_name": "billingName",
		"billing_address": "billingAddress",
		"tax_id": "taxId",
		"organization_id": "organizationId",
		"default_payment_method_id": "defaultPaymentMethodId",
		"deleted_at": "deletedAt",
		"avatar_url": "avatarUrl",
		"active_subscriptions": "activeSubscriptions",
		"granted_benefits": "grantedBenefits",
		"active_meters": "activeMeters"
	});
}));
/** @internal */
var CustomerStateTeam$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	id: /* @__PURE__ */ string(),
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	metadata: /* @__PURE__ */ record(/* @__PURE__ */ string(), MetadataOutputType$inboundSchema),
	external_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	email: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	email_verified: /* @__PURE__ */ boolean(),
	type: /* @__PURE__ */ literal("team"),
	name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_name: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	billing_address: /* @__PURE__ */ nullable(Address$inboundSchema),
	tax_id: /* @__PURE__ */ nullable(/* @__PURE__ */ array(/* @__PURE__ */ nullable(smartUnion([/* @__PURE__ */ string(), TaxIDFormat$inboundSchema])))),
	locale: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	organization_id: /* @__PURE__ */ string(),
	default_payment_method_id: /* @__PURE__ */ optional(/* @__PURE__ */ nullable(/* @__PURE__ */ string())),
	deleted_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	avatar_url: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	active_subscriptions: /* @__PURE__ */ array(CustomerStateSubscription$inboundSchema),
	granted_benefits: /* @__PURE__ */ array(CustomerStateBenefitGrant$inboundSchema),
	active_meters: /* @__PURE__ */ array(CustomerStateMeter$inboundSchema)
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"external_id": "externalId",
		"email_verified": "emailVerified",
		"billing_name": "billingName",
		"billing_address": "billingAddress",
		"tax_id": "taxId",
		"organization_id": "organizationId",
		"default_payment_method_id": "defaultPaymentMethodId",
		"deleted_at": "deletedAt",
		"avatar_url": "avatarUrl",
		"active_subscriptions": "activeSubscriptions",
		"granted_benefits": "grantedBenefits",
		"active_meters": "activeMeters"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookcustomerstatechangedpayload.js
/** @internal */
var WebhookCustomerStateChangedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("customer.state_changed"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: /* @__PURE__ */ union([CustomerStateIndividual$inboundSchema, CustomerStateTeam$inboundSchema])
});
/** @internal */
var SeatStatus$inboundSchema = inboundSchema({
	Pending: "pending",
	Claimed: "claimed",
	Revoked: "revoked"
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/customerseat.js
/** @internal */
var CustomerSeat$inboundSchema = /* @__PURE__ */ pipe(/* @__PURE__ */ object({
	created_at: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	modified_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	id: /* @__PURE__ */ string(),
	subscription_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	order_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	status: SeatStatus$inboundSchema,
	customer_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	member_id: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	member: /* @__PURE__ */ nullable(Member$inboundSchema),
	email: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	customer_email: /* @__PURE__ */ nullable(/* @__PURE__ */ string()),
	invitation_token_expires_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	claimed_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	revoked_at: /* @__PURE__ */ nullable(/* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v)))),
	seat_metadata: /* @__PURE__ */ nullable(/* @__PURE__ */ record(/* @__PURE__ */ string(), /* @__PURE__ */ any()))
}), /* @__PURE__ */ transform((v) => {
	return remap(v, {
		"created_at": "createdAt",
		"modified_at": "modifiedAt",
		"subscription_id": "subscriptionId",
		"order_id": "orderId",
		"customer_id": "customerId",
		"member_id": "memberId",
		"customer_email": "customerEmail",
		"invitation_token_expires_at": "invitationTokenExpiresAt",
		"claimed_at": "claimedAt",
		"revoked_at": "revokedAt",
		"seat_metadata": "seatMetadata"
	});
}));
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookcustomerseatassignedpayload.js
/** @internal */
var WebhookCustomerSeatAssignedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("customer_seat.assigned"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: CustomerSeat$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookcustomerseatclaimedpayload.js
/** @internal */
var WebhookCustomerSeatClaimedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("customer_seat.claimed"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: CustomerSeat$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookcustomerseatrevokedpayload.js
/** @internal */
var WebhookCustomerSeatRevokedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("customer_seat.revoked"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: CustomerSeat$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookmembercreatedpayload.js
/** @internal */
var WebhookMemberCreatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("member.created"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Member$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookmemberupdatedpayload.js
/** @internal */
var WebhookMemberUpdatedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("member.updated"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Member$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookmemberdeletedpayload.js
/** @internal */
var WebhookMemberDeletedPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("member.deleted"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Member$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhookcheckoutexpiredpayload.js
/** @internal */
var WebhookCheckoutExpiredPayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("checkout.expired"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Checkout$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/models/components/webhooksubscriptionpastduepayload.js
/** @internal */
var WebhookSubscriptionPastDuePayload$inboundSchema = /* @__PURE__ */ object({
	type: /* @__PURE__ */ literal("subscription.past_due"),
	timestamp: /* @__PURE__ */ pipe(/* @__PURE__ */ datetime({ offset: true }), /* @__PURE__ */ transform((v) => new Date(v))),
	data: Subscription$inboundSchema
});
//#endregion
//#region node_modules/@polar-sh/sdk/dist/esm/webhooks.js
var WebhookVerificationError = class extends Error {
	constructor(message) {
		super(message);
		this.message = message;
	}
};
var parseEvent = (parsed) => {
	try {
		switch (parsed.type) {
			case "customer.created": return WebhookCustomerCreatedPayload$inboundSchema.parse(parsed);
			case "customer.updated": return WebhookCustomerUpdatedPayload$inboundSchema.parse(parsed);
			case "customer.deleted": return WebhookCustomerDeletedPayload$inboundSchema.parse(parsed);
			case "customer.state_changed": return WebhookCustomerStateChangedPayload$inboundSchema.parse(parsed);
			case "customer_seat.assigned": return WebhookCustomerSeatAssignedPayload$inboundSchema.parse(parsed);
			case "customer_seat.claimed": return WebhookCustomerSeatClaimedPayload$inboundSchema.parse(parsed);
			case "customer_seat.revoked": return WebhookCustomerSeatRevokedPayload$inboundSchema.parse(parsed);
			case "member.created": return WebhookMemberCreatedPayload$inboundSchema.parse(parsed);
			case "member.updated": return WebhookMemberUpdatedPayload$inboundSchema.parse(parsed);
			case "member.deleted": return WebhookMemberDeletedPayload$inboundSchema.parse(parsed);
			case "benefit.created": return WebhookBenefitCreatedPayload$inboundSchema.parse(parsed);
			case "benefit_grant.created": return WebhookBenefitGrantCreatedPayload$inboundSchema.parse(parsed);
			case "benefit_grant.cycled": return WebhookBenefitGrantCycledPayload$inboundSchema.parse(parsed);
			case "benefit_grant.revoked": return WebhookBenefitGrantRevokedPayload$inboundSchema.parse(parsed);
			case "benefit_grant.updated": return WebhookBenefitGrantUpdatedPayload$inboundSchema.parse(parsed);
			case "benefit.updated": return WebhookBenefitUpdatedPayload$inboundSchema.parse(parsed);
			case "checkout.created": return WebhookCheckoutCreatedPayload$inboundSchema.parse(parsed);
			case "checkout.updated": return WebhookCheckoutUpdatedPayload$inboundSchema.parse(parsed);
			case "checkout.expired": return WebhookCheckoutExpiredPayload$inboundSchema.parse(parsed);
			case "order.created": return WebhookOrderCreatedPayload$inboundSchema.parse(parsed);
			case "order.paid": return WebhookOrderPaidPayload$inboundSchema.parse(parsed);
			case "order.updated": return WebhookOrderUpdatedPayload$inboundSchema.parse(parsed);
			case "order.refunded": return WebhookOrderRefundedPayload$inboundSchema.parse(parsed);
			case "organization.updated": return WebhookOrganizationUpdatedPayload$inboundSchema.parse(parsed);
			case "product.created": return WebhookProductCreatedPayload$inboundSchema.parse(parsed);
			case "product.updated": return WebhookProductUpdatedPayload$inboundSchema.parse(parsed);
			case "refund.created": return WebhookRefundCreatedPayload$inboundSchema.parse(parsed);
			case "refund.updated": return WebhookRefundUpdatedPayload$inboundSchema.parse(parsed);
			case "subscription.active": return WebhookSubscriptionActivePayload$inboundSchema.parse(parsed);
			case "subscription.canceled": return WebhookSubscriptionCanceledPayload$inboundSchema.parse(parsed);
			case "subscription.created": return WebhookSubscriptionCreatedPayload$inboundSchema.parse(parsed);
			case "subscription.revoked": return WebhookSubscriptionRevokedPayload$inboundSchema.parse(parsed);
			case "subscription.uncanceled": return WebhookSubscriptionUncanceledPayload$inboundSchema.parse(parsed);
			case "subscription.updated": return WebhookSubscriptionUpdatedPayload$inboundSchema.parse(parsed);
			case "subscription.past_due": return WebhookSubscriptionPastDuePayload$inboundSchema.parse(parsed);
			default: throw new SDKValidationError(`Unknown event type: ${parsed.type}`, parsed.type, parsed);
		}
	} catch (error) {
		throw new SDKValidationError("Failed to parse event", error, parsed);
	}
};
var validateEvent = (body, headers, secret) => {
	const base64Secret = Buffer.from(secret, "utf-8").toString("base64");
	const webhook = new import_dist.Webhook(base64Secret);
	try {
		return parseEvent(webhook.verify(body, headers));
	} catch (error) {
		if (error instanceof import_dist.WebhookVerificationError) throw new WebhookVerificationError(error.message);
		throw error;
	}
};
//#endregion
export { validateEvent as n, WebhookVerificationError as t };
