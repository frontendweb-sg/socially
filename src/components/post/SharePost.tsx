import Box from "../controls/Box";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
type Props = {
  postId: string;
};
const SharePost = ({ postId }: Props) => {
  return (
    <Box>
      {/* <FacebookShareButton url="''"></FacebookShareButton>
      <EmailShareButton url="''"></EmailShareButton>
      <TwitterShareButton></TwitterShareButton> */}
    </Box>
  );
};

export default SharePost;
