import { Router } from 'express';
import { findOne, remove } from './imagen.controller.js';
import { deleteImagen } from '../Schemas/imagen.schema.js';
import { schemaValidation } from '../MiddleWares/schemaValidator.middleware.js';
import { adminMiddleware } from '../MiddleWares/admin.middleware.js';
import { authMiddleware } from '../MiddleWares/auth.middleware.js';

export const imagenRouter = Router();

//imagenRouter.get('/', findAll);
imagenRouter.get('/:id', findOne);
// imagenRouter.put('/:id', schemaValidation(updateImagen), update); CREO QUE NO LO NECESITAMOS
imagenRouter.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  schemaValidation(deleteImagen),
  remove,
);

//SCHEMA SWAGGER
/**
 * @swagger
 * components:
 *   schemas:
 *     Imagen:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         url:
 *           type: string
 *           example: https://res.cloudinary.com/demo/image/upload/v123/inmobiliaria.jpg
 *         public_id:
 *           type: string
 *           example: inmobiliaria/inmuebles/123456-foto.jpg
 *         inmueble:
 *           type: integer
 *           example: 1
 */

//TAG SWAGGER
/**
 * @swagger
 * tags:
 *   name: Imagenes
 *   description: Imagenes de los inmuebles
 */

//POST IMAGEN SWAGGER
/**
 * @swagger
 * /api/inmuebles/{id}/imagen:
 *   post:
 *     summary: Upload an image for an inmueble
 *     description: Endpoint protegido. Requiere autenticacion y rol administrador.
 *     tags: [Imagenes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del inmueble
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Imagen subida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Imagen'
 *       400:
 *         description: No se envió ningún archivo
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Acceso denegado (solo admin)
 *       404:
 *         description: Inmueble no encontrado
 *       500:
 *         description: Error interno del servidor
 */

//GET ALL IMAGENES BY INMUEBLE SWAGGER
/**
 * @swagger
 * /api/inmuebles/{id}/imagenes:
 *   get:
 *     summary: Get all images of an inmueble
 *     description: Devuelve todas las imágenes asociadas a un inmueble.
 *     tags: [Imagenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del inmueble
 *     responses:
 *       200:
 *         description: Lista de imágenes del inmueble
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Imagen'
 *       404:
 *         description: Inmueble no encontrado
 *       500:
 *         description: Error interno del servidor
 */

//GET ONE SWAGGER
/**
 * @swagger
 * /api/imagenes/{id}:
 *   get:
 *     summary: Get one image by ID
 *     tags: [Imagenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la imagen
 *     responses:
 *       200:
 *         description: Imagen encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Imagen'
 *       404:
 *         description: Imagen no encontrada
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/imagenes/{id}:
 *   delete:
 *     summary: Delete an image
 *     description: Elimina una imagen (admin) y la borra de Cloudinary.
 *     tags: [Imagenes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la imagen
 *     responses:
 *       200:
 *         description: Imagen eliminada correctamente
 *       401:
 *         description: No autenticado
 *       403:
 *         description: Solo administradores
 *       404:
 *         description: Imagen no encontrada
 *       500:
 *         description: Error interno
 */
