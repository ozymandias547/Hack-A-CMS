module.exports = function(grunt) {
	grunt.registerTask('build-prod', [
		'clean',
		'webpack:build-prod',
        'copy:publicDirs',
        'copy:nodeModules',
        'copy:server',
        'copy:packageJSON'
	]);
};
