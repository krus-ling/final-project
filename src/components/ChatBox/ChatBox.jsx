import './ChatBox.css';
import { useRef, useState } from "react";
import ChatToolbar from '../ChatToolbar/ChatToolbar.jsx';

const ChatBox = () => {
    const fileInputRef = useRef(null);
    const dragCounter = useRef(0);

    const [isSendActive, setIsSendActive] = useState(false);
    const [activeIcon, setActiveIcon] = useState(null);
    const [isDragActive, setIsDragActive] = useState(false);

    const toggleActiveIcon = (name) => {
        setActiveIcon((prev) => (prev === name ? null : name));
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setIsSendActive(true);
        }
    };

    // DnD handlers
    const handleDrop = (e) => {
        e.preventDefault();
        dragCounter.current = 0;
        setIsDragActive(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setIsSendActive(true);
            console.log('dropped files', files);
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
        console.log('Отправка файлов...');
    };

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
                    onIconClick={toggleActiveIcon}
                    isSendActive={isSendActive}
                    onSend={handleSend}
                    onUpload={handleUploadClick}
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
