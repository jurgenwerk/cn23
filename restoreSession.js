window.onload = () => {
  chrome.storage.sync.get(["cn23Data"], function (result) {
    if (result.cn23Data) {
      window.sessionStorage.setItem(
        "TemporaryCn23DocumentList",
        result.cn23Data
      );
    }
  });

  setInterval(function () {
    let dataString = window.sessionStorage.getItem("TemporaryCn23DocumentList");
    if (dataString) {
      const data = JSON.parse(dataString);
      const mappedData = data.map((d) => {
        // d["consignee"] = {};
        return d;
      });

      chrome.storage.sync.set({
        cn23Data: JSON.stringify(mappedData),
      });
    }
  }, 3000);
};

chrome.extension.onMessage.addListener(function (msg) {
  if (msg.action == "delete_storage") {
    chrome.storage.sync.set({
      cn23Data: null,
    });
    window.sessionStorage.setItem("TemporaryCn23DocumentList", null);
  }
});
