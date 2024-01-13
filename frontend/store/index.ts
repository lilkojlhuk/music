import { Context, createWrapper, MakeStore } from "next-redux-wrapper"
import { AnyAction, Store, applyMiddleware, createStore } from "redux"
import { RootState, reducer } from './reducers'
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk"

const makeStore: MakeStore<Store<RootState>> = (context: Context) => createStore(reducer, applyMiddleware(thunk))

export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true })

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>