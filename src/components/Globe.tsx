import React, { useState, useEffect, useRef, useContext } from 'react'
import ReactGlobe from 'react-globe.gl';
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import NewLetter, { Letter } from './NewLetter';
import * as firebase from 'firebase/app'
import "firebase/storage"
import * as THREE from 'three';
import GlobeContextProvider, { GlobeContext } from '../contexts/GlobeContext';
import { getLatLngCenter } from '../utils';

// const NewLetter = React.lazy(() => import('./NewLetter'))


// const fbImageUrl = require('../assets/earth-night.jpg');

interface Props {
  letters: Letter[] | firebase.firestore.DocumentData;
}

interface PointData {
  lat: number;
  lng: number;
  size?: number;
  color?: string;
  name?: string;
  radius: number;
}

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color?: string[] | string;
  stroke?: number;
  label?: string;
  letterMetadata: Letter;
}

function debounce(fn: any, ms: number) {
  let timer: any
  return (_: any) => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      //@ts-ignore
      fn.apply(this, arguments)
    }, ms)
  };
}

const StyledGlobeContainer = styled('div').attrs({
  'data-tour': 'step-0'
})`
  width: 100%;
  height: 100%;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  /* padding-top: 5vh; */

  @media only screen and (min-width: 500px) {
    top: 60px;
  }

  & div :focus{
    outline: 0;
  }
`

