/* Runtime DE/AR layer for case-study pages. Dictionary: tr-<page>.js sets window.__TR[lang] = { englishInnerHTML: translatedHTML }.
   Product mock screens stay in English (SKIP). Missing keys fall back to English. */
(function () {
  var d = document.documentElement, lang = d.lang;
  if (lang !== "de" && lang !== "ar") return;
  var page = (location.pathname.split("/").pop() || "index").replace(/\.html$/, "");
  var SKIP = {
    "contingent-workforce": ".win,.rp,.cmp,.pane,.wf,.wn,.ph,.rec-h,.rbody",
    "shift-management": ".appw",
    "crif-connect": ".cover-phone,.ab-phone,.fh-screen,.fh-panel,.ob-preview,.card3,.states,.acts,.pin,.tl,.log,.reset"
  }[page] || "";
  var SHELL = ".sh,.sh-drawer,.sh-sub,.sh-toast";
  var INL = { A:1,B:1,I:1,EM:1,STRONG:1,SPAN:1,SMALL:1,CODE:1,BR:1,SUP:1,SUB:1,MARK:1,ABBR:1,WBR:1,U:1,S:1,KBD:1,CITE:1,Q:1,TIME:1,LABEL:1,BDI:1 };
  var NOT = { SCRIPT:1,STYLE:1,SVG:1,NOSCRIPT:1,IFRAME:1,TEMPLATE:1,HEAD:1,CANVAS:1,TEXTAREA:1,INPUT:1,SELECT:1,OPTION:1 };
  var T, busy = false, mo;
  function norm(s) { return s.replace(/\s+/g, " ").trim(); }
  function isLeaf(el) { for (var c = el.firstElementChild; c; c = c.nextElementSibling) { if (!INL[c.tagName]) return false; if (c.children.length && !isLeaf(c)) return false; } return true; }
  function nk(k) { return k.replace(/ class="(on|)"/g, ""); }
  function kids(n) { var o = []; for (var c = n.firstChild; c; c = c.nextSibling) { if (c.nodeType === 3 && !c.textContent.trim()) continue; if (c.nodeType === 1 || c.nodeType === 3) o.push(c); } return o; }
  function same(a, b) {
    var x = kids(a), y = kids(b); if (x.length !== y.length) return false;
    for (var i = 0; i < x.length; i++) {
      if (x[i].nodeType !== y[i].nodeType) return false;
      if (x[i].nodeType === 1 && (x[i].tagName !== y[i].tagName || !same(x[i], y[i]))) return false;
    }
    return true;
  }
  function apply(a, b) {
    var x = kids(a), y = kids(b);
    for (var i = 0; i < x.length; i++) {
      if (x[i].nodeType === 3) { var m = x[i].textContent.match(/^(\s*)[\s\S]*?(\s*)$/); x[i].textContent = (m ? m[1] : "") + y[i].textContent + (m ? m[2] : ""); }
      else apply(x[i], y[i]);
    }
  }
  function setHTML(el, html) {
    var tmp = document.createElement("div");
    tmp.innerHTML = html;
    if (same(el, tmp)) { apply(el, tmp); return; }
    var ids = tmp.querySelectorAll("[id]");
    for (var i = 0; i < ids.length; i++) {
      var live = el.querySelector("#" + (window.CSS && CSS.escape ? CSS.escape(ids[i].id) : ids[i].id));
      if (live) ids[i].replaceWith(live);
    }
    while (el.firstChild) el.removeChild(el.firstChild);
    while (tmp.firstChild) el.appendChild(tmp.firstChild);
  }
  function walk(el) {
    if (el.nodeType !== 1 || NOT[el.tagName.toUpperCase()]) return;
    if (SKIP && el.matches(SKIP)) return;
    if (el.closest && el.closest(SHELL)) return;
    if (isLeaf(el)) {
      var k = nk(norm(el.innerHTML)), v = T[k];
      if (v != null && v !== k) setHTML(el, v);
      return;
    }
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3) {
        var t = norm(n.textContent), tv = T[t];
        if (t && tv != null && tv !== t) { var m = n.textContent.match(/^(\s*)[\s\S]*?(\s*)$/); n.textContent = (m ? m[1] : "") + tv + (m ? m[2] : ""); }
      } else if (n.nodeType === 1) walk(n);
    }
  }
  function attrs(root) {
    var list = (root.nodeType === 1 ? [root] : []).concat([].slice.call(root.querySelectorAll("[aria-label],[title],[alt],[placeholder]")));
    list.forEach(function (e) {
      if (e.closest(SHELL) || (SKIP && e.closest(SKIP))) return;
      ["aria-label", "title", "alt", "placeholder"].forEach(function (a) {
        var v = e.getAttribute(a);
        if (v) { var tv = T["@" + a + ":" + norm(v)]; if (tv) e.setAttribute(a, tv); }
      });
    });
  }
  function run(root) {
    if (busy) return; busy = true;
    if (mo) mo.disconnect();
    try { walk(root); attrs(root); } catch (e) {}
    busy = false;
    if (mo) mo.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  function start() {
    var R = (window.__TR || {})[lang];
    if (!R) { d.classList.remove("tr-wait"); return; }
    T = {}; for (var kk in R) T[kk.charAt(0) === "@" ? kk : nk(kk)] = R[kk];
    run(document.body);
    var tt = T["@title:" + norm(document.title)]; if (tt) document.title = tt;
    var q = [], sched = false;
    mo = new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        var t = m.target; if (t.nodeType === 3) t = t.parentNode;
        if (t && t.nodeType === 1 && q.indexOf(t) < 0) q.push(t);
      });
      if (!sched) { sched = true; requestAnimationFrame(function () { sched = false; var l = q.splice(0); l.forEach(function (t) { if (document.body.contains(t)) run(t); }); }); }
    });
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
    d.classList.remove("tr-wait");
  }
  var s = document.createElement("script");
  s.src = "./tr-" + page + ".js?v=1";
  s.onload = function () { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start(); };
  s.onerror = function () { d.classList.remove("tr-wait"); };
  document.head.appendChild(s);
})();
