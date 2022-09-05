import React, { useContext } from "react";
import { GlobalContext } from "../../components/Global/GlobalContext";
import Header from "../../components/Header/Header";
import { ProgressButton } from "./ProgressButton";
import { AiFillHeart } from "react-icons/ai";
import { GiBattleGear } from "react-icons/gi";
import RulesImg from "../../assets/img/rules.gif";
import Swal from "sweetalert2";
import {
  GiBroadsword,
  GiSlashedShield,
  GiShieldBounces,
  GiPointySword,
  GiFootPlaster,
} from "react-icons/gi";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { typesIcons } from "../../components/PokeTypes/PokemonTypeIcons";
import {
  CardContainer,
  CardContainerRight,
  PokemonsImg,
  Center,
  Name,
  NameMobile,
  Type,
  TypeImg,
  Rules,
  Scores,
  Score,
  BattleArea,
  BattleArena,
  ProgressBarOut,
  StatsSpace,
} from "./styled";

function BattlePage() {
  const {
    userPoints,
    whoWon,
    choiceMade,
    opponentPoints,
    rounds,
    pokeUser,
    opponent,
    choiceStats,
    chosenStat,
    verifyWhoWon,
    changeRound,
  } = useContext(GlobalContext);

  return (
    <div>
      <Header page={"home"} />
      <Rules
        src={RulesImg}
        alt="Battle"
        onClick={() =>
          Swal.fire(
            "Clique no Card do seu Pokémon e escolha um Atributo. Se a pontuação for maior que a do seu oponente >> Você Vence!!",
            "",
            ""
          )
        }
      />
      <BattleArea>
        <Scores>
          <Score>
            <Name>Usuário:{userPoints}</Name>
          </Score>
          <h2>Round {rounds} </h2>
          <Score>
            <Name>Oponente: {opponentPoints}</Name>
          </Score>
        </Scores>
        <BattleArena>
          <NameMobile>Usuário:{userPoints}</NameMobile>
          <Flippy
            flipOnHover={false}
            flipOnClick={true}
            flipDirection="horizontal"
            style={{ width: "320px", height: "515px" }}
          >
            <FrontSide
              style={{
                backgroundcolor: "none",
                padding: "0",
                height: "0",
                width: "0",
              }}
            >
              <CardContainer type={pokeUser?.types[0]?.type?.name}>
                <span>
                  {pokeUser?.id < 10
                    ? "00" + pokeUser?.id
                    : pokeUser?.id >= 10 && pokeUser?.id < 100
                    ? "0" + pokeUser?.id
                    : pokeUser?.id}
                </span>
                <PokemonsImg
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeUser?.id}.png`}
                  alt={pokeUser?.name}
                />
                <Name>{pokeUser?.name}</Name>
                <Type>
                  <TypeImg src={typesIcons[pokeUser?.types[0]?.type?.name]} />
                  <TypeImg src={typesIcons[pokeUser?.types[1]?.type?.name]} />
                </Type>
                {choiceStats?.length > 0 && (
                  <StatsSpace>
                    <div>
                      <h3>
                        <GiBattleGear /> {choiceStats[0]}
                      </h3>
                      <ProgressBarOut>
                        {
                          <ProgressButton
                          color="coral"
                          bar={chosenStat}
                          />
                        }
                      </ProgressBarOut>
                    </div>
                  </StatsSpace>
                )}
              </CardContainer>
            </FrontSide>
            <BackSide
              style={{
                backgroundcolor: "none",
                padding: "0",
                height: "0",
                width: "0",
              }}
            >
              <CardContainer type={pokeUser?.types[0]?.type?.name}>
                <h2>Base stats:</h2>
                <br />
                <StatsSpace>
                  <div>
                    <h3>
                      <AiFillHeart color="red" /> HP:{" "}
                    </h3>
                    <ProgressBarOut
                      disabled={choiceMade}
                      onClick={() => verifyWhoWon(0, "HP")}
                    >
                      {
                        <ProgressButton
                          color={"red"}
                          bar={pokeUser?.stats[0].base_stat}
                        />
                      }
                    </ProgressBarOut>
                  </div>
                  <div>
                    <h2>
                      <GiBroadsword color="orange" /> Attack:
                    </h2>
                    <ProgressBarOut
                      disabled={choiceMade}
                      onClick={() => verifyWhoWon(1, "Attack")}
                    >
                      {
                        <ProgressButton
                          color={"orange"}
                          bar={pokeUser?.stats[1].base_stat}
                        />
                      }
                    </ProgressBarOut>
                  </div>
                  <div>
                    <h2>
                      <GiSlashedShield color="blue" /> Defense:
                    </h2>
                    <ProgressBarOut
                      disabled={choiceMade}
                      onClick={() => verifyWhoWon(2, "Defense")}
                    >
                      {
                        <ProgressButton
                          color="blue"
                          bar={pokeUser?.stats[2].base_stat}
                        />
                      }
                    </ProgressBarOut>
                  </div>
                  <div>
                    <h2>
                      <GiPointySword color="yellow" /> SP Attack:{" "}
                    </h2>
                    <ProgressBarOut
                      disabled={choiceMade}
                      onClick={() => verifyWhoWon(3, "Special Attack")}
                    >
                      {
                        <ProgressButton
                          color="yellow"
                          bar={pokeUser?.stats[3].base_stat}
                        />
                      }
                    </ProgressBarOut>
                  </div>
                  <div>
                    <h2>
                      <GiShieldBounces color="green" />
                      SP Defense:{" "}
                    </h2>
                    <ProgressBarOut
                      disabled={choiceMade}
                      onClick={() => verifyWhoWon(4, "Special Defense")}
                    >
                      {
                        <ProgressButton
                          color="green"
                          bar={pokeUser?.stats[4].base_stat}
                        />
                      }
                    </ProgressBarOut>
                  </div>
                  <div>
                    <h2>
                      <GiFootPlaster color="pink" />
                      Speed:
                    </h2>
                    <ProgressBarOut
                      disabled={choiceMade}
                      onClick={() => verifyWhoWon(4, "Speed")}
                    >
                      {
                        <ProgressButton
                          color="pink"
                          bar={pokeUser?.stats[4].base_stat}
                        />
                      }
                    </ProgressBarOut>
                  </div>
                </StatsSpace>
              </CardContainer>
            </BackSide>
          </Flippy>

          <Center>
            <h1>Vs</h1>
            <span>{whoWon !== "" && <h2>{whoWon}</h2>}</span>
            {choiceMade && (
              <button onClick={() => changeRound()}>Novo Round</button>
            )}
          </Center>

          <NameMobile>Oponente: {opponentPoints}</NameMobile>
          <CardContainerRight type={opponent?.types[0]?.type?.name}>
            <span>
              {opponent?.id < 10
                ? "00" + opponent?.id
                : opponent?.id >= 10 && opponent?.id < 100
                ? "0" + opponent?.id
                : opponent?.id}
            </span>
            <PokemonsImg
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${opponent?.id}.png`}
              alt={opponent?.name}
            />
            <Name>{opponent?.name}</Name>
            <Type>
              <TypeImg src={typesIcons[opponent?.types[0]?.type?.name]} />
              <TypeImg src={typesIcons[opponent?.types[1]?.type?.name]} />
            </Type>

            {choiceStats?.length > 0 && (
              <StatsSpace>
                <div>
                  <h3>
                    <GiBattleGear /> {choiceStats[0]}
                  </h3>
                  <ProgressBarOut>
                    {
                      <ProgressButton
                        color="coral"
                        bar={choiceStats[1]}
                      />
                    }
                  </ProgressBarOut>
                </div>
              </StatsSpace>
            )}
          </CardContainerRight>
        </BattleArena>
      </BattleArea>
    </div>
  );
}

export default BattlePage;
