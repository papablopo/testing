var app = {
  initialize: function () {
    this.bindEvents();
  },
  bindEvents: function () {
    document.addEventListener("deviceready", this.onDeviceReady, false);
    try {
      var config = {
        apiKey: "AIzaSyAtHRtNwJ5iI9IV7azLF9hwVo9FFunRZbE",
        authDomain: "etafashion-pushnotifications.firebaseapp.com",
        databaseURL: "https://etafashion-pushnotifications.firebaseio.com",
        projectId: "etafashion-pushnotifications",
        storageBucket: "etafashion-pushnotifications.appspot.com",
        messagingSenderId: "317719226174"
      };
       firebase.initializeApp(config);
    } catch (e) {
      console.log(e);
    }
  },
  onDeviceReady: function () {
    app.receivedEvent("deviceready");

    var fbLoginSuccess = function (userData) {
      console.log("UserInfo: ", userData);
    }
     
    facebookConnectPlugin.login(["public_profile"], fbLoginSuccess,
      function loginError (error) {
        console.error(error)
      }
    );
    
    window.FirebasePlugin.onNotificationOpen(
      function (notification) {
        console.log(notification);
        window.config.pushContent = notification;
        window.location = "#/pushContent";
      },
      function (error) {
        alert(error);
      }
    );

    // setTimeout(
    // function() {
    // window.config.pushContent = JSON
    // .parse('{"tap": false,"url": "www.etafashion.com","body": "No te
    // pierdas 20% de descuento por tu primera compra","icon":
    // "https://pbs.twimg.com/profile_images/809416680602562560/9M3pMthj_bigger.jpg","image":
    // "https://www.etafashion.com/media/wysiwyg/imagenes_home/banner-primera-compra-ETAFASHION.jpg","title":
    // "20% de descuento aprovecha!"}')
    // window.location = '#/pushContent';
    // }, 1000);
  },
  receivedEvent: function (id) {},
  initMap: function () {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        currPosition = pos;
        map = new google.maps.Map(document.getElementById("map"), {
          center: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          },
          scrollwheel: false,
          zoom: 14,
          disableDefaultUI: true
        });
        var scope = angular.element($("#mapView")).scope();
        if (scope.optionMap == 1) {
          // $scope.positionSuccessForLocations();
          scope.positionSuccessForLocations();
        }
      },
      function () {}, {
        enableHighAccuracy: true,
        maximumAge: 3600000
      }
    );
  }
};

app.initialize();

function showCloseMessage(msg) {
  var currMsg = "";
  if (msg != undefined) {
    currMsg = msg;
  }
  $("#closeMessage p").html(currMsg);
  $("#closeMessage").show();
}

function showAutoCloseMessage(msg) {
  var currMsg = "";
  if (msg != undefined) {
    currMsg = msg;
  }
  $("#closeMessage p").html(currMsg);
  $("#closeMessage").show();

  setTimeout(() => {
    $("#closeMessage").hide();
  }, 3000);
}

function hideCloseMessage() {
  $("#closeMessage").hide();
}

function showMessage(msg) {
  var currMsg = "Hubo un error, por favor intentalo nuevamente";
  if (msg != undefined) {
    currMsg = msg;
  }
  $('#errorModal [name="txtMessage"]').text(currMsg);
  $("#errorModal").modal("show");
}

function hideMessage() {
  $("#errorModal").modal("hide");
}

function showLoading(msg) {
  var currMsg = "Cargando";
  if (msg != undefined) {
    currMsg = msg;
  }
  $("#loading p").text(currMsg);
  $("#loading").show();
}

function hideLoading() {
  $("#loading").hide();
}

function capitalizeText(text) {
  try {
    var words = text.split(" ");
    var capitalizedText = "";
    $.each(words, function () {
      capitalizedText +=
        this.substring(0, 1) + this.substring(1).toLowerCase() + " ";
    });
    return capitalizedText.trim();
  } catch (e) {
    return text;
  }
}

