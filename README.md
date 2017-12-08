# React Infinite List

[![npm version](https://badge.fury.io/js/react-infinite-scroll-list.svg)](https://badge.fury.io/js/react-infinite-scroll-list) [![Build Status](https://travis-ci.org/samouss/react-infinite-list.svg?branch=master)](https://travis-ci.org/samouss/react-infinite-list)

## Installation

```
yarn add react-infinite-scroll-list
```

**Note:** This library is based on the [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) API, it's not yet widely supported.  
Check the [compatibility table](http://caniuse.com/#feat=intersectionobserver) and add a [Polyfill](https://github.com/w3c/IntersectionObserver/tree/gh-pages/polyfill) to your needs!

## Usage

Import the module in your application:

```js
// From ES6
import InfiniteList from 'react-infinite-list-scroll'

// From CJS
const InfiniteList = require('react-infinite-list-scroll').default;

// From global
const InfiniteList = ReactInfiniteScrollList.default;
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
    <div key={item.id}>
      {item.message}
    </div>,
  )}
</InfiniteList>
```

## Run the test

```
yarn test
```

## Example

Check out the [documentation](example).
