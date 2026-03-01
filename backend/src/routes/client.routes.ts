import { Router } from 'express';
import { ClientController } from '../controllers/client.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const route = Router();
const controllerClient = new ClientController();

route.use(authMiddleware);

/**
 * @openapi
 * /clients:
 *   post:
 *     summary: Criar cliente
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               phone:
 *                 type: string
 *                 example: "(11) 99999-9999"
 *     responses:
 *       201:
 *         description: Cliente criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       400:
 *         description: Campos obrigatórios ausentes
 *       401:
 *         description: Não autorizado
 */
route.post('/clients', (req, res) => controllerClient.create(req, res));

/**
 * @openapi
 * /clients:
 *   get:
 *     summary: Listar clientes
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       401:
 *         description: Não autorizado
 */
route.get('/clients', (req, res) => controllerClient.list(req, res));

/**
 * @openapi
 * /clients/{id}:
 *   get:
 *     summary: Buscar cliente por ID
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente não encontrado
 *       401:
 *         description: Não autorizado
 */
route.get('/clients/:id', (req, res) => controllerClient.get(req, res));

/**
 * @openapi
 * /clients/{id}:
 *   put:
 *     summary: Atualizar cliente
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               phone:
 *                 type: string
 *                 example: "(11) 99999-9999"
 *     responses:
 *       200:
 *         description: Cliente atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       404:
 *         description: Cliente não encontrado
 *       401:
 *         description: Não autorizado
 */
route.put('/clients/:id', (req, res) => controllerClient.update(req, res));

/**
 * @openapi
 * /clients/{id}:
 *   delete:
 *     summary: Excluir cliente
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Cliente excluído
 *       404:
 *         description: Cliente não encontrado
 *       401:
 *         description: Não autorizado
 */
route.delete('/clients/:id', (req, res) => controllerClient.delete(req, res));

export default route;