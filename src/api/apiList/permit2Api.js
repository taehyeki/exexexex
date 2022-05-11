import myAxios from "@/api";

export default {
  getPermitsList({ state, rootState }) {
    const userId = rootState.auth.userId;
    const method = "post";
    const url = "api/admin/1_03_main/get_permits";
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
          SEARCH: state.search,
          OFFSET_SIZE: state.permitObj.pageOffset,
          PAGE_SIZE: state.permitObj.pageSize,
          CONFIRMED: state.permitObj.confirmed,
          EMIT_OR_COL: state.permitObj.emitOrCol,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
};
