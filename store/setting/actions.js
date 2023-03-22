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
          status: payload.status,
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
export function getEmployee({}, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${
          process.env.ALL_RICO_USER
        }/api/User/Support/${payload.company.toLowerCase()}/${payload.agent_username.toLowerCase()}`,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ0MTIwZjVkLTI0ZGItNGU4NS05ZjAyLWIxZjA3OGE3NDMyNCIsImNwIjoiYnAiLCJhZyI6ImtnIiwiaWF0IjoxNjc5MzgxMDM5LCJleHAiOjE2Nzk0Njc0Mzl9.xz9TptNn0lNzH5GHC2oxWAwl4xnppDxWeIqoS-KL1nE"
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
export async function getStaticHashWebsite({}, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${
          process.env.ALL_SUPPORT
        }/api/Website/StaticInfo/${payload.company.toLowerCase()}/${payload.agent.toLowerCase()}`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getPromotion({}, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${
          process.env.ALL_PROMOTION
        }/api/Promotion/Auto/Main/${payload.company.toLowerCase()}/${payload.agent.toLowerCase()}`
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function CheckCreditBank({}, bankAcc) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Website/ScbBalance/${bankAcc}`
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function ReportTransactionScbApi({}, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `https://all-scb-api-qlws7pv5wa-as.a.run.app/api/Email/Transaction/${payload.acc_num}?page=${payload.page}`
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function getCashback(context, payout) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_CASHBACK}/api/Cashback/GetCashBackSettingAuto/${payout.company.toLowerCase()}/${payout.agent_username.toLowerCase()}`
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
