// まぶ個人サイト: 最小限のJS（年表示・スムーズスクロール補助）
(function () {
  "use strict";

  // フッターの年表示を現在の年に合わせる
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // ページ内リンクのスムーズスクロール（CSSの scroll-behavior が効かない環境向けの補助）
  var links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var id = link.getAttribute("href");
      if (id && id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", id);
        }
      }
    });
  });
})();
