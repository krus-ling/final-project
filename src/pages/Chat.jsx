import {useNavigate} from "react-router-dom";
import './Chat.css'
import ChatBox from "../components/ChatBox/ChatBox.jsx";


function Chat() {

    const navigate = useNavigate();

    return (
        <>



            <div className={'page-wrapper'}>
                <div className={'content'}>
                    <button onClick={() => navigate("/")}>
                        <h1>Chat</h1>
                        Назад
                    </button>

                    <h1>Готов к анализу — загрузи свой код!</h1>

                    <ChatBox />
                </div>
            </div>

        </>

    );
}

export default Chat;
