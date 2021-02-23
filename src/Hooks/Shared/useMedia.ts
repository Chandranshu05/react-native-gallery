import {useCallback, useState} from 'react';
import ImagePicker, {
  Image,
  Options,
  Video,
} from 'react-native-image-crop-picker';

function useMedia() {
  const [data, setData] = useState<Image[] | Video[]>([]);

  const openCamera = useCallback(async (options: Options) => {
    const media = await ImagePicker.openCamera(options);
    if (Array.isArray(media)) {
      setData(media);
    } else {
      setData((_data) => {
        const tempArr = [..._data];
        tempArr.push(media);
        return tempArr;
      });
    }
  }, []);

  const openGallery = useCallback(async (options: Options) => {
    const media = await ImagePicker.openPicker(options);
    if (Array.isArray(media)) {
      setData((_data) => {
        const tempArr = [..._data];
        tempArr.push(...media);
        return tempArr;
      });
    } else {
      setData([media]);
    }
  }, []);

  return {openCamera, openGallery, data};
}

export default useMedia;
