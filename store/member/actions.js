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
export async function getReportmemberbyid({ commit }, fillter = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: [
          {
            bankAcc: "09772778704",
            bankAccRef: "X2778704",
            bankName: "WAVEPAY",
            birthdate: null,
            bonusid: 3,
            created_at: "2022-01-20 12:47:38",
            dpAuto: true,
            gender: "male",
            knowFrom: "สมัครจากหน้าเว็บ",
            lastname: "aayt",
            lastnameEng: null,
            lineID: "ไม่มีข้อมูล",
            name: "aayt",
            nameEng: null,
            operator: "RICO",
            phone: "09778772704",
            recommender: null,
            remark: null,
            status: true,
            updated_at: "2022-01-20 12:51:23",
            username: "BE9778772704",
            wdAuto: false
          }
        ]
      };
      // let response = await api.get(`/api/progress/${fillter.username}`, {
      //   params: {
      //     ...fillter
      //   }
      // });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function providerMap(context, input) {
  console.log(context);
  console.log(input);
  const string_data = context.rootState.auth.provider[input];
  console.log(string_data);
  return input;
}
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
export async function getDetailLink(context, url) {
  // return

  return new Promise(async (resolve, reject) => {
    //get turn

    try {
      let result = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Website/Betdetail`,
        { url: url }
      );

      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
    //get credit

    //get winlose
  });
}
//เชคข้อมูลปัจจุบัน turn

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
        `${process.env.ALL_SUPPORT}/api/Website/Rico/Member/DepositV2?username=${username}`
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
        `${process.env.ALL_SUPPORT}/api/Website/Rico/Member/WithdrawV2?username=${username}`
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
export function PostEditTopupCredit(context, body) {
  return new Promise(async (resolve, reject) => {
    // console.log(context.rootState.auth.user)
    body.operator = context.rootState.auth.user;
    body.ip_operator = context.rootState.auth.ip;
    body.company = context.rootState.auth.company;
    body.agent = context.rootState.auth.agent;
    console.log(body);
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Website/Edit/Credit`,
        body
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function PostEditCutCredit(context, body) {
  return new Promise(async (resolve, reject) => {
    // console.log(context.rootState.auth.user)
    body.operator = context.rootState.auth.user;
    body.ip_operator = context.rootState.auth.ip;
    body.company = context.rootState.auth.company;
    body.agent = context.rootState.auth.agent;
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Website/Edit/Cut`,
        body
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function PostEditTopupBonus(context, body) {
  return new Promise(async (resolve, reject) => {
    // console.log(context.rootState.auth.user)
    body.operator = context.rootState.auth.user;
    body.ip_operator = context.rootState.auth.ip;
    body.company = context.rootState.auth.company;
    body.agent = context.rootState.auth.agent;
    try {
      let response = await this.$axios.post(
        `${process.env.ALL_SUPPORT}/api/Website/Edit/Bonus`,
        body
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function getWheel(context) {
  return new Promise(async (resolve, reject) => {
    // console.log(context.rootState.auth.user)

    try {
      let response = await this.$axios.get(
        `${process.env.ALL_WHEEL}/api/Wheel/admin/${context.rootState.auth.company}/${context.rootState.auth.agent}`
      );

      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}
export function updateWheel(context, turn) {
  return new Promise(async (resolve, reject) => {
    // console.log(context.rootState.auth.user)

    try {
      let response = await this.$axios.patch(
        `${process.env.ALL_WHEEL}/api/Wheel/admin/${turn.id}`,
        turn
      );

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
