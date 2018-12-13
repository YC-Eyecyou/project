require(["../scripts/config.js"], function() {
	require(["common", "jquery", "swiper"], function(com, $, Swiper) {
		//书写top-notice
		var top_notice = $.ajax({
			url: "/test?1544530093758&position=1",
			dataType: "json",
			success: function(data) {
				// console.log(data);
				// console.log(data.data.length);
				for (var i = 0; i < data.data.length; i++) {
					$("#top .top-left .top-notice ul").append(
						`<li><a href="${data.data[i].targetUrl}">${data.data[i].title}</a></li>`);

				}
				$("#top .top-left .top-notice ul").append(
					`<li><a href="${data.data[0].targetUrl}">${data.data[0].title}</a></li>`);
			}
		});
		//top-notice轮播图
		$(function() {
			var index = 0;
			var timer = setInterval(function() {
				tabImg();
			}, 5000)
			//切换图片
			function tabImg() {
				index++;
				//小图
				$("#top .top-left .top-notice ul").animate({
					top: -$("#top .top-left .top-notice ul li").height() * index
				}, 1000, function() {
					if (index == 2) {
						index = 0;
						$("#top .top-left .top-notice ul").css({
							top: 0
						});
					}
				});
			}
			//鼠标移入时,停止轮播,清除计时器
			$("#top .top-left .top-notice").mouseover(function() {
				clearInterval(timer);
			})
			//鼠标移出时,重新开始轮播
			$("#top .top-left .top-notice").mouseout(function() {
				timer = setInterval(function() {
					tabImg();
				}, 5000)
			})
		})
		//nav
		$.ajax({
			url: "/nav?1544705943034",
			dataType: "json",
			success: function(data) {
				console.log(data);
				// console.log(data.data.length);
// 				for (var i = 0; i < data.data.length; i++) {
// 					$("#top .top-left .top-notice ul").append(
// 						`<li><a href="${data.data[i].targetUrl}">${data.data[i].title}</a></li>`);
// 
// 				}
// 				$("#top .top-left .top-notice ul").append(
// 					`<li><a href="${data.data[0].targetUrl}">${data.data[0].title}</a></li>`);
			}
		});


	})
})
