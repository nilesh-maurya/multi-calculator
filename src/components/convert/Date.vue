<template>
  <div class="date">
    <title-bar title="Date"></title-bar>
    <div class="date__input">
      <v-row>
        <v-col cols="12" sm="6">
          <v-dialog
            ref="dialog1"
            v-model="fromModal"
            :return-value.sync="from"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="from"
                label="From"
                hint="YYYY/MM/DD"
                persistent-hint
                :prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              color="green accent-4"
              header-color="green"
              v-model="from"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="green" @click="fromModal = false">
                Cancel
              </v-btn>
              <v-btn text color="green" @click="$refs.dialog1.save(from)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" sm="6">
          <v-dialog
            ref="dialog2"
            v-model="toModal"
            :return-value.sync="to"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="to"
                label="Today"
                :prepend-icon="event"
                hint="YYYY/MM/DD"
                persistent-hint
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              color="green accent-4"
              header-color="green"
              v-model="to"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="green" @click="toModal = false">
                Cancel
              </v-btn>
              <v-btn text color="green" @click="$refs.dialog2.save(to)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
    </div>
    <div class="date__output">
      <div class="date__diff">
        <h3>Date Difference</h3>
        <div class="diff__items">
          <div class="diff__item">
            Years
            <br />
            <span class="big-2">{{ date.diff.year || 0 }} </span>
          </div>
          <div class="diff__item">
            Months
            <br />
            <span class="big-2">{{ date.diff.month || 0 }} </span>
          </div>
          <div class="diff__item">
            Days
            <br />
            <span class="big-2">{{ date.diff.day || 0 }} </span>
          </div>
        </div>
      </div>

      <div class="date__summary">
        <v-divider></v-divider>
        <h3>Summary</h3>
        <div class="date__total">
          <div class="total__item total__years">
            Years<br />
            <span class="big-2">{{ date.summary.year || 0 }}</span>
          </div>
          <div class="total__item total__months">
            Months<br />
            <span class="big-2">{{ date.summary.month || 0 }}</span>
          </div>
          <div class="total__item total__weeks">
            Weeks<br />
            <span class="big-2">{{ date.summary.week || 0 }}</span>
          </div>
          <div class="total__item total__days">
            Days<br />
            <span class="regular">{{ date.summary.day || 0 }}</span>
          </div>
          <div class="total__item total__hours">
            Hours<br />
            <span class="regular">{{ date.summary.hour || 0 }}</span>
          </div>
          <div class="total__item total__minutes">
            Minutes<br />
            <span class="regular">{{ date.summary.minute || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from "../TitleBar.vue";
import { mdiCalendar } from "@mdi/js";
import { getSummary, findDay } from "../../utils/date_util";
import moment from "moment";

export default {
  name: "Date",
  data() {
    return {
      event: mdiCalendar,
      from: new Date().toISOString().substr(0, 10),
      fromModal: false,
      to: new Date().toISOString().substr(0, 10),
      toModal: false
    };
  },
  computed: {
    date() {
      let date = [this.from, this.to];

      // parse the date string
      date = date.map(d => {
        d = d.split("-");
        d[0] = parseInt(d[0], 10);
        // month is 0 based indexing
        d[1] = parseInt(d[1], 10) - 1;
        d[2] = parseInt(d[2], 10);

        return d;
      });

      // get bottom bar(summary)
      const summary = getSummary(date[0], date[1]);

      //Object.values(summary).forEach(s => {});
      // get left sidebar (date difference)
      const diff = {};

      diff.year = summary.year;
      diff.month = summary.month - summary.year * 12;
      if (moment(date[0]).isBefore(date[1])) {
        diff.day = findDay(date[0], date[1]);
      } else {
        diff.day = findDay(date[1], date[0]);
      }
      return {
        diff,
        summary
      };
    }
  },
  components: {
    TitleBar
  }
};
</script>

<style scoped>
.big-2 {
  font-size: 24px;
  font-weight: 500;
}

.big-6 {
  font-size: 50px;
}

.accent-small {
  font-size: 14px;
}

.accent-medium {
  font-size: 20px;
}

.accent-bold {
  font-weight: 600;
}

.regular {
  font-size: 16px;
}

.date__output {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin: 20px 0 0 0;
}

.date__diff {
  width: 100%;
}

.diff__items {
  display: flex;
  justify-content: center;
  margin: 15px 0 5px 0;
}

.diff__item {
  width: 33%;
}

.date__summary {
  width: 100%;
  margin-top: 10px;
}
.date__summary h3 {
  padding-top: 20px;
}
.date__total {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0 0 0;
}

.total__item {
  flex: 33%;
  font-size: 15px;
  margin-bottom: 10px;
}
</style>
