import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default props => {
  const showModal = useSelector(state => state.ui.showModal);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const closeModalOnKeydown = e => {
      const { keyCode } = e;
      // If "escape" key pressed
      if (keyCode === 27 && showModal) dispatch({ type: 'ui:modal:hide' });
    };

    window.addEventListener('keydown', closeModalOnKeydown);
    return () => window.removeEventListener('keydown', closeModalOnKeydown);
  }, [dispatch, showModal]);

  if (!showModal) {
    return null;
  }

  return (
    <div id="modal-container">
      <div className="modal">
        <div>
          <h4 data-i18n="modal.title">{t('modal.title')}</h4>
          <span
            onClick={e => dispatch({ type: 'ui:modal:hide' })}
            className="modal-close"
          >
            ×
          </span>
        </div>
        <aside>
          <p>
            <span
              data-i18n="modal.warning"
              dangerouslySetInnerHTML={{ __html: t('modal.warning') }}
            ></span>
          </p>
          <p
            dangerouslySetInnerHTML={{ __html: t('modal.content.paragraph-1') }}
          ></p>
          <p
            dangerouslySetInnerHTML={{ __html: t('modal.content.paragraph-2') }}
          ></p>
          {/* {<!-- This next paragraph can be added once the data is ready.
                This is a placeholder for now -->
                <!-- <p data-i18n="modal.content.paragraph-3"></p> -->} */}
          <p
            dangerouslySetInnerHTML={{ __html: t('modal.content.paragraph-4') }}
          ></p>
          <p
            dangerouslySetInnerHTML={{ __html: t('modal.content.paragraph-5') }}
          ></p>
          <p
            dangerouslySetInnerHTML={{ __html: t('modal.content.paragraph-6') }}
          ></p>
          <p
            dangerouslySetInnerHTML={{ __html: t('modal.content.paragraph-7') }}
          ></p>
        </aside>
      </div>
    </div>
  );
};
