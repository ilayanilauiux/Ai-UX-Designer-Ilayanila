/* Recreated worker app. Vector UI, shared state across screens, no images. */
(function () {
  var I = {
    home: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    cal: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    cred: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="3"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
    bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 21a2 2 0 0 0 4 0"/></svg>',
    back: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
    sun: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    clock: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
    mega: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B06A06" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM15 9a4 4 0 0 1 0 6"/></svg>',
    empty: '<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4M9 15h6"/></svg>',
    id: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
    doc: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
    cap: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5zM6 12v5c3 2 9 2 12 0v-5"/></svg>',
    shield: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
    bag: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="3"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>',
    lock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    chev: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>'
  };
  var DAYS = [['Su', 10], ['Mo', 11], ['Tu', 12], ['We', 13], ['Th', 14], ['Fr', 15], ['Sa', 16]];
  var DNAME = { 10: 'Sun', 11: 'Mon', 12: 'Tue', 13: 'Wed', 14: 'Thu', 15: 'Fri', 16: 'Sat' };
  var FOLD = [
    ['id', 'Identification', I.id, '#4B3CC4', '#EAE8FB'], ['cert', 'Certifications', I.shield, '#E5484D', '#FDECEC'],
    ['deg', 'Degrees', I.cap, '#D9780A', '#FFF1DA'], ['lic', 'Licenses', I.doc, '#2F6BEA', '#E6EFFF'],
    ['imm', 'Immunizations', I.shield, '#16A36A', '#E1F6EC'], ['oth', 'Others', I.lock, '#E5604D', '#FDEBE6']
  ];

  function fresh() {
    return {
      screen: 'home', stack: [], tab: 'my', sel: 12, det: 'm1', scenario: 'normal', clock: 'idle', t0: 0, ts: 'pending', brk: 60,
      avail: { 10: 'av', 11: 'av', 16: 'av' }, filter: 'all', dir: 1,
      shifts: [
        { id: 'm1', day: 12, place: 'General Hospital', role: 'Staff Nurse · Emergency Dept', from: '7:00 AM', to: '4:00 PM', type: 'my', night: false },
        { id: 'm2', day: 14, place: 'Northside Medical', role: 'Staff Nurse · ICU', from: '7:00 PM', to: '7:00 AM', type: 'my', night: true, pending: true },
        { id: 'o1', day: 13, place: 'Lakeview Health', role: 'Staff Nurse · ICU', from: '9:00 AM', to: '1:00 PM', type: 'open', night: false },
        { id: 'o2', day: 15, place: 'General Hospital', role: 'Staff Nurse · Emergency Dept', from: '7:00 PM', to: '7:00 AM', type: 'open', night: true }
      ],
      alerts: [{ id: 'a1', k: 'missed', read: false }, { id: 'a2', k: 'cred', read: false }],
      cred: { id: { n: 2, req: true }, cert: { n: 11, req: true }, deg: { n: 12, req: false }, lic: { n: 1, req: true }, imm: { n: 1, req: true }, oth: { n: 12, req: false } }
    };
  }

  function mount(host, opts) {
    opts = opts || {};
    var S = fresh(), listeners = [], timer = null, toastT = null;
    host.innerHTML = '';
    host.classList.add('appw');
    var app = document.createElement('div');
    app.className = 'app';
    app.innerHTML =
      '<div class="hd"></div>' +
      '<div class="stb"><span>9:41</span><i><svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1"/><rect x="4.5" y="5" width="3" height="6" rx="1"/><rect x="9" y="2.5" width="3" height="8.5" rx="1"/><rect x="13.5" y="0" width="3" height="11" rx="1"/></svg><svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x=".5" y=".5" width="21" height="11" rx="3.5" stroke="currentColor" opacity=".6"/><rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor"/><rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".6"/></svg></i></div>' +
      '<div class="bar"></div><div class="body"></div>' +
      '<div class="nav"></div><div class="scrim"></div><div class="sheet"></div><div class="toast"></div>';
    host.appendChild(app);
    var $bar = app.querySelector('.bar'), $body = app.querySelector('.body'), $nav = app.querySelector('.nav'), $scrim = app.querySelector('.scrim'), $sheet = app.querySelector('.sheet'), $toast = app.querySelector('.toast');

    function fit() {
      var w = host.clientWidth || 360, k = w / 360;
      if ('zoom' in document.documentElement.style) { app.style.transform = 'none'; app.style.zoom = k; } else app.style.transform = 'scale(' + k + ')';
      host.style.height = (740 * k) + 'px';
    }
    fit();
    if (window.ResizeObserver) new ResizeObserver(fit).observe(host); else window.addEventListener('resize', fit);

    /* ---------- helpers ---------- */
    function my(id) { return S.shifts.filter(function (s) { return s.id === id; })[0]; }
    function dayState(d) {
      var m = S.shifts.some(function (s) { return s.day === d && s.type === 'my'; });
      if (m) return 'my';
      if (S.shifts.some(function (s) { return s.day === d && s.type === 'open'; })) return 'open';
      return S.avail[d] || '';
    }
    function mins(t) { var m = /(\d+):(\d+)\s*(AM|PM)/.exec(t); var h = +m[1] % 12 + (m[3] === 'PM' ? 12 : 0); return h * 60 + +m[2]; }
    function fmt(m) { var h = Math.floor(m / 60) % 24, mm = m % 60, ap = h >= 12 ? 'PM' : 'AM'; return ((h % 12) || 12) + ':' + (mm < 10 ? '0' : '') + mm + ' ' + ap; }
    function dur(m) { return Math.floor(m / 60) + ':' + ('0' + (m % 60)).slice(-2); }
    function tsOut() { return S.ts === 'noshow' ? null : (S.ts === 'pe' || S.ts === 'pu') ? mins('11:30 AM') : mins('4:00 PM'); }
    function toast(msg) {
      $toast.innerHTML = I.check + '<span>' + msg + '</span>'; $toast.classList.add('on');
      clearTimeout(toastT); toastT = setTimeout(function () { $toast.classList.remove('on'); }, 2200);
    }
    function key() {
      if (S.screen === 'shifts') return 'shifts-' + S.tab;
      if (S.screen === 'details') return 'details-' + (my(S.det).type === 'my' ? 'my' : 'open');
      return S.screen;
    }
    function emit() { listeners.forEach(function (f) { f(key(), S); }); }
    function card(s, extra) {
      return '<button class="shc ' + (s.type === 'open' ? 'open' : '') + '" data-act="det" data-id="' + s.id + '" data-ann="card">' +
        '<div class="dt"><div><small>' + DNAME[s.day] + '</small><b>' + s.day + '</b></div></div>' +
        '<div><div class="nm">' + s.place + '</div><div class="rl">' + s.role + '</div><div class="tm">' + I.clock + s.from + ' – ' + s.to + '</div></div>' +
        '<span class="ic">' + (s.night ? I.moon : I.sun) + '</span>' +
        (s.pending && s.type === 'my' ? '<span class="ap chip" data-ann="pending">Pending</span>' : '') +
        (s.applied ? '<span class="ap chip g">Applied</span>' : '') + (extra || '') + '</button>';
    }
    function setBar(title, back, bell) {
      var cnt = S.alerts.length;
      $bar.innerHTML = (back ? '<button class="bk" data-act="back" aria-label="Back">' + I.back + '</button>' : '') + '<h1>' + title + '</h1>' +
        (bell === false ? '' : '<button class="bell" data-act="nav" data-to="alerts" aria-label="Notifications">' + I.bell + (cnt ? '<b></b>' : '') + '</button><div class="av">L</div>');
    }
    function setNav(on) {
      var items = [['home', I.home, 'Home'], ['shifts', I.cal, 'Shifts'], ['cred', I.cred, 'Credentials'], ['alerts', I.bell, 'Alerts']];
      $nav.innerHTML = items.map(function (it) {
        return '<button class="nb ' + (on === it[0] ? 'on ' : '') + (it[0] === 'alerts' && S.alerts.length ? 'has' : '') + '" data-act="nav" data-to="' + it[0] + '" aria-label="' + it[2] + '">' + it[1] + '<span>' + it[2] + '</span><i></i></button>';
      }).join('');
    }

    /* ---------- screens ---------- */
    function vHome() {
      setBar('Welcome back, Lia', false); setNav('home');
      var next = S.shifts.filter(function (s) { return s.type === 'my'; }).sort(function (a, b) { return a.day - b.day; })[0];
      var hrs = {}, tot = 0;
      S.shifts.forEach(function (s) { if (s.type === 'my') { var d = (mins(s.to) - mins(s.from) + 1440) % 1440; hrs[s.day] = d / 60; tot += d / 60; } });
      var bars = DAYS.map(function (d) { var h = hrs[d[1]] || 0; return '<div class="' + (h ? 'k' : '') + '" style="height:' + (h ? Math.max(18, h * 6.4) : 8) + 'px"><small>' + d[0] + '</small></div>'; }).join('');
      return '<div class="ann"><span>' + I.mega + '</span><div><div class="t" style="font-size:13px">Holiday rates start Nov 28</div><div class="m">Shifts on listed dates pay a higher rate. Check Open Shifts.</div></div></div><div class="gap"></div>' +
        (next ? '<div class="sheetc hero"><div class="row"><div class="m" style="font-weight:700;letter-spacing:.08em">NEXT SHIFT</div><div class="sp"></div><span class="chip b">' + DNAME[next.day] + ' ' + next.day + '</span></div><div class="gap"></div>' + card(next).replace('data-ann="card"', '') + '<div class="gap"></div><button class="btn" data-act="det" data-id="' + next.id + '">View shift</button></div>' : '') +
        '<div class="gap"></div><div class="sheetc"><div class="row"><div class="t">Hours this week</div><div class="sp"></div><div class="m"><b style="color:#1D2433">' + Math.round(tot) + ' h</b> scheduled</div></div><div class="bars" style="margin-bottom:22px">' + bars + '</div></div>';
    }
    function vShifts() {
      var titles = { my: 'My Shifts', open: 'Open Shifts', avail: 'Availability' };
      setBar(titles[S.tab], false); setNav('shifts');
      var wk = '<div class="wk">' + DAYS.map(function (d) { return '<div class="dn">' + d[0] + '</div>'; }).join('') +
        DAYS.map(function (d) { var st = dayState(d[1]); return '<button class="dy ' + (S.sel === d[1] ? 'on' : '') + '" data-act="day" data-d="' + d[1] + '" ' + (st ? 'data-s="' + st + '"' : '') + ' data-ann="selday" aria-label="' + DNAME[d[1]] + ' ' + d[1] + '">' + d[1] + '</button>'; }).join('') + '</div>';
      var lg = '<div class="lgd" data-ann="legend"><span><i style="background:var(--teal)"></i>Available</span><span><i style="background:var(--blue)"></i>My shift</span><span><i style="background:var(--vio)"></i>Less pref</span><span><i style="background:var(--amber)"></i>N/A</span><span><i style="background:var(--red)"></i>Open</span></div>';
      var tabs = '<div class="tabs" data-ann="tabs"><button class="' + (S.tab === 'my' ? 'on' : '') + '" data-act="tab" data-t="my">My Shifts</button><button class="o ' + (S.tab === 'open' ? 'on o' : '') + '" data-act="tab" data-t="open">Open Shifts</button><button class="' + (S.tab === 'avail' ? 'on a' : '') + '" data-act="tab" data-t="avail">Availability</button></div>';
      var list = '';
      if (S.tab === 'avail') {
        list = '<div class="m" style="margin:0 2px 10px">Tell the schedule when you can work. Assigned days are locked.</div>' + DAYS.map(function (d) {
          var assigned = S.shifts.some(function (s) { return s.day === d[1] && s.type === 'my' }), st = S.avail[d[1]] || '';
          function b(v, l, c) { return '<button class="' + (st === v ? 'on' : '') + '" style="--c:' + c + '" data-act="av" data-d="' + d[1] + '" data-v="' + v + '">' + l + '</button>'; }
          return '<div class="av-row"><div style="width:44px"><b>' + d[0] + ' ' + d[1] + '</b></div>' + (assigned ? '<span class="chip b" style="margin-left:auto">Assigned</span>' : '<div class="seg3">' + b('av', 'Yes', 'var(--teal)') + b('less', 'Less', 'var(--vio)') + b('na', 'N/A', 'var(--amber)') + '</div>') + '</div>';
        }).join('');
      } else {
        var rows = S.shifts.filter(function (s) { return s.type === S.tab && s.day === S.sel; });
        list = '<div class="row" style="margin:2px 2px 8px"><div class="t" style="font-size:13px">' + DNAME[S.sel] + ', Nov ' + S.sel + '</div></div>' +
          (rows.length ? rows.map(function (s) { return card(s) + '<div class="gap"></div>'; }).join('') : '<div class="empty">' + I.empty + '<div class="t" style="color:#1D2433;font-size:13px">No ' + (S.tab === 'my' ? 'shifts' : 'open shifts') + ' on this day</div><div class="m" style="margin:4px 0 12px">' + (S.tab === 'my' ? 'Check Open Shifts for something to pick up.' : 'Pick another day, or set availability.') + '</div><button class="btn sm ol" data-act="tab" data-t="' + (S.tab === 'my' ? 'open' : 'avail') + '">' + (S.tab === 'my' ? 'Open Shifts' : 'Availability') + '</button></div>');
      }
      return '<div class="sheetc" style="padding:12px 12px 12px"><div class="row"><b>November 2026</b><div class="sp"></div><span style="color:#B9BFD0">‹ ›</span></div>' + wk + lg + '</div>' + tabs + list;
    }
    function vDetails() {
      var s = my(S.det);
      if (s.type === 'open') {
        setBar('Details', true, false); setNav('shifts');
        var rows = [['Date', DNAME[s.day] + ', Nov ' + s.day], ['Time', s.from + ' – ' + s.to], ['Facility', s.place], ['Department', s.role.split('· ')[1]], ['Duration', dur((mins(s.to) - mins(s.from) + 1440) % 1440) + ' hrs']];
        return card(s) + '<div class="gap"></div><div class="sheetc">' + rows.map(function (r) { return '<div class="kv"><span>' + r[0] + '</span><b>' + r[1] + '</b></div>'; }).join('') + '</div><div class="gap"></div>' +
          (s.applied ? '<button class="btn dis" data-ann="apply">Applied · waiting for approval</button>' : '<button class="btn grn" data-act="apply" data-ann="apply">Apply for this shift</button>') +
          '<div class="m" style="text-align:center;margin-top:10px">The manager confirms before it becomes your shift.</div>';
      }
      setBar('My Shift Details', true); setNav('shifts');
      var out = S.clock === 'out', inn = S.clock === 'in', call = S.scenario === 'call', loc = S.scenario === 'loc';
      var rc = out ? 'var(--green)' : inn ? 'var(--blue)' : 'var(--red)';
      var st = out ? 'You are clocked out' : inn ? 'You are clocked in' : 'You are not clocked in';
      var btn = out ? '<button class="btn sm" data-act="nav" data-to="timesheet" data-ann="timesheetbtn">View timesheet</button>' :
        inn ? '<button class="btn sm red" data-act="clockout">Clock Out</button>' :
          '<button class="btn sm" data-act="clockin" data-ann="callback">' + (call ? 'Clock In for Callback' : 'Clock In') + '</button>';
      var tl = '';
      if (out) tl += '<li><b>You clocked out for the shift</b><small>Hours sent for approval</small><time>Today, 4:00 PM</time></li>';
      if (inn || out) tl += '<li><b>You clocked in' + (call ? ' as a callback' : '') + '</b><small>' + (loc ? 'Location not verified' : 'Location verified') + '</small><time>Today, 7:00 AM</time></li>';
      tl += '<li><b>Approved by you</b><small>I am available and can work</small><time>Nov 10, 3:40 PM</time></li><li><b>Approved by manager</b><small>Thanks for filling the shift</small><time>Nov 10, 3:00 PM</time></li>';
      return '<div class="sheetc" style="padding:12px">' + card(s).replace(/<span class="ap[^>]*>.*?<\/span>/, '') + '</div><div class="gap"></div>' +
        '<div class="sheetc"><div class="row" style="gap:14px"><div class="ring" data-ann="clockstate"><svg viewBox="0 0 100 100"><circle class="tr" cx="50" cy="50" r="42"/><circle class="pg" cx="50" cy="50" r="42" stroke-dasharray="264" stroke-dashoffset="' + (out ? 0 : 264) + '" style="--rc:' + rc + '" id="pg"/></svg><b id="tm">' + (out ? '9:00' : inn ? '0:00' : '--:--') + '</b></div>' +
        '<div style="flex:1"><div class="t" style="font-size:14px">' + st + '</div>' + (loc && !out ? '<div class="warn" data-ann="location">' + I.pin + 'Location tracking disabled</div>' : '<div class="m" data-ann="location" style="margin-top:3px">' + (out ? 'Hours sent for approval' : 'Location tracking on') + '</div>') + '<div style="margin-top:9px">' + btn + '</div></div></div></div><div class="gap"></div>' +
        '<div class="sheetc" data-ann="timeline"><div class="t" style="margin-bottom:8px">Timeline</div><ul class="tl" style="margin:0;padding-left:18px">' + tl + '</ul></div>' +
        (S.clock === 'idle' ? '<div class="gap"></div><button class="btn gh" data-act="rejectq">Reject this shift</button>' : '');
    }
    function vTimesheet() {
      setBar('Timesheet', true); setNav('shifts');
      var s = my('m1'), inM = mins(s.from), outM = tsOut(), brk = S.ts === 'noshow' ? 0 : S.brk, total = outM ? outM - inM - brk : 0;
      var map = { pending: ['Pending', '', S.clock === 'in' ? 'You are still actively working.' : 'Waiting for your manager to verify.'], verified: ['Verified', 'g', 'Hours confirmed by your manager.'], noshow: ['No show', 'r', 'No punch was recorded for this shift.'], pe: ['Partial · excused', 'b', 'You worked part of this shift. A reason is on record.'], pu: ['Partial · unexcused', 'v', 'You worked part of this shift. No reason is on record.'] };
      var m = map[S.ts];
      var rows = [['Time in', S.ts === 'noshow' ? '—' : fmt(inM)], ['Time out', outM ? fmt(outM) : '—'], ['Break', S.ts === 'noshow' ? '—' : fmt(12 * 60 + 30) + ' – ' + fmt(12 * 60 + 30 + brk)], ['Total break', dur(brk) + ' hr'], ['Total billable', dur(Math.max(total, 0)) + ' hr']];
      var verified = S.ts === 'verified';
      return card(s).replace(/<span class="ap[^>]*>.*?<\/span>/, '').replace('data-act="det"', 'data-act="noop"') + '<div class="gap"></div>' +
        '<div class="sheetc" data-ann="status"><div class="row"><span class="chip ' + m[1] + '" style="font-size:11.5px;padding:5px 10px">' + m[0] + '</span><div class="sp"></div><span class="m">Tue, Nov 12</span></div><div class="m" style="margin-top:8px;font-size:12.5px;color:#1D2433">' + m[2] + '</div></div><div class="gap"></div>' +
        '<div class="sheetc" data-ann="hours"><div class="t" style="margin-bottom:4px">Shift details</div>' + rows.map(function (r) { return '<div class="kv"><span>' + r[0] + '</span><b>' + r[1] + '</b></div>'; }).join('') + '</div><div class="gap"></div>' +
        '<button class="btn ' + (verified ? 'dis' : '') + '" data-act="edit" data-ann="edit">' + (verified ? 'Hours confirmed' : 'Edit Timesheet') + '</button><button class="btn gh" data-act="nav" data-to="shifts" data-ann="backsch">Back to schedule</button>';
    }
    function vAlerts() {
      setBar('Notifications', false); setNav('alerts');
      var pills = '<div class="pillrow" data-ann="needs">' + [['all', 'All'], ['need', 'Needs Action'], ['unread', 'Unread']].map(function (p) { return '<button class="' + (S.filter === p[0] ? 'on' : '') + '" data-act="filter" data-f="' + p[0] + '">' + p[1] + '</button>'; }).join('') + '</div>';
      var list = S.alerts.filter(function (a) { return S.filter === 'unread' ? !a.read : true; });
      var h = list.map(function (a) {
        if (a.k === 'missed') return '<div class="nf" data-ann="missed" data-act="read" data-id="' + a.id + '"><div class="ico">' + I.bell + '</div><div style="flex:1"><div class="tt"><span>Missed Clock-In' + (a.read ? '' : ' <span style="color:var(--red)">●</span>') + '</span><small>1d ago</small></div><p>You have not clocked in for Tue, Nov 12 at General Hospital. Clock in as a callback, or ignore.</p><div class="ac"><button class="btn sm ol" data-act="ignore" data-id="' + a.id + '">Ignore</button><button class="btn sm" data-act="callback">Clock In</button></div></div></div>';
        return '<div class="nf c" data-ann="credreq" data-act="read" data-id="' + a.id + '"><div class="ico">' + I.doc + '</div><div style="flex:1"><div class="tt"><span>Credentials Request' + (a.read ? '' : ' <span style="color:var(--red)">●</span>') + '</span><small>1d ago</small></div><p>General Hospital asked for ' + reqCount() + ' credentials before your shift.</p><div class="ac"><button class="btn sm ol" data-act="ignore" data-id="' + a.id + '">Ignore</button><button class="btn sm" data-act="review">Review</button></div></div></div>';
      }).join('');
      return pills + (h || '<div class="empty">' + I.empty + '<div class="t" style="color:#1D2433;font-size:13px">You are all caught up</div><div class="m">Nothing needs your action.</div></div>');
    }
    function reqCount() { return FOLD.filter(function (f) { return S.cred[f[0]].req; }).length; }
    function vCred() {
      setBar('Credentials', false); setNav('cred');
      var n = reqCount();
      var banner = n ? '<div class="req" data-ann="credreq"><div class="ri">' + I.doc + '</div><div><b>Credential(s) Request</b><small>' + n + ' requested. General Hospital needs these before your shift.</small></div></div>' :
        '<div class="req ok" data-ann="credreq"><div class="ri">' + I.check + '</div><div><b>All requests shared</b><small>Nothing else is needed before your shift.</small></div></div>';
      var grid = '<div class="t" style="margin:2px 2px 0">All Credentials</div><div class="fg" data-ann="folders">' + FOLD.map(function (f) {
        var d = S.cred[f[0]];
        return '<button class="fd" style="--fb:' + f[4] + ';--fc:' + f[3] + '" data-act="folder" data-k="' + f[0] + '"><div class="fi">' + f[2] + '</div><b>' + f[1] + '</b><small>' + String(d.n).padStart(2, '0') + ' document' + (d.n === 1 ? '' : 's') + '</small>' + (d.req ? '<span class="rq">REQUESTED</span>' : '') + '</button>';
      }).join('') + '</div>';
      return banner + grid + '<button class="btn" data-act="addq" data-ann="addbtn">Add Document</button>';
    }

    /* ---------- render ---------- */
    function render(anim) {
      var map = { home: vHome, shifts: vShifts, details: vDetails, timesheet: vTimesheet, alerts: vAlerts, cred: vCred };
      var top = $body.scrollTop;
      $body.innerHTML = '<div class="' + (anim ? 'scr-in' + (S.dir < 0 ? ' back' : '') : '') + '">' + map[S.screen]() + '</div>';
      if (!anim) $body.scrollTop = top; else $body.scrollTop = 0;
      clearInterval(timer);
      if (S.screen === 'details' && S.clock === 'in') tick(true), timer = setInterval(tick, 400);
      if (S.screen === 'details' && S.clock === 'out') { var p = $body.querySelector('#pg'); if (p) p.style.strokeDashoffset = 0; }
      emit();
    }
    function tick(first) {
      var el = $body.querySelector('#tm'), pg = $body.querySelector('#pg'); if (!el) return;
      var sec = (Date.now() - S.t0) / 1000 * 900;           /* 15 minutes of shift per real second */
      var m = Math.min(540, Math.floor(sec / 60));
      el.textContent = Math.floor(m / 60) + ':' + ('0' + (m % 60)).slice(-2);
      pg.style.strokeDashoffset = 264 - 264 * (m / 540);
      if (m >= 540) { clearInterval(timer); }
    }
    function go(screen, o) {
      o = o || {};
      var root = ['home', 'shifts', 'cred', 'alerts'].indexOf(screen) > -1;
      if (!o.keep) { if (root) S.stack = []; else S.stack.push(S.screen); }
      S.dir = o.dir || 1; S.screen = screen;
      render(true);
    }
    function back() { var p = S.stack.pop() || 'shifts'; S.dir = -1; S.screen = p; render(true); }
    function sheet(html) { $sheet.innerHTML = '<div class="gr"></div>' + html; $scrim.classList.add('on'); $sheet.classList.add('on'); }
    function closeSheet() { $scrim.classList.remove('on'); $sheet.classList.remove('on'); }

    /* ---------- events ---------- */
    app.addEventListener('click', function (e) {
      var t = e.target.closest('[data-act]'); if (!t || !app.contains(t)) return;
      var a = t.dataset.act;
      if (a === 'noop') return;
      if (a === 'nav') { closeSheet(); go(t.dataset.to); return; }
      if (a === 'back') { back(); return; }
      if (a === 'tab') { S.tab = t.dataset.t; render(false); return; }
      if (a === 'day') { S.sel = +t.dataset.d; render(false); return; }
      if (a === 'av') { var d = +t.dataset.d, v = t.dataset.v; if (S.avail[d] === v) delete S.avail[d]; else S.avail[d] = v; render(false); return; }
      if (a === 'det') { S.det = t.dataset.id; go('details'); return; }
      if (a === 'apply') { my(S.det).applied = true; render(false); toast('Applied. Waiting for manager approval.'); return; }
      if (a === 'clockin') { S.clock = 'in'; S.t0 = Date.now(); S.ts = 'pending'; render(false); toast(S.scenario === 'call' ? 'Clocked in as a callback' : 'Clocked in'); return; }
      if (a === 'clockout') { S.clock = 'out'; render(false); toast('Clocked out. Timesheet is pending.'); return; }
      if (a === 'rejectq') { sheet('<h3>Are you sure you want to reject this shift?</h3><p>Once you reject this shift, it will no longer be assigned to you. Please confirm if you would like to proceed.</p><div class="two"><button class="btn ol" data-act="close">No</button><button class="btn red" data-act="reject">Yes, reject</button></div>'); return; }
      if (a === 'close') { closeSheet(); return; }
      if (a === 'reject') { S.shifts = S.shifts.filter(function (s) { return s.id !== S.det; }); closeSheet(); S.stack = []; S.dir = -1; S.screen = 'shifts'; render(true); toast('Shift rejected'); return; }
      if (a === 'edit') { sheet(editHtml()); return; }
      if (a === 'brk') { S.brk = Math.max(0, Math.min(120, S.brk + (+t.dataset.v))); $sheet.querySelector('#bv').textContent = S.brk + ' min'; return; }
      if (a === 'save') { closeSheet(); render(false); toast('Timesheet updated'); return; }
      if (a === 'filter') { S.filter = t.dataset.f; render(false); return; }
      if (a === 'read') { var al = S.alerts.filter(function (x) { return x.id === t.dataset.id; })[0]; if (al && !al.read) { al.read = true; render(false); } return; }
      if (a === 'ignore') { e.stopPropagation(); S.alerts = S.alerts.filter(function (x) { return x.id !== t.dataset.id; }); render(false); return; }
      if (a === 'callback') { S.scenario = 'call'; S.det = 'm1'; go('details'); return; }
      if (a === 'review') { go('cred'); return; }
      if (a === 'folder') { var k = t.dataset.k, f = FOLD.filter(function (x) { return x[0] === k; })[0]; sheet('<h3>' + f[1] + '</h3><p>' + S.cred[k].n + ' document' + (S.cred[k].n === 1 ? '' : 's') + ' on file.' + (S.cred[k].req ? ' General Hospital has requested this folder.' : '') + '</p><button class="btn" data-act="addto" data-k="' + k + '">Add document</button>'); return; }
      if (a === 'addq') { sheet('<h3>Add a document</h3><p>Choose where it belongs.</p>' + FOLD.map(function (f) { return '<button class="av-row" style="width:100%;text-align:left" data-act="addto" data-k="' + f[0] + '"><span style="color:' + f[3] + '">' + f[2] + '</span><b>' + f[1] + '</b><span style="margin-left:auto;color:#B9BFD0">' + I.chev + '</span></button>'; }).join('')); return; }
      if (a === 'addto') { var c = S.cred[t.dataset.k]; c.n++; var wasReq = c.req; c.req = false; closeSheet(); render(false); toast(wasReq ? 'Added. Request marked as shared.' : 'Document added'); return; }
    });
    $scrim.addEventListener('click', closeSheet);
    function editHtml() {
      return '<h3>Edit timesheet</h3><p>Adjust your unpaid break. Time in and out come from your punches.</p><div class="m" style="font-weight:700;letter-spacing:.06em">BREAK</div><div class="stepper"><button data-act="brk" data-v="-15" aria-label="Less">−</button><b id="bv">' + S.brk + ' min</b><button data-act="brk" data-v="15" aria-label="More">+</button></div><button class="btn" data-act="save">Save changes</button>';
    }

    /* ---------- public api ---------- */
    var api = {
      el: app, state: S,
      go: function (screen, o) { closeSheet(); go(screen, o); },
      set: function (patch) { Object.keys(patch).forEach(function (k) { S[k] = patch[k]; }); render(false); },
      reset: function () { var f = fresh(); Object.keys(f).forEach(function (k) { S[k] = f[k]; }); closeSheet(); render(true); },
      on: function (fn) { listeners.push(fn); fn(key(), S); },
      press: function (sel) { var el = app.querySelector(sel); if (el) el.click(); return !!el; },
      hl: function (name, on) { [].forEach.call(app.querySelectorAll('[data-ann="' + name + '"]'), function (n) { n.classList.toggle('hl', on); }); },
      raw: function (html, o) { o = o || {}; clearInterval(timer); $bar.innerHTML = '<h1>' + (o.title || '') + '</h1><div class="av">L</div>'; $body.innerHTML = html; if (o.nav) setNav(o.nav); },
      close: closeSheet, key: key
    };
    render(false);
    return api;
  }
  window.ShiftApp = { mount: mount };
})();
