import {useNavigate} from "react-router-dom";

function Chat() {

    const navigate = useNavigate();

    return (
        <>
            <h1>Chat</h1>
            <button onClick={() => navigate("/")}>
                Назад
            </button>
        </>

    );
}

export default Chat;
