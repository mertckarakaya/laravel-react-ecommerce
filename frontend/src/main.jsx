//import { StrictMode } from 'react' // sadece development modda kullanılır
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.jsx";
import { Provider } from "react-redux";
import { Layout } from './layouts/Layout.jsx'
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";



createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <App />
      </Layout>
    </Provider>
  </BrowserRouter>
);
