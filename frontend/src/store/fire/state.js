import { LocalStorage } from 'quasar'
export default function () {
  return {
    token: LocalStorage.getItem("token") || "",
    economies: []
  }
}
