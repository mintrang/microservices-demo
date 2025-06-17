const express = require("express")
const router = express.Router()

const { getOrder, createOrder } = require('@/controllers/order')

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: List
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Thành công
 */

router.route('/')
  .get(getOrder)

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Tạo order mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - userId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 12345678
 *               userId:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: Tạo order thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Lỗi tạo order
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         productId:
 *           type: string
 *         userId: 
 *            type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */


router.post('/', createOrder)

module.exports = router