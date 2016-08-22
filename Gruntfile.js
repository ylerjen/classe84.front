module.exports = function(grunt) {

    // Load the tasks automatically w/ load-grunt-tasks
    require("load-grunt-tasks")(grunt);
    

    var DIST_SCRIPT_PATH = 'dist/js/',
        DIST_STYLE_PATH  = 'dist/css/';

    var APP_SCRIPT_BUNDLE = DIST_SCRIPT_PATH + 'app.js',
        LIB_SCRIPT_BUNDLE = DIST_SCRIPT_PATH + 'libs.js';

    // Grunt config 
    grunt.initConfig({

        // JsHint task
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        
        // Clean dist dir
        clean: {
            dist_css: [DIST_STYLE_PATH],
            dist_js: [DIST_SCRIPT_PATH],
            dist: ['dist'],
            temp: ['tmp']                
        },

        // Sass compilation
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/sass',
                    src: ['*.scss'],
                    dest: DIST_STYLE_PATH,
                    ext: '.css'
                }]
            }
        },        
        concat: {
            options: {
                separator: ';',
            },
            app: {
                files: {
                    [APP_SCRIPT_BUNDLE]: ['tmp/**/*.js']
                }
            },
            libs: {
                files: {
                    [LIB_SCRIPT_BUNDLE]: [
                        'node_modules/angular/angular.min.js',
                        'node_modules/angular-animate/angular-animate.min.js',
                        'node_modules/angular-route/anglar-route.min.js',
                        'node_modules/angular-sanitize/angular-sanitize.min.js'
                    ]
                }
            }
        },
        
        // Babel task
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js/',
                        src: ['**/*.js'],
                        dest: 'tmp/js'
                    }
                ]
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
                    [LIB_SCRIPT_BUNDLE]: ['temp/js/libs.js'],
                    [APP_SCRIPT_BUNDLE]: ['temp/js/app.js']
                }
            }
        },

        //Karma testing task
        karma: {
          unit: {
            configFile: 'karma.conf.js'
          }
        },
        
        // Browserify the babel result
        browserify: {
            dist: {
                options: {
                    transform: [
                        ["babelify"]
                    ]
                },
                files: {
                    // if the source file has an extension of es6 then
                    // we change the name of the source file accordingly.
                    // The result file's extension is always .js
                    "./dist/js/app.js": ["./tmp/js/**/*.js"]
                }
            }
        },

        // Browsersync server
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'src/**/*.*',
                        './index.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: '.'
                }
            }
        },

        // Watch task
        watch: {
            js: {
                files: ['./src/js/**/*.js'],
                tasks: ['clean:dist_js', 'babel', 'browserify']
            },
            sass: {
                files: ['./src/sass/**/*.scss'],
                tasks: ['clean:dist_css', 'sass']
            }
        }
    });


    // Grunt tasks
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('dev', ['browserSync', 'watch']);
    grunt.registerTask('tests', ['clean:dist', 'sass', 'babel', 'karma:unit:run']);
    grunt.registerTask('build-dev',  ['clean:dist', 'babel', 'browserify', 'sass', 'clean:temp']);
    grunt.registerTask('build-prod', ['clean:dist', 'babel', 'browserify', 'uglify', 'sass', 'clean:temp']);


};