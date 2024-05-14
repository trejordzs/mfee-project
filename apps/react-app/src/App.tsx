import { Grid } from "@mui/material";

import { HomePage } from "./components/Page";
import { PageContainer } from "./components/Page/LoginPage/LoginPage.styles";

function App() {
  return (
    <>
      <HomePage />
      {/* ACT 1 - Render PostPage, and CategoriesPage components */}
      {/* ACT 2 - Move the following content to a new component called LoginPage and render it*/}
      <PageContainer container>
        Login Page
        <Grid item md={4} xs={4} lg={4}>
          Form
        </Grid>
      </PageContainer>
    </>
  );
}

export default App;
