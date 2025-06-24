import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from './pages/Home.jsx';
import Chat from './pages/Chat.jsx';
import Test from "./pages/Test.jsx";

function App() {

  return (
    <>

        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'chat'} element={<Chat />} />
            <Route path={'test'} element={<Test />} />
        </Routes>
    </>
  );
}

export default App
