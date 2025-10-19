/**********************************************/
/*tratamos la excepción del constructor Card()*/
/**********************************************/
load("functionsCard.js");

/****************************************************************************/
/*script encargado de recargar el abono, dandole 30 dias respecto a la fecha*/
/****************************************************************************/
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
			var fecha = new Date(); 
			
			fecha.setDate(fecha.getDate() + 30);
			
			var dia = fecha.getDate();
			var mes = fecha.getMonth() + 1;
			var anno = fecha.getFullYear();
			
			if (dia < 10) dia = '0' + dia;
			if (mes < 10) mes = '0' + mes;
			
			var fechaStr = dia + '/' + mes + '/' + anno;
			
			writeCard(CAD_VALUE_START,fechaStr);
			
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