function openRouteMap(thisLat, thisLon, currLat, currLon) {
  var urlToOpen = "";
  var thisPlatform = "";

  try {
    thisPlatform = device.platform;
  } catch (e) {
    console.log(e.message);
  }

  console.log(thisPlatform);

  if (thisPlatform == "iOS") {
    // alert('ios');
    try {
      try {
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            urlToOpen =
              "https://www.google.com.ec/maps/dir/" +
              pos.coords.latitude +
              "," +
              pos.coords.longitude +
              "/" +
              thisLat +
              "," +
              thisLon +
              "/data=!4m2!4m1!3e0?hl=es";
            window.open(urlToOpen, "_system");
          },
          function () {
            urlToOpen =
              "https://www.google.com.ec/maps/dir/" +
              +"," +
              currLon +
              "/" +
              thisLat +
              "," +
              thisLon +
              "/data=!4m2!4m1!3e0?hl=es";
            window.open(urlToOpen, "_system");
          }, {
            timeout: 30000,
            enableHighAccuracy: true
          }
        );
      } catch (e) {
        console.log(e);
        urlToOpen =
          "https://www.google.com.ec/maps/dir/" +
          currLat +
          "," +
          currLon +
          "/" +
          thisLat +
          "," +
          thisLon +
          "/data=!4m2!4m1!3e0?hl=es";
        window.open(urlToOpen, "_system");
      }
    } catch (e) {
      urlToOpen =
        "http://maps.apple.com/?saddr=&daddr=" + thisLat + "," + thisLon;
      window.open(urlToOpen, "_system");
    }
  } else {
    try {
      navigator.geolocation.getCurrentPosition(
        function (pos) {
          urlToOpen =
            "https://www.google.com.ec/maps/dir/" +
            pos.coords.latitude +
            "," +
            pos.coords.longitude +
            "/" +
            thisLat +
            "," +
            thisLon +
            "/data=!4m2!4m1!3e0?hl=es";
          window.open(urlToOpen, "_system");
        },
        function () {
          urlToOpen =
            "https://www.google.com.ec/maps/dir/" +
            currLat +
            "," +
            currLon +
            "/" +
            thisLat +
            "," +
            thisLon +
            "/data=!4m2!4m1!3e0?hl=es";
          window.open(urlToOpen, "_system");
        }, {
          timeout: 10000,
          enableHighAccuracy: true
        }
      );
    } catch (e) {
      console.log(e);
      urlToOpen =
        "https://www.google.com.ec/maps/dir/" +
        currLat +
        "," +
        currLon +
        "/" +
        thisLat +
        "," +
        thisLon +
        "/data=!4m2!4m1!3e0?hl=es";
      window.open(urlToOpen, "_system");
    }
  }
}

function encryptData(d) {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(
    "-----BEGIN PUBLIC KEY-----" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs+PdI0wlGN/FNvZ9/CLU" +
    "UbseEn5TTFGBOWj0Fb4tZqm7JnMzyc59sR6XNSF7V9ULi87ruzfQKjxEXz7lNUu8" +
    "FyooDNhOjSSD9IXDv7qRz5hm/wSI6QUs97We4M900ccn2PGbUUx8xjeb2Ib/JR4V" +
    "5t2IvEiFB8MsRsSx/BwTOZ/2ihmRKaRcSXcJMZFXdZYu/OO04PngTuiU+WLSMaZE" +
    "fTAsTTuQzplsK9gO3+cX/FvzZ6XWN9730Nt0pCutPcbFfwXWtY3ZWm/6lL+pnDSc" +
    "xoZoBcvN+7a9encdlIa6Z3xt/01PgwyLDd9mhkYqR/V8weATVARh9fHCj5WCOdkq" +
    "rQIDAQAB" +
    "-----END PUBLIC KEY-----"
  );
  var encrypted = encrypt.encrypt(d);
  return encrypted;
}