import Test from "./pages/Test/Test";
import Home from "./pages/Home/Home";
import {Route, Routes} from "react-router-dom";
import Answers from "./pages/Answers/Answers";
import OneUserAnswer from "./pages/OneUserAnswer/OneUserAnswer";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/test/:title' element={<Test/>}/>
            <Route path='/answers' element={<Answers/>}/>
            <Route path='/answer/:title/:name/:id' element={<OneUserAnswer/>}/>
        </Routes>

    </div>
  );
}

export default App;
