import React, { FC, useEffect, useState } from 'react'
import { IoIosPause } from 'react-icons/io'
import { IoPlay } from 'react-icons/io5'
import { ITrack } from '@/types/track'
import TrackProgress from '../TrackProgress/TrackProgress'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useActions } from '@/hooks/useActions'
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import st from './Player.module.scss'

let audio: HTMLAudioElement

const Player: React.FC = () => {
    const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
    const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack } = useActions()

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
        } else {
            setAudio()
            play()
        }
    }, [active])

    const setAudio = () => {
        if (active) {
            audio.src = active.audio
            audio.src = `http://localhost:5000/${active.audio}`
            audio.volume = volume / 100

            audio.onloadedmetadata = () => setDuration(Math.ceil(audio.duration))
            audio.ontimeupdate = () => setCurrentTime(Math.ceil(audio.currentTime))
        }
    }

    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    if (!active) {
        return null
    }

    return (
        <div className={st.player}>
            <div className={st.player__left}>
                <div onClick={play}>
                    {pause
                        ? <IoPlay className={st.player__play} />
                        : <IoIosPause className={st.player__pause} />
                    }
                </div>
                <div className={st.trackitem__text}>
                    <div className={st.player__title}> {active?.name} </div>
                    <div className={st.player__artist}> {active?.artist} </div>
                </div>
                <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
            </div>
            <div className={st.player__right}>
                {volume === 0
                    ? <FaVolumeXmark className={st.player__volume} />
                    : <FaVolumeHigh className={st.player__volume} />
                }
                <TrackProgress left={volume} right={100} onChange={changeVolume} />
            </div>
        </div>
    )
}

export default Player