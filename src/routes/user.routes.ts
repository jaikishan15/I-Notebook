import * as express from "express";
import { celebrate, Joi, errors, Segments } from "celebrate";
import { Auth } from "../middlewares/middlewares";
import { UsersController } from "../controllers/user.controller";

const router = express.Router();

router.post(
  "/create",
  Auth.BasicAuth,
  celebrate({
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
      userName: Joi.string().required(),
    },
  }),
  UsersController.createNewUser
);

router.post(
  "/login",
  Auth.BasicAuth,
  celebrate({
    body: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  UsersController.login
);

// router.get(
//   "/getUserById",
//   Auth.BasicAuth,
//   Auth.UserAuth,
//   UsersController.getUserById
// )

// router.post("/forgotPassword",
// Auth.BasicAuth,
// celebrate({
//   body:{
//     email:Joi.string().required()
//   }
// })
router.use(errors());

module.exports = router;
