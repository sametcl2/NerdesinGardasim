import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { mapping, dark } from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, Input } from 'react-native-ui-kitten';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullName] = useState('');
    
    onEmailChange = e => {
        setEmail(e);
    }

    onPasswordChange = e => {
        setPassword(e);
    }

    onFullNameChange = e => {
        setFullName(e);
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
                            status={email.includes('@') ? 'success' : 'danger'}
                            caption={email.includes('@') ? '' : 'Invalid value'}
                            style={{width: '100%', marginBottom: 20}}
                        />
                        <Input 
                            value={password}
                            onChangeText={onPasswordChange}
                            placeholder="Password"
                            secureTextEntry={true}
                            status={password.length >= 5 ? 'success' : 'danger'}
                            caption={password.length >= 5 ? '' : 'Invalid value'}
                            style={{width: '100%', marginBottom: 20}}
                        />
                        <Input 
                            value={fullname}
                            onChangeText={onFullNameChange}
                            placeholder="Full Name"
                            style={{width: '100%', marginBottom: 20}}
                        />
                    </Layout> 
                    <Button
                        size="giant"
                        style={{marginBottom: 30 ,width: '50%'}}> Begin
                    </Button>
                </Layout>
            </Layout>
        </ApplicationProvider>
    );
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    layout: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 30,
    },
});

export default SignUp;