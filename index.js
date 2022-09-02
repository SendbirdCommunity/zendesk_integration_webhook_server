import * as dotenv from 'dotenv' 
dotenv.config()

const ZENDESK_WEBHOOK_AUTH_TOKEN = process.env.ZENDESK_WEBHOOK_AUTH_TOKEN

import express from 'express'
import {checkChannelMemberMovement, updateChannelMembership } from './utils.js'

const app = express()
const port = 80

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', async(req, res) => {
    console.log("Zendesk registered token of your choice", req.headers.authorization)
    console.log("Zendesk webhook body", req.body)
    
    const authToken = ZENDESK_WEBHOOK_AUTH_TOKEN
    const requestToken = req.headers.authorization.replace("Bearer ", "")
    if(requestToken === authToken && req.body.action === 'ticket_update'){

      const membersToMove = await checkChannelMemberMovement(req.body)
      if(membersToMove.error) return res.sendStatus(400)

      console.log("Members move", membersToMove)
      const membersUpdated = await  updateChannelMembership(`zendesk-${req.body.ticket_id}`, membersToMove)
      console.log("Members updated", membersUpdated)
      
      return res.sendStatus(200)

    } else {
        res.sendStatus(403)
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})