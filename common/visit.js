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
//  访客提交
let _visitorsubmit = (MemberID, CompanyID, Remark) => {
  return fetch(
    'WebApi.ashx?Act=ApplyVisit',
    {
      MemberID,
      CompanyID,
      InviteName: '',
      InviteTel: '',
      VisitTime: '',
      Remark,
      Number: 1
    }
  )
}
// 访客申请列表
let _visitapplylist = (MemberID, pageIndex = 1, pageSize = 5) => {
  let param = {
    Visit_Apply_list: {
      MemberID, //条件 会员ID
      Type: '申访',
      join: {
        inner_join1: {
          join: "Office_Building.ID,Visit_Apply.BuildingID",
          field: "Name:BuildingName"
        },
        inner_join2: {
          join: "Office_Company.ID,Visit_Apply.CompanyID",
          field: "Name:CompanyName"
        }
      },
      order: "AddTime-",
      IsDelete: false,
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}// 访客收到列表
let _visitreceivedlist = (Tel, pageIndex = 1, pageSize = 5) => {
  let param = {
    Visit_Apply_list: {
      Tel, //参数  访客手机号码
      Type: '邀访',
      join: {
        inner_join1: {
          join: "Office_Building.ID,Visit_Apply.BuildingID",
          field: "Name:BuildingName"
        },
        inner_join2: {
          join: "Office_Company.ID,Visit_Apply.CompanyID",
          field: "Name:CompanyName"
        }
      },
      order: "AddTime-",
      IsDelete: false,
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
// 查询单条申访记录
let _visitinfo = (ID, MemberID) => {
  let param = param = {
    Visit_Apply: {
      ID,
      MemberID,
      Type: "申访",
      join: {
        inner_join1: {
          join: "Office_Building.ID,Visit_Apply.BuildingID",
          field: "Name:BuildingName"
        },
        inner_join2: {
          join: "Office_Company.ID,Visit_Apply.CompanyID",
          field: "Name:CompanyName"
        }
      }
    }
  }
  return query(param)
}
// 扫码开门
let _scan = QrCode => {
  return fetch(
    'WebApi.ashx?Act=ScanOpenDoor',
    { QrCode }
  )
}
/**===============
 * 租户邀访
 ================*/
// 租户邀访提交
let _invitesubmit = (MemberID, Name, Tel, VisitTime, Remark, Number) => {
  return fetch(
    'WebApi.ashx?Act=Invitation',
    { MemberID, Name, Tel, VisitTime, Remark, Number }
  )
}
// 租户邀访记录
let _invitelist = (MemberID, pageIndex = 1, pageSize = 5) => {
  let param = {
    Visit_Apply_list: {
      InviteMemberID: MemberID, //参数租户会员ID
      Type: "邀访",
      join: {
        inner_join1: {
          join: "Office_Building.ID,Visit_Apply.BuildingID",
          field: "Name:BuildingName"
        },
        inner_join2: {
          join: "Office_Company.ID,Visit_Apply.CompanyID",
          field: "Name:CompanyName"
        }
      },
      order: "AddTime-",
      IsDelete: false,
      page: pageIndex, //当前页码
      count: pageSize //每页数量
    },
    total_count: ''
  }
  return query(param)
}
// 租户收到申请列表
let _staffreceivedlist = (MemberID, pageIndex = 1, pageSize = 5) => {
  let param = {
    Visit_Apply_list: {
      InviteMemberID: MemberID, //参数  当前租户MemberID
      Type: "申访",
      join: {
        inner_join1: {
          join: "Office_Building.ID,Visit_Apply.BuildingID",
          field: "Name:BuildingName"
        },
        inner_join2: {
          join: "Office_Company.ID,Visit_Apply.CompanyID",
          field: "Name:CompanyName"
        }
      },
      order: "AddTime-",
      IsDelete: false,
      page: pageIndex,
      count: pageSize
    },
    total_count: ""
  }
  return query(param)
}
/**==============
 * 联系人
 ===============*/
// 常用联系人
let _contactorlist = (MemberID, pageIndex = 1, pageSize = 5) => {
  let param = {
    Visit_Contacts_list: {
      MemberID, //用户MemberID
      join: {
        left_join1: {
          join: "Office_Building.ID,Visit_Contacts.BuildingID",
          field: "Name:BuildingName"
        },
        left_join2: {
          join: "Office_Company.ID,Visit_Contacts.CompanyID",
          field: "Name:CompanyName"
        }
      },
      IsDelete: false,
      page: pageIndex, //页码
      count: pageSize //每页数量
    },
    total_count: ''
  }
  return query(param)
}
// 编辑常用联系人
let _modify = (MemberID, ContactsID, CompanyID = 0, InviteName, InviteTel) => {
  return fetch(
    'WebApi.ashx?Act=EditContacts',
    { MemberID, ContactsID, CompanyID, InviteName, InviteTel }
  )
}
// 删除常用联系人
let _delcontactor = (MemberID, ContactsID) => {
  return fetch(
    'WebApi.ashx?Act=DeleteContacts',
    { MemberID, ContactsID }
  )
}
export {
  _floorlist,
  _companylist,
  _visitorsubmit,
  _visitapplylist,
  _visitreceivedlist,
  _visitinfo,
  _scan,
  _invitesubmit,
  _invitelist,
  _staffreceivedlist,
  _contactorlist,
  _modify,
  _delcontactor
}