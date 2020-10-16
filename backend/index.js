const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const webpush = require('web-push')
const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 4000

app.get('/', (req, res) => res.send('Hello World!'))

const vapidKeys = {
    publicKey: 'BK8kaO93LVC0VDYWEFTXcGmFpIaspiTlDNdSkcR75VuDwQ-ZOy93jV0iqMr1Kr5d4yS-o5cFjgn3fr3uk-I0xQY',
    privateKey: 'j9RlO03T-yTExdd9_EgHefqg8selqWLKFOoitRcBNFg'
}

webpush.setVapidDetails(
    'mailto:panczo12d@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const sendNotification = (subscription, dataToSend='') => {
    webpush.sendNotification(subscription, dataToSend)
}

app.get('/send-notification', (req, res) => {
    const subscription = dummyDb.subscription
    const message = 'Hello World'
    sendNotification(subscription, message)
    res.json({ message: 'message sent, sub: ' + JSON.stringify(dummyDb.subscription) })
})


const dummyDb = { subscription: null }

const saveToDatabase = async subscription => {
    dummyDb.subscription = subscription
}

app.post('/save-subscription', async (req, res) => {
    const subscription = req.body
    await saveToDatabase(subscription)
    res.json({message: 'success'})
})


app.listen(port, () => console.log(`Example app listening on port ${port}`))

