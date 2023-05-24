import { Router } from "express";
import userModel from "../Dao/models/user.model.js";

const router = Router()

router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  if (!first_name || !last_name || !email || !age || !password) {
    return res.status(400).json({ status: 'error', error: "Todos los campos son requeridos" });
  }

  const exist = await userModel.findOne({ email });
  if (exist) {
    return res.status(400).json({ status: 'error', error: "El usuario ya existe" });
  }

  const user = {
    first_name,
    last_name,
    email,
    age,
    password,
    role: 'default'
  };

  const result = await userModel.create(user);
  res.json({ status: 'Success', message: "El usuario se ha registrado" });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let user;

  if (email === 'adminCoder@coder.com' &&  password === 'adminCod3r123') {
    user = {
      first_name: 'Coder',
      last_name: 'House',
      email: email,
      age: 35,
      role: 'Admin'
    };
  } else {
    user = await userModel.findOne({ email, password });

    if (!user) {
      return res.status(400).send({ status: 'error', error: "Usuario y/o Contraseña Incorrecta" });
    }
  }

  const role = user.role === 'Admin' ? 'Admin' : 'Usuario';

  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
    role: role,
  };

  res.send({ status: 'Success', payload: req.session.user, message: "Primer logueo" });
});



router.get('/logout', (req, res)=>{
    req.session.destroy(err => {
        if(err)return res.status(400).send({status: 'error', error: 'No se puede desloguear'})
        res.redirect('/login')
    })
})



export default router