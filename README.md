# redux-store-observe
Redux Store observer

## Why?

Redux provides you with a `subscribe()` method so that you can be notified when the state changes. However, it does not let you know what changed or subscribe to partial slices of the store. `redux-store-observe` will let you do that, also with custom equality functions.
`redux-store-observe` completely supports typescript and reflects the types of your state.

## Install

```
npm i --save redux-store-observe
```

## Usage

```js
import store from './store'
import createStoreObserver from 'redux-store-observe'

let observer = createStoreObserver(store)

const unsubscribe1 = observer.observe(
  (state) => state.account.id,
  (value) => console.log(id)
)

const unsubscribe2 = observer.observe(
  (state) => state.account.invoices,
  (value) => console.log(invoices),
  (prevValue, nextValue) => prevValue.length === nextValue.length
)

unsubscribe1()
unsubscribe2()
```

#### Note on Comparisons

By default, `redux-store-observe` uses `===` (strict equal) operator to check for changes. This may not be want you want. Sometimes you may want to do a deep inspection. You can use custom equality functions or use either [deep-equal](https://www.npmjs.com/package/deep-equal) ([substack/node-deep-equal](https://github.com/substack/node-deep-equal)) or [is-equal](https://www.npmjs.com/package/is-equal) ([ljharb/is-equal](https://github.com/ljharb/is-equal)). `is-equal` is better since it supports ES6 types like Maps/Sets.


## License

MIT
