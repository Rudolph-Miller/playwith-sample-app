import React from 'react';
import styled from 'styled-components/native';
import { Header } from 'react-native-elements';
import { useHistory, useLocation } from 'react-router-native';
import { Alert } from 'react-native';
import { useRecoilValue } from 'recoil';

import { WebView } from 'react-native-webview';
import { Id } from '../atoms';
import Config from '../config';

const pw_functions = (id) => `
(function() {
  let socket = null;

  function PW() {
  };

  PW.prototype = {
    getId: function() {
      return '${id}';
    },

    match: function(id) {
      socket.send(JSON.stringify({
        type: 'match',
        data: {
          from: '${id}',
          to: id
        }
      }));
    },

    on: function(event, callback) {
      document.addEventListener('pw-' + event, callback);
    },

    send: function(data) {
      socket.send(JSON.stringify({
        type: 'send',
        data: {
          from: '${id}',
          data: data
        }
      }));
    },
  };

  window.PW = PW;
  window.__wp = window.pw = new PW();

  document.addEventListener('DOMContentLoaded', function() {
    socket = new WebSocket('${Config.ws}');

    socket.addEventListener('open', function() {
      document.dispatchEvent(new CustomEvent('pw-connected'));
    });

    socket.addEventListener('message', function(raw) {
      const event = JSON.parse(raw.data);

      switch (event.type) {
        case 'matched': {
          document.dispatchEvent(new CustomEvent('pw-matched'));

          return;
        };
        case 'received': {
          document.dispatchEvent(new CustomEvent('pw-received', {
            detail: event.data
          }));

          return;
        }
      }
    });
  });
})();
`;

export default function() {
  const history = useHistory();
  const location = useLocation();
  const ref = React.createRef();
  const { uri } = location.state;
  const id = useRecoilValue(Id);

  const functions = pw_functions(id);

  React.useEffect(() => {
    /**
    if (ref.current) {
      setTimeout(() => {
        ref.current.injectJavaScript(`
          document.dispatchEvent(new Event('pw-connected'));
        `);
      }, 1000);
    }
    */
  }, []);

  return (
    <Wrapper>
      <Header
        backgroundColor={'F3F3F3'}
        leftComponent={{ text: 'Back', onPress: history.goBack }}
        centerComponent={{ text: uri }} />
      <Main>
        <WebView
          ref={ref}
          source={{ uri }}
          injectedJavaScriptBeforeContentLoaded={functions}
          onMessage={(event) => {
          }} />
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.View`
`;

const Main = styled.View`
  height: 100%;
`;

const Text = styled.Text`
`;
