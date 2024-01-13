import React from 'react'
import { ITrack } from '@/types/track'
import { IoIosPause } from "react-icons/io"
import { IoPlay } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import { useRouter } from 'next/router'
import { useActions } from '@/hooks/useActions'
import st from './TrackList.module.scss'

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter()
    const { playTrack, pauseTrack, setActiveTrack } = useActions()

    const play = (e: any) => {
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
    }

    return (
        <ul className={st.trackitem__list}>
            <li className={st.trackitem__item} onClick={() => router.push(`/tracks/${track._id}`)}>
                <div className={st.trackitem__info}>
                    <div onClick={play}>
                        {!active
                            ? <IoPlay className={st.trackitem__play} />
                            : <IoIosPause className={st.trackitem__pause} />
                        }
                    </div>
                    <img src={`http://localhost:5000/${track.picture}`} alt="Track image" className={st.trackitem__img} />
                    <div className={st.trackitem__text}>
                        <div className={st.trackitem__title}> {track.name} </div>
                        <div className={st.trackitem__artist}> {track.artist} </div>
                    </div>
                </div>
                <div className={st.trackitem__timer}>
                    <p>2:23 / 3:45</p>
                    <MdDelete onClick={(e: any) => e.stopPropagation()} className={st.trackitem__delete} />
                </div>
            </li>
        </ul>
    )
}

export default TrackItem