// Paths
const PATH = require('path');
const ROOT = PATH.resolve(__dirname, '..');
const PATHS = {
	dist: PATH.join(ROOT, "dist"),
	static: PATH.join(ROOT, "static"),
	script: PATH.join(ROOT, "static", "js"),
	style: PATH.join(ROOT, "static", "styles"),
	template: PATH.join(ROOT, "static", "templates"),
	i18n: PATH.join(ROOT, "static", "i18n"),
	img: PATH.join(ROOT, "static", "images"),
};


// Internationalization
var LANGUAGES = {
	en: require(PATH.join(PATHS.i18n, "en.json")),
	de: require(PATH.join(PATHS.i18n, "de.json"))
};


exports.PATH = PATH;
exports.PATHS = PATHS;
exports.ROOT = ROOT;
exports.LANGUAGES = LANGUAGES;
exports.DEFAULT_LANGUAGE = 'en'