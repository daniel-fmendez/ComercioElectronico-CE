/**********************************************/
/*tratamos la excepción del constructor Card()*/
/**********************************************/
load("functionsCard.js");

var ID = "123456789ABCD";
var NAME = "PEPE";
var APELLIDO1 = "FERNANDEZ";
var APELLIDO2 = "LOPEZ";
var VIAJES = "10";
var CAD = "20/10/2025";


var TITLE = "====================LA PRISA===================="
	
/**********************************************/
/*script para la creación de una tarjeta nueva*/
/**********************************************/
var wait_card = true;
var intentos = 0;

function clearCard() {
	writeCard(DATA_START, Array(16*4+1).join("*"));
	writeCard(NAME_START, Array(16*3+1).join(" "));
	writeCard("90", Array(16*7+1).join("*"));
}


while(wait_card && intentos < 25){
	try{
		intentos++;
		var card = new Card();
		var key = new Key();
		key.setComponent(Key.DES, new ByteString("1122334455667788", HEX))
		var cifrador = new Crypto();
		
		selectCard();
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
		writeCard(SEPARADOR_START, Array(16+1).join("="));
		
		signCard();
		
		print("Nueva tarjeta creada")
		
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

