import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Image, Text, StyleSheet, } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUfResponse {
    sigla: string;
}

interface ufObject {
    label: string;
    value: string
}

interface IBGECityResponse {
    nome: string;
}

interface cityObject {
    label: string;
    value: string
}

interface Params {
    uf: string;
    city: string
}
const Home = () => {
    const navigation = useNavigation();
    const [uf, setUf] = useState<ufObject[]>([]);
    const [citys, setCitys] = useState<cityObject[]>([]);
    const [ufSelected, setUfSelected] = useState('0');
    const [citySelected, setCitySelected] = useState('0');

    function hangdleNavigateToPoint(param:Params) {
        navigation.navigate('Points', param);
    }

    useEffect(() => {
        axios.get<IBGEUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const uf = response.data.map(uf => ({ label: uf.sigla, value: uf.sigla } as ufObject));

                setUf(uf);
            })

    }, [])

    useEffect(() => {
        if (ufSelected === '0') {
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => ({ label: city.nome, value: city.nome } as cityObject));

                setCitys(cityNames);
            })

    }, [ufSelected])

    return (
        <ImageBackground
            source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{ width: 274, height: 368 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
            </View>
            <View style={styles.footer}>
                <RNPickerSelect
                    placeholder={{
                        label: 'Select a UF...',
                        value: null,
                        color: '#6C6C80',
                    }}
                    onValueChange={(value) => setUfSelected(value)}
                    items={uf}
                />

                <RNPickerSelect
                    placeholder={{
                        label: 'Select a Cidade...',
                        value: null,
                        color: '#6C6C80',
                    }}
                    onValueChange={(value) => setCitySelected(value)}
                    items={citys}
                />

                <RectButton
                    style={styles.button}
                    onPress={() => hangdleNavigateToPoint(({uf: ufSelected, city: citySelected} as Params))}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right"
                                color="#FFF"
                                size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: "center",
    },

    title: {
        color: "#322153",
        fontSize: 32,
        fontFamily: "Ubuntu_700Bold",
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: "#6C6C80",
        fontSize: 16,
        marginTop: 16,
        fontFamily: "Roboto_400Regular",
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: "#FFF",
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: "#34CB79",
        height: 60,
        flexDirection: "row",
        borderRadius: 10,
        overflow: "hidden",
        alignItems: "center",
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonText: {
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        color: "#FFF",
        fontFamily: "Roboto_500Medium",
        fontSize: 16,
    },
});
