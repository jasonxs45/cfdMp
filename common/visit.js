import { fetch, query } from 'api'
/**==============================
 *            门禁系统
 ==============================*/
//  查询楼层
let _floorlist = (id = 1) => {
  let param = {
    Office_Room_distinct_ext: {
      BuildingID: id, //参数 写字楼ID
      IsDelete: false,
      order: "Sort-",
      field: "Floor,Sort"
    }
  }
  return query(param)
}
//  查询公司
let _companylist = floor => {
  let param = {
    Office_Company_list: {
      IsDelete: false,
      order: "Sort",
      field: "ID,BuildingID,Name,Level",
      join: {
        inner_join1: {
          join: "Office_Company_Room.CompanyID,Office_Company.ID"
        },
        inner_join2: {
          join: "Office_Room.ID,Office_Company_Room.RoomID",
          field: "RoomNumber",
          Floor: floor  //参数 楼层名称
        }
      }
    }
  }
  return query(param)
}
export {
  _floorlist,
  _companylist
}