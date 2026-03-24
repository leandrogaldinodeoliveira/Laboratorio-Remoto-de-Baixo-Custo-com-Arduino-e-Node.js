*Laboratório Remoto de Física com Arduino e Node.js*

Este projeto consiste em uma plataforma de laboratório remoto de baixo custo, desenvolvida para o ensino de Física, permitindo a execução, monitoramento e 
coleta de dados experimentais em tempo real via web.
A arquitetura integra Arduino + Node.js + WebSockets, possibilitando que usuários interajam com um experimento físico real à distância.

*Objetivo e Contexto*

Este projeto foi desenvolvido como uma solução para viabilizar Atividades Práticas Experimentais (APE) em contextos com limitações de infraestrutura, 
ampliando o acesso a experimentação no ensino de Ciências.

*Arquitetura do Sistema*

O sistema é composto por três camadas principais:

1. Hardware (Arduino):
Sensores de temperatura DS18B20;
Comunicação serial com o servidor via a biblioteca SerialPort do ecossitema do node.js;
Execução do experimento físico - experimento de calorimetria.

Código do Arduino: Projeto_final.ino
