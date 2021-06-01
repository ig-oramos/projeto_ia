# Projeto de Inteligência Artificial (IA)
Este repositório trata-se de um projeto simples que faz a comunicação com o IBM Watson a fim de agendar uma consulta médica.
Logo, é um atendente virtual que funciona como um chatbot.
Além do agendamento de consulta, o usuário também pode receber informações sobre o Corona Vírus (Covid-19), como por exemplo,
dicas de como se proteger, boas práticas, higienização, entre outras.

## Funcionamento
Internamente, foi trabalhada a construção de um Web Service que é responsável pela comunicação entre o cliente e o servidor.
O cliente aqui é, na verdade, o back-end que se comunica com o IBM Watson, visando o agendamento de uma consulta ou a resposta
de dúvidas sobre o Covid-19.
Assim, temos uma API que utiliza o padrão REST, produzida para o recebimento de requisições com mensagens de texto para o Watson
e, com isso, o retorno de respostas do mesmo para o emissor.

## Tecnologias
Algumas tecnologias utilizadas foram:
- [![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white&link=https://nodejs.org/en/)](https://nodejs.org/en/)
[![TypeScript badge](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white&link=https://reactnative.dev)](https://reactnative.dev)
- IBM Watson
- Módulos (TypeORM, Express, IBM-Watson, etc.)
