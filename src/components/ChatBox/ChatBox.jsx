import './ChatBox.css';
import { useEffect, useRef, useState } from "react";
import ChatToolbar from '../ChatToolbar/ChatToolbar.jsx';

const ChatBox = ({
                     onFileSelected,
                     onSend,
                     selectedModes,
                     setSelectedModes
                 }) => {
    const fileInputRef = useRef(null);
    const dragCounter = useRef(0);

    const [isDragActive, setIsDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeIcon, setActiveIcon] = useState(null);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            simulateUpload(files);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        dragCounter.current = 0;
        setIsDragActive(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            simulateUpload(files);
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        dragCounter.current++;
        if (dragCounter.current === 1) {
            setIsDragActive(true);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        dragCounter.current--;
        if (dragCounter.current === 0) {
            setIsDragActive(false);
        }
    };

    const handleSend = () => {
        if (onSend) onSend();
    };

    const simulateUpload = (files) => {
        setIsLoading(true);
        setUploadedFiles(files);
        if (onFileSelected) {
            onFileSelected(files);
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    useEffect(() => {
        // сбрасываем файлы при смене режима
        setUploadedFiles([]);
    }, [selectedModes]);

    return (
        <div className={`chat-box ${isDragActive ? 'drag-active' : ''}`}
             onDrop={handleDrop}
             onDragEnter={handleDragEnter}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeave}
        >
            <div className="chat-input">
                <span className="chat-hint">
                    <span className="chat-hint-title">CodePulse</span> готов к действию. Добавь свой файл.
                </span>

                <ChatToolbar
                    activeIcon={activeIcon}
                    onIconClick={setActiveIcon}
                    isSendActive={uploadedFiles.length > 0}
                    onSend={handleSend}
                    onUpload={handleUploadClick}
                    isLoading={isLoading}
                    activeIcons={selectedModes}
                    setActiveIcons={setSelectedModes}
                />

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleFileChange}
                    accept=".py,.js,.ts,.java,.cpp,.go,.zip"
                />
            </div>
        </div>
    );
};

export default ChatBox;
