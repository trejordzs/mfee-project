import { Grid } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store';

import { HomePage } from './components/Page';
import { PageContainer } from './components/Page/LoginPage/LoginPage.styles';
import { Counter } from './components/Counter';
import {PostPage} from './components/Page';
import {CategoriesPage} from './components/Page';
import LoginPage from './components/Page/LoginPage/LoginPage';

function App() {
  return (
    <Provider store={store}>
      <HomePage />
      {/* ACT 1 - Render PostPage, and CategoriesPage components DONE*/}
      <PostPage />
      <CategoriesPage />
      {/* ACT 2 - Move the following content to a new component called LoginPage and render it DONE*/}
     <LoginPage/>
    </Provider>
  );
}

export default App;
