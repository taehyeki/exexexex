import myAxios from "@/api";

const method = "post";

export default {
  login({ adminId, adminPw }) {
    const url = "api/admin/common/admin_login";
    let data = {
      params: JSON.stringify([
        {
          ID: adminId,
          PW: adminPw,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
};
