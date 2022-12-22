import { useState, useEffect } from 'react'
import './index.css'

function PinViewer ({ currentPin, setCurrentPin }) {
  const
    [ loading, setLoading ] = useState(true),
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
          pinInformation = await fetch(`/pin/information/${currentPin}`)

        setLoading(false)
      }

    getPinInformation()

    setTimeout(() => document.querySelector('.pin-viewer-wrapper').classList.remove('init'), 0) //Queue animation

  }, [ currentPin ])

  return (
    <div className="pin-viewer-wrapper init">
      <div className="pin-viewer">
        <div className="pin-viewer-title">Inspecting Pin {currentPin}</div>
        {
          loading ? <div className="pin-viewer-loading" /> : 
          <form>
            <div className="row">
              <div className="label">Pin Mode</div>
              <div className="input">
                <select>
                  <option></option>
                  <option>High</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
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