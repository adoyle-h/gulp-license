'use strict';
var defaults = require('defaults');
var through = require('through2');
var licenses = require('./lib/licenses');
var prefixStream = require('./lib/prefixStream');

module.exports = function(type, options) {
	var opts = defaults(options, {
		license: type
	});

	var currentYear = new Date().getFullYear();
	if (options.sinceYear) {
		if (Number(currentYear) <= Number(options.sinceYear)) {
			opts.year = currentYear;
		} else {
			opts.year = options.sinceYear + '-' + currentYear;
		}
	} else if (options.year) {
		opts.year = options.year;
	} else {
		opts.year = currentYear;
	}

	var licenseKey = options.tiny ? 'tiny' : type.toLowerCase();

	function license(file, encoding, callback) {

		if (file.isNull()) {
			return callback(null, file);
		}

		var template = licenses[licenseKey];

		if (!template) {
			return callback(new Error('License ' + licenseKey + ' does not exist'));
		}

		if (file.isBuffer()) {
			file.contents = new Buffer(template(opts) + file.contents);
		}

		if (file.isStream()) {
			file.contents = file.contents.pipe(prefixStream(template(opts)));
		}

		return callback(null, file);
	}

	return through.obj(license);
};
