import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default props => {
  const infoWindowFeatureProps = useSelector(
    state => state.ui.infoWindowFeatureProps
  );
  const dispatch = useDispatch();

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
    resources
  } = infoWindowFeatureProps;

  return (
    <>
      <h1>Hewwo i'm open</h1>
      <div className="aemp-infowindow">
        <a
          className="aemp-infowindow-close"
          href="#close"
          onClick={() => {
            dispatch({ type: "ui:info-window:hide" });
          }}
        >
          ×
        </a>

        <div>
          <p className="infowindow-title">
            <strong
              data-i18n={`infowindow.${action ? "action" : "policy"}.title`}
            ></strong>
          </p>
        </div>

        {action ? (
          // Action template
          <>
            <div>
              <p>
                <strong data-i18n="infowindow.action.loc-label"></strong>{" "}
                {location}
              </p>
            </div>
            {strike_type && (
              <div>
                <p>
                  <strong data-i18n="infowindow.action.strike-type-label"></strong>{" "}
                  {strike_type}
                </p>
              </div>
            )}
            {why && (
              <div>
                <p>
                  <strong data-i18n="infowindow.action.why-label"></strong>{" "}
                  {why}
                </p>
              </div>
            )}
            {actionStart && (
              <div>
                <p>
                  <strong data-i18n="infowindow.action.start-date-label"></strong>{" "}
                  {start}
                </p>
              </div>
            )}
            {resources && (
              <div>
                <p>
                  <strong data-i18n="infowindow.action.resources-label"></strong>{" "}
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
                  <strong
                    data-i18n={`infowindow.policy.jurisdictionType.${jurisdictionTypeI18n}`}
                  ></strong>
                  <strong>: </strong>
                  {jurisdictionName}
                </p>
              </div>
            )}

            {/* Policy Strength */}
            {range && (
              <div>
                <p>
                  <strong data-i18n="infowindow.policy.strength-label"></strong>
                  <span
                    className={`policy-strength-color policy-strength-color--${range}`}
                    data-i18n={`policy-strength.${range}`}
                  ></span>
                </p>
              </div>
            )}

            {endDateEarliest && (
              <div>
                <p>
                  <strong data-i18n="infowindow.policy.protections-end-label"></strong>{" "}
                  {endDateEarliest}
                </p>
              </div>
            )}

            {endDateLegist && (
              <div>
                <p>
                  <strong data-i18n="infowindow.policy.protections-end-label"></strong>{" "}
                  {endDateLegist}
                </p>
              </div>
            )}

            {endDateRentRelief && (
              <div>
                <p>
                  <strong data-i18n="infowindow.policy.rent-relief-end-label"></strong>{" "}
                  {endDateRentRelief}
                </p>
              </div>
            )}

            {endDateCourt && (
              <div>
                <p>
                  <strong data-i18n="infowindow.policy.court-closure-end-label"></strong>{" "}
                  {endDateCourt}
                </p>
              </div>
            )}

            {eviction_status && (
              <div>
                <p>
                  <strong data-i18n="infowindow.policy.eviction-status-label"></strong>{" "}
                  {eviction_status}
                </p>
              </div>
            )}

            {policy_summary && (
              <div>
                <p>
                  <strong data-i18n="infowindow.policy.summary-label"></strong>{" "}
                  {policy_summary}
                </p>
              </div>
            )}

            {start && (
              <div>
                <p>
                  <strong data-i18n="infowindow.policy.start-date-label"></strong>{" "}
                  {start}
                </p>
              </div>
            )}

            {end && (
              <div>
                <p>
                  <strong data-i18n="infowindow.policy.end-date-label"></strong>{" "}
                  {end}
                </p>
              </div>
            )}

            {link && (
              <div>
                <p className="infowindow-link">
                  <a
                    target="_blank"
                    href={link}
                    rel="noopener noreferrer"
                    data-i18n="infowindow.policy.info-link"
                  >
                    Link
                  </a>
                </p>
              </div>
            )}

            {resource && (
              <div>
                <p className="infowindow-link">
                  <a
                    target="_blank"
                    href={resource}
                    rel="noopener noreferrer"
                    data-i18n="infowindow.policy.resource-link"
                  >
                    Resource
                  </a>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
