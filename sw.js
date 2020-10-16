const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const saveSubscription = async subscription => {
    const SERVER_URL = 'http://localhost:4000/save-subscription'
    const response = await fetch(SERVER_URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
    })
    return response.json()
}

self.addEventListener('activate', async () => {
    try {
        const applicationServerKey = urlB64ToUint8Array('BK8kaO93LVC0VDYWEFTXcGmFpIaspiTlDNdSkcR75VuDwQ-ZOy93jV0iqMr1Kr5d4yS-o5cFjgn3fr3uk-I0xQY')
        const options = {
            applicationServerKey,
            userVisibleOnly: true,

        }
        const subscription = await self.registration.pushManager.subscribe(options)
        const response = await saveSubscription(subscription)
        console.log(JSON.stringify(subscription))

    } catch (err) {
        console.error(err)
    }
})

self.addEventListener('push', function(event) {
    if (event.data) {
        console.log('Push event!!', event.data.text())
        showLocalNotification('Yolo', event.data.text(), self.registration)
    } else {
        console.log('Push event but not data')
    }
})

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body,
  }
  swRegistration.showNotification(title, options)
}