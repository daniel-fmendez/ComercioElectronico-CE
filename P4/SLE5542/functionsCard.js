var CAD_VALUE_START = "A4";
var CAD_LENGTH = "0A";

var VIAJES_VALUE_START = "97";
var VIAJES_LENGTH = "02";

var HASH_LENGTH = "20";

var DATA_LENGTH = "80";

var DATA_START = "20";
var ID_START = "50";
var NAME_START = "60";
var APELLIDO1_START = "70";
var APELLIDO2_START = "80";
var VIAJES_START = "90";
var CAD_START = "A0";
var HASH_START = "E0";

var SEPARADOR_START = "D0";
var FIRMA_START = "E0";

var key = new Key();
key.setComponent(Key.DES, new ByteString("1122334455667788", HEX))
var cifrador = new Crypto();

function stringToHex(str) {
	return str.split("")
		.map(function(char) {
            return toHexByte(char.charCodeAt(0));
        })
		.join(' ')
		.toUpperCase();
}

function toHexByte(n) {
    var hex = n.toString(16).toUpperCase();
    return hex.length === 1 ? "0" + hex : hex;
}

function selectCard() {
	var SELECT_CARD = new ByteString("FF A4 00 00 01 06", HEX);
	card.plainApdu(SELECT_CARD);
}

function readCard(start, length) {
	var READ_CARD = new ByteString("FF B0 00 " + start + " " + length, HEX);
	var user_data = card.plainApdu(READ_CARD);
	
	return user_data;
}

function presentPsc(){
	PRESENT_PSC = new ByteString("FF 20 00 00 03 FF FF FF", HEX); //PRESENT_PSC
	card.plainApdu(PRESENT_PSC);
}

function writeCard(start, str) {
	data = new ByteString(str, ASCII);
	dataLen = toHexByte(str.length)
	WRITE_DATA = new ByteString("FF D0 00 " + start + " " + dataLen + " " + data, HEX);
	card.plainApdu(WRITE_DATA);
}

function getFirma() {
	var firmaData = readCard(HASH_START, HASH_LENGTH);
	return firmaData;
}
function genFirma(data) {
	var hash = cifrador.digest(Crypto.SHA_256, data);
	var firma = cifrador.encrypt(key, Crypto.DES_ECB, hash);
	return firma;
}

function checkFirma() {
	var data = readCard(ID_START, DATA_LENGTH);
	var actualFirma = getFirma();
	var expectedFirma = genFirma(data);

	var match = (actualFirma.toString(HEX) === expectedFirma.toString(HEX));

	
	return match;
}

function signCard() {
	var firmaData = readCard(ID_START, DATA_LENGTH)
	var firma = genFirma(firmaData).toString(ASCII);
	writeCard(FIRMA_START, firma);
}

function blockCard() {
	str = Array(14+1).join("**BLOCKED CARD**")
	writeCard(DATA_START,str);
	print("\nTARJETA BLOQUEADA\n");
}

function getFecha() {
	var f = new Date();
	var dia = f.getDate(); if(dia < 10){dia = "0".concat(dia)};
	var mes = f.getMonth() + 1; anno = f.getFullYear(); if(mes < 10){mes = "0".concat(mes)};
	var anno = f.getFullYear(); if(anno < 10){anno = "0".concat(anno)};
	return {
		"dia": dia,
		"mes": mes,
		"anno": anno
	};
}

function getHora() {
	var f = new Date();
	var h = f.getHours(); if(h < 10){h = "0".concat(h)};
	var m = f.getMinutes(); if(m < 10){m = "0".concat(m)};
	var s = f.getSeconds(); if(s < 10){s = "0".concat(s)}
	return {
		"h": h,
		"m": m,
		"s": s
	};
}


function writeFechaYHora() {
	var fecha = getFecha();
	var fechaToWrite = "FECHA:" + fecha.dia + "/" + fecha.mes + "/" + fecha.anno;
	//print(fecha + " " + fechaToWrite);
	writeCard("B0", fechaToWrite);
	
	var hora = getHora();
	var horaToWrite = "HORA:" + hora.h + "h:" + hora.m + "m:" + hora.s + "s";
	writeCard("C0", horaToWrite);
}