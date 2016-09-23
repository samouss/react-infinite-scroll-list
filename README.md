# React Infinite List

[![npm version](https://badge.fury.io/js/react-infinite-scroll-list.svg)](https://badge.fury.io/js/react-infinite-scroll-list) [![Build Status](https://travis-ci.org/samouss/react-infinite-list.svg?branch=master)](https://travis-ci.org/samouss/react-infinite-list)

## Installation

```
npm install --save react-infinite-scroll-list
```

## Usage

Import the module in your application:

```js
// From ES6
import InfiniteList from 'react-infinite-list-scroll'

// From CJS
var InfiniteList = require('react-infinite-list-scroll');

// From global
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
