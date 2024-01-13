import FileUpload from '@/components/FileUpload/FileUpload'
import MainLayout from '@/layouts/MainLayout'
import React, { useState } from 'react'
import { IoMdDownload } from "react-icons/io"
import { FaFileImage } from "react-icons/fa"
import { MdAudiotrack } from "react-icons/md"
import st from './InfoTracks.module.scss'
import { useInput } from '@/hooks/useInputs'
import axios from 'axios'
import { useRouter } from 'next/router'

const Create: React.FC = () => {
    const [picture, setPicture] = useState<File | null>(null)
    const [audio, setAudio] = useState<File | null>(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    const handlerClick = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)

            if (picture) formData.append('picture', picture)
            if (audio) formData.append('audio', audio)

            await axios.post('http://localhost:5000/tracks/add', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e))
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <MainLayout title='Страница создания трека'>
            <div className="container">
                <div className={st.line__up} />
                <div className={st.info}>
                    <input type="text" placeholder='Название трека' className={st.input} {...name} />
                    <input type="text" placeholder='Артист' className={st.input} {...artist} />
                    <input type="text" placeholder='Слова к треку' className={st.input} {...text} />
                </div>
                <div className={st.line} />
                <FileUpload setFile={setPicture} accept='image/*'>
                    <div className={st.btn}>
                        <button className={st.btn__img}> <FaFileImage /> <IoMdDownload /> </button>
                    </div>
                </FileUpload>
                <div className={st.line} />
                <FileUpload setFile={setAudio} accept='audio/*'>
                    <div className={st.btn}>
                        <button className={st.btn__img}> <MdAudiotrack /> <IoMdDownload /> </button>
                    </div>
                </FileUpload>
                <div className={st.line} />
                <div className={st.btn}>
                    <button className={st.btn__send} onClick={handlerClick}>Загрузить</button>
                </div>
            </div>
        </MainLayout>
    )
}

export default Create