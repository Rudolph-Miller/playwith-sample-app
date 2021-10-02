import React from 'react';
import styled from 'styled-components/native';
import { Header } from 'react-native-elements';
import { useHistory, useLocation } from 'react-router-native';
import { Alert } from 'react-native';

import { WebView } from 'react-native-webview';

export default function() {
  const [count, setCount] = React.useState(0);
  const history = useHistory();
  const location = useLocation();
  const ref = React.createRef();

  const { uri } = location.state;

  React.useEffect(() => {
    if (ref.current) {
      const run = `
        (function() {
          try {
            window.PlaywithReceiveMessage({ count: ${count} });
          } catch(e) {
            console.log(e);
          }
        })();
      `;

      ref.current.injectJavaScript(run);
    }
  }, [count]);

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
          onMessage={(event) => {
            const data = JSON.parse(event.nativeEvent.data);

            Alert.alert(
              data.name,
              data.message,
              [
                {
                  text: 'Cancel'
                },
                {
                  text: 'OK',
                  onPress: () => setCount(count+1)
                }
              ]
            );
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
