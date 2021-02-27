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
