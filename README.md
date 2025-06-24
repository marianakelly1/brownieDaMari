# 🍫 Brownie da Mari

O projeto Brownie da Mari é uma aplicaçaõ web para venda de personalizada de brownies. O usuário pode escolher  um tipo de brownie, selecionar recheios, visualizar o pedido com preço total e concluir a compra com CPF. O sistema armazena também o histórico de pedidos e apresenta um resumo completo para o cliente.

## Design do projeto

![WhatsApp Image 2025-06-24 at 18 07 16](https://github.com/user-attachments/assets/27b9a2b9-bb16-4fed-8ff6-bdce22b7769b)

![WhatsApp Image 2025-06-24 at 18 07 18](https://github.com/user-attachments/assets/9d229171-3bb2-4473-890e-d43d6307c611)

![WhatsApp Image 2025-06-24 at 18 07 19](https://github.com/user-attachments/assets/8c4a9ceb-81ba-4d67-9717-7e2f47701a6c)


## Sobre o Projeto

Este projeto foi desenvolvido como parte da disciplina de Programação Web I no Instituto Federal do Ceará (IFCE), com o objetivo de aplicar conceitos de front-end, back-end e banco de dados em um sistema real de vendas.

O sistema permite que o usuário escolha brownies, selecione recheios, visualize um resumo do pedido, finalize com pagamento e veja o histórico completo de compras.



## Estrutura do Projeto


 index.html          # Estrutura HTML principal do site
 style.css           # Estilos visuais (cores, botões, layout responsivo)
 script.js           # Lógica do front-end com consumo da API e carrinho
 server.js           # Inicializa e configura o servidor Express
 controller.js       # Controla as requisições e chama o repositório
 repository.js       # Lógica SQL para acessar e manipular o banco
 database.js         # Conexão com o PostgreSQL
 imgs/               # Contém logo



## Funcionalidades Principais

### Front-end (HTML/CSS/JS)

- Visual amigável com design responsivo
- Escolha de brownie e múltiplos recheios
- Campo de CPF com validação
- Carrinho com cálculo automático do total
- Resumo completo do pedido antes do pagamento
- Histórico de todos os pedidos realizados
- Alertas interativos com **SweetAlert2**


### Back-end (Node.js + Express)

- API RESTful para interação com o banco
- Endpoints:
  - GET /brownies → Lista todos os brownies
  - GET /brownie/:id → Retorna brownie e seus recheios
  - POST /order → Registra o pedido com os itens e total
  - GET /history → Lista histórico completo de pedidos
  - POST /payments → Inserção avulsa (não usada diretamente)


## Banco de Dados (PostgreSQL/pgAdmin)

### Tabelas principais:
- brownies(id, nome, preco)
- recheios(id, id_brownie, nome, preco)
- pedidos(id, cpf, data_pagamento, preco_total)
- tabela_pagamentos(id, id_brownie, cpf, data_pagamento, descricao, preco)
- itens_pedido(id, id_pedido, id_brownie, descricao, preco)

### String de conexão:

postgresql://postgres:123@localhost:5432/brownieDaMari


## Como Executar o Projeto

### Pré-requisitos

- Node.js
- PostgreSQL (pgAdmin)
- Navegador Web
- Visual Studio Code 

### Passos

1. Clone o repositório ou salve os arquivos.
2. No terminal, instale as dependências:
   
  - npm init -y
  - npm i express
  - npm i pg
  - npm i cors
   
3. Crie o banco de dados e as tabelas conforme o modelo acima.
4. Ligue o servidor(no terminal), pasta Back-end:
   
  - npm run dev
   
5. Abra o arquivo index.html no navegador.
6. Interaja com o sistema: escolha brownies, adicione ao carrinho, pague e veja o histórico.


## Possíveis Melhorias Futuras

- Criar uma area para o usuario se cadastrar e acompanhar seus pedidos
- Enviar confirmação do pedido
- Upload de imagem para cada brownie
- Integração com pagamentos reais (PIX, MercadoPago, etc.)
- Cupom de desconto e promoções
- Pop-up de carrinho ainda pode ser melhorado com modal


## Aprendizados

- Criação de APIs REST com Express
- Manipulação de dados no PostgreSQL
- Integração entre front-end e back-end com fetch
- Lógica de carrinho com atualização dinâmica 
- Organização de código em camadas (controller, repository, banco)


## Autoria

Desenvolvido por Mariana Kelly
Projeto educacional do Instituto Federal do Ceará  
Disciplina: Programação Web I
