let isOwnerChecked = false;
let isGameDetected = false;

interface OwnerResponse {
	blocked: boolean;
}

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

async function onOwnerLoaded(ownerID: string) {
	const result = await fetch('https://{{api_host}}/api/owner', {
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
	const interval = setInterval(() => {
		const gameElement = document.querySelector(
			'ytd-rich-metadata-renderer > [href^="/channel/"]'
		);
		if (gameElement) {
			onDetectedGame();
			clearInterval(interval);
		}
	}, 100);
}

function shortsHandler() {
	const interval = setInterval(() => {
		const ownerElement = document.querySelector(
			'a[href^="/@"]'
		) as HTMLAnchorElement | null;
		if (ownerElement) {
			const ownerID = ownerElement.href.split('@')[1];
			onOwnerLoaded(ownerID);
			clearInterval(interval);
		}
	}, 100);
}

if (location.pathname.startsWith('/watch')) {
	videosHandler();
} else if (location.pathname.startsWith('/shorts')) {
	shortsHandler();
}
