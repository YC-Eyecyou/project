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
	//只复制
	gulp.src("./src/scripts/libs/*.js")
		.pipe( gulp.dest("./dist/scripts/libs") );
	//编译压缩复制
	gulp.src("./src/scripts/*.js")
		.pipe(babel({
			presets: ['env']
		}))//ES6编译
		.pipe( uglify() )//压缩
		.pipe( gulp.dest("./dist/scripts") );
	//页面js	
	gulp.src("./src/pages/*.js")
		.pipe(gulp.dest("./dist/pages"));
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
	gulp.src("./src/static/**/*.*").pipe(gulp.dest("./dist/static"));
	// gulp.src("./src/images/**/*.*").pipe(gulp.dest("./dist/images"));
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
    				target: 'http://bmall.163.com/webShop/noticePosition/find'
    			}
    		],
			proxies: [
				{
					source: '/nav', 
					target: 'http://bmall.163.com/webShop/category/list'
				}
			]
    	}));
});

gulp.task("build",["buildJS","buildHTML","buildCSS","buildStaticResource"])
