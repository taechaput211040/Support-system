import Vue from "vue";
import moment from "moment";

Vue.filter("dateFormat", (value) => {
  return moment(value).format("YYYY/MM/DD HH:mm:ss");
});

Vue.filter("numberFormat", (value) => {
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
});
