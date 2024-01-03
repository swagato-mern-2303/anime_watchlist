import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { initializeApp } from "firebase/app";
import store from "./store.jsx";
import { Provider } from "react-redux";

const firebaseConfig = {
  apiKey: "AIzaSyA5ycbZHtqx1YuEeQFQxjQJ1Q4jivvgoUE",
  authDomain: "a-for-anime-8eba5.firebaseapp.com",
  projectId: "a-for-anime-8eba5",
  storageBucket: "a-for-anime-8eba5.appspot.com",
  messagingSenderId: "986039017024",
  appId: "1:986039017024:web:40ae63929369ee664409a5",
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
