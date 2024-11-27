import { Title, Container, FormContainer } from "./Comments.styles";
import CommentCard from "../CommentCard";

function Comments() {
  return (
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {/* ACT 1 = Render CommentCard component DONE*/}
      <CommentCard />
      <FormContainer item sm={8}>
        Form
      </FormContainer>
    </Container>
  );
}

export default Comments;
