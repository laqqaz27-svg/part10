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
import { CREATE_REVIEW } from '../graphql/queries';

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
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

const validationSchema = Yup.object().shape({
  ownerName: Yup.string()
    .required('Repository owner is required'),
  repositoryName: Yup.string()
    .required('Repository name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: Yup.string(),
});

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: Number(values.rating),
            text: values.text,
          },
        },
      });

      navigate(`/repositories/${data.createReview.repositoryId}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
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
            placeholder="Repository owner name"
            value={values.ownerName}
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
          />

          {touched.ownerName && errors.ownerName && (
            <Text style={styles.error}>
              {errors.ownerName}
            </Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Repository name"
            value={values.repositoryName}
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
          />

          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.error}>
              {errors.repositoryName}
            </Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Rating between 0 and 100"
            value={values.rating}
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            keyboardType="numeric"
          />

          {touched.rating && errors.rating && (
            <Text style={styles.error}>
              {errors.rating}
            </Text>
          )}

          <TextInput
            style={[
              styles.input,
              styles.multilineInput,
            ]}
            placeholder="Review"
            value={values.text}
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            multiline
          />

          <Button
            title="Create a review"
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;