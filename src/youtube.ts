interface OwnerResponse {
	blocked: boolean;
}

function onDetectedGame() {
	stop();
	for (const scriptElement of document.head.getElementsByTagName('script')) {
		scriptElement.remove();
	}

	if (true) {
		document.head.innerHTML = Placeholder.BLOCKPAGE.HEAD;
		document.body.innerHTML = Placeholder.BLOCKPAGE.BODY;
		return;
	}
}

async function onOwnerLoaded(ownerID: string) {
	const result = await fetch(`https://${Placeholder.API_HOST}/api/owner`, {
		method: 'POST',
		body: JSON.stringify({ owner: ownerID }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const jsonResult: OwnerResponse = await result.json();
	if (jsonResult.blocked) {
		onDetectedGame();
	}
}

function videosHandler() {
	const interval = window.setInterval(() => {
		const gameElement =
			document.querySelector('ytd-rich-metadata-renderer > a[href="/gaming"]') ??
			document.querySelector('a#topic-link-container[href="/gaming"]');
		if (gameElement) {
			onDetectedGame();
			window.clearInterval(interval);
		}
	}, 100);
}

let shortsInterval: number;
function shortsHandler() {
	shortsInterval = window.setInterval(() => {
		const ownerElement = document.querySelector(
			'ytd-shorts [is-active] a[href^="/@"]'
		) as HTMLAnchorElement | null;
		if (ownerElement) {
			const ownerID = ownerElement.href.split('@')[1];
			onOwnerLoaded(ownerID);
			window.clearInterval(shortsInterval);
		}
	}, 100);
}

function onNavigate() {
	if (location.pathname === '/watch') {
		videosHandler();
	} else if (location.pathname.startsWith('/shorts')) {
		if (shortsInterval) {
			window.clearInterval(shortsInterval);
		}
		shortsHandler();
	}
}

document.addEventListener('yt-navigate-finish', onNavigate);
document.addEventListener('spfdone', onNavigate);
onNavigate();
