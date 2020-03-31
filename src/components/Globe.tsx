import React from 'react'
import ReactGlobe from 'react-globe.gl'
import './Globe.css'

const earthImg = require('../assets/8081_earthmap10k.jpg');
const earthNightImg = require('../assets/earth-night.jpg');
const earthVectortImg = require('../assets/earth-styled.jpg');




interface Props {

}

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

const Globe = (props: Props) => {

  const { useState, useEffect, useRef } = React;

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
    altitude: window.innerWidth > 480 ? 4 : 5 //if mobile, reduce globe size
  })

  const globeEl = useRef();

  //


  //init globe
  useEffect(() => {

    //auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.025;

    const debouncedDimensions = debounce(function initGlobeDimensions() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
        altitude: window.innerWidth > 480 ? 4 : 5 //if mobile, reduce globe size
      })
    }, 100)

    //set perspective
    globeEl.current.pointOfView({ altitude: window.innerWidth > 480 ? 3 : 4 }, 300)

    window.addEventListener('resize', debouncedDimensions)

    return () => {
      window.removeEventListener('resize', debouncedDimensions)
    }
  }, [])


  return (
    <div className="globe-container">
      <ReactGlobe
        ref={globeEl}
        globeImageUrl={earthVectortImg}
        backgroundColor={'#7ec9f7'}
        showGraticules={false}
        height={dimensions.height}
        width={dimensions.width}
      />
    </div>
  )
}

export default Globe
