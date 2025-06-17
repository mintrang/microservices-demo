const express = require("express");
const router = express.Router();
const { getUser, createUser } = require('@/controllers/user');

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Thành công
 *   post:
 *     summary: Tạo user mới
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo user thành công
 *       400:
 *         description: Lỗi tạo user
 */

router.route('/')
  .get(getUser)
  .post(createUser);  // ✅ Gộp luôn tại đây

module.exports = router;
