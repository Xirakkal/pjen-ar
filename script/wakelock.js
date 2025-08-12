(async () => {
    let wakeLock = null;

    async function requestWakeLock() {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock activé');

            wakeLock.addEventListener('release', () => {
                console.log('Wake Lock désactivé');
            });
        } catch (err) {
            console.error(`${err.name}, ${err.message}`);
        }
    }

    if ('wakeLock' in navigator) {
        await requestWakeLock();

        document.addEventListener('visibilitychange', async () => {
            if (wakeLock !== null && document.visibilityState === 'visible') {
                await requestWakeLock();
            }
        });
    } else {
        console.warn('Wake Lock API n\'est pas supporté sur ce navigateur');
    }
})();