export function login(context, { username, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = {
        data: {
          user: username,
          key: 1234
        }
      };

      // let response = await this.$axios.post(
      //   `${process.env.ALL_SUPPORT}/api/Login/auth`,
      //   {
      //     username,
      //     password
      //   }
      // );
      context.commit("set_login", response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function credit_history(context, { username, limit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Smart/credithistory/${username}?limit=${limit}`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function deposit_smart(context, { username, credit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Smart/Deposit`,
        { username: username, amount: credit }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function withdraw_smart(context, { username, credit }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Smart/Withdraw`,
        { username: username, amount: credit }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function getProviderList(context) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Smart/Provider`
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function checkCredit(context, { username, provider_code }) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(username);
      console.log(provider_code);
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Smart/Credit`,
        { username: username, provider_code: provider_code }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function topup_provider(context, { username, amount, provider_code }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Smart/Provider/DP`,
        { username: username, amount: amount, provider_code: provider_code }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function withdraw_provider(
  context,
  { username, amount, provider_code }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Smart/Provider/WD`,
        { username: username, amount: amount, provider_code: provider_code }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function generateRef(
  context,
  { username, amount, provider_code, method }
) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!provider_code) {
        provider_code = "SMART";
      }
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Topup/`,
        {
          username: username,
          amount: amount,
          provider: provider_code,
          operator: context.state.user,
          method: method
        }
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function validatePin(context, { ref, pin }) {
  // console.log(context.state)
  // return
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Topup/Validate`,
        { ref: ref, pin: pin }
      );

      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function getTransaction(context) {
  // console.log(context.state)
  // return
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Topup/Transaction`
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function getAllWebsite(context) {
  // console.log(context.state)
  // return
  if (localStorage.getItem("website")) {
    let a = JSON.parse(localStorage.getItem("website"));
    context.commit("set_website", localStorage.getItem("website"));

    return a;
  }
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Website`
      );
      context.commit("set_website", response.data);
      localStorage.setItem("website", JSON.stringify(response.data));
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

export function getMemberTurn(context, { username, website }) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Website/Rico/Turn?username=${username}&website=${website}`
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function getMemberInfo(context, { username, website }) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Website/Rico/Member?username=${username}&website=${website}`
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function getMemberDeposit(context, { username, website }) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_DEPOSIT}/api/Deposit/List/${username}`
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function getMemberDepositV2(context, username) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_DEPOSIT}/api/Deposit/List/${username}`
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function getMemberWithdrawV2(context, username) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_WITHDRAW}/api/Withdraw/Auto/Withdraw/Support/${username}`
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function getMemberWithdraw(context, { username, website }) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_WITHDRAW}/api/Withdraw/Auto/Withdraw/Support/${username}`
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function getProviderEntance(context, { opcode }) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_SUPPORT}/api/Website/ProviderBO?opcode=${opcode}`
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function repairTransaction(
  context,
  { username, active_provider, repair }
) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Smart/Repair?username=${username}&active=${active_provider}`,
        repair
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function setTurnRico(context, turn) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Website/Setturn`,
        turn
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function getMember(context, payload) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `https://agent-service-backend-kdz5uqbpia-as.a.run.app/api/v1/member/${payload.Id}?limit=${payload.limit}`,
        {
          headers: {
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjJjYmEyMWM2LWQxMGEtNDcxZi04MzY4LTk3YWEzZTFhMmI0ZCIsInVzZXJuYW1lIjoiYWRtaW4iLCJzdGF0dXMiOjEsInRyYW5zYWN0aW9uIjoiMTY0NTQ5MTIwMCJ9.z99Xh1WFkGIunUFYJp6V5ceq93y-oeCD68_aPqXxfDU"
          }
        }
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
