module.exports = function(grunt) {
	grunt.registerTask('dev-server', [
		'clean',
		'copy:publicDirs',
		'webpack-dev-server:start'
	]);
};
