import React from 'react'
import { hot } from 'react-hot-loader'
import ReactSuggestions from 'react-suggestions'

import 'react-suggestions/react-suggestions.css'
import './styles.css'


class Example extends React.PureComponent {
  state = {
    suggestion: null,
    index: null,
  }

  handleChange = (suggestion, index) => {
    this.setState({
      suggestion,
      index,
    })    
  }

  render() {
    let { suggestion, index } = this.state

    return (
      <div className="example">
        <h1>react-suggestions example</h1>

        <ReactSuggestions
          token={ this.props.token }
          delay={ 300 }
          onChange={ this.handleChange }
          className="customClass"
          placeholder="Enter address"/>

        { !!suggestion && index !== null &&
          <div>
            <h2>Result</h2>

            <span>{ `Index: ${index}` }</span>
            <pre>
              JSON:
              <code>
                { JSON.stringify(suggestion, null, 4) }
              </code>
            </pre>
          </div>
        }
      </div>
    )
  }
}

export default hot(module)(Example)
