import express from  'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const api_pedido = express()
api_pedido.use(express.json())

api_pedido.post('/order', async (request, response) => {
    try {
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
        response.status(201).json(order)
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
)

api_pedido.put('/order/:orderId', async (request, response) => {
    try {
        const existingOrder = await prisma.order.findUnique({
    where: { orderId: request.params.orderId }
})

if (!existingOrder) {
    return response.status(404).json({ error: 'Pedido não encontrado' })
}
        const order = await prisma.order.update({
            where: {
                orderId: request.params.orderId
            },
            data: {
                value: request.body.value,
                creationDate: request.body.creationDate ? new Date(request.body.creationDate) : new Date(),
            },
            include: { items: true } 
        })
        response.status(200).json(order)
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
)

api_pedido.get('/order/list', async(request, response) => {
    try {
        const orders = await prisma.order.findMany()
        response.status(200).json(orders)
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

api_pedido.get('/order/:numeroPedido', async(request, response) => {
    try {
        const orders = await prisma.order.findUnique({
            where: {
                orderId: request.params.numeroPedido
            },
            include: { items: true }
        })
        
        if (!orders) {
            return response.status(404).json({ error: 'Pedido não encontrado' })
        }
        
        response.status(200).json(orders)
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

api_pedido.listen(3000)
