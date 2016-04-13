module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            build: {
                src: ["src/ts-framework/*.ts"],
                outDir: "src/ts-framework-build/",
                options: {
                    target: "es5",
                    module: "commonjs",
                    sourceMap: false,
                    declaration: true,
                    removeComments: true
                }
            },
            build_test: {
                src: ["src/ts-framework/*.ts"],
                outDir: "src/ts-framework-build/",
                options: {
                    target: "es5",
                    module: "commonjs",
                    sourceMap: false,
                    declaration: true,
                    removeComments: true
                },
                watch: ['src/**/*', 'test/**/*']
            }
        }
    });

    grunt.registerTask('build_framework', [ 'ts:build' ]);
    grunt.registerTask('build_test', [ 'ts:build_test']);

    grunt.registerTask('default', [ 'build_framework' ]);
    grunt.registerTask('test', [ 'build_test' ]);
};
