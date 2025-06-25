import {useNavigate} from "react-router-dom";
import Card from "../components/Card/Card.jsx";
import {CARDS} from "../components/Card/cards.js";
import './Test.css';
import Input from "../components/LoadingField/LoadingField.jsx";

function Test() {

    const navigate = useNavigate();

    return (
        <>
            <h1>Тест</h1>
            <button onClick={() => navigate("/chat")}>
                Назад
            </button>
            <Input />
        </>

    );
}

export default Test;
