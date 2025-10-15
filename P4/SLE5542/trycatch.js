/**********************************************/
/*tratamos la excepción del constructor Card()*/
/**********************************************/
var HASH_START = "E0";
var HASH_LENGTH = "20";

var DATA_START = "30";
var DATA_LENGTH = "A0";
/**********************************************/
var wait_card = true;
var intentos = 0;


while(wait_card && intentos < 25){
	try{
		intentos++;
		var card = new Card();
		var key = new Key();
		key.setComponent(Key.DES, new ByteString("1122334455667788", HEX))
		var cifrador = new Crypto();
		
		selectCard();
		readCard(HASH_START, HASH_LENGTH);
		presentPsc();
		//writeCard("20", "hola")
		checkFirma();
		blockCard();
		//********AQUI**VA**NUESTRO**SCRIPT*******
		//*************BLA*BLA*BLA****************
		//********AQUI**VA**NUESTRO**SCRIPT*******
		wait_card = false;
		card.close();
		print("tarjeta leida tras " + intentos + " intentos");
		
	}
	catch(error){
		
		//print(error.name + ": " + error.message);
		print(error.message);
		print("please insert card, intentos: " + intentos + " de lectura");
		
	}
}
if(wait_card){print("script detenido tras " + intentos + " intentos");}

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
	
	//print("Leyendo: ")
	//print("\t"+user_data.toString(ASCII));
	return user_data;
}
function presentPsc(){
	PRESENT_PSC = new ByteString("FF 20 00 00 03 FF FF FF", HEX); //PRESENT_PSC
	card.plainApdu(PRESENT_PSC);
}

function writeCard(start, str) {
	data = stringToHex(str);
	dataLen = toHexByte(str.length)
	WRITE_DATA = new ByteString("FF D0 00 " + start + " " + dataLen + " " + data, HEX);
	card.plainApdu(WRITE_DATA);
}

function getFirma() {
	var firmaData = readCard(HASH_START, HASH_LENGTH);
	print("Firma leida: ")
	print("\t"+firmaData.toString(ASCII));
	return firmaData;
}
function genFirma(data) {
	var hash = cifrador.digest(Crypto.MD5, data);
	var firma = cifrador.encrypt(key, Crypto.DES_ECB, hash);
	
	return firma;
}

function checkFirma() {
	data = readCard(DATA_START, DATA_LENGTH);
	actualFirma = getFirma();
	
	var expectedFirma = genFirma(data)
	
	var match = (actualFirma === expectedFirma);
	print("Son iguales las firmas: " + match);
	
	return match;
}

function blockCard(){
	str = Array(14).join("**BLOCKED CARD**")
	writeCard(DATA_START,str);
	print("\nTARJETA BLOQUEADA\n")
}