if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    .then((reg) => console.log('service in work', reg))
    .catch((err) => console.log('not work', err))
}