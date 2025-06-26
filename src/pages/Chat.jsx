import './Chat.css';
import ChatBox from "../components/ChatBox/ChatBox.jsx";
import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

function Chat() {

    const location = useLocation();

    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [dotCount, setDotCount] = useState(0);
    const [isSent, setIsSent] = useState(false);
    const [files, setFiles] = useState([]);
    const [selectedModes, setSelectedModes] = useState([]);

    const mapModeToTitle = (mode) => {
        switch (mode) {
            case 'compare': return 'Умное сравнение';
            case 'criticism': return 'Критика архитектуры';
            case 'refactoring': return 'ИИ-рефакторинг';
            case 'security': return 'Анализ безопасности';
            default: return mode;
        }
    };

    const handleSend = () => {
        if (files.length === 0) return;

        setIsSent(false);      // Заглушка ещё не должна быть видна
        setIsAnalyzing(true);  // Сначала показываем только "Анализ..."
        console.log("Файлы отправлены:", files);

        // через 3 секунды: скрыть "Анализ", показать заглушку
        setTimeout(() => {
            setIsAnalyzing(false);
            setIsSent(true);
            setFiles([]);
        }, 3000);
    };

    const handleFileSelected = (files) => {
        setFiles(prevFiles => [...prevFiles, ...files]);
        setIsSent(false);          // сбрасываем заглушку
        setIsAnalyzing(false);     // подстраховка
        setDotCount(0);            // сброс точек
        // setSelectedModes([]);   // раскомментируй если хочешь сбрасывать выбор режимов
    };

    const handleModeChange = (modes) => {
        setSelectedModes(modes);
        setIsSent(false); // сбрасываем, чтобы заглушка исчезла при изменении режима
    };


    useEffect(() => {
        if (!isAnalyzing) return;

        const interval = setInterval(() => {
            setDotCount((prev) => (prev + 1) % 4); // 0 → 1 → 2 → 3 → 0
        }, 500);

        return () => clearInterval(interval);
    }, [isAnalyzing]);

    useEffect(() => {
        if (location.state?.uploadedFiles?.length > 0) {
            const incomingFiles = location.state.uploadedFiles;
            setFiles(incomingFiles);
            setIsSent(false);      // сбросить заглушку
            setIsAnalyzing(false); // убедиться что не в анализе
            setDotCount(0);        // сброс точки
        }
    }, [location.state]);

    return (
        <div className={'page-wrapper'}>
            <div className={`chat-content ${isSent ? 'after-send' : ''}`}>

                <div className={`message ${isSent ? 'result' : ''}`}>
                    {!isAnalyzing && !isSent && (
                        <h1 className="fade">Готов к анализу — загрузи свой код!</h1>
                    )}

                    {isAnalyzing && (
                        <h1 className="fade">Анализ{'.'.repeat(dotCount)}</h1>
                    )}

                    {isSent && (
                        <div className="result-placeholder fade">
                            <h1>Результат анализа</h1>
                            {selectedModes.length > 0 ? (
                                <>
                                    <p className={'chat-hint-type'}><span className={'chat-hint-title'}>Тип анализа:</span> {selectedModes.map(mapModeToTitle).join(', ')}</p>
                                    <p className={'generate-text'}>
                                        Практический опыт показывает, что начало повседневной работы по формированию позиции способствует подготовке и реализации позиций, занимаемых участниками в отношении поставленных задач!<br/>

                                        Повседневная практика показывает, что реализация намеченного плана развития представляет собой интересный эксперимент проверки всесторонне сбалансированных нововведений. Практический опыт показывает, что дальнейшее развитие различных форм деятельности способствует подготовке и реализации позиций, занимаемых участниками в отношении поставленных задач.<br/>

                                        Разнообразный и богатый опыт постоянное информационно-техническое обеспечение нашей деятельности способствует подготовке и реализации позиций, занимаемых участниками в отношении поставленных задач?<br/>

                                        Практический опыт показывает, что постоянный количественный рост и сфера нашей активности влечет за собой процесс внедрения и модернизации дальнейших направлений развитая системы массового...<br/>
                                    </p>
                                </>

                            ) : (
                                <p className={'type-none'}>Тип анализа не выбран.</p>
                            )}

                        </div>
                    )}
                </div>

                <ChatBox
                    onFileSelected={handleFileSelected}
                    onSend={handleSend}
                    selectedModes={selectedModes}           // массив активных режимов
                    setSelectedModes={handleModeChange}
                    initialFiles={location.state?.uploadedFiles || []}// функцию для их обновления
                    isSent={isSent}
                />
            </div>
        </div>
    );
}

export default Chat;
