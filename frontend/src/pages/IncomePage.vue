<template>
  <q-page class="constrain">
    <h5 class="text-signika-negative text-center">My Savings</h5>
    <div class="q-pa-md flex flex-center column">
      <q-circular-progress
        show-value
        font-size="25px"
        :value="value"
        size="150px"
        :thickness="0.22"
        :color="value > 75 ? 'blue' : value > 50 ? 'green' : 'red'"
        track-color="white"
        class="q-ma-md text-bold text-signika-negative"
      >
        {{ value }}%
      </q-circular-progress>
      <p style="font-size: 22px" class="text-weight-medium q-mt-sm">
        {{ savings }} / {{ incomes }}
      </p>
    </div>

    <div>
      <q-tabs
        v-model="tab"
        class="text-black"
        active-color="primary"
        align="justify"
        inline-label
        narrow-indicator
      >
        <q-tab name="incomes" icon="eva-plus-outline" label="Incomes" />
        <q-tab name="spendings" icon="eva-minus-outline" label="Spendings" />
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
                RON {{ economy.value }}
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
              <q-btn-toggle
                v-model="itemToAdd.isIncome"
                toggle-color="primary"
                :options="[
                  { label: 'Income', value: true },
                  { label: 'Expense', value: false }
                ]"
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
      //value: 71,
      dialogAdd: false,
      tab: "incomes",
      itemToAdd: {
        name: "",
        description: "",
        value: 0,
        isIncome: false
      },
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
      incomes: 0,
      savings: 0
    };
  },
  computed: {
    getIncomes() {
      return this.getEconomies.filter(economies => economies.isIncome);
    },
    getSpending() {
      return this.getEconomies.filter(economies => !economies.isIncome);
    },
    getEconomies() {
      return this.$store.getters["fire/getEconomies"];
    },
    value() {
      let incomes = this.getIncomes.reduce((acc, cur) => acc + cur.value, 0);
      let expenses = this.getSpending.reduce((acc, cur) => acc + cur.value, 0);
      let savings = incomes - expenses;
      this.incomes = incomes;
      this.savings = savings;
      this.$store.dispatch("fire/setSavings", savings);
      this.$store.dispatch("fire/setExpenses", expenses);
      if (incomes !== 0) {
        return Math.round((savings / incomes) * 100);
      } else {
        return 0;
      }
    }
  },
  methods: {
    addItem() {
      this.$store.dispatch("fire/addEconomy", { ...this.itemToAdd });
      this.dialogAdd = false;
    }
  },
  beforeMount() {
    this.$store.dispatch("fire/getEconomies");
  }
};
</script>

<style>
.dialogBox {
  min-width: 40%;
}
</style>
