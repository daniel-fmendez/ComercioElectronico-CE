print("=================================================");
print("script para dar de alta al usuario en el gimnasio");
print("cabecera + name + #socio + credito + fecha y hora");
print("=================================================");

/*obtener fecha y hora actual*/
var f = new Date();

var dia = f.getDate(); if(dia < 10){dia = "0".concat(dia)};
var mes = f.getMonth() + 1; anno = f.getFullYear(); if(mes < 10){mes = "0".concat(mes)};
var anno = f.getFullYear(); if(anno < 10){anno = "0".concat(anno)};
var fecha = new ByteString("Fecha:" + dia + "/" + mes + "/" + anno, ASCII);

var h = f.getHours(); if(h < 10){h = "0".concat(h)};
var m = f.getMinutes(); if(m < 10){m = "0".concat(m)};
var s = f.getSeconds(); if(s < 10){s = "0".concat(s)}
var hora = new ByteString("Hora:" + h + "h:" + m + "m:" + s + "s" , ASCII);

//print("fecha: " + fecha.toString(ASCII)); print("hora: " + hora.toString(ASCII));
/*fin fecha y hora*/


card = new Card(); //creo un objeto CARD
//atr = card.reset(Card.RESET_COLD); //no necesario, lo realiza el lector
//print("RESET CARD & GET ATR OK"); //no necesario
//print(atr); //no necesario

SELECT_CARD = new ByteString("FF A4 00 00 01 06", HEX); //SELECT_CARD
PRESENT_PSC = new ByteString("FF 20 00 00 03 FF FF FF", HEX); //PRESENT_PSC

card.plainApdu(SELECT_CARD); //print("SELECT_CARD  SW1 SW0: " + card.SW.toString(HEX));
card.plainApdu(PRESENT_PSC); //print("PRESENT_PSC  SW1 SW0: " + card.SW.toString(HEX));

//escribo en ASCII el contenido de los 14 bloques de 16 bytes de @20h a @F0h
WRITE_20h = new ByteString("FF D0 00 20 10", HEX); Data_20h = new ByteString("****************", ASCII);
WRITE_30h = new ByteString("FF D0 00 30 10", HEX); Data_30h = new ByteString("**GIMNASIO**EL**", ASCII);
WRITE_40h = new ByteString("FF D0 00 40 10", HEX); Data_40h = new ByteString("***FORTACHON****", ASCII);
WRITE_50h = new ByteString("FF D0 00 50 10", HEX); Data_50h = new ByteString("****************", ASCII);
WRITE_60h = new ByteString("FF D0 00 60 10", HEX); Data_60h = new ByteString("JOSE            ", ASCII);
WRITE_70h = new ByteString("FF D0 00 70 10", HEX); Data_70h = new ByteString("GUTIERREZ       ", ASCII);
WRITE_80h = new ByteString("FF D0 00 80 10", HEX); Data_80h = new ByteString("FERNANDEZ       ", ASCII);
WRITE_90h = new ByteString("FF D0 00 90 10", HEX); Data_90h = new ByteString("SOCIO VIP #34216", ASCII);
WRITE_A0h = new ByteString("FF D0 00 A0 10", HEX); Data_A0h = new ByteString("SALDO (pases):50", ASCII);
WRITE_B0h = new ByteString("FF D0 00 B0 10", HEX); Data_B0h = fecha;
WRITE_C0h = new ByteString("FF D0 00 C0 10", HEX); Data_C0h = hora;
WRITE_D0h = new ByteString("FF D0 00 D0 10", HEX); Data_D0h = new ByteString("================", ASCII);
WRITE_E0h = new ByteString("FF D0 00 E0 10", HEX); Data_E0h = new ByteString("**@s*reservadas*", ASCII);
WRITE_F0h = new ByteString("FF D0 00 F0 10", HEX); Data_F0h = new ByteString("***para*firmas**", ASCII);


//compongo todas las APDU's de escritura desde @20h a @F0h y las mando a la tarjeta
card.plainApdu(new ByteString(WRITE_20h + " " + Data_20h, HEX));
card.plainApdu(new ByteString(WRITE_30h + " " + Data_30h, HEX));
card.plainApdu(new ByteString(WRITE_40h + " " + Data_40h, HEX));
card.plainApdu(new ByteString(WRITE_50h + " " + Data_50h, HEX));
card.plainApdu(new ByteString(WRITE_60h + " " + Data_60h, HEX));
card.plainApdu(new ByteString(WRITE_70h + " " + Data_70h, HEX));
card.plainApdu(new ByteString(WRITE_80h + " " + Data_80h, HEX));
card.plainApdu(new ByteString(WRITE_90h + " " + Data_90h, HEX));
card.plainApdu(new ByteString(WRITE_A0h + " " + Data_A0h, HEX));
card.plainApdu(new ByteString(WRITE_B0h + " " + Data_B0h, HEX));
card.plainApdu(new ByteString(WRITE_C0h + " " + Data_C0h, HEX));
card.plainApdu(new ByteString(WRITE_D0h + " " + Data_D0h, HEX));
card.plainApdu(new ByteString(WRITE_E0h + " " + Data_E0h, HEX));
card.plainApdu(new ByteString(WRITE_F0h + " " + Data_F0h, HEX));

//print("IMPRIMO USER_DATA @20h a @FFh");
response = card.plainApdu(new ByteString("FF B0 00 20 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 30 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 40 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 50 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 60 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 70 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 80 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 90 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 A0 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 B0 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 C0 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 D0 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 E0 10", HEX)); print(response.toString(ASCII));
response = card.plainApdu(new ByteString("FF B0 00 F0 10", HEX)); print(response.toString(ASCII));

print("");

//response = card.plainApdu(new ByteString("FF B0 00 20 E0", HEX)); //DUMP
//print(response);
//print("C-APDU: DUMP " + "SW: " + card.SW.toString(HEX));
card.close();
print("Card closed");