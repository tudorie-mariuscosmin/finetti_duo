<template>
  <q-page class="flex flex-center">
    <div>
      <q-card class="login-card" flat bordered>
        <div class="q-ma-lg text-center text-signika-negative">
          <Title class="text-h3" />
        </div>
        <q-tabs v-model="tab">
          <q-tab label="Login" name="one" />
          <q-tab label="Register" name="two" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="one">
            <q-input v-model="login.email" type="email" label="Email" />
            <q-input
              v-model="login.password"
              type="password"
              label="Password"
            />

            <q-card-actions align="right">
              <q-btn
                @click="onLogin"
                size="lg"
                type="submit"
                class="q-ma-sm"
                round
                unelevated
                text-color="white"
                color="primary"
                icon="eva-log-in-outline"
              />
            </q-card-actions>
          </q-tab-panel>

          <q-tab-panel name="two">
            <q-input v-model="signup.firstName" type="text" label="Name" />
            <q-input v-model="signup.lastName" type="text" label="Name" />
            <q-input v-model="signup.email" type="email" label="Email" />
            <q-input
              v-model="signup.password"
              type="password"
              label="Password"
            />
            <q-card-actions align="right">
              <q-btn
                @click="onSignup"
                size="lg"
                type="submit"
                class="q-ma-sm"
                round
                unelevated
                text-color="black"
                color="primary"
                icon="eva-corner-down-right-outline"
              />
            </q-card-actions>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Title from "../components/Title";
import { colors } from "quasar";
colors.setBrand("light_", "#f8f4f9");

export default {
  components: { Title },
  name: "AuthPage",
  components: {
    Title: Title,
  },
  data() {
    return {
      tab: "one",
      signup: {
        password: "",
        email: "",
        firstName: "",
        lastName: "",
      },
      login: {
        password: "",
        email: "",
      },
    };
  },
  methods: {
    onSignup() {},
    onLogin() {
      this.$store
        .dispatch("fire/login", this.login)
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="sass" scoped>
/* .bg-image {
 *   background-image: url(../assets/topography.svg);
 *  background-size: contain;
 *  background-color: #f0f4ef;
 *}

.titleN
  margin: 0
  padding: 0.2em 0.3em
  display: inline-block
  color: black
  background-color: $primary
  border-radius: 100%

.login-card
  width: 80vw
  border: 1px solid rgba(0, 0, 0, 0.1)
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  height: 80vh
  max-width: 500px

.q-field, .q-field--standout .q-field__control
  margin-bottom: 10px

@media only screen and (max-width: 700px)
  .login-card
    padding: 1vh

@media only screen and (max-width: 1150px)
  .login-card
    padding: 1vh
</style>
