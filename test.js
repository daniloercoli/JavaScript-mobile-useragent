var entityMap = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': '&quot;',
		"'": '&#39;',
		"/": '&#x2F;'
};

function escapeHtml(string) {
	return String(string).replace(/[&<>"'\/]/g, function (s) {
		return entityMap[s];
	});
}

function runTest(elementID) {
	
	var objTo = document.getElementById(elementID);
	objTo.innerHTML = ""; //Clean the content
	var uaString = document.getElementById('ua-string-area').value;

	if( uaString == ""){
		alert("Please, insert a valid User Agent String");
		return;
	}
	
	wpcom_mobile_user_agent_info.initForTest(uaString);
	objTo.innerHTML += " Testing <i>"+ escapeHtml(uaString) + "</i><br/>";
	if ( wpcom_mobile_user_agent_info.matchedPlatformName == false )
		objTo.innerHTML += "Sorry, no mobile platform detected.<br/>";
	else
		objTo.innerHTML += "Matched platform: " +wpcom_mobile_user_agent_info.matchedPlatformName + "<br/>";
	
	if ( wpcom_mobile_user_agent_info.matchedUserAgentName == false )
		objTo.innerHTML += "Sorry, no mobile UserAgent detected.<br/>";
	else
		objTo.innerHTML += "Matched UA: " +wpcom_mobile_user_agent_info.matchedUserAgentName;
}

function runBrowserTest(elementID) {
	var objTo = document.getElementById(elementID);
	objTo.innerHTML = ""; //Clean the content
	wpcom_mobile_user_agent_info.initForTest(navigator.userAgent.toLowerCase());
	objTo.innerHTML += " Testing <i>"+ escapeHtml(navigator.userAgent) + "</i><br/>";
	if ( wpcom_mobile_user_agent_info.matchedPlatformName == false )
		objTo.innerHTML += "Sorry, no mobile platform detected.<br/>";
	else
		objTo.innerHTML += "Matched platform: " +wpcom_mobile_user_agent_info.matchedPlatformName + "<br/>";
	
	if ( wpcom_mobile_user_agent_info.matchedUserAgentName == false )
		objTo.innerHTML += "Sorry, no mobile UserAgent detected.<br/>";
	else
		objTo.innerHTML += "Matched UA: " +wpcom_mobile_user_agent_info.matchedUserAgentName;
}


function runAutomatedTests(elementID) {
	
	var objTo = document.getElementById(elementID);
	objTo.innerHTML = ""; //Clean the content
    
	for (var i=0;i<myTests.length;i++){
		var current = myTests[i];
		wpcom_mobile_user_agent_info.initForTest(current.user_agent_string);
		objTo.innerHTML += " Testing "+ current.test_name +"<br/>";
		objTo.innerHTML += "<small><i>"+ escapeHtml(current.user_agent_string) + "</i></small><br/>";
		objTo.innerHTML += "Matched platform: " +wpcom_mobile_user_agent_info.matchedPlatformName + "<br/>";
		objTo.innerHTML += "Matched UA: " +wpcom_mobile_user_agent_info.matchedUserAgentName + "<br/>";
		
		if ( wpcom_mobile_user_agent_info.matchedPlatformName == current.platform && wpcom_mobile_user_agent_info.matchedUserAgentName == current.useragent ) {
			objTo.innerHTML += "<span style='color:green;'>OK</span><br/>";
		} else {
			if ( wpcom_mobile_user_agent_info.matchedPlatformName != current.platform )
				objTo.innerHTML += "<span style='color:red;'> Error: Found the following platform " +wpcom_mobile_user_agent_info.matchedPlatformName + " but expected " + current.platform + "</span></span><br/>";
			if( wpcom_mobile_user_agent_info.matchedUserAgentName != current.useragent )
				objTo.innerHTML += "<span style='color:red;'> Error: Found the following UA " +wpcom_mobile_user_agent_info.matchedUserAgentName + " but expected " +current.useragent + "</span><br/>";
		}
		
		objTo.innerHTML += "<hr/>";
	}
}


function clean(elementID) {
	var objTo = document.getElementById(elementID);
	objTo.innerHTML = ""; //Clean the content
}


var myTests=new Array();
//Desktop
myTests.push( {
		user_agent_string : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:9.0) Gecko/20100101 Firefox/9.0",
		test_name : "FireFox9",
		platform : false,
		useragent : false,
		});
myTests.push( {
		user_agent_string : "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
		test_name : "IE",
		platform : false,
		useragent : false,
		});
myTests.push( {
		user_agent_string : "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.36 Safari/535.7",
		test_name : "Chrome Desktop",
		platform : false,
		useragent : false,
		});


//Chrome Mobile

//Mobile Chrome
myTests.push( {
	test_name : "Chrome for Android - phone",
	user_agent_string : "Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>",
	platform : "android",
	useragent : "android",
	});
myTests.push( {
	test_name : "Chrome for Android - tablet",
	user_agent_string : "Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev>(KHTML, like Gecko) Chrome/<Chrome Rev> Safari/<WebKit Rev>",
	platform : "android_tablet",
	useragent : "android_tablet",
	});
myTests.push( {
	test_name : "Chrome for iOS",
	user_agent_string : "Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3",
	platform : "iphone",
	useragent : "chrome-for-ios",
	});

