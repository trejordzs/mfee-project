import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";
import Banner from "../../Banner";
import Comments from "../../Comments";

const post = {
  image: "",
  title: "TITLE POST",
  postID: "123456",
  comments: [
    {
      _id: "123457",
      author: "Robinson",
      content: "Sea",
      createdAt: "February",
      updatedAt: "March",
      __v: "Yes",
    },
  ],
  description: "A VERY IMPRESSIVE DESCRIPTION",
}; // ACT 1 - Fill all this properties with random data DONE

function PostPage() {
  return (
    <Container container>
      Post page
      <BannerContainer item>
        {/* ACT 1 - Render Banner component DONE*/}
        <Banner />
      </BannerContainer>
      <DescriptionContainer item>
        <p>{/* ACT 1 - Render post description DONE*/}</p>
        {post.description}
      </DescriptionContainer>
      <CommentsContainer item>
        {/* ACT 1 - Render Comments component DONE*/}
        <Comments />
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
