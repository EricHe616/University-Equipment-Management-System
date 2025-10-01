"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      password: "",
      roles: ["student", "teacher", "admin"],
      // 实际传给后端的值
      roleLabels: ["学生", "教师", "管理员"],
      // 显示给用户看的中文
      selectedRoleIndex: 0
    };
  },
  computed: {
    selectedRole() {
      return this.roles[this.selectedRoleIndex];
    }
  },
  methods: {
    // 添加缺失的角色变更处理方法
    onRoleChange(e) {
      this.selectedRoleIndex = e.detail.value;
    },
    register() {
      if (!this.username || !this.password) {
        common_vendor.index.showToast({ title: "请填写账号和密码", icon: "none" });
        return;
      }
      common_vendor.nr.callFunction({
        name: "register",
        data: {
          username: this.username,
          password: this.password,
          role: this.selectedRole
        },
        success: (res) => {
          if (res.result.success) {
            common_vendor.index.showToast({ title: res.result.message, icon: "success" });
            setTimeout(() => {
              common_vendor.index.navigateTo({ url: "/pages/index/index" });
            }, 1e3);
          } else {
            common_vendor.index.showToast({ title: res.result.message, icon: "none" });
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/register/register.vue:68", "注册失败", err);
          common_vendor.index.showToast({ title: "网络错误", icon: "none" });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.username,
    b: common_vendor.o(($event) => $data.username = $event.detail.value),
    c: $data.password,
    d: common_vendor.o(($event) => $data.password = $event.detail.value),
    e: common_vendor.t($data.roleLabels[$data.selectedRoleIndex]),
    f: common_vendor.o((...args) => $options.onRoleChange && $options.onRoleChange(...args)),
    g: $data.roleLabels,
    h: $data.selectedRoleIndex,
    i: common_vendor.o((...args) => $options.register && $options.register(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/register.js.map
