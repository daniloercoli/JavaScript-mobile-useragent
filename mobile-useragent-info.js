var wpcom_mobile_user_agent_info = {
		
		PLATFORM_WINDOWS : 'windows',
		PLATFORM_IPHONE : 'iphone',
		PLATFORM_IPOD : 'ipod',
		PLATFORM_IPAD : 'ipad',
		PLATFORM_BLACKBERRY : 'blackberry',
		PLATFORM_BLACKBERRY_10 : 'blackberry_10',
		PLATFORM_SYMBIAN : 'symbian_series60',
		PLATFORM_SYMBIAN_S40 : 'symbian_series40',
		PLATFORM_J2ME_MIDP : 'j2me_midp',
		PLATFORM_ANDROID : 'android',
		PLATFORM_ANDROID_TABLET : 'android_tablet',
		PLATFORM_MOBILE_GENERIC : 'mobile_generic',

		userAgent : false, //Shortcut to the browser User Agent String
		matchedPlatformName : false, //Matched platform name. False otherwise.
		matchedUserAgentName : false, //Matched UA String. False otherwise.
		
		init: function() {
			var t = this;
			try{
				t.userAgent = navigator.userAgent.toLowerCase();
				t.getPlatformName();
				t.getMobileUserAgentName();
			}
			catch(e){
				console.error(e);
			}
		},
		
		initForTest: function(userAgent) {
			var t = this;
			t.matchedPlatformName = false;
			t.matchedUserAgentName = false;
			try{
				t.userAgent = userAgent.toLowerCase();
				t.getPlatformName();
				t.getMobileUserAgentName();
			}
			catch(e){
				console.error(e);
			}
		},
		
		
		/**
		 * This method detects the mobile User Agent name.
		 *
		 * @return string The matched User Agent name, false otherwise.
		 */
		getMobileUserAgentName : function() {
			var t = this;
			if ( false !== t.matchedUserAgentName )
				return t.matchedUserAgentName;

			if ( false === t.userAgent )
				return false;

			if( t.isChromeForIOS() )
				t.matchedUserAgentName = 'chrome-for-ios';
			else if( t.isIPhoneOrIPod() ) 
				t.matchedUserAgentName = 'iphone';
			else if ( t.isIPad() )
				t.matchedUserAgentName = 'ipad';
			else if( t.isAndroidTablet() )
				t.matchedUserAgentName = 'android_tablet';
			else if( t.isAndroid() )
				t.matchedUserAgentName = 'android';
			else if( t.isBlackberry10() )
				t.matchedUserAgentName = 'blackberry_10';
			else if( t.userAgent.indexOf('blackberry') != -1 )
				t.matchedUserAgentName = 'blackberry';
			else if( t.isBlackberryTablet() )
				t.matchedUserAgentName = 'blackberry_tablet';
			else if( t.isWindowsPhone7() )
				t.matchedUserAgentName = 'win7';
			else if( t.isWindowsPhone8() )
				t.matchedUserAgentName = 'winphone8';
			else if( t.isOperaMini() )
				t.matchedUserAgentName = 'opera-mini';
			else if( t.isOperaMobile() )
				t.matchedUserAgentName = 'opera-mobi';
			else if( t.isKindleFire() )
				t.matchedUserAgentName = 'kindle-fire';
			else if( t.isSymbianPlatform() )
				t.matchedUserAgentName = 'series60';
			else if( t.isFirefoxMobile() )
				t.matchedUserAgentName = 'firefox_mobile';
			else if( t.isFacebookForIphone() )
				t.matchedUserAgentName = 'facebook-for-iphone';
			else if( t.isFacebookForIpad() )
				t.matchedUserAgentName = 'facebook-for-ipad';
			else if( t.userAgent.indexOf('iphone') != -1 )
				t.matchedUserAgentName = 'iphone-unknown';
			else if( t.userAgent.indexOf('ipad') != -1 )
				t.matchedUserAgentName = 'ipad-unknown';
			
			return t.matchedUserAgentName ;
		},
		
		getPlatformName : function() {
			var t = this;
			if ( false !== t.matchedPlatformName )
				return t.matchedPlatformName;
			
			if ( false === t.userAgent )
				return false;
			
			if( t.userAgent.indexOf('windows ce') != -1 || t.userAgent.indexOf('windows phone') != -1) {
				t.matchedPlatformName = t.PLATFORM_WINDOWS;
			} else if( t.userAgent.indexOf('ipad') != -1 ) {
				t.matchedPlatformName = t.PLATFORM_IPAD;
			} else if( t.userAgent.indexOf('ipod') != -1 ) {
				t.matchedPlatformName = t.PLATFORM_IPOD;
			} else if( t.userAgent.indexOf('iphone') != -1 ) {
				t.matchedPlatformName = t.PLATFORM_IPHONE;
			} else if( t.userAgent.indexOf('android') != -1 ) {
				if ( t.isAndroidTablet() )
					t.matchedPlatformName = t.PLATFORM_ANDROID_TABLET;
				else
					t.matchedPlatformName = t.PLATFORM_ANDROID;
			} else if( t.isKindleFire() ) {
				t.matchedPlatformName = t.PLATFORM_ANDROID_TABLET;
			} else if( t.isBlackberry10() ) {
				t.matchedPlatformName = t.PLATFORM_BLACKBERRY_10;
			} else if( t.userAgent.indexOf('blackberry') != -1 ) {
				t.matchedPlatformName = t.PLATFORM_BLACKBERRY;
			} else if( t.isBlackberryTablet() ) {
				t.matchedPlatformName = t.PLATFORM_BLACKBERRY;
			} else if( t.isSymbianPlatform() ) {
				t.matchedPlatformName = t.PLATFORM_SYMBIAN;
			} else if( t.isSymbianS40Platform() ) {
				t.matchedPlatformName = t.PLATFORM_SYMBIAN_S40;
			} else if( t.isJ2MEPlatform() ) {
				t.matchedPlatformName = t.PLATFORM_J2ME_MIDP;
			} else if (t.isFirefoxMobile()) {			
				t.matchedPlatformName = t.PLATFORM_MOBILE_GENERIC;
			}
			
			return t.matchedPlatformName;
		},
		
		
		/**
		 * Detects if the current UA is iPhone Mobile Safari or another iPhone or iPod Touch Browser.
		 */
		isIPhoneOrIPod : function() {
			var t = this;

			if ( false === t.userAgent )
				return false;

			var isIphone = ( t.userAgent.indexOf('iphone') != -1 || t.userAgent.indexOf('ipod') != -1 );
			var isSafari = ( t.userAgent.indexOf('safari') != -1 );
			
			return( isIphone && isSafari );
		},

		/**
		 * Detects if the current device is an iPad.
		 */
		isIPad : function() {
			var t = this;

			if ( false === t.userAgent )
				return false;

			return( t.userAgent.indexOf('ipad') != -1 && t.userAgent.indexOf('safari') != -1);
		},
		
		
		/**
		*  Detects if the current UA is Chrome for iOS
		*
		*/
		isChromeForIOS : function() {
			var t = this;

			if ( false === t.userAgent )
				return false;
			
			return( t.isIPhoneOrIPod() && t.userAgent.indexOf('crios/') != -1);
		},
		
	    /**
	     * Detects if the current browser is the Native Android browser.
	     * @return boolean true if the browser is Android otherwise false
	     */
		 isAndroid : function() {
			var t = this;
			
			if ( false === t.userAgent )
				return false;
			
			if ( t.userAgent.indexOf('android') != -1 ) {
				if ( t.isOperaMini() || t.isOperaMobile() || t.isFirefoxMobile() )
					return false;
				else
					return true;
			} 
			return false;
		},
		
		/**
		 * Detects if the current browser is the Native Android Tablet browser.
		 * 	Assumes 'Android' should be in the user agent, but not 'mobile'
		 *
		 * @return boolean true if the browser is Android and not 'mobile' otherwise false
		 */
		 isAndroidTablet : function() {
			var t = this;
			
			if ( false === t.userAgent )
				return false;
			
			if( t.userAgent.indexOf('android') != -1 && t.userAgent.indexOf('mobile') == -1) {
				if ( t.isOperaMini() || t.isOperaMobile() || t.isFirefoxMobile() )
					return false;
				else
					return true;
			}
			return false;
		},
		
		
		/**
		 * Detects if the current browser is Opera Mobile
		 *
		 * What is the difference between Opera Mobile and Opera Mini?
		 * - Opera Mobile is a full Internet browser for mobile devices.
		 * - Opera Mini always uses a transcoder to convert the page for a small display.
		 * (it uses Opera advanced server compression technology to compress web content before it gets to a device.
		 *  The rendering engine is on Opera's server.)
		 *
		 * Opera/9.80 (Windows NT 6.1; Opera Mobi/14316; U; en) Presto/2.7.81 Version/11.00"
		 */
		isOperaMobile : function() {
			var t = this;

			if ( false === t.userAgent )
				return false;

			return( t.userAgent.indexOf('opera') != -1 && t.userAgent.indexOf('mobi') != -1);
		},

		/**
		 * Detects if the current browser is Opera Mini
		 *
		 * Opera/8.01 (J2ME/MIDP; Opera Mini/3.0.6306/1528; en; U; ssr)
		 * Opera/9.80 (Android;Opera Mini/6.0.24212/24.746 U;en) Presto/2.5.25 Version/10.5454
		 * Opera/9.80 (iPhone; Opera Mini/5.0.019802/18.738; U; en) Presto/2.4.15
		 * Opera/9.80 (J2ME/iPhone;Opera Mini/5.0.019802/886; U; ja) Presto/2.4.15
		 * Opera/9.80 (J2ME/iPhone;Opera Mini/5.0.019802/886; U; ja) Presto/2.4.15
		 * Opera/9.80 (Series 60; Opera Mini/5.1.22783/23.334; U; en) Presto/2.5.25 Version/10.54
		 * Opera/9.80 (BlackBerry; Opera Mini/5.1.22303/22.387; U; en) Presto/2.5.25 Version/10.54
		 *
		 */
		isOperaMini : function() {
			var t = this;

			if ( false === t.userAgent )
				return false;

			return( t.userAgent.indexOf('opera') != -1 && t.userAgent.indexOf('mini') != -1);
		},

		
		/**
		 * isBlackberry10() can be used to check the User Agent for a BlackBerry 10 device.
		 */
		isBlackberry10 : function() {
			var t = this;

			if ( false === t.userAgent )
				return false;
			
			return( t.userAgent.indexOf('bb10') != -1 && t.userAgent.indexOf('mobile') != -1);
		},
		
		/**
		 * isBlackberryTablet() can be used to check the User Agent for a RIM blackberry tablet
		 * The user agent of the BlackBerry® Tablet OS follows a format similar to the following:
		 * Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/0.0.1 Safari/534.8+
		 *
		 */
		 isBlackberryTablet : function() {
			var t = this;
			
			if ( false === t.userAgent )
				return false;
			
			return( t.userAgent.indexOf('playbook') != -1 && t.userAgent.indexOf('rim tablet') != -1);
		},
		
		/**
		 * Detects if the current browser is a Windows Phone 7 device.
		 * ex: Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; LG; GW910)
		 */
		isWindowsPhone7 : function () {
			var t = this;

			if ( false === t.userAgent )
				return false;

			return ( t.userAgent.indexOf('windows phone os 7') != -1 ); 
		},
		
		/**
		 * Detects if the current browser is a Windows Phone 8 device.
		 * ex: Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; ARM; Touch; IEMobile/10.0; <Manufacturer>; <Device> [;<Operator>])
		 */
		isWindowsPhone8 : function () {
			var t = this;

			if ( false === t.userAgent )
				return false;

			return ( t.userAgent.indexOf('windows phone 8') != -1 );
		},
		
		/**
		 *
		 * Detects if the device platform is J2ME.
		 *
		 */
		isJ2MEPlatform : function () {
			var t = this;

			if ( false === t.userAgent )
				return false;

			if ( t.userAgent.indexOf('j2me/midp') != -1 ) 
				return true;

			if ( t.userAgent.indexOf('midp') != -1 && t.userAgent.indexOf('cldc') != -1 ) 
				return true;

			return false;
		},
		
		
		/**
		 *
		 * Detects if the device platform is the Symbian Series 40.
		 * Nokia Browser for Series 40 is a proxy based browser, previously known as Ovi Browser.
		 * This browser will report 'NokiaBrowser' in the header, however some older version will also report 'OviBrowser'.
		 *
		 */
		isSymbianS40Platform : function() {
			var t = this;

			if ( false === t.userAgent )
				return false;

			if ( t.userAgent.indexOf('series40') != -1 ) {
				if ( t.userAgent.indexOf('nokia') != -1 || t.userAgent.indexOf('ovibrowser') != -1 || t.userAgent.indexOf('nokiabrowser') != -1)
					return true;
			}

			return false;
		},
		
		
		/**
		 *
		 * Detects if the device platform is the Symbian Series 60.
		 *
		 */
		isSymbianPlatform : function() {

			var t = this;

			if ( false === t.userAgent )
				return false;

			if ( t.userAgent.indexOf('webkit') != -1 ) {
				//First, test for WebKit, then make sure it's either Symbian or S60.
				if ( t.userAgent.indexOf('symbian') != -1 || t.userAgent.indexOf('series60') != -1 )
					return true;
				else
					return false;
			} else if ( t.userAgent.indexOf('symbianos') != -1 && t.userAgent.indexOf('series60') != -1 ) {
				return true;
			} else if ( t.userAgent.indexOf('nokia') != -1 && t.userAgent.indexOf('series60') != -1 ) {
				return true;
			} else if (  t.userAgent.indexOf('opera mini') != -1) {
				if( t.userAgent.indexOf('symbianos') != -1 || t.userAgent.indexOf('symbos') != -1 || t.userAgent.indexOf('series 60') != -1 )
					return true;
			}

			return false;
		},

		
		/**
		 * Detects if the current browser is the Kindle Fire Native browser.
		 *
		 * Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-84) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true
		 * Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.1.0-84) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=false
		 *
		 * @return boolean true if the browser is Kindle Fire Native browser otherwise false
		 */
		isKindleFire : function() {
			var t = this;
			
			if ( false === t.userAgent )
				return false;
			
			return( t.userAgent.indexOf('silk/') != -1 && t.userAgent.indexOf('silk-accelerated=') != -1);
		},
		
		/**
		 * Detects if the current UA is Facebook for iPad
		 * - Facebook 4020.0 (iPad; iPhone OS 5.0.1; en_US)
		 * - Mozilla/5.0 (iPad; U; CPU iPhone OS 5_0 like Mac OS X; en_US) AppleWebKit (KHTML, like Gecko) Mobile [FBAN/FBForIPhone;FBAV/4.0.2;FBBV/4020.0;FBDV/iPad2,1;FBMD/iPad;FBSN/iPhone OS;FBSV/5.0;FBSS/1; FBCR/;FBID/tablet;FBLC/en_US;FBSF/1.0]
		 * - Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10A403 [FBAN/FBIOS;FBAV/5.0;FBBV/47423;FBDV/iPad2,1;FBMD/iPad;FBSN/iPhone OS;FBSV/6.0;FBSS/1; FBCR/;FBID/tablet;FBLC/en_US]
		 */
		isFacebookForIpad : function() {
			var t = this;
			
			if ( false === t.userAgent )
				return false;
			
			if ( t.userAgent.indexOf('ipad') == -1 )
				return false;

			if ( t.userAgent.indexOf('facebook') != -1 || t.userAgent.indexOf('fbforiphone') != -1 ||  t.userAgent.indexOf('fban/fbios;') != -1 )
				return true;
			
			return false;
		},
		
		/**
		 * Detects if the current UA is Facebook for iPhone
		 * - Facebook 4020.0 (iPhone; iPhone OS 5.0.1; fr_FR)
		 * - Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_0 like Mac OS X; en_US) AppleWebKit (KHTML, like Gecko) Mobile [FBAN/FBForIPhone;FBAV/4.0.2;FBBV/4020.0;FBDV/iPhone3,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/5.0;FBSS/2; FBCR/O2;FBID/phone;FBLC/en_US;FBSF/2.0]
		 * - Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206 [FBAN/FBIOS;FBAV/5.0;FBBV/47423;FBDV/iPhone3,1;FBMD/iPhone;FBSN/iPhone OS;FBSV/5.1.1;FBSS/2; FBCR/3ITA;FBID/phone;FBLC/en_US]
		 */
		isFacebookForIphone : function() {
			var t = this;
			
			if ( false === t.userAgent )
				return false;
			
			if ( t.userAgent.indexOf('iphone') == -1 )
				return false;

			if ( t.userAgent.indexOf('facebook') != -1 && t.userAgent.indexOf('ipad') == -1  )
				return true;
			else if ( t.userAgent.indexOf('fbforiphone') != -1 && t.userAgent.indexOf('tablet') == -1  )
				return true;
			else if ( t.userAgent.indexOf('fban/fbios;') != -1 && t.userAgent.indexOf('tablet') == -1  ) //FB app v5.0 or higher
				return true;

			return false;
		},
		
		/**
		 * Detects if the current browser is Firefox Mobile (Fennec)
		 *
		 * http://www.userAgentstring.com/pages/Fennec/
		 * Mozilla/5.0 (Windows NT 6.1; WOW64; rv:2.1.1) Gecko/20110415 Firefox/4.0.2pre Fennec/4.0.1
		 * Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1b2pre) Gecko/20081015 Fennec/1.0a1
		 */
		isFirefoxMobile : function() {
			var t = this;
		
			if ( false === t.userAgent )
				return false;
			
			if ( t.userAgent.indexOf('fennec') != -1 )
				return true;

			return false;
		},
		
};

wpcom_mobile_user_agent_info.init();