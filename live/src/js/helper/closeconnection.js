const closeconnectionAddress = process.env.CC_HOST
	|| 'http://ec2-18-219-50-228.us-east-2.compute.amazonaws.com:3000'

const requestJson = (path, options = {}) =>
	fetch(closeconnectionAddress + path, options)
		.then(resp => resp.json());

const getOptionsForDripEmail = fieldName =>
	requestJson('/closeio/custom_fields').then(json =>
		json
			.filter(field => field.name === fieldName)
			.reduce((choices, field) => field.choices, [])
	);

const sendToCloseIO = queryEntry =>
	requestJson('/closeio/dripemail', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(queryEntry)
	});

export { getOptionsForDripEmail, sendToCloseIO };
