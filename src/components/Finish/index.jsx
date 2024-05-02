"use client";
import React from "react";
import EndButton from "../EndButton";
import { useProduct } from "../Context";
import css from './style.module.css'

const Finish = () => {
  
    const {players} = useProduct()

  return (
    <div className={css.popup__inner}>
      <h2 className={css.popup__title}>Гру завершено!</h2>
      <p className={css.popup__text}>Вітаю  гравця №{players[0]} з перемогою! Дякую усім, хто брав участь. Гру створила група ФМН-4 2024 року випуску. Сайт розробив Зінець Вячеслав</p>
      <EndButton/>
    </div>
  );
};

export default Finish;
