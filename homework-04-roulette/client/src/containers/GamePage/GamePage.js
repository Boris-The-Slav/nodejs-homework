import React, { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import PlayerDashboard from "../../components/PlayerDashboard/PlayerDashboard";
import RouletteTable from "../../components/RoulleteTable/RouletteTable";
import Modal from "../../components/Modal/Modal";
import RouletteWheel from "../../components/RouletteWheel/RoulettaWheel";
import WinScreen from "../../components/WinScreen/WinScreen";
import ChargeBalanceForm from "./ChargeBalanceForm/ChargeBalanceForm";

import game from "../../api/game";

const GamePage = props => {
  const [bets, setBets] = useState({});
  const [betAmmount, setBetAmmount] = useState(10);
  const [startingBalance, setStartingBalance] = useState(null);
  const [playerBalance, setPlayerBalance] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const [betResult, setBetResult] = useState({});
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [chipIndexValue, setChipIndexValue] = useState(0);
  const [isBetValid, setIsBetValid] = useState(true);

  const chipValues = [10, 20, 50, 100, 500];

  useEffect(() => {
    setStartingBalance(() => props.userData.balance);
    setPlayerBalance(() => props.userData.balance);
    setBets({});
  }, [props.userData.balance]);

  useEffect(() => {
    setBets({});
  }, [isReset]);

  useEffect(() => {
    setIsBetValid(true);
    if (betAmmount > playerBalance) {
      setIsBetValid(false);
      console.log("you've reached the end");
    }

    //IF CURRENT BET IS BIGGUR THAN PLAYER BALANCE DO LOGIC I'M DONE
  }, [playerBalance, betAmmount]);

  useEffect(() => {
    const spinTimer = setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
    return () => {
      clearTimeout(spinTimer);
    };
  }, [showWinModal]);

  const betsArr = Object.values(bets).filter(bet => bet.betAmmount > 0);

  const onBetsPost = () => {
    if (!betsArr.length) return;
    setShowWinModal(true);
    setIsSpinning(true);
    game
      .post(`/bets/${props.userData.id}`, betsArr)
      .then(res => {
        setStartingBalance(() => res.data.newPlayerBalance.balance);
        setPlayerBalance(() => res.data.newPlayerBalance.balance);
        setBets({});
        setBetResult(res.data.result);
        setIsReset(oldState => !oldState);
      })
      .catch(err => {
        setBets({});
        setIsReset(oldState => !oldState);
        setBetResult(err.response.data);
        console.log(err.response.data);
      });
  };
  return (
    <Fragment>
      <Modal show={showBalanceModal} onShow={setShowBalanceModal}>
        <ChargeBalanceForm
          onShowModal={setShowBalanceModal}
          playerId={props.userData.id}
          setStartingBalance={setStartingBalance}
          setPlayerBalance={setPlayerBalance}
        />
      </Modal>
      {isSpinning ? (
        <RouletteWheel />
      ) : (
        <Modal show={showWinModal}>
          <WinScreen {...betResult} setShowModal={setShowWinModal} />
        </Modal>
      )}

      {!props.isLoggedIn && <Redirect to="/login" />}
      <RouletteTable
        isBetValid={isBetValid}
        isReset={isReset}
        startingBalance={startingBalance}
        betAmmount={betAmmount}
        bets={bets}
        onBetAdd={setBets}
        onPlayerBalanceUpdate={setPlayerBalance}
        playerBalance={playerBalance}
      />
      <PlayerDashboard
        chipValuesArr={chipValues}
        chipIndexValue={chipIndexValue}
        setChipArrIndex={setChipIndexValue}
        setShowBalanceModal={setShowBalanceModal}
        onBetsPost={onBetsPost}
        onLogout={props.onLogout}
        onReset={setIsReset}
        onBetValueChange={setBetAmmount}
        chipValue={betAmmount}
        playerBalance={playerBalance}
      />
    </Fragment>
  );
};

export default GamePage;
