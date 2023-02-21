export function getCashback(context) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = {
        data: {
          casino: 5,
          collect_type: "DAY",
          created_at: "2021-04-26T11:29:02.000000Z",
          esport: 2,
          football: 5,
          game: 5,
          id: 1,
          lotto: 5,
          m2: 2,
          max_amount: 0,
          multi_player: 2,
          parlay: 5,
          pictureUrl:
            "https://image-storage-betkub.s3.ap-southeast-1.amazonaws.com/images/0BOIpDTgDtjz3sLMFjqEzy6BUnJV9fFgASRZT1MM.jpg",
          rate: 5,
          status: 1,
          step: 5,
          update_by: "RICO",
          updated_at: "2022-01-16T05:18:59.000000Z",
          wdlimit_multiply: 1000000,
        },
      };
      // let response = await this.$axios.get("apigetuser")
      // });
      // resolve(response);
      resolve(response);
      console.log(mockuser);
      return;
    } catch (error) {
      reject(error);
    }
  });
}
//getcashback
//getPromotion

export function getPromotion(context) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${
          process.env.ALL_PROMOTION
        }/api/Promotion/Auto/Main/${localStorage.getItem(
          "company"
        )}/${localStorage.getItem("agent")}`
      );

      context.commit("set_promotion", data);

      let bonuslist = data.map(x=>{
        return {text:x.promotionname,value:x.id}
      })
bonuslist.unshift({text:'ไม่รับโบนัส',value:'0'})
      context.commit("set_bonuslist",bonuslist);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
export function updatedPromotion({ state }, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.patch(
        `${process.env.ALL_PROMOTION}/api/Promotion/Auto`,
        { ...payload }
      );
      console.log(payload);
      resolve(data);
    } catch (error) {
      reject("error");
    }
  });
}
export function deletedPromotion(contex, payload) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.delete(
        `${process.env.ALL_PROMOTION}/api/Promotion/Auto/${payload}`
      );

      console.log(`${process.env.ALL_PROMOTION}/api/Promotion/Auto/${payload}`);
      resolve(data);
    } catch (error) {
      reject("error");
    }
  });
}
