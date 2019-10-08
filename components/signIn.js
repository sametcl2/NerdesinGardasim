import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { mapping, dark } from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, Input } from 'react-native-ui-kitten';
import LottieView from 'lottie-react-native';
import Map from './map';

const SignIn = props => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    onEmailChange = e => {
        setEmail(e);
    }

    onPasswordChange = e => {
        setPassword(e);
    }
    
    return (
        <ApplicationProvider mapping={mapping} theme={dark}>
            <StatusBar hidden={true}/>
            <Layout style={styles.container}>
                <Layout style={styles.layout}>
                    <Layout style={{marginBottom: 50}}>
                        <Input 
                            value={email}
                            onChangeText={onEmailChange}
                            placeholder="Email"
                            style={{width: '100%', marginBottom: 20}}
                        />
                        <Input 
                            value={password}
                            onChangeText={onPasswordChange}
                            placeholder="Password"
                            style={{width: '100%', marginBottom: 20}}
                        />
                    </Layout> 
                    <Button
                        onPress={() => props.navigation.navigate('Map')}
                        size="giant"
                        style={{marginBottom: 150, width: '50%'}}> Sign In
                    </Button> 
                    <LottieView
                        style={styles.lottie}
                        source={require('../src/signInAnimation.json')}
                        autoPlay
                        loop
                    />
                </Layout>
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
        justifyContent: 'center',
    },
    layout: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 30,
    },
    lottie: {
        height: 250,
        width: 250
    }
})

export default AppNavigator;