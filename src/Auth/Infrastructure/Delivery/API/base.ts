import express from 'express'
import RegisterAction from './RegisterAction'

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
  const registerAction: RegisterAction = new RegisterAction()
  await registerAction.handle(req, res)
})

export default authRouter
