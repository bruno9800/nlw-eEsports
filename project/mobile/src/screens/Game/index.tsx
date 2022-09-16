import {useRoute, useNavigation} from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo} from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from "./styles";
import { GameParams } from "../../@types/navigation";
import { TouchableOpacity, View, Image, FlatList } from "react-native";
import { THEME } from "../../theme";

import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";
import React, { useEffect, useState } from 'react';
import { DuoCard, AdsProps } from '../../components/DuoCard';
export function Game() {
    const [adsInfo, setAdsInfo] = useState<AdsProps[]>([])
    const route = useRoute();
    const navigation = useNavigation()
    const game = route.params as GameParams;
    
    function handleGoBack() {
        navigation.goBack()
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
                        
                    }}    
                />
                )}
                horizontal
                style={styles.containerList}
                contentContainerStyle={styles.contentList}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
        </Background>
    )
}