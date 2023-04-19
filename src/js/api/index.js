import axios_ from "../util/http.js";
let axios = axios_.axios_;

let origin = axios.host();
let memberWeb = origin + "/member-web/api";
// 查詢 餐廳列表
export const getRestaurantNew = params =>
  axios.post(memberWeb + "/restaurant/getRestaurantNew", params);
