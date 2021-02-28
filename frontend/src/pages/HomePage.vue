<template>
  <q-page class="constrain">
    <q-card flat class="q-ma-md greet-card">
      <q-card-section class="flex flex-center">
        <p class="bigNumber text-signika-negative">
          <span
            :class="{
              bluetxt: numberMediumLow,
              purpletxt: numberLow,
              yellowtxt: numberMediumHigh,
              redtxt: numberHigh
            }"
            >{{ displayNumber }}</span
          >
        </p>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="flex flex-center">
        <span class="subText text-signika-negative"
          >Years until retiremnet</span
        >
      </q-card-section>
      <q-card-section class="flex flex-center">
        <div class="text-center">
          <span class="text-center text-signika-negative">GOAL</span>
          <br />
          <q-chip class="text-bold" outline square color="black">
            RON {{ goalToRetire }}
          </q-chip>
        </div>
        <q-space />
        <div class="text-center">
          <span class="text-signika-negative">SAVINGS</span>
          <br />
          <q-chip class="text-bold" outline square color="black">
            RON {{ savings }}
          </q-chip>
        </div>
      </q-card-section>
    </q-card>
    <div class="q-px-lg q-pb-md">
      <q-timeline color="black">
        <q-timeline-entry title="Financial Intelligence" subtitle="STATS">
          <div>
            <p>
              In order to gain Financial Intelligence you first need to know how
              much money you already have earned, what you have to show for it,
              how much is coming into your life and how much is going out.
            </p>
            <p>
              But that isn’t enough. You also need to know what money really is
              and what you are trading for the money in your life. One tangible
              outcome of Financial Intelligence is getting out of debt and
              having at least six months of basic living expenses in the bank.
              If you follow the program we present, it will lead to Financial
              Intelligence.
            </p>
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Financial Integrity"
          subtitle="4% RULE"
          color="primary"
          icon="done_all"
        >
          <div>
            Financial Integrity is achieved by learning the true impact of your
            earning and spending, both on your immediate family and on the
            planet. It is knowing what is enough money and material goods to
            keep you at the peak of fulfillment — and what is just excess and
            clutter.
          </div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Financial Independence"
          subtitle="DID YOU KNOW?"
        >
          <div>
            Financial Independence is defined as having an income sufficient for
            your basic needs and comforts from a source other than paid
            employment. It is also independence from crippling financial
            beliefs, from crippling debt, and from a crippling inability to
            manage modern ‘conveniences’ — from repairing your car to fixing
            your central heating. Financial independence is an experience of
            freedom at a psychological level.
          </div>
        </q-timeline-entry>

        <q-timeline-entry subtitle="DID YOU KNOW?">
          <div>
            You are free of the guilt, resentment, envy, frustration and despair
            you have felt about money issues. Financial Independence has nothing
            to do with rich. Financial Independence is the experience of having
            enough — and then some. The old notion of Financial Independence as
            being rich forever is not achievable. Enough is. Enough for you may
            be different from enough from you neighbor– but it will be a figure
            that is real for you and within your reach.
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
          var change = (this.number - this.displayNumber) / 100;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.displayNumber = this.displayNumber + change;
        }
      }, 250);
    }
  },
  computed: {
    numberLow() {
      if (this.displayNumber <= 2) return true;
      else return false;
    },
    numberMediumLow() {
      if (this.displayNumber >= 3 && this.displayNumber <= 5) return true;
      else return false;
    },
    numberMediumHigh() {
      if ((this.displayNumber >= 6) & (this.displayNumber <= 8)) return true;
      else return false;
    },
    numberHigh() {
      if (this.displayNumber >= 9) return true;
      else return false;
    },
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
.yellowtxt
    color: #F0C808
.redtxt
    color: #DD2D4A
.bluetxt
    color: #119DA4
.purpletxt
    color: #5158BB

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
