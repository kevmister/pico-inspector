import { useState, useEffect } from 'react'
import './index.css'

function PinViewer ({ currentPin, setCurrentPin }) {
  const
    [ pinConfiguration, setPinConfiguration ] = useState(null),
    handleClose = clickEvent => {
      setCurrentPin(null)
    },
    handleSave = clickEvent => {
      clickEvent.preventDefault()
      setCurrentPin(null)
    }

  useEffect(() => {
    const
      getPinInformation = async () => {
        const
          testPinConfiguration = {
            pinMode: 'OUT',
            outMode: 'GPIO'
          },
          //pinConfiguration = await fetch(`/pin/information/${currentPin}`),
          pinConfiguration = await new Promise(res => setTimeout(() => res(testPinConfiguration), 0))

        setPinConfiguration(pinConfiguration)
      }

    getPinInformation()

    setTimeout(() => document.querySelector('.pin-viewer-wrapper').classList.remove('init'), 0) //Queue animation

  }, [ currentPin ])


  const
    changePinMode = changeEvent => {
      const
        { target: { value } } = changeEvent

      setPinConfiguration({ ...pinConfiguration, pinMode: value })
    },
    changeOutMode = changeEvent => {
      const
        { target: { value } } = changeEvent

      setPinConfiguration({ ...pinConfiguration, outMode: value })
    },
    changeGpioOutput = changeEvent => {
      const
        { target: { value } } = changeEvent

      setPinConfiguration({ ...pinConfiguration, gpioOutput: value })
    },
    changePwmFrequency = changeEvent => {
      const
        { target: { value } } = changeEvent

      setPinConfiguration({ ...pinConfiguration, pwmFrequency: value })
    }

  return (
    <div className="pin-viewer-wrapper init">
      <div className="pin-viewer">
        <div className="pin-viewer-title">Inspecting Pin {currentPin}</div>
        {
          pinConfiguration === null ? <div className="pin-viewer-loading">Loading...</div> : 
          <form>
            <div className="row">
              <div className="label">Pin Mode</div>
              <div className="input">
                <select value={pinConfiguration.pinMode} onChange={changePinMode}>
                  <option></option>
                  <option>IN</option>
                  <option>OUT</option>
                </select>
              </div>
            </div>
            {
              pinConfiguration.pinMode === 'OUT' &&
              <div className="row">
                <div className="label">Output Mode</div>
                  <div className="input">
                    <select value={pinConfiguration.outMode} onChange={changeOutMode}>
                      <option></option>
                      <option>GPIO</option>
                      <option>PWM</option>
                  </select>
                </div>
              </div>
            }
            {
              pinConfiguration.pinMode === 'OUT' && pinConfiguration.outMode === 'GPIO' &&
              <div className="row">
                <div className="label">GPIO Output</div>
                  <div className="input">
                    <select value={pinConfiguration.gpioOutput}  onChange={changeGpioOutput}>
                    <option></option>
                    <option>HIGH</option>
                    <option>LOW</option>
                  </select>
                </div>
              </div>
            }
            {
              pinConfiguration.pinMode === 'OUT' && pinConfiguration.outMode === 'PWM' &&
              <div className="row">
                <div className="label">PWM Frequency</div>
                  <div className="input">
                    <input type="number" min="7" max="125000" value={pinConfiguration.pwmFrequency} onChange={changePwmFrequency} style={{width: '6rem'}}/> kHz
                </div>
              </div>
            }
            <div className="row">
              <div className="label"></div>
              <div className="input">
                <button onClick={handleClose}>Close</button>
                <button onClick={handleSave}>Save</button>
              </div>
            </div>
          </form>
        }
      </div>
    </div>
  )
}

export default PinViewer