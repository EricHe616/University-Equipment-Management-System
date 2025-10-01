"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      device: {
        id: "",
        fileName: "",
        fileID: ""
      },
      tempFileURL: ""
    };
  },
  methods: {
    async uploadFile() {
      var _a;
      try {
        const res = await common_vendor.index.chooseImage({ count: 1 });
        const file = (_a = res.tempFiles) == null ? void 0 : _a[0];
        if (!file)
          throw new Error("未选择文件");
        const path = file.tempFilePath || file.path;
        if (!path)
          throw new Error("路径无效");
        const fileName = (path.split("/").pop() || "upload.jpg").replace(/\s+/g, "_");
        const cloudPath = "device_uploads/" + Date.now() + "_" + fileName.replace(/\s+/g, "_");
        const uploadRes = await common_vendor.nr.uploadFile({
          filePath: path,
          cloudPath
        });
        if (uploadRes.fileID) {
          this.device.fileName = fileName;
          this.device.fileID = uploadRes.fileID;
          const urlRes = await common_vendor.nr.getTempFileURL({
            fileList: [uploadRes.fileID]
          });
          this.tempFileURL = urlRes.fileList[0].tempFileURL;
          common_vendor.index.__f__("log", "at pages/shangchuan/shangchuan.vue:69", "上传成功，预览地址：", this.tempFileURL);
          common_vendor.index.showToast({ title: "上传成功", icon: "success" });
        } else {
          throw new Error("上传失败");
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/shangchuan/shangchuan.vue:76", e);
        common_vendor.index.showToast({ title: "上传失败", icon: "none" });
      }
    },
    previewImage() {
      common_vendor.index.previewImage({
        urls: [this.tempFileURL]
      });
    },
    async submitToDB() {
      if (!this.device.id || !this.device.fileID) {
        return common_vendor.index.showToast({ title: "请填写设备编号并上传图片", icon: "none" });
      }
      try {
        const res = await common_vendor.nr.callFunction({
          name: "addDeviceFile",
          data: this.device
        });
        if (res.result.success) {
          common_vendor.index.showToast({ title: "提交成功", icon: "success" });
          this.device = { id: "", fileName: "", fileID: "" };
          this.tempFileURL = "";
        } else {
          common_vendor.index.showToast({ title: "提交失败", icon: "none" });
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/shangchuan/shangchuan.vue:106", e);
        common_vendor.index.showToast({ title: "数据库异常", icon: "none" });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.device.id,
    b: common_vendor.o(($event) => $data.device.id = $event.detail.value),
    c: common_vendor.o((...args) => $options.uploadFile && $options.uploadFile(...args)),
    d: $data.tempFileURL
  }, $data.tempFileURL ? common_vendor.e({
    e: $data.tempFileURL
  }, $data.tempFileURL ? {
    f: $data.tempFileURL || ""
  } : {}) : {}, {
    g: common_vendor.o((...args) => $options.submitToDB && $options.submitToDB(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dea45410"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shangchuan/shangchuan.js.map
