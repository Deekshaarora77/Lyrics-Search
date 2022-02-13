import React, { useEffect, useState } from "react";

const Modal = ({ setIsOpen, modalState }) => {
    const [lyrics, setLyrics] = useState("")
    const fetchLyrics = async () => {
        const res = await fetch(`https://api.lyrics.ovh/v1/${modalState.artist}/${modalState.song}`)
        const status = res.status
        if (status === 404) {
            setLyrics(<><img className="errorMessage" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/d7e893109649775.5fd8be208ede7.jpg" /><p>Lyrics not found for this song :(</p></>)
            return
        }
        const result = await res.json()
        const newLyrics = result.lyrics.split('\n').map(str => <p>{str}</p>)
        setLyrics(newLyrics)
    }
    useEffect(() => {
        fetchLyrics()
    }, [])

    return (
        <>
            <button className="modButton" onClick={() => setIsOpen(false)} >X</button>
            <div className="modalx">
                <div className="lyrics">
                    <p>{lyrics}</p>
                </div >
            </div>
        </>
    );
};

export default Modal;