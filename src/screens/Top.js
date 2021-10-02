import React from 'react';
import { useHistory } from 'react-router-native';
import { Header } from 'react-native-elements';
import styled from 'styled-components/native';

export default function() {
  // const [uri, setUri] = React.useState('https://example.com');
  const [uri, setUri] = React.useState('http://localhost:8080/sample.html');
  const history = useHistory();

  return (
    <Wrapper>
      <Header
        backgroundColor={'F3F3F3'}
        centerComponent={{ text: 'Top' }} />
      <Main>
        <TextInput
          onChangeText={setUri}
          value={uri} />
        <Button
          onPress={() => {
            history.push('/web-view', { uri });
          }}>
          <ButtonText>
            Show
          </ButtonText>
        </Button>
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.View`
`;

const Main = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextInput = styled.TextInput`
  margin-top: 200;
  padding-left: 5;
  width: 300;
  height: 40;
  background-color: #DEDEDE;
`;

const Button = styled.TouchableOpacity`
  margin-top: 40;
  width: 300;
  height: 40;
  background: #f194ff;
`;

const ButtonText = styled.Text`
  text-align: center;
  font-size: 18;
  line-height: 40;
`;
