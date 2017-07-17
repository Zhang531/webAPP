// 防止自带DOM7冲突
var $$ = Framework7.$;
// 初始化APP

/* Initialize views */

var myApp = new Framework7({
	//	swipePanel: 'left',
	swipeBackPage: true,
	animateNavBackIcon: true,
	modalButtonOk: '确认',
	modalButtonCancel: '取消',
	    material:true
});
var mainView = myApp.addView('.view-main');
//var mainView = myApp.addView('.view-main', {
//dynamicNavbar: 'true',
//});
//var anotherView = myApp.addView('.another-view');

var home = myApp.addView('#home')
var discount = myApp.addView('#discount')
var each = myApp.addView('#each')
var each2 = myApp.addView('#each2')
var my = myApp.addView('#my')
	//$(document).on('navbarInit', function (e) {
	//var navbar = e.detail.navbar;
	//var page = e.detail.page
	//});
	//首页滑动

var ms = myApp.swiper('.app', {
	resistanceRatio: 0,
	onSlideChangeStart: function(s) {
		$$('.app_bottom_bar .tab-link').removeClass('active')
		$$('.app_bottom_bar .tab-link').eq(s.activeIndex).addClass('active')
		$$('img.lazy').trigger('lazy');
	}

});
//swiper切换页面
$$('.app_bottom_bar .tab-link').click(function() {
	ms.slideTo($(this).index())
	$$('.app_bottom_bar .tab-link').removeClass('active')
	$$(this).addClass('active')
});
//以上工具栏点击切换page
var mySwiper1 = myApp.swiper('.swiper-1', {
	pagination: '.swiper-1 .swiper-pagination',
	speed: 1000,
	loop: true,
	autoplay: 3000,
	longSwipes: false,
});
//以上banner滑动
$$('#left-box ul li').click(function() {
	var num = $(this).index()
	ms.slideTo(num)
	$('.app_bottom_bar .tab-link').removeClass('active')
	$('.app_bottom_bar .tab-link').eq(num).addClass('active')
	$('#left-box ul li').removeClass('active')
	$(this).addClass('active')
});
$$('.open-panel_l').click(function(s) {
	$$('#left-box ul li').removeClass('active')
	$$('#left-box ul li').eq($('.app_bottom_bar .tab-link.active').index()).addClass('active')
});
//以上左侧栏点击对应当前页面
var toolbarBottom = $$('.toolbar-bottom')
$$(document).on('pageInit', function(e) {
	//	console.log(e)
	var page = e.detail.page
		//  console.log(page.name)
	if(page.view.history.length == 2 && !(page.name == 'personal')) {
		ms.detachEvents()
	}
})
$$(document).on('pageInit', function(e) {
	//	console.log(e)
	var page = e.detail.page
		//  console.log(page.name)
	if(page.view.history.length == 3) {
		$('.sign').on('click', function() {
			if(!dlpd) {
				//		console.log(1111121)
				var activeViewId = $$('.view.swiper-slide-active').attr('id')
				eval(activeViewId + '.router.loadPage("login.html")')
			} else {
				myApp.openPanel('right');
				//ajax获取日历json数据
				var signList = [{
					"signDay": "1"
				}, {
					"signDay": "2"
				}, {
					"signDay": "4"
				}, {
					"signDay": "5"
				}, {
					"signDay": "6"
				}];
				calUtil.init(signList);
			}
		});
	}
})
$$(document).on('pageInit', function(e) {
		//	console.log(e)
		var page = e.detail.page
			//  console.log(page.name)
		if(page.view.history.length == 4 && !(page.name == 'personal')) {
			ms.detachEvents()
			myApp.hideToolbar('.toolbar')
		}

	})
	//==4是签到登录后判定
	//ms.detachEvents()
	//禁止滑动
$$(document).on('pageBack', function(e) {
	var page = e.detail.page
	if(page.view.history.length == 2) {
		ms.attachEvents()
		myApp.showToolbar('.toolbar')
	}
})
$$(document).on('pageBack', function(e) {
		var page = e.detail.page
		if(page.view.history.length == 4) {
			ms.attachEvents()
			myApp.showToolbar('.toolbar')
		}
	})
	//ms.attachEvents()
	//允许滑动
