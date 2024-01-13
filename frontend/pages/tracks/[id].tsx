import MainLayout from '@/layouts/MainLayout'
import { ITrack } from '@/types/track'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'
import st from './InfoTracks.module.scss'
import { IoIosArrowRoundBack } from "react-icons/io"
import { useRouter } from 'next/router'
import { useInput } from '@/hooks/useInputs';

interface TrackPageProps {
    serverTrack: ITrack;
}

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {
    const [track, setTrack] = useState(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment/add', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({ ...track, comments: [...track.comments, response.data] })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <MainLayout title='Страница трека'>
            <div className="container">
                <IoIosArrowRoundBack className={st.trackitempage__back} onClick={() => router.push(`/tracks/`)} />
                <ul className={st.trackitempage__list}>
                    <li className={st.trackitempage__item}>
                        <img src={`http://localhost:5000/${track.picture}`} alt="Image track" className={st.trackitempage__img} />
                    </li>
                    <li className={st.trackitempage__item}>
                        <h1 className={st.trackitempage__title}>Название трека: {track.name}</h1>
                        <h2 className={st.trackitempage__descr}>Исполнитель: {track.artist}</h2>
                        <h3 className={st.trackitempage__listens}>Прослушивания: {track.listens}</h3>
                    </li>
                </ul>
                <div className={st.trackitempage__words}>
                    <h2 className={st.trackitempage__title}>Слова песни</h2>
                    <p className={st.trackitempage__subwords}>{track.text}</p>
                </div>

                <div className={st.trackitempage__comments}>
                    <h2 className={st.trackitempage__title}>Комментарии</h2>
                    <div className={st.trackitempage__inputs}>
                        <input
                            type="text"
                            placeholder='Name'
                            className={st.trackitempage__input}
                            {...username}
                        />
                        <input
                            type="text"
                            placeholder='Description'
                            className={st.trackitempage__input}
                            {...text}
                        />
                    </div>
                    <div className={st.trackitempage__button}>
                        <button className={st.trackitempage__btn} onClick={addComment}>Отправть</button>
                    </div>
                    {track.comments.map(comment =>
                        <div>
                            <h2 className={st.trackitempage__name}>Имя: {comment.username}</h2>
                            <p className={st.trackitempage__text}>Текст: {comment.text}</p>
                        </div>
                    )}
                    <p className={st.trackitempage__subcomment}></p>
                </div>
            </div>
        </MainLayout>
    )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    if (!params || typeof params.id !== 'string') {
        return {
            props: {
                serverTrack: null,
            },
        }
    }

    const response = await axios.get(`http://localhost:5000/tracks/all/${params.id}`)

    return {
        props: {
            serverTrack: response.data,
        },
    }
}