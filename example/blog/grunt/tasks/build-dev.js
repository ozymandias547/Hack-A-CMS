module.exports = function(grunt) {
	grunt.registerTask('build-dev', [
		'clean',
		'webpack:build-dev'
	]);
};
