# React Infinite List

## Installation

```
npm install --save react-infinite-list
```

## Usage

Import the module in your application:

```js
// From ES6
import InfiniteList from 'react-infinite-list'

// From CJS
var InfiniteList = require('react-infinite-list');

From global
var InfiniteList = ReactInfiniteList.default;
```

Then use it juste like that:

```js
<InfiniteList
  className="custom-class-name"
  containerHeight="648px"
  isLoading={true|false}
  isEndReach={true|false}
  onThresholdReach={() => { console.log('Load more content') }}
  threshold={150}
>
  {items.map(item => (
    <div
      className="custom-infinite-list__item"
      key={item.id}
    >
      Item in the list
    </div>
  ))}
</InfiniteList>
```

## Run the example

Clone the repository then run:

```
npm install
```

and then:

```
npm start
```

## Run the test

```
npm test
```
