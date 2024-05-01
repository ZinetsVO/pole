import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import css from "./style.module.css"

const PopUp = ({ isOpen, setIsOpen, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = document.body;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
    }
  }, [isOpen]);

  return (
    ref.current &&
    createPortal(
      <div
        className={classNames(css.popup__bg, {
          [css.open]: isOpen,
        })}
      >
        <div
        //   className={classNames(css.popup__wrapper, {
        //     [css.open__wrapper]: isOpen,
        //   })}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      ref.current
    )
  );
};

export default PopUp;
