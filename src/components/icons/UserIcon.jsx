import React from "react";
import Icon from "@ant-design/icons";

const UserSvg = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M107.18 133.276C136.096 99.916 172.891 75.3598 223.326 85.1884C365.456 112.881 338.117 308.357 197.518 317.161C83.6745 324.294 41.0824 151.796 132.987 127.619"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M176.018 135.47C222.96 88.5926 276.979 177.72 220.133 202.943C175.645 222.679 148.672 173.131 176.018 144.011"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M149.105 291.786C167.071 206.141 254.17 200.375 254.17 300.221"
        stroke="#000000"
        strokeOpacity="0.9"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </g>
  </svg>
);

const UserIcon = (props) => <Icon component={UserSvg} {...props} />

export default UserIcon
