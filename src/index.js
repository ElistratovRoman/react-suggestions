import React from 'react'
import './styles.css'


function debounce(fn, delay) {
  let timer = null

  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, arguments), delay)
  }
}

const initialState = {
  query: '',
  suggestions: [],
  focusedIndex: -1,
  isOpen: false,
}

class ReactSuggestions extends React.PureComponent {
  static defaultProps = {
    token: '',
    query: '',
    min: 2,
    count: 10,
    delay: 0,
    onQueryChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onChange: () => {},    
  }

  constructor(props) {
    super(props)
  
    this.state = initialState

    if (!props.token) {
      console.warn('react-suggestions: You need pass dadata api-key to props. See https://dadata.ru/api/suggest/')
    }
  };

  componentDidMount() {
    this.setState({
      query: this.props.query,
    })
  };

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.setState({
        query: this.props.query,
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
        const response = JSON.parse(this.xhr.response)

        if (response && response.suggestions) {
          this.setState({ suggestions: response.suggestions })
        }
      }
    }
  }, this.props.delay)

  handleChange = (evt) => {
    evt.persist()
    const { min, token, count, delay, locations, onQueryChange } = this.props

    if (!token) { return }

    const { value: query } = evt.target
    const state = { query, isOpen: true }

    if (query.length < min) {
      state.suggestions = []
    } else {
      this.loadSuggestions(query, token, count, locations)
    }

    this.setState({
      ...state,
    }, () => onQueryChange(query))
  }

  handleFocus = (evt) => {
    const { onFocus } = this.props

    evt.persist()

    this.setState({
      isOpen: true,
    }, () => onFocus(evt))
  }

  handleBlur = (evt) => {
    const { onBlur } = this.props
    const { suggestions } = this.state
    
    evt.persist()

    this.setState({
      isOpen: false,
      focusedIndex: -1,
    }, () => onBlur(evt))
  }

  handleHover = (focusedIndex) => {
    this.setState({ focusedIndex })
  }

  handleKeyPress = (evt) => {
    evt.persist()

    if ([40, 38, 13].includes(evt.which)) {
      evt.preventDefault()

      const { suggestions, focusedIndex: index } = this.state
      const length = this.props.count - 1

      if (evt.which === 40) {
        const result = index === length || index === -1 ? 0 : ++index

        this.setState({ focusedIndex: result })
      }

      if (evt.which === 38) {
        const result = index === 0 || index === -1 ? length : --index

        this.setState({ focusedIndex: result })
      }

      if (evt.which === 13 && index !== -1 && suggestions[index]) {
        this.handleSelect(suggestions[index], index)
      }
    }
  }

  handleSelect = (suggestion, index) => {
    const { onChange } = this.props

    this.setState({
      query: suggestion.value,
      isOpen: false,
    }, () => onChange(suggestion, index))
  }

  renderSuggestions = () => {
    const { suggestions, focusedIndex } = this.state

    const result = suggestions.map((suggestion, index) => {
      const itemCns = index === focusedIndex ? 'focused': ''

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
    const { query: omit, token, min, count, className, delay, locations, onQueryChange, ...rest } = this.props
    const { query, suggestions, isOpen, focusedIndex } = this.state

    const wrapperCns = className ? `react-suggestions ${className}` : 'react-suggestions'

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
          onKeyDown={ this.handleKeyPress }
        />

        { !!suggestions.length && isOpen && <ul>{ this.renderSuggestions() }</ul> }
      </div>
    )
  };
}

export default ReactSuggestions
