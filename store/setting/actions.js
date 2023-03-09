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
export function getSystemSetting(context, hash) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_SETTING}/api/Setting/${hash}`
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function getWebMessage(context, hash) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_MESSAGE}/agent/${hash}`
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function getEmployee({}, agent) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_RICO_USER}/api/User/${agent.toLowerCase()}`,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MTIwZjVkLTI0ZGItNGU4NS05ZjAyLWIxZjA3OGE3NDMyNCIsImNwIjoiYnAiLCJhZyI6ImtnIiwiaWF0IjoxNjc4MzMyMDMyLCJleHAiOjE2Nzg0MTg0MzJ9.I6Omn65h1VUE3UqvDqP6TDa-igrGzFy0jT-8CwBINmc"
          }
        }
      );
      resolve(response);
      return;
    } catch (error) {
      reject(error);
    }
  });
}
export function getCompanybank(context, hash) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_COMPANY_BANK}/api/Company?company=${hash}`
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getProfitReport({}, params) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_RICO_REPORT}/api/profitloss_agent/sum_date`,
        {
          params: params
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
