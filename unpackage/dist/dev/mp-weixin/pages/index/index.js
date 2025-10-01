"use strict";
const common_vendor = require("../../common/vendor.js");
const Footer = () => "../../components/Footer.js";
const _sfc_main = {
  components: {
    Footer
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        common_vendor.index.showToast({ title: "请填写账号和密码", icon: "none" });
        return;
      }
      common_vendor.nr.callFunction({
        name: "login",
        data: {
          username: this.username,
          password: this.password
        },
        success: (res) => {
          const result = res.result;
          if (result.success) {
            common_vendor.index.setStorageSync("userInfo", result.userInfo);
            common_vendor.index.showToast({ title: result.message, icon: "success" });
            if (result.userInfo.role === "admin") {
              common_vendor.index.navigateTo({ url: "/pages/admin/admin" });
            }
            if (result.userInfo.role === "teacher") {
              common_vendor.index.navigateTo({ url: "/pages/teacher/teacher" });
            }
            if (result.userInfo.role === "student") {
              common_vendor.index.navigateTo({ url: "/pages/student/student" });
            }
          } else {
            common_vendor.index.showToast({ title: result.message, icon: "none" });
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/index/index.vue:79", "云函数调用失败", err);
          common_vendor.index.showToast({ title: "网络异常", icon: "none" });
        }
      });
    },
    goToRegister() {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    }
  }
};
if (!Array) {
  const _component_Footer = common_vendor.resolveComponent("Footer");
  _component_Footer();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.username,
    b: common_vendor.o(($event) => $data.username = $event.detail.value),
    c: $data.password,
    d: common_vendor.o(($event) => $data.password = $event.detail.value),
    e: common_vendor.o((...args) => $options.login && $options.login(...args)),
    f: common_vendor.o((...args) => $options.goToRegister && $options.goToRegister(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
