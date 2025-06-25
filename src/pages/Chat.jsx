import './Chat.css';
import ChatBox from "../components/ChatBox/ChatBox.jsx";
import {useEffect, useState} from "react";

function Chat() {

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [dotCount, setDotCount] = useState(0);
    const [isSent, setIsSent] = useState(false);
    const [files, setFiles] = useState([]);

    const handleSend = () => {
        if (files.length === 0) return;

        setIsSent(false);      // Заглушка ещё не должна быть видна
        setIsAnalyzing(true);  // Сначала показываем только "Анализ..."
        console.log("Файлы отправлены:", files);

        // через 3 секунды: скрыть "Анализ", показать заглушку
        setTimeout(() => {
            setIsAnalyzing(false);
            setIsSent(true);
        }, 3000);
    };

    useEffect(() => {
        if (!isAnalyzing) return;

        const interval = setInterval(() => {
            setDotCount((prev) => (prev + 1) % 4); // 0 → 1 → 2 → 3 → 0
        }, 500);

        return () => clearInterval(interval);
    }, [isAnalyzing]);

    return (
        <div className={'page-wrapper'}>
            <div className={`chat-content ${isSent ? 'after-send' : ''}`}>
                <div className={`message ${isSent ? 'result' : ''}`}>
                    {!isAnalyzing && !isSent && (
                        <h1>Готов к анализу — загрузи свой код!</h1>
                    )}

                    {isAnalyzing && (
                        <h1>Анализ{'.'.repeat(dotCount)}</h1>
                    )}

                    {isSent && (
                        <div className="result-placeholder">
                            <h2>Анализ завершён!</h2>
                            <p>Скоро появятся результаты анализа загруженных файлов.</p>
                        </div>
                    )}
                </div>

                <ChatBox
                    onFileSelected={setFiles}
                    onSend={handleSend}
                />
            </div>
        </div>
    );
}

export default Chat;
