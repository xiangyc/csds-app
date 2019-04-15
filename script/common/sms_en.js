(function(window){
    var s = {};
	var interval = 60;
	var initInterval = 60;
	var timer;
	var btFlag =0;

	//type 短信验证码类型 无用
	s.sendSms = function(mobile,captcha,method,type,btnId) {

		var valuse =  {
				'mobile' : mobile,
				'captcha' : captcha
		};

		api.ajax({
			method : 'post',
			cache : false,
			dataType : 'json',
			returnAll : false,
			timeout :100,
			url : global.getRequestUri() + '/code/'+method,
			headers : global.getRequestToken(),
			data : {
				values : valuse
			}
		}, function(ret, err) {
			if (ret) {
				//alert(JSON.stringify(ret));
				if (ret.success) {

					btFlag = 1;

					if(ret.message ){			
						if(ret.message ==='already_send'){	

							global.setToast('code has been sent, do not repeat click');

							sms.removeDisabled(btnId);
						}else{
							global.setToast(ret.message);	
						}
					}else{
						global.setToast('code has been sent');
					}

					if(ret.message !='already_send'){
						$api.attr($api.byId(btnId), 'disabled', 'disabled');
						$api.val($api.byId(btnId), 'value', interval + "seconds resend");

						if(timer){
							window.clearInterval(timer);
						}

						timer = window.setInterval("sms.msgInterval('"+btnId+"');", 1000);
					}
				} else {
					global.setToast(ret.message);
					sms.removeDisabled(btnId);
				}
			} else {
				global.setErrorToast();
				sms.removeDisabled(btnId);
			}
		});
	}

	s.removeDisabled = function (btnId) {
		$api.val($api.byId(btnId), 'Verify code');
		$api.removeAttr($api.byId(btnId), 'disabled');

		$api.attr($api.byId(btnId), 'click', 'sendSmsCode');

		interval = initInterval;
		window.clearInterval(timer);
		$api.addCls($api.byId(btnId), 'aui-btn-yzm');

		btFlag = 0;
	}

	s.msgInterval = function (btnId) {
		if (eval(interval < 1)) {
			$api.val($api.byId(btnId), 'Verify code');
			$api.removeAttr($api.byId(btnId), 'disabled');
			$api.attr($api.byId(btnId), 'click', 'sendSmsCode');

			interval = initInterval;
			window.clearInterval(timer);
			$api.addCls($api.byId(btnId), 'aui-btn-yzm');

			btFlag = 0;
			return false;
		}

		if (isNaN(interval - 1) || isNaN(interval)) {
			btFlag = 0;
			$api.val($api.byId(btnId), 'value', 'Verify code');
		} else {
			$api.val($api.byId(btnId), interval + 's');
		}

		interval = interval - 1;
	}

	s.clearIntervalTimer = function (){
		if(timer){
			window.clearInterval(timer);

			initInterval = 60;
			interval = 60;

			btFlag = 0;
		}
	}

	s.getBtFlag = function (){
		return btFlag;
	}

	s.setBtFlag = function (btFlag){
		btFlag = btFlag ;
	}

    window.sms = s;
})(window);