"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      device: {
        id: "",
        name: "",
        model: "",
        purchaseDate: "",
        location: "",
        type: "",
        filePath: "",
        fileName: ""
      },
      locationOptions: ["实验室A", "实验室B", "办公室", "仓库"],
      typeOptions: ["教学", "科研", "办公"],
      locationIndex: -1,
      // 添加位置索引
      typeIndex: -1
      // 添加类型索引
    };
  },
  methods: {
    // 添加日期选择处理
    onDateChange(e) {
      this.device.purchaseDate = e.detail.value;
    },
    // 添加位置选择处理
    onLocationChange(e) {
      const index = e.detail.value;
      this.locationIndex = index;
      this.device.location = this.locationOptions[index];
    },
    // 添加类型选择处理
    onTypeChange(e) {
      const index = e.detail.value;
      this.typeIndex = index;
      this.device.type = this.typeOptions[index];
    },
    goToUp() {
      common_vendor.index.navigateTo({
        url: "/pages/shangchuan/shangchuan"
      });
    },
    // 提交表单
    async submit() {
      if (!this.device.id || !this.device.name || !this.device.model || !this.device.purchaseDate || !this.device.location || !this.device.type) {
        common_vendor.index.showToast({ title: "请填写所有必填字段", icon: "none" });
        return;
      }
      try {
        const res = await common_vendor.nr.callFunction({
          name: "addDevice",
          data: this.device
        });
        if (res.result && res.result.success) {
          common_vendor.index.showToast({ title: "设备添加成功", icon: "success" });
          this.device = {
            id: "",
            name: "",
            model: "",
            purchaseDate: "",
            location: "",
            type: "",
            filePath: "",
            fileName: ""
          };
          this.locationIndex = -1;
          this.typeIndex = -1;
        } else {
          common_vendor.index.showToast({ title: res.result.message || "添加失败", icon: "none" });
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/device/device.vue:133", "提交失败", err);
        common_vendor.index.showToast({ title: "提交失败: " + err.message, icon: "none" });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.device.id,
    b: common_vendor.o(($event) => $data.device.id = $event.detail.value),
    c: $data.device.name,
    d: common_vendor.o(($event) => $data.device.name = $event.detail.value),
    e: $data.device.model,
    f: common_vendor.o(($event) => $data.device.model = $event.detail.value),
    g: common_vendor.t($data.device.purchaseDate || "选择日期"),
    h: common_vendor.o((...args) => $options.onDateChange && $options.onDateChange(...args)),
    i: $data.device.purchaseDate,
    j: common_vendor.t($data.device.location || "选择位置"),
    k: $data.locationOptions,
    l: common_vendor.o((...args) => $options.onLocationChange && $options.onLocationChange(...args)),
    m: $data.locationIndex,
    n: common_vendor.t($data.device.type || "选择类型"),
    o: $data.typeOptions,
    p: common_vendor.o((...args) => $options.onTypeChange && $options.onTypeChange(...args)),
    q: $data.typeIndex,
    r: common_vendor.o((...args) => $options.goToUp && $options.goToUp(...args)),
    s: $data.device.fileName
  }, $data.device.fileName ? {
    t: common_vendor.t($data.device.fileName)
  } : {}, {
    v: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/device/device.js.map
