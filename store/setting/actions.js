export function getWebList(context, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_SUPPORT_V2}/support/site/list`,
        {
          params: { ...params }
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function changeSystem(context, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.post(
        `${process.env.ALL_SUPPORT_V2}/support/site/${payload.site_id}/status/system`,
        {
          status: payload.status
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function changeWithdraw(context, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.post(
        `${process.env.ALL_SUPPORT_V2}/support/site/${payload.site_id}/status/withdraw`,
        {
          status: payload.status
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function lockdownWebsite(context, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.post(
        `${process.env.ALL_SUPPORT_V2}/support/site/${payload.site_id}/status/lockdown`,
        {
          status: true,
          operator: "api"
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
