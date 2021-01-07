import React, { useState } from 'react';
import { getSearchData } from '../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';

function SearchBar(props) {
  const { searchTerm, searchResults } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch({ type: 'ui:search:term:set', payload: e.target.value });
    console.log(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <form id="search-bar-form" onSubmit={e => onSubmit(e)}>
      <div id="search-bar-div">
        <input
          onChange={e => onChange(e)}
          type="text"
          name="search"
          id="search-bar"
          aria-label="search"
          value={searchTerm}
          list="search-bar-autocomplete"
          autoComplete="off"
          placeholder="Search nation, state, city..."
        />
        <datalist id="search-bar-autocomplete">{/*options go here*/}</datalist>
      </div>
    </form>
  );
}

export default SearchBar;

// export class SearchBar {
//   searchBar = document.getElementById("search-bar");
//   autoCompleteElement = document.getElementById("search-bar-autocomplete");
//   icon = this.searchBar.value;
//   defaultValue = this.icon + i18next.t("searchbar.default-value");

//   constructor() {
//     this.searchBar.value = this.defaultValue;
//     this.searchBar.addEventListener("input", () =>
//       this.autoComplete(this.searchBar.value)
//     );
//     this.searchBar.addEventListener("blur", this.removeAutocomplete);
//     this.searchBar.addEventListener("focus", () => {
//       this.searchBar.value = "";
//     });
//     this.searchBar.addEventListener("change", (e) => {
//       if (
//         [...document.getElementsByClassName("autocompleteElement")]
//           .map((a) => a.value)
//           .indexOf(this.searchBar.value) >= 0
//       ) {
//         let val = this.searchBar.value;

//         // dispatch.call("choose-autocomplete-element", null, val);
//       }
//       e.stopPropagation();
//     });
//     // dispatch.on("search-fetch-data-reject", (err) => console.error(err));

//     document
//       .getElementById("search-bar-form")
//       .addEventListener("submit", (e) => {
//         let autoselectSuggestions = [
//           ...document.getElementsByClassName("autocompleteElement"),
//         ].map((a) => a.value);
//         if (autoselectSuggestions.length > 0) {
//           //   dispatch.call(
//           //     "choose-autocomplete-element",
//           //     null,
//           //     autoselectSuggestions[0]
//           //   );
//         } else {
//           this.noDataFound();
//         }
//         e.stopPropagation();
//         e.preventDefault();
//       });
//   }

//   noDataFound() {
//     document.getElementById("search-bar").classList.add("search-bar-no-data");
//   }

//   removeAutocomplete = () => {
//     setTimeout(() => {
//       this.autoCompleteElement.innerHTML = "";
//       this.searchBar.value = this.defaultValue;
//       this.removeNoData();
//     }, 400);
//   };

//   async autoComplete(str) {
//     this.removeNoData();
//     if (str.length > 1) {
//       try {
//         const res = await getSearchData(str.trim());
//         if (res && res.resourceSets && res.resourceSets[0].resources) {
//           const values = res.resourceSets[0].resources[0].value.filter(
//             (value) => value.__type === "Place"
//           );
//           this.autoCompleteElement.innerHTML = values
//             .map((value) =>
//               this.autocompleteElement(value.address.formattedAddress)
//             )
//             .join("");
//         }
//       } catch (e) {
//         dispatch.call("search-fetch-data-reject", this, e);
//       }
//     }
//   }

//   removeNoData = () => {
//     if (this.searchBar.classList.contains("search-bar-no-data")) {
//       this.searchBar.classList.remove("search-bar-no-data");
//     }
//   };

//   autocompleteElement(location) {
//     return `
//         <option value="${location}" class = "autocompleteElement">
//     `;
//   }
// }
