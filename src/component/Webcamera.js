import React, { useState } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';
import FormData from 'form-data'
import ReactLoading from "react-loading";
import Buffer from 'buffer'
import { base64ToBlob, blobToBase64 } from 'base64-blob'
import './Webcamera.css'

const WebcamComponent = () => <Webcam />;

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};



export const WebcamCapture = () => {

    
    const [image,setImage]=useState('');
    const [display,setDisplay]=useState(false);
    const webcamRef = React.useRef(null);
    const [done,setDone]=useState(true);

    const [nameCelebrity, setnameCelebrity] = useState('');
    const [imageCelebrity, setimageCelebrity] = useState('');
    const [imageMerge, setimageMerge] = useState('');
    const [nameMerge, setnameMerge] = useState('');
    const [mergeDone, setMerge] = useState(false);
    const [erreur, setError] = useState('');




    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
        });

    const mergeImage = () => {
        let formData = new FormData()
        fetch(image)
            .then(res => res.blob())
            .then(blob => {
                var file1 = new File([blob], "img1.png", {
                    type: 'image/jpeg'
                });
                // console.log(file1)
                formData.append("file_a", file1)
                fetch(imageCelebrity)
                    .then(res => res.blob())
                    .then(blob => {
                        var file2 = new File([blob], "img2.png", {
                            type: 'image/jpeg'
                        });
                        // console.log(file2)
                        formData.append('file_b', file2)
                        var t0 = performance.now();
                        axios.post('http://127.0.0.1:5000/swap_image', formData)
                            .then(function (response, data) {
                                data = response.data;
                                //console.log(data.filedata)
                                if (typeof data.filedata == "undefined") {
                                    setimageCelebrity("https://static.thenounproject.com/png/3122582-200.png")
                                    setnameCelebrity("Response null !")
                                }
                                else {
                                    setimageMerge('data:image/jpeg;base64,' + data.filedata)
                                    setnameMerge(nameCelebrity+" && "+"You")
                                }
                                var t1 = performance.now();
                                console.log("The time it took to predict the image " + (t1 - t0) + " milliseconds.")
                                setDone(true);
                            }).catch(
                                function (error) {
                                    console.log(error.message)
                                    setError(error.message)
                                    setDone(true);
                                  }
                            )
                        
                    })

            })
    }

    // Function for sending image to the backend
    const uploadHandler = () => {

        
        let formData = new FormData()
        fetch(image)
            .then(res => res.blob())
            .then(blob => {
                var file = new File([blob], "img.png", {
                    type: 'image/jpeg'
                });
                //console.log(file)
                formData.append("file", file)
                //console.log(formData.length)
                //console.log(formData.values())
                var t0 = performance.now();
                axios.post('http://127.0.0.1:5001/upload', formData)
                    .then(function (response, data) {
                        data = response.data;
                        //console.log(data.filedata)
                        if (typeof data.filedata == "undefined") {
                            setimageCelebrity("https://static.thenounproject.com/png/3122582-200.png")
                            setnameCelebrity("Visage non détecté !")
                        }
                        else{
                            setimageCelebrity('data:image/jpeg;base64,'+data.filedata)
                            setnameCelebrity(data.filemeta)
                        }
                        var t1 = performance.now();
                        console.log("The time it took to predict the image " + (t1 - t0) + " milliseconds.")
                        setDone(true);
                    }).catch(
                        function (error) {
                          console.log(error.message)
                          setError(error.message)
                          setDone(true);
                        }
                      )
                
            });
        
    }

    

    return (
        <div className="webcam-container">

            {mergeDone ?
                <div>
                    {done ?
                        <div className="imageMerge-container">
                            <div className="image-name">
                                <img src={image}></img>
                                <div><a className="nameCelebrity">You</a></div>
                            </div>
                            <div className="image-name">
                                <img src={imageCelebrity}></img>
                                <div><a className="nameCelebrity">{nameCelebrity}</a></div>
                            </div>
                            <div className="image-name">
                                <img src={imageMerge}></img>
                                <div><a className="nameCelebrity">{nameMerge}</a></div>

                            </div>
                            <div>
                                {erreur != '' ?
                                    <div><a className="erreur">No photos merged : {erreur}</a></div> :
                                    <div></div>
                                }
                            </div>
                        </div> :
                        <div className="webcam-img">
                            <div style={{ marginBottom: "1cm" }}><a className="nameCelebrity">Patientez</a></div>
                            <div className="loading">
                                <ReactLoading
                                    type={"spinningBubbles"}
                                    color={"black"}
                                    height={400}
                                    width={400}
                                />
                            </div>
                        </div>
                    }

                </div> :
                <div>
                    <div className="webcam-img">
                        {nameCelebrity == '' ?
                            <div >
                                {done ?
                                    <div><img className="image" src="https://cpatheatricals.org/wp-content/uploads/2015/10/who-is.jpg"></img>
                                        <div><a className="nameCelebrity">A qui vous ressemnblez?</a></div></div>
                                    :
                                    <div>
                                        <div style={{ marginBottom: "1cm" }}><a className="nameCelebrity">Patientez</a></div>
                                        <div className="loading">
                                            <ReactLoading
                                                type={"spinningBubbles"}
                                                color={"black"}
                                                height={400}
                                                width={400}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                            :
                            <div >
                                {done ?
                                    <div ><img className="image" src={imageCelebrity}></img>
                                        <div><a className="nameCelebrity">{nameCelebrity}</a></div>
                                        <div>
                                            {erreur != '' ?
                                                <div><a className="erreur">{erreur}</a></div> :
                                                <div></div>
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div style={{ marginBottom: "1cm" }}><a className="nameCelebrity">Patientez</a></div>
                                        <div className="loading">
                                            <ReactLoading
                                                type={"spinningBubbles"}
                                                color={"black"}
                                                height={400}
                                                width={400}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>

                    <div className="webcam-img">
                        {image == '' ? <div><Webcam
                            audio={false}
                            height={500}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={700}
                        /><div><a className="nameCelebrity">Prenez une photo</a></div></div> : <div><img className="image" src={image} /><div><a className="nameCelebrity">Photo Prise</a></div></div>}
                    </div>
                </div>
            }

            <div>
                {image != '' ?
                    <div>
                        {(imageCelebrity != '' && imageCelebrity != 'https://static.thenounproject.com/png/3122582-200.png') ?
                            <div>
                                {mergeDone ?
                                    <div>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            setImage('')
                                            setnameCelebrity('')
                                            setimageCelebrity('')
                                            setMerge(false)
                                            setError('')
                                        }}
                                            className="webcam-btn">
                                            Retake Image</button>
                                    </div>
                                :
                                    <div>
                                        <button className="webcam-btn" onClick={(e) => {
                                            setDone(false);
                                            mergeImage()
                                            setMerge(true)
                                        }}>Merge</button>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            setImage('')
                                            setnameCelebrity('')
                                            setimageCelebrity('')
                                            setMerge(false)
                                            setError('')
                                        }}
                                            className="webcam-btn">
                                            Retake Image</button>
                                    </div>
                                }

                            </div>
                            :
                            <div>
                                <button onClick={(e) => {
                                    setDone(false);
                                    setnameCelebrity('')
                                    setimageCelebrity('')
                                    uploadHandler()
                                }} className="webcam-btn">Send Image</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setImage('')
                                    setnameCelebrity('')
                                    setMerge(false)
                                    setError('')
                                }}
                                    className="webcam-btn">
                                    Retake Image</button>
                            </div>
                        } </div> :
                    <button onClick={(e) => {
                        e.preventDefault();
                        capture();

                    }}
                        className="webcam-btn">Capture</button>
                }
            </div>
        </div>

    );
};
export default WebcamCapture;