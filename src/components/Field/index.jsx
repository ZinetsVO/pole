"use client";
import classNames from "classnames";
import css from "./style.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useProduct } from "../Context";
import CountUp from "react-countup";

const Field = () => {
  const {
    firstPlayer,
    setFirstPlayer,
    field,
    setField,
    players,
    setPlayers,
    setSecondPlayer,
  } = useProduct();

  const [neighbours, setNeighbours] = useState([]);
  const [roll, setRoll] = useState(0);

  const colors = [
    "#FF5733",
    "#00A896",
    "#FFC300",
    "#FF6347",
    "#3498DB",
    "#FFD700",
    "#FF4500",
    "#2ECC71",
    "#FF69B4",
    "#2980B9",
    "#FFA07A",
    "#8E44AD",
    "#F39C12",
    "#1ABC9C",
    "#E74C3C",
    "#27AE60",
    "#FF1493",
    "#16A085",
    "#E74C3C",
    "#3498DB",
    "#FF6347",
    "#2ECC71",
    "#FFD700",
    "#8E44AD",
    "#F39C12",
    "#1ABC9C",
    "#FFA07A",
    "#2980B9",
    "#FF5733",
    "#FF1493",
    "#FEE800",

    // "#FF7B8C",
    // "#FF0021",
    // "#74000F",
    // "#7D3B3B",
    // "#FFC079",
    // "#FF8700",
    // "#B45F00",
    // "#926C41",
    // "#FEFD76",
    // "#FFFD00",
    // "#A6A100",
    // "#A6A451",
    // "#97FF82",
    // "#2BFF00",
    // "#66A659",
    // "#A9F9FF",
    // "#00EDFF",
    // "#007F89",
    // "#44A5AD",
    // "#8EA5FF",
    // "#0034FF",
    // "#00166A",
    // "#4A5EA8",
    // "#DFBCFF",
    // "#8500FF",
    // "#450084",
    // "#FF5A5A",
    // "#FF0000",
    // "#770000",
    // "#DAF7A6",
    // "#AC2DA4",
  ];

  const findNeighbours = (playerNumber) => {
    const arr = [];

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 6; j++) {
        if (field[i][j] == playerNumber) {
          if (i - 1 >= 0) {
            if (field[i - 1][j] != playerNumber) {
              arr.push(field[i - 1][j]);
            }
          }
          if (i + 1 <= 4) {
            if (field[i + 1][j] != playerNumber) {
              arr.push(field[i + 1][j]);
            }
          }

          if (j - 1 >= 0) {
            if (field[i][j - 1] != playerNumber) {
              arr.push(field[i][j - 1]);
            }
          }
          if (j + 1 <= 5) {
            if (field[i][j + 1] != playerNumber) {
              arr.push(field[i][j + 1]);
            }
          }
        }
      }
    }

    setNeighbours([...arr]);
  };

  const chooseNextPlayer = () => {
    setNeighbours([]);
    setFirstPlayer(-1);
    setSecondPlayer(-1);
    localStorage.setItem("firstPlayer", JSON.stringify(-1));
    localStorage.setItem("secondPlayer", JSON.stringify(-1));
    const index = Math.floor(Math.random() * players.length);
    setRoll(players[index]);
    localStorage.setItem("firstPlayer", JSON.stringify(players[index]));
    setTimeout(() => {
      setFirstPlayer(players[index]);
      findNeighbours(players[index]);
    }, 1500);
  };

  useEffect(() => {
    if (firstPlayer != -1) {
      findNeighbours(firstPlayer);
    }
  }, []);

  return (
    <div className="container">
      <ul className={css.table}>
        {field.map((row, index) => {
          return (
            <li key={index} className={css.table__row}>
              {row.map((cell, i) => {
                return (
                  <Link
                    key={i}
                    href={`/battle/${(i + 1) * 10 + index + 1}`}
                    onClick={() => {
                      setSecondPlayer(cell);
                      localStorage.setItem(
                        "secondPlayer",
                        JSON.stringify(cell)
                      );
                    }}
                    style={
                      neighbours.includes(cell)
                        ? { color: colors[cell] }
                        : {
                            backgroundColor: colors[cell],
                            pointerEvents: "none",
                            boxShadow: `0px 0px 15px 0px ${colors[cell]}`,
                          }
                    }
                    className={classNames(css.table__cell, {
                      [css.table__cell__active]: cell == firstPlayer,
                      [css.table__cell__nb]: neighbours.includes(cell),
                      [css.table__disabled]:
                        !neighbours.includes(cell) &&
                        cell != firstPlayer &&
                        firstPlayer != -1,
                    })}
                  >
                    <span>{cell}</span>
                  </Link>
                );
              })}
            </li>
          );
        })}
      </ul>

      {!roll ? (
        <button
          className={css.choose__button}
          onClick={() => {
            chooseNextPlayer();
          }}
        >
          Поле, вибери наступного гравця!
        </button>
      ) : (
        <div className={css.field__roll}>
          <span>Гравець </span>
          <span className={css.roll}>
            <CountUp start={0} end={roll} duration={2}></CountUp>
          </span>
          <span>обирає суперника</span>
        </div>
      )}

      <Link
        href={"/"}
        onClick={() => {
          const submit = confirm(
            "Ви хочете завершити гру? Процес буде втрачено!"
          );
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
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ]);
          }
        }}
        className={classNames("red__button", css.end__button)}
      >
        Завершити гру
      </Link>
    </div>
  );
};

export default Field;
