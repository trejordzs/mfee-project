import { Title, Container, FormContainer } from "./Comments.styles";
import CommentCard from "../CommentCard";

function Comments() {
  const comments = [
    { id: 1, text: "This is the first comment", author: "User1" },
    { id: 2, text: "This is the second comment", author: "User2" },
  ];
  return (
    <>
    <Container container>
      <Title item sm={8}>
        <h4>Comments</h4>
      </Title>
      {/* ACT 1 = Render CommentCard component DONE*/}
      {/* ACT 3 - Send one comment (comments[0]) as prop to CommentCard component DONE*/}
      {/* ACT 5 - Iterate comments to render CommentCard component for each comment */}
      {comments.map((data) => (
        <CommentCard comment={data} />
      ))}
      <CommentCard comment={comments[0]}/>
      <FormContainer item sm={8}>
        Form
      </FormContainer>
    </Container>
    </>
  );
}

export default Comments;
