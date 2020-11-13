import React from "react";
import { useSelector } from "react-redux";

export default (props) => {
  const showLoadingIndicator = useSelector(
    (state) => state.ui.showLoadingIndicator
  );
  
  //   the loading container
  if (!showLoadingIndicator) {
    return null;
  }
  return (
    <div id="loading-container">
      <div id="loader"></div>
    </div>
  );
};

// export class LoadingIndicator {
//   loadingContainer = document.getElementById("loading-container");

//   constructor() {
//     this.bindListeners();
//   }

//   bindListeners() {
//     dispatch.on("show-loading-indicator", this.show);
//     dispatch.on("hide-loading-indicator", this.hide);
//   }

//   show = () => {
//     // the default for the corresponding DOM element is false
//     this.loadingContainer.hidden = false;
//   };

//   hide = () => {
//     this.loadingContainer.hidden = true;
//   };
// }
