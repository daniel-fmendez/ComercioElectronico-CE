/**********************************************/
/*tratamos la excepción del constructor Card()*/
/**********************************************/
load("functionsCard.js");

const ID = "123456";
const NAME = "PEPE";
const APELLIDO1 = "FERNANDEZ";
const APELLIDO2 = "LOPEZ";
const VIAJES = "10";
const CAD = "20/10/2025";

const DATA_START = "30";
const ID_START = "50";
const NAME_START = "60";
const APELLIDO1_START = "70";
const APELLIDO2_START = "80";
const VIAJES_START = "90";
const CAD_START = "A0;"
const HASH_START = "E0";
const SEPARADOR_START = "D0";
const FIRMA_START = "E0";

var TITLE = "====================LA PRISA===================="
/**********************************************/
var wait_card = true;
var intentos = 0;

function clearCard() {
	writeCard(DATA_START, Array(16*4).join("*"));
	writeCard(NAME_START, Array(16*3).join(" "));
	writeCard("90", Array(16*7).join("*"));
}


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
		clearCard();
		writeCard(DATA_START, TITLE);
		writeCard(ID_START, "ID:".concat(ID));
		writeCard(NAME_START, NAME);
		writeCard(APELLIDO1_START, APELLIDO1);
		writeCard(APELLIDO2_START, APELLIDO2);
		writeCard(VIAJES_START, "VIAJES:".concat(VIAJES));
		writeCard(CAD_START, "CAD:".concat(CAD));
		writeFechaYHora();
		writeCard(SEPARADOR_START, Array(16).join("="));
		writeCard(FIRMA_START, genFirma(readCard(DATA_START, DATA_LENGTH)));
		
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

