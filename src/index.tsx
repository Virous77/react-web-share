import { RWebShareProps } from "interfaces";
import React, { cloneElement } from "react";

import Backdrop from "./components/backdrop";
import iconList from "./components/icon/list";
import Portal from "./components/portal";
import SocialIcons from "./components/social-icons";
import useDisclosure from "./hooks/use-disclosure";

export const RWebShare = ({ children, data, sites = Object.keys(iconList) }: RWebShareProps) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const shareData = {
    title: "share",
    text: "",
    url: window.location.href,
    ...data,
  };

  const handleOnClick = () => {
    try {
      if ((window as any).navigator.share) {
        (window as any).navigator.share(shareData);
      } else {
        onOpen();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {cloneElement(children, {
        ...children?.props,
        onClick: handleOnClick,
      })}
      {isOpen && (
        <Portal>
          <Backdrop onClose={onClose}>
            <SocialIcons onClose={onClose} sites={sites} data={shareData} />
          </Backdrop>
        </Portal>
      )}
    </>
  );
};
