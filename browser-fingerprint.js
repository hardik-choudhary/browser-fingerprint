var fingerprints = 0;
var fingerprintsData = {};

function set_fingerprint_data(id, data) {
	fingerprints++;
    fingerprintsData[id] = data;
}

/**
 * Use only once, on one refresh 
 * Don't forgot to add iframe to page
*/
function getFingerprint() {
    fingerprints = 0;
    fingerprintsData = {};
    return new Promise(function (resolve, reject) {
        try {
            set_fingerprint_data('oscpu', navigator.oscpu);
            set_fingerprint_data('TouchSupport', getTouchSupport());
            set_fingerprint_data('isIEOrOldEdge', isIEOrOldEdge());
            set_fingerprint_data('isChromium', isChromium());
            set_fingerprint_data('isDesktopSafari', isDesktopSafari());
            set_fingerprint_data('isGecko', isGecko());
            set_fingerprint_data('isChromium86OrNewer', isChromium86OrNewer());
            set_fingerprint_data('Languages', getLanguages());
            set_fingerprint_data('getPlugins', getPlugins());
            set_fingerprint_data('SessionStorage', getSessionStorage());
            set_fingerprint_data('LocalStorage', getLocalStorage());
            set_fingerprint_data('getIndexedDB', getIndexedDB());
            set_fingerprint_data('OpenDatabase', !!window.openDatabase);
            set_fingerprint_data('colorDepth', window.screen.colorDepth);
            set_fingerprint_data('deviceMemory', navigator.deviceMemory);
            set_fingerprint_data('hardwareConcurrency', navigator.hardwareConcurrency);
            set_fingerprint_data('TimezoneOffset', new Date().getTimezoneOffset());
            set_fingerprint_data('Timezone', getTimezone());
            set_fingerprint_data('cpuClass', navigator.cpuClass);
            set_fingerprint_data('platform', navigator.platform);
            set_fingerprint_data('productSub', navigator.productSub);
            set_fingerprint_data('EmptyEvalLength', eval.toString().length);
            set_fingerprint_data('ErrorFF', getErrorFF());
            set_fingerprint_data('vendor', navigator.vendor);
            set_fingerprint_data('ischrome', window.chrome !== undefined);
            set_fingerprint_data('areCookiesEnabled', areCookiesEnabled());
            set_fingerprint_data('doNotTrack', navigator.doNotTrack);
            var navigatorProperties = "";
            var navigatorPropertiesCount = 0;
            for(let item in navigator){
                if(navigatorProperties != ""){
                    navigatorProperties = navigatorProperties + ",";
                }
                navigatorProperties = navigatorProperties + item;
                navigatorPropertiesCount = navigatorPropertiesCount+1;
            }
            set_fingerprint_data('navigatorProperties', navigatorProperties);
            set_fingerprint_data('navigatorPropertiesCount', navigatorPropertiesCount);
            set_fingerprint_data('buildID', navigator.buildID);
            set_fingerprint_data('vendorSub', navigator.vendorSub);
            set_fingerprint_data('display', getDisplay());
            set_fingerprint_data('silverlight', fingerprint_silverlight());
            set_fingerprint_data('userAgent', navigator.userAgent);
            set_fingerprint_data('fontsmoothing', fingerprint_fontsmoothing());
            set_fingerprint_data('fonts', fingerprint_fonts());
            set_fingerprint_data('fingerprint_java', fingerprint_java());

            var canvasFingerprint = getCanvasFingerprint();
            set_fingerprint_data('canvas', sha256(canvasFingerprint.canvas));
            set_fingerprint_data('winding', canvasFingerprint.winding);

            set_fingerprint_data('webGLUnMasked', webGLUnMaskedData());
            set_fingerprint_data('webGL', webGLBaseData());
            set_fingerprint_data('WebGLFingerprint', sha256(getWebGLFingerprint()));            
            audioFpOne().then((t)=>{
                set_fingerprint_data('audioOne', sha256(t));
            });
            setTimeout(function () {
                AudioFingerprint((t)=>{set_fingerprint_data('audioTwo', sha256(t));});
                setTimeout(function () {
                    let fpString = "";
                    let fpStrings = "";
                    for(var key in fingerprintsData) {
                        fpString += fingerprintsData[key]+",";
                        fpStrings += key+" = "+fingerprintsData[key]+",\n";
                    }
                    resolve(sha256(fpString));
                }, 100);
            },100);
        } catch (error) {
            reject(error);
        }
    });
}



