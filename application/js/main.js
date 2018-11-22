// Creates the random game id
function makegameid() {
	var addnow = new Date().getTime();
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 6; i++){
		text += possible.charAt((Math.floor(Math.random() * addnow))%possible.length);
	}

	return text;
}

let qrCodeElement = document.getElementById("qrcode");
var qrCode = new QRCode(qrCodeElement);

// Once the IP address is found the QR code is generated
function GenerateQRCode() {
  let gameURLElement = document.getElementById("gameURLInputField");  

  let baseAddress = "http://tbrm.me";
  let backendAddress = "svr.tablerealms.com";
  let gameName = "TR Embedded Dev Tool";
  let protocol = "E2";
  let sessionID = makegameid();
  let encodedGameAddress = encodeURIComponent(gameURLElement.value);
  let versionNum2 = "RS";

  let compositeQRText = 
    baseAddress
    + "?i=" + backendAddress
    + "&n=" + gameName
    + "&p=" + protocol
    + "&g=" + sessionID
    + "&u=" + encodedGameAddress
    + "&f=" + versionNum2;

    qrCode.makeCode(compositeQRText);
}

function gameUrlChanged() {
  GenerateQRCode();
}

function openConsoleMode() {
  let gameURLElement = document.getElementById("gameURLInputField");  
  window.open(gameURLElement.value);  
}

// Application entry point
function Main () {
  const Http = new XMLHttpRequest();
  const url = window.location.origin + "/getIP";

  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange=(e) => {
    if (Http.readyState === 4 && Http.status === 200) {
      var response = JSON.parse(Http.responseText);
      let gameURLElement = document.getElementById("gameURLInputField");
      gameURLElement.value = response.address;
      GenerateQRCode();
    }
  }
}

Main();