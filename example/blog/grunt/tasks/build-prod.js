module.exports = function(grunt) {
	grunt.registerTask('build-prod', [
		'clean:prod',
        'clean:dev',
		'webpack:prod',
        'copy:prod'
	]);
};
