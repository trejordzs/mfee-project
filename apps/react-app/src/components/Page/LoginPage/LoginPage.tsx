import { Grid } from '@mui/material';
import { PageContainer } from "./LoginPage.styles"
import { Counter } from "../../Counter"

const LoginPage = () => {

    return(
        <PageContainer container>
            Login Page
            <Grid item md={4} xs={4} lg={4}>
            Form
            </Grid>
            <Counter />
        </PageContainer>
            )}
            
export default LoginPage;

