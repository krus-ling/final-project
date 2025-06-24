import {useNavigate} from "react-router-dom";
import Card from "../Card/Card.jsx";
import {CARDS} from "../Card/cards.js";
import './Test.css';

function Test() {

    const navigate = useNavigate();

    return (
        <>
            <h1>Тест</h1>
            <button onClick={() => navigate("/")}>
                Назад
            </button>
        </>

    );
}

export default Test;
