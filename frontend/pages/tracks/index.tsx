import TrackList from '@/components/TrackList/TrackList'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import MainLayout from '@/layouts/MainLayout'
import { NextThunkDispatch, wrapper } from '@/store'
import { fetchTracks, searchTracks } from '@/store/actions-creators/track'
import React, { useEffect, useState } from 'react'
import st from './InfoTracks.module.scss'
import { useDispatch } from 'react-redux'

const Index: React.FC = () => {
    const { tracks, error } = useTypedSelector(state => state.track)
    const [query, setQuery] = useState<string>('')
    const dispatch = useDispatch() as NextThunkDispatch

    useEffect(() => {
        const timerId = setTimeout(async () => {
            await dispatch(await searchTracks(query))
        }, 500)
    
        return () => {
            clearTimeout(timerId)
        }
    }, [query, dispatch])
    
    const search = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        <MainLayout title='Страница списка треков' keywords='Самый лучший плейлист'>
            <div className='container'>
                <div className={st.serch}>
                    <input
                        type="text"
                        placeholder='Поиск'
                        className={st.serch__input}
                        value={query}
                        onChange={search}
                    />
                </div>
                <TrackList tracks={tracks} />
            </div>
        </MainLayout>
    )
}

export default Index

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
    return {
        props: {},
    }
})

