import { Text, TouchableOpacity, View } from "react-native";



import { DuoInfo } from "../DuoInfo";

import {GameController} from 'phosphor-react-native'
import { THEME } from "../../theme";
import { styles } from "./styles";

export interface AdsProps {
    id: string;
    hourEnd: string;
    hourStart: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlaying: number;

}

interface Props {
    data: AdsProps;
    onConnect: () => void
}

export function DuoCard({ data, onConnect }: Props) {
    console.log(data)

    return (
        <View style={styles.container}>
            <DuoInfo
                label='Nome'
                value={data.name}
            />

            <DuoInfo
                label='Tempo de jogo'
                value={`${data.yearsPlaying} ano(s)`}
            />
            <DuoInfo
                label='Disponibilidade'
                value={`${data.weekDays.length} dias \u2022 ${data.hourStart} - ${data.hourEnd}`}
            />
            <DuoInfo 
                label="Chamada de áudio"
                value={data.useVoiceChannel?'sim':'não'}
                colorValue={data.useVoiceChannel?THEME.COLORS.SUCCESS:THEME.COLORS.ALERT}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={onConnect}
            >
                <GameController 
                    color={THEME.COLORS.TEXT}
                    size ={20}
                />
                <Text
                    style={styles.buttonTitle}
                >
                    Conectar
                </Text>
            </TouchableOpacity>
            
        </View>
    )
}