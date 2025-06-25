import './Chat.css'
import ChatBox from "../components/ChatBox/ChatBox.jsx";
import LoadingField from "../components/LoadingField/LoadingField.jsx";


function Chat() {

    return (
        <>

            <div className={'page-wrapper'}>
                <div className={'chat-content'}>
                    <div className={'message'}>
                        <h1>Готов к анализу — загрузи свой код!</h1>
                        <p></p>
                    </div>

                    <ChatBox onFileSelected={(files) => console.log(files)} />
                </div>
            </div>

        </>

    );
}

export default Chat;