const Globe = ({ letters = [] }: Props) => {

  // let fbImageUrl = "https://firebasestorage.googleapis.com/v0/b/tyfyservices.appspot.com/o/earth-styled-resized.jpg?alt=media"
  let fbImageUrl = "https://firebasestorage.googleapis.com/v0/b/tyfyservices.appspot.com/o/earth-styled-compressed.jpg?alt=media"



  // useEffect(() => {
  //   async function getImageURL() {
  //     return firebase.storage()
  //       .refFromURL("gs://tyfyservices.appspot.com/earth-styled.jpg")
  //       .fullPath
  //   }

  //   getImageURL()
  // }


  const history = useHistory()


  const { isSuspended, suspendGlobe } = useContext(GlobeContext)

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
    altitude: window.innerWidth > 480 ? 4 : 5 //if mobile, reduce globe size
  })

  const globeEl = useRef<HTMLCanvasElement>(null) as any;

  const [arcData, setArcData] = useState<ArcData[]>([]);
  const [pointsData, setPointsData] = useState<PointData[]>([]);
  function formatPoints(lettersData: Letter[]) {
    const formattedArcs = letters.length > 0 ?
      lettersData
        .filter((letter) => letter.receipient)
        .map((letter: Letter): ArcData => {

          const tooltip = `<div 
            style="
                  color: #444;
                  font-family: 'Merriweather', serif;
                  box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                    0 2px 4px rgba(0,0,0,0.07), 
                    0 4px 8px rgba(0,0,0,0.07), 
                    0 8px 16px rgba(0,0,0,0.07),
                    0 16px 32px rgba(0,0,0,0.07), 
                    0 32px 64px rgba(0,0,0,0.07);
                  max-width: 350px;
                  min-width: 200px !important;
                  line-height: 1.7em;
                  z-index: 99;
                  border-radius: 5px;
                  ">
                  <div style="
                    background: rgb(231, 245, 253, 1);
                    padding: 12px 16px;
                    border-radius: 5px 5px 0% 0%;
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content:center;
                  ">
                  <div style="font-weight: bold;
                    whitespace: nowrap;
                    overflow: ellipsis;
                    width: 100%;
                    text-align: center;
                  ">
                    ${letter.name}
                  <div style="
                    margin: 0 10px; color: #888;
                    display: inline-block;
                  ">
                  →
                  </div>
                  ${letter.receipient && letter.receipient?.name.split(' ')[0]}

                  </div>
                  </div>
                  <div style="
                    background: rgba(255,255,255,1);
                    padding: 16px;
                    border-radius: 0 0 5px 5px;
                    display: block;
                    width: 100%;
                  ">
                    <p>${letter.message}</p>
                  </div>
          </div>
        `

          return {
            startLat: letter.location.lat,
            startLng: letter.location.lon,
            endLat: !!letter.receipient ? +letter.receipient.location.lat.toFixed(6) : ((Math.random() - 0.5) * 180),
            endLng: !!letter.receipient ? +letter.receipient.location.lon.toFixed(6) : ((Math.random() - 0.5) * 360),
            stroke: 3,
            // altitude: 0,
            // color: [['white', 'blue'][Math.round(Math.random() * 2)], ['white', 'blue'][Math.round(Math.random() * 2)]]
            color: ["blue", "green"],
            // color: '#fa8231'
            label: tooltip,
            letterMetadata: letter
          }
        }) : []

    const formattedPoints = letters.length > 0 ?
      lettersData.map((letter: Letter): PointData => {
        return {
          lat: letter.location.lat,
          lng: letter.location.lon,
          size: 0.02,
          // color: [['white', 'blue'][Math.round(Math.random() * 2)], ['white', 'blue'][Math.round(Math.random() * 3)]]
          color: '#26de81',
          radius: 1,
          name: letter.name,
          // ...letter
        }
      }) : []
    setArcData(formattedArcs)
    setPointsData(formattedPoints)

  }




  //init globe
  useEffect(() => {
    globeEl.current.pointOfView({ altitude: window.innerWidth > 480 ? 4 : 5 }, 0)

    //@ts-ignore
    window.pov = globeEl.current.pointOfView


    const globeMaterial = globeEl.current.globeMaterial();

    var color = new THREE.Color("#5196CD");

    globeMaterial.color = color


    const debouncedDimensions = function initGlobeDimensions() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
        altitude: window.innerWidth > 480 ? 4 : 5 //if mobile, reduce globe size
      })
    }

    //set perspective
    globeEl.current.pointOfView({ altitude: window.innerWidth > 480 ? 4 : 5 }, 0)

    window.addEventListener('resize', debouncedDimensions)

    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.15;


    return () => {
      window.removeEventListener('resize', debouncedDimensions)
    }
  }, [])

  useEffect(() => {
    formatPoints(letters as Letter[])

  }, [letters])

  function handleArcHover(arc: any) {

    // hover out
    if (!arc) {
      globeEl.current.controls().autoRotate = true;
    } else {
      globeEl.current.controls().autoRotate = false;

    }

  }

  useEffect(() => {
    if (!!globeEl.current) {
      isSuspended ?
        globeEl.current.pauseAnimation() :
        globeEl.current.resumeAnimation() &&
        (globeEl.current.controls().autRotate = true)
    }
  }, [isSuspended])

  function handleArcClick(arc: any) {
    const center = getLatLngCenter([[arc.startLat, arc.startLng], [arc.endLat, arc.endLng]])

    // globeEl.current.pointOfView({
    //   lat: center[0],
    //   lng: center[1],
    //   // altitude: 2.5
    // }, 500)

    globeEl.current.pointOfView({
      lat: arc.endLat,
      lng: arc.endLng,
      // altitude: 2.5
    }, 300)

    setTimeout(() => {
      // suspendGlobe()
      history.push(`/quick/${arc.letterMetadata.id}`)
    }, 500);


  }

  return (
    <StyledGlobeContainer>
      <ReactGlobe
        ref={globeEl}
        animateIn={false}
        globeImageUrl={fbImageUrl}
        backgroundColor={'#56aade'}
        showGraticules={false}
        height={dimensions.height}
        width={dimensions.width}
        waitForGlobeReady={false}
        arcsData={arcData}
        arcStroke="stroke"
        arcColor="color"
        arcLabel="label"
        // arcDashLength={() => 0.8}
        arcDashGap={0.1}
        arcDashAnimateTime={3000}
        pointsData={pointsData}
        pointAltitude={'size'}
        pointRadius={'radius'}
        pointColor={() => '#ffffff'}
        pointLabel={'name'}
        pointResolution={6}
        onArcClick={(arc) => handleArcClick(arc)}
        onArcHover={(arc) => handleArcHover(arc)}
        showAtmosphere={false}
      />
    </StyledGlobeContainer>
  )
}

export default Globe
