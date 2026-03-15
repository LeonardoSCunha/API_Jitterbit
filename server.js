import express from  'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const api_pedido = express()
api_pedido.use(express.json())
api_pedido.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

// Endpoint para criar um novo pedido
// Recebe orderId, value, creationDate e items no body
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

// Endpoint para atualizar um pedido existente
// Recebe orderId como parâmetro na URL
api_pedido.put('/order/:orderId', async (request, response) => {
    try {
        // Verifica se o pedido existe
        const existingOrder = await prisma.order.findUnique({
            where: { orderId: request.params.orderId }
        })

        if (!existingOrder) {
            return response.status(404).json({ error: 'Pedido não encontrado' })
        }
        
        // Atualiza o pedido
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

// Endpoint para listar todos os pedidos
api_pedido.get('/order/list', async(request, response) => {
    try {
        const orders = await prisma.order.findMany({
            include: { items: true }
        })
        response.status(200).json(orders)
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

// Endpoint para obter um pedido específico pelo número
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

// Endpoint para deletar um pedido
// Deleta os items relacionados antes de deletar o pedido
api_pedido.delete('/order/:numeroPedido', async(request, response) => {
    try {
        // Verifica se o pedido existe
        const existingOrder = await prisma.order.findUnique({
            where: { orderId: request.params.numeroPedido }
        })

        if (!existingOrder) {
            return response.status(404).json({ error: 'Pedido não encontrado' })
        }
        
        // Deleta os items relacionados primeiro
        await prisma.item.deleteMany({
            where: { orderId: existingOrder.id }
        })
        
        // Deleta o pedido
        await prisma.order.delete({
            where: {
                orderId: request.params.numeroPedido
            }
        })
        
        response.status(200).json({ message: 'Pedido deletado com sucesso' })
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

const PORT = process.env.PORT || 3000
api_pedido.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
