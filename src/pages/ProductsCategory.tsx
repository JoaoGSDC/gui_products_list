import React, { useEffect } from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from '../components/Header';
import globalStyles, { colors } from '../styles';

interface ICategoryDTO {
    id: number;
    name: string;
    image?: string;
    price?: number;
    id_category?: number;
    category?: string;
}

let categories: ICategoryDTO[] = [];

async function getCategories() {
    await axios.get('http://joaogsdc-products-list-com-br.umbler.net/categories')
        .then((resp) => categories = resp.data)
        .catch((error) => console.log(error));
}

const Categories = ({ name, id }: ICategoryDTO) => {

    const navigation = useNavigation();

    function handleNavigateToProductsList(id: number, name: string) {
        navigation.navigate('ProductsList', { idCategory: id, nameCategory: name });
    }

    return (
        <TouchableOpacity onPress={() => handleNavigateToProductsList(id, name)}>
            <View style={{ flex: 1, backgroundColor: colors.white, flexDirection: 'row', marginHorizontal: 16, marginVertical: 4, marginBottom: 15, borderRadius: 20, paddingVertical: 20, paddingHorizontal: 24, justifyContent: 'center' }}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16 }}>{name}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    );
}

export default function ProductsList() {

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: colors.themeColor }}>

                <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />

                <Header title={'GRFood'} />

                <View style={{ flex: 1, marginTop: 30, padding: 20, flexDirection: 'column', backgroundColor: colors.background, justifyContent: 'flex-end', alignItems: 'center', borderTopLeftRadius: 40 }}>
                    <Text style={{ fontSize: 21, marginBottom: 15, marginTop: 10 }}>Selecione uma categoria</Text>

                    <ScrollView style={{ backgroundColor: colors.background, alignSelf: 'stretch' }}>
                        {
                            categories.map((category: ICategoryDTO) =>
                                <Categories name={category.name} id={category.id}></Categories>
                            )
                        }
                    </ScrollView>
                </View>

            </View>
        </>
    );
}