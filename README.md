```js
const locker = require('locker')

// create a locker
locker.setup('locker-name', 'stack', 3)

// create a locker with type='queue', size=1
locker.lock('auto-created-locker')
	.then(unlock => {
		// re-setup locker
		locker.setup('auto-created-locker', 'stack', 10)
		// MUST call at end
		unlock()
	})
```
