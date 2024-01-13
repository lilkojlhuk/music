import React from 'react'
import { ITrack } from '@/types/track'
import TrackItem from './TrackItem'
import st from './TrackList.module.scss'

interface TrackListProps {
    tracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
    return (
        <section className={st.tracklist}>
            {tracks.map(track => 
                <TrackItem key={track._id} track={track} />
            )}
        </section>
    )
}

export default TrackList