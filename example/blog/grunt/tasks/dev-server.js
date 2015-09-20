module.exports = function(grunt) {
	grunt.registerTask('dev-server', [
		'clean',
		'copy:publicDirs',
		// 'ejs:devServerIncludes',
		'webpack-dev-server:start',
		'usebanner'
	]);
};