$("[href='detail.html']").click(function() {
	myApp.hideToolbar('.toolbar')
	console.log('打开详情页')
});
myApp.onPageInit('search', function() {
	myApp.hideToolbar('.toolbar')
	myApp.closePanel()
});
myApp.onPageInit('login', function() {
	myApp.hideToolbar('.toolbar')
});
//打开详情页关闭toolbar
myApp.onPageInit('detail', function() {
	$$('#yes_toolbar').click(function() {
		myApp.showToolbar('.toolbar')
	})
	$('#shoucang').click(function() {
		$(this).text('已收藏').css('color', '#008800')
	})
});
//返回开启

$('.page-content').scroll(function() {
	var bah = $('.page-content').height()
	var winh = $(window).innerHeight()
	var num = $$('.view.swiper-slide-active').index()
	console.log(num)
	var value = $('.page-content').eq(num).scrollTop()
	var aa = winh + ';' + value
	console.log(aa)
	if(value >= 200) {
		$('.search_a').eq(num).css('display', 'block')
		$('.search_p').eq(num).css('display', 'none')
	} else {
		$('.search_p').eq(num).css('display', 'block')
		$('.search_a').eq(num).css('display', 'none')
	}
})
	//滚动时弹出搜索框

//$('#detail').delegate("#yes_toolbar","click",function(){
//  myApp.showToolbar('.toolbar')
//  console.log('123')
//});
//$("[href='index.html']").live("click",function(){
//  myApp.showToolbar('.toolbar')
//  console.log('123')
//});

$$(document).on('ajaxStart', function(e) {
	if(e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
		//自动补全不显示加载动画
		return;
	}
	myApp.showIndicator();
});
$$(document).on('ajaxComplete', function(e) {
	if(e.detail.xhr.requestUrl.indexOf('autocomplete-languages.json') >= 0) {
		//自动补全不显示加载动画
		return;
	}
	myApp.hideIndicator();
});
var dlpd = false

function login() {
	var username = document.getElementById('y_name')
	var nv = document.getElementById('y_name_v')

	function name_v() {
		var usernameval = username.value
		var unamereg = new RegExp(/^1\d{10}$/)
		if(unamereg.test(usernameval)) {
			nv.innerHTML = '欢迎您'
		} else {
			nv.innerHTML = '请输入十一位正确手机号'
		}
	}

	function login_v() {
		var pawval = paw.value
		var pawreg = new RegExp(/^[a-zA-Z0-9]{6,16}$/)
		if(pawreg.test(pawval)) {
			pv.innerHTML = '输入正确'
		} else {
			pv.innerHTML = '请输入6-16位数字或字母'
		}
	}
	var login = document.getElementById('login')
	username.onblur = function() {
		name_v()
	}
	var paw = document.getElementById('y_password')
	var pv = document.getElementById('y_password_v')
	paw.onblur = function() {
		login_v()
		if(nv.innerHTML == '欢迎您' && pv.innerHTML == '输入正确') {
			console.log('登陆成功')
			$('input[type=button]').css('background', '#f00')
		}
	}
	var login = document.getElementById('login')
	login.onclick = function() {
			name_v()
			login_v()
			if(nv.innerHTML == '欢迎您' && pv.innerHTML == '输入正确') {
				console.log('登陆成功')
				$(this).css('background', '#f00')
				var activeViewId = $$('.view.swiper-slide-active').attr('id')
				eval(activeViewId + '.router.loadPage("personal.html")')
				dlpd = true
				console.log(dlpd)
			}
			username.value = ''
			paw.value = ''
				//	nv.innerHTML=''
				//	pv.innerHTML=''
		}
		//以上是登录判定
}
//登录判定函数
login()
myApp.onPageInit('login', function() {
	var username = document.getElementById('y_name')
	var nv = document.getElementById('y_name_v')
	var paw = document.getElementById('y_password')
	var pv = document.getElementById('y_password_v')

	function name_v() {
		var usernameval = username.value
		var unamereg = new RegExp(/^1\d{10}$/)
		if(unamereg.test(usernameval)) {
			nv.innerHTML = '欢迎您'
		} else {
			nv.innerHTML = '请输入十一位正确手机号'
		}
	}

	function login_v() {
		var pawval = paw.value
		var pawreg = new RegExp(/^[a-zA-Z0-9]{6,16}$/)
		if(pawreg.test(pawval)) {
			pv.innerHTML = '输入正确'
		} else {
			pv.innerHTML = '请输入6-16位数字或字母'
		}
	}
	var login = document.getElementById('login')
	username.onblur = function() {
		name_v()
	}
	paw.onblur = function() {
		login_v()
		if(nv.innerHTML == '欢迎您' && pv.innerHTML == '输入正确') {
			console.log('登陆成功')
			$('input[type=button]').css('background', '#f00')
		}
	}
	var login = document.getElementById('login')
	login.onclick = function() {
		name_v()
		login_v()
		if(nv.innerHTML == '欢迎您' && pv.innerHTML == '输入正确') {
			console.log('登陆成功')
			$(this).css('background', '#f00')
			var activeViewId = $$('.view.swiper-slide-active').attr('id')
			eval(activeViewId + '.router.loadPage("index.html")')
		}
		ms.attachEvents()
		myApp.showToolbar('.toolbar')
		username.value = ''
		paw.value = ''
		dlpd = true
		my.router.loadPage('personal.html');
			//	nv.innerHTML=''
			//	pv.innerHTML=''
	}
})
myApp.onPageInit('personal', function() {
	//	console.log('sdsd')
	$$('.confirm-title-ok-cancel').on('click', function() {
		myApp.confirm('确认退出?', '退出登录',
			function() {
				dlpd = false
				my.router.back("index.html")
			},
			function() {}
		);
	});
});
//判断是否退出登录

