"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      device: null
    };
  },
  onLoad(options) {
    const id = options.id;
    this.loadDevice(id);
  },
  methods: {
    async loadDevice(id) {
      const res = await common_vendor.nr.database().collection("device").where({ id }).get();
      if (res.result.data.length > 0) {
        this.device = res.result.data[0];
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return common_vendor.e({
    a: $data.device
  }, $data.device ? {
    b: $data.device.fileID,
    c: common_vendor.t($data.device.name),
    d: common_vendor.t($data.device.model),
    e: common_vendor.t($data.device.location),
    f: common_vendor.t($data.device.type),
    g: common_vendor.t(((_a = $data.device.status) == null ? void 0 : _a.label) || "未知")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-540174d3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/deviceDetail/deviceDetail.js.map
