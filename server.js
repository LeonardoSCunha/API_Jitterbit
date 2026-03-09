import express from  'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const api_pedido = express()
api_pedido.use(express.json())

const users = []

api_pedido.post('/order', async (request, response) => {

 await prisma.order.create({
        data: {
            Value: request.body.Value,
            creationDate: request.body.creationDate
        } 
    })
    response.status(201).json(request.body)
}
)

api_pedido.get('/order', (request, response) => {
    response.status(200).json(users)
})

api_pedido.listen(3000)
