"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      keyword: "",
      currentType: "科研",
      typeList: ["科研", "教学", "办公"],
      deviceList: [],
      defaultImage: "/static/images/R.jpg"
      // 放一个默认图路径（本地或CDN）
    };
  },
  computed: {
    filteredDevices() {
      const kw = this.keyword || "";
      return this.deviceList.filter(
        (item) => item.type === this.currentType && ((item.name || "").includes(kw) || (item.id || "").includes(kw))
      );
    }
  },
  onLoad() {
    this.getDeviceList();
  },
  methods: {
    viewDetail(device) {
      if (!device || !device.id) {
        common_vendor.index.showToast({ title: "设备信息异常", icon: "none" });
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/deviceDetail/deviceDetail?id=${device.id}`
      });
    },
    // 切换类型
    selectType(type) {
      this.currentType = type;
    },
    // 搜索设备
    searchDevice() {
    },
    // 从云数据库获取设备
    async getDeviceList() {
      const res = await common_vendor.nr.database().collection("device").get();
      this.deviceList = res.result.data || [];
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.keyword,
    b: common_vendor.o(($event) => $data.keyword = $event.detail.value),
    c: common_vendor.o((...args) => $options.searchDevice && $options.searchDevice(...args)),
    d: common_vendor.f($data.typeList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: $data.currentType === item ? 1 : "",
        c: index,
        d: common_vendor.o(($event) => $options.selectType(item), index)
      };
    }),
    e: common_vendor.f($options.filteredDevices, (device, index, i0) => {
      var _a;
      return {
        a: device.fileID || $data.defaultImage,
        b: common_vendor.t(device.name),
        c: device.id,
        d: ((_a = device.status) == null ? void 0 : _a.color) || "#ffffff",
        e: common_vendor.o(($event) => $options.viewDetail(device), device.id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/deviceinfo/deviceinfo.js.map
