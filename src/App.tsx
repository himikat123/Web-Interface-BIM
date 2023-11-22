import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Navbar from './organisms/navbar/navbar';
import LangSwitcher from './organisms/langSwitcher/langSwitcher';

function App() {
    const router = createBrowserRouter([
        { path: "/",     element: <div>Homepage</div>, errorElement: <div>404 Page nui</div> },
        { path: "/lang", element: <LangSwitcher /> },
    ]);

    return (<>
        <Navbar />

        <RouterProvider router={router} />
    </>);
}

export default App;
