import { makeAutoObservable, toJS } from 'mobx'
import React from 'react';
import { CardGenerator } from './card-gererator.store'

export class RootStore {

  cardGeneratorStore;

  constructor() {
    this.cardGeneratorStore = new CardGenerator(this)

    makeAutoObservable(this)
  }
}

export const rootStore = new RootStore()

export const StoresContext = React.createContext(rootStore);

export function useStores(): RootStore {
  return React.useContext(StoresContext)
}
