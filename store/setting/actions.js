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
export async function getCashback(context, payout) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${
          process.env.ALL_CASHBACK
        }/api/Cashback/GetCashBackSettingAuto/${payout.company.toLowerCase()}/${payout.agent_username.toLowerCase()}`
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function checkCashback(context, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_CASHBACK}/api/cashback/Cashbackcheck/${payload}`
      );

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getManualEditCredit(context, fillter = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_EDITCREDIT}/api/Edit/${
          fillter.company
        }/${fillter.agent.toLowerCase()}`,
        {
          params: {
            ...fillter
          }
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getDetailAgent(context, param) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `/v1alpha/permanent/user/prefix?comPrefix=${param.company.toLowerCase()}&agentPrefix=${param.agent_username.toLowerCase()}`,
        {
          headers: {
            apikey: `SAUCVDWFYGZH3K4M5P7Q8RATBUCWEXFYH2J3K4N6P7Q9SATBVDWEXGZH2J`,
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsYWNramFjazg4OCIsImdyb3VwcyI6WyJSRUFEX1BST1ZJREVSIl0sIndvcmtzcGFjZSI6InNtYXJ0Iiwic3VwZXJ2aXNvciI6eyJ1c2VybmFtZSI6Im1hc3RlcnNlbmlvcjIiLCJyb2xlIjoiU0VOSU9SIiwid29ya3NwYWNlIjoic21hcnQiLCJsZXZlbCI6NCwiY29tUHJlZml4Ijoic20iLCJhZ2VudFByZWZpeCI6Im0yIn0sInJvbGUiOiJBR0VOVCIsImlzU3RhZmYiOmZhbHNlLCJpc0Nsb25lIjpmYWxzZSwiaWF0IjoxNjc5NTcwMDczLCJleHAiOjE2ODA1MjA0NzMsImlzcyI6IlVrQTUwNzBacUFUejUzWkw4ZGRQaFFIbE5FNDhQRUpCIn0.LG8ggya6qcWB1f3_vDNFuIOxx-QR5Dhv7416wTF1CO8`
          }
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getBalance(context, username) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `/v1alpha/credit/balance/${username}`,
        {
          headers: {
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsYWNramFjazg4OCIsImdyb3VwcyI6WyJSRUFEX1BST1ZJREVSIl0sIndvcmtzcGFjZSI6InNtYXJ0Iiwic3VwZXJ2aXNvciI6eyJ1c2VybmFtZSI6Im1hc3RlcnNlbmlvcjIiLCJyb2xlIjoiU0VOSU9SIiwid29ya3NwYWNlIjoic21hcnQiLCJsZXZlbCI6NCwiY29tUHJlZml4Ijoic20iLCJhZ2VudFByZWZpeCI6Im0yIn0sInJvbGUiOiJBR0VOVCIsImlzU3RhZmYiOmZhbHNlLCJpc0Nsb25lIjpmYWxzZSwiaWF0IjoxNjc5NTcwMDczLCJleHAiOjE2ODA1MjA0NzMsImlzcyI6IlVrQTUwNzBacUFUejUzWkw4ZGRQaFFIbE5FNDhQRUpCIn0.LG8ggya6qcWB1f3_vDNFuIOxx-QR5Dhv7416wTF1CO8`
          }
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function getHistoryCredit(
  { commit },
  params = {
    username: undefined,
    page: undefined,
    limit: undefined,
    type: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `/v1alpha/credit/history/${params.username}`,
        {
          params: {
            page: params.page,
            limit: params.limit,
            type: params.type
          },
          headers: {
            authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJsYWNramFjazg4OCIsImdyb3VwcyI6WyJSRUFEX1BST1ZJREVSIl0sIndvcmtzcGFjZSI6InNtYXJ0Iiwic3VwZXJ2aXNvciI6eyJ1c2VybmFtZSI6Im1hc3RlcnNlbmlvcjIiLCJyb2xlIjoiU0VOSU9SIiwid29ya3NwYWNlIjoic21hcnQiLCJsZXZlbCI6NCwiY29tUHJlZml4Ijoic20iLCJhZ2VudFByZWZpeCI6Im0yIn0sInJvbGUiOiJBR0VOVCIsImlzU3RhZmYiOmZhbHNlLCJpc0Nsb25lIjpmYWxzZSwiaWF0IjoxNjc5NTcwMDczLCJleHAiOjE2ODA1MjA0NzMsImlzcyI6IlVrQTUwNzBacUFUejUzWkw4ZGRQaFFIbE5FNDhQRUpCIn0.LG8ggya6qcWB1f3_vDNFuIOxx-QR5Dhv7416wTF1CO8`
          }
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
