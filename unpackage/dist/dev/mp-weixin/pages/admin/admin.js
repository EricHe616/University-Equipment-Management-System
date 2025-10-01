"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  methods: {
    goToDevice() {
      common_vendor.index.navigateTo({
        url: "/pages/device/device"
      });
    },
    goToStatus() {
      common_vendor.index.navigateTo({
        url: "/pages/devicemanage/devicemanage"
      });
    },
    goToQuery() {
      common_vendor.index.navigateTo({
        url: "/pages/examine/examine"
      });
    },
    goToProfile() {
      common_vendor.index.navigateTo({
        url: "/pages/profile/profile"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.goToDevice && $options.goToDevice(...args)),
    b: common_vendor.o((...args) => $options.goToStatus && $options.goToStatus(...args)),
    c: common_vendor.o((...args) => $options.goToQuery && $options.goToQuery(...args)),
    d: common_vendor.o((...args) => $options.goToProfile && $options.goToProfile(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/admin/admin.js.map
