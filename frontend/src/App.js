import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss';
import './scss/custom-bootstrap.scss'
import Home from './screens/Home'
import Header from './components/Header'

function App() {
  return (
    <>
    <Header/>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
