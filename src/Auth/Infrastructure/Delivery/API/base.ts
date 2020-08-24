import express from 'express'
import RegisterAction from './RegisterAction'
import LoginAction from "@auth_infrastructure/Delivery/API/LoginAction"

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
  const registerAction: RegisterAction = new RegisterAction()
  await registerAction.handle(req, res)
})

authRouter.post('/login', async (req, res) => {
  const loginAction: LoginAction = new LoginAction()
  await loginAction.handle(req, res)
})

export default authRouter
