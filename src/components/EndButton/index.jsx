"use client";
import Link from "next/link";
import React, { useState } from "react";
import css from "./style.module.css";
import { useProduct } from "../Context";
import classNames from "classnames";
import toast, { Toaster } from "react-hot-toast";
import { RiQuestionLine } from "react-icons/ri";

const EndButton = () => {
  const { setFirstPlayer, setField, setPlayers, setSecondPlayer } =
    useProduct();


  const onConfirm = (t) => {
    toast.dismiss(t.id);
   
    localStorage.clear();
    setField([
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
    ]);
    setPlayers([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ]);
    setFirstPlayer(-1);
    setSecondPlayer(-1);
  };

  const onEndButton = () => {
    toast(
      (t) => (
        <div className={css.toaster}>
          <h5 className={css.toaster__text}>
           Ви впевнені, що хочете почати знову?
          </h5>
          <div className={css.toaster__button__wrapper}>
            <Link
            href={"/"}
              className={classNames("blue__button", css.toaster__button)}
              onClick={() => onConfirm(t)}
            >
              Підтвердити
            </Link>
            <button
              className={classNames("red__button", css.toaster__button)}
              onClick={() => toast.dismiss(t.id)}
            >
              Скасувати
            </button>
          </div>
        </div>
      ),
      {
        icon: <RiQuestionLine size={20} />,
        duration: 10000,
      }
    );
  };

  return (
    <>
      <button
        onClick={() => onEndButton()}
        className={classNames("red__button", css.end__button)}
      >
        Завершити гру
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default EndButton;
