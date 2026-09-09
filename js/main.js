/* AK portfolio — boot logic. Enhancement only: the page works with this file deleted.
   ES5 on purpose. Every lookup is null-checked, every listener body is try/catch'd. */
(function () {
  "use strict";

  var KEY = "ak-cleared";
  var doc = document;
  var root = doc.documentElement;
  var boot = doc.getElementById("boot");
  var skip = doc.getElementById("boot-skip");
  var replay = doc.getElementById("replay");
  var access = doc.getElementById("access");
  var photo = doc.getElementById("photo");
  var files = doc.getElementById("files");
  var done = false;
  var timer = null;
  var reduce = false;

  try {
    reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  } catch (e) {}

  function has(el, c) { return !!el && (" " + el.className + " ").indexOf(" " + c + " ") > -1; }
  function add(el, c) { if (el && !has(el, c)) { el.className += (el.className ? " " : "") + c; } }
  function rm(el, c) {
    if (el) { el.className = (" " + el.className + " ").replace(" " + c + " ", " ").replace(/^\s+|\s+$/g, ""); }
  }
  function flag(on) {
    try { if (on) { localStorage.setItem(KEY, "1"); } else { localStorage.removeItem(KEY); } } catch (e) {}
  }
  function on(el, type, fn) {
    if (!el || !el.addEventListener) { return; }
    el.addEventListener(type, function (e) { try { fn(e); } catch (err) {} });
  }

  /* Idempotent. Called by: CSS animationend, SKIP, Escape, and a hard timeout. */
  function dismiss() {
    if (done) { return; }
    done = true;
    if (timer) { clearTimeout(timer); timer = null; }
    add(boot, "boot--off");
    rm(photo, "decrypting");
    flag(true);
  }

  function start() {
    done = false;
    if (!boot || has(boot, "boot--off") || reduce) {
      done = true;
      rm(photo, "decrypting");
      return;
    }
    add(photo, "decrypting");
    timer = setTimeout(dismiss, 4200);
  }

  on(boot, "animationend", function (e) { if (e && e.target === boot) { dismiss(); } });
  on(skip, "click", dismiss);
  on(doc, "keydown", function (e) { if (e && (e.key === "Escape" || e.keyCode === 27)) { dismiss(); } });

  /* Replay: clear the flag, rewind every keyframe to zero and run the boot again. */
  on(replay, "click", function (e) {
    if (e && e.preventDefault) { e.preventDefault(); }
    if (!boot) { return; }
    flag(false);
    rm(root, "cleared");
    rm(boot, "boot--off");
    var all = boot.querySelectorAll("*");
    var i;
    boot.style.animation = "none";
    for (i = 0; i < all.length; i++) { all[i].style.animation = "none"; }
    void boot.offsetWidth;
    boot.style.animation = "";
    for (i = 0; i < all.length; i++) { all[i].style.animation = ""; }
    window.scrollTo(0, 0);
    start();
  });

  /* ACCESS FILES: wipe the remaining redactions and go to the index. */
  on(access, "click", function (e) {
    add(root, "cleared");
    if (!files) { return; }
    if (e && e.preventDefault) { e.preventDefault(); }
    try {
      files.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      files.scrollIntoView();
    }
  });

  start();
}());
