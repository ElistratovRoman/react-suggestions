import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Example from './Example.js'

const token = process.env.API_KEY

const render = (Component) => ReactDOM.render(
  <AppContainer>
    <Component token={ token }/>
  </AppContainer>,
  document.getElementById('example')
)

render(Example)

if (module.hot) {
  module.hot.accept('./Example.js', () => render(Example))
}
