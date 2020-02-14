import React from 'react'
import ReactDOM from 'react-dom'

import Example from './Example.js'


const token = process.env.API_KEY

ReactDOM.render(<Example token={ token }/>, document.getElementById('example'))
