import { Router } from 'express';
import { findAll, findOne, add, update, remove } from './visita.controller.js';
import {
  addVisitaSchema,
  updateVisitaSchema,
  deleteVisitaSchema,
  findOneVisitaSchema,
} from '../Schemas/visita.schema.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import { authMiddleware } from '../MiddleWares/auth.middleware.js';

export const visitaRouter = Router();

visitaRouter.get('/', authMiddleware, findAll);
visitaRouter.get(
  '/:id',
  authMiddleware,
  schemaValidation(findOneVisitaSchema),
  findOne,
);
visitaRouter.post('/', authMiddleware, schemaValidation(addVisitaSchema), add);
visitaRouter.put(
  '/:id',
  authMiddleware,
  schemaValidation(updateVisitaSchema),
  update,
);
visitaRouter.delete(
  '/:id',
  authMiddleware,
  schemaValidation(deleteVisitaSchema),
  remove,
);

//SCHEMA SWAGGER
/**
 * @swagger
 * components:
 *  schemas:
 *    Visita:
 *      type: object
 *      required:
 *        - id
 *        - inmueble
 *        - usuario
 *        - datevisita
 *        - telefonoContacto
 *        - descriptionvisita
 *        - estado
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the Visita
 *        inmueble:
 *          type: integer
 *          description: The id of the Inmueble
 *        usuario:
 *          type: integer
 *          description: The id of the Usuario
 *        datevisita:
 *          type: string
 *          format: date
 *          description: The date of the Visita
 *        telefonoContacto:
 *          type: string
 *          description: The contact phone number of user for the Visita
 *        descriptionvisita:
 *          type: string
 *          description: The description of the Visita
 *        estado:
 *          type: string
 *          description: The status [Pendiente / Rechazada / Aceptada] of the Visita
 *      example:
 *        id: 1
 *        inmueble: 2
 *        usuario: 3
 *        datevisita: '2024-10-15'
 *        telefonoContacto: '123-456-7890'
 *        descriptionvisita: 'Me interesaria acordar una visita entre las 10 y las 12 hs.'
 *        estado: 'Pendiente'
 * */

//TAG SWAGGER
/**
 * @swagger
 * tags:
 *   name: Visitas
 *   description: Gestión de visitas a inmuebles
 */

// GET ALL SWAGGER
/**
 * @swagger
 * /api/visitas:
 *   get:
 *     summary: Return the list of all the Visitas
 *     description: Endpoint protegido. Requiere autenticacion
 *     tags: [Visitas]
 *     security:
 *      - cookieAuth: []
 *     responses:
 *       200:
 *         description: The list of the Visitas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Visita'
 *       401:
 *        description: Unauthorizate
 */

// GET ONE SWAGGER
/**
 * @swagger
 * /api/visitas/{id}:
 *   get:
 *     summary: Return a Visita
 *     description: Endpoint protegido. Requiere autenticacion
 *     tags: [Visitas]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Visita id
 *     responses:
 *       200:
 *         description: Visita found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visita'
 *       400:
 *        description: Param validation error
 *       401:
 *        description: Unauthorizate
 *       404:
 *         description: Visita not found
 */

//POST SWAGGER
/**
 * @swagger
 * /api/visitas:
 *   post:
 *    summary: Create a new Visita
 *    description: Endpoint protegido. Requiere autenticacion
 *    tags: [Visitas]
 *    security:
 *      - cookieAuth: []
 *    requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Visita'
 *    responses:
 *     201:
 *      description: new Visita created
 *     400:
 *      description: Body validation error
 *     401:
 *      description: Unauthorizate
 *     500:
 *      description: Some server error
 */
// DELETE SWAGGER
/**
 * @swagger
 * /api/visitas/{id}:
 *   delete:
 *     summary: Delete a Visita
 *     description: Endpoint protegido. Requiere autenticacion
 *     tags: [Visitas]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Visita id
 *     responses:
 *       200:
 *         description: Visita deleted
 *       400:
 *        description: Param validation error
 *       401:
 *        description: Unauthorizate
 *       404:
 *         description: Visita not found
 */
// UPDATE SWAGGER
/**
 * @swagger
 * /api/visitas/{id}:
 *   put:
 *     summary: Update a Visita
 *     description: Endpoint protegido. Requiere autenticacion
 *     tags: [Visitas]
 *     security:
 *      - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Visita id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Visita'
 *     responses:
 *       200:
 *        description: Visita updated
 *       400:
 *        description: Param validation error
 *       401:
 *        description: Unauthorizate
 *       404:
 *         description: Visita not found
 */
