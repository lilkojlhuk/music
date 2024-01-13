import React from 'react'
import st from './TrackProgress.module.scss'

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e: any) => void
}

const TrackProgress: React.FC<TrackProgressProps> = ({ left, right, onChange }) => {
    return (
        <div className={st.trackProgress}>
            <input 
                type="range" 
                className={st.trackProgress__input} 
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div className={st.trackProgress__interface}> {left} / {right} </div>
        </div>
    )
}

export default TrackProgress