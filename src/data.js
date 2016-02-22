var mockUserList = [
{
	id: 1,
	lastname: 'Lerjen',
	firstname: 'Yann',
	gender: 'M',
	isActiv: true,
	email: 'y@l.ch',
	phone: '',
	mobile: '',
	getFullName : function(){return this.lastname + ' ' + this.firstname},
	addresses: [
		{
			id: 1,
			street1: 'Rue pré fleuri 23',
			street2: '',
			npa: '1963',
			locality: 'Vétroz',
			region: 'Valais',
			country: 'Suisse'
		}, {
			id: 2,
			street1: 'Chemin de Richesson 4',
			street2: '',
			npa: '1000',
			locality: 'Lausanne 26',
			region: 'Vaud',
			country: 'Suisse'
		}
	]
},
{
	id: 2,
	lastname: 'Duval',
	firstname: 'Ernest',
	gender: 'M',
	isActiv: true,
	email: 'asdf@lfadsf.ch',
	phone: '',
	mobile: '',
	getFullName : function(){return this.lastname + ' ' + this.firstname},
	addresses: [
		{
			id: 3,
			street1: 'Rue pré fleuri 23',
			street2: '',
			npa: '1963',
			locality: 'Vétroz',
			region: 'Valais',
			country: 'Suisse'
		}
	]
},
{
	id: 3,
	lastname: 'Mottiez',
	firstname: 'Angéline',
	gender: 'F',
	isActiv: true,
	email: 'ange@l.ch',
	phone: '',
	mobile: '',
	getFullName : function(){return this.lastname + ' ' + this.firstname}
},
{
	id: 4,
	lastname: 'Marignan',
	firstname: 'Charle',
	gender: 'M',
	isActiv: false,
	email: 'Marignan@l.ch',
	phone: '',
	mobile: '',
	getFullName : function(){return this.lastname + ' ' + this.firstname}
},
{
	id: 5,
	lastname: 'Dufour',
	firstname: 'Henri',
	gender: 'M',
	isActiv: true,
	email: 'duf@hen.ch',
	phone: '',
	mobile: '',
	getFullName : function(){return this.lastname + ' ' + this.firstname}
},
{
	id: 6,
	lastname: 'Dufour',
	firstname: 'Anna',
	gender: 'F',
	isActiv: true,
	email: 'duf@jea.ch',
	phone: '',
	mobile: '',
	getFullName : function(){return this.lastname + ' ' + this.firstname}
}
];