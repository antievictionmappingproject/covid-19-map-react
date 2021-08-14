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
          <p>
            I'm baby glossier vegan waistcoat chartreuse selvage gastropub tacos
            pour-over craft beer tilde kitsch kogi irony. Trust fund mustache
            four dollar toast prism succulents, flannel art party glossier
            skateboard viral. Lomo synth live-edge ethical, palo santo readymade
            godard post-ironic occupy intelligentsia thundercats lo-fi
            dreamcatcher viral. Jianbing wolf bespoke DIY gentrify drinking
            vinegar chillwave. Small batch pickled slow-carb migas butcher
            farm-to-table hexagon activated charcoal af. Tumeric fashion axe
            pinterest butcher activated charcoal squid disrupt selfies etsy.
            Swag tacos etsy, YOLO keytar pug street art thundercats normcore
            cornhole snackwave subway tile.
          </p>
          <p>
            Selfies direct trade put a bird on it live-edge meh, wayfarers
            polaroid marfa photo booth. Church-key shaman poke readymade fanny
            pack hella fixie tousled organic. Poke chillwave 90's farm-to-table
            succulents tilde banjo cornhole chia shabby chic. Street art
            glossier man bun tofu plaid keytar DIY hammock. Shaman gochujang
            four dollar toast iceland neutra normcore ugh lomo beard letterpress
            lo-fi locavore. Adaptogen master cleanse blue bottle 3 wolf moon
            meggings organic jianbing austin chambray pok pok echo park umami
            shabby chic.
          </p>
          <p>
            Retro cornhole lo-fi tumblr 3 wolf moon trust fund farm-to-table
            vegan glossier single-origin coffee actually cray. Chicharrones
            portland yr, adaptogen paleo selvage meditation whatever vice.
          </p>
        </span>
      </div>
    </div>
  );
};
