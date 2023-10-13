/* eslint-disable react/prop-types */
import { useDropzone } from "react-dropzone";
import { DropzoneContainer } from "./styles";

function InputDropZone({ sendFile, acceptedFileType, width, height }) {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedFileType,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      sendFile(file);
    },
  });

  return (
    <DropzoneContainer {...getRootProps()} width={width} height={height}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Solte o arquivo aqui...</p>
      ) : (
        <p>Arraste e solte o arquivo aqui ou clique para selecionar.</p>
      )}
    </DropzoneContainer>
  )
}

export default InputDropZone;