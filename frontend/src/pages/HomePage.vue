<template>
  <q-page class="constrain">
    <p>Yeah until retirmenet</p>

    {{ displayNumber }}
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      displayNumber: 0,
      number: 0,
      yearsUntilRetirement: 20,
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
  beforeMount() {
    this.number += this.yearsUntilRetirement;
  }
};
</script>

<style></style>
