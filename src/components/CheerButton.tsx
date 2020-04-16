import React from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Confetti from 'react-dom-confetti'
import { Howl } from 'howler'

const CHEER_MP3_URL = 'https://firebasestorage.googleapis.com/v0/b/tyfyservices.appspot.com/o/Big-crowd-cheering.mp3?alt=media&token=d8e78870-82a5-4a37-b0ab-42518b02f0c1'

const defaultConfettiConfig = {
  stagger: 0,
  elementCount: 45,
  spread: 60,
  startVelocity: 70,
}
const StyledCheerButtonWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;

  div {
    margin: 0 auto;
    position: absolute !important;
    left: 0;
    right: 0;
    z-index: 1;
    will-change: transform;
  }
`;

const StyledCheerButton = styled.button`
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
  /* overflow: hidden; */
  span {
    transition: transform 100ms cubic-bezier(0.64, 0.57, 0.67, 1.53);
    will-change: transform;
    display: block;
  }



  &:active {
    transform: scale(1.10);

    span {
      transform: scale(1.25);
    }

  }




`;


interface Props {
  onClick?: () => undefined;
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

  let [clicks, setClicks] = React.useState<number>(0)

  // const [audioBuffer, setAudioBuffer] = React.useState<AudioBufferSourceNode>()
  // const [audioContext, setAudioContext] = React.useState<AudioContext>()
  // const [gainNode, setGainNode] = React.useState<GainNode>();
  const [cheer1Audio, setCheer1Audio] = React.useState<Howl>();
  const [timerId, setTimerId] = React.useState<any>(undefined)

  function throttleCount(func, delay) {
    if (timerId) {
      return
    }

    setTimerId(setTimeout(() => {
      func()
      setTimerId(undefined)
    }, delay))

  }

  function handleButtonClick() {
    // window.navigator.vibrate(1);
    setClicks(clicks += 1)

    setAudioState({
      ...audioState,
      isCelebrating: true,
    })

    if (!cheer1Audio.playing()) {
      cheer1Audio.play()
    }

    throttleCount(() => {
      cheer1Audio.play()
      // cheer1Audio.play();
      setAudioState({ ...audioState, isCelebrating: false })
    }, 1200)

    // setTimeout(() => setAudioState({ ...audioState, isPlaying: false, isCelebrating: false }), 500)
    // play audio
    // console.log(audioContext);
    // console.log(audioBuffer);
    // audioContext.currentTime = 0;
    // audioBuffer.start(0)
    // cheer1Audio.currentTime = 0;

  }


  function loadAudio() {
    return new Promise(async (resolve, reject) => {

      // let audio = document.getElementById('audio-el') as HTMLAudioElement

      // let AudioContext = window.AudioContext;

      // const arrayBuffer = await axios.get(CHEER_MP3_URL, {
      //   responseType: 'arraybuffer'
      // })

      // const getAudioContext = () => {
      //   const audioContent = new AudioContext();
      //   return audioContent
      // }



      // const audioContext = getAudioContext();
      // const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.data)

      // // create audio source
      // const source = audioContext.createBufferSource();
      // source.buffer = audioBuffer;
      // source.connect(audioContext.destination);

      // audio.preload = 'auto';
      // audio.src = CHEER_MP3_URL;

      const sound = new Howl({
        src: [CHEER_MP3_URL],
        preload: true,
      })


      // setAudioContext(audioContext)
      // setAudioBuffer(source)
      // setGainNode(audioContext.createGain())
      setCheer1Audio(sound)

      // return source

    });
  }

  React.useEffect(() => {

    if (!audioState.isLoaded) {
      loadAudio()
    }

  }, [])


  return (
    <StyledCheerButtonWrapper>
      {/* <audio preload="auto" controls={false} id="audio-el" /> */}
      <StyledCheerButton onClick={handleButtonClick}>
        <span>👏</span>
      </StyledCheerButton>
      <Confetti active={audioState.isCelebrating} config={audioState.config} />
    </StyledCheerButtonWrapper>
  )
}

export default CheerButton
