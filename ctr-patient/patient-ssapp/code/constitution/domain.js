domainRequire=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"./../../domain":[function(require,module,exports){
$$.swarm.describe("leafletLoader", {
    mountDSU: function (mountPath, gtinSSI) {
        rawDossier.readFile("/code/constitution/gtinResolver.js", (err, content) => {
            eval(content.toString());
            let gtinResolver = require("gtin-resolver");
            rawDossier.mount(mountPath, gtinSSI, (err) => {
                rawDossier.listFiles(`${mountPath}/batch/product`, (err, files) => {
                    this.return(err);
                });
            });
        });
    }
});

},{"gtin-resolver":false}],"/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/patient-ssapp/builds/tmp/domain_intermediar.js":[function(require,module,exports){
(function (global){(function (){
global.domainLoadModules = function(){ 

	if(typeof $$.__runtimeModules["./../../domain"] === "undefined"){
		$$.__runtimeModules["./../../domain"] = require("./../../domain");
	}
};
if (true) {
	domainLoadModules();
}
global.domainRequire = require;
if (typeof $$ !== "undefined") {
	$$.requireBundle("domain");
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./../../domain":"./../../domain"}]},{},["/export/home/jpsl/develop/PharmaLedger/ctr-workspace/ctr-patient/patient-ssapp/builds/tmp/domain_intermediar.js"])
                    ;(function(global) {
                        global.bundlePaths = {"domain":"code/constitution/domain.js"};
                    })(typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
                