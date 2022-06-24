# JS Promises

```js
function makeRequest(location) {
	return new Promise((resolve, reject) => {
		console.log(`making request to ${location}`);
		if (location === "Google") {
			resolve("google says hi");
		} else {
			reject("we can only talk to google");
		}
	});
}

function processRequest(response) {
	return new Promise((resolve, reject) => {
		console.log("processing response");
		resolve(`extra information + ${response}`);
	});
}

makeRequest("Google")
	.then((resoponse) => {
		console.log("response recived");
		return processRequest(response);
	})
	.then((processedResponse) => {
		console.log(processedResponse);
	}) //since reject is considered as an error we can catch error by attaching catch
	.catch((err) => {
		console.log(err);
	});
// Output

making request to Google
response recived
processing response
extra information google says hi
```

# JS Async Await

async await without catching the error

```javascript
function makeRequest(location) {
	return new Promise((resolve, reject) => {
		console.log(`making request to ${location}`);
		if (location === "Google") {
			resolve("google says hi");
		} else {
			reject("we can only talk to google");
		}
	});
}

function processRequest(response) {
	return new Promise((resolve, reject) => {
		console.log("processing response");
		resolve(`extra information + ${response}`);
	});
}

async function doWork() {
	const response = await makeRequest("Google");
	console.log("Response recived");
	const processedResponse = await processRequest(response);
	console.log(processedResponse);
}
doWork()

// Output

making request to Google
response recived
processing response
extra information google says hi
```

async await with error handling

```javascript
function makeRequest(location) {
	return new Promise((resolve, reject) => {
		console.log(`making request to ${location}`);
		if (location === "Google") {
			resolve("google says hi");
		} else {
			reject("we can only talk to google");
		}
	});
}

function processRequest(response) {
	return new Promise((resolve, reject) => {
		console.log("processing response");
		resolve(`extra information + ${response}`);
	});
}

// we can use it like this but we are not able to catch an error here so if we call makeRequest funciton with argument with other than google it will throw uncaught exception error for this we can used try catch block
async function doWork() {
	try {
		const response = await makeRequest("Google");
		console.log("Response recived");
		const processedResponse = await processRequest(response);
		console.log(processedResponse);
	} catch (err) {
		console.log(err);
	}
}

// Output

making request to Google
response recived
processing response
extra information google says hi
```
