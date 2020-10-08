import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import i18n, { i18nInit } from "../utils/i18n";

function App() {
  const i18nLoaded = useSelector(state => state.content.i18n)
  const showModal = useSelector(state => state.ui.showModal)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const i18nData = await i18nInit()
    })()
    return () => null
  }, [])

  return ( i18nLoaded
    ? <div className="App">
        <div style={{position: "absolute", zIndex: 1000}}>
          <button onClick={e => i18n.changeLanguage('en')}>ENGLISH</button>
          <button onClick={e => i18n.changeLanguage('es')}>SPANISH</button>
          <button onClick={e => i18n.changeLanguage('de')}>GERMAN</button>
          <button onClick={e => i18n.changeLanguage('it')}>ITALIAN</button>
          <button onClick={e => i18n.changeLanguage('pt-BR')}>PORTUGUESE</button>
        </div>
        { showModal ? <Modal /> : null }
      </div>
    : null
  );
}

export default App;
