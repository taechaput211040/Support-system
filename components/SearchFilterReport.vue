<template>
  <v-card width="100%" class="elevation-4 pa-5 rounded-lg">
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-row>
          <v-col cols="12">
            <v-row align="baseline">
              <p class="font-weight-bold">เริ่ม</p>
              <v-col cols="7">
                <el-date-picker
                  class="full-width"
                  v-model.trim="filter.startDate"
                  arrow-control
                  placeholder="วันที่"
                  style="width: 100%"
                />
              </v-col>
              <!-- <v-col>
                <el-time-picker
                  class="full-width"
                  v-model.trim="filter.startTime"
                  format="HH:mm"
                  arrow-control
                  placeholder="เวลา"
                  style="width: 100%"
                >
                </el-time-picker>
              </v-col> -->
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row align="baseline">
              <p class="font-weight-bold">ถึง</p>
              <v-col cols="7">
                <el-date-picker
                  class="full-width"
                  v-model.trim="filter.endDate"
                  arrow-control
                  placeholder="วันที่"
                  style="width: 100%"
                />
              </v-col>
              <!-- <v-col>
                <el-time-picker class="full-width" v-model.trim="filter.endTime" format="HH:mm" arrow-control
                  placeholder="เวลา" style="width: 100%">
                </el-time-picker></v-col> -->
            </v-row>
          </v-col></v-row
        > </v-col
      ><v-divider vertical class="display-mb"></v-divider>
      <v-col cols="12" md="6" lg="6">
        <v-row>
          <v-col cols="8" md="8" v-if="searchinput == true">
            <v-text-field
              label="ค้นหาด้วย username"
              placeholder="กรอกคำค้นหา"
              dense
              v-model.trim="filter.inputfilter"
              outlined
              clearable
              hide-details="auto"
            ></v-text-field
          ></v-col>
          <v-col
            cols="4"
            md="3"
            class="d-flex"
            :class="{ aligncclass: searchinput == false }"
          >
            <v-btn color="primary" @click="search()">
              <v-icon left dark> mdi-magnify </v-icon>
              ค้นหา</v-btn
            ></v-col
          >
          <v-col cols="8" class="d-flex">
            <v-btn color="success" class="mx-1" dark @click="toyesterday()"
              ><v-icon left>mdi-menu-left</v-icon> เมื่อวาน</v-btn
            ><v-btn color="warning" class="mx-1" @click="today()"
              >วันนี้<v-icon right>mdi-circle-medium</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      inputdata: ""
    };
  },

  props: {
    filter: Object,
    searchinput: {
      type: Boolean,
      default: true
    },
    keyword: ""
  },
  methods: {
    getDateTime(date, time) {
      let dateFormat = "YYYY-MM-DD";
      let timeFormat = "HH:mm:ss";
      return this.$moment(
        `${this.$moment(date).format(dateFormat)} ${this.$moment(time).format(
          timeFormat
        )}`,
        "YYYY-MM-DD HH:mm:ss"
      )
        .utc()
        .format(`${dateFormat} ${timeFormat}`);
    },
    getFilterParameter() {
      let start = undefined;
      let end = undefined;
      if (this.filter.startDate) {
        if (this.filter.startTime) {
          start = this.getDateTime(
            this.filter.startDate,
            this.filter.startTime
          );
        } else {
          start = this.getDateTime(
            this.filter.startDate,
            new Date().setHours(0, 0, 0, 0)
          );
        }
      }
      if (this.filter.endDate) {
        if (this.filter.endTime) {
          end = this.getDateTime(this.filter.endDate, this.filter.endTime);
        } else {
          end = this.getDateTime(
            this.filter.endDate,
            new Date().setHours(23, 59, 59, 999)
          );
        }
      }
      let params = {
        startDate: this.$moment(start).format("YYYY-MM-DD HH:mm:ss") + "Z",
        endDate: this.$moment(end).format("YYYY-MM-DD HH:mm:ss") + "Z",
        search: this.filter.inputfilter
      };

      return params;
    },
    setYesterday() {
      let params = {
        startDate: dayjs()
          .add(-1, "day")
          .startOf("day")
          .toISOString(),
        endDate: dayjs()
          .add(-1, "day")
          .endOf("day")
          .toISOString(),
        search: this.filter.inputfilter
      };
      this.filter.startDate = params.startDate;
      this.filter.endDate = params.endDate;
      return params;
    },
    setToday() {
      let params = {
        startDate: dayjs()
          .startOf("day")
          .toISOString(),
        endDate: dayjs()
          .endOf("day")
          .toISOString(),
        search: this.filter.inputfilter
      };
      this.filter.startDate = params.startDate;
      this.filter.endDate = params.endDate;
      return params;
    },
    search() {
      let response = this.getFilterParameter();

      this.$emit("search", response);
    },
    toyesterday() {
      let response = this.setYesterday();
      this.$emit("yesterday", response);
    },
    today() {
      let response = this.setToday();
      this.$emit("today", response);
    }
  }
};
</script>

<style></style>
