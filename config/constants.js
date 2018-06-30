// Paths
const PATH = require('path');
const ROOT = PATH.resolve(__dirname, '..');
const DEFAULT_LANGUAGE = 'en';
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
	de: require(PATH.join(PATHS.i18n, "de.json"))
};
LANGUAGES[DEFAULT_LANGUAGE] = null; //Skip default


exports.PATH = PATH;
exports.PATHS = PATHS;
exports.ROOT = ROOT;
exports.DEFAULT_LANGUAGE = DEFAULT_LANGUAGE;
exports.LANGUAGES = LANGUAGES;

