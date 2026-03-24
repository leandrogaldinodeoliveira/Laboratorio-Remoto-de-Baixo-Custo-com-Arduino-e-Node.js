
#include <OneWire.h>  
#include <DallasTemperature.h>

const int Led = 7;
const int ebulidor = 8;
char charRead;
String inputString ="";

#define dados 2 /*o pino de dados do sensor está ligado na porta 2 do Arduino*/

OneWire oneWire(dados);  /*Protocolo OneWire*/
/********************************************************************/
DallasTemperature sensors(&oneWire); /*encaminha referências OneWire para o sensor*/
/********************************************************************/

void setup (){

  Serial.begin(9600);
  pinMode(Led, OUTPUT);
    pinMode (ebulidor, OUTPUT);
  Serial.begin(9600);
  sensors.begin(); /*inicia biblioteca*/
  
  
}

void loop (){

digitalWrite (ebulidor, HIGH);

if (Serial.available()>0){ //Verifica se chegou algum dado

  charRead = Serial.read(); // Lê o dado
  
  if(charRead == 'T'){
    digitalWrite (Led, HIGH);
    digitalWrite (ebulidor, LOW);
    delay (30000);
    digitalWrite (ebulidor, HIGH);
  }

  if (charRead == 'F') {
        digitalWrite(Led, LOW);

      } 

      inputString = "";

  }

 if (digitalRead (Led) == HIGH) {
 sensors.requestTemperatures(); /* Envia o comando para leitura da temperatura */
float leitura1 = sensors.getTempCByIndex(0); /* Endereço do sensor */
float leitura2 = sensors.getTempCByIndex(1);
 

String msg = String(leitura1, 2) + "," + String(leitura2, 2);
Serial.println(msg);
 delay(1000);
 
}
}

    
  



  
