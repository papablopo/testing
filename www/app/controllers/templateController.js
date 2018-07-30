angular
  .module("EtaApp")
  .controller("TemplateCtrl", function($scope, $rootScope) {
    $rootScope.user = {
      id: -2
    };

    $rootScope.fixedFooter = false;
    $rootScope.showBarsButton = true;

    $scope.rs = $rootScope;

    $rootScope.valEmail = function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    $rootScope.valIdentification = function(id) {
      if (id.length == 10) {
        first2Digits = id.substring(0, 2);

        if (
          (parseInt(first2Digits) < 25 || parseInt(first2Digits) == 30) &&
          parseInt(first2Digits) > 0
        ) {
          var total = 0;
          for (var i = 0; i < 9; i++) {
            var currD = parseInt(id.substring(i, i + 1));
            total +=
              i % 2 == 0
                ? currD * 2 > 9
                  ? currD * 2 - 9
                  : currD * 2
                : parseInt(id.substring(i, i + 1));
          }
          total = total % 10;
          total = total == 0 ? 0 : 10 - total;
          if (total == id.substring(id.length - 1, id.length)) {
            return true;
          }
        }
      }
      return false;
    };

    $scope.categories = [
      // 	{
      // 	"strDescription": "Mujer",
      // 	"blnStatus": true,
      // 	"id": 1
      // }, {
      // 	"strDescription": "Mujer2",
      // 	"blnStatus": true,
      // 	"id": 1
      // }
    ];

    $scope.goToSearch = function() {
      window.location = "#/search/" + $scope.txtSearch;
    };

    ws
      .getCategories()
      .done(function(response) {
        try {
          var categories = [];

          $.each(response.categories, function() {
            categories.push(this);
          });

          for (let i = 0; i < categories.length; i++) {
            for (let j = i; j < categories.length; j++) {
              if (categories[i].intOrden > categories[j].intOrden) {
                const cat = categories[i];
                categories[i] = categories[j];
                categories[j] = cat;
              }
            }
          }

          $scope.$apply(function() {
            $scope.categories = categories;
          });
        } catch (e) {
          console.log(e);
        }
      })
      .fail(function(error) {
        if (error && error) {
          showMessage(error);
        } else {
          showMessage(config.defaultWsErrorMsg);
        }
      })
      .always(function() {
        hideLoading();
      });

    $scope.toggleSidebar = function() {
      $("#wrapper").toggleClass("toggled");
    };

    $scope.toggleSearchbar = function() {
      $("#searchWrapper").toggleClass("toggled");
    };

    $scope.toHome = function() {
      $("#wrapper").removeClass("toggled");
    };

    $scope.openEtacash = function() {
      if (localStorage.userDocument) {
        window.location = "#/etacash";
      } else {
        window.location = "#/register2";
      }
    };

    $scope.openPlaneta = function() {
      window.location = "#/planeta1";
    };

    $scope.loadSidebar = function() {
      $rootScope.user.id = 123;
      if (localStorage.userData) {
        var userData = JSON.parse(localStorage.userData);
      } else {
        $scope.rs.user = {
          id: -1
        };
      }
      /*
		ws.getCategories().done(function (response) {
			try {
				var categories = [];

				$.each(response.categories, function () {
					categories.push(this);
				})

				for (let i = 0; i < categories.length; i++) {
					for (let j = i; j < categories.length; j++) {
						if (categories[i].intOrden > categories[j].intOrden) {
							const cat = categories[i];
							categories[i] = categories[j]
							categories[j] = cat;
						}
	
					}
				}

				$scope.$apply(function () {
					// debugger;
					// $scope.categories = categories;
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
		})*/
    };

    $scope.registerAction = function(
      actionType,
      actionProme,
      actionCat,
      actionWhere,
      idCompany
    ) {
      try {
        var currentDate =
          new Date().getDate() +
          "/" +
          new Date().getMonth() +
          "/" +
          (new Date().getYear() + 1900);

        var data = {
          codigo: "4000",
          array: {
            strMail: localStorage.email,
            intActionType: 2,
            intActionSection: 1,
            intActionPromo: 2,
            intActcionCat: 1,
            dteActionDate: currentDate,
            intActionWhere: 1,
            intIdCompany: 1
          }
        };

        ws.register(data).done(function(response) {});
      } catch (e) {
        console.log(e);
      }
    };
  });
