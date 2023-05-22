export function login(context, { username, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT_V2}/auth/signin`,
        {
          username,
          password
        }
      );
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
  if (context.state.website) {
    return context.state.website;
  }
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_SETTING}/api/Setting/AllActive`
      );
      context.commit("set_website", response.data);
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
        `${process.env.ALL_MEMBER}/api/Member/${username}`
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

export function getCheckturn(context, { username }) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_MEMBER}/api/MemberTurn/Auto/${username}`
      );
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
export function change_password(context, data) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.put(
        `${process.env.ALL_SUPPORT_V2}/auth/ChangePassword`,
        {
          old_password: data.old_password,
          new_password: data.new_password,
          retype_new_password: "string"
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
