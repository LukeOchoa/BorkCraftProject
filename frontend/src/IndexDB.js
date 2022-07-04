

function shoveImageIntoIndexedDB(image, customMessage) {

    var indexedDB = 
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB ||
        window.shimIndexedDB;

    let anImage = image
    let aMessage = customMessage

    var request = indexedDB.open("PictureDB", 1)

    request.oneerror = function (event) {
        console.error("An error occurred with IndexedDB")
        console.error(event)
    }

    request.onupgradeneeded = function() {
        const db = request.result
        const store = db.createObjectStore("pictures", { keyPath: 'id'})
        store.createIndex("pictureDetails", ["imageFile", "imageName"], {unique: false})
    }

    request.onsuccess = function() {

        console.log("The trashbase has been opened...!")

        const db = request.result
        const transaction = db.transaction('pictures', 'readwrite')

        const store = transaction.objectStore('pictures')
        const colorIndex = store.index('pictureDetails')

        store.put({ 
            id: 1, 
            imageFile: anImage, 
            imageName: aMessage,
        })

        const idQuery = store.get(1)

        idQuery.onsuccess = function() {
            console.log("Pictures Query!", idQuery.result)
        }

        transaction.oncomplete = function() {
            db.close()
        }
    }
}

export default shoveImageIntoIndexedDB







