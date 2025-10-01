"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    device: Object
  },
  methods: {
    isImage(url) {
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b;
  return common_vendor.e({
    a: $options.isImage($props.device.fileUrl)
  }, $options.isImage($props.device.fileUrl) ? {
    b: $props.device.fileUrl
  } : {}, {
    c: common_vendor.t($props.device.name),
    d: common_vendor.t($props.device.model),
    e: common_vendor.t($props.device.type),
    f: common_vendor.t($props.device.location),
    g: common_vendor.t($props.device.purchaseDate),
    h: common_vendor.t($props.device.status.label),
    i: (_a = $props.device.status.detail) == null ? void 0 : _a.banReason
  }, ((_b = $props.device.status.detail) == null ? void 0 : _b.banReason) ? {
    j: common_vendor.t($props.device.status.detail.banReason)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-db53f496"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/device_detail/device_detail.js.map
