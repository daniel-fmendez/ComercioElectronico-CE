/**********************************************/
/*tratamos la excepción del constructor Card()*/
/**********************************************/
load("functionsCard.js");

/**************************************************************/
/*script encargado de recargar los viajes, sumandole 10 viajes*/
/**************************************************************/
var wait_card = true;
var intentos = 0;

while(wait_card && intentos < 25){
	try{
		intentos++;
		var card = new Card();
		
		
		selectCard();
		readCard(HASH_START, HASH_LENGTH);
		presentPsc();
		
		if(checkFirma()){
			var cad = readCard(CAD_VALUE_START, CAD_LENGTH).toString(ASCII);
			var [dia, mes, anno] = cad.split("/").map(Number);
			var cadFecha = new Date(anno, mes - 1, dia);
			
			var viajes = Number(readCard(VIAJES_VALUE_START, VIAJES_LENGTH).toString(ASCII));
			viajes += 10;
			var viajesStr = viajes < 10 ? "0" + viajes : "" + viajes;
			
			writeCard(VIAJES_VALUE_START, viajesStr);
			writeFechaYHora();
			signCard();
			
		} else {
			blockCard();
		}
		print("\n");

		
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

