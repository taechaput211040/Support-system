<template>
  <div class="my-3 rounded-lg white">
    <h3 class="pa-3">วันที่ที่ต้องการค้นหา</h3>
    <v-divider></v-divider>
    <div class="pa-3">
      <v-row>
        <v-col cols="12" sm="4">
          <v-select
            @change="selectfiltertype"
            label="เลือกการค้นหา"
            :items="itemdate"
            hide-details="auto"
            dense
            outlined
            v-model="selecttype"
          ></v-select
        ></v-col>
        <v-col cols="12" sm="8" v-if="selecttype == 'findate'">
          <div class="px-2 font-weight-bold row">
            <div class="col-12 col-sm-6  ">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="filter.startDate"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    v-model="filter.startDate"
                    label="จากวันที่ :"
                    prepend-icon="mdi-calendar"
                    readonly
                    hide-details="auto"
                    outlined
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model.trim="filter.startDate"
                  :max="filter.endDate"
                  no-title
                  scrollable
                  locale="th"
                  @input="$refs.menu.save(filter.startDate)"
                >
                </v-date-picker>
              </v-menu>
              <!-- <el-date-picker
                class="full-width"
                v-model.trim="filter.startDate"
                arrow-control
                placeholder="เลือกวันที่ต้องการค้นหา"
              >
              </el-date-picker> -->
            </div>
            <div class="col-12  col-sm-6 ">
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                :return-value.sync="filter.endDate"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="filter.endDate"
                    label="ถึงวันที่"
                    dense
                    outlined
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hide-details="auto"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model.trim="filter.endDate"
                  no-title
                  scrollable
                  :min="filter.startDate"
                  locale="th"
                  @input="$refs.menu2.save(filter.endDate)"
                >
                </v-date-picker>
              </v-menu>
            </div>
          </div>
        </v-col>
        <v-col cols="12 pt-1">
          <v-btn
            color="primary"
            @click="searchbyfillter"
            class="btn_search"
            rounded
            ><v-icon left>mdi-magnify</v-icon> ค้นหา</v-btn
          >
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      menu: false,
      menu2: false,
      itemdate: [
        { text: "วันที่", value: "findate" },
        { text: "วันนี้", value: "today" },
        { text: "เมื่อวาน", value: "yesterday" }
      ],
      selecttype: "findate",
      filter: {
        startDate: undefined,
        endDate: undefined
      }
    };
  },
  mounted() {
    this.selectfiltertype(this.selecttype);
  },
  methods: {
    searchbyfillter() {
      console.log(this.filter);
      this.$emit("search", this.filter);
    },
    getDateTime(date) {
      return this.$moment(date).format("YYYY-MM-DD");
    },
    selectfiltertype(value) {
      let today = new Date();
      switch (value) {
        case "findate":
          this.filter = {
            startDate: dayjs()
              .startOf("month")
              .format("YYYY-MM-DD"),
            endDate: dayjs()
              .endOf("month")
              .format("YYYY-MM-DD")
          };
          break;
        case "today":
          this.filter = {
            startDate: dayjs()
              .startOf("day")
              .format("YYYY-MM-DD"),
            endDate: dayjs()
              .endOf("day")
              .format("YYYY-MM-DD")
          };
          break;
        case "yesterday":
          this.filter = {
            startDate: dayjs()
              .add(-1, "day")
              .startOf("day")
              .format("YYYY-MM-DD"),
            endDate: dayjs()
              .add(-1, "day")
              .endOf("day")
              .format("YYYY-MM-DD")
          };
          break;
        default:
          break;
      }
      this.$emit("search", this.filter);
    }
  }
};
</script>

<style></style>
