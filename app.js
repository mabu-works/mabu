// まぶ個人サイト: 最小限のJS（年表示・スムーズスクロール補助・お知らせ表示）
(function () {
  "use strict";

  // お知らせ: news.json（正本）を読み込んで新しい順に直近5件まで表示する
  var newsList = document.getElementById("newsList");
  var newsEmpty = document.getElementById("newsEmpty");
  if (newsList) {
    fetch("news.json", { cache: "no-cache" })
      .then(function (res) {
        if (!res.ok) throw new Error("news.json fetch failed");
        return res.json();
      })
      .then(function (data) {
        var items = (data && Array.isArray(data.items) ? data.items : [])
          .filter(function (item) { return item && item.date && item.text; })
          .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; })
          .slice(0, 5);
        if (!items.length) {
          if (newsEmpty) newsEmpty.hidden = false;
          return;
        }
        items.forEach(function (item) {
          var li = document.createElement("li");
          li.className = "news-item";

          var date = document.createElement("time");
          date.className = "news-date";
          date.dateTime = item.date;
          date.textContent = item.date.replace(/-/g, "/");
          li.appendChild(date);

          var body = document.createElement("div");
          body.className = "news-body";
          var p = document.createElement("p");
          p.textContent = item.text;
          body.appendChild(p);
          if (item.link) {
            var a = document.createElement("a");
            a.href = item.link;
            a.target = "_blank";
            a.rel = "noopener";
            a.textContent = item.linkLabel || item.link;
            body.appendChild(a);
          }
          li.appendChild(body);
          newsList.appendChild(li);
        });
      })
      .catch(function () {
        if (newsEmpty) newsEmpty.hidden = false;
      });
  }

  // Webサービスの検索・カテゴリ絞り込み
  var serviceSearch = document.getElementById("serviceSearch");
  var serviceEmpty = document.getElementById("serviceEmpty");
  var chips = document.querySelectorAll(".chip[data-filter]");
  var cards = document.querySelectorAll(".card[data-cat]");
  if (serviceSearch && chips.length && cards.length) {
    var activeFilter = "all";
    var applyServiceFilter = function () {
      var query = serviceSearch.value.trim().toLowerCase();
      var visibleCount = 0;
      cards.forEach(function (card) {
        var matchesCat = activeFilter === "all" || card.getAttribute("data-cat") === activeFilter;
        var matchesQuery = !query || card.textContent.toLowerCase().indexOf(query) !== -1;
        var show = matchesCat && matchesQuery;
        card.style.display = show ? "" : "none";
        if (show) visibleCount++;
      });
      document.querySelectorAll("[data-cat-group]").forEach(function (heading) {
        var key = heading.getAttribute("data-cat-group");
        var grid = document.querySelector('[data-cat-grid="' + key + '"]');
        var anyVisible = false;
        if (grid) {
          grid.querySelectorAll(".card").forEach(function (card) {
            if (card.style.display !== "none") anyVisible = true;
          });
          grid.style.display = anyVisible ? "" : "none";
        }
        heading.style.display = anyVisible ? "" : "none";
      });
      if (serviceEmpty) serviceEmpty.hidden = visibleCount !== 0;
    };
    serviceSearch.addEventListener("input", applyServiceFilter);
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        activeFilter = chip.getAttribute("data-filter");
        applyServiceFilter();
      });
    });
  }

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

(function initTheme() {
  var root = document.documentElement;
  if (!root || !root.getAttribute || !root.setAttribute) return;
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "light" ? "☀️" : "🌙";
  }
  var current = root.getAttribute("data-theme");
  if (current !== "light" && current !== "dark") {
    try { current = localStorage.getItem("mabu-theme"); } catch (e) { current = null; }
  }
  apply(current === "light" ? "light" : "dark");
  var btn = document.getElementById("themeToggle");
  if (btn && btn.addEventListener) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      apply(next);
      try { localStorage.setItem("mabu-theme", next); } catch (e) { /* 保存できなくても切り替え自体は有効 */ }
    });
  }
})();
