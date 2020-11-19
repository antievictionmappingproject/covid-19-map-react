import React from 'react'
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { isMobile } from "../utils/constants";

export default (props) => {
  const showTitlebox = useSelector(state => state.ui.showTitlebox)
  const { t } = useTranslation();

  return(
    <header id="aemp-titlebox">
      <details open={!isMobile()}>
        <h1 id="aemp-title" dangerouslySetInnerHTML={{__html: t("titlebox.title")}}></h1>
        <summary dangerouslySetInnerHTML={{__html: t("titlebox.about-map")}}></summary>
        <div class="title-content-wrapper">
          <h2 dangerouslySetInnerHTML={{__html: t("titlebox.about-protections")}}></h2>
          <p dangerouslySetInnerHTML={{__html: t("titlebox.about-description")}}></p>

          <div class="legendgrid">
            {/* <!-- Few protections --> */}
            <div class="legendbox scale3"></div>
            <p class="legendlabel" dangerouslySetInnerHTML={{__html: t("policy-strength.3")}}></p>
            {/* <!-- Some protections --> */}
            <div class="legendbox scale2"></div>
            <p class="legendlabel" dangerouslySetInnerHTML={{__html: t("policy-strength.2")}}></p>
            {/* <!-- Most protections --> */}
            <div class="legendbox scale1"></div>
            <p class="legendlabel" dangerouslySetInnerHTML={{__html: t("policy-strength.1")}}></p>
            {/* <!-- Missing Data --> */}
            <div class="legendbox missingdata"></div>
            <p
              class="legendlabel"
              dangerouslySetInnerHTML={{__html: t("policy-strength.missingData")}}
            ></p>
            {/* <!-- Expired --> */}
            <div class="legendbox expired"></div>
            <p class="legendlabel" dangerouslySetInnerHTML={{__html: t("policy-strength.expired")}}></p>
            {/* <!-- Icons --> */}
            <div class="legendbox-icons">
              <div class="rent-strike-icon"></div>
              <svg width="40" height="40">
                <circle cx="20" cy="20" r="20"></circle>
                <text x="12" y="25" class="cluster-svg-text">19</text>
              </svg>
            </div>
            <p
              class="legendlabel"
              dangerouslySetInnerHTML={{__html: t("layer-select.housingJusticeAction")}}
            ></p>
          </div>

          <div class="legendgrid submissions">
            {/* <!-- Submit Header --> */}
            <h3 dangerouslySetInnerHTML={{__html: t("titlebox.submit")}}></h3>

            {/* <!-- Resources Header --> */}
            <h3 dangerouslySetInnerHTML={{__html: t("titlebox.resources.title")}}></h3>

            {/* <!-- Submission --> */}
            <p>
              <a href= "https://airtable.com/shrMi8xtGqFIXtFyy"
                target="_blank"
                dangerouslySetInnerHTML={{__html: t("titlebox.legislation-form-intl")}}
              ></a>
            </p>

            {/* <!-- Resource --> */}
            <p>
              <a
                href="https://cancelrent.us/"
                target="_blank"
                dangerouslySetInnerHTML={{__html: t("titlebox.resources.right-to-the-city")}}
              ></a>
            </p>

            {/* <!-- Submission --> */}
            <p>
              <a
                href="https://airtable.com/shrI5HxbTqEFbk89Y"
                target="_blank"
                dangerouslySetInnerHTML={{__html: t("titlebox.housing-action-form")}}
              ></a>
            </p>
      
            {/* <!-- Resource --> */}
            <p>
              <a
                href="https://housingnotprofit.org/"
                target="_blank"
                dangerouslySetInnerHTML={{__html: t("titlebox.resources.hashtag-cancel-rent")}}
              ></a>
            </p>
            
            {/* <!-- Submission --> */}
            <p>
            </p>

            {/* <!-- Logo --> */}
            <a
              href="https://antievictionmap.com/"
              dangerouslySetInnerHTML={{__html: t("titlebox.aemp-name")}}
              class="aemp-logo"
            ></a>
          </div>
        </div>
      </details>
    </header>
  )
}