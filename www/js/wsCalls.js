window.ws = window.ws || {};

ws = {

	//#region USERS
	userLogin: function (data) {
		var deferred = $.Deferred();

		callWs({
			callType: 'POST',
			service: 'validateCredentials',
			data: JSON.stringify(data),
			contentType: 'application/json',
			success: function (response) {
				// if (response.codigo == 200) {
				// 	deferred.resolve(response.resultado);
				// }else{
				deferred.resolve(response);
				// }
			},
			error: function () {
				deferred.reject();
			}
		});

		return deferred.promise();
	},

	register: function (data) {
		var deferred = $.Deferred();
		callWs({
			callType: 'POST',
			service: 'registerUser',
			data: JSON.stringify(data),
			contentType: 'application/json',
			success: function (response) {
				// if (response.codigo == 200) {
				// 	deferred.resolve(response.resultado);
				// }else{
				deferred.resolve(response);
				// }
			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	updateUser: function (data) {
		var deferred = $.Deferred();
		callWs({
			callType: 'POST',
			service: 'updateUser  ',
			data: JSON.stringify(data),
			contentType: 'application/json',
			success: function (response) {
				// if (response.codigo == 200) {
				// 	deferred.resolve(response.resultado);
				// }else{
				deferred.resolve(response);
				// }
			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	//#endregion
	getUserData: function (data) {
		var deferred = $.Deferred();
		callWs({
			service: 'appconsulta',
			addData: '/' + data.userDocument,
			data: {
				username: data.username,
				password: data.password,
				cia: config.ciaParameter
			},
			success: function (response) {
				if (response.codigo == 200) {
					deferred.resolve(response.resultado);
				}

			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	getAccountBalance: function (data) {
		var deferred = $.Deferred();

		callWs({
			service: 'getAccountBalance',
			data: {
				cia: config.ciaParameter,
				key: data.type,
				fdate: data.username,
				tdate: data.password,
			},
			success: function (response) {
				deferred.resolve(response);
			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	getAccountStatus: function (data) {
		var deferred = $.Deferred();

		callWs({
			service: 'appestcta',
			addData: '/' + data.userDocument,
			success: function (response) {
				if (response.codigo == 200) {
					deferred.resolve(response.resultado);
				}
			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	getAccountStatusDetails: function (data) {
		var deferred = $.Deferred();

		callWs({
			service: 'appestctadet',
			addData: '/' + data.userDocument,
			success: function (response) {
				if (response.codigo == 200) {
					deferred.resolve(response.resultado);
				}
			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	generatePin: function (data) {
		var deferred = $.Deferred();
		callWs({
			service: 'apppin',
			addData: '/' + data.userDocument + '/' + data.amount,
			data: {},
			success: function (response) {
				// if (response.codigo == 200) {
				deferred.resolve(response);
				// }

			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	getCategories: function () {
		var deferred = $.Deferred();
		callWs({
			service: 'categories/1',
			addData: '',
			data: {},
			success: function (response) {
				if (response.codigo == '200') {
					deferred.resolve(response.data);
				}

			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	getCategoriesById: function (catId) {
		var deferred = $.Deferred();
		callWs({
			service: 'promosPerIdCategorie',
			addData: '/' + catId,
			data: {},
			success: function (response) {
				if (response.codigo == '200') {
					deferred.resolve(response.data);
				}

			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	registerAction: function (catId) {
		var deferred = $.Deferred();
		callWsPost({
			service: 'registerUserAction',
			dataText: JSON.stringify(data),
			success: function (response) {
				deferred.resolve(response);
			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	getPlaces: function (catId) {

		var deferred = $.Deferred();
		callWs({
			service: 'locals',
			addData: '/1',
			data: {},
			success: function (response) {
				if (response.codigo == '200') {
					deferred.resolve(response.data);
				}

			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	searchOfferByKeyword: function (keyword) {

		var deferred = $.Deferred();
		callWs({
			service: 'searchPromos/' + keyword,
			addData: '',
			data: {},
			success: function (response) {
				if (response.codigo == '200') {
					deferred.resolve(response.data);
				} else {
					deferred.reject();
				}

			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	getEtacash: function (userDocument) {
		var deferred = $.Deferred();
		callWs({
			service: 'appetacash',
			addData: '/' + userDocument,
			data: {},
			success: function (response) {
				// if (response.codigo == 200) {
				deferred.resolve(response);
				// }

			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	getHistory: function (userDocument) {
		var deferred = $.Deferred();
		callWs({
			service: 'appultcompra',
			addData: '/' + userDocument,
			data: {},
			success: function (response) {
				// if (response.codigo == 200) {
				deferred.resolve(response);
				// }

			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	},

	getPhone: function (userDocument) {
		var deferred = $.Deferred();
		callWs({
			service: 'appcelular',
			addData: '/' + userDocument,
			data: {},
			success: function (response) {
				// if (response.codigo == 200) {
				deferred.resolve(response);
				// }

			},
			error: function () {
				deferred.reject();
			}
		});
		return deferred.promise();
	}

};

window.callWs = function (options) {

	options.addData = options.addData == null ? '' : options.addData;

	var url = config.wsUrl + options.service + options.addData;
	$.ajax({
		method: options.callType || 'GET',
		url: url,
		dataType: 'json',
		data: options.data,
		cache: options.cache == undefined ? true : options.cache,
		processData: options.processData == undefined ? true : options.processData == undefined,
		contentType: options.contentType == undefined ? 'application/x-www-form-urlencoded; charset=UTF-8' : options.contentType,
		success: function (data) {
			options.success(data);
		},
		error: function (jqXHR, exception) {
			if (jqXHR.status === 405) {
				console.error("METHOD NOT ALLOWED!");
			}
			options.error();
		}
	});

};

window.callWsBack = function (options) {

	options.addData = options.addData == null ? '' : options.addData;

	var url = config.wsUrl + options.service + options.addData;
	$.ajax({
		method: "GET",
		url: url,
		dataType: 'json',
		data: options.data,
		success: function (data) {
			options.success(data);
		},
		error: function (jqXHR, exception) {
			if (jqXHR.status === 405) {
				console.error("METHOD NOT ALLOWED!");
			}
			options.error();
		}
	});

};

window.callWsPost = function (options) {

	// options.addData = options.addData == null ? '' : options.addData;

	// var url = config.wsUrl + options.service + options.addData;
	var url = config.wsUrl + options.service;
	$.ajax({
		method: "POST",
		url: url,
		dataType: 'json',
		contentType: 'application/json',
		data: options.dataText,
		// data
		// :'{"codigo":"4000","array":{"mail":"prueba2@eta.com","txtPassword":"12345678","strFrbsToken":"ALFA"}}',
		success: function (data) {
			options.success(data);
		},
		error: function (jqXHR, exception) {
			if (jqXHR.status === 405) {
				console.error("METHOD NOT ALLOWED!");
			}
			options.error();
		}
	});

};