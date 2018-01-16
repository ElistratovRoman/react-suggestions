import React, { PureComponent } from 'react'
import './styles.css'

function debounce(fn, delay) {
  let timer = null

  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, arguments), delay)
  }
}

const ReactSuggestionsProps = {
  token: '',
  query: '',
  min: 2,
  count: 10,
  delay: 0,
}

const initialState = {
  query: '',
  suggestions: [],
  focusedIndex: -1,
  isOpen: false,
}

class ReactSuggestions extends PureComponent {
  static defaultProps = ReactSuggestionsProps;

  state = initialState;

  componentWillMount() {
    if (!this.props.token) {
      console.warn('react-suggestions: You need pass dadata api-key to props. See https://dadata.ru/api/suggest/')
    }
  };

  componentDidMount() {
    this.setState({
      query: this.props.query,
    })
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.setState({
        query: nextProps.query,
      })
    }
  };

  loadSuggestions = debounce((query, token, count, locations = []) => {
    if (this.xhr) {
      this.xhr.abort()
    }

    this.xhr = new XMLHttpRequest()
    this.xhr.open("POST", "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address")
    this.xhr.setRequestHeader("Accept", "application/json")
    this.xhr.setRequestHeader("Authorization", `Token ${token}`)
    this.xhr.setRequestHeader("Content-Type", "application/json")
    this.xhr.send(JSON.stringify({ query, count, locations }))

    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState != 4) {
        return
      }

      if (this.xhr.status == 200) {
        let response = JSON.parse(this.xhr.response)

        if (response && response.suggestions) {
          this.setState({ suggestions: response.suggestions })
        }
      }
    }
  }, this.props.delay)

  onChangeHd = (event) => {
    let { min, token, count, delay, locations, onChange } = this.props

    if (!token) { return }

    let { value: query } = event.target
    let state = { query, isOpen: true }

    if (query.length < min) {
      state.suggestions = []
    } else {
      this.loadSuggestions(query, token, count, locations)
    }

    this.setState({ ...state }, () => {
      if (typeof onChange === 'function') onChange(event)
    })
  };

  onFocusHd = (event) => {
    const { onFocus } = this.props

    this.setState({ isOpen: true })

    if (typeof onFocus === 'function') onFocus(event)
  };

  onBlurHd = (event) => {
    const { onBlur } = this.props

    this.setState({
      isOpen: false,
      focusedIndex: -1,
    })

    if (typeof onBlur === 'function') onBlur(event)
  };

  onMouseEnterHd = (focusedIndex) => {
    this.setState({ focusedIndex })
  };

  onKeyPressHd = (event) => {
    if ([40, 38, 13].includes(event.which)) {
      event.preventDefault()

      let { suggestions, focusedIndex: index } = this.state
      let length = this.props.count - 1

      if (event.which === 40) {
        let result = index === length || index === -1 ? 0 : ++index

        this.setState({ focusedIndex: result })
      }

      if (event.which === 38) {
        let result = index === 0 || index === -1 ? length : --index

        this.setState({ focusedIndex: result })
      }

      if (event.which === 13 && index !== -1 && suggestions[index]) {
        this.handleSelect(suggestions[index], index)
      }
    }
  };

  handleSelect = (suggestion, index) => {
    let { onChange } = this.props

    this.setState({
      query: suggestion.value,
      isOpen: false,
    })

    if (typeof onChange === 'function') { onChange(suggestion, index) }
  };

  renderSuggestions = () => {
    const { suggestions, focusedIndex } = this.state

    const results = suggestions.map((suggestion, index) => {
      const itemClassName = (index === focusedIndex) ? 'focused': ''

      return (
        <li
          className={ itemClassName }
          key={ index }
          onMouseDown={ () => this.handleSelect(suggestion, index)}
          onMouseEnter={ () => this.onMouseEnterHd(index) }>
          { suggestion.value }
        </li>
      )
    })

    return results
  };

  render() {
    const { query: omit, token, min, count, className, delay, locations, ...rest } = this.props
    const { query, suggestions, isOpen, focusedIndex } = this.state

    const wrapperCns = className ? `react-suggestions ${className}` : 'react-suggestions'

    return (
      <div className={ wrapperCns }>
        <input
          { ...rest }
          type="text"
          value={ query }
          onChange={ this.onChangeHd }
          onInput={ this.onChangeHd }
          onFocus={ this.onFocusHd }
          onBlur={ this.onBlurHd }
          onKeyPress={ this.onKeyPressHd }
          onKeyDown={ this.onKeyPressHd }
        />

        {(Boolean(suggestions.length) && isOpen) && (
          <ul>{ this.renderSuggestions() }</ul>
        )}
      </div>
    )
  }
}

export default ReactSuggestions
