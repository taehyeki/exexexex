import selectedUserApi from "@/api/apiList/selectedUserApi";

export default {
  namespaced: true,
  // 게시판에서 선택된 곳의 정보를 입력하는 곳
  state: {
    selectedUser: {
      siteName: null,
      headOffice: null,
      permitRegCode: null,
      permitRegImgPath: null,
      trmtBizCode: null,
      addr: null,
      siteId: null,
      confirmed: null,
      confirmedAt: null,
      manager: null,
      managerList: [],
      active: null,
      phone: null,
      bCode: null,
      wsteList: [],
      siteList: [],
      lat: null,
      lng: null,
      updatedAt: null,
      bizRegCode: null,
      bizRegImgPath: null,
      compName: null,
      repName: null,
    },
    // 배출자 밑에 보여지는 리스트들 ( 입찰 한 사람들 ?)
    showListIfIEmitter : {
      orderCode : null,
      orderId : null,
      createdAt : null,
      visitEndAt : null,
      biddingEndAt : null,
      addr : null,
      siteName : null,
      // 0이면 개인 0이 아니면 사업자
      siteId : null,
      // 0이 확인 한거, 0이 아니면 미확인
      checkState : null,
    },
    showListIfIEmitterArray : [],
    typeIndex: 0,
    circleRange: 50,
    optSelect: ["거리"],
  },
  mutations: {
    setShowListIfIEmitter(state,payload){

      state.showListIfIEmitterArray = []
      payload.forEach(i=>{
        console.log(i,'iddd')
        let emptyObj = {};
        emptyObj.orderCode = i.ORDER_CODE
        emptyObj.orderId = i.ORDER_ID
        emptyObj.createdAt = i.CREATED_AT
        emptyObj.visitEndAt = i.VISIT_END_AT
        emptyObj.biddingEndAt = i.BIDDING_END_AT
        emptyObj.addr = i.ADDR
        emptyObj.siteName = i.SITE_NAME
        emptyObj.siteId = i.SITE_ID
        emptyObj.checkState = i.CHECK_STATE
        state.showListIfIEmitterArray.push(emptyObj)

      })


    },
    setSelectedUser(state, payload) {
      // 헤드오피스 인지 아닌지,
      state.selectedUser.headOffice = payload.SITE_INFO[0].HEAD_OFFICE;
      // 확정날짜
      state.selectedUser.confirmedAt = payload.SITE_INFO[0].CONFIRMED_AT.slice(
        0,
        19
      );
      // 확정 되지 않았다면 시간 대신 아래의 메시지를 담는다.
      if (payload.SITE_INFO[0].CONFIRMED != 1) {
        state.selectedUser.confirmedAt = "확인되지 않았습니다.";
      }
      // 확정 유무
      state.selectedUser.confirmed = payload.SITE_INFO[0].CONFIRMED;
      state.selectedUser.trmtBizCode = payload.SITE_INFO[0].TRMT_BIZ_CODE;
      // 활성화 유무
      state.selectedUser.active = payload.SITE_INFO[0].ACTIVE;
      // 허가증 이미지 경로
      state.selectedUser.permitRegImgPath = payload.PERMIT_REG_IMG_PATH;
      // 사이트 아이디
      state.selectedUser.siteId = payload.SITE_ID;
      // 허가증 등록번호
      state.selectedUser.permitRegCode = payload.PERMIT_REG_CODE;
      // 주소
      state.selectedUser.addr = payload.ADDR;
      // 사이트 이름
      state.selectedUser.siteName = payload.SITE_NAME;
      // 컴퍼니 이름
      state.selectedUser.compName = payload.COMPANY_INFO[0].COMP_NAME;
      // 대표자 이름
      state.selectedUser.repName = payload.COMPANY_INFO[0].REP_NAME;
      // 사업자 등록증 번호
      state.selectedUser.bizRegCode = payload.COMPANY_INFO[0].BIZ_REG_CODE;
      // 사업자 등록증 이미지 경로
      state.selectedUser.bizRegImgPath = payload.COMPANY_INFO[0].BIZ_REG_IMG_PATH;
      // B_CODE
      state.selectedUser.bCode = payload.B_CODE,
      // 최종 수정 날짜
      state.selectedUser.updatedAt = payload.UPDATED_AT.slice(0, 19);
      // 배출 리스트
      state.selectedUser.wsteList = payload.WSTE_INFO;
      // 위도 경도
      state.selectedUser.lat = payload.SITE_INFO[0].LAT;
      state.selectedUser.lng = payload.SITE_INFO[0].LNG;
      // 근처 사이트
      state.selectedUser.siteList = payload.SITE_LIST;
      // 값이 null 일때에도 배열상태를 유지하기 위해
      state.selectedUser.managerList = payload.MANAGER_LIST

      if (payload.MANAGER_LIST == null) {
        state.selectedUser.managerList = [];
      }

      // 이 문장을 if문 위에다 두면 null일 경우에 map함수를 돌리려고 할 것이고, 이로인해 오류가 발생할 것 같으므로 아래에다 두었다.
      state.selectedUser.managerList = state.selectedUser.managerList.map((item) => {
        return { PHONE: item.PHONE, USER_NAME: item.USER_NAME, ID: item.ID };
      });

      if (payload.WSTE_INFO == null) {
        state.selectedUser.wsteList = [];
      }
      if (payload.SITE_LIST == null) {
        state.selectedUser.siteList = [];
      }
    },
    // 정보 변경
    changeSelectedUserInfo(state, { key, value }) {
      // 담당자명, 핸드폰 수정할 경우 if문을 탄다.
      if (key.slice(0, 2) == "ph") {
        // 2자리 숫자 까지 읽어옴
        const idx = Number(key.slice(2, 4));
        state.selectedUser.managerList[idx].PHONE = value;
        return;
      } else if (key.slice(0, 2) == "ma") {
        // 2자리 숫자 까지 읽어옴
        const idx = Number(key.slice(2, 4));
        state.selectedUser.managerList[idx].USER_NAME = value;
        return;
      }
      state.selectedUser[key] = value;
    },
    setPermitImg(state, payload) {
      state.selectedUser.permitRegImgPath = payload;
    },
    setBizImg(state, payload) {
      state.selectedUser.bizRegImgPath = payload;
    },
    setAddr(state, payload) {
      state.selectedUser.addr = payload.addr;
      state.selectedUser.bCode = payload.bCode;
      state.selectedUser.lat = payload.lat;
      state.selectedUser.lng = payload.lng;
    },
    addWsteList(state, payload) {
      state.selectedUser.wsteList.push(payload);
    },
    removeWsteList(state, payload) {
      state.selectedUser.wsteList = state.selectedUser.wsteList.filter(
        (v) => v != payload
      );
    },
    setCircleRange(state, payload) {
      state.circleRange = Number(payload);
    },
    setTypeIndex(state, payload) {
      state.typeIndex = Number(payload);
    },
  },
  actions: {
    async getSelectedUserInfo({ state, commit, rootState }, { siteId }) {
      try {
        const res = await selectedUserApi.getSelectedUserInfo({state,rootState,siteId})
        const siteInfo = JSON.parse(res.data.data[0].SITE_INFO)[0];
        console.log(siteInfo)
        commit("setSelectedUser", siteInfo);
        commit('setShowListIfIEmitter', siteInfo.DISPOSER_ORDER_LIST)
      } catch (e) {
        console.log(e);
      }
    },

    async uploadPermitImgToS3({ commit }, payload) {
      try {
        const res = await selectedUserApi.uploadPermitImgToS3({payload});
        commit("setPermitImg", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async uploadBizImgToS3({ commit }, payload) {
      try {
        const res = await selectedUserApi.uploadBizImgToS3({payload});
        commit("setBizImg", res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async sendModifiedPermit({ state, rootState }) {
      try {
        await selectedUserApi.sendModifiedPermit({state,rootState});
        window.location.reload();
      } catch (e) {
        console.log(e);
      }

    },
  },
  getters: {
    getSeletedUser(state) {
      return state.selectedUser;
    },
    // 맨 위에 나타낼 정보
    getLine1(state) {
      return {
        compName: state.selectedUser.compName,
        siteName: state.selectedUser.siteName,
        repName: state.selectedUser.repName,
        addr: state.selectedUser.addr,
        headOffice: state.selectedUser.headOffice,
        active: state.selectedUser.active,
        managerList: state.selectedUser.managerList,
        // readonly
        confirmedAt: state.selectedUser.confirmedAt,
        confirmed: state.selectedUser.confirmed,
      };
    },
    // 두 번째 나타낼 정보
    getLine2(state) {
      return {
        bizRegCode: state.selectedUser.bizRegCode,
        permitRegCode: state.selectedUser.permitRegCode,
        bizRegImgPath: state.selectedUser.bizRegImgPath,
        permitRegImgPath: state.selectedUser.permitRegImgPath,
      };
    },
    getOptList(state) {
      return {
        typeIndex: state.typeIndex,
        circleRange: state.circleRange,
        optSelect: state.optSelect,
      };
    },
    getShowListIfIEmitter(state){
      return state.showListIfIEmitterArray
    }
  },
};
