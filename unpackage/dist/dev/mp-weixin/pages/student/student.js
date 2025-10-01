"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: ""
    };
  },
  onLoad() {
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    if (userInfo && userInfo.username) {
      this.username = userInfo.username;
    } else {
      common_vendor.index.showToast({ title: "未登录", icon: "none" });
    }
  },
  methods: {
    // 跳转个人信息填写页面
    goToProfile() {
      common_vendor.index.navigateTo({ url: "/pages/xinxi/xinxi" });
    },
    // 查询页面（直接进）
    goToQuery() {
      common_vendor.index.navigateTo({ url: "/pages/deviceinfo/deviceinfo" });
    },
    // 递交申请（需要校验信息）
    async goToApplication() {
      if (!this.username) {
        common_vendor.index.__f__("log", "at pages/student/student.vue:40", "username 为空");
        return;
      }
      const res = await common_vendor.nr.database().collection("mydatabase").where({ username: this.username }).get();
      common_vendor.index.__f__("log", "at pages/student/student.vue:48", "查询结果", res.result.data);
      if (res.result.data.length === 0) {
        common_vendor.index.showToast({ title: "请先完善信息", icon: "none" });
        return;
      }
      const user = res.result.data[0];
      common_vendor.index.__f__("log", "at pages/student/student.vue:56", "用户数据", user);
      if (!user.className || !user.studentId || !user.myname) {
        common_vendor.index.showToast({ title: "请先完善个人信息", icon: "none" });
        return;
      }
      common_vendor.index.navigateTo({ url: "/pages/query/query" });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goToProfile && $options.goToProfile(...args)),
    b: common_vendor.o((...args) => $options.goToQuery && $options.goToQuery(...args)),
    c: common_vendor.o((...args) => $options.goToApplication && $options.goToApplication(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-809c9d48"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/student/student.js.map
