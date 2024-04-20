import { readFile, writeFile } from 'fs/promises';
import 'dotenv/config';

(async function main() {
	const orignalContent = await readFile('dist/youtube.js', 'utf-8');
	const newContent = orignalContent
		.replace('{{blockpage.head}}', await readFile('pages/head.html', 'utf-8'))
		.replace('{{blockpage.body}}', await readFile('pages/body.html', 'utf-8'))
		.replace('{{api_host}}', process.env.API_HOST || 'api.example.com');
	await writeFile('dist/youtube.js', newContent);
})();
