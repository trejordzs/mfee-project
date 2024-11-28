import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";

interface Comment {
  id: number;
  author: string;
  text: string;

}

const commentAuthor = {
  _id: 15555,
  author: "Joseph",
  content: "Content for those in the outside",
  createdAt: "October",
  updatedAt: "November",
  __v: "release",
}; // ACT 1 - Fill all the properties with random data DONE

function CommentCard({ comment }: { comment: Comment }) {
  const {author, text} = comment
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        <Author>{/* ACT 1 - Render comment author DONE*/}
          {author}
        </Author>
        <Typography>{/* ACT 1 - Render comment content DONE*/}{text}</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
