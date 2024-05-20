function PropertyManipulator(data) {
	this.data = data ?? {}
}

PropertyManipulator.prototype.optional = function(propertyName, setData, condition) {
	const propertyData = setData ?? this.data[propertyName]
	if (condition == null)
		this.data = { ...this.data, [propertyName]: propertyData ? propertyData : undefined }
	else
		this.data =  { ...this.data, [propertyName]: condition ? propertyData : undefined }

	return this
}
PropertyManipulator.prototype.replace = function(propertyName, newPropertyName) {
	this.data = { ...this.data, [propertyName]: undefined, [newPropertyName]: this.data[propertyName] }
	return this
}
PropertyManipulator.prototype.map = function(propertyName, fn, newPropertyName) {
	if (newPropertyName == null)
		this.data = { ...this.data, [propertyName]: this.data[propertyName].map(fn) }
	else
		this.data = { ...this.data, [propertyName]: undefined, [newPropertyName]: this.data[propertyName].map(fn) }

	return this
}
PropertyManipulator.prototype.finish = function() {
	Object.keys(this.data).forEach(key => this.data[key] === undefined && delete this.data[key]);
	return this.data
}

function manip(data) {
	return new PropertyManipulator(data)
}

export default manip