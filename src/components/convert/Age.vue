<template>
  <div class="age">
    <title-bar title="Age"></title-bar>
    <div class="age__input">
      <v-row>
        <v-col cols="12" sm="6">
          <v-dialog
            ref="dialog1"
            v-model="dobModal"
            :return-value.sync="dob"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dob"
                label="Date of birth"
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
              v-model="dob"
              :max="today"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="green" @click="dobModal = false">
                Cancel
              </v-btn>
              <v-btn text color="green" @click="$refs.dialog1.save(dob)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col cols="12" sm="6">
          <v-dialog
            ref="dialog2"
            v-model="todayModal"
            :return-value.sync="today"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="today"
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
              v-model="today"
              :min="dob"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="green" @click="todayModal = false">
                Cancel
              </v-btn>
              <v-btn text color="green" @click="$refs.dialog2.save(today)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
    </div>
    <div class="age__output">
      <div class="age__diff">
        <h1>Age</h1>
        <div class="diff__year">
          <span class="big-6 diff-year accent-bold"
            >{{ age.diff.year || 0 }}
          </span>
          <span class="accent-medium accent-bold">years</span>
        </div>
        <span class="diff__month">
          <span class="accent-small accent-bold"
            >{{ age.diff.month || 0 }}
          </span>
          <span class="accent-small accent-bold">months</span>
        </span>
        |
        <span class="diff__day">
          <span class="accent-small accent-bold">{{ age.diff.day || 0 }} </span>
          <span class="accent-small accent-bold">days</span>
        </span>
      </div>
      <v-divider :vertical="true"></v-divider>

      <div class="age__next">
        <h3>Next Birthday</h3>
        <div class="next__icon">
          <img class="cake" src="../../assets/cake.svg" alt="cake" />
        </div>
        <div class="next__weekday">{{ age.next.weekday }}</div>
        <span class="diff__month">
          <span class="accent-small accent-bold"
            >{{ age.next.month || 0 }}
          </span>
          <span class="accent-small accent-bold">months</span>
        </span>
        |
        <span class="diff__day">
          <span class="accent-small accent-bold">{{ age.next.day || 0 }} </span>
          <span class="accent-small accent-bold">days</span>
        </span>
      </div>
      <div class="age__summary">
        <v-divider></v-divider>
        <h3>Summary</h3>
        <div class="age__total">
          <div class="total__item total__years">
            Years<br />
            <span class="big-2">{{ age.summary.year || 0 }}</span>
          </div>
          <div class="total__item total__months">
            Months<br />
            <span class="big-2">{{ age.summary.month || 0 }}</span>
          </div>
          <div class="total__item total__weeks">
            Weeks<br />
            <span class="big-2">{{ age.summary.week || 0 }}</span>
          </div>
          <div class="total__item total__days">
            Days<br />
            <span class="regular">{{ age.summary.day || 0 }}</span>
          </div>
          <div class="total__item total__hours">
            Hours<br />
            <span class="regular">{{ age.summary.hour || 0 }}</span>
          </div>
          <div class="total__item total__minutes">
            Minutes<br />
            <span class="regular">{{ age.summary.minute || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleBar from "../TitleBar.vue";
import { mdiCalendar } from "@mdi/js";
import { getSummary, findDay, getNextBirthday } from "../../utils/date_util";

export default {
  name: "Age",
  created() {
    const age = JSON.parse(window.localStorage.getItem("Age"));
    if (age) {
      this.dob = age.dob;
      this.today = age.today;
    } else {
      this.dob = new Date().toISOString().substr(0, 10);
      this.today = new Date().toISOString().substr(0, 10);
    }
  },
  data() {
    return {
      event: mdiCalendar,
      dob: "",
      dobModal: false,
      today: "",
      todayModal: false
    };
  },
  computed: {
    age() {
      let date = [];
      date.push(this.dob);
      date.push(this.today);

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

      // get left sidebar (age difference)
      const diff = {};

      diff.year = summary.year;
      diff.month = summary.month - summary.year * 12;
      diff.day = findDay(date[0], date[1]);

      // get right side bar(next birthday)
      const next = getNextBirthday(date[0], date[1]);

      // store(input values) in localstorage
      window.localStorage.setItem(
        "Age",
        JSON.stringify({ dob: this.dob, today: this.today })
      );

      return {
        diff,
        next,
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

.age {
  width: 100%;
}

.age__diff h1 {
  font-weight: 400;
  font-size: 45px;
}

.age__output {
  padding: 10px;
  border: 2px solid rgb(220, 220, 220);
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
}

.age__diff,
.age__next {
  display: inline-block;
  width: 49.5%;
  padding: 0 10px;
  align-self: flex-end;
}

.age__next {
  text-align: center;
}

.next__weekday {
  font-size: 22px;
  margin: 10px 0;
}

.diff-year {
  color: #09b464;
}

.next__icon {
  background: linear-gradient(210deg, #21dd85 0%, #09b464 100%);
  display: inline-block;
  padding: 8px 10px;
  margin: 10px 0 0 0;
  border-radius: 100px;
}

.cake {
  width: 30px;
  height: 30px;
}

.age__summary {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
.age__summary h3 {
  padding-top: 20px;
}
.age__total {
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
