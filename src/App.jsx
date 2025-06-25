import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx';
import Test from "./pages/Test.jsx";
import Logo from "./assets/img/logo.svg";

function App() {

  return (
    <>
        <div className={'header'}>
            <img src={Logo} alt={'CodePulse'} className={'logo'} />
        </div>

        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'chat'} element={<Chat />} />
            <Route path={'test'} element={<Test />} />
        </Routes>
    </>
  );
}

export default App
