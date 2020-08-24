import 'module-alias/register'

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import env from '@core/Environment'
import auth from '@auth_infrastructure/Delivery/API/base'

const router = express()

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.use(cors())

router.use('/api/accounts', auth)

router.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the API'
  })
  res.end()
})

router.listen(env.host.port, function () {
  console.log(`Listenning to *:${env.host.port} ...`)
})
