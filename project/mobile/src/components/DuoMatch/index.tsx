import { Modal, ModalProps, Text, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import * as Clipboard from 'expo-clipboard'


import { CheckCircle} from 'phosphor-react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { THEME } from "../../theme";
import { Heading } from "../Heading";
import { useState } from "react";

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}


export function DUoMatch({discord, onClose, ...rest}: Props) {
    const [isCopping, setIsCopping] = useState(false)

    async function handleCopyDiscordToClipboard() {
        setIsCopping(true)
        await Clipboard.setStringAsync(discord)

        Alert.alert('Discord Copiado!', 'Usuário copiado para você inserir no discord!')
        setIsCopping(false)
    }

    return (
        <Modal 
            animationType="fade"
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <MaterialIcons
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>
                    <CheckCircle 
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight='bold'
                    />

                    <Heading 
                        title="Let's play!"
                        subtitle="Agora é só começar a jogar!"
                        style={{alignItems: 'center', marginTop: 24}}
                    />

                    <Text style={styles.label}>
                        Adicione o seu discord
                    </Text>
                    <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordToClipboard}
                        disabled={isCopping}
                    >
                        <Text style={styles.discord}>
                            {isCopping ? <ActivityIndicator /> :discord}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </Modal>
    )
}