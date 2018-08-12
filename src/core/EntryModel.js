import uniqid from 'uniqid';

export default class EntryModel {
	constructor(type, name, amount, category, description = '', date = new Date()) {
		this.id = uniqid();
		this.type = type;
		this.name = name;
		this.amount = amount;
		this.category = category;
		this.description = description;
		this.date = date;
	}
}