<template>
  <q-page class="constrain">
    <h5 class="text-signika-negative text-center">My Investments</h5>
    <div class="q-pa-md flex flex-center">
      <q-circular-progress
        show-value
        font-size="25px"
        :value="value"
        size="150px"
        :thickness="0.22"
        :color="value >= 10 ? 'blue' : value >= 7 ? 'green' : 'red'"
        track-color="white"
        class="q-ma-md text-bold"
        :max="maxValue"
      >
        {{ value }}%
      </q-circular-progress>
    </div>

    <div>
      <q-card
        v-for="investment in investments"
        :key="investment.id"
        class="my-card q-mb-md"
        flat
        bordered
      >
        <q-item>
          <!-- <q-item-section avatar>
            <q-avatar
              color="grey-3"
              text-color="black"
              icon="eva-minus-outline"
            />
          </q-item-section> -->

          <q-item-section>
            <q-item-label class="text-h6 text-bold">
              {{ investment.name }}
            </q-item-label>
          </q-item-section>
          <q-space />
          <q-chip
            class="text-bold"
            outline
            square
            color="grey-10"
            text-color="white"
          >
            RON {{ investment.value }}
          </q-chip>
          <q-chip
            class="text-bold"
            outline
            square
            color="positive"
            text-color="white"
            icon="eva-trending-up-outline"
          >
            {{ investment.expectedReturn }} %
          </q-chip>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              {{ investment.description }}
            </q-item-label>
          </q-item-section>
          <q-space />
        </q-item>
        <q-item>
          <q-space />
          <q-btn
            class="q-mr-sm"
            color="negative"
            dense
            flat
            rounded
            icon="eva-trash-2-outline"
          />
          <q-btn dense flat rounded icon="eva-edit-outline" />
        </q-item>
      </q-card>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="dialogAdd = true" />
    </q-page-sticky>

    <q-dialog v-model="dialogAdd">
      <q-card class="dialogBox">
        <q-card-section class="row">
          <div class="q-pr-lg text-h6">Add item</div>
          <q-space />
          <q-btn v-close-popup dense flat rounded icon="close" />
        </q-card-section>
        <form>
          <q-card-section class="q-pa-lg">
            <div class="row q-mb-lg">
              <q-input
                v-model="itemToAdd.name"
                label="Title"
                class="col"
                clearable
              />
            </div>
            <div class="row q-mb-lg">
              <q-input
                v-model="itemToAdd.description"
                label="Description"
                class="col"
                clearable
              />
            </div>
            <div class="row q-mb-lg">
              <q-input
                label="Value (RON)"
                v-model="itemToAdd.value"
                type="number"
                filled
                style="max-width: 200px"
              />
            </div>
            <div class="row q-mb-lg">
              <q-input
                label="Expected Return (%)"
                v-model="itemToAdd.expectedReturn"
                type="number"
                filled
                style="max-width: 200px"
              />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              @click="addItem()"
              type="submit"
              class="q-ma-sm"
              round
              unelevated
              size="16px"
              text-color="white"
              color="primary"
              icon="eva-checkmark-outline"
              v-close-popup
            />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: "IncomePage",
  data() {
    return {
      dialogAdd: false,
      itemToAdd: {
        name: "",
        description: "",
        value: 0,
        expectedReturn: 0,
      },
      maxValue: 15,
    };
  },
  computed: {
    investments() {
      return this.$store.getters["fire/getInvestments"];
    },
    getEconomies() {
      return this.$store.getters["fire/getEconomies"];
    },
    getSavings() {
      return this.$store.getters["fire/getSavings"];
    },
    value() {
      let investments = 0;
      let i;
      for (i = 0; i < this.investments.length; i++) {
        investments +=
          (this.investments[i].expectedReturn / 100) *
          this.investments[i].value;
      }

      if (this.getSavings !== 0) {
        return Math.round(((investments * 100) / this.getSavings) * 10) / 10;
      } else {
        return 0;
      }
    },
  },
  methods: {
    addItem() {
      this.$store.dispatch("fire/addInvestment", { ...this.itemToAdd });
      this.dialogAdd = false;
    },
  },
  beforeMount() {
    this.$store.dispatch("fire/getInvestment");
    this.$store.dispatch("fire/getEconomies");
  },
};
</script>

<style>
.dialogBox {
  width: 90%;
  max-width: 500px;
}
</style>
