import './ChatToolbar.css'
import PlusIcon from '../../assets/img/add-icon.svg';
import CompareIcon from '../../assets/img/icon1.svg';
import CriticismIcon from '../../assets/img/icon2.svg';
import RefactoringIcon from '../../assets/img/icon3.svg';
import SecurityIcon from '../../assets/img/icon4.svg';
import SendIcon from '../../assets/img/send-icon.svg';

import ChatOptionIcon from "../ChatOptionIcon/ChatOptionIcon.jsx";

const ChatToolbar = ( {activeIcon, onIconClick, isSendActive, onSend, onUpload} ) => {
    return (
        <div className={'chat-footer'}>
            <div className={'chat-icons'}>

                <ChatOptionIcon
                    icon={PlusIcon}
                    name={'plus'}
                    title={'Загрузить файл'}
                    active={activeIcon === 'plus'}
                    onClick={(name) => {
                        onIconClick(name);
                        onUpload();
                    }}
                />
                <ChatOptionIcon
                    icon={CompareIcon}
                    name={'compare'}
                    title={'Умное сравнение'}
                    active={activeIcon === 'compare'}
                    onClick={onIconClick}
                />
                <ChatOptionIcon
                    icon={CriticismIcon}
                    name={'criticism'}
                    title={'Критика архитектуры'}
                    active={activeIcon === 'criticism'}
                    onClick={onIconClick}
                />
                <ChatOptionIcon
                    icon={RefactoringIcon}
                    name={'refactoring'}
                    title={'ИИ-рефакторинг'}
                    active={activeIcon === 'refactoring'}
                    onClick={onIconClick}
                />
                <ChatOptionIcon
                    icon={SecurityIcon}
                    name={'security'}
                    title={'Анализ безопасности'}
                    active={activeIcon === 'security'}
                    onClick={onIconClick}
                />

            </div>

            <button
                className={`chat-send-button ${isSendActive ? 'active' : 'disabled'}`}
                disabled={!isSendActive}
                onClick={onSend}
                title={'Отправить'}
            >
                <img src={SendIcon} alt="Отправить" />
            </button>
        </div>
    );
};

export default ChatToolbar;
