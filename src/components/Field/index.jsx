"use client";
import classNames from "classnames";
import css from "./style.module.css";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useProduct } from "../Context";
import CountUp from "react-countup";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { categories } from "@/categories";
import PopUp from "../ui/PopUp";
import EndButton from "../EndButton";
import Finish from "../Finish";
import { subjects } from "@/subjects";

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
    "#201923",
    "#f22020",
    "#fee800",
    "#7dfc00",
    "#0ec434",
    "#228c68",
    "#8ad8e8",
    "#235b54",
    "#29bdab",
    "#3998f5",
    "#37294f",
    "#277da7",
    "#3750db",
    "#676767",
    "#991919",
    "#ffcba5",
    "#e68f66",
    "#c56133",
    "#96341c",
    "#632819",
    "#ffc413",
    "#f47a22",
    "#2f2aa0",
    "#b732cc",
    "#772b9d",
    "#f07cab",
    "#d30b94",
    "#989eaf",
    "#c3a5b4",
    "#946aa2",
    "#5d4c86",
  ];

  const findNeighbours = useCallback(
    (playerNumber) => {
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
    },
    [field]
  );

  const chooseNextPlayer = () => {
    setNeighbours([]);
    setSecondPlayer(-1);
    localStorage.setItem("secondPlayer", JSON.stringify(-1));
    if (firstPlayer == -1) {
      const index = Math.floor(Math.random() * players.length);
      setRoll(players[index]);
      localStorage.setItem("firstPlayer", JSON.stringify(players[index]));
      setTimeout(() => {
        setFirstPlayer(players[index]);
        findNeighbours(players[index]);
      }, 1500);
    } else {
      setFirstPlayer(-1)
      const player = JSON.parse(localStorage.getItem("firstPlayer"));
      setRoll(player);
      localStorage.setItem("firstPlayer", JSON.stringify(player));
      setTimeout(() => {
        setFirstPlayer(player);
        findNeighbours(player);
      }, 1500);
    }
  };

  useEffect(() => {
    if (firstPlayer != -1) {
      findNeighbours(firstPlayer);
    }
  }, [findNeighbours, firstPlayer]);

  return (
    <div className="container">
      <ul className={css.table}>
        {field.map((row, index) => {
          return (
            <li key={index} className={css.table__row}>
              {row.map((cell, i) => {
                return (
                  <div key={(i + 1) * 10 + index + 1}>
                    <Link
                      key={i}
                      data-tooltip-id={((i + 1) * 10 + index + 1).toString()}
                      href={`/${(i + 1) * 10 + index + 1}`}
                      onClick={() => {
                        setSecondPlayer(cell);
                        localStorage.setItem(
                          "secondPlayer",
                          JSON.stringify(cell)
                        );
                      }}
                      style={
                        neighbours.includes(cell) && roll != 0
                          ? { color: colors[cell] }
                          : {
                              backgroundColor: colors[cell],
                              pointerEvents: "none",
                              boxShadow: `0px 0px 15px 0px ${colors[cell]}`,
                            }
                      }
                      className={classNames(css.table__cell, {
                        [css.table__cell__active]:
                          cell == firstPlayer && roll != 0,
                        [css.table__cell__nb]:
                          roll != 0 && neighbours.includes(cell),
                        [css.table__disabled]:
                          !neighbours.includes(cell) &&
                          cell != firstPlayer &&
                          firstPlayer != -1 &&
                          roll != 0,
                      })}
                    >
                      <span>{cell}</span>
                    </Link>
                    <ReactTooltip
                      style={{ zIndex: 4, fontSize: 16 }}
                      id={((i + 1) * 10 + index + 1).toString()}
                      place="bottom"
                      content={subjects[(i + 1) * 10 + index + 1]}
                    />
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>

      <PopUp isOpen={players.length <= 1}>
        <Finish />
      </PopUp>

      {!roll ? (
        <button
          className={css.choose__button}
          onClick={() => {
            chooseNextPlayer();
          }}
        >
          Почати наступний раунд
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

      {players.length <= 1 ? (
        ""
      ) : (
        <div className={css.end__wrapper}>
          <EndButton />
        </div>
      )}
    </div>
  );
};

export default Field;
