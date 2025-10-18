/**********************************************/
/*tratamos la excepción del constructor Card()*/
/**********************************************/
load("functionsCard.js");

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
		if(checkFirma()){
			//TODO COSAS
		} else {
			blockCard();
		}
		
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

