import React, { useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { BASE_URL } from "../../constants/url";
import Swal from "sweetalert2";

const GlobalState = (props) => {
  const [pokemon, setPokemon] = useState();
  const [pokedex, setPokedex] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getAllPokemons = async () => {
      await axios
        .get(`${BASE_URL}pokemon?limit=900&offset=0`)
        .then((response) => {
          setIsLoading(false);
          pokemonList(response.data.results);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Algo deu errado. Tente novamente mais tarde",
            footer: `Código do erro ${error.response.status}`,
          });
        });
    };
    getAllPokemons();
    setIsLoading(false);
  }, []);

  const pokemonList = async (data) => {
    setIsLoading(true);
    const pokeInfo = await Promise.all(
      data.map(async (pokemon) => {
        const pokemonRecord = await axios
          .get(pokemon.url)
          .then((response) => {
            setIsLoading(false);
            return response.data;
          })
          .catch((error) => {
            setIsLoading(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo deu errado. Tente novamente mais tarde",
              footer: `Erro: ${error.response.message}`,
            });
          });
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonRecord?.id}.png`;
        return {
          ...pokemonRecord,
          image,
        };
      })
    );
    setPokemon(pokeInfo);
  };

  //Batalha

  const [pokeUser, setPokeUser] = useState();
  const [opponent, setOpponent] = useState();
  const [opponentPoints, setOpponentPoints] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [rounds, setRounds] = useState(1);
  const [choiceStats, setChoiceStats] = useState();
  const [chosenStat, setChosenStat] = useState();
  const [choiceMade, setChoiceMade] = useState(false);
  const [whoWon, setWhoWon] = useState();

  useEffect(() => {
    setChoiceStats([]);
    setChoiceMade(false);
    setWhoWon();

    const pokeUserId = Math.floor(Math.random() * 899) + 1;
    getPokeUser(pokeUserId);
    getOpponent();
    endGame();
  }, [rounds]);

  const getPokeUser = (idRaffled) => {
    axios
      .get(`${BASE_URL}pokemon/${idRaffled}`)
      .then((res) => {
        setPokeUser(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo deu errado. Tente novamente mais tarde",
          footer: `Erro: ${err.message}`,
        });
      });
  };

  const getOpponent = () => {
    const pokeOpponentId = Math.floor(Math.random() * 899) + 1;

    axios
      .get(`${BASE_URL}pokemon/${pokeOpponentId}`)
      .then((res) => {
        setOpponent(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo deu errado. Tente novamente mais tarde",
          footer: `Erro: ${err.message}`,
        });
      });
  };

  const userStats =
    pokeUser?.stats &&
    pokeUser?.stats?.map((stat) => {
      let ArrayStat = [];
      ArrayStat?.push(stat.base_stat);
      return ArrayStat;
    });

  const opponentStats =
    opponent?.stats &&
    opponent?.stats?.map((stat) => {
      let ArrayStat = [];
      ArrayStat?.push(stat.base_stat);
      return ArrayStat;
    });

  const verifyWhoWon = (index, chosenStat) => {
    setChoiceStats([chosenStat, opponentStats[index]]);
    setChosenStat(userStats[index]);
    setChoiceMade(true);

    const opponent = (opponentStats[index]);
    const user = (userStats[index]);

    if (opponent > user) {
      setWhoWon("Você perdeu a rodada!");
      return setOpponentPoints(opponentPoints + 1);
    } else if (user > opponent) {
      setWhoWon("Você venceu a rodada!");
      return setUserPoints(userPoints + 1);
    } else if (user === opponent) {
      return setWhoWon("Rodada Empatada... Vamos para a próxima!");
    }
  };

  const changeRound = () => {
    return setRounds(rounds + 1);
  };

  const endGame = () => {
    if (rounds > 5) {
      setUserPoints(0);
      setOpponentPoints(0);
      setRounds(0);

      if (userPoints > opponentPoints) {
        Swal.fire(
          `You Win!! Dentre as 5 rodadas você venceu mais vezes!`,
          "",
          ""
        );
      } else {
        Swal.fire(
          "Oh, no - You Lose! Dentre as 5 rodadas seu oponente venceu mais vezes!",
          ""
        );
      }
    }
  };

  //Batalha

  return (
    <GlobalContext.Provider
      value={{
        pokemon,
        setPokemon,
        pokedex,
        setPokedex,
        isLoading,
        setIsLoading,
        userPoints,
        whoWon,
        choiceMade,
        opponentPoints,
        rounds,
        pokeUser,
        opponent,
        userStats,
        choiceStats,
        chosenStat,
        verifyWhoWon,
        changeRound,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
