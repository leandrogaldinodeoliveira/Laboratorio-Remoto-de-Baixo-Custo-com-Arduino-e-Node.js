**Laboratório Remoto de Física com Arduino e Node.js**

Este projeto consiste em uma plataforma de laboratório remoto de baixo custo, desenvolvida para o ensino de Física, permitindo a execução, monitoramento e 
coleta de dados experimentais em tempo real via web.
A arquitetura integra Arduino + Node.js + WebSockets, possibilitando que usuários interajam com um experimento físico real à distância.

**Objetivo e Contexto**

Este projeto foi desenvolvido como uma solução para viabilizar Atividades Práticas Experimentais (APE) em contextos com limitações de infraestrutura, 
ampliando o acesso a experimentação no ensino de Ciências.

**Arquitetura do Sistema**

O sistema é composto por três camadas principais:

*1. Hardware (Arduino):*

- Sensores de temperatura DS18B20;
- Comunicação serial com o servidor via a biblioteca SerialPort do ecossitema do node.js;
- Execução do experimento físico - experimento de calorimetria.

Código do Arduino: **Projeto_final.ino**

*2. Backend (Node.js)*

Responsável por:

- Comunicação com a porta serial;
- Intermediação entre Arduino e interface web;
- Controle de acesso ao experimento (concorrência);

**Arquivo principal:**

*Principais tecnologias:*

- Express;
- Socket.IO;
- SerialPort;

Dependências:

*3. Frontend (Interface Web)*

Interface interativa para o usuário:

- Controle do experimento (ligar/desligar);
- Visualização em tempo real dos dados;
- Download dos dados coletados (CSV);

**Interface:**

*Funcionamento do Sistema*

O usuário acessa a interface web

Ao iniciar:
- Sistema entra em fase de aquecimento (30s);
- Estabilização dos sensores (20s);
- Inicia-se a coleta de dados (10 minutos);
- Dados são transmitidos em tempo real via WebSocket;
  

Usuário pode:
- Visualizar gráficos;
- Baixar dados experimentais;
- Sistema encerra automaticamente ou manualmente;
- Comunicação em Tempo Real.

A comunicação ocorre via Socket.IO, permitindo:

- Envio de comandos (Ligar / Desligar);
- Recebimento contínuo de dados do Arduino;
- Atualização dinâmica da interface;
- Controle de Acesso.

O sistema implementa um mecanismo simples de exclusividade, ou seja, apenas um usuário pode utiliar o experimento por vez e
novos acessos são bloqueados enquanto o experimento estiver em uso:

let siteOcupado = false;

Apenas um usuário pode utilizar o experimento por vez

Estrutura dos Dados

Os dados recebidos seguem o formato:

sensor1, sensor2

Tratamento realizado no backend:

dados = data.split(',');

E enviados ao frontend para plotagem em tempo real.

**Exportação de Dados**

Os dados coletados podem ser exportados em formato .csv, contendo:

- Número da leitura
- Temperatura do sensor 1
- Temperatura do sensor 2

  
**Como Executar o Projeto**

*Pré-requisitos*

- Node.js (>= 16)
- Arduino conectado via USB
- Porta serial configurada corretamente

*1. Instalar dependências:*

npm install

*2. Configurar porta serial:*

No arquivo index.js, ajustar:

const port = new SerialPort({ path: 'COM3', baudRate: 9600 });

*3. Executar o servidor*

node index.js

*4. Acessar no navegador*

http://localhost:3389

**Potencial Educacional**

Este laboratório remoto possibilita:

- Realização de experimentos reais à distância
- Integração entre teoria e prática
- Desenvolvimento de habilidades investigativas
- Uso em formação inicial e continuada de professores

*Limitações*

Controle de acesso não escalável (apenas 1 usuário)
Dependência de conexão serial local
Ausência de autenticação de usuários

*Possíveis Melhorias*

Sistema de agendamento de uso
Multiusuários com fila de acesso
Deploy em nuvem (IoT)
Dashboard com análise avançada de dados
Integração com plataformas educacionais
 
**Contexto Acadêmico**

Este projeto foi desenvolvido no âmbito de uma pesquisa em Ensino de Física, com foco em:

- Atividades experimentais mediadas por tecnologia;
- Laboratórios remotos de baixo custo;
- Formação de professores.

**Autor**

**Leandro Galdino de Oliveira**

Bacharel em Ciência e Tecnologia (UFABC), 
Engenheiro Aeroespacial (UFABC) e
Mestre em Ensino de Ciências e Matemática (IFSP).
