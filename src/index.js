const Locker = require('./lib/locker')

const LOCKERS = {}

/**
 * @param {string} name
 * @param {type} type - queue|stack
 * @param {number} size
 */
function setup(name, type = 'queue', size = 1) {
	if( LOCKERS[name] )
		return LOCKERS[name].setOptions(type, size)
	else
		LOCKERS[name] = new Locker(type, size)
}

/**
 * @param {string} name
 * @return {Promise}
 */
function lock(name) {
	if( !LOCKERS[name] )
		setup(name)
	return LOCKERS[name].join()
}

module.exports = {
	setup,
	lock,
}
