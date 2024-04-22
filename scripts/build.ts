import { readFile, writeFile } from 'fs/promises';
import 'dotenv/config';

(async function main() {
	const orignalContent = await readFile('dist/youtube.js', 'utf-8');
	const newContent = orignalContent
		.replace(
			'Placeholder.BLOCKPAGE.HEAD',
			`\`${await readFile('pages/head.html', 'utf-8')}\``
		)
		.replace(
			'Placeholder.BLOCKPAGE.BODY',
			`\`${await readFile('pages/body.html', 'utf-8')}\``
		)
		.replace(
			'Placeholder.API_HOST',
			process.argv[2] === 'dev' || !process.env.API_HOST
				? `\`localhost:9443\``
				: `\`${process.env.API_HOST}\``
		);
	await writeFile('dist/youtube.js', newContent);
})();
