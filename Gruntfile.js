module.exports = function(grunt) {

    // Load the tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-karma');


    // Grunt config 
    grunt.initConfig({

        // JsHint task
        jshint: {
            files: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        // Compass compilation
        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'distr/css'
                }
            }
        },

        // Typescript task
        typescript: {
            base: {
                src: ['app/**/*.ts'],
                dest: 'distr/js/app.js',
                options: {
                    module: 'amd', //or commonjs 
                    target: 'es5', //or es3 
                    //basePath: 'path/to/typescript/files',
                    sourceMap: true,
                    declaration: true
                }
            }
        },

        // Concat        
        concat: {
            libs: {
                files: {
                    'temp/js/libs.js': ['libs/**/*.js']
                }
            },
            app: {
                files: {
                    'temp/js/app.js': ['app/**/*.js']
                }
            }
        },

        // Uglify
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            js: {
                files: {
                    'distr/js/libs.min.js': ['temp/js/libs.js'],
                    'distr/js/app.min.js' : ['temp/js/app.js']
                }
            }
        },

        // Watch task
        watch: {
            compass: {
                files: ['sass/**/*.scss'],
                tasks: ['compass']
            },
            jshint: {
                    files: ['app/**/*.ts', 'app/**/*.js'],
                    tasks: ['jshint']
            },
            typescript: {
                files: 'app/**/*.ts',
                tasks: ['typescript']
            },
            karma: {
                files: ['app/js/**/*.js', 'test/**/*.js'],
                tasks: ['compass', 'typescript', 'karma:unit:run'] //NOTE the :run flag
            }
        },

        //Karma testing task
        karma: {
          unit: {
            configFile: 'karma.conf.js'
          }
        }
    });


    // Grunt tasks
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('tests', ['compass', 'concat', 'typescript']);
    grunt.registerTask('dev', ['watch:typescript']);
    grunt.registerTask('prod', ['compass', 'concat', 'typescript', 'uglify']);

};