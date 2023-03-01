export function getWebList(context, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        "https://all-support-api-v2-ehhif4jpyq-as.a.run.app/support/site/list",
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
        `https://all-support-api-v2-ehhif4jpyq-as.a.run.app/support/site/${payload.site_id}/status/system`,
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
        `https://all-support-api-v2-ehhif4jpyq-as.a.run.app/support/site/${payload.site_id}/status/withdraw`,
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
        `https://all-support-api-v2-ehhif4jpyq-as.a.run.app/support/site/${payload.site_id}/status/lockdown`,
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
