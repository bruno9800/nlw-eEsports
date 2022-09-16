import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { SafeAreaView } from  "react-native-safe-area-context";
import {useNavigation} from '@react-navigation/native'


import { styles } from "./styles";
import logoImg from '../../assets/logo-nlw-esports.png'

import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";



export function Home() {
    const [games, setGames] = useState<GameCardProps[]>([])

    const navigation = useNavigation()


    function handleOpenGame({id, title,bannerUrl}:GameCardProps) {
        navigation.navigate('game', {id, title, bannerUrl})
    }

    useEffect(() => {
        try {
            // expo id exp://192.168.0.112:19000
            fetch('http://192.168.0.112:8081/games')
            .then(res => res.json())
            .then(data => setGames(data))
        }catch(err) {
            console.log(err)
        }
    },[])
   
    return (
    <Background>

        <SafeAreaView style={styles.container}>
            <Image
                source={logoImg}
                style={styles.logo}
            />

            <Heading 
                title="Encontre o seu duo!"
                subtitle="Selecione o game que deseja jogar..."
            />

            <FlatList
                data={games}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <GameCard 
                        data={item}
                        onPress={() => handleOpenGame(item)}
                    />
                    )}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={styles.contentList}
            />

            
        </SafeAreaView>
        </Background>
    )
}