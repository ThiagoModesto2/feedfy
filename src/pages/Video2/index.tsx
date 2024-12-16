"use client";

import { type FC } from "react";

import Provider from "@/components/common/Provider";
import Video2 from "@/components/Video2";

export const VideoPages: FC = () => {
  return (
    <Provider showMenu={false}>
      <Video2 />
    </Provider>
  );
};

export default VideoPages;
