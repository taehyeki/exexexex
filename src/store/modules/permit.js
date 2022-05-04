import myAxios from "@/api"
// import axios from "axios"

// const fitPermitBizNum(num){
//   const len = num.length
//   if (len > 13){
//     return
//   }
// }
export default {
  namespaced : true,
  state: {
    permitObj : {
      offsetSize : 0,
      pageSize : 10,
      permitList : [],
    },
    now : null,
    changed : false,
    search : {keyword : ''},
    selectedPermit : {
      addr : '',
      siteName : '',
      permitRegCode : '',
      permitRegImgPath : '',
      bizRegCode : '',
      bizRegImgPath  : '',
      repName : '',
      compName : "",
      siteId : '',
      bCode : '',
      updatedAt : '',
      wsteList : [],
      lat : '',
      lng : '',
    },
    wsteList1 : [],
    wsteList2 : []
  },
  getters: {
    getSelectedPermit(state){

      return state.selectedPermit
    },
    getPermitList(state){
      console.log('state에 저장된 값을 가져옴')
      console.log(state.permitObj.permitList)
      return state.permitObj.permitList
    },
    getWsteLists(state){
      return { wsteList1 : state.wsteList1, wsteList2 : state.wsteList2 }
    },
    getNow(state){
      return state.now
    }
  },
  mutations: {
    setSelectedPermit(state,payload){

      state.selectedPermit.permitRegImgPath = payload.PERMIT_REG_IMG_PATH
      state.selectedPermit.permitRegCode = payload.PERMIT_REG_CODE
      state.selectedPermit.addr = payload.ADDR
      state.selectedPermit.siteName = payload.SITE_NAME
      state.selectedPermit.compName = payload.COMPANY_INFO[0].COMP_NAME
      state.selectedPermit.repName = payload.COMPANY_INFO[0].REP_NAME
      state.selectedPermit.bizRegCode = payload.COMPANY_INFO[0].BIZ_REG_CODE
      state.selectedPermit.bizRegImgPath = payload.COMPANY_INFO[0].BIZ_REG_IMG_PATH
      state.selectedPermit.siteId = payload.SITE_ID,
      state.selectedPermit.bCode = payload.B_CODE,
      state.selectedPermit.updatedAt = payload.UPDATED_AT.slice(0,19)
      state.selectedPermit.wsteList = payload.WSTE_INFO
      state.selectedPermit.siteInfo = payload.SITE_INFO
      state.selectedPermit.lat = payload.SITE_INFO[0].LAT
      state.selectedPermit.lng = payload.SITE_INFO[0].LNG
      state.selectedPermit.siteList = payload.SITE_LIST
      if(payload.WSTE_INFO == null ){
        state.selectedPermit.wsteList = []
      }
      if(payload.SITE_LIST == null ){
        state.selectedPermit.siteList = []
      }
    },
    setChangeNow(state,payload){
      state.now = payload
    },
    permitAddOffsetSize(state){
      state.permitObj.offsetSize += state.permitObj.pageSize
    },
    setPermitList(state,payload){
      if (state.search.keyword !== ''){
        console.log('받아온 데이터를 vuex 스토어에 저장')
        state.permitObj.permitList = payload
        return
      }
      if (state.changed){
        state.permitObj.permitList = payload
        this.commit('permit/changeState')
        return
      } else if (payload == null){
        alert('자료가 없습니다.')
        return
      }
      state.permitObj.permitList.push(...payload)
    },
    changeState(state){
      state.permitObj.offsetSize = 0
      state.changed = !state.changed
    },
    sefOffsetZeroAndPermitListEmpty(state){
      state.permitObj.offsetSize = 0
      state.permitObj.permitList = []
    },
    setPermitImg(state,payload){
      state.selectedPermit.permitRegImgPath = payload
    },
    setBizImg(state,payload){
      state.selectedPermit.bizRegImgPath = payload
    },
    setWsteLists(state,payload){
      state.wsteList1 = payload.wste1
      state.wsteList2 = payload.wste2
    },
    changeSelectedInfo(state,{key,event}){
      state.selectedPermit[key] = event

    },
    addWsteList(state,payload){
      state.selectedPermit.wsteList.push(payload)
    },
    removeWsteList(state,payload){
      state.selectedPermit.wsteList  = state.selectedPermit.wsteList.filter(v => v != payload)
    },
    setAddr(state,payload){
      console.log(payload)
      state.selectedPermit.addr = payload.addr
      state.selectedPermit.bCode = payload.bCode
      state.selectedPermit.lat = payload.lat
      state.selectedPermit.lng = payload.lng
    },


  },
  actions: {
    // 허가증 받아오는 함수
    async getPermits({state,commit},payload){
      console.log('데이터를 요청하고 mutation을 호출하는 구간')
      if (state.now !== payload){
        commit('changeState')

      }
      commit('setChangeNow',payload)

      const method = 'post'
      const url = 'api/admin/1_03_main/get_permits'
      let data =
      {
        params :
          JSON.stringify(
          [
            {
              USER_ID : 238,
              SEARCH : null,
              OFFSET_SIZE : state.permitObj.offsetSize,
              PAGE_SIZE : state.permitObj.pageSize,
              CONFIRMED: state.now,
            }
          ]
        )
      }
      if (state.search.keyword !== ''){
        data =
        {
          params :
            JSON.stringify(
            [
              {
                USER_ID : 238,
                SEARCH : state.search.keyword,
                OFFSET_SIZE : 0,
                PAGE_SIZE : 100,
                CONFIRMED: state.now,
              }
            ]
          )
        }
      }
      const res = await myAxios(url,method,data)
      console.log(JSON.parse(res.data.data[0].SITE_LISTS),'받아온 데이터들')
      commit('setPermitList',JSON.parse(res.data.data[0].SITE_LISTS))
    },
    async sendModifiedPermit({state,commit}){
      const method = 'post'
      const url = 'api/admin/1_03_main/update_site_info'
      const data =
      {
        params :
          JSON.stringify(
          [
            {
              USER_ID : 238,
              SITE_ID : state.selectedPermit.siteId,
              BIZ_REG_CODE : state.selectedPermit.bizRegCode,
              BIZ_REG_IMG_PATH: state.selectedPermit.bizRegImgPath,
              PERMIT_REG_CODE: state.selectedPermit.permitRegCode,
              PERMIT_REG_IMG_PATH: state.selectedPermit.permitRegImgPath,
              REP_NAME: state.selectedPermit.repName,
              B_CODE: state.selectedPermit.bCode,
              ADDR: state.selectedPermit.addr,
              WSTE_LIST: state.selectedPermit.wsteList,
              LAT : state.selectedPermit.lat,
              LNG : state.selectedPermit.lng,
            }
          ]
        )
      }
      const res = await myAxios(url,method,data)
      console.log(res)
      const modifiedRawData = res.data.data[0]
      const payload = {
        PERMIT_REG_CODE : modifiedRawData.PERMIT_REG_CODE,
        PERMIT_REG_IMG_PATH : modifiedRawData.PERMIT_REG_IMG_PATH,
        ADDR : modifiedRawData.ADDR,
        SITE_NAME : modifiedRawData.SITE_NAME,
        COMPANY_INFO : [
          {
            COMP_NAME : modifiedRawData.COMPANY_INFO[0].COMP_NAME,
            REP_NAME : modifiedRawData.COMPANY_INFO[0].REP_NAME,
            BIZ_REG_CODE : modifiedRawData.COMPANY_INFO[0].BIZ_REG_CODE,
            BIZ_REG_IMG_PATH : modifiedRawData.COMPANY_INFO[0].BIZ_REG_IMG_PATH,

          }
        ],
        SITE_ID : modifiedRawData.SITE_ID,
        B_CODE : modifiedRawData.B_CODE,
        UPDATED_AT : modifiedRawData.UPDATED_AT,
        WSTE_INFO : modifiedRawData.WSTE_INFO,
        SITE_INFO : modifiedRawData.SITE_INFO,
        SITE_LIST : modifiedRawData.SITE_LIST
      }
      commit('setSelectedPermit',payload)
      window.location.reload()
    },
    async uploadPermitImgToS3({commit},payload){
      const method = 'post'
      const url = 'api/admin/common/upload_img_to_s3'
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      const res = await myAxios(url,method,payload,config)
      commit('setPermitImg',res.data)
    },
    async uploadBizImgToS3({commit},payload){
      const method = 'post'
      const url = 'api/admin/common/upload_img_to_s3'
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      const res = await myAxios(url,method,payload,config)
      console.log(res)
      commit('setBizImg',res.data)
      return res.data
    },
    async getWsteLists({commit}){
      const method = 'post'
      const url = 'api/admin/common/get_wste_lists'
      const wste1 = await myAxios(url,method)
      const method2 = 'post'
      const url2 = 'api/admin/common/get_wste_appearance'
      const wste2 = await myAxios(url2,method2)
      commit('setWsteLists',{
        wste1 : wste1.data.data,
        wste2 : wste2.data.data
      })
    },

  },
}
