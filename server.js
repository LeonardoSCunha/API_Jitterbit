const express = require('express')

const api_pedido = express()
api_pedido.use(express.json())

const users = []

api_pedido.post('/user', (request, response) => {

    console.log(request)

    response.send('Cadastrado')
}
)

api_pedido.get('/user', (request, response) => {
    return response.send({message: 'ok'})
})

api_pedido.listen(3000)
