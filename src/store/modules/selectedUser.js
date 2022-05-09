import myAxios from "@/api"

const method = 'post'

export default {
  namespaced : true,
  state : {
    selectedUser : {
        siteName : null,
        headOffice : null,
        permitRegCode : null,
        permitRegImgPath : null,
        trmtBizCode : null ,
        addr : null,
        siteId : null,
        confirmed : null,
        confirmedAt : null,
        manager : null,
        active : null,
        phone : null,
        bCode : null,
        wsteList : [],
        siteList : [],
        lat : null,
        lng : null,
        updatedAt : null,
        bizRegCode : null,
        bizRegImgPath  : null,
        compName : null,
        repName : null,
    },
    typeIndex : 0,
    circleRange : 50,
    optSelect : ['거리']



  },
  mutations : {
    setSelectedUser(state,payload){
      state.selectedUser.headOffice = payload.SITE_INFO[0].HEAD_OFFICE
      state.selectedUser.confirmedAt = payload.SITE_INFO[0].CONFIRMED_AT.slice(0,19)
      if (payload.SITE_INFO[0].CONFIRMED != 1){
        state.selectedUser.confirmedAt = '확인되지 않았습니다.'
      }
      state.selectedUser.confirmed = payload.SITE_INFO[0].CONFIRMED
      state.selectedUser.trmtBizCode = payload.SITE_INFO[0].TRMT_BIZ_CODE
      state.selectedUser.active = payload.SITE_INFO[0].ACTIVE
      state.selectedUser.permitRegImgPath = payload.PERMIT_REG_IMG_PATH
      state.selectedUser.siteId = payload.SITE_ID
      state.selectedUser.permitRegCode = payload.PERMIT_REG_CODE
      state.selectedUser.addr = payload.ADDR
      state.selectedUser.siteName = payload.SITE_NAME
      state.selectedUser.compName = payload.COMPANY_INFO[0].COMP_NAME
      state.selectedUser.repName = payload.COMPANY_INFO[0].REP_NAME
      state.selectedUser.bizRegCode = payload.COMPANY_INFO[0].BIZ_REG_CODE
      state.selectedUser.bizRegImgPath = payload.COMPANY_INFO[0].BIZ_REG_IMG_PATH
      state.selectedUser.bCode = payload.B_CODE,
      state.selectedUser.updatedAt = payload.UPDATED_AT.slice(0,19)
      state.selectedUser.wsteList = payload.WSTE_INFO
      state.selectedUser.lat = payload.SITE_INFO[0].LAT
      state.selectedUser.lng = payload.SITE_INFO[0].LNG
      state.selectedUser.siteList = payload.SITE_LIST

      if(payload.WSTE_INFO == null ){
        state.selectedUser.wsteList = []
      }
      if(payload.SITE_LIST == null ){
        state.selectedUser.siteList = []
      }
    },
    changeSelectedUserInfo(state,{key,value}){
      state.selectedUser[key] = value
    },
    setPermitImg(state,payload){
      state.selectedUser.permitRegImgPath = payload
    },
    setBizImg(state,payload){
      state.selectedUser.bizRegImgPath = payload
    },
    setAddr(state,payload){
      state.selectedUser.addr = payload.addr
      state.selectedUser.bCode = payload.bCode
      state.selectedUser.lat = payload.lat
      state.selectedUser.lng = payload.lng
    },
    addWsteList(state,payload){
      state.selectedUser.wsteList.push(payload)
    },
    removeWsteList(state,payload){
      state.selectedUser.wsteList  = state.selectedUser.wsteList.filter(v => v != payload)
    },
    setCircleRange(state,payload){
      state.circleRange = Number(payload)
    },
    setTypeIndex(state,payload){
      state.typeIndex = Number(payload)
    }
  },
  actions : {
    async getSelectedUserInfo({state,commit},{siteId}){
      try {
        const url = 'api/admin/1_03_main/get_site_info'
        const data = {
                      params : JSON.stringify([{
                            USER_ID : 238,
                            SITE_ID : Number(siteId),
                            TYPE_INDEX : state.typeIndex,
                            CIRCLE_RANGE : state.circleRange
                            }])
                      }

        const res = await myAxios(url,method,data)
        const siteInfo = JSON.parse(res.data.data[0].SITE_INFO)[0]
        console.log(siteInfo)
        await commit('setSelectedUser',siteInfo)
      } catch (e) {
        console.log('토큰 갱신 한번더 실행해주세요.')

      }
    },

    async uploadPermitImgToS3({commit},payload){
      const method = 'post'
      const url = 'api/admin/common/upload_img_to_s3'
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      try{
        const res = await myAxios(url,method,payload,config)
        commit('setPermitImg',res.data)
      } catch(e){
        console.log(e)
      }

    },
    async uploadBizImgToS3({commit},payload){
      const method = 'post'
      const url = 'api/admin/common/upload_img_to_s3'
      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      try{
        const res = await myAxios(url,method,payload,config)
        commit('setBizImg',res.data)
      }catch(e){
        console.log(e)
      }


    },
    async sendModifiedPermit({state}){
      const method = 'post'
      const url = 'api/admin/1_03_main/update_site_info'
      const data =
      {
        params :
          JSON.stringify(
          [
            {
              USER_ID : 238,
              SITE_ID : state.selectedUser.siteId,
              BIZ_REG_CODE : state.selectedUser.bizRegCode,
              BIZ_REG_IMG_PATH: state.selectedUser.bizRegImgPath,
              PERMIT_REG_CODE: state.selectedUser.permitRegCode,
              PERMIT_REG_IMG_PATH: state.selectedUser.permitRegImgPath,
              REP_NAME: state.selectedUser.repName,
              B_CODE: state.selectedUser.bCode,
              ADDR: state.selectedUser.addr,
              WSTE_LIST: state.selectedUser.wsteList,
              LAT : state.selectedUser.lat,
              LNG : state.selectedUser.lng,
              COMP_NAME : state.selectedUser.compName,
              SITE_NAME : state.selectedUser.siteName,
              CONFIRMED : state.selectedUser.confirmed,
              HEAD_OFFICE : state.selectedUser.headOffice,
              MANAGER_ID : 0
            }
          ]
        )
      }
      await myAxios(url,method,data)

      // const modifiedRawData = res.data.data[0]
      // const payload = {
      //   PERMIT_REG_CODE : modifiedRawData.PERMIT_REG_CODE,
      //   PERMIT_REG_IMG_PATH : modifiedRawData.PERMIT_REG_IMG_PATH,
      //   ADDR : modifiedRawData.ADDR,
      //   SITE_NAME : modifiedRawData.SITE_NAME,
      //   COMPANY_INFO :  modifiedRawData.COMPANY_INFO,
      //   SITE_ID : modifiedRawData.SITE_ID,
      //   B_CODE : modifiedRawData.B_CODE,
      //   UPDATED_AT : modifiedRawData.UPDATED_AT,
      //   WSTE_INFO : modifiedRawData.WSTE_INFO,
      //   SITE_INFO : modifiedRawData.SITE_INFO,
      //   SITE_LIST : modifiedRawData.SITE_LIST
      // }

      // commit('setSelectedUser',modifiedRawData)
      window.location.reload()
    }
  },
  getters : {
    getSeletedUser(state){
      return state.selectedUser
    },
    getLine1(state){
      return {
        'compName' : state.selectedUser.compName,
        'siteName' : state.selectedUser.siteName,
        'repName' :state.selectedUser.repName,
        'addr' : state.selectedUser.addr,
        'headOffice' : state.selectedUser.headOffice,
        'active' : state.selectedUser.active,
        // readonly
        'confirmedAt' : state.selectedUser.confirmedAt,
        'confirmed' : state.selectedUser.confirmed,
      }
    },
    getLine2(state){
      return {
        'bizRegCode' : state.selectedUser.bizRegCode,
        'permitRegCode' : state.selectedUser.permitRegCode,
        'bizRegImgPath' :state.selectedUser.bizRegImgPath,
        'permitRegImgPath' : state.selectedUser.permitRegImgPath,
      }
    },
    getOptList(state){
      return {
        typeIndex : state.typeIndex,
        circleRange : state.circleRange,
        optSelect : state.optSelect
      }

    }

  }
}

