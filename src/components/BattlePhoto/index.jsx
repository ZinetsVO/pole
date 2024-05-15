"use client";
import React, { useState } from "react";
import Image from "next/image";
import css from "./style.module.css";
import { categories } from "@/categories";

const BattlePhoto = ({ id, photo }) => {

  return (
    <>

      <h3 className={css.photo__title}>{categories[id.id]}</h3>
      <Image className={css.photo} src={photo} alt="photo" />
    </>
  );
};

export default BattlePhoto;
