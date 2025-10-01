"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      queryList: [],
      // 云数据库查询数据
      loading: true
    };
  },
  methods: {
    async fetchQueryList() {
      this.loading = true;
      try {
        const res = await common_vendor.nr.callFunction({
          name: "getQueryList",
          data: {}
        });
        if (res.result.success) {
          this.queryList = res.result.data.map((item) => ({
            ...item,
            tempReason: "",
            status: item.status || "pending"
            // 默认未审核
          }));
        } else {
          throw new Error(res.result.error || "查询失败");
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/examine/examine.vue:67", "查询失败:", e);
        common_vendor.index.showToast({ title: "加载失败", icon: "none" });
      }
      this.loading = false;
    },
    getStatusLabel(status) {
      if (status === "pending")
        return "未审核";
      if (status === "approved")
        return "已审核";
      if (status === "rejected")
        return "未通过";
      if (status === "rejecting")
        return "拒绝中";
      return "未知";
    },
    getStatusColor(status) {
      if (status === "pending")
        return "red";
      if (status === "approved")
        return "green";
      if (status === "rejected")
        return "gray";
      if (status === "rejecting")
        return "orange";
      return "black";
    },
    // 通过审核
    async approve(item) {
      try {
        await common_vendor.nr.callFunction({
          name: "updateQueryStatus",
          data: {
            _id: item._id,
            status: "approved"
          }
        });
        item.status = "approved";
        common_vendor.index.showToast({ title: "审核通过", icon: "success" });
      } catch (e) {
        common_vendor.index.showToast({ title: "操作失败", icon: "none" });
      }
    },
    // 点击拒绝，进入填写原因阶段
    reject(item) {
      this.queryList = this.queryList.map((i) => {
        if (i._id === item._id) {
          i.status = "rejecting";
          i.tempReason = "";
        }
        return i;
      });
    },
    // 提交拒绝原因
    async submitReject(item) {
      if (!item.tempReason.trim()) {
        return common_vendor.index.showToast({ title: "请填写拒绝原因", icon: "none" });
      }
      try {
        await common_vendor.nr.database().collection("query").doc(item._id).update({
          status: "rejected",
          reason: item.tempReason
        });
        item.status = "rejected";
        common_vendor.index.showToast({ title: "已拒绝", icon: "success" });
      } catch (e) {
        common_vendor.index.showToast({ title: "操作失败", icon: "none" });
      }
    },
    cancelReject(item) {
      item.status = "pending";
    },
    formatDate(ts) {
      if (!ts)
        return "";
      const date = new Date(ts);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    }
  },
  onLoad() {
    this.fetchQueryList();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.loading
  }, $data.loading ? {} : {
    b: common_vendor.f($data.queryList, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.apply || "未知"),
        b: common_vendor.t(item.device || "未知"),
        c: common_vendor.t($options.getStatusLabel(item.status)),
        d: item.status === "rejected"
      }, item.status === "rejected" ? {
        e: common_vendor.t(item.reason || "无")
      } : {}, {
        f: $options.getStatusColor(item.status),
        g: item.status === "pending"
      }, item.status === "pending" ? {
        h: common_vendor.o(($event) => $options.approve(item), item._id),
        i: common_vendor.o(($event) => $options.reject(item), item._id)
      } : {}, {
        j: item.status === "rejecting"
      }, item.status === "rejecting" ? {
        k: item.tempReason,
        l: common_vendor.o(($event) => item.tempReason = $event.detail.value, item._id),
        m: common_vendor.o(($event) => $options.submitReject(item), item._id),
        n: common_vendor.o(($event) => $options.cancelReject(item), item._id)
      } : {}, {
        o: item._id,
        p: $options.getStatusColor(item.status)
      });
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-37ad19dd"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/examine/examine.js.map
