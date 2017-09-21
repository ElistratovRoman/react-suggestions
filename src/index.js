import React, { PureComponent } from 'react'
import './styles.css'

function debounce(fn, delay) {
  let timer = null

  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, arguments), delay)
  }
}

class ReactSuggestions extends PureComponent {

  static defaultProps = {
    token: '',
    query: '',
    min: 2,
    count: 10,
    delay: 0,
  }

  state = {
    query: this.props.query,
    suggestions: [],
    focusedIndex: -1,
    isOpen: false,
  }

  componentWillMount() {
    if (!this.props.token) {
      console.warn('react-suggestions: You need pass dadata api-key to props. See https://dadata.ru/api/suggest/')
    }
  }

  loadSuggestions = debounce((query, token, count) => {
    if (this.xhr) {
      this.xhr.abort()
    }

    this.xhr = new XMLHttpRequest()
    this.xhr.open("POST", "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address")
    this.xhr.setRequestHeader("Accept", "application/json")
    this.xhr.setRequestHeader("Authorization", `Token ${token}`)
    this.xhr.setRequestHeader("Content-Type", "application/json")
    this.xhr.send(JSON.stringify({ query, count }))

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

  handleChange = (evt) => {
    let { min, token, count, delay } = this.props

    if (!token) { return }

    let { value: query } = evt.target
    let state = { query, isOpen: true }

    if (query.length < min) {
      state.suggestions = []
    } else {
      this.loadSuggestions(query, token, count)
    }

    this.setState({ ...state })
  }

  handleFocus = (evt) => {
    let { onFocus } = this.props

    this.setState({ isOpen: true })

    if (onFocus) { onFocus(evt) }
  }

  handleBlur = (evt) => {
    let { onBlur } = this.props

    this.setState({
      isOpen: false,
      focusedIndex: -1,
    })

    if (onBlur) { onBlur(evt) }
  }

  handleHover = (focusedIndex) => {
    this.setState({ focusedIndex })
  }

  handleKeyPress = (evt) => {
    if ([40, 38, 13].includes(evt.which)) {
      evt.preventDefault()

      let { focusedIndex: index } = this.state
      let length = this.props.count - 1

      if (evt.which === 40) {
        let result = index === length || index === -1 ? 0 : ++index

        this.setState({ focusedIndex: result })
      }

      if (evt.which === 38) {
        let result = index === 0 || index === -1 ? length : --index

        this.setState({ focusedIndex: result })
      }

      if (evt.which === 13) {
        this.handleSelect(this.state.suggestions[index], index)
      }
    }
  }

  handleSelect = (suggestion, index) => {
    let { onChange } = this.props

    this.setState({
      query: suggestion.value,
      isOpen: false,
    })

    if (onChange) { onChange(suggestion, index) }
  }

  renderSuggestions = () => {
    let { suggestions, focusedIndex } = this.state

    let result = suggestions.map((suggestion, index) => {
      let itemCns = index === focusedIndex ? 'focused': ''

      return (
        <li
          className={ itemCns }
          key={ index }
          onMouseDown={ () => this.handleSelect(suggestion, index)}
          onMouseEnter={ () => this.handleHover(index) }>
          { suggestion.value }
        </li>
      )
    })

    return result
  }

  render() {
    let { query: omit, token, min, count, className, delay, ...rest } = this.props
    let { query, suggestions, isOpen, focusedIndex } = this.state

    let wrapperCns = className ? `react-suggestions ${className}` : 'react-suggestions'

    return (
      <div className={ wrapperCns }>
        <input
          { ...rest }
          type="text"
          value={ query }
          onChange={ this.handleChange }
          onFocus={ this.handleFocus }
          onBlur={ this.handleBlur }
          onKeyPress={ this.handleKeyPress }
          onKeyDown={ this.handleKeyPress }/>

        { !!suggestions.length && isOpen && <ul>{ this.renderSuggestions() }</ul> }
      </div>
    )
  }
}

export default ReactSuggestions
