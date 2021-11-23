import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderRadius: 3,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0366d6',
    marginTop: 10
  }
});

const LoginForm = ({ onSubmit }) => {
  //const testi = () => console.log('toimii');
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={{ color: '#FFF' }}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const initialValues = {
    username: '',
    password: ''
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>  
    );
};

export default SignIn;
