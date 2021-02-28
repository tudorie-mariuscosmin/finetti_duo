<template>
  <q-page class="constrain">
    <q-card flat class="q-ma-md greet-card">
      <q-card-section class="flex flex-center">
        <p class="bigNumber text-signika-negative">{{ displayNumber }}</p>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="flex flex-center">
        <p class="subText text-signika-negative">Years until retiremnet</p>
      </q-card-section>
    </q-card>
    <div class="q-px-lg q-pb-md">
      <q-timeline color="black">
        <q-timeline-entry title="Event Title" subtitle="STATS">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Event Title"
          subtitle="4% RULE"
          color="primary"
          icon="done_all"
        >
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Event Title"
          subtitle="DID YOU KNOW?"
          color="primary"
        >
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </q-timeline-entry>

        <q-timeline-entry title="Event Title" subtitle="DID YOU KNOW?">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      displayNumber: 0,
      number: 0,
      interval: true
    };
  },
  ready() {
    console.log("redy");
    this.displayNumber = this.number ? this.number : 0;
  },
  watch: {
    number() {
      clearInterval(this.interval);

      if (this.number == this.displayNumber) {
        return;
      }

      this.interval = window.setInterval(() => {
        if (this.displayNumber != this.number) {
          var change = (this.number - this.displayNumber) / 5;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.displayNumber = this.displayNumber + change;
        }
      }, 250);
    }
  },
  computed: {
    savings() {
      return this.$store.getters["fire/getSavings"];
    },
    expenses() {
      return this.$store.getters["fire/getExpenses"];
    },
    goalToRetire() {
      return this.expenses * 25;
    },
    getRateOfReturn() {
      return this.$store.getters["fire/getRateOfReturn"];
    },

    years() {
      let yearlySavings =
        this.savings + (this.getRateOfReturn / 100) * this.savings;
      console.log("yearly savings" + yearlySavings);
      let years = 1;
      let sum = yearlySavings;
      let lastYear = yearlySavings;
      while (sum < this.goalToRetire) {
        yearlySavings = this.calcSavings(lastYear);
        sum += yearlySavings;
        lastYear = yearlySavings;
        console.log(`sum ${sum} on year${years}`);
        years++;
      }
      return years;
    }
  },
  beforeMount() {
    this.number += this.years;
    this.$store.dispatch("fire/getInfo");
  },
  methods: {
    calcSavings(savings) {
      return savings + (this.getRateOfReturn / 100) * savings;
    }
  }
};
</script>

<style lang="sass">
.bigNumber
  margin:0
  color: black
  font-size: 120px

.subText
  display: inline-block
  color: black
  font-size: 20px

.greet-card
  border: 1px solid rgba(0, 0, 0, 0.1)
</style>
