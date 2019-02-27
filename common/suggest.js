import { fetch, query } from 'api'
/**==============================
 *           投诉建议
 ==============================*/
// 用户提交
let _submit = (Type, MemberID, Description, Img) => {
  return fetch(
    'WebApi.ashx?Act=SubmitSuggest',
    { Type, MemberID, Description, Img }
  )
}
// 用户查询报修列表
let _userlist = (MemberID, pageIndex = 1, pageSize = 5) => {
  let param = {
    Suggest_Apply_list: {
      MemberID, //条件用户ID
      order: "AddTime-",
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
// 用户查询详情
let _userdetail = (ID, MemberID) => {
  let param = {
    Suggest_Apply: {
      ID, //报修投诉ID
      MemberID
    }
  }
  return query(param)
}
export {
  _submit,
  _userlist,
  _userdetail
}