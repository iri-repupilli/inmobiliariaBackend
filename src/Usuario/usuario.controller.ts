import { Request, Response } from 'express';
import { Usuario } from './usuario.entity.js';
import jwt from 'jsonwebtoken';
import { RequestContext } from '@mikro-orm/core';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}
async function forgotPassword(req: Request, res: Response) {
  try {
    const em = RequestContext.getEntityManager()!;
    const { email } = req.body;
    const usuario = await em.findOne(Usuario, { email });

    if (usuario) {
      const token = crypto.randomBytes(32).toString('hex');
      usuario.resetPasswordToken = hashToken(token);
      usuario.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora
      await em.flush();

      //por consola para probar
      console.log(`http://localhost:5173/reset-password?token=${token}`);
    }

    res.status(200).json({
      message:
        'Si el email existe, te enviamos un link para recuperar la contraseña',
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
}

async function resetPassword(req: Request, res: Response) {
  try {
    const em = RequestContext.getEntityManager()!;
    const { token, password } = req.body;

    const usuario = await em.findOne(Usuario, {
      resetPasswordToken: hashToken(token),
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!usuario) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    usuario.password = await bcrypt.hash(password, 10);
    usuario.resetPasswordToken = null;
    usuario.resetPasswordExpires = null;
    await em.flush();

    res.status(200).json({ message: 'Contraseña actualizada' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al actualizar la contraseña' });
  }
}

async function findAll(req: Request, res: Response) {
  try {
    const em = RequestContext.getEntityManager()!;
    const usuarios = await em.find(Usuario, {});
    res.status(200).json({ message: 'Found all usuarios', data: usuarios });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const em = RequestContext.getEntityManager()!;
    const id = Number.parseInt(req.params.id);
    const usuario = await em.findOneOrFail(Usuario, { id });
    res.status(200).json({ message: 'Found usuario', data: usuario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const em = RequestContext.getEntityManager()!;
    const { nombre, apellido, email, password, telefono, rol } = req.body;
    const existeUsuario = await em.findOne(Usuario, { email });
    if (existeUsuario) {
      return res.status(400).json({ message: 'El mail ya esta registrado' });
    }
    // Hash de la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    //Armo el usuario con la contraseña hasheada
    const usuario = em.create(Usuario, {
      nombre,
      apellido,
      email,
      password: hashedPassword,
      telefono,
      rol,
    });
    //Guardo el usuario en la base de datos
    await em.persistAndFlush(usuario);
    res.status(201).json({
      message: 'Usuario created',
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const em = RequestContext.getEntityManager()!;
    const mail = req.body.email;
    const existeUsuario = await em.findOne(Usuario, { email: mail });
    if (existeUsuario && existeUsuario.id !== Number.parseInt(req.params.id)) {
      return res.status(400).json({ message: 'El mail ya esta registrado' });
    }
    const id = Number.parseInt(req.params.id);
    const usuario = await em.findOneOrFail(Usuario, { id });
    const { nombre, apellido, email, telefono } = req.body;
    em.assign(usuario, { nombre, apellido, email, telefono });
    await em.flush();
    res.status(200).json({ message: 'Usuario updated', data: usuario });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const em = RequestContext.getEntityManager()!;
    const id = Number.parseInt(req.params.id);
    const usuario = em.getReference(Usuario, id);
    await em.removeAndFlush(usuario);
    res.status(200).json({ message: 'Usuario deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function loginUsuario(req: Request, res: Response) {
  try {
    const em = RequestContext.getEntityManager()!;
    const { email, password } = req.body;
    const usuario = await em.findOneOrFail(Usuario, { email });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña hasheada
    const isMatch = await bcrypt.compare(password, usuario.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    // Generar un token JWT
    console.log('Secret:', process.env.JWT_SECRET);
    const token = jwt.sign(
      {
        id: usuario.id,
        usuario: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
      },
    );

    //Se guarda token en cookie HttpOnly
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, //process.env.NODE_ENV === 'production',
      sameSite: 'lax', //en producción puede ser 'strict'
    });

    res.status(200).json({
      message: 'Login exitoso',
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(401).json({ message: 'Credenciales invalidas' });
  }
}

async function logoutUsuario(req: Request, res: Response) {
  try {
    res.clearCookie('token'); //limpiar la cookie del token
    res.status(200).json({ message: 'Logout exitoso' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al hacer logout' });
  }
}

async function getMe(req: Request, res: Response) {
  try {
    res.status(200).json({
      message: 'Acceso permitido',
      user: req.user,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Some server error' });
  }
}

export {
  findAll,
  findOne,
  add,
  update,
  remove,
  loginUsuario,
  logoutUsuario,
  getMe,
  resetPassword,
  forgotPassword,
};
