import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


//import das bibliotecas da camera
import {Camera, CameraType, FlashMode} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'
import { useEffect, useRef, useState } from 'react';


export const CameraComp = ({setUriCameraCapture, setShowCameraModal, showCameraModal}) => {

    const [ tipoCamera, setTipoCamera ] = useState(Camera.Constants.Type.back);
    const [ photo, setPhoto ] = useState(null);
    const [ openModal, setOpenModal ] = useState(false);
    const [ flash, setFlash ] = useState(FlashMode.off);
    const [ flashIcon, setFlashIcon ] = useState(false);
    const cameraRef = useRef(null);

    async function CapturarFoto(){
        if(cameraRef){
            const photo = await cameraRef.current.takePictureAsync();

            await setPhoto(photo.uri);

            setOpenModal(true);

            console.log(photo);
        }
    }

    async function SendFormPhoto(){
        await setUriCameraCapture(photo);

        handleClose();
    }

    function handleClose(){
        setShowCameraModal(false);
    }

    async function ClearPhoto(){
        setPhoto(null);
        setOpenModal(null);
    }

    async function SavePhoto(){
        if(photo){
            await MediaLibrary.createAssetAsync(photo).then(() => {
                alert('Foto salva com sucesso');
                SendFormPhoto();
            }).catch(error => {
                alert('Erro ao salvar foto')
            })
        }
    }

    async function SwitchFlash(){
        setFlash( flash == FlashMode.off ? FlashMode.on : FlashMode.off);
        setFlashIcon( flashIcon == true ? false : true);
    }

    useEffect(() => {
        ( async () => {
            const { status: cameraStatus } =  await Camera.requestCameraPermissionsAsync();

            const { status: mediaStatus } = await MediaLibrary.requestPermissionsAsync();
        })();
    }, []);
    return(
        <Camera
            ref={cameraRef}
            style={styles.camera}
            type={tipoCamera}
            ratio={'16:9'}
            flashMode={flash}
        >

            <View style={styles.viewFlip}>
                
                    <TouchableOpacity style={styles.btnFlip} onPress={() => setTipoCamera( tipoCamera == CameraType.front ? CameraType.back : CameraType.front)}>
                        <MaterialIcons name="cameraswitch" size={30} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnCaptura} onPress={() => CapturarFoto()}>
                        <FontAwesome name='camera' size={23} color={'black'}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnCaptura} onPress={() => SwitchFlash()}>
                        {
                            flashIcon == true ? (
                                <Ionicons name="flash" size={24} color="black"/>
                            ) : (
                                <Ionicons name="flash-off" size={24} color="black" />
                            )
                        }
                        
                    </TouchableOpacity>
                

                <Modal animationType='slide' transparent={false} visible={openModal}>

                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30}}>

                        <Image
                            style={{ width: '100%', height: 500, borderRadius: 10}}
                            source={{uri : photo}}
                        />

                        <View style={{ margin: 15, flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.btnCancel} onPress={() => ClearPhoto()}>
                                <FontAwesome name='trash' size={40} color={'#ff0000'}/>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.btnUpload} onPress={() => SavePhoto()}>
                                <FontAwesome name='save' size={40} color={'#121212'}/>
                            </TouchableOpacity>
                            
                        </View>

                    </View>

                </Modal>
            </View>

        </Camera>
    )
}

const styles = StyleSheet.create({
    camera: {
        height: '100%',
        width: '100%',
    },

    viewFlip: {
        flex: 1,
        backgroundColor: 'trasparent',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    btnFlip: {
        margin: 20,
        padding: 16,
        borderRadius: 15,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnCaptura: {
        margin: 20,
        padding: 20,
        borderRadius: 15,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnUpload: { 
        margin: 20,
        padding: 20,
        borderRadius: 15,
        backgroundColor:'trasparent',
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewButtons: {
        height: 43,
        backgroundColor: 'trasparent',
    },

    btnCancel: { 
        margin: 20,
        padding: 20,
        borderRadius: 15,
        backgroundColor:'trasparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
})