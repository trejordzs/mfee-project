import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { BannerContent, BannerTitle, Container } from "./Banner.styles";

const postImage = ""; // ACT 1 - Put some image URL
// const postTitle = ""; //ACT 1 -  Write a title

function Banner() {
  return (
    <Container image={postImage}>
      <BannerContent>
        <Button sx={{ color: "white" }} startIcon={<ArrowBackIosIcon />}>
          View Posts
        </Button>
        <BannerTitle variant="h3">
          {/* ACT 1 - Render postTitle */}
        </BannerTitle>
      </BannerContent>
    </Container>
  );
}

export default Banner;
