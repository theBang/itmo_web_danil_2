require('fs')
	.writeFileSync('url.txt',
		'https://kodaktor.ru/api/req?name=' +
		encodeURIComponent('Данил') +
		'&fname=' +
		encodeURIComponent('Демашов'),
		err => console.log(err)
	);