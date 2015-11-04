module.exports = function(grunt) {
	grunt.registerTask('develop', [
		'clean:dev',
        'concurrent:dev'
    ]);
};
