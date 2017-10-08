class Locker {
	constructor(type, size) {
		this.setOptions = this.setOptions.bind(this)
		this.join = this.join.bind(this)
		this.leave = this.leave.bind(this)

		this._count = 0
		this._resolves = []

		this.setOptions(type, size)
	}

	setOptions(type, size) {
		this._type = type || this._type
		this._size = size || this._size

		while( this._count < size && this._resolves.length ) {
			this._count += 1
			this.leave()
		}
	}

	join() {
		return new Promise(resolve => {
			this._resolves.push(resolve)
			if( this._count < this._size ) {
				this._count += 1
				this.leave()
			}
		})
	}

	leave() {
		this._count -= 1
		const resolve = this._type === 'queue' ?
			this._resolves.shift() :
			this._resolves.pop()

		if( resolve ) {
			this._count += 1
			resolve(this.leave)
		}
	}
}

module.exports = Locker
