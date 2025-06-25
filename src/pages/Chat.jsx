import {useNavigate} from "react-router-dom";
import './Chat.css'

function Chat() {

    const navigate = useNavigate();

    return (
        <>
            <h1>Chat</h1>
            <button onClick={() => navigate("/")}>
                Назад
            </button>
            <button onClick={() => navigate("/test")}>
                Тест
            </button>
            <div className={'chat'}>
                Dialog
            </div>
        </>

    );
}

export default Chat;
