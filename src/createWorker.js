export default function createWorker(fn) {
    var js = fn
        .toString()
        .replace(/^function\s*\(\)\s*{/, '')
        .replace(/}$/, '')
    var blob = new Blob([js])
    return new Worker(URL.createObjectURL(blob))
}