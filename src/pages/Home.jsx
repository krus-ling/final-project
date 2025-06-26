import './Home.css';
import { useNavigate } from "react-router-dom";
import { CARDS } from "../components/Card/cards.js";
import Card from "../components/Card/Card.jsx";
import LoadingField from "../components/LoadingField/LoadingField.jsx";
import { useState } from "react";

const Home = () => {
    const [pendingFiles, setPendingFiles] = useState([]);
    const [fileName, setFileName] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const navigate = useNavigate();

    const handleFileSelected = (files) => {
        const file = files[0];
        setPendingFiles([file]);
        setFileName(file.name);
        setIsLoading(true);

        // Ждём окончания "загрузки"
        setTimeout(() => {
            setIsLoading(false);
            setIsFadingOut(true); // включаем анимацию затухания
            setTimeout(() => {
                navigate("/chat", { state: { uploadedFiles: [file] } });
            }, 300); // время совпадает с CSS-переходом
        }, 1500);
    };

    const handleStartAnalysis = () => {
        if (pendingFiles.length > 0) {
            navigate("/chat", { state: { uploadedFiles: pendingFiles } });
        } else {
            navigate("/chat");
        }
    };

    return (
        <div className={`content ${isFadingOut ? 'fade-out' : ''}`}>
            <div className={'description'}>
                <h1>AI - анализ и рефакторинг кода</h1>
                <p>загрузите свой код и получите анализ,<br/>улучшения и рекомендации - прямо в браузере</p>
                <button onClick={handleStartAnalysis}>
                    Начать анализ
                </button>
            </div>

            <div className={'cards-container'}>
                <h2>Возможности</h2>
                <div className={'cards-grid'}>
                    {CARDS.map((card) => (
                        <Card
                            key={card.id}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                        />
                    ))}
                </div>
            </div>

            <div className={'input-field'}>
                <h2>Загрузите свой код</h2>
                <LoadingField
                    onFileSelected={handleFileSelected}
                    fileName={fileName}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default Home;
