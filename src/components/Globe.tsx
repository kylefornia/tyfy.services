import React from 'react'
import ReactGlobe from 'react-globe.gl';
import styled from 'styled-components'
import { Letter } from './NewLetter';
import * as firebase from 'firebase/app'
import "firebase/storage"
import * as THREE from 'three';


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

const StyledGlobeContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* padding-top: 5vh; */
`

const Globe = ({ letters = [] }: Props) => {

  let fbImageUrl = "https://firebasestorage.googleapis.com/v0/b/tyfyservices.appspot.com/o/earth-styled-resized.jpg?alt=media"



  // useEffect(() => {
  //   async function getImageURL() {
  //     return firebase.storage()
  //       .refFromURL("gs://tyfyservices.appspot.com/earth-styled.jpg")
  //       .fullPath
  //   }

  //   getImageURL()
  // }


  const { useState, useEffect, useRef } = React;

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
      lettersData.map((letter: Letter): ArcData => {

        const tooltip = `<div 
            style="background: #FFF; 
                  padding: 16px;
                  color: #444;
                  font-family: 'Merriweather', serif;
                  box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
                  max-width: 400px;
                  min-width: 200px !important;
                  line-height: 1.7em;
                  z-index: 99;
                  border-radius: 3px">
                  <span style="
                    font-weight: 900;
                    font-family: 'Open Sans', sans-serif;
                    color: #45aaf2;
                    margin-top: 0;
                    margin-bottom: 15px;
                  ">${letter.name}</span>
            <p>${letter.message}</p>
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

    //auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.025;

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
    globeEl.current.pointOfView({ altitude: window.innerWidth > 480 ? 4 : 5 }, 300)

    window.addEventListener('resize', debouncedDimensions)

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

  function handleArcClick(arc: any) {
    // TODO: Click function


  }


  return (
    <StyledGlobeContainer>
      <ReactGlobe
        ref={globeEl}
        animateIn={false}
        globeImageUrl={fbImageUrl}
        backgroundColor={'#7ec9f7'}
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
        pointColor={'color'}
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
