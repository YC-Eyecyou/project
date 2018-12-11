let gulp = require("gulp");
let uglify = require("gulp-uglify");//压缩模块
let babel = require("gulp-babel");//ES6编译模块
let cleancss = require("gulp-clean-css");//压缩CSS
let webserver = require("gulp-webserver");
let sass = require("gulp-sass");//编译scss到css

// gulp.task("copy",()=>{//复制
// 	gulp.src("./src/**/*.*").pipe(gulp.dest("./dist"))
// })

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
	gulp.src("./src/**/*.scss")
		// .pipe(cleancss())
		.pipe(sass())
		.pipe(gulp.dest("./dist"));
})

//静态资源
gulp.task("buildStaticResource",()=>{
	gulp.src("./src/static/**/*.*").pipe(gulp.dest("./dist"));
})

//监听
gulp.task("watching",()=>{
	gulp.watch("./src/**/*.scss",["buildCSS"]);
	gulp.watch("./src/**/*.js",["buildJS"]);
	gulp.watch("./src/**/*.html",["buildHTML"]);
})

gulp.task('webserver',["watching"], function() {
  	gulp.src('dist')
    	.pipe(webserver({
    		livereload: true,
    		directoryListing: true,
    		open: true,
    		https: true,
    		proxies: [
    			{
    				source: '/test', 
    				target: 'http://bmall.163.com/webShop/noticePosition/find?1544530093758&position=1'
    			}
    		]
    	}));
});

gulp.task("build",["buildJS","buildHTML","buildCSS","buildStaticResource"])
