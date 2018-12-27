import { fetch, query } from 'api'
/**==============================
 *            问卷调查
 ==============================*/
//  获取问卷调查列表
let _list = (pageIndex = 1, pageSize = 5) => {
  let param = {
    Research_Research_list: {
      field: "ID,Title,Img,Description,Sort",
      Online: true,
      IsDelete: false,
      order: "Sort",
      page: pageIndex,
      count: pageSize
    },
    total_count: ''
  }
  return query(param)
}
// 是否已答题
let _answered = (MemberID, id) => {
  let param = {
    Research_Answer_count: {
      MemberID, //条件 用户ID
      join: {
        inner_join: {
          join: "Research_Question.ID,Research_Answer.QuestionID",
          ResearchID: id  //条件 问卷ID
        }
      }
    }
  }
  return query(param)
}
// 获取问题
let _questions = id => {
  let param = {
    Research_Research: {
      ID: id,
    },
    Research_Question_list: {
      ResearchID: id,
      IsDelete: false,
      order: "Sort"
    }
  }
  return query(param)
}
// 获取答案
let _answers = (MemberID, id) => {
  let param = {
    Research_Research: {
      ID: id, //参数 问卷ID
    },
    Research_Question_list: {
      ResearchID: id, //参数 问卷ID
      join: {
        left_join: {
          MemberID, //参数 会员ID
          join: "Research_Answer.QuestionID,Research_Question.ID",
          field: "Result"
        }
      },
      IsDelete: false,
      order: "Sort"
    }
  }
  return query(param)
}
// 提交
let _submit = (MemberID, ID, Result) => {
  return fetch(
    'WebApi.ashx?Act=SubmitResearch',
    { MemberID, ID, Result }
  )
}
export {
  _list,
  _questions,
  _answered,
  _answers,
  _submit
}