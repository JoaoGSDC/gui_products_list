import { StyleSheet } from 'react-native';

export const colors = {
    themeColor: '#d50000',
    white: '#ffffff',
    background: '#f4f6fc',
    greyish: '#a4a4a4',
    tint: '#2bb49c3',
    buttonColor: '#222222',
}

export const globalStyles = StyleSheet.create({
    button: {
        backgroundColor: colors.buttonColor,
        height: 50,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
    },

    input: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: colors.white,
        width: 300,
        height: 50,
        borderRadius: 5
    },
})

export default globalStyles;