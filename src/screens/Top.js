import React from 'react';
import { useHistory } from 'react-router-native';
import { Header } from 'react-native-elements';
import styled from 'styled-components/native';
import DeviceInfo from 'react-native-device-info';
import { useRecoilState } from 'recoil';
import { Clopboard } from 'react-native';

import { Id } from '../atoms';
import Config from '../config';

export default function() {
  const [id, setId] = useRecoilState(Id);
  const [uri, setUri] = React.useState('http://localhost:8080/sample.html');
  const history = useHistory();
  const uid = DeviceInfo.getUniqueId();

  React.useEffect(async () => {
    try {
      const res = await fetch(`${Config.api}/id?uid=${uid}`);
      const json = await res.json();
      setId(json.id);
    } catch(e) {
      console.log(e);
    }
  }, []);

  if (!id) return <Wrapper />;

  return (
    <Wrapper>
      <Header
        backgroundColor={'F3F3F3'}
        centerComponent={{ text: 'Top' }} />
      <Main>
        <IdText>
          ID: {id}
        </IdText>
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

const IdText = styled.Text`
  margin-top: 200px;
  font-size: 18px;
  font-weight: bold;
`;

const TextInput = styled.TextInput`
  margin-top: 20px;
  padding-left: 5px;
  width: 300px;
  height: 40px;
  background-color: #DEDEDE;
`;

const Button = styled.TouchableOpacity`
  margin-top: 40px;
  width: 300px;
  height: 40px;
  background: #f194ff;
`;

const ButtonText = styled.Text`
  text-align: center;
  font-size: 18px;
  line-height: 40px;
`;
