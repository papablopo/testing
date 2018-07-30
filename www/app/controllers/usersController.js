etaApp.controller('UserCtrl', function ($scope, $rootScope) {

	// $scope.name = '';
	// $scope.username = '';
	// $scope.password = '';
	// $scope.password2 = '';

	$scope.rs = $rootScope;

	$scope.user = {
		id: -12
	}

	// $scope.user = {};

	$scope.completeName = '';
	$scope.name = '';
	$scope.lastname = '';
	$scope.identification = '';
	$scope.username = '';
	$scope.password = '';
	$scope.password2 = '';
	$scope.fbToken = '';
	$scope.firebaseCode = '';

	$scope.sLoadLogin = function () {
		localStorage.removeItem('cat8');
		localStorage.removeItem('userDocument');
		localStorage.removeItem('userData');
		if (localStorage.userData) {
			window.location = '#/home';
		}
	};

	$scope.sLoadRegister = function () {
		try {
			FirebasePlugin.logEvent("select_content", {
				content_type: "page_view",
				item_id: 'registro'
			});
		} catch (error) {}
	}

	$scope.login = function () {

		var errMsg;
		if (this.username == '') {
			errMsg = 'Ingresa tu correo';
		} else if (this.password == '') {
			errMsg = 'Ingresa tu contraseña';
		} else if (!this.rs.valEmail(this.username)) {
			errMsg = 'Correo incorrecto';
		}

		if (errMsg) {
			showAutoCloseMessage(errMsg);
			return;
		}

		try {
			this.username = this.username.trim();
			this.username = this.username.toLowerCase();
		} catch (error) {

		}

		showLoading('Iniciando');

		var encriptedPass = encryptData(this.password);

		var data = {
			"codigo": "4000",
			"array": {
				"mail": this.username,
				"txtPassword": encriptedPass,
				"intIdCompany": 1,
				"tipologin": "0"
			}
		};

		ws.userLogin(data).done(function (response) {
			if (response.codigo == 200) {
				showAutoCloseMessage('Bienvenido ' + response.data.strNombres)
				$scope.rs.user = response.data;
				localStorage.setItem('userData', JSON.stringify(response.data));
				// localStorage.setItem('userDocument', '1802036325');
				window.location = '#/home';

				try {
					window.FirebasePlugin.subscribe("etafashionAll");
				} catch (e) {
					// alert('subs ' + e.message);
				}

				try {
					var valorToken = "";
					window.FirebasePlugin.getToken(function (token) {
						// alert('tok ' + token);
						// alert('tok: ' + token);
						// console.log(token);

						if (token != null && token != '') {
							callPost({
								dataText: '{"codigo":"4000","array":{"mail":"test@test.com","txtPassword":"12345678","strFrbsToken":"' + token + '"}}'
							})
						}

						// valorToken = token;
					}, function (error) {
						// alert('err ' + error);
					});
				} catch (e) {
					// alert(e.message);
				}
			} else {
				showAutoCloseMessage(response.mensaje);
			}

		}).fail(function (error) {
			if (error && error) {
				showMessage(error);
			} else {
				showMessage(config.defaultWsErrorMsg);
			}
		}).always(function () {
			hideLoading();
		})

	};

	$scope.register = function () {
		debugger;
		var errMsg;
		if (this.name == '') {
			errMsg = 'Ingresa tu nombre';
		} else if (this.lastname == '') {
			errMsg = 'Ingresa tu apellido';
		} else if (this.identification == '') {
			errMsg = 'Ingresa tu cédula';
		} else if (this.username == '') {
			errMsg = 'Ingresa tu correo';
		} else if (this.password == '' || this.password2 == '') {
			errMsg = 'Ingresa una contraseña';
		} else if (!this.rs.valEmail(this.username)) {
			errMsg = 'Correo incorrecto';
		} else if (this.password != this.password2) {
			errMsg = 'Contraseñas no coinciden';
		}

		if (errMsg) {
			showAutoCloseMessage(errMsg);
			return;
		}

		showLoading('Registrando');

		var idEncripted = this.identification;
		try {
			idEncripted = encryptData(idEncripted);
		} catch (error) {

		}

		var passEncripted = this.password;
		try {
			passEncripted = encryptData(passEncripted);
		} catch (error) {

		}

		var data = {
			"codigo": "4000",
			"array": {
				"strNombres": this.name + ' ' + this.lastname,
				"strFirstName": this.name,
				"strLastName": this.lastname,
				"strMail": this.username,
				"strKey": "123",
				"strIdentification": idEncripted,
				"blnStatus": true,
				"blnFacebookReg": false,
				"blnGoogleReg": true,
				"txtPassword": passEncripted,
				"strFrbsToken": '',
				"strFaceToken": this.fbToken,
				"strGmailToken": '',
				"intIdCompany": 1,
			}
		};

		try {
			var valorToken = "";
			window.FirebasePlugin.getToken(function (token) {
				// alert('tok ' + token);

				if (token != null && token != '') {
					data.strFrbsToken = token
				}

				ws.register(data).done(function (response) {

					try {
						window.FirebasePlugin.subscribe("etafashionAll");
					} catch (e) {
						// alert('subs ' + e.message);
					}

					if (response.codigo == 200) {
						data = response.data[0];
						showAutoCloseMessage('Bienvenido ' + $scope.name)
						window.location = '#/home';
					} else {
						showAutoCloseMessage(response.mensaje);
					}

				}).fail(function (error) {
					if (error && error) {
						showMessage(error);
					} else {
						showMessage(config.defaultWsErrorMsg);
					}
				}).always(function () {
					hideLoading();
				})

				// valorToken = token;
			}, function (error) {
				// alert('err ' + error);
			});
		} catch (e) {
			// alert(e.message);
			ws.register(data).done(function (response) {
				try {
					window.FirebasePlugin.subscribe("etafashionAll");
				} catch (e) {
					// alert('subs ' + e.message);
				}

				if (response.codigo == 200) {
					data = response.data[0];
					showAutoCloseMessage('Bienvenido ' + $scope.name)
					window.location = '#/home';
				} else {
					showAutoCloseMessage(response.mensaje);
				}
			}).fail(function (error) {
				if (error && error) {
					showMessage(error);
				} else {
					showMessage(config.defaultWsErrorMsg);
				}
			}).always(function () {
				hideLoading();
			})
		}

	};

	$scope.register1 = function () {

		var errMsg;
		if (this.completeName == '') {
			errMsg = 'Ingresa tu nombre';
		} else if (this.username == '') {
			errMsg = 'Ingresa tu correo';
		} else if (this.password == '') {
			errMsg = 'Ingresa una contraseña';
		} else if (!this.rs.valEmail(this.username)) {
			errMsg = 'Correo incorrecto';
		}

		if (errMsg) {
			showAutoCloseMessage(errMsg);
			return;
		}

		showLoading('Registrando');

		try {
			this.completeName = this.completeName.replace(/á/g, 'a');
			this.completeName = this.completeName.replace(/é/g, 'e');
			this.completeName = this.completeName.replace(/é/g, 'i');
			this.completeName = this.completeName.replace(/ó/g, 'o');
			this.completeName = this.completeName.replace(/ú/g, 'u');
			this.completeName = this.completeName.trim();
		} catch (error) {

		}

		try {
			this.username = this.username.trim();
			this.username = this.username.toLowerCase();
		} catch (error) {

		}

		var passEncripted = this.password;
		try {
			passEncripted = encryptData(passEncripted);
		} catch (error) {

		}

		var data = {
			"codigo": "4000",
			"array": {
				"strNombres": this.completeName,
				"strFirstName": '',
				"strLastName": '',
				"strMail": this.username,
				"strKey": "123",
				"strIdentification": '',
				"blnStatus": true,
				"blnFacebookReg": false,
				"blnGoogleReg": true,
				"txtPassword": passEncripted,
				"strFrbsToken": '',
				"strFaceToken": this.fbToken,
				"strGmailToken": '',
				"intIdCompany": 1,
			}
		};

		try {
			var valorToken = "";
			window.FirebasePlugin.getToken(function (token) {
				// alert('tok ' + token);
				console.log(token);

				if (token != null && token != '') {
					data.strFrbsToken = token
				}

				ws.register(data).done(function (response) {

					try {
						window.FirebasePlugin.subscribe("etafashionAll");
					} catch (e) {
						// alert('subs ' + e.message);
					}

					if (response.codigo == 200) {
						data = response.data[0];
						try {
							localStorage.setItem('userData', JSON.stringify(response.data));
						} catch (error) {

						}
						showAutoCloseMessage('Bienvenido ' + $scope.completeName)
						window.location = '#/home';
					} else {
						showAutoCloseMessage(response.mensaje);
					}

				}).fail(function (error) {
					if (error && error) {
						showMessage(error);
					} else {
						showMessage(config.defaultWsErrorMsg);
					}
				}).always(function () {
					hideLoading();
				})

				// valorToken = token;
			}, function (error) {
				// alert('err ' + error);
			});
		} catch (e) {
			// alert(e.message);
			ws.register(data).done(function (response) {
				try {
					window.FirebasePlugin.subscribe("etafashionAll");
				} catch (e) {
					// alert('subs ' + e.message);
				}

				if (response.codigo == 200) {
					data = response.data[0];
					showAutoCloseMessage('Bienvenido ' + $scope.completeName)
					window.location = '#/home';
				} else {
					showAutoCloseMessage(response.mensaje);
				}
			}).fail(function (error) {
				if (error && error) {
					showMessage(error);
				} else {
					showMessage(config.defaultWsErrorMsg);
				}
			}).always(function () {
				hideLoading();
			})
		}

	};

	$scope.register2 = function () {
		var errMsg;
		if (this.identification == '') {
			errMsg = 'Ingresa tu cédula';
		}
		if (errMsg) {
			showAutoCloseMessage(errMsg);
			return;
		}

		showLoading('Registrando');
		localStorage.setItem('userDocument', this.identification);
		var idEncripted = this.identification;
		try {
			idEncripted = encryptData(idEncripted);
		} catch (error) {

		}
		setTimeout(() => {
			hideLoading();
			window.location = '#/etacash';
		}, 1000);
	};

	$scope.updateUser = function () {

		var errMsg;
		if (this.identification == '') {
			errMsg = 'Ingresa tu cédula';
		}
		if (errMsg) {
			showAutoCloseMessage(errMsg);
			return;
		}

		showLoading('Registrando');

		var userData = JSON.parse(localStorage.userData);
		var email = userData.strMail;

		var idEncripted = this.identification;
		try {
			idEncripted = encryptData(idEncripted);
			// idEncripted = idEncripted.replace(/\//g, '%2F');
			idEncripted = encodeURIComponent(idEncripted);
		} catch (error) {

		}

		// var data = {
		// 	"codigo": "4000",
		// 	"array": {
		// 		"mail": email,
		// 		"strIdentification": idEncripted,
		// 		"intIdCompany": 1,
		// 	}
		// };

		ws.getPhone(idEncripted).done(function (response) {
			// console.log(response);
			if (response.resultado.estado != 'ERROR') {pwd
				localStorage.setItem('userDocument', $scope.identification);
				window.location = '#/etacash';
			} else {
				console.log(response.resultado.Mensaje);
				showAutoCloseMessage(response.resultado.Mensaje);
			}

		}).fail(function (error) {
			if (error && error) {
				showMessage(error);
			} else {
				showMessage(config.defaultWsErrorMsg);
			}
		}).always(function () {
			hideLoading();
		})

		// ws.updateUser(data).done(function (response) {
		// 	if (response.codigo == 200) {
		// 		localStorage.setItem('userDocument', $scope.identification);
		// 		window.location = '#/etacash';
		// 	} else {
		// 		showAutoCloseMessage(response.mensaje);
		// 	}

		// }).fail(function (error) {
		// 	if (error && error) {
		// 		showMessage(error);
		// 	} else {
		// 		showMessage(config.defaultWsErrorMsg);
		// 	}
		// }).always(function () {
		// 	hideLoading();
		// })
	};

	$scope.generatePin = function () {
		showLoading('Generando');

		setTimeout(function () {
			hideLoading();
			showCloseMessage('Tu pin generado es <br/> <br/>4282')
		}, 1000);

	}

	$scope.recoverPassword = function () {
		showLoading('Consultando');

		setTimeout(function () {
			hideLoading();
			showCloseMessage('Se ha enviado a tu correo las instrucciones para que puedas recuperar tu contraseña')
			location.href = "#/login";
		}, 1000);

	}

	$scope.sLoadAccount = function () {
		showLoading();
		$scope.rs.fixedFooter = true;
		if (localStorage.userData) {
			var userData = JSON.parse(localStorage.userData);
			$scope.user = userData;
		}

		// ws.getUserData({
		// 	userDocument: localStorage.userDocument,
		// }).done(function (response) {
		// 	// if (response.code == 0) {
		// 	try {

		// 		$scope.$apply(function () {

		// 			try {
		// 				$scope.completeName = capitalizeText(response.nombres + ' ' + response.apellidoPat + ' ' + response.apellidoMat);
		// 			} catch (e) {
		// 				$scope.completeName = response.nombres + ' ' + response.apellidoPat + ' ' + response.apellidoMat;
		// 			}

		// 		});

		// 		localStorage.setItem('names', response.nombres);
		// 		localStorage.setItem('lastname', response.apellidoPat);
		// 		localStorage.setItem('secondLastname', response.apellidoMat);
		// 		localStorage.setItem('lastPayDate', response.fechadepago);
		// 	} catch (e) {
		// 		// TODO: handle exception
		// 	}


		// }).fail(function (error) {
		// 	if (error && error) {
		// 		showMessage(error);
		// 	} else {
		// 		showMessage(config.defaultWsErrorMsg);
		// 	}
		// }).always(function () {
		// 	hideLoading();
		// })

	}

	$scope.loginFacebook = function () {

		try {
			CordovaFacebook.login({
				permissions: ['public_profile', 'user_friends', 'email'],
				onSuccess: function (result) {
					if (result.declined.length > 0) {
						// alert("The User declined something!");
					} else {
						var token = result.accessToken;
						var userId = result.userID;

						CordovaFacebook.graphRequest({
							path: '/me',
							params: {
								fields: 'email,id,first_name,last_name,gender,link,name'
							},
							onSuccess: function (userData) {

								console.log(userData);

								$scope.$apply(function () {
									$scope.isInactivePage = false;
								});

								var passEncripted = this.password;
								try {
									passEncripted = encryptData(userData.id);
								} catch (error) {
						
								}

								var data = {
									"codigo": "4000",
									"array": {
										"mail": userData.email,
										"txtPassword": passEncripted,
										"strNombres": userData.name,
										"intIdCompany": 1,
										"tipologin": "1"
									}
								};

								ws.userLogin(data).done(function (response) {
									if (response.codigo == 200) {
										showAutoCloseMessage('Bienvenido ' + response.data.strNombres)
										$scope.rs.user = response.data;
										localStorage.setItem('userData', JSON.stringify(response.data));
										// localStorage.setItem('userDocument', '1802036325');
										window.location = '#/home';

										try {
											window.FirebasePlugin.subscribe("etafashionAll");
										} catch (e) {
											// alert('subs ' + e.message);
										}

										try {
											var valorToken = "";
											window.FirebasePlugin.getToken(function (token) {
												// alert('tok ' + token);
												// alert('tok: ' + token);
												console.log(token);

												if (token != null && token != '') {
													callPost({
														dataText: '{"codigo":"4000","array":{"mail":"test@test.com","txtPassword":"12345678","strFrbsToken":"' + token + '"}}'
													})
												}

												// valorToken = token;
											}, function (error) {
												// alert('err ' + error);
											});
										} catch (e) {
											// alert(e.message);
										}
									} else {
										showAutoCloseMessage(response.mensaje);
									}

								}).fail(function (error) {
									if (error && error) {
										showMessage(error);
									} else {
										showMessage(config.defaultWsErrorMsg);
									}
								}).always(function () {
									hideLoading();
								})

							},
							onFailure: function (result) {
								if (result.error) {
									Error.log('error', 'There was an error in graph request:' + result.errorLocalized);
								}
							}
						});

					}
				},
				onFailure: function (result) {
					if (result.cancelled) {
						alert("Hubo un problema, por favor intentalo más tarde");
					} else if (result.error) {
						alert("There was an error:" + result.errorLocalized);
					}
				}
			});
		} catch (e) {
			console.log(e.message);
		}
	}

$scope.loginGoogle = function() {
	try {
		firebase.initializeApp()
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider).then(function() {
			return firebase.auth().getRedirectResult();
		  }).then(function(result) {
			  alert(result);
			// This gives you a Google Access Token.
			// You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			// ...
		  }).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		  });
	} catch (error) {
		alert(error)
	}
}

	$scope.getFacebookData = function () {

		try {
			CordovaFacebook.login({
				permissions: ['public_profile', 'user_friends', 'email'],
				onSuccess: function (result) {
					if (result.declined.length > 0) {
						// alert("The User declined something!");
					} else {
						var token = result.accessToken;
						var userId = result.userID;

						CordovaFacebook.graphRequest({
							path: '/me',
							params: {
								fields: 'email,id,first_name,last_name,gender,link,name'
							},
							onSuccess: function (userData) {
								$scope.$apply(function () {

									$scope.completeName = userData.name;
									$scope.name = userData.name;
									$scope.username = userData.email;
									$scope.fbToken = userData.id;

								});

							},
							onFailure: function (result) {
								if (result.error) {
									Error.log('error', 'There was an error in graph request:' + result.errorLocalized);
								}
							}
						});

					}
				},
				onFailure: function (result) {
					if (result.cancelled) {
						console.log("Hubo un problema, por favor intentalo más tarde");
					} else if (result.error) {
						console.log("There was an error:" + result.errorLocalized);
					}
				}
			});
		} catch (e) {
			alert(e.message);
		}
	}

	$scope.logout = function () {
		localStorage.removeItem('userData');
		localStorage.removeItem('userDocument');
		window.location = '#/login';
	};

	$scope.planetaStep1 = function () {
		showLoading();


		var identification = $scope.identification;

		try {
			identification = encryptData(identification);
			identification = encodeURIComponent(identification);
		} catch (error) {

		}


		ws.getPhone(identification).done(function (response) {
			try {
				if (response.codigo == "200") {
					debugger;
					if (response.resultado.estado == 'OK') {
						var phoneNumber = response.resultado.celular;
						try {
							if (phoneNumber.length == 10) {
								phoneNumber = '+593' + phoneNumber.substr(1);
							}
						} catch (error) {

						}
						window.FirebasePlugin.verifyPhoneNumber(phoneNumber, 120, function (credential) {
							console.log(credential);
							localStorage.setItem('firebaseCode', JSON.stringify(credential));

							// ask user to input verificationCode:
							hideLoading();
							window.location = '#/planeta2';

						}, function (error) {
							console.error(error);
						});
					} else {
						hideLoading();
						showCloseMessage('No disponemos de tu número celular en nuestra base de datos, por favor comunicate al <a href="tel:026002200">(02)6002200</a>')
					}
				}
			} catch (error) {
				hideLoading();
				showCloseMessage('No disponemos de tu número celular en nuestra base de datos, por favor comunicate al (02)6002200')
			}
		})



	}

	$scope.planetaStep2 = function () {
		// debugger;
		var credential = JSON.parse(localStorage.getItem('firebaseCode'));
		var code = $scope.firebaseCode;

		var verificationId = credential.verificationId;

		var signInCredential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
		firebase.auth().signInWithCredential(signInCredential);
	}

	//#region AUX METHODS

	$scope.closeSidebar = function () {
		$('#wrapper').removeClass('toggled');
	};

	$scope.openSidebar = function () {
		$('#wrapper').addClass('toggled');
	};


	//#endregion

});