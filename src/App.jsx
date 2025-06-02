import "./App.css";
//
// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./components/Index";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route index element={<Index />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
