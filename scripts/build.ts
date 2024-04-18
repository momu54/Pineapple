import { readFile, writeFile } from 'fs/promises';

(async function main() {
	const orignalContent = await readFile('dist/youtube.js', 'utf-8');
	const newContent = orignalContent.replace(
		'{{blockpage.head}}',
		await readFile('pages/head.html', 'utf-8')
	).replace(
		'{{blockpage.body}}',
		await readFile('pages/body.html', 'utf-8')
	);
	await writeFile('dist/youtube.js', newContent);
})();
