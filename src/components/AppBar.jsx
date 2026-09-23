import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import {
  useApolloClient,
  useQuery,
} from '@apollo/client/react';
import { gql } from '@apollo/client';

import Text from './Text';
import useAuthStorage from '../hooks/useAuthStorage';

const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  tab: {
    padding: 15,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link
          to="/"
          component={Pressable}
          style={styles.tab}
        >
          <Text style={styles.text}>
            Repositories
          </Text>
        </Link>

        {data?.me ? (
          <>
            <Link
              to="/createreview"
              component={Pressable}
              style={styles.tab}
            >
              <Text style={styles.text}>
                Create a review
              </Text>
            </Link>

            <Pressable
              onPress={handleSignOut}
              style={styles.tab}
            >
              <Text style={styles.text}>
                Sign out
              </Text>
            </Pressable>
          </>
        ) : (
          <>
      <Link
      to="/signin"
    component={Pressable}
    style={styles.tab}
   >
    <Text style={styles.text}>
      Sign in
    </Text>
    </Link>
  
    <Link
    to="/signup"
    component={Pressable}
    style={styles.tab}
    >
    <Text style={styles.text}>
      Sign up
    </Text>
  </Link>
   </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;