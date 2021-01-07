import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from '../config/constants';

export default props => {
  const [expanded, setExpanded] = useState(!isMobile());
  const { t } = useTranslation();

  return (
    <header
      id="aemp-titlebox"
      className={expanded ? '' : 'collapsed aemp-titlebox-closed'}
    >
      <div
        className={`summary${expanded ? '' : ' collapsed'}`}
        onClick={() => setExpanded(!expanded)}
      >
        {t('titlebox.about-map')}
      </div>
      {expanded && (
        <div className="details">
          <h1 id="aemp-title">{t('titlebox.title')}</h1>
          <div className="title-content-wrapper">
            <h2>{t('titlebox.about-protections')}</h2>
            <p>{t('titlebox.about-description')}</p>

            <div className="legendgrid">
              {/* <!-- Few protections --> */}
              <div className="legendbox scale3"></div>
              <p className="legendlabel">{t('policy-strength.3')}</p>
              {/* <!-- Some protections --> */}
              <div className="legendbox scale2"></div>
              <p className="legendlabel">{t('policy-strength.2')}</p>
              {/* <!-- Most protections --> */}
              <div className="legendbox scale1"></div>
              <p className="legendlabel">{t('policy-strength.1')}</p>
              {/* <!-- Missing Data --> */}
              <div className="legendbox missingdata"></div>
              <p className="legendlabel">{t('policy-strength.missingData')}</p>
              {/* <!-- Expired --> */}
              <div className="legendbox expired"></div>
              <p className="legendlabel">{t('policy-strength.expired')}</p>
              {/* <!-- Icons --> */}
              <div className="legendbox-icons">
                <div className="rent-strike-icon"></div>
                <svg width="40" height="40">
                  <circle cx="20" cy="20" r="20"></circle>
                  <text x="12" y="25" className="cluster-svg-text">
                    19
                  </text>
                </svg>
              </div>
              <p className="legendlabel">
                {t('layer-select.housingJusticeAction')}
              </p>
            </div>

            <div className="legendgrid submissions">
              {/* <!-- Submit Header --> */}
              <h3>{t('titlebox.submit')}</h3>

              {/* <!-- Resources Header --> */}
              <h3>{t('titlebox.resources.title')}</h3>

              {/* <!-- Submission --> */}
              <p>
                <a
                  href="https://airtable.com/shrMi8xtGqFIXtFyy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('titlebox.legislation-form-intl')}
                </a>
              </p>

              {/* <!-- Resource --> */}
              <p>
                <a
                  href="https://cancelrent.us/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('titlebox.resources.right-to-the-city')}
                </a>
              </p>

              {/* <!-- Submission --> */}
              <p>
                <a
                  href="https://airtable.com/shrI5HxbTqEFbk89Y"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('titlebox.housing-action-form')}
                </a>
              </p>

              {/* <!-- Resource --> */}
              <p>
                <a
                  href="https://housingnotprofit.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('titlebox.resources.hashtag-cancel-rent')}
                </a>
              </p>

              {/* <!-- Submission --> */}
              <p></p>

              {/* <!-- Logo --> */}
              <a href="https://antievictionmap.com/" className="aemp-logo">
                {t('titlebox.aemp-name')}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
