<template>
  <div class="row px-sm-0 px-0 py-sm-0">
    <div class="col-md-6 col-12">
      <div class="row" style="align-items: baseline">
        เริ่ม
        <div class="col-7 col-md-7 pa-1">
          <el-date-picker
            class="full-width"
            v-model.trim="filter.startDate"
            arrow-control
            placeholder="วันที่"
            style="width: 100%"
            :picker-options="datePickerOptions"
          />
        </div>
        <div class="col pa-1">
          <el-time-picker
            class="full-width"
            v-model.trim="filter.startTime"
            format="HH:mm"
            arrow-control
            placeholder="เวลา"
            style="width: 100%"
          >
          </el-time-picker>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-12">
      <div class="row" style="align-items: baseline">
        ถึง
        <div class="col-7 col-md-7 pa-1">
          <el-date-picker
            class="full-width"
            v-model.trim="filter.endDate"
            arrow-control
            placeholder="วันที่"
            style="width: 100%"
          />
        </div>
        <div class="col pa-1">
          <el-time-picker
            class="full-width"
            v-model.trim="filter.endTime"
            format="HH:mm"
            arrow-control
            placeholder="เวลา"
            style="width: 100%"
          >
          </el-time-picker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      value2: "",
      fromDate: null,
      dateLimit: 3,
      datePickerOptions: {
        disabledDate(date) {
          return date < dayjs().add(-2, "day");
        }
      }
    };
  },
  props: {
    filter: {
      startDate: new Date(),
      startTime: new Date(new Date().setHours(0, 0, 0, 0)),
      endDate: new Date(),
      endTime: new Date(new Date().setHours(23, 59, 59, 999))
    }
  }
};
</script>
