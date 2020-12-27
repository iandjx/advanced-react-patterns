// Flexible Compound Components with context
// http://localhost:3000/isolated/final/03.js
/* 
We use compoound components so that we can avoid doing prop drilling and be able to pass 
state/context to child components at any level

watch this to understand composition vs prop drilling
https://www.youtube.com/watch?v=3XaXKiXtNjw
*/
import * as React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext()
ToggleContext.displayName = 'ToggleContext'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return (
    //we use this context so we can access on and toggle anywhere even if not direct descendants
    <ToggleContext.Provider value={{on, toggle}}>
      {children}
    </ToggleContext.Provider>
  )
}

function useToggle() {
  return React.useContext(ToggleContext)
}

function ToggleOn({children}) {
  const {on} = useToggle()
  return on ? children : null
}

function ToggleOff({children}) {
  const {on} = useToggle()
  return on ? null : children
}

function ToggleButton({...props}) {
  const {on, toggle} = useToggle()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App
