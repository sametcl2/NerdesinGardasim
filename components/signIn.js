import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { mapping, dark } from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, Input } from 'react-native-ui-kitten';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';

const SignIn = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    onEmailChange = e => {
        setEmail(e);
    }

    onPasswordChange = e => {
        setPassword(e);
    }

    checkInfos = (email, password) => {
        if (email !== '' && password !== '') {
            auth()
            .signInWithEmailAndPassword(email.trim(), password)
            .then(res => {
                props.navigation.navigate('Map');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                  console.log('That email address is already in use!');
                }
            
                if (error.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
                }
            })
        }
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
                            secureTextEntry={true}
                            style={{width: '100%', marginBottom: 20}}
                        />
                    </Layout> 
                    <Button
                        onPress={() => checkInfos(email, password)}
                        size="giant"
                        style={{marginBottom: 30 ,width: '50%'}}>
                        Sign In
                    </Button>
                    <Button
                        onPress={() => props.navigation.navigate('SignUp')}
                        size="giant"
                        appearance="outline"
                        style={{marginBottom: 60, width: '50%'}}>
                        Sign Up
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

export default SignIn;