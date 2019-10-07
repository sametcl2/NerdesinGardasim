import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { mapping, dark } from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from 'react-native-ui-kitten';
import Map from './map';

navigationOptions = {  // NAVİGATİON'DA HEADER GİZLEMEK İÇİN.
      header: null
    }

const SignIn = props => {    
    return (
        <ApplicationProvider mapping={mapping} theme={dark}>
            <Layout style={styles.container}>
                <Text style={styles.text} category='h4'>Deneme</Text>
                <Button onPress={() => props.navigation.navigate('Map')}>Button</Button>
            </Layout>
        </ApplicationProvider>
    );
}

const AppNavigator = createAppContainer(
    createStackNavigator(
    {
        SignIn,
        Map,
    },
    {
        initialRouteName: 'SignIn',
        headerMode: 'none',  // Header gizlemek için
        navigationOptions: { // Header gizlemek için
            headerVisible: false, 
        }
    }
));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        marginVertical: 16
    }
})

export default AppNavigator;