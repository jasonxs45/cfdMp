import { fetch, query } from 'api'
import { formatDate } from '../utils/util'
/**==============================
 *           商家优惠券
 ==============================*/
//  列表
 let _shoplist = (pageIndex = 1, pageSize = 5) => {
   let param = {
     Merchants_Main_list: {
       field: "ID,Name,Logo,Address,Label,Tel,BusinessTime",
       Online: true,
       order: "Sort",
       IsDelete: false,
       field_count: {
         field: "Merchants_Ticket.ID.count",
         MerchantsID: "link#Merchants_Main.ID",
         IsDelete: false
       },
       page: pageIndex, //页数
       count: pageSize //每页条数
     },
     total_count: ""
   }
   return query(param)
 }
//  详细
let _detail = id => {
  let param = {
    Merchants_Main: {
      ID: id //参数 商户ID
    },
    Merchants_Ticket_list: {
      MerchantsID: "from#Merchants_Main.ID",
      field_count: {
        field: "Merchants_TicketCode.ID.count",
        TicketID: "link#Merchants_Ticket.ID",
        IsDelete: false,
        IsReceive: false
      },
      Online: true,
      IsDelete: false
    }
  }
  return query(param)
}
// 领取
let _submit = (MemberID, TicketID) => {
  return fetch(
    'WebApi.ashx?Act=MerchantsExchange',
    { MemberID, TicketID }
  )
}
// 我的卡券
let _mylist = (status, MemberID, pageIndex = 1, pageSize = 5) => {
//  let now = new Date()
  let current = '#time_now'
  
  let Used = null
  let UseEnd = null
  if (status === 'unused') {
    Used = false
    UseEnd = `>${current}`
  }
  if (status === 'used') {
    Used = true
    UseEnd = `>${current}`
  }
  if (status === 'outtime') {
    Used = false
    UseEnd = `<${current}`
  }
  let param = {
    Merchants_Exchange_list: {
      MemberID, //条件 用户MemberID
      Used, //条件 是否使用   false表示未使用 true表示已使用
      UseEnd, //参数当前时间
      page: pageIndex,
      count: pageSize
    },
    total_count: ""
  }
  return query(param)
}
 export {
   _shoplist,
   _detail,
   _submit,
  _mylist
 }