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
      <q-tabs
        v-model="tab"
        class="text-black"
        active-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="incomes" icon="eva-plus-circle-outline" />
        <q-tab name="spendings" icon="eva-minus-circle-outline" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="incomes">
          <q-card
            v-for="economy in getIncomes"
            :key="economy.id"
            class="my-card q-mb-md"
            flat
            bordered
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar
                  v-if="economy.isIncome"
                  color="green-3"
                  text-color="black"
                  icon="eva-plus-outline"
                />
                <q-avatar
                  v-else
                  color="red-3"
                  text-color="black"
                  icon="eva-minus-outline"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold">
                  {{ economy.name }}
                </q-item-label>
              </q-item-section>
              <q-space />
              <q-chip
                v-if="economy.isIncome"
                class="text-bold"
                outline
                square
                color="positive"
                text-color="white"
              >
                RON {{ economy.value }}
              </q-chip>
              <q-chip
                v-else
                class="text-bold"
                outline
                square
                color="negative"
                text-color="white"
              >
                RON 7000
              </q-chip>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>
                  {{ economy.description }}
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
        </q-tab-panel>
        <q-tab-panel name="spendings">
          <q-card
            v-for="economy in getSpending"
            :key="economy.id"
            class="my-card q-mb-md"
            flat
            bordered
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar
                  v-if="economy.isIncome"
                  color="green-3"
                  text-color="black"
                  icon="eva-plus-outline"
                />
                <q-avatar
                  v-else
                  color="red-3"
                  text-color="black"
                  icon="eva-minus-outline"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold">
                  {{ economy.name }}
                </q-item-label>
              </q-item-section>
              <q-space />
              <q-chip
                v-if="economy.isIncome"
                class="text-bold"
                outline
                square
                color="positive"
                text-color="white"
              >
                RON {{ economy.value }}
              </q-chip>
              <q-chip
                v-else
                class="text-bold"
                outline
                square
                color="negative"
                text-color="white"
              >
                RON 7000
              </q-chip>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>
                  {{ economy.description }}
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
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "IncomePage",
  data() {
    return {
      value: 71,
      tab: "economies",
      // economies: [
      //   {
      //     id: 0,
      //     name: "Name 0",
      //     description: "Economy description 0",
      //     value: 7000,
      //     isIncome: true,
      //   },
      //   {
      //     id: 1,
      //     name: "Name 1",
      //     description: "Economy description 1",
      //     value: 7000,
      //     isIncome: false,
      //   },
      //   {
      //     id: 2,
      //     name: "Name 2",
      //     description: "Economy description 2",
      //     value: 7000,
      //     isIncome: true,
      //   },
      // ],
      economies: [],
    };
  },
  computed: {
    getIncomes() {
      return this.economies.filter((economies) => economies.isIncome);
    },
    getSpending() {
      return this.economies.filter((economies) => !economies.isIncome);
    },
  },
  methods: {},
  beforeMount() {
    this.$store.dispatch("fire/getEconomies");
    this.economies = this.$store.getters["fire/getEconomies"];
    console.log(this.economies);
  },
};
</script>

<style></style>
