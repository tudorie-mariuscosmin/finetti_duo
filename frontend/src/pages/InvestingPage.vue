<template>
  <q-page class="constrain">
    <div class="q-pa-md flex flex-center">
      <q-circular-progress
        show-value
        font-size="25px"
        :value="value"
        size="150px"
        :thickness="0.22"
        color="primary"
        track-color="white"
        class="q-ma-md text-bold"
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
          <q-item-section avatar>
            <q-avatar
              color="grey-3"
              text-color="black"
              icon="eva-minus-outline"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">
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
            RON {{ investment.expectedReturn }}
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
                label="Expected Return (RON)"
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
              text-color="black"
              color="primary"
              icon="eva-checkmark-circle-2-outline"
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
      value: 71,
      dialogAdd: false,
      itemToAdd: {
        name: "",
        description: "",
        value: 0,
        expectedReturn: 0,
      },
      // investments: [
      //   {
      //     id: 0,
      //     name: "Investment Name 0",
      //     description: "Investment description 0",
      //     value: 1000,
      //     expectedReturn: 1000,
      //   },
      //   {
      //     id: 1,
      //     name: "Investment Name 1",
      //     description: "Investment description 1",
      //     value: 2000,
      //     expectedReturn: 2000,
      //   },
      //   {
      //     id: 2,
      //     name: "Investment 2",
      //     description: "Investment description 2",
      //     value: 2000,
      //     expectedReturn: 2000,
      //   },
      // ],
    };
  },
  computed: {
    investments() {
      return this.$store.getters["fire/getInvestments"];
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
  },
};
</script>

<style>
.dialogBox {
  min-width: 40%;
}
</style>
