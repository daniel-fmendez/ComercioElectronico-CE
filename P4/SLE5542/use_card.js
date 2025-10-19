/**********************************************/
/*tratamos la excepción del constructor Card()*/
/**********************************************/
load("functionsCard.js");


//Fecha para comparar la caducidad, más sencillo que cambiar el script de alta
//var FECHA = new Date(); 
var FECHA = new Date(2025,10,18); 
/**********************************************************/
/*script encargado de utilizar los servicios de la tarjeta*/
/**********************************************************/
var wait_card = true;
var intentos = 0;

while(wait_card && intentos < 25){
	try{
		intentos++;
		var card = new Card();
		
		
		selectCard();
		readCard(HASH_START, HASH_LENGTH);
		presentPsc();
		//writeCard("40", "CAD:".concat(CAD));´
		
		if(checkFirma()){
			var cad = readCard(CAD_VALUE_START, CAD_LENGTH).toString(ASCII);
			var [dia, mes, anno] = cad.split("/").map(Number);
			var cadFecha = new Date(anno, mes - 1, dia);
			
			var viajes = Number(readCard(VIAJES_VALUE_START, VIAJES_LENGTH).toString(ASCII));
			
			var nombre = readCard(NAME_START, "10").toString(ASCII).trim();
			
			if(FECHA < cadFecha) {
				print("=============Buen viaje, " + nombre + "!=============");
				print("\tSu abono caduca el, " + cad);
			} else if (viajes > 0) {
				viajes--;
				var viajesStr = viajes < 10 ? "0" + viajes : "" + viajes;
				writeCard(VIAJES_VALUE_START, viajesStr);
				
				//Actualizamos la fecha y hora de modificacion y firmamos
				writeFechaYHora();
				signCard();
				
				if(viajes < 4){
					print("=============Buen viaje, " + nombre + "!=============");
					if(viajes == 0){
						print("\tNo quedan más viajes disponibles");
					}else{
						print("\tRecuerde recargar sus viajes, quedan pocos: " + viajes);
					}
				} else {
					print("=============Buen viaje, " + nombre + "!=============");
					print("\tDispone de " + viajes + " viajes restantes");
				}
			} else {
				print("=============No dispone de abono ni de viajes disponibles=============");
				print("\tPara usar este servicio adquiera viajes o un abono");
			} 
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

