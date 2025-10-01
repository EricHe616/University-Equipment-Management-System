"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      users: []
    };
  },
  onLoad() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const res = await common_vendor.nr.callFunction({
        name: "getUsers"
        // 云函数，返回所有用户信息
      });
      this.users = res.result.data;
    },
    async toggleStatus(user, index) {
      const newStatus = user.status === "active" ? "frozen" : "active";
      await common_vendor.nr.callFunction({
        name: "updateUserStatus",
        data: { userId: user._id, status: newStatus }
      });
      this.users[index].status = newStatus;
      common_vendor.index.showToast({ title: "操作成功", icon: "success" });
    },
    async resetPassword(userId) {
      await common_vendor.nr.callFunction({
        name: "resetUserPassword",
        data: { userId, newPassword: "123456" }
      });
      common_vendor.index.showToast({ title: "密码已重置为 123456", icon: "success" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.users, (user, index, i0) => {
      return {
        a: common_vendor.t(user.username),
        b: common_vendor.t(user.role),
        c: common_vendor.t(user.status === "active" ? "正常" : "已冻结"),
        d: common_vendor.t(user.status === "active" ? "冻结账户" : "解冻账户"),
        e: common_vendor.o(($event) => $options.toggleStatus(user, index), user._id),
        f: common_vendor.o(($event) => $options.resetPassword(user._id), user._id),
        g: user._id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dd383ca2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
