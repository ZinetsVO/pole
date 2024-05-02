"use client";
import classNames from "classnames";
import React from "react";
import css from './style.module.css'
import Link from "next/link";

const Start = () => {
  return (
    <div className={classNames( css.start__bg)}>
      <h2 className={classNames(css.start__title, css.start__text)}>Природниче поле</h2>
      <p className={classNames(css.start__paragraph, css.start__text)}>
        Правила прості: випадковим чином визначається гравець. Він повинен
        обрати собі суперника, з яким буде змагатися у батлі на одну з тем
        Фізики, Біології, Хімії та Географії. переможець забирає собі УСЕ поле
        суперника. Гра продовжується, доки не залишиться лише один гравець на
        полі. Бажаю удачі!
      </p>
      <Link href={"/field"} className={css.btn__grad}>Почати гру!</Link>
    </div>
  );
};

export default Start;
