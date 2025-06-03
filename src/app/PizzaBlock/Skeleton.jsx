import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={555}
    viewBox="0 0 280 555"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="3" y="270" rx="10" ry="10" width="280" height="27" />
    <rect x="3" y="310" rx="10" ry="10" width="280" height="50" />
    <rect x="3" y="372" rx="10" ry="10" width="280" height="88" />
    <rect x="3" y="486" rx="10" ry="10" width="115" height="30" />
    <rect x="174" y="476" rx="25" ry="25" width="108" height="45" />
    <circle cx="137" cy="127" r="125" />
  </ContentLoader>
);

export default Skeleton;
