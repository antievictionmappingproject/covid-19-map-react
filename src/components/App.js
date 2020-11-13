import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import LoadingIndicator from "./LoadingIndicator";
import InfoWindow from './InfoWindow';
import LeafletMap from "./Map";
import i18n, { i18nInit } from "../utils/i18n";
import { getData } from "../utils/data";

export default () => {
  const i18nLoaded = useSelector((state) => state.content.i18n);
  // const showModal = useSelector((state) => state.ui.showModal);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await i18nInit();
    })();
    return () => null;
  }, []);

  useEffect(() => {
    (async () => {
      const cartoData = await getData();
      dispatch({ type: "data:layers", payload: cartoData });
      dispatch({ type: "ui:loading-indicator:hide" });
    })();

    return () => null;
  }, [dispatch]);
  if (!i18nLoaded) {
    return null;
  }

  return (
    <>
      <LeafletMap />
      {/* <Modal /> */}
      <LoadingIndicator />
      <InfoWindow />
    </>
  );
}

/* <div className="App">
<div style={{ position: "absolute", zIndex: 1000 }}>
  <button onClick={(e) => i18n.changeLanguage("en")}>ENGLISH</button>
  <button onClick={(e) => i18n.changeLanguage("es")}>SPANISH</button>
  <button onClick={(e) => i18n.changeLanguage("de")}>GERMAN</button>
  <button onClick={(e) => i18n.changeLanguage("it")}>ITALIAN</button>
  <button onClick={(e) => i18n.changeLanguage("pt-BR")}>
    PORTUGUESE
  </button>
</div>
{showModal ? <Modal /> : null}
</div>
) */
