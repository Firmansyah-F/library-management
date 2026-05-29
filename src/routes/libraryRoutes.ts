import express from "express";
import {
  borrowBook,
  returnBook,
  getBooks,
  getMembers,
} from "../controllers/libraryController";

import { validate } from "../middleware/validate";
import { borrowSchema, returnSchema } from "../validator/libraryValidator";

const router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Success get books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       availableStock:
 *                         type: number
 */
router.get("/books", getBooks);

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Success get members
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                       name:
 *                         type: string
 *                       borrowedCount:
 *                         type: number
 *                       penaltyUntil:
 *                         type: string
 *                         nullable: true
 */
router.get("/members", getMembers);

/**
 * @swagger
 * /api/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [memberCode, bookCode]
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: M001
 *               bookCode:
 *                 type: string
 *                 example: JK-45
 *     responses:
 *       200:
 *         description: Borrow success
 *       400:
 *         description: Validation or business error
 *       404:
 *         description: Member or book not found
 */
router.post("/borrow", validate(borrowSchema), borrowBook);

/**
 * @swagger
 * /api/return:
 *   post:
 *     summary: Return a book
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [memberCode, bookCode]
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: M001
 *               bookCode:
 *                 type: string
 *                 example: JK-45
 *     responses:
 *       200:
 *         description: Return success
 *       400:
 *         description: Validation or business error
 */
router.post("/return", validate(returnSchema), returnBook);

export default router;
