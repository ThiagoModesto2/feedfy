"use client";

import { type FC } from "react";

import Provider from "@/components/common/Provider";
import Video from "@/components/Video";

export const VideoPages: FC = () => {
  return (
    <Provider showMenu={false}>
      <Video />
    </Provider>
  );
};

export default VideoPages;
