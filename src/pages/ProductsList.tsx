import React, { useEffect } from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import { } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import Header from '../components/Header';
import globalStyles, { colors } from '../styles';

interface IProductsDTO {
    id?: number;
    name: string;
    image: string;
    price: number;
    id_category?: number;
    category?: string;

    route?: any;
}

interface IPropsDTO {
    route: any;
}

const Products = ({ name, image, price }: IProductsDTO) => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.white, flexDirection: 'row', marginHorizontal: 16, marginVertical: 4, marginBottom: 15, borderRadius: 20, paddingVertical: 20, paddingHorizontal: 24, justifyContent: 'center' }}>

            <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: image }} style={{ width: 75, height: 75, borderRadius: 10, marginRight: 25 }} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: 16 }}>{name}</Text>
                        <Text style={{ fontSize: 14 }}>{`R$ ${price.toFixed(2)}`}</Text>
                    </View>
                </View>
            </View>

        </View>
    );
}

let products: IProductsDTO[] = [];

async function handleGetProducts(idCategory: number) {
    await axios.post('http://joaogsdc-products-list-com-br.umbler.net/products/category', { idCategory: idCategory })
        .then((resp) => products = resp.data)
        .catch((error) => console.log(error));
}

export default function ProductsList({ route }: IPropsDTO) {

    const { idCategory, nameCategory } = route.params;

    useEffect(() => {
        handleGetProducts(idCategory);
    }, []);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: colors.themeColor }}>

                <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />

                <Header title={'Listagem de \nProdutos'} />

                <View style={{ flex: 1, marginTop: 30, padding: 20, flexDirection: 'column', backgroundColor: colors.background, justifyContent: 'flex-end', alignItems: 'center', borderTopLeftRadius: 40 }}>
                    <Text style={{ fontSize: 24, marginBottom: 15, marginTop: 10 }}>{nameCategory}</Text>

                    <ScrollView style={{ backgroundColor: colors.background, alignSelf: 'stretch' }}>
                        {
                            products.map((product: IProductsDTO) =>
                                <Products name={product.name} image={product.image} price={product.price}></Products>
                            )
                        }
                    </ScrollView>
                </View>

            </View>
        </>
    );
}