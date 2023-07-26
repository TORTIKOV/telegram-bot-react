import React, { useEffect } from 'react';
import { useTelegram } from "./hooks/useTelegram";
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import ozon from './components/ProductDetails/ozon/ozon';
import wb from './components/ProductDetails/wb/wb';
import andreyka from './components/ProductDetails/andreyka/andreyka';
import lenta from './components/ProductDetails/lenta/lenta';

const tg = window.Telegram.WebApp;

function App() {
    const { onToggleButton, tg } = useTelegram();

    useEffect(() => {
        tg.ready();
    }, []);

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route index element={<ProductList />} />
                <Route path={'/form'} element={<Form />} />
                <Route path={'/:productId'} element={<ozon />} />
                <Route path={'/:productId'} element={<wb />} />
                <Route path={'/:productId'} element={<andreyka />} />
                <Route path={'/:productId'} element={<lenta />} />
            </Routes>
        </div>
    );
}

export default App;