/** Canvas */
function getCanvasFingerprint() {
    const canvas = document.createElement('canvas');
    canvas.width = 240;
    canvas.height = 140;
    canvas.style.display = 'inline';
    const context = canvas.getContext('2d');
    if (!(context && canvas.toDataURL)) {
        return { winding: false, canvas: "" };
    }
    context.rect(0, 0, 10, 10);
    context.rect(2, 2, 6, 6);
    const winding = !context.isPointInPath(5, 5, 'evenodd');
    context.textBaseline = 'alphabetic';
    context.fillStyle = '#f60';
    context.fillRect(125, 1, 62, 20);
    context.fillStyle = '#069';
    context.font = '11pt no-real-font-123';
    const printedText = 'Cwm fjordbank \ud83d\ude03 gly';
    context.fillText(printedText, 2, 15);
    context.fillStyle = 'rgba(102, 204, 0, 0.2)';
    context.font = '18pt Arial';
    context.fillText(printedText, 4, 45);
    context.globalCompositeOperation = 'multiply';
    context.fillStyle = 'rgb(255,0,255)';
    context.beginPath();
    context.arc(50, 50, 50, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.fillStyle = 'rgb(0,255,255)';
    context.beginPath();
    context.arc(100, 50, 50, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.fillStyle = 'rgb(255,255,0)';
    context.beginPath();
    context.arc(75, 100, 50, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.fillStyle = 'rgb(255,0,255)';
    context.arc(75, 75, 75, 0, Math.PI * 2, true);
    context.arc(75, 75, 25, 0, Math.PI * 2, true);
    context.fill('evenodd');

    return { winding, canvas: canvas.toDataURL() };
}

/** webGL */
function webGLBaseData() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    var Version = "", Renderer = "", Vendor = "";
    if (ctx) {
        try {
            Version = ctx.getParameter(ctx.VERSION);
            Renderer = ctx.getParameter(ctx.RENDERER);
            Vendor = ctx.getParameter(ctx.VENDOR);
        } catch (e) {
            Version = "";
            Renderer = "";
            Vendor = "";
        }
    }
    return "Version="+Version+", Renderer="+Renderer+", Vendor="+Vendor;
}
function webGLUnMaskedData() {
    var canvas = document.createElement('canvas');
    var ctx1 = canvas.getContext("webgl");
    var ctx2 = canvas.getContext("experimental-webgl");
    var UnMaskedVendor = "", UnMaskedRenderer = "";
    try {
        if (ctx1.getSupportedExtensions().indexOf("WEBGL_debug_renderer_info") >= 0) {
            var ext = ctx1.getExtension('WEBGL_debug_renderer_info');
            UnMaskedVendor = ctx1.getParameter(ext.UNMASKED_VENDOR_WEBGL);
            UnMaskedRenderer = ctx1.getParameter(ext.UNMASKED_RENDERER_WEBGL);
        }
        else if (ctx2.getSupportedExtensions().indexOf("WEBGL_debug_renderer_info") >= 0) {
            var ext = ctx2.getExtension('WEBGL_debug_renderer_info');
            UnMaskedVendor = ctx2.getParameter(ext.UNMASKED_VENDOR_WEBGL);
            UnMaskedRenderer = ctx2.getParameter(ext.UNMASKED_RENDERER_WEBGL);
        }
    } catch (e) {
        UnMaskedVendor = "";
        UnMaskedRenderer = "";
    }
    return "Vendor="+UnMaskedVendor+", Renderer="+UnMaskedRenderer;
}
function getWebGLFingerprint() {
    var a;
    try {
        var b = document.createElement("canvas");
        b.style.cssText = "border: 2px solid navy";
        b.width = 256,
            b.height = 128,
            a = b.getContext("webgl2", {
                preserveDrawingBuffer: !0
            }) || b.getContext("experimental-webgl2", {
                preserveDrawingBuffer: !0
            }) || b.getContext("webgl", {
                preserveDrawingBuffer: !0
            }) || b.getContext("experimental-webgl", {
                preserveDrawingBuffer: !0
            }) || b.getContext("moz-webgl", {
                preserveDrawingBuffer: !0
            })
    } catch (e) {
    }
    if (null == a)
        return a;
    try {
        var d = a.createBuffer();
        a.bindBuffer(a.ARRAY_BUFFER, d);
        var e = new Float32Array([-.3, .03, 0, .7, -.5, 0, .37, 0.8, 0]);
        a.bufferData(a.ARRAY_BUFFER, e, a.STATIC_DRAW),
            d.itemSize = 3,
            d.numItems = 3;
        var f = a.createProgram()
            , g = a.createShader(a.VERTEX_SHADER);
        a.shaderSource(g, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}"),
            a.compileShader(g);
        var h = a.createShader(a.FRAGMENT_SHADER);
        a.shaderSource(h, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}"),
            a.compileShader(h),
            a.attachShader(f, g),
            a.attachShader(f, h),
            a.linkProgram(f),
            a.useProgram(f),
            f.vertexPosAttrib = a.getAttribLocation(f, "attrVertex"),
            f.offsetUniform = a.getUniformLocation(f, "uniformOffset"),
            a.enableVertexAttribArray(f.vertexPosArray),
            a.vertexAttribPointer(f.vertexPosAttrib, d.itemSize, a.FLOAT, !1, 0, 0),
            a.uniform2f(f.offsetUniform, 1, 1),
            a.drawArrays(a.TRIANGLE_STRIP, 0, d.numItems);
    } catch (e) {

    }
    var info;
    try {
        var j = new Uint8Array(131072);
        if (a.readPixels(0, 0, 256, 128, a.RGBA, a.UNSIGNED_BYTE, j),
            info = JSON.stringify(j).replace(/,?"[0-9]+":/g, ""),
            "" == info.replace(/^{[0]+}$/g, ""))
            throw err = "JSON.stringify only ZEROes";
        return info;
    } catch (e) {

    }

    return null;
}

/** Audio */
function audioFpOne() {
    return new Promise(function (resolve, reject) {
        try {
            var context;
            if (context = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100, 44100), !context) {
                resolve("pxi_full_buffer=,pxi_checksum=");
            }

            // Create oscillator
            var pxi_oscillator = context.createOscillator();
            pxi_oscillator.type = "triangle";
            pxi_oscillator.frequency.value = 1e4;

            // Create and configure compressor
            var pxi_compressor = context.createDynamicsCompressor();
            pxi_compressor.threshold && (pxi_compressor.threshold.value = -50);
            pxi_compressor.knee && (pxi_compressor.knee.value = 40);
            pxi_compressor.ratio && (pxi_compressor.ratio.value = 12);
            pxi_compressor.reduction && (pxi_compressor.reduction.value = -20);
            pxi_compressor.attack && (pxi_compressor.attack.value = 0);
            pxi_compressor.release && (pxi_compressor.release.value = .25);

            // Connect nodes
            pxi_oscillator.connect(pxi_compressor);
            pxi_compressor.connect(context.destination);

            // Start audio processing
            pxi_oscillator.start(0);
            context.startRendering();
            context.oncomplete = function (event) {
                try {
                    var pxi_output = 0;
                    var acc = '';
                    for (var i = 0; i < event.renderedBuffer.length; i++) {
                        acc += event.renderedBuffer.getChannelData(0)[i].toString();
                    }
                    for (var i = 4500; 5e3 > i; i++) {
                        pxi_output += Math.abs(event.renderedBuffer.getChannelData(0)[i]);
                    }
                    resolve("pxi_full_buffer="+acc+",pxi_checksum="+pxi_output.toString());
                } catch (e) {
                    resolve("pxi_full_buffer=,pxi_checksum=");
                }
                pxi_compressor.disconnect();
            }
        } catch (e) {
            resolve("pxi_full_buffer=,pxi_checksum=");
        }
    });
}
function AudioFingerprint(callback) {
    var hybrid_output = [];
    var audioCtx = new (window.AudioContext || window.webkitAudioContext),
        analyser = audioCtx.createAnalyser();

    if (typeof analyser.getFloatFrequencyData !== 'function') {
        analyser.disconnect();
        callback('');
    }

    var oscillator = audioCtx.createOscillator(),
        gain = audioCtx.createGain(),
        scriptProcessor = audioCtx.createScriptProcessor(4096, 1, 1);

    // Create and configure compressor
    compressor = audioCtx.createDynamicsCompressor();
    compressor.threshold && (compressor.threshold.value = -50);
    compressor.knee && (compressor.knee.value = 40);
    compressor.ratio && (compressor.ratio.value = 12);
    compressor.reduction && (compressor.reduction.value = -20);
    compressor.attack && (compressor.attack.value = 0);
    compressor.release && (compressor.release.value = .25);

    gain.gain.value = 0; // Disable volume
    oscillator.type = "triangle"; // Set oscillator to output triangle wave
    oscillator.connect(compressor); // Connect oscillator output to dynamic compressor
    compressor.connect(analyser); // Connect compressor to analyser
    analyser.connect(scriptProcessor); // Connect analyser output to scriptProcessor input
    scriptProcessor.connect(gain); // Connect scriptProcessor output to gain input
    gain.connect(audioCtx.destination); // Connect gain output to audiocontext destination

    scriptProcessor.onaudioprocess = function (bins) {
        bins = new Float32Array(analyser.frequencyBinCount);
        analyser.getFloatFrequencyData(bins);
        for (var i = 0; i < bins.length; i = i + 1) {
            hybrid_output.push(bins[i]);
        }
        analyser.disconnect();
        scriptProcessor.disconnect();
        gain.disconnect();

        // pick only first 30 elements
        hybrid_output = hybrid_output.slice(0, 30)
        var acc = '';
        for (var i = 0; i < hybrid_output.length; i++) {
            acc += hybrid_output[i].toString();
        }
        callback(acc);
    };
    oscillator.start(0);
}
/** Not Using right now */
function audioContextFingerprint() {
    function a(a, b, c) {
        for (var d in b) "dopplerFactor" === d || "state" === d || "speedOfSound" === d || "currentTime" ===
            d || "number" !== typeof b[d] && "string" !== typeof b[d] || (a[(c ? c : "") + d] = b[d]);
        return a
    }
    var nt_vc_output, outputValue = "";
    try {
        var nt_vc_context = window.AudioContext || window.webkitAudioContext;
        if ("function" === typeof nt_vc_context) {
            var f = new nt_vc_context,
                d = f.createAnalyser();
            nt_vc_output = a({}, f, "ac-");
            nt_vc_output = a(nt_vc_output, f.destination, "ac-");
            nt_vc_output = a(nt_vc_output, f.listener, "ac-");
            nt_vc_output = a(nt_vc_output, d, "an-");

            for (var key in nt_vc_output) {
                if (outputValue == "") {
                    outputValue = key + "=" + nt_vc_output[key];
                }
                else {
                    outputValue = outputValue + "," + key + "=" + nt_vc_output[key];
                }
            }
        }
    } catch (g) {

    }
    return outputValue;
}

/** Iframe Rects */
/** Not Using right now */
function getIframeRects() {
    var outputValue = "";
    function ucFirst(a) {
        return a.charAt(0).toUpperCase() + a.substr(1, a.length - 1)
    }
    var e = ["", "", ""], d = [], f = "";
    for (var iframe = document.getElementById("tt-fp-rects-iframe").contentWindow.document, h = 0; h < 3; h++) {
        var rect = iframe.getElementById("rect" + h);
        d[h] = rect.getClientRects()[0],
            rect.style.border = "1px #eee solid";
        var box = iframe.getElementById("box" + h);
        box.style.display = "block";
        box.top = d[h].top;
        box.left = d[h].left;
        box.width = d[h].width;
        box.height = d[h].height;
        box.borderColor = ["red", "green", "blue"][h];
    }
    iframe.getElementById("self").classList.add("on");

    for (var i in d[0]) {
        if ("function" != typeof d[0][i]) {
            for (var h = 0; h < 3; h++)
                e[h] += d[h][i];
            f += "<tr><td>" + ucFirst(i) + '</td><td class="br2">' + d[0][i] + '</td><td class="br">' + ucFirst(i) + '</td><td class="br2">' + d[1][i] + '</td><td class="br">' + ucFirst(i) + "</td><td>" + d[2][i] + "</td></tr>"
        }
    }
    for (var h = 1; h <= 3; h++) {
        if (outputValue == "") {
            outputValue = "clientRectsFp" + h + "=" + e[h - 1].toString();
        }
        else {
            outputValue = outputValue + "," + "clientRectsFp" + h + "=" + e[h - 1].toString();
        }
    }
    return outputValue;
}

function getTouchSupport() {
    let maxTouchPoints = 0;
    let touchEvent;
    if (navigator.maxTouchPoints !== undefined) {
        maxTouchPoints = navigator.maxTouchPoints;
    }
    else if (navigator.msMaxTouchPoints !== undefined) {
        maxTouchPoints = navigator.msMaxTouchPoints;
    }
    try {
        document.createEvent('TouchEvent');
        touchEvent = true;
    }
    catch (_) {
        touchEvent = false;
    }
    const touchStart = 'ontouchstart' in window;
    return "maxTouchPoints="+maxTouchPoints+",touchEvent="+touchEvent+",touchStart="+ touchStart;
}

function isIEOrOldEdge() {
    return [
        'msWriteProfilerMark' in window,
        'msLaunchUri' in navigator,
        'msSaveBlob' in navigator,
    ].reduce((sum, value) => sum + (value ? 1 : 0), 0) >= 2;
}

function isChromium() {
    return [
        'userActivation' in navigator,
        'mediaSession' in navigator,
        navigator.vendor.indexOf('Google') === 0,
        'BackgroundFetchManager' in window,
        'BatteryManager' in window,
        'webkitMediaStream' in window,
        'webkitSpeechGrammar' in window,
    ].reduce((sum, value) => sum + (value ? 1 : 0), 0) >= 5;
}

function isDesktopSafari() {
    return 'safari' in window;
}

function isGecko() {
    var _a;
    // Based on research in September 2020
    return [
        'buildID' in navigator,
        ((_a = document.documentElement) === null || _a === void 0 ? void 0 : _a.style) && 'MozAppearance' in document.documentElement.style,
        'MediaRecorderErrorEvent' in window,
        'mozInnerScreenX' in window,
        'CSSMozDocumentRule' in window,
        'CanvasCaptureMediaStream' in window,
    ].reduce((sum, value) => sum + (value ? 1 : 0), 0) >= 4;
}

function isChromium86OrNewer() {
    return [
        !('MediaSettingsRange' in window),
        !('PhotoCapabilities' in window),
        'RTCEncodedAudioFrame' in window,
        ('' + window.Intl) === '[object Intl]',
    ].reduce((sum, value) => sum + (value ? 1 : 0), 0) >= 2;
}

function getLanguages() {
    "use strict";
    var strSep, strPair, strOnError, strLang, strTypeLng, strTypeLngs, strTypeBrLng, strTypeSysLng, strTypeUsrLng, strOut;

    strSep = "|";
    strPair = "=";
    strOnError = "Error";
    strLang = null;
    strTypeLng = null;
    strTypeLngs = null;
    strTypeBrLng = null;
    strTypeSysLng = null;
    strTypeUsrLng = null;
    strOut = null;

    try {
        strTypeLng = typeof (navigator.language);
        strTypeLngs = typeof (navigator.languages);
        strTypeBrLng = typeof (navigator.browserLanguage);
        strTypeSysLng = typeof (navigator.systemLanguage);
        strTypeUsrLng = typeof (navigator.userLanguage);

        if (strTypeLng !== "undefined") {
            strLang = "lang" + strPair + navigator.language + strSep;
        } else if (strTypeBrLng !== "undefined") {
            strLang = "lang" + strPair + navigator.browserLanguage + strSep;
        } else {
            strLang = "lang" + strPair + strSep;
        }
        if (strTypeSysLng !== "undefined") {
            strLang += "syslang" + strPair + navigator.systemLanguage + strSep;
        } else {
            strLang += "syslang" + strPair + strSep;
        }
        if (strTypeUsrLng !== "undefined") {
            strLang += "userlang" + strPair + navigator.userLanguage + strSep;
        } else {
            strLang += "userlang" + strPair + strSep;
        }
        if(strTypeLngs !== "undefined"){
            var tempLang = "";
            navigator.languages.forEach(function(item) {
                if(tempLang != ""){
                    tempLang = tempLang + ",";
                }
                tempLang = tempLang + item;
            });
            strLang += "langs" + strPair + tempLang;
        }
        else{
            strLang += "langs" + strPair;
        }
        strOut = strLang;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}

function getPlugins() {
    var plugins = "";
    var pluginsLength = navigator.plugins.length;
    for(var i = 0; i < pluginsLength; i++) {
        if(plugins != ""){
            plugins = plugins + ",";
        }
        plugins = plugins + navigator.plugins[i].name;
    }
    return plugins;
}

function getSessionStorage() {
    try {
        return !!window.sessionStorage;
    }
    catch (error) {
        return true;
    }
}

function getLocalStorage() {
    try {
        return !!window.localStorage;
    }
    catch (e) {
        return true;
    }
}

function getIndexedDB() {
    if (isIEOrOldEdge()) {
        return undefined;
    }
    try {
        return !!window.indexedDB;
    }
    catch (e) {
        /* SecurityError when referencing it means it exists */
        return true;
    }
}

function getTimezone() {
    var _a;
    if ((_a = window.Intl) === null || _a === void 0 ? void 0 : _a.DateTimeFormat) {
        return new window.Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    return undefined;
}

function getErrorFF() {
    try {
        throw 'a';
    }
    catch (e) {
        try {
            e.toSource();
            return true;
        }
        catch (e2) {
            return false;
        }
    }
}

function areCookiesEnabled() {
    try {
        // Create cookie
        document.cookie = 'cookietest=1';
        const result = document.cookie.indexOf('cookietest=') !== -1;
        // Delete cookie
        document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
        return result;
    }
    catch (e) {
        return false;
    }
}

function getDisplay() {
    "use strict";
    var strSep, strPair, strOnError, strScreen, strDisplay, strOut;

    strSep = "|";
    strPair = "=";
    strOnError = "Error";
    strScreen = null;
    strDisplay = null;
    strOut = null;

    try {
        strScreen = window.screen;
        if (strScreen) {
            strDisplay = strScreen.colorDepth + strSep + strScreen.width + strSep + strScreen.height + strSep + strScreen.availWidth + strSep + strScreen.availHeight + strSep + strScreen.availTop + strSep + strScreen.availLeft + strSep + strScreen.left + strSep + strScreen.top;
        }
        strOut = strDisplay;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_silverlight() {
    "use strict";
    var strOnError, objControl, objPlugin, strSilverlightVersion, strOut;

    strOnError = "Error";
    objControl = null;
    objPlugin = null;
    strSilverlightVersion = null;
    strOut = null;

    try {
        try {
            objControl = new ActiveXObject('AgControl.AgControl');
            if (objControl.IsVersionSupported("5.0")) {
                strSilverlightVersion = "5.x";
            } else if (objControl.IsVersionSupported("4.0")) {
                strSilverlightVersion = "4.x";
            } else if (objControl.IsVersionSupported("3.0")) {
                strSilverlightVersion = "3.x";
            } else if (objControl.IsVersionSupported("2.0")) {
                strSilverlightVersion = "2.x";
            } else {
                strSilverlightVersion = "1.x";
            }
            objControl = null;
        } catch (e) {
            objPlugin = navigator.plugins["Silverlight Plug-In"];
            if (objPlugin) {
                if (objPlugin.description === "1.0.30226.2") {
                    strSilverlightVersion = "2.x";
                } else {
                    strSilverlightVersion = parseInt(objPlugin.description[0], 10);
                }
            } else {
                strSilverlightVersion = "N/A";
            }
        }
        strOut = strSilverlightVersion;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_fontsmoothing() {
    "use strict";
    var strOnError, strFontSmoothing, canvasNode, ctx, i, j, imageData, alpha, strOut;

    strOnError = "Unknown";
    strFontSmoothing = null;
    canvasNode = null;
    ctx = null;
    imageData = null;
    alpha = null;
    strOut = null;

    if (typeof(screen.fontSmoothingEnabled) !== "undefined") {
        strFontSmoothing = screen.fontSmoothingEnabled;
    } else {
        try {
			fontsmoothing = "false";
            canvasNode = document.createElement('canvas');
            canvasNode.width = "35";
            canvasNode.height = "35";
            canvasNode.style.display = 'none';
            document.body.appendChild(canvasNode);
            ctx = canvasNode.getContext('2d');
            ctx.textBaseline = "top";
            ctx.font = "32px Arial";
            ctx.fillStyle = "black";
            ctx.strokeStyle = "black";
            ctx.fillText("O", 0, 0);
            for (j = 8; j <= 32; j = j + 1) {
                for (i = 1; i <= 32; i = i + 1) {
                    imageData = ctx.getImageData(i, j, 1, 1).data;
                    alpha = imageData[3];
                    if (alpha !== 255 && alpha !== 0) {
                        strFontSmoothing = "true"; // font-smoothing must be on.
                    }
                }
            }
            strOut = strFontSmoothing;
        } catch (err) {
            return strOnError;
        }
    }
    strOut = strFontSmoothing;
    return strOut;
}

function fingerprint_fonts() {
    "use strict";
    var strOnError, style, fonts, count, template, fragment, divs, i, font, div, body, result, e;

    strOnError = "Error";
    style = null;
    fonts = null;
    font = null;
    count = 0;
    template = null;
    divs = null;
    e = null;
    div = null;
    body = null;
    i = 0;

    try {
        style = "position: absolute; visibility: hidden; display: block !important";
        fonts = ["Abadi MT Condensed Light", "Adobe Fangsong Std", "Adobe Hebrew", "Adobe Ming Std", "Agency FB", "Aharoni", "Andalus", "Angsana New", "AngsanaUPC", "Aparajita", "Arab", "Arabic Transparent", "Arabic Typesetting", "Arial Baltic", "Arial Black", "Arial CE", "Arial CYR", "Arial Greek", "Arial TUR", "Arial", "Batang", "BatangChe", "Bauhaus 93", "Bell MT", "Bitstream Vera Serif", "Bodoni MT", "Bookman Old Style", "Braggadocio", "Broadway", "Browallia New", "BrowalliaUPC", "Calibri Light", "Calibri", "Californian FB", "Cambria Math", "Cambria", "Candara", "Castellar", "Casual", "Centaur", "Century Gothic", "Chalkduster", "Colonna MT", "Comic Sans MS", "Consolas", "Constantia", "Copperplate Gothic Light", "Corbel", "Cordia New", "CordiaUPC", "Courier New Baltic", "Courier New CE", "Courier New CYR", "Courier New Greek", "Courier New TUR", "Courier New", "DFKai-SB", "DaunPenh", "David", "DejaVu LGC Sans Mono", "Desdemona", "DilleniaUPC", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Engravers MT", "Eras Bold ITC", "Estrangelo Edessa", "EucrosiaUPC", "Euphemia", "Eurostile", "FangSong", "Forte", "FrankRuehl", "Franklin Gothic Heavy", "Franklin Gothic Medium", "FreesiaUPC", "French Script MT", "Gabriola", "Gautami", "Georgia", "Gigi", "Gisha", "Goudy Old Style", "Gulim", "GulimChe", "GungSeo", "Gungsuh", "GungsuhChe", "Haettenschweiler", "Harrington", "Hei S", "HeiT", "Heisei Kaku Gothic", "Hiragino Sans GB", "Impact", "Informal Roman", "IrisUPC", "Iskoola Pota", "JasmineUPC", "KacstOne", "KaiTi", "Kalinga", "Kartika", "Khmer UI", "Kino MT", "KodchiangUPC", "Kokila", "Kozuka Gothic Pr6N", "Lao UI", "Latha", "Leelawadee", "Levenim MT", "LilyUPC", "Lohit Gujarati", "Loma", "Lucida Bright", "Lucida Console", "Lucida Fax", "Lucida Sans Unicode", "MS Gothic", "MS Mincho", "MS PGothic", "MS PMincho", "MS Reference Sans Serif", "MS UI Gothic", "MV Boli", "Magneto", "Malgun Gothic", "Mangal", "Marlett", "Matura MT Script Capitals", "Meiryo UI", "Meiryo", "Menlo", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Sans Serif", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU-ExtB", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "Miriam Fixed", "Miriam", "Mongolian Baiti", "MoolBoran", "NSimSun", "Narkisim", "News Gothic MT", "Niagara Solid", "Nyala", "PMingLiU", "PMingLiU-ExtB", "Palace Script MT", "Palatino Linotype", "Papyrus", "Perpetua", "Plantagenet Cherokee", "Playbill", "Prelude Bold", "Prelude Condensed Bold", "Prelude Condensed Medium", "Prelude Medium", "PreludeCompressedWGL Black", "PreludeCompressedWGL Bold", "PreludeCompressedWGL Light", "PreludeCompressedWGL Medium", "PreludeCondensedWGL Black", "PreludeCondensedWGL Bold", "PreludeCondensedWGL Light", "PreludeCondensedWGL Medium", "PreludeWGL Black", "PreludeWGL Bold", "PreludeWGL Light", "PreludeWGL Medium", "Raavi", "Rachana", "Rockwell", "Rod", "Sakkal Majalla", "Sawasdee", "Script MT Bold", "Segoe Print", "Segoe Script", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Segoe UI", "Shonar Bangla", "Showcard Gothic", "Shruti", "SimHei", "SimSun", "SimSun-ExtB", "Simplified Arabic Fixed", "Simplified Arabic", "Snap ITC", "Sylfaen", "Symbol", "Tahoma", "Times New Roman Baltic", "Times New Roman CE", "Times New Roman CYR", "Times New Roman Greek", "Times New Roman TUR", "Times New Roman", "TlwgMono", "Traditional Arabic", "Trebuchet MS", "Tunga", "Tw Cen MT Condensed Extra Bold", "Ubuntu", "Umpush", "Univers", "Utopia", "Utsaah", "Vani", "Verdana", "Vijaya", "Vladimir Script", "Vrinda", "Webdings", "Wide Latin", "Wingdings"];
        count = fonts.length;
        template = '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',sans-serif !important">ww</b>' + '<b style="display:inline !important; width:auto !important; font:normal 10px/1 \'X\',monospace !important">ww</b>';
        fragment = document.createDocumentFragment();
        divs = [];
        for (i = 0; i < count; i = i + 1) {
            font = fonts[i];
            div = document.createElement('div');
            font = font.replace(/['"<>]/g, '');
            div.innerHTML = template.replace(/X/g, font);
            div.style.cssText = style;
            fragment.appendChild(div);
            divs.push(div);
        }
        body = document.body;
        body.insertBefore(fragment, body.firstChild);
        result = [];
        for (i = 0; i < count; i = i + 1) {
            e = divs[i].getElementsByTagName('b');
            if (e[0].offsetWidth === e[1].offsetWidth) {
                result.push(fonts[i]);
            }
        }
        // do not combine these two loops, remove child will cause reflow
        // and induce severe performance hit
        for (i = 0; i < count; i = i + 1) {
            body.removeChild(divs[i]);
        }
        return result.join('|');
    } catch (err) {
        return strOnError;
    }
}

function fingerprint_java() {
    "use strict";
    var strOnError, strJavaEnabled, strOut;

    strOnError = "Error";
    strJavaEnabled = null;
    strOut = null;

    try {
        if (navigator.javaEnabled()) {
            strJavaEnabled = "true";
        } else {
            strJavaEnabled = "false";
        }
        strOut = strJavaEnabled;
        return strOut;
    } catch (err) {
        return strOnError;
    }
}


function sha256(ascii) {
	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};
	
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;
	
	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}
	
	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)
	
	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);
		
		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if 
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
			
			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}
		
		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}
	
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
};