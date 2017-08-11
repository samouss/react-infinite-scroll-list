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
const InfiniteList = require('react-infinite-list-scroll').default;

// From global
const InfiniteList = ReactInfiniteList.default;
```

Then use it juste like that:

```js
<InfiniteList
  root="container|viewport"
  isLoading={true|false}
  isEndReached={true|false}
  onReachThreshold={() => { console.log('Load more content') }}
  containerClassName="custom-container-class-name"
  sentinelClassName="custom-sentinel-class-name"
  containerTagName="div"
  sentinelTagName="div"
  threshold={0}
>
  {items.map(item =>
    <div className="item-custom-class-name" key={item.id}>
      {item.message}
    </div>,
  )}
</InfiniteList>
```

## Run the example

Clone the repository then run:

```
cd example && npm install
```

and then:

```
npm start
```

## Run the test

```
npm test
```
