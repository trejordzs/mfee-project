import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { Container, Content, Author } from "./CommentCard.styles";

const comment = {
  _id: 15555,
  author: "Joseph",
  content: "Content for those in the outside",
  createdAt: "October",
  updatedAt: "November",
  __v: "release",
}; // ACT 1 - Fill all the properties with random data DONE

function CommentCard() {
  return (
    <Container item sm={8}>
      <AccountCircleIcon />
      <Content>
        <Author>{/* ACT 1 - Render comment author DONE*/}
          {comment.author}
        </Author>
        <Typography>{/* ACT 1 - Render comment content DONE*/}{comment.content}</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
