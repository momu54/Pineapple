let pendingRecords: MutationRecord[] = [];
const observer = new MutationObserver((records) => {
	pendingRecords.push(...records);
});
const app = document.getElementsByTagName('ytd-app')[0];

observer.observe(app, {
	childList: true,
	subtree: true,
});

function onDetectedGame() {
	stop();
	for (const scriptElement of document.head.getElementsByTagName('script')) {
		scriptElement.remove();
	}

	if (true) {
		document.head.innerHTML = `{{blockpage.head}}`;
		document.body.innerHTML = `{{blockpage.body}}`;
		return;
	}
}

setInterval(() => {
	if (pendingRecords.length === 0) return;

	const isBlockedContent = pendingRecords.some((record) => {
		if (record.target.nodeName !== 'A') return false;
		const target = record.target as HTMLAnchorElement;

		if (target.href.includes('UCn-Tkh9XsSaZdipNKo13ZWA')) {
			return true;
		}

		return false;
	});

	if (isBlockedContent) {
		onDetectedGame();
	}

	pendingRecords = [];
}, 100);
