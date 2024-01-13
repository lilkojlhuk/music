import React, { RefObject, useRef } from 'react'
import st from './FileUpload.module.scss'

interface FileUploadProps {
    setFile: Function;
    accept: string;
    children: any;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children }) => {
    const ref: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0]
        if (selectedFile) {
            setFile(selectedFile)
        }
    }

    return (
        <div onClick={() => ref.current?.click()}>
            <input
                type="file"
                accept={accept}
                className={st.input}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    )
}

export default FileUpload