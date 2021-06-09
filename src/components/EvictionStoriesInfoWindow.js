/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import ReactMarkdown from 'react-markdown';
import AudioPlayer from './AudioPlayer';

const BlogImage = props => {
  return <img {...props} style={{ maxWidth: '100%' }} />;
};
const BlogVideo = props => {
  return <video {...props} style={{ maxWidth: '100%' }} />;
};
const BlogAudio = props => {
  return <AudioPlayer {...props} style={{ maxWidth: '100%' }} />;
};

function parseNodeFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

const Embed = props => {
  const node = parseNodeFromHTML(props.value);
  function getComponent(type) {
    switch (type) {
      case 'IMG':
        return <BlogImage src={node.src} />;
      case 'VIDEO':
        return <BlogVideo controls src={node.src} />;
      default:
        return null;
    }
  }
  return getComponent(node.nodeName);
};

export default props => {
  const interviewSelected = useSelector(state => state.ui.interviewSelected);
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="aemp-infowindow">
      <span
        className="aemp-infowindow-close"
        onClick={() => {
          history.push('/eviction-stories')
          dispatch({ type: 'ui:eviction-stories-interview:selected', payload: null });
        }}
      >
        ×
      </span>
      <div>
        {interviewSelected.fields['Name of Final Media Output File'] && (
          <div>
            <h2>
              {interviewSelected.fields['Name of Final Media Output File']}
            </h2>
          </div>
        )}
        {interviewSelected.fields['Audio file'] && (
          <BlogAudio src={interviewSelected.fields['Audio file'][0].url} />
        )}
        {interviewSelected.fields['Name of Interviewee or Anonymous'] && (
          <div>
            <h1>Name:</h1>
            <h2>
              {interviewSelected.fields['Name of Interviewee or Anonymous']}
            </h2>
          </div>
        )}

        {interviewSelected.fields['Clip Summary'] && (
          <div>
            <h1>Summary:</h1>
            <p>{interviewSelected.fields['Clip Summary']}</p>
          </div>
        )}

        <ReactMarkdown escapeHtml={false} renderers={{ html: Embed }}>
          {interviewSelected.fields.DEV_content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
