import express from "express"

import{validationBody ,ctrlWrapper,auth} from "../middlewares"

import { joiSignUpSchema ,joiSignInSchema} from "../models/User"

import { signUp,signIn,signOut } from "../controllers/auth"

const router = express.Router()

router.post("/sign-up",validationBody(joiSignUpSchema),ctrlWrapper(signUp))
router.post("/sign-in", validationBody(joiSignInSchema), ctrlWrapper(signIn))
router.get("sign-out",auth,ctrlWrapper(signOut))

export default router