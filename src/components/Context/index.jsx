"use client";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";

const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [firstPlayer, setFirstPlayer] = useState(() => {
    let saved;

    try {
      saved = localStorage.getItem("firstPlayer");
    } catch (error) {
      saved = null;
    }
    let initialValue;

    if (saved != null && saved != "undefined") {
      initialValue = JSON.parse(saved);
    } else {
      initialValue = -1;
    }

    return initialValue;
  });

  const [secondPlayer, setSecondPlayer] = useState(() => {
    let saved;
    try {
      saved = localStorage.getItem("secondPlayer");
    } catch (error) {
      saved = null;
    }
    let initialValue;
    if (saved != null && saved != "undefined") {
      initialValue = JSON.parse(saved);
    } else {
      initialValue = -1;
    }

    return initialValue;
  });

  const [field, setField] = useState(() => {
    let saved;
    try {
      saved = localStorage.getItem("field");
    } catch (error) {
      saved = null;
    }
    let initialValue;
    if (saved) {
      initialValue = JSON.parse(saved);
    } else {
      initialValue = [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30],
      ];
    }

    return initialValue;
  });
  const [players, setPlayers] = useState(() => {
    let saved;

    try {
      saved = localStorage.getItem("players");
    } catch (error) {
      saved = null;
    }
    let initialValue;
    if (saved) {
      initialValue = JSON.parse(saved);
    } else {
      initialValue = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ];
    }

    return initialValue;
  });

  const [neighbours, setNeighbours] = useState([]);

  useEffect(() => {
    const defField = localStorage.getItem("field");
    const defPlayers = localStorage.getItem("players");
    if (defField == undefined || defField == null) {
      localStorage.setItem(
        "field",
        JSON.stringify([
          [1, 2, 3, 4, 5, 6],
          [7, 8, 9, 10, 11, 12],
          [13, 14, 15, 16, 17, 18],
          [19, 20, 21, 22, 23, 24],
          [25, 26, 27, 28, 29, 30],
        ])
      );
    }

    if (defPlayers == undefined || defPlayers == null) {
      localStorage.setItem(
        "players",
        JSON.stringify([
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ])
      );
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      firstPlayer,
      setFirstPlayer,
      field,
      setField,
      players,
      setPlayers,
      neighbours,
      setNeighbours,
      secondPlayer,
      setSecondPlayer,
    }),
    [
      firstPlayer,
      setFirstPlayer,
      field,
      setField,
      players,
      setPlayers,
      neighbours,
      setNeighbours,
      secondPlayer,
      setSecondPlayer,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("UseProduct must be used with productProvider");
  }
  return context;
}