//Android
myTests.push( {
		test_name : "Android Native Browser",
		user_agent_string : "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1",
		platform : "android",
		useragent : "android",
		});
myTests.push( {
			test_name : "Android Tablet Native Browser",
			user_agent_string : "Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13",
			platform : "android_tablet",
			useragent : "android_tablet",
			});

//iPhone
myTests.push( {
		test_name : "iPhone iOS 3.0",
		user_agent_string : "Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16",
		platform : "iphone",
		useragent : "iphone",
		});
myTests.push( {
		test_name : "iPhone iOS 5.0.1",
		user_agent_string : "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3",
		platform : "iphone",
		useragent : "iphone",
		});
myTests.push( {
		test_name : "iPad iOS 4.3.3",
		user_agent_string : "Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5",
		platform : "ipad",
		useragent : "ipad",
		});

//iOS - Apps
myTests.push( {
	test_name : "WordPress for iphone",
	user_agent_string : "wp-iphone/3.5.3 (iPhone OS 5.1, iPhone Simulator) Mobile",
	platform : "iphone",
	useragent : "ios-app",
});
myTests.push( {
	test_name : "Facebook for iphone",
	user_agent_string : "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206 [FBAN/FBIOS;FBAV/5.0;FBBV/47423;FBDV/iPhone3,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/5.1.1;FBSS/2; FBCR/3ITA;FBID/phone;FBLC/en_US]",
	platform : "iphone",
	useragent : "facebook-for-iphone",
});
myTests.push( {
	test_name : "Twitter for iPhone",
	user_agent_string : 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_5 like Mac OS X; nb-no) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile/8L1 Twitter for iPhone',
	platform : "iphone",
	useragent : "twitter-for-iphone",
	});
myTests.push( {
	test_name : 'Twitter for iPad - v4.X',
	user_agent_string : "Mozilla/5.0 (iPad; U; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile/8L1 Twitter for iPad",
	platform : "ipad",
	useragent : "twitter-for-ipad",
	});
myTests.push( {
	test_name : 'Twitter for iPad - v5.0 or higher',
	user_agent_string : 'Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206 Twitter for iPhone',
	platform : "ipad",
	useragent : 'twitter-for-ipad',
	});

//BlackBerry
myTests.push( {
	test_name : "BlackBerry OS 6.0.0.546",
	user_agent_string : "Mozilla/5.0 (BlackBerry; U; BlackBerry 9700; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/6.0.0.546 Mobile Safari/534.8+",
	platform : "blackberry",
	useragent : "blackberry",
	});

myTests.push( {
		test_name : "BlackBerry 10",
		user_agent_string : "Mozilla/5.0 (BB10; <Device Model>) AppleWebKit/<WebKit Version> (KHTML, like Gecko) Version/<BB Version #> Mobile Safari/<WebKit Version>",
		platform : "blackberry_10",
		useragent : "blackberry_10",
		});

//Windows Phone
myTests.push( {
		test_name : "WindowsPhone 8 / IE10",
		user_agent_string : "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; ARM; Touch; IEMobile/10.0; <Manufacturer>; <Device> [;<Operator>])",
		platform : "windows",
		useragent : "winphone8",
		});

myTests.push( {
	test_name : "IE Mobile 9.0",
	user_agent_string : "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)",
	platform : "windows",
	useragent : "win7",
	});

myTests.push( {
	test_name : "IE Mobile 7.10",
	user_agent_string : "Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; Nokia;N70)",
	platform : "windows",
	useragent : "win7",
	});


//Opera Mini User Agents
myTests.push( {
	test_name : "iPhone; Opera Mini/5.0",
	user_agent_string : "Opera/9.80 (iPhone; Opera Mini/5.0.019802/18.738; U; en) Presto/2.4.15",
	platform : "iphone",
	useragent : "opera-mini",
	});
myTests.push( {
	test_name : "Android;Opera Mini/6.0",
	user_agent_string : "Opera/9.80 (Android;Opera Mini/6.0.24212/24.746 U;en) Presto/2.5.25 Version/10.5454",
	platform : "android",
	useragent : "opera-mini",
	});

//Kindle Fire UA
myTests.push( {
	test_name : "Kindle Fire Silk accelerated",
	user_agent_string : "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-84) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true",
	platform : "android_tablet",
	useragent : "kindle-fire",
	});
myTests.push( {
	test_name : "Kindle Fire NO Silk accelerated",
	user_agent_string : "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-84) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=false",
	platform : "android_tablet",
	useragent : "kindle-fire",
	});

//FireFox Mobile
myTests.push( {
	test_name : "Firefox Mobile 1",
	user_agent_string : "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1b2pre) Gecko/20081015 Fennec/1.0a1",
	platform : "mobile_generic",
	useragent : "firefox_mobile",
	});
myTests.push( {
	test_name : "Firefox Mobile 2",
	user_agent_string : "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:2.1.1) Gecko/20110415 Firefox/4.0.2pre Fennec/4.0.1",
	platform :  "mobile_generic",
	useragent : "firefox_mobile",
	});


//Nokia
myTests.push( {
		test_name : "Nokia N90",
		user_agent_string : "NokiaN90-1/3.0545.5.1 Series60/2.8 Profile/MIDP-2.0 Configuration/CLDC-1.1",
		platform : "symbian_series60",
		useragent : "series60",
		});