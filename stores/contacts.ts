import type {GetContact} from "~/server/types/contacts"

interface ContactsState {
  contacts: GetContact[]
}

export const useContactsStore = defineStore('contactsStore', {
  state: (): ContactsState => ({
    contacts: []
  }),
})
