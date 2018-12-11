define(["top-notice"], function() {
	$(function() {
		var index = 0;
		var timer = setInterval(function() {
			tabImg();
			tabNav();
		}, 2000)
		//切换图片
		function tabImg() {
			index++;
			//小图
			$(".top-notice ul li").animate({
				top: -$("#box .goods .imgs li").height() * index
			}, function() {
				if (index == 6) {
					index = 0;
					$("#box .goods .imgs").css({
						top: 0
					});
				}
			});
		}
		//切换导航
		function tabNav() {
			for (var i = 0; i < $("#box .list ul").children().length; i++) {
				$("#box .list ul li").removeClass("active");
			}
			var target = $("#box .list ul li").get(index == 6 ? 0 : index); //用get()
			$(target).addClass("active");
		}
		//遍历导航,为导航设置点击事件
		$("#box .list ul li").each(function(i) {
			$(this).click(function() {
				index = i - 1;
				tabImg();
				tabNav();
			})
		})
		//鼠标移入商品展示框时,停止轮播,清除计时器
		$("#box .goods").mouseover(function() {
			clearInterval(timer);
		})
		//鼠标移出商品展示框时,重新开始轮播
		$("#box .goods").mouseout(function() {
			timer = setInterval(function() {
				tabImg();
				tabNav();
			}, 2000)
		})

	})
})
