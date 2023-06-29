/**
 * СПРАВОЧНО:
 * Свойства data и error сделаны обязательными,
 * поскольку для реализации стейта с использованием NgRx Feature Creators (см. метод createFeature)
 * необходимо использовать объекты, состояние которых содержит только обязательные свойства.
 * Т.о. у объекта начального состояния initialState должны быть заданы начальные значения для всех свойств.
 */
export interface IStoreState<TData, TError = unknown> {
  status: StoreStateStatus;
  data: TData;
  error: TError;
}

export type StoreStateStatus = 'INITIAL' | 'PENDING' | 'SUCCESS' | 'FAILURE';
