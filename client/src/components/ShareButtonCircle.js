import React from "react";

import {
    FacebookShareButton,
    LineShareButton,
    FacebookShareCount,
    HatenaShareCount,
    OKShareCount,
    PinterestShareCount,
    RedditShareCount,
    TumblrShareCount,
    TwitterIcon,
    LinkedinIcon,
    VKShareCount,
    LinkedinShareButton,
    RedditShareButton,
    RedditIcon
} from "react-share";

const SocialShareButtonCircle = ({ url }) => (
    <div style={{ padding: 10 }}>
        <FacebookShareButton url={url}>
            <TwitterIcon size={32} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton url={url}>
            <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <RedditShareButton url={url}>
            <RedditIcon size={32} round={true} />
        </RedditShareButton>
    </div>
);

export default SocialShareButtonCircle;