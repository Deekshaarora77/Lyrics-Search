import React, { useState } from 'react';
import Modal from './Modal.js'
import {FiSearch} from 'react-icons/fi'
const Content = () => {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const [IsOpen, setIsOpen] = useState(false);
    const [modalState, setModalState] = useState({})
    const fetchData = async () => {
        const res = await fetch(`https://api.lyrics.ovh/suggest/${search}`)
        const result = await res.json()
        setList(result.data)
    }
    

    const DispSong = list.map((d) => {
        return (
            <div className='DisplayData' key={d.id}>
                <div className='img'>
                    <img src={d.album.cover} /></div>
                <h4>Song   : {d.title}</h4>
                <h4>Artist : {d.artist.name}</h4>
                <button className='LyricsButton' onClick={() => {
                    setModalState({artist:d.artist.name,song:d.title})
                    setIsOpen(true)
                }}>
                    Lyrics
                </button>
            </div>
        )
    }
    )

    const value = "";
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!value)
            return;

        value = e.value
        setList(value)
    }



    return (
        <div className='container'>
            {IsOpen && <Modal setIsOpen={setIsOpen} modalState={modalState}/>}
            <form className='searchbar' onSubmit={handleSubmit}>
                <input placeholder='Search song or artist' onChange={(e) => { setSearch(e.target.value) }} value={search} />
                <button onClick={fetchData}><FiSearch/></button>
            </form>
            <div className='dispSong'>
                {DispSong}
            </div>
        </div>
    )
}

export default Content