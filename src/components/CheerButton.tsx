import React from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Confetti from 'react-dom-confetti'
import * as firebase from 'firebase/app';
import { Howl } from 'howler'

const CHEER_MP3_URL = 'https://firebasestorage.googleapis.com/v0/b/tyfyservices.appspot.com/o/Big-crowd-cheering-comp2.mp3?alt=media&token=36ebde2e-42d5-4e67-aa4b-ebca610d9f58'

const defaultConfettiConfig = {
  stagger: 2,
  elementCount: 65,
  spread: 60,
  startVelocity: 80,
}





interface Props {
  onClick?: () => undefined;
}

interface CheerCount {
  totalCheers: number;
}

interface CheerClick {
  num: number;
  str: string;
}

const CheerButton = (props: Props) => {

  let audioSource = null;

  const [audioState, setAudioState] = React.useState<{
    isPlaying: boolean;
    isCelebrating: boolean;
    isLoaded: boolean;
    config: any;
  }>({
    isPlaying: false,
    isCelebrating: false,
    isLoaded: false,
    config: defaultConfettiConfig
  })

  let [clicks, setClicks] = React.useState<CheerClick>({
    num: 0,
    str: '0'
  })

  // const [audioBuffer, setAudioBuffer] = React.useState<AudioBufferSourceNode>()
  // const [audioContext, setAudioContext] = React.useState<AudioContext>()
  // const [gainNode, setGainNode] = React.useState<GainNode>();
  const [cheer1Audio, setCheer1Audio] = React.useState<Howl>();
  const [timerId, setTimerId] = React.useState<any>(undefined);
  const [cheerArr, setCheerArr] = React.useState<CheerClick[]>([]);
  const [holdCount, setHoldCount] = React.useState<number>(0)


  function throttleCount(func, delay) {
    if (timerId) {
      return
    }

    setTimerId(setTimeout(() => {
      func()
      setTimerId(undefined)
    }, delay))

  }

  async function handleButtonClick() {
    // window.navigator.vibrate(1);
    // setClicks(clicks += 1)

    // cheer1Audio.load()

    setAudioState({
      ...audioState,
      isCelebrating: true,
    })

    if (!cheer1Audio.playing()) {
      cheer1Audio.play()
    }

    addCheerCount()

    setCheerArr([...cheerArr,
    {
      num: clicks.num,
      str: clicks.str
    }].slice(cheerArr.length >= 5 ?
      cheerArr.length - 5 : 0, cheerArr.length + 1)
    );

    throttleCount(() => {
      cheer1Audio.play()
      setAudioState({ ...audioState, isCelebrating: false })

    }, 800)


  }

  // let counter

  // function handleButtonHold() {
  //   counter = setInterval(() => {
  //     handleButtonClick()
  //   }, 500)
  // }

  // function cancelButtonHold() {
  //   clearInterval(counter)
  // }



  function kFormatter(num: number) {
    return Math.abs(num) > 999 ? (Math.abs(num) / 1000).toFixed(2) + 'k' : Math.sign(num) * Math.abs(num)
  }


  function loadAudio() {
    return new Promise(async (resolve, reject) => {

      const sound = new Howl({
        src: [CHEER_MP3_URL],
        preload: true,
        onend: (id) => {
          setCheerArr([])
          setAudioState({ ...audioState, isCelebrating: false, isPlaying: false, isLoaded: true })
        },
        onload: () => {
          setAudioState({ ...audioState, isLoaded: true })
        }
      })

      setCheer1Audio(sound)

    });
  }

  const cheerCountRef = firebase.firestore().collection('counters')
    .doc('cheerCount')

  function getCheerCount() {
    cheerCountRef.onSnapshot((snap) => {

      let { totalCheers = 0 } = snap.data()

      setClicks({ num: totalCheers, str: kFormatter(totalCheers).toString() })
    })
  }

  function addCheerCount() {
    const increment = firebase.firestore.FieldValue.increment(1);
    cheerCountRef.update('totalCheers', increment)
  }

  React.useEffect(() => {

    if (!audioState.isLoaded) {
      loadAudio()
    }

    getCheerCount()


  }, [])


  return (
    <StyledCheerButtonWrapper onTouchStart={() => false}>
      {
        cheerArr.map((click: CheerClick, i) => (
          <StyledCheerCounter key={`${click.num}-${i}`}>
            {click.str}
          </StyledCheerCounter>
        ))
      }
      {/* <audio preload="auto" controls={false} id="audio-el" /> */}
      <StyledCheerButton
        onClick={(e: any) => { handleButtonClick(); e.target.focus() }}
      // onMouseDown={handleButtonHold}
      // onMouseUp={cancelButtonHold}
      >
        <span>👏</span>
      </StyledCheerButton>
      <Confetti active={audioState.isCelebrating} config={audioState.config} />
    </StyledCheerButtonWrapper>
  )
}

export default CheerButton

const StyledCheerButtonWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  padding-bottom: 20px;
  pointer-events: none;

  div {
    margin: 0 auto;
    position: absolute !important;
    left: 0;
    right: 0;
    z-index: 5;
    will-change: transform;
  }
`;

const StyledCheerCounter = styled.aside`
  /* background: #56aade; */
  text-shadow: 0px 0px 2px #56aade,
               0px 0px 5px #56aade;

  font-size: 14px;
  color: #FFF;
  font-weight: bold;
  /* box-shadow: 0px 3px 5px rgba(0,0,0,0.1); */
  border-radius: 3px;
  pointer-events: none;
  /* padding: 4px 10px; */
  padding: 0;
  /* text-transform: uppercase; */
  letter-spacing: 1px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  position: absolute;
  /* margin-bottom: 10px; */
  left: 0;
  right: 0;
  top: -30px;
  z-index: 8;
  animation: animate-in 600ms ease-out forwards;
  opacity: 0;
  will-change: opacity transform;

  @keyframes animate-in {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }

    25% {
      transform: translateY(0px);
      opacity: 1;
    }

    75% {
      transform: translateY(0px);
      opacity: 1;
    }

    100% {
      transform: translateY(0px);
      opacity: 0;
    }
  }

`;

const StyledCheerButton = styled('button').attrs({
  'data-tour': 'step-2'
})`
  height: 80px;
  width: 80px;
  border: 0px solid #f0f0f0;
  background: #FFF;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 42px;
  outline: 0;
  padding: 0;
  transition: transform 100ms cubic-bezier(0.64, 0.57, 0.67, 1.53);
  box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
  will-change: transform;
  z-index: 3;
  position: relative;
  pointer-events: all;

  /* overflow: hidden; */
  span {
    transition: transform 100ms cubic-bezier(0.64, 0.57, 0.67, 1.53);
    will-change: transform;
    display: block;
  }

  &:hover {
    transform: scale(1.02);
  }

  &:hover > ${StyledCheerCounter} {
    opacity: 1 !important;
  }



  &:active {
    transform: scale(1.10);

    span {
      transform: scale(1.25);
    }

  }




`;