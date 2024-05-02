"use client";
import Link from "next/link";
import React from "react";
import css from "./style.module.css";
import { useProduct } from "../Context";
import classNames from "classnames";

const EndButton = () => {
  const { setFirstPlayer, setField, setPlayers, setSecondPlayer } =
    useProduct();

  const onEndButton = () => {
    const submit = confirm("Ви хочете завершити гру? Процес буде втрачено!");
    if (submit) {
      localStorage.clear();
      setField([
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30],
      ]);
      setPlayers([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ]);
      setFirstPlayer(-1);
      setSecondPlayer(-1);
    }
  };

  return (
    <Link
      href={"/"}
      onClick={() => onEndButton()}
      className={classNames("red__button", css.end__button)}
    >
      Завершити гру
    </Link>
  );
};

export default EndButton;
