//Internationalization
const RIGHT_TO_LEFT_LANGS = ['ar','dv','he','ku','fa','ur']
exports.RIGHT_TO_LEFT_LANGS = RIGHT_TO_LEFT_LANGS
exports.IsRightToLeft = (lang) => RIGHT_TO_LEFT_LANGS.includes(lang);