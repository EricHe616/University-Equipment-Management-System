"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      id: "",
      statusOptions: ["运行中", "维修中", "待清洁", "封存"],
      statusMap: {
        "运行中": { code: "running", color: "green" },
        "维修中": { code: "repairing", color: "red" },
        "待清洁": { code: "cleaning", color: "yellow" },
        "封存": { code: "banning", color: "gray" }
      },
      status: {
        code: "",
        label: "",
        color: "",
        detail: {}
      }
    };
  },
  methods: {
    onStatusChange(e) {
      const label = this.statusOptions[e.detail.value];
      const { code, color } = this.statusMap[label];
      this.status = {
        code,
        label,
        color,
        detail: {}
      };
    },
    async submitStatus() {
      if (!this.id) {
        common_vendor.index.showToast({ title: "请填写设备ID", icon: "none" });
        return;
      }
      const res = await common_vendor.nr.callFunction({
        name: "updateDeviceStatus",
        data: {
          id: this.id,
          status: this.status
        }
      });
      if (res.result.success) {
        common_vendor.index.showToast({ title: "状态已提交", icon: "success" });
      } else {
        common_vendor.index.showToast({ title: res.result.message || "提交失败", icon: "none" });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.id,
    b: common_vendor.o(($event) => $data.id = $event.detail.value),
    c: common_vendor.t($data.status.label || "请选择状态"),
    d: $data.statusOptions,
    e: common_vendor.o((...args) => $options.onStatusChange && $options.onStatusChange(...args)),
    f: $data.status.code === "running"
  }, $data.status.code === "running" ? {
    g: $data.status.detail.user,
    h: common_vendor.o(($event) => $data.status.detail.user = $event.detail.value),
    i: $data.status.detail.purpose,
    j: common_vendor.o(($event) => $data.status.detail.purpose = $event.detail.value)
  } : {}, {
    k: $data.status.code === "repairing"
  }, $data.status.code === "repairing" ? {
    l: $data.status.detail.repairMan,
    m: common_vendor.o(($event) => $data.status.detail.repairMan = $event.detail.value),
    n: $data.status.detail.description,
    o: common_vendor.o(($event) => $data.status.detail.description = $event.detail.value),
    p: $data.status.detail.endTime,
    q: common_vendor.o(($event) => $data.status.detail.endTime = $event.detail.value)
  } : {}, {
    r: $data.status.code === "cleaning"
  }, $data.status.code === "cleaning" ? {
    s: $data.status.detail.cleanMan,
    t: common_vendor.o(($event) => $data.status.detail.cleanMan = $event.detail.value),
    v: $data.status.detail.cleanTime,
    w: common_vendor.o(($event) => $data.status.detail.cleanTime = $event.detail.value)
  } : {}, {
    x: $data.status.code === "banning"
  }, $data.status.code === "banning" ? {
    y: $data.status.detail.banReason,
    z: common_vendor.o(($event) => $data.status.detail.banReason = $event.detail.value)
  } : {}, {
    A: common_vendor.o((...args) => $options.submitStatus && $options.submitStatus(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1029d581"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/devicemanage/devicemanage.js.map
