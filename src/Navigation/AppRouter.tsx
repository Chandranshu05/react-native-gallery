import AppStateHandler, {useAppState} from 'src/StateHandlers/AppStateHandler';
import React, {useLayoutEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigator from './StackNavigators/AuthStackNavigator';
import RootStackNavigator from './StackNavigators/RootStackNavigator';
import Center from 'src/Components/Shared/Center/Center';
import Container from 'src/Components/Shared/Container/Container';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';

function AppRouter() {
  const [{loggedIn, loading}] = useAppState(['loggedIn', 'loading']);
 

  async function getImages(){
    const imageArray :any = await AsyncStorage.getItem('imageArray')
    console.log({imageArray})
    AppStateHandler.setState({imageArrayAppState:imageArray})
  }

  useLayoutEffect(() => {
    SplashScreen.hide();

    getImages()
    setTimeout(() => {
      AppStateHandler.setState({loading: false});
    }, 2000);
  }, []);

  if (loading) {
    return (
      <Container>
        <Center allAxis>
          <ActivityIndicator size={'large'} />
        </Center>
      </Container>
    );
  }

  return (
    <NavigationContainer>
      {loggedIn ? <AuthStackNavigator /> : <RootStackNavigator />}
    </NavigationContainer>
  );
}

export default AppRouter;
