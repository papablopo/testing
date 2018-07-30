var map;
var currPosition;
var markers = [];

etaApp.controller('ProductsCtrl', function ($scope, $routeParams, $rootScope) {

	$scope.rs = $rootScope;

	$scope.isInactivePage = true;

	$scope.parKeyword = $routeParams.keyword;

	$scope.showTextEmptySearch = false;

	$scope.categoryId = $routeParams.catId;
	$scope.categoryName = $routeParams.catName;
	$scope.currenCatPromos = [];

	$scope.txtSearch = '';

	$scope.promosBanners = [];
	$scope.promosProducts = [];
	$scope.promosOffers = [];
	$scope.promosBrands = [];

	$scope.pin = '';

	$scope.startDate = '';
	$scope.cutDatte = '';
	$scope.lastPay = '';
	$scope.totalPayments = '';
	$scope.currentBill = '';
	$scope.currentTotal = '';

	$scope.accountDetails = [];
	$scope.isAccountDetailsShowed = false;

	$scope.banners = [{
		id: 1
	}, {
		id: 2
	}, {
		id: 3
	}];

	$scope.pushContent = '';

	$scope.toggleSidebar = function () {
		$('#wrapper').toggleClass('toggled');
	};

	$scope.$on('$viewContentLoaded', function () {
		setTimeout(function () {
			$scope.$apply(function () {
				$scope.isInactivePage = false;
			});
		}, 100);
	});

	$scope.goToSearch = function () {
		window.location = "#/search/" + $scope.txtSearch;
	}

	$scope.openPinView = function () {
		window.location = "#/pin";
	};

	$scope.openBrandLink = function (url) {
		try {
			cordova.InAppBrowser.open(url, '_blank', 'location=no');
		} catch (e) {
			console.log(e);
		}
	}

	$scope.sLoadW1 = function () {
		localStorage.removeItem('cat7');
		if (localStorage.userData) {
			window.location = '#/home';
		}
	};

	$scope.sLoadSearch = function () {
		showLoading('Generando');

		ws.searchOfferByKeyword($scope.parKeyword).done(function (data) {

			var thisPromos = data.promos;
			$scope.$apply(function () {
				$scope.promosProducts = thisPromos;

				setTimeout(function () {
					$(".owl-carousel").owlCarousel({
						autoplay: true,
						items: 1,
					});
				}, 500);

				$scope.showTextEmptySearch = true;
			});

			hideLoading();

		}).fail(function () {
			hideLoading();
			$scope.$apply(function () {
				$scope.showTextEmptySearch = true;
			});
		}).always(function () {
			hideLoading();
		});

		// try {
		// $('<iframe>', {
		// src:
		// 'https://etafashion.com/catalogsearch/result/?q='+$scope.parKeyword,
		// id: 'frameSearch',
		// frameborder: 0,
		// scrolling: 'no'
		// }).appendTo('#iframeContainer');
		// } catch (e) {
		// console.log(e);
		// }
	};

	$scope.sLoadPush = function () {

		$scope.pushContent = window.config.pushContent;
		try {
			FirebasePlugin.logEvent("select_content", {
				content_type: "page_view",
				item_id: "push"
			});
		} catch (error) {}
	};

	$scope.sLoadHome = function () {
		$scope.rs.fixedFooter = false;

		try {
			FirebasePlugin.logEvent("select_content", {
				content_type: "page_view",
				item_id: "home"
			});
		} catch (error) {}

		if (localStorage.cat8) {
			var thisCat = JSON.parse(localStorage.cat8);

			var thisPromosBanners = [];
			var thisPromosProducts = [];
			var thisPromosOffers = [];
			var thisPromosBrands = [];

			$.each(thisCat.lstPromos, function () {
				if (this.intIdSection == 1) {
					thisPromosBanners.push(this);
				} else if (this.intIdSection == 2) {
					thisPromosProducts.push(this);
				} else if (this.intIdSection == 4) {
					thisPromosBrands.push(this);
				} else if (this.intIdSection == 3) {
					thisPromosOffers.push(this);
				} else {
					thisPromosOffers.push(this);
				}
			})

			var thisPromos = thisCat.lstPromos;
			$scope.currenCatPromos = thisPromos;
			$scope.promosBanners = thisPromosBanners;
			$scope.promosProducts = thisPromosProducts;
			$scope.promosOffers = thisPromosOffers;
			$scope.promosBrands = thisPromosBrands;

			setTimeout(function () {
				$(".carouselBanners").owlCarousel({
					autoplay: true,
					loop: true,
					items: 1,
					singleItem: true,
				});

				$(".carouselBrands").owlCarousel({
					autoplay: true,
					loop: true,
					items: 2,
					singleItem: false,
					autoplay: true
				});

				$(".carouselProducts").owlCarousel({
					autoplay: true,
					loop: true,
					items: 2,
					singleItem: false,
					autoplay: true,
					autoplayTimeout: 10000,
					nav: true,
					navText: ["<span><</span>", "<span>></span>"],
				});
			}, 500);

		} else {

			ws.getCategoriesById(8).done(function (response) {

				var thisCat = response.categories[0];
				localStorage.setItem('cat9', JSON.stringify(thisCat));

				var thisPromosBanners = [];
				var thisPromosProducts = [];
				var thisPromosOffers = [];
				var thisPromosBrands = [];

				$.each(thisCat.lstPromos, function () {
					if (this.intIdSection == 1) {
						thisPromosBanners.push(this);
					} else if (this.intIdSection == 2) {
						thisPromosProducts.push(this);
					} else if (this.intIdSection == 4) {
						thisPromosBrands.push(this);
					} else if (this.intIdSection == 3) {
						thisPromosOffers.push(this);
					} else {
						thisPromosOffers.push(this);
					}
				})

				var thisPromos = thisCat.lstPromos;
				$scope.$apply(function () {
					$scope.currenCatPromos = thisPromos;
					$scope.promosBanners = thisPromosBanners;
					$scope.promosProducts = thisPromosProducts;
					$scope.promosOffers = thisPromosOffers;
					$scope.promosBrands = thisPromosBrands;

					setTimeout(function () {
						$(".carouselBanners").owlCarousel({
							autoplay: true,
							loop: true,
							items: 1,
							singleItem: true,
						});

						$(".carouselBrands").owlCarousel({
							autoplay: true,
							loop: true,
							items: 2,
							singleItem: false,
							autoplay: true
						});

						$(".carouselProducts").owlCarousel({
							autoplay: true,
							loop: true,
							items: 2,
							singleItem: false,
							autoplay: true,
							autoplayTimeout: 10000,
							nav: true,
							navText: ["<span><</span>", "<span>></span>"],
						});
					}, 500);

				});

			}).fail(function (error) {
				if (error && error) {
					showMessage(error);
				} else {
					showMessage(config.defaultWsErrorMsg);
				}
			}).always(function () {
				hideLoading();
			});
		}

	}

	$scope.sLoadPin = function () {
		showLoading('Generando');
		$scope.rs.fixedFooter = true;
		$scope.pin = '';
		ws.generatePin({
			userDocument: localStorage.userDocument,
			amount: 100
		}).done(function (response) {
			try {
				if (response.codigo == '200') {
					$scope.$apply(function () {
						$scope.pin = response.resultado.pin;
					});
				} else {
					showAutoCloseMessage(response.mensaje);
				}

			} catch (e) {
				console.log(e);
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

	$scope.openPushUrl = function () {

	}

	$scope.trackFb = function (op) {
		var event = op == 1 ? 'banners' : op == 2 ? 'products' : op == 3 ? 'offers' : op == 4 ? 'brands' : 'products';

		try {
			FirebasePlugin.logEvent("select_content", {
				content_type: "page_view",
				item_id: event
			});
		} catch (error) {}
	}

	$scope.showAccountDetails = function () {
		$scope.isAccountDetailsShowed = true;
	}

	$scope.sLoadAccountStatus = function () {
		showLoading('Consultando');
		$scope.isAccountDetailsShowed = false;
		$scope.startDate = '';
		$scope.cutDatte = '';
		$scope.lastPay = '';
		$scope.totalPayments = '';
		$scope.currentBill = '';
		$scope.currentTotal = '';

		var identification = localStorage.userDocument;
		try {
			identification = encryptData(identification);
			identification = encodeURIComponent(identification);
		} catch (error) {

		}

		ws.getAccountStatus({
			userDocument: identification
		}).done(function (response) {
			try {
				$scope.$apply(function () {
					$scope.startDate = response.fechaemision;
					$scope.cutDate = response.fechapago;
					$scope.lastPay = response.anterior;
					$scope.totalPayments = response.pagos;
					$scope.currentBill = response.consumos;
					$scope.currentTotal = response.apagar;
				});

			} catch (e) {
				console.log(e);
			}

		}).fail(function (error) {
			if (error && error) {
				showMessage(error);
			} else {
				showMessage(config.defaultWsErrorMsg);
			}
		}).always(function () {
			hideLoading();
		});



		ws.getAccountStatusDetails({
			userDocument: identification
		}).done(function (response) {
			try {
				$scope.$apply(function () {

					var details = $.map(response, function (d, i) {

						try {

							d.descripcion = d.descripcion.substring(0, 1) + d.descripcion.substring(1).toLowerCase()

							return {
								date: d.fechapago,
								desc: d.descripcion,
								payCount: d.numcuota,
								payValue: d.valorcuota,
								total: d.valorCompra
							}
						} catch (e) {
							return {
								date: d.fechapago,
								desc: d.descripcion,
								payCount: d.numcuota,
								payValue: d.valorcuota,
								total: d.valorCompra
							}
						}

					});
					$scope.accountDetails = details;

				});

			} catch (e) {
				console.log(e);
			}

		}).fail(function (error) {
			if (error && error) {
				showMessage(error);
			} else {
				showMessage(config.defaultWsErrorMsg);
			}
		}).always(function () {
			hideLoading();
		});

	};

	$scope.sLoadMap = function () {
		showLoading();
		$scope.rs.fixedFooter = true;
		$scope.optionMap = 1;
		if (map == undefined) {
			var script_tag = document.createElement('script');
			script_tag.setAttribute("type", "text/javascript");
			script_tag.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyCqOb4S3Xgw9iTtRV2EtAzstw6caUBptXg&callback=app.initMap");
			(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
		} else {
			app.initMap();
			hideLoading();
		}
	};

	$scope.sendContactUs = function () {
		showLoading('Enviando');

		setTimeout(function () {
			showCloseMessage('Se ha enviado tu mensaje, pronto nos pondremos en contacto contigo');
			window.location = '#/home';
		}, 3000);

	};

	$scope.etacashData = {};
	$scope.bHistory = [];

	$scope.sLoadEtacash = function () {
		$scope.rs.fixedFooter = true;

		var identification = localStorage.userDocument;
		try {
			identification = encryptData(identification);
			identification = encodeURIComponent(identification);
		} catch (error) {

		}

		ws.getEtacash(identification).done(function (response) {

			$scope.$apply(function () {
				if (response.codigo == '200') {
					$scope.etacashData = response.resultado;
				}
			})

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

	$scope.sLoadHistory = function () {

		// var initDate = new Date().getDate() + '/' + new Date().getMonth() + '/' + (new Date().getYear() + 1900)
		// var currentDate = new Date().getDate() + '/' + new Date().getMonth() + '/' + (new Date().getYear() + 1900)

		$scope.rs.fixedFooter = true;
		showLoading('Consultando');

		ws.getHistory(localStorage.userDocument).done(function (response) {
			$scope.$apply(function () {
				if (response.codigo == '200') {
					$scope.bHistory.push(response.resultado);
				}
			})
		}).fail(function (error) {
			if (error && error) {
				showMessage(error);
			} else {
				showMessage(config.defaultWsErrorMsg);
			}
		}).always(function () {
			hideLoading();
		})

		// ws.getAccountBalance({
		// 	userId: '',
		// 	password: this.password
		// }).done(function (response) {
		// 	if (response.code == 0) {
		// 		data = response.data[0];
		// 		showCloseMessage('Bienvenido ' + data.name)
		// 		window.location = '#/home';
		// 	} else {
		// 		showCloseMessage(response.msg);
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

	$scope.sLoadCategory = function () {
		showLoading('Consultando');

		try {
			FirebasePlugin.logEvent("select_content", {
				content_type: "page_view",
				item_id: 'categoria_' + $scope.categoryName
			});
		} catch (error) {}

		$scope.rs.fixedFooter = false;

		try {
			window.FirebasePlugin.subscribe('etafashion' + $scope.categoryName);
		} catch (e) {
			console.log('subs ' + e.message);
		}

		ws.getCategoriesById($scope.categoryId).done(function (response) {

			var thisCat = response.categories[0];

			var thisPromosBanners = [];
			var thisPromosProducts = [];
			var thisPromosOffers = [];

			$.each(thisCat.lstPromos, function () {
				if (this.intIdSection == 1) {
					thisPromosBanners.push(this);
				} else if (this.intIdSection == 2) {
					thisPromosProducts.push(this);
				} else {
					thisPromosOffers.push(this);
				}
			})

			var thisPromos = thisCat.lstPromos;
			$scope.$apply(function () {
				$scope.currenCatPromos = thisPromos;
				$scope.promosBanners = thisPromosBanners;
				$scope.promosProducts = thisPromosProducts;
				$scope.promosOffers = thisPromosOffers;

				setTimeout(function () {
					$(".owl-carousel").owlCarousel({
						autoplay: true,
						items: 1,
					});
				}, 500);

			});

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

	$scope.positionSuccessForLocations = function () {
		showLoading('Cargando');
		ws.getPlaces($scope.categoryId).done(
			function (response) {

				$scope.$apply(function () {
					$scope.locations = response.locals;
					// $scope.locations = locations;
					var bounds = new google.maps.LatLngBounds();

					var meMarker = new google.maps.Marker({
						position: {
							lat: currPosition.coords.latitude,
							lng: currPosition.coords.longitude
						},
						map: map,
					});

					bounds.extend(meMarker.getPosition());

					$.each($scope.locations, function () {
						var image = {
							url: 'img/mapMarkerBlack.png',
							scaledSize: new google.maps.Size(30, 30),
							origin: new google.maps.Point(0, 0),
							anchor: new google.maps.Point(0, 32)
						};
						// var shape = {
						// coords : [ 1, 1, 1,
						// 20, 18, 20, 18, 1 ],
						// type : 'poly'
						// };

						var infoWindowCode = '<div id="content" class="infoLocation"> <div class="row"> <div class="col-xs-3 pad0 infoLocationImage"> <img class="w100" src="img/etaQuicentro.jpg' +
							'" /> </div> <div class="col-xs-9 pad0 infoLocationData"> <a href="javascript:void(0)" class="infoLocationName">' + this.strDescription + '</a> <br> <span class="infoLocationAddress">' + this.strAddress +
							'</span> <br> <span class="infoLocationHour">' + this.strOpenTime + '</span><br><a href="javascript:void(0)" class="mapBubble" onclick="openRouteMap(' + this.intLatitude + ',' + this.intLongitude +
							')">Como llegar</a></div> </div> </div>';

						var infowindow = new google.maps.InfoWindow({
							content: infoWindowCode
						});

						var etaMarker = new google.maps.Marker({
							position: {
								lat: this.intLatitude,
								lng: this.intLongitude
							},
							map: map,
							// shape:
							// shape,
							icon: image
						});

						etaMarker.addListener('click', function () {
							infowindow.open(map, etaMarker);
						});

						bounds.extend(etaMarker.getPosition());
						markers.push(etaMarker);
					})
					map.fitBounds(bounds);
					// var bubbles =
					// document.getElementsByClassName('mapBubble');
					//
					// for (var i = 0; i < bubbles.length; i++) {
					// bubbles[i].addEventListener("click", function() {
					// });
					// }

				});

			});

		hideLoading();
	};

	$scope.openEtaSnapchat = function () {
		window.open("https://snapchat.com/add/etafashion_ec", "_system");
	};

	$scope.openEtaYoutube = function () {
		window.open("vnd.youtube://www.youtube.com/user/ETAfashion", "_system");
	};

	$scope.openLink = function (link) {
		try {
			cordova.InAppBrowser.open(link, '_blank', 'location=no');
		} catch (e) {
			console.log(e);
		}
	}

	$scope.openProductDetail = function () {
		try {
			cordova.InAppBrowser.open('https://www.etafashion.com/jean-juvenil-slim-fit-azul-oscuro.html', '_blank', 'location=no');
		} catch (e) {
			alert(e.message);
		}
	}

	$scope.openSearchDetail = function (url) {
		try {
			cordova.InAppBrowser.open('https://etafashion.com/catalogsearch/result/?q=' + $scope.parKeyword, '_blank', 'location=no');
		} catch (e) {
			alert(e.message);
		}
	}

	$scope.openPromoDetail = function (url) {
		try {
			cordova.InAppBrowser.open(url, '_blank', 'location=no');
		} catch (e) {
			console.log(e);
		}
	};

	//#region AUX METHODS

	$scope.closeSidebar = function () {
		$('#wrapper').removeClass('toggled');
	};

	$scope.openSidebar = function () {
		$('#wrapper').addClass('toggled');
	};

	//#endregion

});