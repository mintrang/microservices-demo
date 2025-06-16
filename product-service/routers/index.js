const express = require("express")
const router = express.Router()

const { getProduct, createProduct } = require('@/controllers/product')

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: List
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Thành công
 */

router.route('/')
  .get(getProduct)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Tạo product mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - image
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Trang
 *               image:
 *                 type: file
 *                 example: trang@example.com
 *               userId:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: Tạo product thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Lỗi tạo product
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         userId: 
 *            type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */


router.post('/', createProduct)

module.exports = router