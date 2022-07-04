import React, { Component, PureComponent } from "react";
import {useState, useEffect} from 'react';

//const indexedDB = 
//    window.indexedDB ||
//    window.mozIndexedDB ||
//    window.webkitIndexedDB ||
//    window.msIndexedDB ||
//    window.shimIndexedDB;
//
//const request = indexedDB.open("PictureDB", 1)
//
//request.oneerror = function (event) {
//    console.error("An error occurred with IndexedDB")
//    console.error(event)
//}
//
//request.onupgradeneeded = function() {
//    const db = request.result
//    const store = db.createObjectStore("pictures", { keyPath: 'id'})
//    store.createIndex("pictureDetails", ["imageFile", "imageName"], {unique: false})
//}


//async function HopefullyAnImage() {
//    getRequestWithImageName().then((resolved) => {
//        console.log("Did this happen?", resolved)
//        let anImage = resolved
//        request.onsuccess = function() {
//
//            console.log("The trashbase has been opened...!")
//
//            const db = request.result
//            const transaction = db.transaction('pictures', 'readwrite')
//
//            const store = transaction.objectStore('pictures')
//            const colorIndex = store.index('pictureDetails')
//
//            store.put({
//                id:2,
//                imageFile: anImage,
//                imageName: "Hopefully the image of tobydriver lol...!"
//            })
//
//            store.put({ 
//                id: 1, 
//                imageFile: 'A Random Image...!', 
//                imageName: 'Some Random Image Name...!'
//            })
//
//
//
//            //const idQuery = store.get(1)
//            //idQuery.onsuccess = function() {
//            //    console.log("Pictures Query!", idQuery.result)
//            //}
//
//            const idQuery2 = store.get(2)
//            idQuery2.onsuccess = function() {
//                console.log("Picture Query 2!", idQuery2.result)
//            }
//
//            transaction.oncomplete = function() {
//                db.close()
//            }
//        }
//        request.onsuccess()
//    })
//}
//HopefullyAnImage()



//const RetriveAnImage = async () => {
//const Servy = () => {
//function validateResponse(response) {
//        if (!response.ok) {
//            throw Error(response.statusText);
//        }
//        return response;
//    }
//
//export default class Servy extends Component {
//
//    
//    
//    state = {
//        src: null
//    }
//    
//    componentDidMount() {
//        fetch(`http://localhost:1234/pictures`, {
//            method: 'GET',
//            mode: 'cors',
//            credentials: 'include',
//        })
//        .then(response => response.blob())
//        .then(blob => {
//            this.setState({ src: URL.createObjectURL(blob) })
//        })
//    
//    }
//    
//    //render() {
//    //    return (
//    //        <div>
//    //            { this.state.src && <img alt="home" src={ this.state.src }></img> }
//    //        </div>
//    //    )
//    //}
//    render() {
//        return (
//            <div>
//                <img src={this.state.src} />
//            </div>
//        )
//    } 
//}







