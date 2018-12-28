import { fetch, query } from 'api'
/**==========================
 *          轮播图
 ==========================*/
let _list = type => {
  let param = {
    AD_Config_list: {
      Type: type,//条件 轮播图分类
      IsDelete: false,
      Online: true,
      order: "Sort",
      field: "ID,Type,Title,Img,Url"
    }
  }
  return query(param)
}
export {
  _list
}