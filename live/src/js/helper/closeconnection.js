const closeconnectionAddress = process.env.CC_HOST
  || "http://ec2-18-219-50-228.us-east-2.compute.amazonaws.com:3000"

const getOptionsForDripEmail = (field) =>
  requestJson(`/dripemail/choices/?field=${field}`)

const sendToCloseIO = (queryEntry) =>
  requestJson('/closeio/dripemail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(queryEntry)
  });

const requestJson = (path, options = {}) =>
  fetch(closeconnectionAddress + path, options)
    .then(resp => resp.json())

export { getOptionsForDripEmail, sendToCloseIO };
