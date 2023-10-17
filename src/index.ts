import { Store, Unsubscribe } from 'redux'

function defaultEqualityFn<T>(a: T, b: T): boolean {
  return a === b
}

type EqualityFn<T> = (a: T, b: T) => boolean

interface StoreObserver<TState> {
  observe<TValue>(
    getValue: (state: TState) => TValue,
    onChange: (value: TValue) => void,
    equalityFn?: EqualityFn<TValue>
  ): Unsubscribe
}

const createStoreObserver = <TState>(store: Store<TState>): StoreObserver<TState> => {
  return {
    observe<TValue>(
      getValue: (state: TState) => TValue,
      onChange: (value: TValue) => void,
      equalityFn: EqualityFn<TValue> = defaultEqualityFn
    ) {
      let prevValue = getValue(store.getState())
      const unsubscribe = store.subscribe(() => {
        let nextValue = getValue(store.getState())
        if (equalityFn(prevValue, nextValue)) {
          onChange(nextValue);
        }
      })
      return unsubscribe
    },
  }
}

export default createStoreObserver