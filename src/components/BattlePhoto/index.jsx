"use client";
import React, { useState } from "react";
import Image from "next/image";
import css from "./style.module.css";
import { categories } from "@/categories";

const BattlePhoto = ({ id, counter }) => {
  let photo = undefined;

  try {
    photo = require(`@/static/data/${id.id}/${counter}.jpg`);
  } catch (error) {
    photo = undefined;
  }

  if (!photo) {
    try {
      photo = require(`@/static/data/${id.id}/${counter}.JPG`);
    } catch (error) {
      photo = undefined;
    }
  }

  if (!photo) {
    try {
      photo = require(`@/static/data/${id.id}/${counter}.jpeg`);
    } catch (error) {
      photo = undefined;
    }
  }

  if (!photo) {
    try {
      photo = require(`@/static/data/${id.id}/${counter}.png`);
    } catch (error) {
      photo = undefined;
    }
  }

  if (!photo) {
    try {
      photo = require(`@/static/data/${id.id}/${counter}.PNG`);
    } catch (error) {
      photo = undefined;
    }
  }

  if (!photo) {
    try {
      photo = require(`@/static/data/${id.id}/${counter}.jfif`);
    } catch (error) {
      photo = undefined;
    }
  }
  return (
    <>

      <h3 className={css.photo__title}>{categories[id.id]}</h3>
      <Image className={css.photo} src={photo} alt="photo" />
    </>
  );
};

export default BattlePhoto;
