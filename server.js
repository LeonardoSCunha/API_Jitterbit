const express = require('express')

const api_pedido = express()

api_pedido.get('/user', (request, response) => {
    return response.send({message: 'ok'})
})

api_pedido.listen(3000)
