"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/shangchuan/shangchuan.js";
  "./pages/admin/admin.js";
  "./pages/student/student.js";
  "./pages/teacher/teacher.js";
  "./pages/register/register.js";
  "./pages/device/device.js";
  "./pages/devicemanage/devicemanage.js";
  "./pages/query/query.js";
  "./pages/profile/profile.js";
  "./pages/deviceinfo/deviceinfo.js";
  "./pages/xinxi/xinxi.js";
  "./pages/device_detail/device_detail.js";
  "./pages/deviceDetail/deviceDetail.js";
  "./pages/examine/examine.js";
}
const _sfc_main = {
  data() {
    return {
      words: ["勤奋", "严谨", "求实", "创新"]
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.words, (w, i, i0) => {
      return {
        a: common_vendor.t(w),
        b: i
      };
    })
  };
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
