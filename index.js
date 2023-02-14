const fs = require('fs');
const http = require('http');
const url = require('url');

// const files = require('./files');

const replaceTemplate = (tempCard, product) => {
	let output = tempCard.replace(/{%PRODUCT_NAME%}/g, product.productName);
	output = output.replace(/{%PRODUCT_LOCATION%}/g, product.from);
	output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image);
	output = output.replace(/{%PRODUCT_NUTRIENT%}/g, product.nutrients);
	output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
	output = output.replace(/{%PRODUCT_PRICE%}/g, product.price);
	output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
	output = output.replace(/{%PRODUCT_ID%}/g, product.id);

	if (!product.organic) {
		output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
	}
	return output;
};

const tempOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	'utf-8'
);
const tempCard = fs.readFileSync(
	`${__dirname}/templates/template-card.html`,
	'utf-8'
);
const tempProd = fs.readFileSync(
	`${__dirname}/templates/template-product.html`,
	'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	// Overview
	if (pathname === '/' || pathname === '/overview') {
		res.writeHead(200, {
			'Content-type': 'text/html'
		});

		const cardsHTML = dataObject
			.map((element) => replaceTemplate(tempCard, element))
			.join('');
		const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHTML);
		res.end(output);

		// Product
	} else if (pathname === '/product') {
		res.writeHead(200, {
			'Content-type': 'text/html'
		});

		const product = dataObject[query.id];
		const output = replaceTemplate(tempProd, product);
		res.end(output);

		// api
	} else if (pathname === '/api') {
		res.writeHead(200, {
			'Content-type': 'application/json'
		});
		res.end(data);

		// 404
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'Custom-header-my-own': 'requested-address-not-available'
		});
		res.end('<h1>Page not found</h1>');
	}
});

server.listen(8080, '127.0.0.1', () => {
	console.log('Listening on port 8080');
});
