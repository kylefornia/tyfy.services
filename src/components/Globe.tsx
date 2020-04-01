import React from 'react'
import ReactGlobe from 'react-globe.gl';
import styled from 'styled-components'
import { Letter } from './NewLetter';

const earthImg = require('../assets/8081_earthmap10k.jpg');
const earthNightImg = require('../assets/earth-night.jpg');
const earthVectortImg = require('../assets/earth-styled.jpg');

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
`

const Globe = ({ letters = [] }: Props) => {

  const { useState, useEffect, useRef } = React;

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
    altitude: window.innerWidth > 480 ? 4 : 6 //if mobile, reduce globe size
  })

  const globeEl = useRef<HTMLCanvasElement>(null) as any;

  const [arcData, setArcData] = useState<ArcData[]>([]);
  const [pointsData, setPointsData] = useState<PointData[]>([]);
  function formatPoints(lettersData: Letter[]) {
    const formattedArcs = letters.length > 0 ?
      lettersData.map((letter: Letter): ArcData => {

        const tooltip = `
          <div 
            style="background: #FFF; 
                  padding: 16px;
                  color: #444;
                  font-family: 'Merriweather', serif;
                  box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
                  max-width: 400px;
                  line-height: 1.7em;
                  border-radius: 3px">
                  <span style="
                    font-weight: 800;
                    text-align: center;
                    font-family: 'Open Sans', sans-serif;
                    color: #45aaf2;
                  ">${letter.name} ➡ Receipient</span>
            <p>${letter.message}</p>
          </div>
        `

        return {
          startLat: letter.location.lat,
          startLng: letter.location.lon,
          endLat: (Math.random() - 0.5) * 180,
          endLng: (Math.random() - 0.5) * 360,
          stroke: 2.5,
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
          ...letter
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


    const debouncedDimensions = function initGlobeDimensions() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
        altitude: window.innerWidth > 480 ? 4 : 6 //if mobile, reduce globe size
      })
    }

    //set perspective
    globeEl.current.pointOfView({ altitude: window.innerWidth > 480 ? 3 : 4 }, 300)

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
        //@ts-ignore
        ref={globeEl}
        animateIn={false}
        globeImageUrl={earthVectortImg}
        backgroundColor={'#7ec9f7'}
        showGraticules={false}
        height={dimensions.height}
        width={dimensions.width}
        waitForGlobeReady={true}
        arcsData={arcData}
        arcStroke="stroke"
        arcColor="color"
        arcLabel="label"
        // arcDashLength={() => 0.8}
        arcDashGap={() => 0.1}
        arcDashAnimateTime={1000}
        pointsData={pointsData}
        pointAltitude={'size'}
        pointRadius={'radius'}
        pointColor={'color'}
        pointLabel={'name'}
        onArcClick={(arc) => handleArcClick(arc)}
        onArcHover={(arc) => handleArcHover(arc)}
        showAtmosphere={false}
      />
    </StyledGlobeContainer>
  )
}

export default Globe
