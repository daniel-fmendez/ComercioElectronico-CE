var card = new Card();
//creo objetos key y cifrador, así lo exige el pluguin
var key = new Key(); //creo objeto key genérica, es decir, podrá ser de cualquier tipo o formato
var cifrador = new Crypto(); //creo un objeto cifrador, sin especificar el algoritmo de cifrado

//leo datos de usuario en el rango @20h-@CFh para firmarlos luego
var SELECT_CARD = new ByteString("FF A4 00 00 01 06", HEX); //SELECT_CARD
var READ_CARD = new ByteString("FF B0 00 20 B0", HEX); //leer zona datos de usuario
card.plainApdu(SELECT_CARD); print("SELECT_CARD  SW1SW0: " + card.SW.toString(HEX));
var user_data = card.plainApdu(READ_CARD); print("USER_DATA (@20-@CFh) a firmar   SW1SW0: " + card.SW.toString(HEX));
print(user_data);

//calculo el hash MD5
var hash = cifrador.digest(Crypto.MD5, user_data); //calculo el hash MD5 de los datos de usuario @20h-@CFh
print("           MD5(@20h-@CFh): " + hash + "   hex: " + hash.toString(HEX)); //print("longitud del HASD MD5: " + hash.length);
//print(user_data.toString(HEX)); //por si quiero el string de user_data

//leo firma en el rango @E0h-@EFh
var leer_firma = new ByteString("FF B0 00 E0 10", HEX); //compongo APDU de lectura
var firma = card.plainApdu(leer_firma); //ledo firma
print("firma leida de la tarjeta: " + firma + "   hex: " + firma.toString(HEX));


//desencripto la firma
key.setComponent(Key.DES, new ByteString("1122334455667788", HEX)); //asigno un valor a la vble key, del tipo DES_ECB
firma2 = cifrador.decrypt(key, Crypto.DES_ECB, firma);
print("      firma desencriptada: " + firma2 + "   hex: " + firma2.toString(HEX));
if(hash.toString(HEX) == firma2.toString(HEX))
	{print("                                                                             tarjeta no manipulada, eres un tipo honrado")}
	else{print("                                                                             tarjeta manipulada, eres un pirata")}
