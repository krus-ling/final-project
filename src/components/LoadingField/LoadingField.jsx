import './LoadingField.css'
import {useRef, useState} from "react";
import FolderUploadIcon from '../../assets/img/folder-upload-icon.svg'

const LoadingField = ({ onFileSelected }) => {

    // состояние для drag
    const inputRef = useRef(null);

    const dragCounter = useRef(0);

    // состояние для  индикатора загрузки файла
    const [isLoading, setIsLoading] = useState(false);

    const [isDragActive, setIsDragActive] = useState(false);

    const [filesCount, setFilesCount] = useState(0); // добавляем состояние для кол-ва файлов

    const handleDrop = (e) => {
        e.preventDefault();
        dragCounter.current = 0; // сброс счетчика при отпускании файла
        setIsDragActive(false); // сбрасываем

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setFilesCount(prev => prev + files.length);
            setIsLoading(true); // спиннер появляется только тут
            onFileSelected(files);
            setTimeout(() => setIsLoading(false), 1500) // ЗАГЛУШКА ДЛЯ ЗАГРУЗКИ
        }
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setFilesCount(prev => prev + files.length);
            setIsLoading(true);
            dragCounter.current = 0;  // сброс счетчика при выборе через диалог
            setIsDragActive(false);
            onFileSelected(files);
            setTimeout(() => setIsLoading(false), 1500) // ЗАГЛУШКА ДЛЯ ЗАГРУЗКИ
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        dragCounter.current++;
        if (dragCounter.current === 1) {
            setIsDragActive(true); // подсветка при первом входе в зону
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // обязательно, чтобы позволить drop
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        dragCounter.current--;
        if (dragCounter.current === 0) {
            setIsDragActive(false); // убираем подсветку, когда полностью вышли из зоны
        }
    };

    return (
        <div className="dropzone-wrapper">
            <div className={'dropzone-padding'}>
                <div
                    className={`dropzone ${isDragActive ? 'drag-active' : ''}`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onClick={handleClick}
                >
                    <img src={FolderUploadIcon} alt="Upload icon" className="upload-icon" />
                    <p className="drop-text">Перетащите свой файл или папку сюда</p>

                    {/* При загрузке показываем спиннер, иначе — кнопку */}
                    <div className={'upload-control'}>
                        {isLoading ? (
                            <div className={'spinner'}></div>
                        ) : (
                            <button className="upload-button">Выбрать файл/архив</button>
                        )}
                    </div>

                    {/* Подпись под кнопкой */}
                    {isLoading ? (
                        <p className="files-count-text">Файлы загружаются, подождите...</p>
                    ) : (
                        filesCount > 0 && (
                            <p className="files-count-text">Файлов загружено: {filesCount}</p>
                        )
                    )}

                    <input
                        type="file"
                        ref={inputRef}
                        style={{ display: 'none' }}
                        multiple
                        onChange={handleFileChange}
                        accept=".py,.js,.ts,.java,.cpp,.go,.zip"
                    />
                    <p className="supported-text">Поддерживается Python, Java, JavaScript/TypeScript, C++, Go</p>
                </div>
            </div>
            <p className="local-note">Файл анализируется локально в рамках сессии</p>
        </div>
    );
}

export default LoadingField;
