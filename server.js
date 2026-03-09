const express = require('express')

const api_pedido = express()
api_pedido.use(express.json())

const users = []

api_pedido.post('/user', (request, response) => {

    users.push(request.body)    

    response.send('Cadastrado')
    responses.status(201).json(request.body)
}
)

api_pedido.get('/user', (request, response) => {
    response.status(200).json(users)
})

api_pedido.listen(3000)
