module.exports = function(grunt) {
    grunt.registerTask('cleanup', [
        'clean:dev',
        'clean:prod'
    ]);
};
