La aplicación desarrollada se encarga de simular un sistema de abonos de transporte para un servicio ficticio de transportes. Este sistema se basa en servicios de abonos mensuales y de abonos de viajes, cargados de 10 en diez. Se le ha añadido un sistema de detección de alteraciones mediante SHA 256.


----------------------------Scripts desarollados----------------------------

01. functionsCard.js	Contiene la gran mayoria de las funciones necesarias por el resto de scripts. Entre estas funciones se incluyen wrappers de las APDUs que se envian a los scripts.Contiene la gran mayoría de las funciones necesarias por el resto de los scripts. Entre estas funciones se incluyen wrappers de las APDUs que se envían a los scripts.

02. write_new_card.js	Script que escribe la información en una tarjeta.

03. use_card.js		Script que simula el uso de una tarjeta, permitiendo o denegando el viaje a los usuarios.

04. recharge_abono.js	Se encarga de recargar la mensualidad en la tarjeta por 30 días desde la fecha actual.

05. recharge_viajes.js 	Se encarga de cargar 10 viajes en la tarjeta.

