"use client"
import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import Timer from "../Timer";
import PopUp from "../ui/PopUp";
import Link from "next/link";
import { useProduct } from "../Context";
import classNames from "classnames";
import BattlePhoto from "../BattlePhoto";

const Battle = (id) => {
  const {
    firstPlayer,
    secondPlayer,
    setFirstPlayer,
    setSecondPlayer,
    setField,
    setPlayers,
  } = useProduct();

  const defTime = 45;

  const [isRunningFirst, setIsRunningFirst] = useState(false);
  const [isRunningSecond, setIsRunningSecond] = useState(false);
  const [timeFirst, setTimeFirst] = useState(defTime);
  const [timeSecond, setTimeSecond] = useState(defTime);

  const [showPopup, setShowPopup] = useState(false);

  const [counter, setCounter] = useState(1);

  const handleIsRunning = () => {
    setCounter((prevCounter) => {
      if (prevCounter == 30) {
        return 1;
      } else {
        return prevCounter + 1;
      }
    });
    setIsRunningFirst(!isRunningFirst);
    setIsRunningSecond(!isRunningSecond);
  };

  const onPass = () => {
    if (isRunningFirst) {
      if (timeFirst > 3) {
        setTimeFirst(timeFirst - 3);
        setCounter(counter + 1);
      } else {
        setTimeFirst(0);
      }
    } else {
      if (timeSecond > 3) {
        setTimeSecond(timeSecond - 3);
        setCounter(counter + 1);
      } else {
        setTimeSecond(0);
      }
    }
  };

  useEffect(() => {
    if (timeFirst <= 0) {
      setShowPopup(true);
      setIsRunningFirst(false);
      setIsRunningSecond(false);
    } else if (timeSecond <= 0) {
      setShowPopup(true);
      setIsRunningFirst(false);
      setIsRunningSecond(false);
    }
  }, [timeFirst, timeSecond]);

  const submitWinner = () => {
    const winner = timeFirst <= 0 ? secondPlayer : firstPlayer;
    const loser = timeFirst <= 0 ? firstPlayer : secondPlayer;
    setField((prevField) => {
      const updatedField = prevField.map((row) => {
        const updatedRow = row.map((el) => {
          if (el == loser) {
            return winner;
          } else {
            return el;
          }
        });
        return updatedRow;
      });
      localStorage.setItem("field", JSON.stringify(updatedField));
      return updatedField;
    });

    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.filter((el) => el != loser);

      localStorage.setItem("players", JSON.stringify(updatedPlayers));
      return updatedPlayers;
    });

    setFirstPlayer(-1);
    setSecondPlayer(-1);

    localStorage.setItem("firstPlayer", -1);
    localStorage.setItem("secondPlayer", -1);
  };

  return (
    <div className={classNames("container", css.component__wrapper)}>
      {!isRunningFirst && !isRunningSecond ? (
        <div
          onClick={() => setIsRunningFirst(true)}
          className={css.start__wrapper}
        >
          <button className="blue__button">Почати раунд</button>
        </div>
      ) : (
        <BattlePhoto id={id} counter={counter} />
      )}
      <div className={css.timers__wrapper}>
        <div className={css.battle__timer}>
          <Timer
            classWrapper={css.timer__first}
            isRunning={isRunningFirst}
            time={timeFirst}
            setTime={setTimeFirst}
          />
        </div>
        {!isRunningFirst && !isRunningSecond ? (
          <></>
        ) : (
          <div className={css.button__wrapper}>
            <button className="blue__button" onClick={() => handleIsRunning()}>
              Відгадав!
            </button>
            <button className="red__button" onClick={() => onPass()}>
              Пас!
            </button>
          </div>
        )}
        <div className={css.battle__timer}>
          <Timer
            classWrapper={css.timer__second}
            isRunning={isRunningSecond}
            time={timeSecond}
            setTime={setTimeSecond}
          />
        </div>
      </div>
      <PopUp isOpen={showPopup} setIsOpen={setShowPopup}>
        <div className={css.popup__inner}>
          <h2 className={css.popup__title}>Час вичерпано!</h2>
          <p className={css.popup__text}>
            Перемогу здобув гравець №
            {timeFirst <= 0 ? secondPlayer : firstPlayer}. Гравець №
            {timeFirst <= 0 ? firstPlayer : secondPlayer} змушений покинути гру.
            Щоб продовжити, натисніть кнопку нижче
          </p>
          <Link
            className={classNames("blue__button", css.continue__button)}
            href={"/field"}
            onClick={() => submitWinner()}
          >
            Продовжити
          </Link>
        </div>
      </PopUp>
    </div>
  );
};

export default Battle;
