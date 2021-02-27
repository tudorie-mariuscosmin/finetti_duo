<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="constrain">
        <q-btn
          class="large-screen-only q-mr-sm"
          icon="eva-pie-chart-outline"
          size="18px"
          to="/income"
          dense
          flat
          round
        />

        <q-btn
          class="large-screen-only q-mr-sm"
          icon="eva-bar-chart-2-outline"
          size="18px"
          to="/investing"
          dense
          flat
          round
        />
        <q-separator class="large-screen-only" vertical spaced />
        <q-toolbar-title class="text-supermarcado-one">
          F.I.R.E.
        </q-toolbar-title>
        <q-btn
          class="large-screen-only"
          icon="eva-home-outline"
          size="18px"
          to="/"
          dense
          flat
          round
        />
      </q-toolbar>
    </q-header>
    <q-footer class="bg-white small-screen-only" bordered>
      <q-tabs
        class="text-grey-10"
        active-color="black"
        indicator-color="primary"
      >
        <q-route-tab to="/" icon="eva-home-outline" />
        <q-route-tab to="/income" icon="eva-pie-chart-outline" />
        <q-route-tab to="/investing" icon="eva-bar-chart-2-outline" />
        <q-tab icon="eva-log-out-outline" @click="logout()" />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("fire/logout").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
// <script>
// export default {
//   name: "MainLayout",
//   data() {
//     return {
//       drawer: true,
//       miniState: true,
//       navs: [
//         {
//           label: "Home",
//           icon: "eva-home-outline",
//           to: "/"
//         },
//         {
//           label: "Income",
//           icon: "eva-pie-chart-outline",
//           to: "/income"
//         },
//         {
//           label: "Investing",
//           icon: "eva-bar-chart-2-outline",
//           to: "/investing"
//         }
//       ]
//     };
//   }
// };
//
</script>
</script>

<style lang="sass">
.titleN
  margin: 0
  padding: 0 0.3em
  display: inline-block
  color: black
  background-color: $primary
  border-radius: 100%

.q-toolbar
  @media (min-width: $breakpoint-sm-min)
    height: 77px
.q-toolbar__title
  font-size: 30px
  @media (max-width: $breakpoint-xs-max)
    text-align: center

.q-footer
  .q-tab__icon
    font-size: 30px
</style>


