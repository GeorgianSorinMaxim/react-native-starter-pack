import { Action } from 'redux'

export type ActionFactory<A> = () => A
export type PayloadActionFactory<A, P> = (payload: P) => A
export type PresetPayloadActionFactory<A, P> = (payload: P) => ActionFactory<A>
export type MixedPayloadActionFactory<A, P1, P2> = (payload: P1) => PayloadActionFactory<A, P2>
export type FailureActionFactory<A> = PayloadActionFactory<A, Error>

export interface PayloadAction<T, P> extends Action<T> {
  payload: P
}

export interface FailureActionPayload {
  name: string
  message: string
  status?: number
}

export type FailureAction<T> = PayloadAction<T, FailureActionPayload>