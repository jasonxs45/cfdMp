import { fetch, query } from 'api'
/**==========================
 *         新闻列表及详细
 ==========================*/
 let _types = () => {
   let param = {
     News_Type_list: {
       order: "Sort",
       IsDelete: false
     },
     total_count: ""
   }
   return query(param)
 }
let _banner = typeid => {
  let param = {
    News_News_list: {
      TypeID: typeid,
      order: "Sort",
      IsCommend: true,
      IsDelete: false,
      IsCheck: true,
      field: "ID,Thumbnail"
    }
  }
  return query(param)
}
let _list = (typeid, pageIndex = 1, pageSize = 6) => {
  let param = {
    News_News_list: {
      TypeID: typeid,  //条件 分类ID
      order: "Sort",
      IsCheck: true,
      IsDelete: false,
      field: "Sort,ID,TypeID,Thumbnail,Title,Url,AddTime",
      page: pageIndex, //参数 当前页
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
let _detail = id => {
  let param = {
    News_News: {
      ID: id
    }
  }
  return query(param)
}
export {
  _types,
  _list,
  _banner,
  _detail
}