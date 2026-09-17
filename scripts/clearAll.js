import { clearPurchases } from "./storage.js";

const clearAllButton = document.getElementById("clearAllButton");

if (clearAllButton) {
    clearAllButton.addEventListener("click", function () {
        if (!window.confirm("Remove every course from your profile?")) return;

        clearPurchases();
        window.location.reload();
    });
}