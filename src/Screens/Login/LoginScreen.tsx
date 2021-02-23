import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Button } from 'react-native-paper';
import AppButton from 'src/Components/Shared/AppButton/AppButton';
import Center from 'src/Components/Shared/Center/Center';
import Container from 'src/Components/Shared/Container/Container';
import Padding from 'src/Components/Shared/Padding/Padding';
import Spacer from 'src/Components/Shared/Spacer/Spacer';
import Typography from 'src/Components/Shared/Typography/Typography';
import scaler from 'src/Utils/Shared/scaler';

function LoginScreen() {
  const navigation = useNavigation();
  return (
    <Container>
      <Padding flex={1} horizontal>
        <Spacer size={scaler(350)}/>
        <Center>
          <AppButton 
          fontSize={scaler(15)}
          color="#000000"
          height={scaler(50)}
          style={{
            borderRadius: scaler(16), }}
          onPress={()=>navigation.navigate("Home")}>
            Enter Gallery</AppButton>
        </Center>
        </Padding>
    </Container>
  );
}

export default LoginScreen;
