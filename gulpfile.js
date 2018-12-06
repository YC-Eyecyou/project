let gulp = require("gulp");
let uglify = require("gulp-uglify");//压缩模块
let babel = require("gulp-babel");//ES6编译模块
let cleancss = require("gulp-clean-css");//压缩CSS
let webserver = require("gulp-webserver");

gulp.task("copy",()=>{//复制
	gulp.src("./src/**/*.*").pipe(gulp.dest("./dist"))
})

gulp.task("buildJS",()=>{
	gulp.src("./src/**/*.js")//读取文件
		.pipe(babel({
            presets: ['env']
        }))//ES6编译
        .pipe(uglify())//压缩
		.pipe(gulp.dest("./dist"))//写入dist文件
})

gulp.task("buildHTML",()=>{
	gulp.src("./src/**/*.html")
//		.pipe(babel({
//			presets: ['env']
//		}))
//		.pipe(uglify())
		.pipe(gulp.dest("./dist"));
})

gulp.task("buildCSS",()=>{
	gulp.src("./src/**/*.css")
		.pipe(cleancss())
		.pipe(gulp.dest("./dist"));
})

gulp.task('webserver', function() {
  	gulp.src('src')
    	.pipe(webserver({
    		livereload: true,
    		directoryListing: true,
    		open: true,
    		https: true,
    		proxies: [
    			{
    				source: '/test', 
    				target: 'https://m.lagou.com/listmore.json'
    			}
    		]
    	}));
});

gulp.task("build",["buildJS","buildHTML","buildCSS"])
