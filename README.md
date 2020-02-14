# react-suggestions
Reactjs component for dadata suggestions

# Example
## In dev mode
```javascript
yarn
yarn add react react-dom -P
API_KEY={ your dadata token } yarn start
```

# Install
```javascript
yarn add react-suggestions
```

# Usage
```javascript
import React from 'react'
import ReactSuggestions from 'react-suggestions'
import 'react-suggestions/react-suggestions.css'

export default class Example extends React.Component {
  render() {
    return <ReactSuggestions token={ your dadata token } onChange={ this.handleChange }/>
  }

  handleChange = (selected) => {
    console.log(selected)
  }
}
```

# Options
  Properties |  Type    |  Default  |  Description
:------------|:---------|:----------|:---------------
  token      | string   | ''        | dadata token
  query      | string   | ''        | searh query
  count      | number   | 10        | suggestions length
  min        | number   | 2         | minimum length for init request
  delay      | number   | 0         | debounce delay
  locations  | array    | []        | limit the search area
  onQueryChange | func  | () => {}  | callback is fired on every time the input value changes
### ...other input attributes
