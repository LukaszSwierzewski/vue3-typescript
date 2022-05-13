import { defineStore } from 'pinia'
import { fetchPersons } from '@/api/swapi'
import type { People } from '@/types/People.type'
import { excludeByFirstLetter } from '@/helpers/util'

interface usePersonState {
  persons: People[]
}
export const usePersonStore = defineStore({
  id: 'person',
  state: (): usePersonState => ({
    persons: []
  }),
  getters: {
    filteredPersons: (state) => excludeByFirstLetter(state.persons, ["L", "N", "C"], "name")
  },
  actions: {
      /**
     * @name fetchPersons
     * @description fetch persons from swapi API
     */
    async fetchPersons() {
      const persons: People[] = await fetchPersons()
      this.persons = persons
    }
  }
})
