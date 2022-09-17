import {useRoute, useNavigation} from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo} from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from "./styles";
import { GameParams } from "../../@types/navigation";
import { TouchableOpacity, View, Image, FlatList, Text } from "react-native";
import { THEME } from "../../theme";

import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import React, { useEffect, useState } from 'react';
import { DuoCard, AdsProps } from '../../components/DuoCard';
import { DUoMatch } from '../../components/DuoMatch';
export function Game() {
    const [adsInfo, setAdsInfo] = useState<AdsProps[]>([])
    const [discordDuoSelected, setDiscordDuoSelected] = useState('emerson');

    const route = useRoute();
    const navigation = useNavigation()
    const game = route.params as GameParams;
    
    function handleGoBack() {
        navigation.goBack()
    }

    async function getDiscordUser(adsId: string) {
        try {
            // expo id exp://192.168.0.112:19000
            fetch(`http://192.168.0.112:8081/ads/${adsId}/discord`)
            .then(res => res.json())
            .then(data => setDiscordDuoSelected(data.discord))
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        try {
            // expo id exp://192.168.0.112:19000
            fetch(`http://192.168.0.112:8081/games/${game.id}/ads`)
            .then(res => res.json())
            .then(data => setAdsInfo(data))
        }catch(err) {
            console.log(err)
        }
    },[])

    return (
        <Background>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleGoBack}
                >
                    <Entypo
                        name="chevron-thin-left"
                        color={THEME.COLORS.CAPTION_300}
                        size={20}
                    ></Entypo>

                </TouchableOpacity>
                
                <Image
                    source={logoImg}
                    style={styles.logo}
                />
                <View style={styles.right}/>
            </View>
            <Image
                source={{uri: game.bannerUrl}}
                style={styles.cover}
                resizeMode='cover'
                resizeMethod='auto'
            />

            <Heading
                title={game.title}
                subtitle='Conecte-se e comece a jogar!'
            />
            <FlatList 
                data={adsInfo}
                keyExtractor={item => item.id}
                renderItem={ ( { item } ) => (
                    <DuoCard 
                    data={item}
                    onConnect={() => {
                        getDiscordUser(item.id)
                    }}    
                />
                )}
                horizontal
                style={styles.containerList}
                contentContainerStyle={[adsInfo.length > 0 ?styles.contentList: styles.emptyListContent]}
                showsHorizontalScrollIndicator={false}

                ListEmptyComponent={() => (
                    <Text style={styles.emptyListText}>
                        Não há anúncios publicados ainda.
                    </Text>
                )}
            />

            <DUoMatch
                visible={discordDuoSelected.length > 0}
                discord={discordDuoSelected}
                onClose={() => setDiscordDuoSelected('')}
            >
                
            </DUoMatch>
        </SafeAreaView>
        </Background>
    )
}