var calUtil = {
	//当前日历显示的年份
	showYear: 2015,
	//当前日历显示的月份
	showMonth: 1,
	//当前日历显示的天数
	showDays: 1,
	eventName: "load",
	//初始化日历
	init: function(signList) {
		calUtil.setMonthAndDay();
		calUtil.draw(signList);
		calUtil.bindEnvent();
	},
	draw: function(signList) {
		//绑定日历
		var str = calUtil.drawCal(calUtil.showYear, calUtil.showMonth, signList);
		$("#calendar").html(str);
		//绑定日历表头
		var calendarName = calUtil.showYear + "年" + calUtil.showMonth + "月";
		$(".calendar_month_span").html(calendarName);
	},
	//绑定事件
	bindEnvent: function() {
		//绑定上个月事件
		$(".calendar_month_prev").click(function() {
			//ajax获取日历json数据
			var signList = [{
				"signDay": "10"
			}, {
				"signDay": "16"
			}, {
				"signDay": "12"
			}, {
				"signDay": "13"
			}];
			calUtil.eventName = "prev";
			calUtil.init(signList);
		});
		//绑定下个月事件
		$(".calendar_month_next").click(function() {
			//ajax获取日历json数据
			var signList = [{
				"signDay": "10"
			}, {
				"signDay": "11"
			}, {
				"signDay": "12"
			}, {
				"signDay": "13"
			}];
			calUtil.eventName = "next";
			calUtil.init(signList);
		});
		//点击签到
		$('#qiandao').on("click", function() {
			var newst = new Date() //日期 时间 对象  实例化 一个日期 对象
			var yy = newst.getFullYear()
			var mm = newst.getMonth()
			var dd = newst.getDate()
			console.log(dd)
			var signList = [{
				"signDay": "1"
			}, {
				"signDay": "2"
			}, {
				"signDay": "4"
			}, {
				"signDay": "5"
			}, {
				"signDay": "6"
			}, {
				"signDay": dd
			}];
			calUtil.init(signList);
		});
	},
	//获取当前选择的年月
	setMonthAndDay: function() {
		switch(calUtil.eventName) {
			case "load":
				var current = new Date();
				calUtil.showYear = current.getFullYear();
				calUtil.showMonth = current.getMonth() + 1;
				break;
			case "prev":
				var nowMonth = $(".calendar_month_span").html().split("年")[1].split("月")[0];
				calUtil.showMonth = parseInt(nowMonth) - 1;
				if(calUtil.showMonth == 0) {
					calUtil.showMonth = 12;
					calUtil.showYear -= 1;
				}
				break;
			case "next":
				var nowMonth = $(".calendar_month_span").html().split("年")[1].split("月")[0];
				calUtil.showMonth = parseInt(nowMonth) + 1;
				if(calUtil.showMonth == 13) {
					calUtil.showMonth = 1;
					calUtil.showYear += 1;
				}
				break;
		}
	},
	getDaysInmonth: function(iMonth, iYear) {
		var dPrevDate = new Date(iYear, iMonth, 0);
		return dPrevDate.getDate();
	},
	bulidCal: function(iYear, iMonth) {
		var aMonth = new Array();
		aMonth[0] = new Array(7);
		aMonth[1] = new Array(7);
		aMonth[2] = new Array(7);
		aMonth[3] = new Array(7);
		aMonth[4] = new Array(7);
		aMonth[5] = new Array(7);
		aMonth[6] = new Array(7);
		var dCalDate = new Date(iYear, iMonth - 1, 1);
		var iDayOfFirst = dCalDate.getDay();
		var iDaysInMonth = calUtil.getDaysInmonth(iMonth, iYear);
		var iVarDate = 1;
		var d, w;
		aMonth[0][0] = "日";
		aMonth[0][1] = "一";
		aMonth[0][2] = "二";
		aMonth[0][3] = "三";
		aMonth[0][4] = "四";
		aMonth[0][5] = "五";
		aMonth[0][6] = "六";
		for(d = iDayOfFirst; d < 7; d++) {
			aMonth[1][d] = iVarDate;
			iVarDate++;
		}
		for(w = 2; w < 7; w++) {
			for(d = 0; d < 7; d++) {
				if(iVarDate <= iDaysInMonth) {
					aMonth[w][d] = iVarDate;
					iVarDate++;
				}
			}
		}
		return aMonth;
	},
	ifHasSigned: function(signList, day) {
		var signed = false;
		$.each(signList, function(index, item) {
			if(item.signDay == day) {
				signed = true;
				return false;
			}
		});
		return signed;
	},
	drawCal: function(iYear, iMonth, signList) {
		var myMonth = calUtil.bulidCal(iYear, iMonth);
		var htmls = new Array();
		htmls.push("<div class='sign_main' id='sign_layer'>");
		htmls.push("<div class='sign_succ_calendar_title'>");
		htmls.push("<div class='calendar_month_span'></div>");
		htmls.push("</div>");
		htmls.push("<div class='sign' id='sign_cal'>");
		htmls.push("<table>");
		htmls.push("<tr>");
		htmls.push("<th>" + myMonth[0][0] + "</th>");
		htmls.push("<th>" + myMonth[0][1] + "</th>");
		htmls.push("<th>" + myMonth[0][2] + "</th>");
		htmls.push("<th>" + myMonth[0][3] + "</th>");
		htmls.push("<th>" + myMonth[0][4] + "</th>");
		htmls.push("<th>" + myMonth[0][5] + "</th>");
		htmls.push("<th>" + myMonth[0][6] + "</th>");
		htmls.push("</tr>");

		var d, w;
		for(w = 1; w < 7; w++) {
			htmls.push("<tr>");
			for(d = 0; d < 7; d++) {
				var ifHasSigned = calUtil.ifHasSigned(signList, myMonth[w][d]);
				console.log(ifHasSigned);
				if(ifHasSigned) {
					htmls.push("<td class='on'>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
				} else {
					htmls.push("<td>" + (!isNaN(myMonth[w][d]) ? myMonth[w][d] : " ") + "</td>");
				}
			}
			htmls.push("</tr>");
		}
		htmls.push("</table>");
		htmls.push("</div>");
		htmls.push("<button id='qiandao'>签到</button>");
		htmls.push("</div>");
		return htmls.join('');
	}
};
//以上生成签到表
console.log(dlpd)
$('.sign').on('click', function() {
	if(!dlpd) {
		//		console.log(1111121)
		var activeViewId = $$('.view.swiper-slide-active').attr('id')
		eval(activeViewId + '.router.loadPage("login.html")')
	} else {
		myApp.openPanel('right');
		//ajax获取日历json数据
		var signList = [{
			"signDay": "1"
		}, {
			"signDay": "2"
		}, {
			"signDay": "4"
		}, {
			"signDay": "5"
		}, {
			"signDay": "6"
		}, {
			"signDay": "7"
		}, {
			"signDay": "8"
		}, {
			"signDay": "10"
		}];
		calUtil.init(signList);
	}
});
//以上是签到