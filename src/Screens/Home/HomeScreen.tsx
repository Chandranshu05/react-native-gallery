import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { Dimensions, FlatList, Image, View, Platform, Alert } from 'react-native';
import Container from 'src/Components/Shared/Container/Container';
import Padding from 'src/Components/Shared/Padding/Padding';
import Spacer from 'src/Components/Shared/Spacer/Spacer';
import scaler from 'src/Utils/Shared/scaler';
import Typography from 'src/Components/Shared/Typography/Typography';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Image as ImageProp } from 'react-native-image-crop-picker'
import useMedia from 'src/Hooks/Shared/useMedia'
import FastImage from 'react-native-fast-image'
import {
  Button,
  Dialog,
} from 'react-native-paper';
import Center from 'src/Components/Shared/Center/Center';
import AsyncStorage from '@react-native-community/async-storage';
import { async } from 'rxjs'; cx 
import { useAppState } from 'src/StateHandlers/AppStateHandler';

function HomeScreen() {
  const [{imageArrayAppState}] = useAppState(['imageArrayAppState']);
  const {openGallery, openCamera, data } = useMedia();
  const [openDialog, setOpenDialog] = useState(false);
  const [imageData, setImageData]:any = useState(imageArrayAppState);

  useEffect(()=>{
    setImageData(data)
    AsyncStorage.setItem('imageArray', JSON.stringify(data))
   },[data])

  

//   const clearAsyncStorage = async() => {
//     AsyncStorage.clear();
// }

  // function saveData(){
  //   AsyncStorage.setItem('imageArray', JSON.stringify(data))
  //   // console.log(JSON.stringify(data))
  // }

  // const retrieveData = () => {
  //   AsyncStorage.getItem('imageArray')
  //     .then(()=> {
  //       console.log("Image parsed")
  //       Alert.alert(JSON.parse('imageArray'))
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }


  // console.log(data)
  return (
    <Container>
      <Padding flex={1} horizontal>

        <Spacer size={scaler(25)} />

        <Typography
          textAlign="center"
          fontSize={scaler(18)}
        >
          Image Gallery
        </Typography>

        <Spacer size={scaler(25)} />

        <Padding flex={1}>

          <FlatList
            data={imageData}
            renderItem={(_: any) => {
              console.log(_, "render item")
              console.log(data)
              return <View>
                <TouchableOpacity>
                  <FastImage
                    style={{
                      height: scaler(128),
                      width: scaler(128),
                      marginRight: scaler(5),
                      marginBottom: scaler(5)
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri: Platform.OS === 'android' ? _.item.path : _.sourceURL,
                    }}
                  />
                </TouchableOpacity>
              </View>
            }}
            numColumns={3}
            keyExtractor={(item, index: any) => item.key}
            />
        </Padding>

        <Spacer size={scaler(35)} />
        <Center>
          <Button
            uppercase={false}
            style={{
              width: scaler(167),
              borderRadius: scaler(10),
              borderColor: '#006142',
              borderWidth: scaler(1),
            }}
            labelStyle={{ fontSize: scaler(15) }}
            contentStyle={{ height: scaler(50) }}
            theme={{ colors: { primary: '#006142' } }}
            mode={'contained'}
            onPress={() => {
              setOpenDialog(true);
            }}>
            Add Photo
          </Button>
          <Spacer size={scaler(10)} />
          
        </Center>

        <Spacer size={scaler(20)} />

        <Dialog visible={openDialog} onDismiss={() => setOpenDialog(false)}>
          <Dialog.Title>Select Image</Dialog.Title>
          <Dialog.Actions>
            <Button
              theme={{ colors: { primary: '#006142' } }}
              onPress={() => {
                openGallery({
                  multiple: true,
                  includeBase64: true,
                  cropping: true,
                  mediaType: 'photo',
                });
                setOpenDialog(false);
              }}>
              Open Gallery
          </Button>
            <Button
              theme={{ colors: { primary: '#006142' } }}
              onPress={() => {
                openCamera({
                  includeBase64: true,
                  mediaType: 'photo',
                });
                setOpenDialog(false);
              }}>
              Open Camera
          </Button>
          </Dialog.Actions>
        </Dialog>
      </Padding>
      <Spacer />
    </Container>
  );
}

export default HomeScreen;
