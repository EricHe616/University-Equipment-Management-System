"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      form: {
        id: "",
        applicant: "",
        reason: "",
        class: ""
      }
    };
  },
  methods: {
    async submitApplication() {
      if (!this.form.id || !this.form.applicant || !this.form.reason || !this.form.class) {
        return common_vendor.index.showToast({ title: "请填写完整信息", icon: "none" });
      }
      try {
        const db = common_vendor.nr.database();
        await db.collection("query").add({
          id: this.form.id,
          applicant: this.form.applicant,
          class: this.form.class,
          reason: this.form.reason,
          createTime: Date.now()
        });
        common_vendor.index.showToast({ title: "申请提交成功", icon: "success" });
        this.form.id = "";
        this.form.applicant = "";
        this.form.class = "";
        this.form.reason = "";
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/query/query.vue:60", error);
        common_vendor.index.showToast({ title: "提交失败，请重试", icon: "none" });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.form.id,
    b: common_vendor.o(($event) => $data.form.id = $event.detail.value),
    c: $data.form.applicant,
    d: common_vendor.o(($event) => $data.form.applicant = $event.detail.value),
    e: $data.form.class,
    f: common_vendor.o(($event) => $data.form.class = $event.detail.value),
    g: $data.form.reason,
    h: common_vendor.o(($event) => $data.form.reason = $event.detail.value),
    i: common_vendor.o((...args) => $options.submitApplication && $options.submitApplication(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-64f320dd"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/query/query.js.map
