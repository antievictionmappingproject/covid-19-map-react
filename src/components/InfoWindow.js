import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default props => {
  const infoWindowFeatureProps = useSelector(
    state => state.ui.infoWindowFeatureProps
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  if (!infoWindowFeatureProps) {
    return null;
  }

  const {
    // Jurisdiction Props
    jurisdictionName,
    jurisdictionTypeI18n,
    range,
    endDateEarliest,
    endDateLegist,
    endDateRentRelief,
    endDateCourt,
    eviction_status,
    policy_summary,
    start,
    end,
    link,
    resource,
    // Action props
    action,
    actionStart,
    location,
    strike_type,
    why,
    resources,
  } = infoWindowFeatureProps;

  console.log(`link is`, link)
  console.log(`resource is`, resource)
  console.log(`infoWindowFeatureProps is`, infoWindowFeatureProps)

  return (
    <div className="aemp-infowindow">
      <span
        className="aemp-infowindow-close"
        onClick={() => {
          dispatch({ type: 'ui:info-window:hide' });
        }}
      >
        ×
      </span>

      <div>
        <p className="infowindow-title">
          <strong>
            {t(`infowindow.${action ? 'action' : 'policy'}.title`)}
          </strong>
        </p>
      </div>

      {action ? (
        // Action template
        <>
          <div>
            <p>
              <strong>{t('infowindow.action.loc-label')}</strong> {location}
            </p>
          </div>
          {strike_type && (
            <div>
              <p>
                <strong>{t('infowindow.action.strike-type-label')}</strong>{' '}
                {strike_type}
              </p>
            </div>
          )}
          {why && (
            <div>
              <p>
                <strong
                  dangerouslySetInnerHTML={{
                    __html: t('infowindow.action.why-label'),
                  }}
                ></strong>{' '}
                {why}
              </p>
            </div>
          )}
          {actionStart && (
            <div>
              <p>
                <strong>{t('infowindow.action.start-date-label')}</strong>{' '}
                {start}
              </p>
            </div>
          )}
          {resources && (
            <div>
              <p>
                <strong
                  dangerouslySetInnerHTML={{
                    __html: t('infowindow.action.resources-label'),
                  }}
                ></strong>{' '}
                {resources}
              </p>
            </div>
          )}
        </>
      ) : (
        // Jurisdiction template
        <>
          {jurisdictionName && (
            <div>
              <p>
                <strong>
                  {t(
                    `infowindow.policy.jurisdictionType.${jurisdictionTypeI18n}`
                  )}
                </strong>
                <strong>: </strong>
                {jurisdictionName}
              </p>
            </div>
          )}

        {/* Policy Strength Removed*/}


          {endDateEarliest && (
            <div>
              <p>
                <strong>{t('infowindow.policy.protections-end-label')}</strong>{' '}
                {endDateEarliest}
              </p>
            </div>
          )}

          {endDateLegist && (
            <div>
              <p>
                <strong>{t('infowindow.policy.legislative-end-label')}</strong>{' '}
                {endDateLegist}
              </p>
            </div>
          )}

          {endDateRentRelief && (
            <div>
              <p>
                <strong>{t('infowindow.policy.rent-relief-end-label')}</strong>{' '}
                {endDateRentRelief}
              </p>
            </div>
          )}

          {endDateCourt && (
            <div>
              <p>
                <strong>
                  {t('infowindow.policy.court-closure-end-label')}
                </strong>{' '}
                {endDateCourt}
              </p>
            </div>
          )}

          {/* Eviction Status Label Removed*/}
          {/*<strong>{t('infowindow.policy.eviction-status-label')}</strong>{' '}*/}

          {eviction_status && (
            <div class = "eviction-status">
              <p>

                {eviction_status}
              </p>
            </div>
          )}

          {policy_summary && (
            <div>
              <p>
                <strong>{t('infowindow.policy.summary-label')}</strong>{' '}
                {policy_summary}
              </p>
            </div>
          )}

          {start && (
            <div>
              <p>
                <strong>{t('infowindow.policy.start-date-label')}</strong>{' '}
                {start}
              </p>
            </div>
          )}

          {end && (
            <div>
              <p>
                <strong>{t('infowindow.policy.end-date-label')}</strong> {end}
              </p>
            </div>
          )}

          {link && (
            <div class = "links">
                <a target="_blank" href={link} rel="noopener noreferrer">
                  {t('infowindow.policy.info-link')}
                </a>
            </div>
          )}

          {resource && (
            <div class = "links">
                <a target="_blank" href={resource} rel="noopener noreferrer">
                  {t('infowindow.policy.resource-link')}
                </a>
            </div>
          )}
        </>
      )}



      {/*TO DO: FIX DATE*/}
      {/*TO DO: CHECK CARTO FOR DATE??*/}
      <div class = "last-update">Last updated: April 20, 2021</div>


    </div>

  );
};
