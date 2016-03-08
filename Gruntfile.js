module.exports = function(grunt) {

    // Load the tasks automatically w/ load-grunt-tasks
    require("load-grunt-tasks")(grunt);

    var DIST_SCRIPT_PATH = 'dist/js/',
        DIST_STYLE_PATH  = 'dist/css/'
    

    var APP_SCRIPT_BUNDLE = DIST_SCRIPT_PATH + 'app.js',
        LIB_SCRIPT_BUNDLE = DIST_SCRIPT_PATH + 'libs.js',
        CSS_STYLE_BUNDLE  = DIST_STYLE_PATH + 'style.js'

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
            dist_js: ['dist/js'],
            dist_css: ['dist/css'],
            temp: ['tmp']                
        },

        // Compass compilation
        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: DIST_STYLE_PATH
                }
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
                        'libs/angular/angular.min.js',
                        'libs/angular-animate/angular-animate.min.js',
                        'libs/angular-route/anglar-route.min.js',
                        'libs/angular-sanitize/angular-sanitize.min.js'
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
                        cwd: 'src/',
                        src: ['**/*.js'],
                        dest: 'tmp/babel/js'
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
                    "./dist/js/app.js": ["./tmp/babel/*.js"]
                }
            }
        },

        // Watch task
        watch: {
            js: {
                files: ['./src/**/*.js'],
                tasks: ['clean:dist_js', 'browserify']
            },
            compass: {
                files: ['sass/**/*.scss'],
                tasks: ['clean:dist_css', 'compass']
            }
        }
    });


    // Grunt tasks
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('tests', ['build-dev', 'karma:unit:run']);
    grunt.registerTask('build-dev', ['clean', 'babel', 'browserify', 'clean:temp', 'compass']);
    grunt.registerTask('build-prod', ['clean', 'compass', 'babel', 'uglify']);

};