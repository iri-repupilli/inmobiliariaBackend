import { Router } from 'express';
import {
  findAll,
  findOne,
  add,
  update,
  remove,
} from './inmueble.controller.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import {
  updateInmuebleSchema,
  addInmuebleSchema,
  deleteInmuebleSchema,
  findOneInmuebleSchema,
} from '../Schemas/inmueble.schema.js';
export const inmuebleRouter = Router();

inmuebleRouter.get('/', findAll);
inmuebleRouter.get('/:id', schemaValidation(findOneInmuebleSchema), findOne);
inmuebleRouter.post('/', schemaValidation(addInmuebleSchema), add);
inmuebleRouter.put('/:id', schemaValidation(updateInmuebleSchema), update);
inmuebleRouter.delete('/:id', schemaValidation(deleteInmuebleSchema), remove);

//SCHEMA SWAGGER
/**
 * @swagger
 * components:
 *   schemas:
 *     InmuebleBase:
 *       type: object
 *       required:
 *         - tipo
 *         - mtrs
 *         - descripcion
 *         - precioDolar
 *         - direccionCalle
 *         - direccionNumero
 *         - fechaConstruccion
 *         - fechaPublicacion
 *         - propietarioId
 *         - tipoServicioId
 *         - localidadId
 *       properties:
 *         tipo:
 *           type: string
 *           enum: [casa, departamento, cochera, terreno]
 *         mtrs:
 *           type: number
 *         descripcion:
 *           type: string
 *         precioDolar:
 *           type: number
 *         direccionCalle:
 *           type: string
 *         direccionNumero:
 *           type: number
 *         fechaConstruccion:
 *           type: string
 *           format: date
 *         fechaPublicacion:
 *           type: string
 *           format: date
 *         requisitos:
 *           type: string
 *           nullable: true
 *         propietarioId:
 *           type: integer
 *         tipoServicioId:
 *           type: integer
 *         localidadId:
 *           type: integer
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Casa:
 *       allOf:
 *         - $ref: '#/components/schemas/InmuebleBase'
 *         - type: object
 *           required:
 *             - cantAmbientes
 *             - cantBanios
 *             - patio
 *             - pileta
 *           properties:
 *             cantAmbientes:
 *               type: integer
 *             cantBanios:
 *               type: integer
 *             patio:
 *               type: boolean
 *             pileta:
 *               type: boolean
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Departamento:
 *       allOf:
 *         - $ref: '#/components/schemas/InmuebleBase'
 *         - type: object
 *           required:
 *             - piso
 *             - depto
 *             - precioExpensas
 *             - cantAmbientes
 *             - cantBanios
 *             - balcon
 *           properties:
 *             piso:
 *               type: integer
 *             depto:
 *               type: string
 *               nullable: true
 *             precioExpensas:
 *               type: number
 *             cantAmbientes:
 *               type: integer
 *             cantBanios:
 *               type: integer
 *             balcon:
 *               type: boolean
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cochera:
 *       allOf:
 *         - $ref: '#/components/schemas/InmuebleBase'
 *         - type: object
 *           required:
 *             - techo
 *             - tipoVehiculo
 *           properties:
 *             techo:
 *               type: boolean
 *             tipoVehiculo:
 *               type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Terreno:
 *       allOf:
 *         - $ref: '#/components/schemas/InmuebleBase'
 *         - type: object
 *           required:
 *             - nroParcela
 *             - zonificacion
 *           properties:
 *             nroParcela:
 *               type: integer
 *             zonificacion:
 *               type: string
 *               nullable: true
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Inmueble:
 *       oneOf:
 *         - $ref: '#/components/schemas/Casa'
 *         - $ref: '#/components/schemas/Departamento'
 *         - $ref: '#/components/schemas/Cochera'
 *         - $ref: '#/components/schemas/Terreno'
 *       discriminator:
 *         propertyName: tipo
 *         mapping:
 *           casa: '#/components/schemas/Casa'
 *           departamento: '#/components/schemas/Departamento'
 *           cochera: '#/components/schemas/Cochera'
 *           terreno: '#/components/schemas/Terreno'
 */
//TAG SWAGGER
/**
 * @swagger
 * tags:
 *   name: Inmuebles
 *   description: Inmuebles de la inmobiliaria
 */

// GET ALL SWAGGER
/**
 * @swagger
 * /api/inmuebles:
 *  get:
 *    summary: Return the list of all the Inmuebles
 *    tags: [Inmuebles]
 *    responses:
 *      200:
 *        description: The list of the Inmuebles
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Inmueble'
 * */

// GET ONE SWAGGER
/**
 * @swagger
 * /api/inmuebles/{id}:
 *  get:
 *    summary: Return a Inmueble
 *    tags: [Inmuebles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Inmueble id
 *    responses:
 *      200:
 *        description: Inmueble found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Inmueble'
 *      404:
 *        description: Inmueble not found
 * */
//POST SWAGGER
/**
 * @swagger
 * /api/inmuebles:
 *   post:
 *     summary: Create a Inmueble
 *     tags: [Inmuebles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inmueble'
 *     responses:
 *       201:
 *         description: Inmueble created
 *       500:
 *        description: Some server error
 */

// DELETE SWAGGER
/**
 * @swagger
 * /api/inmuebles/{id}:
 *   delete:
 *     summary: Delete a Inmueble
 *     tags: [Inmuebles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Inmueble id
 *     responses:
 *       200:
 *         description: Inmueble deleted
 *       404:
 *         description: Inmueble not found
 */
// PUT SWAGGER
/**
 * @swagger
 * /api/inmuebles/{id}:
 *   put:
 *     summary: Update a Inmueble
 *     tags: [Inmuebles]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          required: true
 *          description: Inmueble id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inmueble'
 *     responses:
 *       200:
 *         description: Inmueble updated
 *       500:
 *        description: Some server error
 */
