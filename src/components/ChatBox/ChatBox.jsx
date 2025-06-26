import './ChatBox.css';
import {useEffect, useRef, useState} from "react";
import ChatToolbar from '../ChatToolbar/ChatToolbar.jsx';

const ChatBox = ({
                     onFileSelected,
                     onSend,
                     selectedModes,
                     setSelectedModes,
                     initialFiles = [],
                     isSent
}) => {
    const fileInputRef = useRef(null);
    const dragCounter = useRef(0);

    const [isSendActive, setIsSendActive] = useState(false);
    const [activeIcon, setActiveIcon] = useState(null);
    const [isDragActive, setIsDragActive] = useState(false);

    const [uploadedFiles, setUploadedFiles] = useState([]); // пока не используется, поэтому подчеркивается красным
    const [isLoading, setIsLoading] = useState(false);

    const [activeIcons, setActiveIcons] = useState([]);



    const toggleActiveIcon = (name) => {
        setActiveIcon((prev) => (prev === name ? null : name));
    };

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            simulateUpload(files);
        }
    };

    // DnD handlers
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
        if (onSend) {
            onSend();
        }

    };

    // Имитация загрузки
    const simulateUpload = (files) => {
        setIsLoading(true);
        setIsSendActive(false);
        setUploadedFiles(prevFiles => [...prevFiles, ...files]);

        if (onFileSelected) {
            onFileSelected(files); // передаём наверх
        }

        setTimeout(() => {
            setIsSendActive(true);
            setIsLoading(false);
        }, 1500); // 1 секунда "загрузки"
    };

    useEffect(() => {
        setIsSendActive(uploadedFiles.length > 0);
    }, [uploadedFiles]);

    useEffect(() => {
        if (initialFiles.length > 0) {
            simulateUpload(initialFiles);
        }
    }, [initialFiles]);

    return (
        <div className={`chat-box ${isDragActive ? 'drag-active' : ''}`}
             onDrop={handleDrop}
             onDragEnter={handleDragEnter}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeave}
        >
            <div className="chat-input">
                {/* Всегда видимая фраза */}
                <span className="chat-hint">
                    <span className="chat-hint-title">CodePulse</span> готов к действию.  Добавь свой файл.
                </span>

                <ChatToolbar
                    activeIcon={activeIcon}
                    onIconClick={toggleActiveIcon}
                    isSendActive={!isSent && isSendActive && uploadedFiles.length > 0}
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
