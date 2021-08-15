import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default props => {
  const showResources = useSelector(state => state.ui.showResources);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const closeResourcesOnKeydown = e => {
      const { keyCode } = e;
      // If "escape" key pressed
      if (keyCode === 27 && showResources)
        dispatch({ type: 'ui:resources:hide' });
    };

    window.addEventListener('keydown', closeResourcesOnKeydown);
    return () => window.removeEventListener('keydown', closeResourcesOnKeydown);
  }, [dispatch, showResources]);

  if (!showResources) {
    return null;
  }

  return (
    <div id="modal-container">
      <div className="modal">
        <div>
          <h4>Resources</h4>
          <span
            onClick={e => dispatch({ type: 'ui:resources:hide' })}
            className="modal-close"
          >
            ×
          </span>
          <hr />
        </div>
        <span>

          <h2>How to Look Up Your Landlord / <i>Cómo Investigar Tu Propietario</i></h2>
          <p>
          As we have found, many of the speculators responsible for evictions and displacement are hiding behind LLCs (limited liability companies), LPs (limited partnerships), and other large investment companies and real estate investment trusts (REITS). This makes it difficult for tenants to learn who their landlords actually are and organize accordingly.
          </p>

          <p>
          We have several tools available for looking up landlord and speculator information. We have been using these to look up all LLCs responsible for evictions.  If you want to look up information about your landlord/speculator, here are some resources:
          </p>

          <li>
          <a href="https://docs.google.com/document/u/2/d/1xVFpK5wmigDoooClbSCe98fyWaQcKKZZ/edit">
          Guide on looking up property information for Los Angeles and California: How to Research Your Landlord
          </a>
          </li>

          <li>
          <a href ="http://www.tenantstogether.org/how-research-your-wall-street-landlord-participatory-action-research-guide">
          How to Look Up Your Wall Street Landlord, by Tenants Together
          </a>
          </li>

          <li>
          <a href="https://logicmag.io/commons/evictor-structures-erin-mcelroy-and-azad-amir-ghassemi-on-fighting/">
          Evictor Structures
          </a>
          </li>

          <p>
          <i>
          Como hemos establecido, muchos de los especuladores responsables de los desalojos bajo Ellis Act, se esconden bajo la anonimidad de Sociedades de Responsabilidad Limitada (LLC) y otras empresas de inversión de gran tamaño y operaciones complicadas y confusas. De hecho este anonimato les brinda impunidad a los individuos responsables del desalojamiento de los inquilinos de San Francisco. También lo hace muy complejo y difícil para los inquilinos desplazados hacer que los dueños de las propiedades asuman la responsabilidad del desalojamiento.
          </i>
          </p>

          <p>
          <i>
          Hay varias herramientas disponibles para la búsqueda de información sobre los propietarios y/o los especuladores : Aquí les presentamos aquellas que hemos estado utilizando para buscar todas las sociedades de responsabilidad limitada (LLC) implicadas en los desalojos Ellis Act. Pronto publicaremos los resultados de nuestra investigación. Sin embargo, si desea buscar información sobre el dueño de su alojamiento o el especulador interesado, puede intentar con la susodicha lista.
          </i>
          </p>
        </span>
      </div>
    </div>
  );
};
