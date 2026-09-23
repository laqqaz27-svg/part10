import { useMutation } from '@apollo/client/react';
import { Formik } from 'formik';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import * as Yup from 'yup';

import Text from './Text';
import { CREATE_USER } from '../graphql/queries';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),

  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),

  passwordConfirmation: Yup.string()
    .required('Password confirmation is required')
    .oneOf(
      [Yup.ref('password')],
      'Password confirmation must match password',
    ),
});

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (
    values,
    { setSubmitting },
  ) => {
    try {
      await createUser({
        variables: {
          user: {
            username: values.username,
            password: values.password,
          },
        },
      });

      await signIn({
        username: values.username,
        password: values.password,
      });

      navigate('/');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            autoCapitalize="none"
          />

          {touched.username && errors.username && (
            <Text style={styles.error}>
              {errors.username}
            </Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry
          />

          {touched.password && errors.password && (
            <Text style={styles.error}>
              {errors.password}
            </Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Password confirmation"
            value={values.passwordConfirmation}
            onChangeText={handleChange(
              'passwordConfirmation',
            )}
            onBlur={handleBlur('passwordConfirmation')}
            secureTextEntry
          />

          {touched.passwordConfirmation &&
            errors.passwordConfirmation && (
              <Text style={styles.error}>
                {errors.passwordConfirmation}
              </Text>
            )}

          <Button
            title="Sign up"
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
};

export default SignUp;