import express from  'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const api_pedido = express()
api_pedido.use(express.json())

api_pedido.post('/order', async (request, response) => {

 const order = await prisma.order.create({
        data: {
            orderId: request.body.orderId,
                value: request.body.value,
                creationDate: request.body.creationDate ? new Date(request.body.creationDate) : new Date(),
                items: {
                    create: request.body.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
        },
        include: { items: true } 
    })
    response.status(201).json(request.order)
}
)

api_pedido.get('/order/list', async(request, response) => {

    const orders = await prisma.order.findMany()

    response.status(200).json(orders)
})

api_pedido.get('/order/prod/:productId', async(request, response) => {

    const orders = await prisma.order.findUnique({
        where: {
            orderId: request.params.productId
        }
        include: { items: true }
    })

    response.status(200).json(orders)
})

api_pedido.listen(3000)
