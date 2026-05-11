**Laboratório Remoto para o ensino de Física (Ciências) com Arduino e Node.js**
Plataforma web para realização de experimentos físicos reais à distância, com coleta e visualização de dados em tempo real — desenvolvida como produto educacional de Mestrado Profissional (IFSP).

<img width="3264" height="1468" alt="1762182856352" src="https://github.com/user-attachments/assets/6a385c0f-2858-4709-8e22-ac5967156bcd" />


**Sobre o Projeto**

O ensino de Física no Brasil enfrenta dois obstáculos persistentes: a carência de infraestrutura laboratorial e a predominância de práticas experimentais de caráter verificacional, que reduzem o experimento à mera confirmação de teorias já ensinadas.

Este projeto responde a esse problema com um Laboratório Remoto de baixo custo, construído com Arduino e Node.js, que permite a realização de experimentos físicos reais via web. A atividade experimental foi estruturada segundo o Ciclo de Modelagem de David Hestenes, deslocando o foco da verificação para a construção e validação de modelos pelos próprios estudantes.

Desenvolvido como produto educacional do Mestrado Profissional em Ensino de Ciências e Matemática — IFSP.

---

**Arquitetura do Sistema**

O sistema é composto por três camadas:

*1. Hardware (Arduino)*

- Sensores de temperatura DS18B20
- Comunicação serial com o servidor via biblioteca SerialPort
- Experimento de calorimetria: coleta contínua de dados térmicos

*2. Backend (Node.js)*

- Express para gerenciamento de rotas
- Socket.IO para comunicação em tempo real
- Controle de acesso ao experimento (apenas um usuário por vez)

*3. Frontend (Interface Web)*

- Controle remoto do experimento (ligar/desligar)
- Visualização dos dados em tempo real via gráficos
- Exportação dos dados coletados em .csv

---

**Funcionamento do Experimento**

Ao iniciar, o sistema executa três fases automaticamente:

- Aquecimento (30s)
- Estabilização dos sensores (20s)
- Coleta de dados em tempo real (10 minutos)

Os dados são transmitidos continuamente via WebSocket e podem ser baixados ao final da sessão.

---

**Como Executar**

Pré-requisitos:
- Node.js >= 16
- Arduino com sensores DS18B20 conectado via USB

```bash
npm install
node index.js
```

Acesse: http://localhost:3389

Configuração da porta serial no arquivo `index.js`:

```js
// Windows
const port = new SerialPort({ path: 'COM3', baudRate: 9600 });

// Linux / Mac
const port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 });
```

---

**Limitações**

- Apenas um usuário simultâneo por vez
- Requer Arduino físico conectado localmente
- Sem autenticação de usuários
- Sem persistência de dados em banco de dados

---

**Roadmap**

- [ ] Autenticação de usuários
- [ ] Fila de acesso para múltiplos usuários
- [ ] Persistência de dados (PostgreSQL)
- [ ] Deploy em nuvem (IoT)
- [ ] Dashboard com análise histórica
- [ ] Integração com plataformas educacionais (Moodle, Google Classroom)

**Autor**

Leandro Galdino de Oliveira

Bacharel em Ciência e Tecnologia (UFABC) · Engenheiro Aeroespacial (UFABC) · Mestre em Ensino de Ciências e Matemática (IFSP)
