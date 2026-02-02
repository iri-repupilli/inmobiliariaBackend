import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './consulta.controller.js';
import {
  findOneConsulta,
  addConsulta,
  updateConsulta,
  deleteConsulta,
} from '../Schemas/consulta.schema.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import { authMiddleware } from '../MiddleWares/auth.middleware.js';

export const consultaRouter = Router();

consultaRouter.get('/', findAll);
consultaRouter.get('/:id', schemaValidation(findOneConsulta), findOne);
consultaRouter.post('/', authMiddleware, schemaValidation(addConsulta), add);
consultaRouter.put(
  '/:id',
  authMiddleware,
  schemaValidation(updateConsulta),
  update,
);
consultaRouter.delete(
  '/:id',
  authMiddleware,
  schemaValidation(deleteConsulta),
  remove,
);

//SCHEMA SWAGGER
/**
 * @swagger
 * components:
 *  schemas:
 *    Consulta:
 *      type: object
 *      required:
 *        - id
 *        - descripcion
 *        - inmueble
 *        - usuario
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the Consulta
 *        descripcion:
 *          type: string
 *          description: The description of the Consulta
 *        inmueble:
 *          type: integer
 *          description: The id of the Inmueble related to the Consulta
 *        usuario:
 *          type: integer
 *          description: The id of the Usuario who made the Consulta
 *        respuesta:
 *          type: string
 *          description: The response to the Consulta
 *      example:
 *        id: 1
 *        descripcion: '¿En qué estado se encuentran los baños del inmueble?'
 *        inmueble: 2
 *        usuario: 3
 *        respuesta: 'Los baños están en excelente estado y han sido renovados recientemente.'
 *  */

//TAG SWAGGER
/**
 * @swagger
 * tags:
 *   name: Consultas
 *   description: Consultas realizadas por los usuarios sobre los inmuebles
 */

// GET ALL SWAGGER
/**
 * @swagger
 * /api/consultas:
 *   get:
 *     summary: Return the list of all the Consultas
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: The list of the Consultas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Consulta'
 */

// GET ONE SWAGGER
/**
 * @swagger
 * /api/consultas/{id}:
 *   get:
 *     summary: Return a Consulta
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Consulta id
 *     responses:
 *       200:
 *         description: Consulta found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consulta'
 *       400:
 *        description: Param validation error
 *       404:
 *         description: Consulta not found
 */
//POST SWAGGER
/**
 * @swagger
 * /api/consultas:
 *   post:
 *    summary: Create a new Consulta
 *    description: Endpoint protegido. Requiere autenticación.
 *    tags: [Consultas]
 *    security:
 *      - cookieAuth: []
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Consulta'
 *    responses:
 *     201:
 *      description: new Consulta created
 *     400:
 *      description: Body validation error
 *     401:
 *      description: Unauthorized
 *     500:
 *      description: Some server error
 */

// DELETE SWAGGER
/**
 * @swagger
 * /api/consultas/{id}:
 *   delete:
 *     summary: Delete a Consulta
 *     description: Endpoint protegido. Requiere autenticación.
 *     tags: [Consultas]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Consulta id
 *     responses:
 *       200:
 *         description: Consulta deleted
 *       400:
 *        description: Param validation error
 *       401:
 *        description: Unauthorized
 *       404:
 *         description: Consulta not found
 */
// UPDATE SWAGGER
/**
 * @swagger
 * /api/consultas/{id}:
 *   put:
 *     summary: Update a Consulta
 *     description: Endpoint protegido. Requiere autenticación.
 *     tags: [Consultas]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Consulta id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Consulta'
 *     responses:
 *       200:
 *         description: Consulta updated
 *       400:
 *        description: Body validation error
 *       401:
 *        description: Unauthorized
 *       404:
 *         description: Consulta not found
 */
