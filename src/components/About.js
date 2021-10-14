import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default props => {
  const showAbout = useSelector(state => state.ui.showAbout);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const closeAboutOnKeydown = e => {
      const { keyCode } = e;
      // If "escape" key pressed
      if (keyCode === 27 && showAbout) dispatch({ type: 'ui:about:hide' });
    };

    window.addEventListener('keydown', closeAboutOnKeydown);
    return () => window.removeEventListener('keydown', closeAboutOnKeydown);
  }, [dispatch, showAbout]);

  if (!showAbout) {
    return null;
  }

  return (
    <div id="modal-container">
      <div className="modal">
        <div>
          <h4> About</h4>
          <span
            onClick={e => dispatch({ type: 'ui:about:hide' })}
            className="modal-close"
          >
            ×
          </span>
          <hr />
        </div>
        <span>
          <p>
            The maps on this site are an emergency response project to present
            COVID-19 eviction data, housing justice action info, and tenant
            testimonies. This map is by the Anti-Eviction Mapping Project, a
            data-visualization, data analysis, and storytelling collective with
            chapters primarily in the San Francisco Bay Area, Los Angeles, and
            New York as well as collaborators worldwide. We hope that this map
            will amplify the needs of tenants, and will support the efforts of
            organizers.
          </p>
          <p>
            The Anti-Eviction Mapping Project aggregates data using free and
            open-source technologies to support social movements, community
            organizations, and research groups working toward housing justice.
            Data is crowd-sourced and is by no means perfect or exhaustive. For
            more information on our data collection, sharing, and privacy, see
            here.
          </p>
          <p>
            The Anti-Eviction Mapping Project recognizes that we are mapping
            Indigenous lands that have been stolen, colonized, divided, and
            renamed. Colonial and nation-state borders are depicted because
            tenant protection legislation exists within these geographies. Our
            goal is to pay our respect to the original stewards of the land by
            using Indigenous place names when the third-party services that we
            depend upon allow us to.
          </p>
          <p>
            While the Anti-Eviction Mapping Project maintains close
            relationships with a number of tenant organizations and networks,
            the development of this map has in particular relied upon
            collaboration with the Mapping Action Collective, Tenants Together,
            the San Francisco Anti-Displacement Coalition, East Bay Housing
            Organizations, Community Justice Project, Dr. Emily Benfer and her
            law students, and Bay Area Rent Strike (BARS) organizers, as well as
            assistance in international research from our friends at kollektiv
            orangotango and the European Action Coalition for the Right to
            Housing. We are grateful for consultation from Right To The City
            Alliance, Policy Link, Dr. Lisa Bates, and John Pollock from Public
            Justice, Greg Townley from the Homelessness Research Action
            Collaborative, and Leeor Schwitzer from Portland Tenants United.
          </p>
          <p>
            Map and data by: Azad Amir Ghassemi, Ben Benjamin, Bora Erden, Brett
            Halperin, Chris Henrick, Chris Sinco, Erin McElroy, Isnardo
            Gandarilla, Jim Stewart, Lisa Jakubczyk, Luis Felipe R. Murillo,
            River H, Sachi Arakawa, Samantha Hanae Noh, Tim Hitchins, and Tina
            Zarbaliev.
          </p>
          <p>
            Translation support: Angie, Daniel Mitchen, İrem Yılmaz, Jihed
            Brirmi, Julieta Arancio, Luis Felipe, Manny, Manon Vergerio, Maggie
            Erving, Paul (Kollectiv Orangotango), and Xiaomei.
          </p>
          <p>
            Tenant oral history interviews conducted and edited by: Alexandra
            Lacey, Maria Velazquez, Luis Trujillo, Maya Sisneros, Rebecca
            Gourevitch, Susana Orozco, Cindy Reyes, Alicia Morales Perez,
            Isabella Tilly, Dr. Deland Chan and her Sustainable Cities Students
            (Fall 2020 students.)
          </p>
        </span>
      </div>
    </div>
  );
};
