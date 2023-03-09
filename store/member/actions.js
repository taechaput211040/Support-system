// เชครีพอตเมมเบอร์
export async function getReportmember({ commit }, fillter = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${
          process.env.ALL_MEMBER
        }/api/Member/Agent/SubScribe/${localStorage.getItem(
          "company"
        )}/${localStorage.getItem("agent")}`,
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

export async function changePasswordMember({ commit }, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.patch(
        `${process.env.ALL_MEMBER}/api/Member/Agent/Password`,
        {
          id: payload.id,
          password: payload.password
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export async function changeStatus(context, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.patch(
        `${process.env.ALL_MEMBER}/api/Member/Agent/Status`,
        {
          id: payload.id,
          status: payload.status,
          operator: context.rootState.auth.user
        }
      );
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
// เชครีพอตเมมเบอร์
// เชครีพอตเมมเบอร์ ID

// เชครีพอตเมมเบอร์ ID
//เชคข้อมูลปัจจุบัน turn
export async function getTurnByid(context, username) {
  console.log(username);
  return new Promise(async (resolve, reject) => {
    //get turn
    try {
      let result = await this.$axios.get(
        `${process.env.ALL_MEMBER}/api/MemberTurn/Auto/${username}`
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
    //get credit

    //get winlose
  });
}
export async function updateTurn(context, turn) {
  // console.log(turn)
  // return
  turn.operator = context.rootState.auth.user;
  turn.ip_operator = context.rootState.auth.ip;

  return new Promise(async (resolve, reject) => {
    //get turn
    try {
      let result = await this.$axios.put(
        `${process.env.ALL_MEMBER}/api/MemberTurn`,
        turn
      );
      resolve(result);
    } catch (error) {
      reject(error);
    }
    //get credit

    //get winlose
  });
}
export function createMember(context, body) {
  return new Promise(async (resolve, reject) => {
    console.log(process.env.ALL_MEMBER);
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_MEMBER}/api/Member/Auto/${context.rootState.auth.hash}`,
        body
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function getMemberDeposit(context, username) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_DEPOSIT}/api/Website/Rico/Member/DepositV2?username=${username}`
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function getMemberWithdraw(context, username) {
  // console.log(context.state)
  // return

  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_WITHDRAW}/api/Website/Rico/Member/WithdrawV2?username=${username}`
      );
      console.log(response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function editMember(context, body) {
  return new Promise(async (resolve, reject) => {
    // console.log(context.rootState.auth.user)
    body.operator = context.rootState.auth.user;
    try {
      let response = await this.$axios.put(
        `${process.env.ALL_MEMBER}/api/Member/`,
        body
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function clearCatch(context, user) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.get(
        `${process.env.ALL_MEMBER}/api/Member/Agent/ClearCache/${user}`
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
