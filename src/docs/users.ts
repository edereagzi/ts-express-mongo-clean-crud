/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users.
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update a user's username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user was updated
 *       400:
 *         description: Username is required
 *       404:
 *         description: User not found
 */
