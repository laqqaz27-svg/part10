import { StyleSheet, View } from 'react-native';
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-native';

import RepositoryList from './RepositoryList';
import Repository from './Repository';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flex: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />

      <Routes>
        <Route
          path="/"
          element={<RepositoryList />}
        />

        <Route
          path="/repositories/:id"
          element={<Repository />}
        />

        <Route
          path="/signin"
          element={<SignIn />}
        />

        <Route
           path="/signup"
         element={<SignUp />}
       />  

      <Route
        path="/createreview"
        element={<CreateReview />}
      />
     <Route
      path="/myreviews"
     element={<MyReviews />}
     />
            
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </View>
  );
};

export default Main;