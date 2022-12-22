import { useState } from 'react'
import './index.css'

import picoPinout from './pico-pinout.svg'

import PinViewer from './PinViewer'

function App() {
  const
    [ currentPin, setCurrentPin ] = useState(null),
    makeClickable = loadEvent => {
      const
        pins = Array.from({ length: 40 }, (_,index) => index+1)

      for(const pin of pins){
        const
          path = `#pin_${String(pin).padStart(2, '0')}`,
          element = loadEvent.target.contentDocument.querySelector(path)

        element.addEventListener('click', clickEvent => {
          setCurrentPin(pin)
        })
      }
    }

  return (
    <>
      <h1>Raspberry Pi Pico W, Click a pin to inspect</h1>
      <object id="pico-pinout" data={picoPinout} type="image/svg+xml" onLoad={makeClickable} />
      {currentPin === null ? null : <PinViewer currentPin={currentPin} setCurrentPin={setCurrentPin}  />}
    </>
  )
}

export default App