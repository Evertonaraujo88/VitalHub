import { Modal } from "react-native"
import { LinkCancel } from "../Links/style"
import { ButtonBox, ButtonCancel, ButtonLoginVE, ButtonModal } from "../button/style"
import { ContainerModal } from "../container/style"
import { ButtonTitle, RegularText, RegularTextModal, Title, TitleM, TitleModal } from "../title/style"
import { ContainerBoxModal, ModalCancel, PacientModal } from "./Style"

import * as Notifications from 'expo-notifications';

Notifications.requestPermissionsAsync();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,

        shouldPlaySound: false,

        shouldSetBadge: false,
    })
});

export const CancelAppointmentModal = ({
    visible, setShowModalCancel, onPressConfirmation, ...rest
}) => {

    const handleCallNotifications = async () => {

        const {status} = await Notifications.getPermissionsAsync();

        if(status != "granted") {
            alert('Voce precisa permitir as notificacoes');
            return;
        };

        await Notifications.scheduleNotificationAsync({
            content:{
                title: "Consulta cancelada",
                body: "Uma de suas consultas foi cancelada. Entre para saber mais."
            }
        })
    }

    async function NotificationCancel(){

    }

    return(
        
        
        <ModalCancel {...rest} visible={visible} transparent={true} animationType="fade">
            <PacientModal>
                <ContainerBoxModal>
                    <TitleM>Cancelar consulta</TitleM>
                    <RegularTextModal>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</RegularTextModal>
                    <ButtonModal onPress={onPressConfirmation}>
                        <ButtonTitle>Confirmar</ButtonTitle>
                    </ButtonModal>

                    <ButtonBox onPress={() => setShowModalCancel(false)}>
                        <LinkCancel>Cancelar</LinkCancel>
                    </ButtonBox>
                    
                </ContainerBoxModal>
            </PacientModal>

        </ModalCancel>

        // <ContainerModal>
        //     <ContainerBoxModal>
        //         <TitleModal>Cancelar consulta</TitleModal>
        //         <RegularTextModal>Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</RegularTextModal>
        //         <ButtonLoginVE>
        //             <ButtonTitle>Confirmar</ButtonTitle>
        //         </ButtonLoginVE>

        //         <LinkCancel>Cancelar</LinkCancel>
        //     </ContainerBoxModal>
            
        // </ContainerModal>
    )
}

