import './App.css';
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header"
import {Route, Routes} from 'react-router-dom'
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import Ozon from './components/ProductDetails/ozon/ozon';



const tg = window.Telegram.WebApp;

function App() {
    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

  return (
    <div className="App">
        <Header />
        <Routes>
            <Route index element={<ProductList />}/>
            <Route path={'/form'} element={<Form />}/>
            <Route path={'/:productId'} element={<Ozon />} />
        </Routes>
    </div>
  );
}

export default App;