import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { mapping, dark } from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, Input } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions/action';

const SignUp = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    
    onEmailChange = e => {
        setEmail(e.nativeEvent.text);
    }

    onPasswordChange = e => {
        setPassword(e.nativeEvent.text);
    }

    onFullNameChange = e => {
        setFullName(e.nativeEvent.text);
    }

    reduxController = () => {
        const newUser = {
            email,
            password,
            fullName
        };
        props.addUser(newUser);
        setEmail('');
        setPassword('');
        setFullName('');
    }

    return (
        <ApplicationProvider mapping={mapping} theme={dark}>
            <StatusBar hidden={true}/>
            <Layout style={styles.container}>
                <Layout style={styles.layout}>
                    <Layout style={{marginBottom: 50}}>
                        <Input 
                            value={email}
                            onChange={onEmailChange}
                            placeholder="Email"
                            status={email.includes('@') ? 'primary' : 'danger'}
                            caption={email.includes('@') ? '' : 'Invalid value'}
                            style={{width: '100%', marginBottom: 20}}
                        />
                        <Input 
                            value={password}
                            onChange={onPasswordChange}
                            placeholder="Password"
                            secureTextEntry={true}
                            status={password.length >= 5 ? 'primary' : 'danger'}
                            caption={password.length >= 5 ? '' : 'Invalid value'}
                            style={{width: '100%', marginBottom: 20}}
                        />
                        <Input 
                            value={fullName}
                            onChange={onFullNameChange}
                            placeholder="Full Name"
                            style={{width: '100%', marginBottom: 20}}
                        />
                    </Layout> 
                    <Button
                        size="giant"
                        status="warning"
                        style={{marginBottom: 30 ,width: '50%'}}
                        onPress={reduxController}>
                        Welcome!
                    </Button>
                </Layout>
            </Layout>
        </ApplicationProvider>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: user => {
            dispatch(addUser(user));
        }
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);