const pictureNames = async () => {
    const baseURL = 'http://localhost:1234/specificpicture'
    try {
        const response = await fetch(
            'http://localhost:1234/picturename', {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        const resolved = await response.json()
        //const pictureURLs = []
        //for (var key in responseObject) {
        //    pictureURLs.push(responseObject[key])
        //}

        //console.log('responsey', resolved)
        var results = allRequests(resolved)
        console.log("inside picnames", results)
        //return resolved
        return results
    } catch (e) {
        console.log(e)
    }

}

const MAXIUM_AMOUNT_OF_REQUESTS = 5

const MAX_LOAD = 3

const allRequests = async (jobs) => {
    console.log(jobs)

    const config = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
    }

    //var jobs = {} // all the 'jobs' to be completed
    //for (var i=0; i<urls.length; i++) {
    //    jobs[i] = urls[i]
    //}
    var finishedJobs = [] // stores names of the completed 'jobs' object
    var jobsInProgress = [] // stores all 'jobs' to be completed, limited to a max of MAX_LOAD
    var results = [] // stores all results from any finished 'job'
    var jobsLength = Object.keys(jobs).length


    // TODO This is totally BROKEN
    //// When the loop decides it needs to increase the jobs it has problems choosing a job that is already done or 
    //// is being "done"
    //// I really hate this pathetic excuse of a language so i will probably never fix it becuase
    //// once im done with this Proj im never coming back to this pathetic langauge, its def not worth!.
    //// Hopefully WASM is better because if not i will never make webapps teehee!!

    
    //while (true) { // while all jobs are not completed/done

    const goFetch = async (key) => {
        try {
            fetch(jobs[key], config)
            .then(response => response.blob())
            .then(blob => {
                results.push(URL.createObjectURL(blob))
        })
        } catch (e) {
            goFetch(key)
        }
    }
    const doJobs = async () => {

        for (const kay in jobs) {
            console.log('key: ', kay)
        }
        for (const key in jobs) {
            console.log('call me: ', key)
            goFetch(key)
        }

        //if (jobsInProgress.length <= MAX_LOAD) { // add more jobs untill you are at max saturation
        //    var temp = '' // find a job that has not been executed
        //    for (const key of Object.keys(jobs)) {
        //        if (!(finishedJobs.includes(key)) && !(jobsInProgress.includes(key))) {
        //            temp = key
        //            break
        //        }
        //    }
        //    var goFetch = async function(jKey) {
        //        fetch(jobs[jKey], config)
        //            .then(response => {console.log(response); return response.json()})
        //            .then(blob => {
        //                /*results.push(URL.createObjectURL(blob))*/
        //                results.push(blob)
        //                //for (var x=0;x<jobsInProgress.length;x++) {
        //                //    if (jobsInProgress[x] === jKey) {
        //                //        jobsInProgress.splice(x, jKey)
        //                //    }
        //                //}
        //                doJobs()
        //            })
        //    }
        
        //    goFetch(temp)
        //    if (jobsInProgress.push(temp)) {
        //        //console.log("maximum jobs currently being done: ", jobsInProgress.length, results.length)
        //    } // record the job being done
        //    if (jobsInProgress.length < MAX_LOAD) {
        //        //console.log('Another job has started...')
        //        //doJobs()
        //    }
        //    delete jobs[temp] // remove the job from the 'jobs' list
        //}
        //if (results.length >= jobsLength) { 
        //    console.log('here are your results inside a function(): ', results)
        //    return results
        //}
    }
    await doJobs()
    return results
}


async function getRequestWithImageName() {

    var result = []
    const withParams = '?name=RyGyDuggy.png'
    await fetch('http://localhost:1234/picturename' + withParams,
    {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'image/png'
        },
    })
    .then((response) => response.blob())
    .then((blob) => {result.push(URL.createObjectURL(blob))})
    return result
}




const URLs = [
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
    'http://localhost:1234/pictures',
]

const Servy = () => {
    const [src, setSRC] = useState('')
    const [images, setImages] = useState([])
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        //getData()
        //getDataV2()
        //allRequests(URLs)
        //getRequestWithImageName('RyGyDyggy.png')

        pictureNames().then(p => setImages(p))
    }, [])


    function getData() {
        var config = {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        }
        fetch('http://localhost:1234/pictures',
        config,
        )
        .then(response => response.blob())
        .then(blob => {
            setSRC(URL.createObjectURL(blob))
        })
    }
    function getDataV2(item) {
        fetch('http://localhost:1234/specificpicture' + '?name=DuggyAndLukeEnderColdBoisMeme.png',
        {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        })
        .then(response => response.blob())
        .then(blob => {
            setSRC(URL.createObjectURL(blob))
        })
    }
    const myUpdate = () => {
        setUpdate(!update)
    }

    return(
        <div>
            <div>JavaScript can go burn in hell</div>
            <img src={src}></img>
            {console.log("total:", images.length)}
            {
                images.map((item) => (
                    <img src={item}/>
                ))
            }

            {/*
                images.map((item) => (
                    <div {item.message}</div>
                ))
                */}
            <button onClick={myUpdate}>myButton</button>
                

        </div>
    )
}
    //console.log("at the location", images)
                //images.map((key) => {
                //    console.log(key)
                //})
                //pictureNames().then((items) => {
                //    items.map((key) => {
                //        <div>{key}</div>
                //    })
                //})
                //images.then((items) => {
                //    items.map((key) => {
                //        {/*<img src={key}></img>*/}
                //        <div>{key}</div>
                //    })
                //})

export default Servy