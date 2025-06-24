import './App.css'
import Logo from './assets/img/logo.svg'
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx';

function App() {

  return (
    <>

        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'chat'} element={<Chat />} />
        </Routes>
    </>
  );
}

export default App
