import { fetch, query } from 'api'
/**==========================
 *        入口菜单
 ==========================*/
let _homelist = power => {
  let param = {
    Home_Menu_list: {
      order: "Sort",
      field: "Title,Img,Url",
      Power: power, //参数 未注册和访客传1  租户传2
      IsShow: true
    }
  }
  return query(param)
}
let _servicelist = UnionID => {
  return fetch(
    'WebApi.ashx?Act=GetUserPowerMenu',
    { UnionID }
  )
}
export {
  _homelist,
  _servicelist
}