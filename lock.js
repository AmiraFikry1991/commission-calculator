/* Day1 tools sign-in screen.
   Only a one-way scrambled version of the password (PBKDF2-SHA-256) is stored here, never the password itself.
   To change the password: open any page with ?setpassword, choose a new one, and replace HASH below with the code it shows. */
(function(){
  "use strict";
  var CFG = { salt: "day1-tools-2026-k7Qp", iterations: 250000, hash: "" };
  var KEY = "day1.tools.unlock";
  var root = document.documentElement;
  root.classList.add("d1-locked", "d1-ready");

  var css = "html.d1-locked body>*:not(#d1lock){display:none!important}" +
    "#d1lock{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#f2f3f5;font:14px/1.45 'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#1f2933;padding:16px}" +
    "#d1lock .top{position:fixed;top:0;left:0;right:0;height:58px;background:#0e2a4a;border-bottom:3px solid #1d64a8;display:flex;align-items:center;padding:0 24px;color:#fff}" +
    "#d1lock .top b{font-size:1.25rem;letter-spacing:-.02em;padding-right:12px;border-right:1px solid rgba(255,255,255,.3);margin-right:12px}" +
    "#d1lock .card{background:#fff;border:1px solid #dde1e6;border-radius:8px;padding:28px;width:100%;max-width:380px;display:grid;gap:14px;box-shadow:0 8px 30px rgba(16,24,40,.08)}" +
    "#d1lock h2{margin:0;font-size:1.15rem;color:#0e2a4a}" +
    "#d1lock p{margin:0;color:#6b7480;font-size:.88rem}" +
    "#d1lock label{display:grid;gap:4px;font-size:.8rem;font-weight:600;color:#3c4652}" +
    "#d1lock input[type=password],#d1lock textarea{font:inherit;border:1px solid #c9ced5;border-radius:3px;padding:9px 10px;width:100%}" +
    "#d1lock textarea{font-family:Consolas,Menlo,monospace;font-size:.78rem;height:76px;resize:none;background:#f7f8fa}" +
    "#d1lock input:focus,#d1lock button:focus-visible{outline:2px solid #1d64a8;outline-offset:1px}" +
    "#d1lock .chk{display:flex;gap:8px;align-items:center;font-weight:400;color:#1f2933}" +
    "#d1lock button{font:inherit;font-weight:600;cursor:pointer;border-radius:3px;border:1px solid #1d64a8;background:#1d64a8;color:#fff;padding:9px 14px}" +
    "#d1lock button:disabled{opacity:.6;cursor:wait}" +
    "#d1lock button.ghost{background:#fff;color:#1d64a8}" +
    "#d1lock .err{color:#b42318;font-size:.86rem;min-height:1.2em}" +
    "#d1lock .ok{color:#1e7a46;font-size:.86rem}";
  var st = document.createElement("style"); st.textContent = css; (document.head || root).appendChild(st);

  function hex(buf){ var a = new Uint8Array(buf), s = ""; for (var i = 0; i < a.length; i++) s += a[i].toString(16).padStart(2, "0"); return s; }
  function derive(pw){
    var enc = new TextEncoder();
    return crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]).then(function(k){
      return crypto.subtle.deriveBits({ name: "PBKDF2", salt: enc.encode(CFG.salt), iterations: CFG.iterations, hash: "SHA-256" }, k, 256);
    }).then(hex);
  }
  function get(store){ try { return window[store].getItem(KEY); } catch (e) { return null; } }
  function put(store, v){ try { if (v == null) window[store].removeItem(KEY); else window[store].setItem(KEY, v); } catch (e) {} }
  function unlock(){ root.classList.remove("d1-locked"); var o = document.getElementById("d1lock"); if (o) o.remove(); }

  window.D1Lock = { signOut: function(){ put("sessionStorage", null); put("localStorage", null); location.reload(); } };
  document.addEventListener("click", function(e){ var b = e.target.closest && e.target.closest("[data-signout]"); if (b) window.D1Lock.signOut(); });

  var setupMode = !CFG.hash || /[?&]setpassword\b/.test(location.search);
  if (!setupMode && (get("sessionStorage") === CFG.hash || get("localStorage") === CFG.hash)) { unlock(); return; }

  function mount(html){
    var go = function(){
      var o = document.createElement("div"); o.id = "d1lock"; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true");
      o.innerHTML = '<div class="top"><b>Day1</b><span>Payroll tools</span></div><div class="card">' + html + '</div>';
      document.body.appendChild(o); var f = o.querySelector("input"); if (f) f.focus(); wire(o);
    };
    if (document.body) go(); else document.addEventListener("DOMContentLoaded", go);
  }

  if (setupMode) {
    mount('<h2>Choose a password</h2><p>This turns your password into a scrambled code. The password stays in this browser; only the code is used to lock the site.</p>' +
      '<label>New password<input type="password" id="p1" autocomplete="new-password"></label>' +
      '<label>Type it again<input type="password" id="p2" autocomplete="new-password"></label>' +
      '<div class="err" id="err"></div><button id="make">Create code</button>' +
      '<div id="out" hidden style="display:grid;gap:10px"><label>Your code<textarea id="code" readonly></textarea></label><button class="ghost" id="copy">Copy code</button>' +
      '<p class="ok">Send this code to Claude to switch the lock on. Do not send the password.</p></div>');
  } else {
    mount('<h2>Sign in</h2><p>Enter the password to open the Day1 payroll tools.</p>' +
      '<label>Password<input type="password" id="pw" autocomplete="current-password"></label>' +
      '<label class="chk"><input type="checkbox" id="keep"> Keep me signed in on this device</label>' +
      '<div class="err" id="err" aria-live="polite"></div><button id="go">Sign in</button>');
  }

  var fails = 0;
  function wire(o){
    var err = o.querySelector("#err");
    if (!window.crypto || !crypto.subtle) { err.textContent = "This browser can't run the sign-in. Open the page over https in a current browser."; return; }
    if (setupMode) {
      o.querySelector("#make").addEventListener("click", function(){
        var a = o.querySelector("#p1").value, b = o.querySelector("#p2").value, btn = this;
        if (a.length < 10) { err.textContent = "Use at least 10 characters. A short phrase is easiest to remember."; return; }
        if (a !== b) { err.textContent = "The two passwords don't match."; return; }
        err.textContent = ""; btn.disabled = true; btn.textContent = "Creating…";
        derive(a).then(function(h){ o.querySelector("#code").value = h; o.querySelector("#out").hidden = false; btn.textContent = "Create code"; btn.disabled = false; });
      });
      o.querySelector("#copy").addEventListener("click", function(){
        var t = o.querySelector("#code"); t.select();
        (navigator.clipboard ? navigator.clipboard.writeText(t.value) : Promise.reject()).then(function(){ err.textContent = ""; o.querySelector("#copy").textContent = "Copied"; }, function(){ document.execCommand("copy"); });
      });
    } else {
      var go = o.querySelector("#go"), pw = o.querySelector("#pw");
      var submit = function(){
        if (!pw.value) { err.textContent = "Enter the password."; return; }
        go.disabled = true; go.textContent = "Checking…"; err.textContent = "";
        derive(pw.value).then(function(h){
          if (h === CFG.hash) {
            put("sessionStorage", h); if (o.querySelector("#keep").checked) put("localStorage", h);
            unlock();
          } else {
            fails++; var wait = fails >= 5 ? Math.min(30, (fails - 4) * 5) : 0;
            err.textContent = "That password isn't right." + (wait ? " Try again in " + wait + " seconds." : "");
            pw.value = ""; pw.focus();
            setTimeout(function(){ go.disabled = false; go.textContent = "Sign in"; }, wait * 1000);
          }
        });
      };
      go.addEventListener("click", submit);
      pw.addEventListener("keydown", function(e){ if (e.key === "Enter") submit(); });
    }
  }
})();
