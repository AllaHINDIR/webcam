import { useRecordWebcam } from 'react-record-webcam'
import React, { useState } from 'react'
import axios from 'axios';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import { TiDelete} from "react-icons/ti";

import './WebcameraVideo.css'
import { from } from 'form-data';


function RecordVideo(props) {
    const OPTIONS = {
        filename: "test-filename",
        fileType: "mp4",
        // recordingLength:5
    };
    const recordWebcam = useRecordWebcam(OPTIONS);
    const [imageCelebrity,setimageCelebrity] = useState('')
    const [nameCelebrity,setnameCelebrity] = useState('')
    const [recordDone,setrecodDone] = useState(false)
    const [disableStartButton,setdisableStartButton] = useState(true)
    const [disableStopButton,setdisableStopButton] = useState(true)
    const [listImages,setListImage] = useState([])
    const [videoWithCelebrity,setvideoWithCelebrity] = useState('')
    const [inputext,setInputText] = useState('')



    const saveFile = async () => {
        const blobvideo = await recordWebcam.getRecording();
        let formData = new FormData()
        fetch(recordWebcam.previewRef)
            .then(res => res.blob())
            .then(blob => {
                var file = new File([blob], "video.mp4", {
                    type: 'video/mp4'
                });
                console.log(file)
                formData.append("video",file)
                formData.append("imageurl",imageCelebrity)
                var t0 = performance.now();
                axios.post('http://127.0.0.1:5002/animation_image', formData)
                    .then(function (response, data) {
                        data = response.data;
                        //console.log(data.filedata)
                        if (typeof data.filedata == "undefined") {
                            console.log("coucou shiit undefined ! ")
                            
                        }
                        else {
                          console.log("coucou tt est passé bien ! ")
                        }
                        var t1 = performance.now();
                        console.log("The time it took to predict the image " + (t1 - t0) + " milliseconds.")

                    }).catch(
                        function (error) {
                            console.log(error.message)
        
                        }
                    )
            })
            

      
    };

    const chargeImages = () =>{
        axios.get('http://localhost:5001/imageCelebrity')
            .then(res => {
                setListImage(res.data.list)
            }).catch(function(err){
                console.log(err)
            })
    }

    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    //create a new array by filtering the original array
    const filteredData = listImages.filter((el) => {
        //if no input the return the original
        if (inputext === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.celebrityName.toLowerCase().includes(inputext)
        }
    })

  
    return (
        <div>
            <div className="parent">
                {!recordDone ?
                    <div className="webcam-vdo">
                        <p className="text">Camera status: {recordWebcam.status}</p>
                        {recordWebcam.status == "RECORDING" &&
                            <Timer active={recordWebcam.status == "RECORDING"} onTimeUpdate={console.log}>
                                <Timecode />
                            </Timer>
                        }
                        <video ref={recordWebcam.webcamRef} autoPlay muted />
                    </div> :
                    <div>
                        {imageCelebrity == '' ?
                            <div className="webcam-vdo">
                                <p className="text">Images of celebrities</p>
                                <TextField
                                    id="outlined-basic"
                                    onChange={inputHandler}
                                    variant="outlined"
                                    fullWidth
                                    label="Search the celebrity"
                                />
                                <ImageList sx={{ width: 700, height: 480 }} cols={3}>

                                    {filteredData.map((item) => (
                                        <ImageListItem key={item.image}>
                                            <img
                                                src={`${item.image}?w=248&fit=crop&auto=format`}
                                                srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                alt={item.celebrityName}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                title={item.celebrityName}
                                                onClick={() => { console.log("coucou") }}
                                                actionIcon={
                                                    <IconButton
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                    >
                                                        <button onClick={() => {
                                                            setimageCelebrity(item.image)
                                                            setnameCelebrity(item.celebrityName)
                                                            setInputText('')
                                                        }}>Choisir</button>
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                                <p className="text">Choisissez une célébrité !</p>
                            </div>
                            :
                            <div className="webcam-vdo">
                                <p className="text">Image of celebrity</p>
                                <img className="imageCelebrity" src={imageCelebrity}/>
                                <p className="text">{nameCelebrity}</p>
                                <TiDelete className="delete" onClick={()=>{setnameCelebrity('');setimageCelebrity('')}}/>
                            </div>
                        }
                 
                        <div className="webcam-vdo">
                            <p className="text">Your recording</p>
                            <video ref={recordWebcam.previewRef} autoPlay muted loop />
                        </div>
                    </div>
                }
            </div>

            <div className="parent-btn-vdo">
                {!recordDone ?
                    <div>
                        {disableStartButton ?
                            <div>
                                <button className="webcam-btn-vdo" onClick={(e) => {
                                    recordWebcam.open();
                                    setdisableStartButton(false);
                                }}>Open camera</button>
                            </div>
                            :
                            <div>
                                {recordWebcam.status == "OPEN" && 
                                    <button className="webcam-btn-vdo" onClick={recordWebcam.start} disabled={recordWebcam.status != "OPEN"} >Start recording</button>
                                }
                                {recordWebcam.status == "RECORDING" &&
                                    <button className="webcam-btn-vdo" disabled={recordWebcam.status != "RECORDING"} onClick={(e) => {
                                        recordWebcam.stop();
                                        setrecodDone(true)
                                        setdisableStartButton(true)
                                        chargeImages()
                                       
                                    }}>Stop recording</button>
                                }
                                <button className="webcam-btn-vdo" onClick={(e) =>{
                                    recordWebcam.close();
                                    setdisableStartButton(true)
                                } }>Close camera</button>
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <button className="webcam-btn-vdo" onClick={(e) => {
                            recordWebcam.retake();
                            setrecodDone(false)
                            setdisableStartButton(false)
                            setimageCelebrity('')
                            setnameCelebrity('')
                        }}>Retake recording</button>
                        <button className="webcam-btn-vdo" onClick={() => {
                            recordWebcam.download();
                        }}>Download recording</button>
                        {imageCelebrity !='' &&
                            <button className="webcam-btn-vdo" onClick={saveFile}>Send to server</button>
                        }
                    </div>
                }
            </div>
        </div>
    )
  }
  export default RecordVideo;