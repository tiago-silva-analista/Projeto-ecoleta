import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import './styles.css';
import { FiUpload } from 'react-icons/fi';

interface Props{
    onFileUploaded: (file: File) => void;
}

const Dropzone : React.FC<Props> = ({onFileUploaded}) => {
    const [selectedFile, setSelectedFile] = useState("");

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFile(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept= "image/*" />
            {
                selectedFile 
                ? <img src={selectedFile} alt="Point thumbnail" />
                : (
                    <p>
                    <FiUpload />
                    Imagem do Estabelecimento ...
                </p>
                )
            }
           
        </div>
    )
}

export default Dropzone;