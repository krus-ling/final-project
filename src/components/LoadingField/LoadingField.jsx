import './LoadingField.css';
import { useRef } from "react";
import FolderUploadIcon from '../../assets/img/folder-upload-icon.svg';

const LoadingField = ({ onFileSelected, fileName, isLoading }) => {
    const inputRef = useRef(null);
    const dragCounter = useRef(0);

    const handleDrop = (e) => {
        e.preventDefault();
        dragCounter.current = 0;

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFileSelected([files[0]]);
        }
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            onFileSelected([files[0]]);
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        dragCounter.current++;
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        dragCounter.current--;
    };

    return (
        <div className="dropzone-wrapper">
            <div className={'dropzone-padding'}>
                <div
                    className={`dropzone`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onClick={handleClick}
                >
                    <img src={FolderUploadIcon} alt="Upload icon" className="upload-icon" />
                    <p className="drop-text">Перетащите свой файл или папку сюда</p>

                    <div className={'upload-control'}>
                        {isLoading ? (
                            <div className={'spinner'}></div>
                        ) : (
                            <button className="upload-button">Выбрать файл/архив</button>
                        )}
                    </div>

                    {isLoading ? (
                        <p className="files-count-text">Файл загружается, подождите...</p>
                    ) : (
                        fileName && (
                            <p className="files-count-text">Файл/архив загружен: {fileName}</p>
                        )
                    )}

                    <input
                        type="file"
                        ref={inputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept=".py,.js,.ts,.java,.cpp,.go,.zip"
                    />
                    <p className="supported-text">Поддерживается Python, Java, JavaScript/TypeScript, C++, Go</p>
                </div>
            </div>
            <p className="local-note">Файл анализируется локально в рамках сессии</p>
        </div>
    );
};

export default LoadingField;
