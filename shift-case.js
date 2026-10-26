/* Shift management case study: interactive widgets */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var qa = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- reveal + count-up ---------- */
  var els = qa('.reveal');
  if (!('IntersectionObserver' in window)) els.forEach(function (e) { e.classList.add('in'); });
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach(function (e) { io.observe(e); });
  }
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  qa('[data-n]').forEach(function (el) {
    var n = +el.dataset.n; if (reduce) return;
    var done = false, o = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting && !done) { done = true; var t0 = performance.now(); (function f(t) { var p = Math.min(1, (t - t0) / 1100); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0); o.disconnect(); }
    }); o.observe(el);
  });

  /* ---------- generic seg ---------- */
  function seg(host, items, attr, cb, start) {
    host.innerHTML = items.map(function (t, i) { return '<button ' + attr + '="' + (i === (start || 0)) + '" data-i="' + i + '">' + esc(t) + '</button>'; }).join('');
    host.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; qa('button', host).forEach(function (x) { x.setAttribute(attr, x === b); }); cb(+b.dataset.i); });
  }

  /* ---------- 30-second tabs ---------- */
  var s30 = $('seg30'), panes = qa('.tl30 .pane');
  s30.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; qa('button', s30).forEach(function (x) { x.setAttribute('aria-selected', x === b); }); panes.forEach(function (p, i) { p.classList.toggle('on', i === +b.dataset.p); }); });

  /* ---------- personas ---------- */
  var PER = [
    { q: 'Is this mine, and can I clock in?', br: 'The card looks the same whether a shift is assigned or open. The punch says nothing about location or callback. I find out something is wrong after I have walked in.', nd: 'A card that states ownership by colour and chip. A punch that names its exception. A timesheet that says whether my day is finished.' },
    { q: 'Who actually worked, and was it approved?', br: 'A clock-in arrives with no type. I cannot tell a callback from a late start, or a verified location from a missing one, without calling the worker.', nd: 'Every punch carries its type, its location status and its approval trail, in order, written by the app and not typed by the worker.' },
    { q: 'Which hours are final?', br: 'Workers have two ways to challenge the same hours, and a status that does not say what kind of day it was. Corrections arrive in different shapes.', nd: 'One status per day, one layout for every status, one way to correct. The record has a single shape, so reconciliation has a single path.' }
  ];
  function persona(i) {
    var p = PER[i];
    $('perOut').innerHTML = '<div class="q">“' + p.q + '”</div><div class="cols"><div class="col"><h4>What breaks today</h4><p>' + p.br + '</p></div><div class="col need"><h4>What the screen must give</h4><p>' + p.nd + '</p></div></div>';
  }
  $('perSeg').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; qa('button', $('perSeg')).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); persona(+b.dataset.i); });
  persona(0);

  /* ---------- scrubber ---------- */
  var SC = [
    ['Offer', 'Days before', 'Is this mine, or can I take it?', 'Colour and chip say assigned or open. Apply asks the manager, and the card says it is waiting.', ['Shifts', 'Details']],
    ['Ready', 'Hours before', 'Will anything stop me?', 'A credentials request arrives as a Needs Action alert that carries its own verb: Review.', ['Alerts', 'Credentials']],
    ['Arrive', '7:00 AM', 'Can I clock in, and as what?', 'Clock In, or Clock In for Callback. Location status sits on the same card as the button.', ['Details']],
    ['On shift', 'During', 'Who has approved this, and where am I?', 'A ring for time, and a timeline of you, the manager and the punch, in order and with times.', ['Details']],
    ['Wrap up', '4:00 PM', 'Did my hours land right?', 'A timesheet with a status, the hours, and one action: Edit Timesheet.', ['Timesheet']],
    ['Closed', 'Next day', 'Is this day finished?', 'Verified. Hours confirmed, edit locked, nothing left to do.', ['Timesheet']]
  ];
  var track = $('track');
  SC.forEach(function (s, i) {
    var x = (i / 5 * 100) + '%';
    track.insertAdjacentHTML('beforeend', '<button class="nd" data-i="' + i + '" style="left:' + x + '" aria-label="' + s[0] + '">' + (i + 1) + '</button><div class="tn" data-i="' + i + '" style="left:' + x + '">' + s[0] + '<small>' + s[1] + '</small></div>');
  });
  function scrub(i) {
    $('scrub').value = i; $('tfill').style.width = (i / 5 * 100) + '%';
    qa('.nd', track).forEach(function (n, j) { n.classList.toggle('on', j === i); n.classList.toggle('past', j < i); });
    qa('.tn', track).forEach(function (n, j) { n.classList.toggle('on', j === i); });
    var s = SC[i];
    $('stage').innerHTML = '<div><span class="lab">The worker asks</span><div class="q">“' + s[2] + '”</div></div><div class="a"><span class="lab">The app answers</span><p>' + s[3] + '</p><div class="chips">' + s[4].map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</div></div>';
  }
  $('scrub').addEventListener('input', function () { scrub(+this.value); });
  track.addEventListener('click', function (e) { var b = e.target.closest('.nd'); if (b) scrub(+b.dataset.i); });
  scrub(0);

  /* ---------- spot the difference ---------- */
  var sdOld = true, sdMine = 'a';
  function sdDraw() {
    var a = { d: 'Tue<br>12', n: 'General Hospital', r: 'Staff Nurse · Emergency Dept', t: '7:00 AM – 4:00 PM' }, b = { d: 'Wed<br>13', n: 'Lakeview Health', r: 'Staff Nurse · ICU', t: '9:00 AM – 1:00 PM' };
    var mine = sdMine === 'a' ? a : b, other = sdMine === 'a' ? b : a;
    var first = Math.random() > .5; /* position only */
    var items = [['mine', mine], ['open', other]]; if (first) items.reverse();
    $('sdMini').className = 'mini' + (sdOld ? ' old' : '');
    $('sdMini').innerHTML = '<div class="tabs"><span class="on">Shifts</span><span>Availability</span></div>' + items.map(function (it) {
      var o = it[1], isOpen = it[0] === 'open';
      return '<button class="sc ' + (isOpen ? 'open' : '') + '" data-k="' + it[0] + '"><div class="d"><div>' + o.d.replace('<br>', '<br><small></small>') + '</div></div><div><b>' + o.n + '</b><span>' + o.r + '</span><em>' + o.t + '</em></div><span class="chp">' + (isOpen ? 'Open' : 'Assigned') + '</span></button>';
    }).join('');
    $('sdFix').textContent = sdOld ? 'Apply the fix' : 'Remove the fix';
    $('sdRes').innerHTML = sdOld ? 'Nothing on these cards says which is yours. <b>It is a coin flip.</b>' : 'Colour, a coloured edge and a chip now carry the answer. <b>Pick again.</b>';
  }
  $('sdMini').addEventListener('click', function (e) {
    var c = e.target.closest('.sc'); if (!c) return;
    qa('.sc', $('sdMini')).forEach(function (x) { x.classList.remove('right', 'wrong'); });
    var ok = c.dataset.k === 'mine';
    c.classList.add(ok ? 'right' : 'wrong');
    if (!ok) { var m = $('sdMini').querySelector('[data-k="mine"]'); if (m) m.classList.add('right'); }
    $('sdRes').innerHTML = ok ? (sdOld ? '<b>Right, but only by luck.</b> There was nothing to go on. Apply the fix and try again.' : '<b>Right, and you did not have to think.</b> That is the whole point of the pattern.') : (sdOld ? '<b>Wrong.</b> You just accepted a shift that was not yours, and nothing warned you.' : '<b>Wrong.</b> Look at the edge and the chip, they are different.');
  });
  $('sdFix').addEventListener('click', function () { sdOld = !sdOld; sdDraw(); });
  $('sdAgain').addEventListener('click', function () { sdMine = Math.random() > .5 ? 'a' : 'b'; sdDraw(); });
  sdDraw();

  /* ---------- process ---------- */
  var PR = [
    ['Frame', 'Three questions became the test for every screen.', ['Wrote the three questions: what am I working, can I clock in, will it count', 'Split the journey into get in, the day, the record', 'Agreed up front what I would not claim without data'], 'Journey in three stages and the success questions', 'A screen that cannot answer its question does not move on.'],
    ['Map', 'Every state a day can be in, listed before drawing.', ['Calendar: five day states', 'Timesheet: five statuses', 'Punch: location, callback and approval'], 'State tables for the calendar, the punch and the timesheet', 'No state without a screen, and no screen without a state.'],
    ['Explore', 'I drew the alternatives, then retired them on purpose.', ['A home stacking ring, wages, chart and schedules', 'Dispute as a parallel action beside edit', 'A separate calendar for open shifts'], 'Explorations kept in the file and marked retired', 'Every retired idea needs a one-line reason.'],
    ['Decide', 'One layout per job, one signal per state.', ['Colour names the day, the tab names the list', 'The exception goes on the button', 'One layout carries all five statuses'], 'The decision log: chose, rejected, why', 'When two things do the same job, keep the clearer one.'],
    ['Hand off', '84 screens, and every state included.', ['Frames grouped by flow', 'Empty, pop-up, toast and success states', 'Edge frames beside the happy path'], 'The design file, organised for build', 'Engineering can build without asking what happens if.']
  ];
  var stp = $('stp'), pp = $('pp');
  stp.innerHTML = PR.map(function (p, i) { return '<button data-i="' + i + '"><i>' + (i + 1) + '</i>' + p[0] + '</button>'; }).join('');
  function proc(i) {
    qa('button', stp).forEach(function (b, j) { b.classList.toggle('on', j === i); b.classList.toggle('past', j < i); });
    stp.style.setProperty('--p', i / 4);
    var p = PR[i];
    pp.innerHTML = '<div class="pp"><div><h4>What I did</h4><span class="big">' + p[1] + '</span><ul>' + p[2].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div><div><h4>Artifact</h4><p>' + p[3] + '</p></div><div class="gate"><h4>Decision gate</h4><p>' + p[4] + '</p></div></div>';
  }
  stp.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) proc(+b.dataset.i); });
  proc(0);

  /* ---------- apps ---------- */
  var hero = ShiftApp.mount($('heroApp'));
  var HP = $('heroPh'), timers = [], playing = true, seq = [
    [600, function () { hero.go('shifts'); }], [2600, function () { hero.press('[data-act=tab][data-t=open]'); }], [4000, function () { hero.press('[data-act=day][data-d="13"]'); }],
    [5400, function () { hero.press('[data-act=det]'); }], [7000, function () { hero.press('[data-act=apply]'); }],
    [9200, function () { hero.go('alerts'); }], [11200, function () { hero.press('[data-act=review]'); }],
    [13200, function () { hero.press('[data-act=addq]'); }], [14600, function () { hero.press('[data-act=addto][data-k="id"]'); }],
    [17200, function () { hero.reset(); hero.go('home'); }]
  ];
  function play() { stop(); if (!playing) return; seq.forEach(function (s) { timers.push(setTimeout(s[1], s[0])); }); timers.push(setTimeout(play, 19200)); }
  function stop() { timers.forEach(clearTimeout); timers = []; }
  HP.addEventListener('pointerdown', function () { playing = false; stop(); HP.classList.add('touched'); }, true);
  new IntersectionObserver(function (es) { if (es[0].isIntersecting) { if (playing && !timers.length) play(); } else stop(); }, { threshold: .3 }).observe(HP);

  var P = ShiftApp.mount($('protoApp'));
  var visitedTs = false;
  var MIS = [
    ['Pick up an open shift', 'Open Shifts, Wednesday the 13th. Apply.', function (S) { return S.shifts.some(function (s) { return s.id === 'o1' && s.applied; }); }, function () { P.go('shifts'); P.set({ tab: 'open', sel: 13 }); }],
    ['Clock in as a callback', 'Start from the Missed Clock-In alert.', function (S) { return S.scenario === 'call' && S.clock !== 'idle'; }, function () { P.go('alerts'); }],
    ['Clock out and read the status', 'Then open the timesheet.', function (S) { return visitedTs; }, function () { P.set({ det: 'm1' }); P.go('details'); }],
    ['Answer the credentials request', 'Add a document to every requested folder.', function (S) { return !Object.keys(S.cred).some(function (k) { return S.cred[k].req; }); }, function () { P.go('cred'); }]
  ];
  var mis = $('mis');
  mis.innerHTML = MIS.map(function (m, i) { return '<li data-i="' + i + '"><div class="ck">✓</div><div><strong>' + (i + 1) + '. ' + m[0] + '</strong><span>' + m[1] + '</span></div><button data-go="' + i + '">Take me there</button></li>'; }).join('');
  mis.addEventListener('click', function (e) { var b = e.target.closest('[data-go]'); if (b) MIS[+b.dataset.go][3](); });
  function missions(S) {
    var n = 0;
    MIS.forEach(function (m, i) { var d = m[2](S); if (d) n++; mis.children[i].classList.toggle('done', d); });
    $('mbar').style.width = (n / 4 * 100) + '%'; $('win').classList.toggle('on', n === 4);
  }
  var NOTES = {
    'home': ['Home', 'Leads with what changed and the week. The shift list stays on its own tab, so Home never competes with it.', [[null, 'Two modules, not four', 'Announcements and the week. Wages, the ring and the schedule list each have a better home.']]],
    'shifts-my': ['My Shifts', 'One week, one card. Tap a day, tap a card.', [['selday', 'Selected day', 'A filled square. It does not open a second screen.'], ['legend', 'Week legend', 'Five meanings, named under the dates and never hidden.'], ['tabs', 'Three tabs', 'The tab changes the list, not the calendar.'], ['card', 'Shift card', 'Facility, role, hours, and a sun or moon for morning or night.'], ['pending', 'Pending chip', 'The only extra status a card can carry.']]],
    'shifts-open': ['Open Shifts', 'Same calendar and card. Only the colour changes.', [['tabs', 'Green tab', 'Open is green and assigned is blue, and the colour follows into the card.'], ['legend', 'Same legend', 'The week keeps one meaning in both lists.'], ['card', 'Open card', 'Tap it to see the details and apply.']]],
    'shifts-avail': ['Availability', 'Availability reuses the day colours, so the week reads the same everywhere.', [[null, 'Locked when assigned', 'Days with a shift cannot be marked, so the calendar never contradicts itself.']]],
    'details-my': ['Shift details', 'The punch names its exception. Switch the scenario under the phone, then press the button.', [['clockstate', 'State in words', 'You are not clocked in. A ring shows time, and the text says the state.'], ['location', 'Location', 'Tracking status sits on the same card as the punch.'], ['callback', 'The button', 'Clock In for Callback is its own label, not a quiet variation.'], ['timeline', 'Timeline', 'You, then the manager, then the punch, newest first.']]],
    'details-open': ['Open shift details', 'Everything needed to decide, and one verb.', [['apply', 'Apply', 'The result says what happens next: the manager confirms.']]],
    'timesheet': ['Timesheet', 'Change the status under the phone. The layout never moves.', [['status', 'Status first', 'The status and one line about it come before the hours.'], ['hours', 'Hours', 'In, out, break and billable stay visible and in the same place.'], ['edit', 'Edit Timesheet', 'The one way to change hours. Locked once verified.'], ['backsch', 'Back to schedule', 'The day stays tied to the shift it came from.']]],
    'alerts': ['Alerts', 'A request is a task. Act on it from the card.', [['needs', 'Filters', 'Needs Action gets its own filter, so what is blocking you comes first.'], ['missed', 'Missed clock-in', 'Ignore, or Clock In. The next verb is on the card.'], ['credreq', 'Credentials request', 'Ignore, or Review.']]],
    'cred': ['Credentials', 'The count of requested documents comes before the folders.', [['credreq', 'Request banner', 'How many were asked for, and by whom, before anything else.'], ['folders', 'Six folders', 'Requested folders are flagged right where the document lives.'], ['addbtn', 'Add Document', 'One action, always in the same place.']]]
  };
  var demo = $('demo'), pn = $('pn'), lastKey = '';
  var TSL = [['pending', 'Pending'], ['verified', 'Verified'], ['noshow', 'No show'], ['pe', 'Partial · excused'], ['pu', 'Partial · unexcused']];
  function drawDemo(key, S) {
    var h = '';
    if (key === 'details-my') h = '<span class="lab">Scenario</span><div class="seg">' + [['normal', 'Normal'], ['loc', 'Location off'], ['call', 'Callback']].map(function (x) { return '<button data-sc="' + x[0] + '" aria-pressed="' + (S.scenario === x[0]) + '">' + x[1] + '</button>'; }).join('') + '</div>';
    else if (key === 'timesheet') h = '<span class="lab">Status</span><div class="seg">' + TSL.map(function (x) { return '<button data-ts="' + x[0] + '" aria-pressed="' + (S.ts === x[0]) + '">' + x[1] + '</button>'; }).join('') + '</div>';
    demo.innerHTML = h; demo.classList.toggle('hide', !h);
  }
  demo.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.dataset.sc) P.set({ scenario: b.dataset.sc });
    if (b.dataset.ts) P.set({ ts: b.dataset.ts });
  });
  function drawNotes(key) {
    var n = NOTES[key]; if (!n) return;
    pn.innerHTML = '<div class="swp"><h3>' + n[0] + '</h3><p class="sub">' + n[1] + '</p><ul class="notes">' + n[2].map(function (x, i) { return '<li data-a="' + (x[0] || '') + '"><b>' + (i + 1) + '</b><div><strong>' + x[1] + '</strong><span>' + x[2] + '</span></div></li>'; }).join('') + '</ul></div>';
  }
  pn.addEventListener('mouseover', function (e) { var l = e.target.closest('li'); qa('li', pn).forEach(function (x) { if (x.dataset.a) P.hl(x.dataset.a, x === l); }); });
  pn.addEventListener('mouseleave', function () { qa('li', pn).forEach(function (x) { if (x.dataset.a) P.hl(x.dataset.a, false); }); });
  P.on(function (key, S) {
    if (key === 'timesheet' && S.clock === 'out') visitedTs = true;
    if (key !== lastKey) { lastKey = key; drawNotes(key); }
    drawDemo(key, S); missions(S);
  });
  $('rst').addEventListener('click', function () { visitedTs = false; P.reset(); });

  /* ---------- colour widget ---------- */
  var DEF = { av: 'Available. You told the schedule you can work this day.', my: 'My shift. Assigned to you. Blue follows into the My Shifts card.', less: 'Less preferred. You can work it, but you would rather not.', na: 'N/A. You cannot work this day.', open: 'Open. A shift still needs someone. Green follows into the Open Shifts card.' };
  var week = $('week'), lg = $('legend');
  lg.addEventListener('click', function (e) { var b = e.target.closest('.lg'); if (!b) return; var was = b.getAttribute('aria-pressed') === 'true'; qa('.lg', lg).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); if (was) { week.removeAttribute('data-f'); $('def').textContent = 'Choose a state to see which days carry it.'; } else { b.setAttribute('aria-pressed', 'true'); week.setAttribute('data-f', b.dataset.s); $('def').textContent = DEF[b.dataset.s]; } });
  $('cvd').addEventListener('change', function () { week.style.filter = this.value === 'none' ? '' : 'url(#f-' + this.value + ')'; lg.style.filter = week.style.filter; });
  $('shp').addEventListener('change', function () { week.classList.toggle('shapes', this.checked); });

  /* ---------- punch widget ---------- */
  var PS = { type: 'sched', loc: 'on', appr: 'yes' };
  function punch() {
    var call = PS.type === 'call', off = PS.loc === 'off', no = PS.appr === 'no';
    var helper = no ? 'You can clock in once your manager approves.' : off ? 'Location tracking disabled' : 'Location tracking on';
    var mg = no ? '<b>Awaiting approval.</b> No punch is possible yet.' : '<b>' + (call ? 'Callback punch' : 'Scheduled punch') + '</b> · ' + (off ? 'location not verified' : 'location verified');
    $('pOut').innerHTML = '<div class="rg"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="#EDEEF4" stroke-width="9"/><circle cx="50" cy="50" r="42" fill="none" stroke="#E5484D" stroke-width="9" stroke-linecap="round" stroke-dasharray="264" stroke-dashoffset="264" transform="rotate(-90 50 50)"/><text x="50" y="56" text-anchor="middle" font-family="Inter,system-ui" font-weight="800" font-size="16" fill="#1D2433">--:--</text></svg><div><div class="t">You are not clocked in</div><div class="h ' + (off && !no ? 'w' : '') + '">' + helper + '</div></div></div><button class="cta" ' + (no ? 'disabled' : '') + '>' + (call ? 'Clock In for Callback' : 'Clock In') + '</button><div class="mg">Manager sees: ' + mg + '</div>';
    var rules = [['approval = not yet', 'disable the button, say why', no], ['shift type = callback', 'label the button for what it is', call], ['location = off', 'write it on the card, flag the punch', off && !no], ['always', 'show who approved, in order', true]];
    $('trace').innerHTML = rules.map(function (r) { return '<div class="' + (r[2] ? 'hit' : '') + '">if ' + r[0] + ' → ' + r[1] + '</div>'; }).join('');
  }
  qa('[data-g]').forEach(function (g) { g.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; qa('button', g).forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); PS[g.dataset.g] = b.dataset.v; punch(); }); });
  punch();

  /* ---------- lifecycle ---------- */
  var LC = {
    sched: ['Scheduled', 'var(--s-my)', 'A blue card in My Shifts, with the day marked blue.', 'Clock In when the shift starts, or Reject before it does.', 'No. There is nothing to edit yet.'],
    on: ['On the clock', 'var(--s-my)', 'A timer ring and the approval timeline.', 'Clock Out.', 'No. The clock is still running.'],
    pending: ['Pending', 'var(--warn)', 'The status, and a line saying you are working or waiting for your manager.', 'Edit Timesheet if the hours are wrong. Otherwise wait.', 'Yes, through Edit Timesheet.'],
    verified: ['Verified', 'var(--ok)', 'Hours confirmed by your manager.', 'Nothing. The day is finished.', 'No. Editing is locked.'],
    noshow: ['No show', 'var(--bad)', 'The status, and no hours, because no punch was recorded.', 'Edit Timesheet is the only route to change it.', 'Yes, through Edit Timesheet.'],
    pe: ['Partial · excused', 'var(--s-my)', 'Part of the shift, with a reason on record.', 'Edit Timesheet if the hours are off.', 'Yes, through Edit Timesheet.'],
    pu: ['Partial · unexcused', 'var(--s-less)', 'Part of the shift, with no reason on record.', 'Edit Timesheet is the only route to change it.', 'Yes, through Edit Timesheet.']
  };
  var flow = $('flow'), lcSel = 'pending';
  function nb(k, sub, cls) { var d = LC[k]; return '<button class="nodeb" style="--c:' + d[1] + '" data-k="' + k + '" aria-pressed="' + (lcSel === k) + '">' + d[0] + '<small>' + sub + '</small></button>'; }
  function drawFlow() {
    var live = function (a, b) { return lcSel === a || lcSel === b ? ' live' : ''; };
    flow.innerHTML = nb('sched', 'WORKER · BEFORE') + '<div class="ar' + live('sched', 'on') + '"></div>' + nb('on', 'WORKER · DURING') + '<div class="ar' + live('on', 'pending') + '"></div>' + nb('pending', 'AFTER CLOCK OUT') + '<div class="ar' + live('pending', 'verified') + '"></div>' +
      '<div class="outs">' + nb('verified', 'RESOLVES TO') + nb('noshow', 'RESOLVES TO') + nb('pe', 'RESOLVES TO') + nb('pu', 'RESOLVES TO') + '</div>';
    var d = LC[lcSel];
    $('lcd').innerHTML = '<div><h4>Status</h4><span class="badge" style="--c:' + d[1] + '">' + d[0] + '</span></div><div><h4>Worker sees</h4><p>' + d[2] + '</p></div><div><h4>Next step</h4><p>' + d[3] + '</p></div><div><h4>Editable</h4><p>' + d[4] + '</p></div>';
  }
  flow.addEventListener('click', function (e) { var b = e.target.closest('.nodeb'); if (!b) return; lcSel = b.dataset.k; drawFlow(); });
  drawFlow();

  /* ---------- decisions ---------- */
  var DEC = [
    ['01', 'Colour carries the shift type', 'One week, one card. Assigned is blue, open is green.', 'A separate calendar for open shifts.', 'The worker is asking what this day is, not which list they are in.', 'Five colours need a second cue for colour-blind workers. Logged as the next iteration.'],
    ['02', 'The punch states the exception', 'Clocked out, location and callback written on the card.', 'A single Clock In that hides callback, location and who approved.', 'A punch that does not say what kind of punch it is becomes an argument later.', 'The card carries more text, so it needs more height on small phones.'],
    ['03', 'Edit, not dispute', 'One layout for every status, with one way to correct.', 'Dispute as a parallel action beside edit.', 'Two ways to challenge the same hours splits the record.', 'A worker who wants to contest loses a loud, separate button. The status line has to carry that.'],
    ['04', 'A home that leads', 'Announcements and the week. The shift list keeps its tab.', 'An early home stacking a clock-in ring, wages, a chart and schedules.', 'It answered everything at once and hid the next action.', 'Shifts moved one tap away from Home.']
  ];
  $('dec').innerHTML = DEC.map(function (d) { return '<button class="flip" aria-pressed="false"><div class="in"><div class="f"><span class="num">DECISION ' + d[0] + '</span><h3>' + d[1] + '</h3><p>' + d[2] + '</p><span class="hint">Click to see what I rejected →</span></div><div class="b"><dl><div><dt>Rejected</dt><dd class="rej">' + d[3] + '</dd></div><div><dt>Why</dt><dd class="why">' + d[4] + '</dd></div><div><dt>What it cost</dt><dd>' + d[5] + '</dd></div></dl></div></div></button>'; }).join('');
  $('dec').addEventListener('click', function (e) { var b = e.target.closest('.flip'); if (b) b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); });

  /* before / after */
  var A = ShiftApp.mount($('cmpA')), B = ShiftApp.mount($('cmpB'));
  B.raw('<div class="sheetc" style="padding:10px;margin-bottom:8px"><div class="row" style="gap:10px"><div class="ring" style="width:64px;height:64px"><svg viewBox="0 0 100 100"><circle class="tr" cx="50" cy="50" r="42"/><circle class="pg" cx="50" cy="50" r="42" stroke-dasharray="264" stroke-dashoffset="70" style="--rc:var(--green)"/></svg><b style="font-size:10px">6:56 AM</b></div><div style="flex:1"><div class="t" style="font-size:12.5px">General Hospital</div><div class="m" style="font-size:10.5px">Staff Nurse, Emergency</div><div class="btn sm" style="margin-top:5px;height:26px;font-size:11px;width:100%">Clock In</div></div></div></div>' +
    '<div class="row" style="gap:8px;margin-bottom:8px"><div class="sheetc" style="flex:1;padding:9px"><div class="m" style="font-size:9.5px">Wages Earned</div><b>$2,150.00</b></div><div class="sheetc" style="flex:1;padding:9px"><div class="m" style="font-size:9.5px">Work This Week</div><b>45 Hrs</b></div></div>' +
    '<div class="sheetc" style="padding:10px;margin-bottom:8px"><div class="row"><b style="font-size:12px">Total Hours</b><div class="sp"></div><span class="chip">Weekly ▾</span></div><div class="row" style="gap:12px;margin-top:8px"><div style="width:74px;height:74px;border-radius:50%;background:conic-gradient(#12A594 0 45%,#E98A0C 45% 62%,#F5C518 62% 78%,#16A36A 78% 100%);display:grid;place-items:center"><div style="width:44px;height:44px;border-radius:50%;background:#fff"></div></div><div style="font-size:9.5px;line-height:1.9;color:#6B7384">Total Cumulative Hours <b>45:00</b><br>Total Billable Hours <b>45:00</b><br>Total Break Hours <b>04:00</b><br>Total Overtime Hours <b>01:00</b></div></div></div>' +
    '<div class="sheetc" style="padding:10px"><b style="font-size:12px">Schedules</b><div class="row" style="gap:6px;margin-top:8px"><div style="flex:1;background:#E1F6EC;border-radius:10px;padding:7px;font-size:9.5px">Mercy General<br>7 Hrs</div><div style="flex:1;background:#E1F6EC;border-radius:10px;padding:7px;font-size:9.5px">Trinity Central<br>7 Hrs</div><div style="flex:1;background:#E1F6EC;border-radius:10px;padding:7px;font-size:9.5px">Xylo Health<br>7 Hrs</div></div></div>', { title: 'Welcome back, Lia', nav: 'home' });
  var cmpR = $('cmpR');
  function cmp() { var v = +cmpR.value; $('cmpBw').style.clipPath = 'inset(0 0 0 ' + v + '%)'; $('cmpH').style.left = v + '%'; }
  cmpR.addEventListener('input', cmp); cmp();

  /* ---------- metrics ---------- */
  var MET = [
    ['Wrong-shift pickups', 'Shifts a worker applies for and then rejects within 24 hours.', 'shift_applied, shift_rejected', 'Down', 'Open-shift fill rate must not fall.'],
    ['Clock-in friction', 'Seconds from opening a Missed Clock-In alert to a completed punch.', 'alert_opened, punch_completed', 'Down', 'Share of unverified punches must not rise.'],
    ['Hours disputes', 'Timesheet edits saved per verified day, and hours-related support tickets.', 'timesheet_edit_saved, status_verified', 'Down', 'Payroll corrections after verification must not rise.'],
    ['Credential readiness', 'Requests closed from the alert versus from the folders, and time to share.', 'credential_request_opened, document_added', 'Up', 'Rejected-document rate must not rise.']
  ];
  function met(i) { var m = MET[i]; $('metOut').innerHTML = '<h4>' + m[0] + '</h4><dl><div><dt>What it measures</dt><dd>' + m[1] + '</dd></div><div><dt>Events to instrument</dt><dd><b>' + m[2] + '</b></dd></div><div><dt>Direction I expect</dt><dd><b>' + m[3] + '</b></dd></div><div><dt>Guardrail</dt><dd>' + m[4] + '</dd></div></dl>'; }
  seg($('metSeg'), MET.map(function (m) { return m[0]; }), 'aria-pressed', met, 0); met(0);

  /* ---------- accordions ---------- */
  qa('.acc').forEach(function (a) { a.querySelector('button').addEventListener('click', function () { var o = a.dataset.open === '1'; a.dataset.open = o ? '0' : '1'; this.setAttribute('aria-expanded', !o); }); });
})();
