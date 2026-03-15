# API de Gerenciamento de Pedidos
https://apiexample-leonardocunha.netlify.app

API REST desenvolvida em Node.js com Express e Prisma para gerenciar pedidos.

## Tecnologias Utilizadas

- Node.js v20.20.1
- Express.js
- Prisma ORM
- MongoDB

## Endpoints Implementados


- **POST** `/order` - Criar novo pedido
- **GET** `/order/:numeroPedido` - Obter pedido específico por número
- **GET** `/order/list` - Listar todos os pedidos
- **PUT** `/order/:orderId` - Atualizar pedido existente
- **DELETE** `/order/:numeroPedido` - Deletar pedido

## Estrutura de Dados

### Criar Pedido (POST /order)
```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

## Funcionalidades Implementadas

 - CRUD completo de pedidos  
 - Relacionamento entre Order e Items  
 - Tratamento de erros robusto com try/catch  
 - Validação de pedidos não encontrados (404)  
 - Status HTTP adequados (200, 201, 404, 500)  
 - Data de criação automática com @default(now())  

## Como Executar

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Crie um arquivo .env na raiz do projeto com:
# DATABASE_URL="sua_url_do_mongodb_aqui"

# Configurar banco de dados
npx prisma generate
npx prisma db push

# Executar servidor
node server.js
```

Servidor rodando em: `http://localhost:3000`
