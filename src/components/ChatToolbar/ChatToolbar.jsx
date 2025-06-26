import './ChatToolbar.css'
import PlusIcon from '../../assets/img/add-icon.svg';
import CompareIcon from '../../assets/img/icon1.svg';
import CriticismIcon from '../../assets/img/icon2.svg';
import RefactoringIcon from '../../assets/img/icon3.svg';
import SecurityIcon from '../../assets/img/icon4.svg';
import SendIcon from '../../assets/img/send-icon.svg';

import ChatOptionIcon from "../ChatOptionIcon/ChatOptionIcon.jsx";
import {useState} from "react";

const ChatToolbar = ( {
                          isSendActive,
                          onSend,
                          onUpload,
                          isLoading,
                          activeIcons = [],
                          setActiveIcons = () => {}
} ) => {

    const [isPlusActive, setIsPlusActive] = useState(false);

    const handleIconClick = (name) => {
        if (name === 'plus') {
            setIsPlusActive(true); // временно активируем
            onUpload(); // вызываем загрузку (окно выбора)

            // через 300 мс убираем выделение
            setTimeout(() => setIsPlusActive(false), 200);

            return; // не активируем иконку "плюс"
        }

        setActiveIcons((prev) =>
            prev.includes(name)
                ? prev.filter((n) => n !== name) // убираем из активных
                : [...prev, name] // добавляем в активные
        );
    };

    return (
        <div className={'chat-footer'}>
            <div className={'chat-icons'}>

                <ChatOptionIcon
                    icon={PlusIcon}
                    name={'plus'}
                    title={'Загрузить файл'}
                    active={isPlusActive}
                    onClick={handleIconClick}
                />
                <ChatOptionIcon
                    icon={CompareIcon}
                    name={'compare'}
                    title={'Умное сравнение'}
                    active={activeIcons.includes('compare')}
                    onClick={handleIconClick}
                />
                <ChatOptionIcon
                    icon={CriticismIcon}
                    name={'criticism'}
                    title={'Критика архитектуры'}
                    active={activeIcons.includes('criticism')}
                    onClick={handleIconClick}
                />
                <ChatOptionIcon
                    icon={RefactoringIcon}
                    name={'refactoring'}
                    title={'ИИ-рефакторинг'}
                    active={activeIcons.includes('refactoring')}
                    onClick={handleIconClick}
                />
                <ChatOptionIcon
                    icon={SecurityIcon}
                    name={'security'}
                    title={'Анализ безопасности'}
                    active={activeIcons.includes('security')}
                    onClick={handleIconClick}
                />

            </div>

            <div className="send-button-wrapper">
                {isLoading ? (
                    <div className="spinner"></div>
                ) : (
                    <button
                        className={`chat-send-button ${isSendActive ? 'active' : 'disabled'}`}
                        disabled={!isSendActive}
                        onClick={onSend}
                        title={'Отправить'}
                    >
                        <img src={SendIcon} alt="Отправить" />
                    </button>
                )}
            </div>

        </div>
    );
};

export default ChatToolbar;
