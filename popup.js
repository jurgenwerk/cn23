document.addEventListener("DOMContentLoaded", function () {
  const deleteStorageBtn = document.getElementById("deleteStorageBtn");
  deleteStorageBtn.addEventListener("click", function () {
    deleteStorage();
  });
});

function deleteStorage() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "delete_storage" },
      function (response) {
        const deleteStorageBtn = document.getElementById("deleteStorageBtn");
        deleteStorageBtn.innerText = "Zbrisano!";
      }
    );
  });
}
