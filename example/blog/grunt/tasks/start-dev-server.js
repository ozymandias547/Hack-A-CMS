module.exports = function(grunt) {
	grunt.registerTask('dev-server', [
		'clean:dev',
        'clean:prod',
		'webpack-dev-server:start'
	]);
};
