function hashFunction(obj) {
	let arr = [];
 
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			arr.push(key + ':' + obj[key]);
		}
	}
 
	arr.sort();
 
	return arr.join('|');
}

function ObjectMap() {
	this.map = new Map()
	this.hashMap = new Map()

	this.get = function(key) {
		return this.map.get(typeof key === 'object' ? hashFunction(key) : key)
	}
	this.set = function(key, value) {
		const k = typeof key === 'object' ? hashFunction(key) : key
		this.map.set(k, value)
		this.hashMap.set(k, key)
	}
	this.keys = function() {
		return Array.from(this.map.keys(), k => this.hashMap.get(k))
	}
	this.getByValue = function(value) {
		for (let [k, v] of this.map.entries()) {
			if (v === value)
				return k;
		}
	}
}

function makeMap(knvList) {
	const map = new ObjectMap()
	knvList.forEach(([k, v]) => {
		map.set(k, v)
	})
	return map
}

export default makeMap
