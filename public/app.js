(function () {
  "use strict";

  var CHECK_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>';
  var CHECK_SVG_SM = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>';
  var CHECK_ROUND = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>';
  var X_SVG = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg>';
  var X_SVG_SM = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg>';
  var CLOSE_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"></path></svg>';
  var PHOTO_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2l1.2-1.8A1 1 0 0 1 8.5 4.7h7a1 1 0 0 1 .8.5L17.5 7h2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5Z"></path><circle cx="12" cy="12.5" r="3.2"></circle></svg>';
  var DONE_SVG = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>';

  var OFFER_GROUPS = [
    { label: 'Food & drink', items: ['Breakfast included', 'On-site restaurant', 'Bar or lounge', 'Room service', '24-hour room service', 'Snack bar', 'Coffee & tea bar', 'Special diet menus (vegan, halal, gluten-free)'] },
    { label: 'Wellness & recreation', items: ['Pool', 'Indoor pool', 'Fitness center', 'Spa & wellness center', 'Hot tub or sauna', 'Massage services', 'Kids’ pool or play area', 'Golf course or tennis court'] },
    { label: 'Business & events', items: ['Conference rooms', 'Business center', 'Banquet or event space', 'Meeting rooms with AV equipment', 'Fax & photocopying', 'High-speed Wi-Fi'] },
    { label: 'Rooms & comfort', items: ['Air conditioning', 'In-room safe', 'Minibar', 'Balcony or view rooms', 'Non-smoking rooms', 'Family rooms', 'Soundproofed rooms', 'Laundry service'] },
    { label: 'Getting around & parking', items: ['Free parking', 'Valet parking', 'Airport shuttle', 'EV charging', 'Car hire desk', 'Public transport nearby'] },
    { label: 'Front desk & services', items: ['24-hour front desk', 'Concierge service', 'Currency exchange', 'Luggage storage', 'Express check-in/check-out', 'Tour or ticket desk'] },
    { label: 'Safety & accessibility', items: ['Wheelchair accessible', 'Elevator', 'Fire extinguishers', 'CCTV & 24-hour security', 'Smoke-free property', 'Pet friendly'] }
  ];
  var TONES = ['Unhurried', 'Plainspoken', 'Neighborly', 'Honest about limits', 'Warm', 'Understated', 'Confident', 'Witty', 'Reassuring', 'Down-to-earth', 'Playful', 'Polished'];
  var ARCHETYPES = [
    { key: 'Caregiver', title: 'The Caregiver', desc: 'Nurturing and attentive — guests feel looked after, not upsold' },
    { key: 'Sage', title: 'The Sage', desc: 'Knowledgeable local guide — trusted advice over sales pitches' },
    { key: 'Explorer', title: 'The Explorer', desc: 'Adventurous and independent — for guests chasing new ground' },
    { key: 'Ruler', title: 'The Ruler', desc: 'Polished and in-command — refined, exacting, high standards' },
    { key: 'Everyman', title: 'The Everyman', desc: 'Unpretentious and down-to-earth — no airs, genuinely friendly' },
    { key: 'Creator', title: 'The Creator', desc: 'Design-led and original — every detail intentionally made' },
    { key: 'Jester', title: 'The Jester', desc: 'Playful and light — makes a stay feel like fun, not formality' },
    { key: 'Magician', title: 'The Magician', desc: 'Transformative escape — guests leave changed, restored' }
  ];
  var FEELINGS = ['Relaxed', 'Pampered', 'Adventurous', 'Connected to nature', 'Sophisticated', 'Welcomed like family', 'Inspired', 'Safe & cared for', 'Energized', 'Nostalgic'];
  var DIMS = [
    { key: 'd_formal', left: 'Formal', right: 'Casual' },
    { key: 'd_serious', left: 'Serious', right: 'Playful' },
    { key: 'd_reserved', left: 'Reserved', right: 'Bold' },
    { key: 'd_factual', left: 'Matter-of-fact', right: 'Expressive' }
  ];
  var GUESTS = [
    { title: 'Quiet-seeking couples', desc: 'Privacy, a calm pace, unhurried mornings' },
    { title: 'Dive & snorkel travelers', desc: 'Gear prep, reef timing, water-day logistics' },
    { title: 'Families on longer stays', desc: 'Room to spread out and quiet downtime' },
    { title: 'Anglers, no trailered boat', desc: 'Charter access without marina promises' },
    { title: 'Remote workers & long stays', desc: 'Reliable quiet, weekly rates, good light' },
    { title: 'Weddings & small groups', desc: 'Whole-property buyouts and simple gatherings' },
    { title: 'Seasonal snowbirds', desc: 'Month-long escapes from the cold' },
    { title: 'Eco & nature travelers', desc: 'Birding, dark skies, slow low-key days' }
  ];
  var AGES = ['18–24', '25–34', '35–44', '45–54', '55–64', '65+'];
  var ORIGINS = ['United States', 'Canada', 'United Kingdom', 'Germany', 'Scandinavia', 'Rest of Europe', 'Latin America'];
  var INTERESTS = ['Diving & snorkeling', 'Fishing', 'Kayaking & paddling', 'Birding & nature', 'Food & dining', 'Wellness & quiet', 'Boating', 'Family fun', 'Photography', 'Stargazing', 'History & culture'];
  var TRIP = ['Weekend', 'Week-long', 'Extended / monthly'];
  var RADII = ['Just next door', 'Whole town / island', 'Greater area', 'Everywhere within a drive'];
  var MONITOR = ['Festivals & fairs', 'Concerts & shows', 'Local experiences & tours', 'Special events & celebrations', 'Conferences & business events', 'Sports events & tournaments', 'Food & drink events', 'Art & culture', 'Seasonal & holiday happenings', 'Fishing tournaments', 'Dive & snorkel conditions', 'Wildlife & nature events'];
  var LABELS = ['The basics', 'What you offer', 'Your voice', 'Guests & audience', 'What to watch nearby'];

  var PRESET_OFFERS = OFFER_GROUPS.reduce(function (acc, g) { return acc.concat(g.items); }, []);
  var PRESET_GUESTS = GUESTS.map(function (g) { return g.title; });

  var STEP1_PREVIEW_FIELDS = ['hotelName', 'location', 'propertyType', 'address'];

  var state = {
    step: 1, preview: false, submitting: false, submitError: '', stepError: '',
    hotelName: '', location: '', propertyType: '', address: '', rooms: '', website: '',
    offers: [], offerDraft: '',
    archetype: '', tones: [],
    d_formal: 2, d_serious: 2, d_reserved: 2, d_factual: 2,
    feelings: [], differentiator: '',
    love: [], loveDraft: '', banned: [], banDraft: '',
    tagline: '', voiceStatement: '',
    guests: [], guestDraft: '', ages: [], origins: [], originDraft: '',
    interests: [], interestDraft: '', trip: [],
    radius: '', monitor: [], monitorDraft: ''
  };

  function esc(s) {
    return String(s === null || s === undefined ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function join(arr) {
    if (!arr || arr.length === 0) return '—';
    if (arr.length <= 2) return arr.join(', ');
    return arr.slice(0, 2).join(', ') + ' +' + (arr.length - 2);
  }

  // ---- state mutation ----
  function tog(field, value) {
    var a = state[field];
    state[field] = a.indexOf(value) > -1 ? a.filter(function (x) { return x !== value; }) : a.concat([value]);
  }
  function setOne(field, value) { state[field] = value; }
  function addCustom(field, draftField) {
    var v = (state[draftField] || '').trim();
    if (!v) return false;
    if (state[field].indexOf(v) === -1) state[field] = state[field].concat([v]);
    state[draftField] = '';
    return true;
  }

  // ---- chip / card renderers ----
  function chip(label, selected, field, value, small, action) {
    return '<button type="button" class="chip' + (selected ? ' is-selected' : '') + '" data-action="' + (action || 'toggle') + '" data-field="' + field + '" data-value="' + esc(value) + '">' +
      (selected ? (small ? CHECK_SVG_SM : CHECK_SVG) : '') + esc(label) + '</button>';
  }
  function toggleChips(list, field, small) {
    var sel = state[field];
    return list.map(function (l) { return chip(l, sel.indexOf(l) > -1, field, l, small); }).join('');
  }
  function singleChips(list, field, small) {
    var cur = state[field];
    return list.map(function (l) { return chip(l, cur === l, field, l, small, 'setOne'); }).join('');
  }
  function customChips(list, field) {
    var preset = list;
    return state[field].filter(function (l) { return preset.indexOf(l) === -1; }).map(function (l) {
      return '<span class="custom-chip">' + esc(l) + '<button type="button" class="rm" data-action="toggle" data-field="' + field + '" data-value="' + esc(l) + '">' + X_SVG + '</button></span>';
    }).join('');
  }
  function addBox(field, draftField, placeholder, width) {
    return '<div class="add-box">' +
      '<input type="text" id="draft-' + draftField + '" data-bind="' + draftField + '" data-draft-for="' + field + '" value="' + esc(state[draftField]) + '" placeholder="' + esc(placeholder) + '" style="width:' + (width || 180) + 'px">' +
      '<button type="button" data-action="add" data-field="' + field + '" data-draft="' + draftField + '">Add</button>' +
      '</div>';
  }
  function card(title, desc, selected, field, value) {
    return '<button type="button" class="card-btn' + (selected ? ' is-selected' : '') + '" data-action="toggle" data-field="' + field + '" data-value="' + esc(value) + '">' +
      '<div class="card-top"><span class="card-title">' + esc(title) + '</span>' +
      (selected ? '<span class="card-check">' + CHECK_ROUND + '</span>' : '') + '</div>' +
      '<span class="card-desc">' + esc(desc) + '</span></button>';
  }

  // ---- step templates ----
  function stepBasics() {
    return '<div class="step" style="animation:rise .3s ease">' +
      '<h2>First, the basics.</h2>' +
      '<p class="lede">What should we call your place, and where can guests find it?</p>' +
      (state.stepError ? '<div class="error-note">' + esc(state.stepError) + '</div>' : '') +
      '<div class="field-col">' +
        field('hotelName', 'What’s your hotel called?', 'e.g. Pelican Post Inn & Cottages') +
        '<div class="field-row2">' +
          field('location', 'Where is it?', 'e.g. Lower Keys, FL') +
          field('propertyType', 'What kind of place?', 'e.g. Independent inn & cottages') +
        '</div>' +
        field('address', 'Full address', 'e.g. 29401 Overseas Highway, Big Pine Key, FL 33043') +
        '<div class="field-row2">' +
          field('rooms', 'How many rooms?', 'e.g. 22 rooms & cottages') +
          field('website', 'Website', 'e.g. yourhotel.com') +
        '</div>' +
      '</div>' +
      '<p class="foot-note">This is how we’ll recognize your hotel everywhere online. You can polish it anytime.</p>' +
    '</div>';
  }
  function field(name, label, placeholder) {
    return '<label class="field"><span>' + esc(label) + '</span>' +
      '<input class="text-input" type="text" data-bind="' + name + '" value="' + esc(state[name]) + '" placeholder="' + esc(placeholder) + '"></label>';
  }

  function stepOffers() {
    var groups = OFFER_GROUPS.map(function (g) {
      return '<div class="group-block"><div class="section-label">' + esc(g.label) + '</div><div class="chip-wrap">' + toggleChips(g.items, 'offers', true) + '</div></div>';
    }).join('');
    return '<div class="step" style="animation:rise .3s ease">' +
      '<h2>What can guests count on?</h2>' +
      '<p class="lede">Tap everything that’s genuinely true — and add anything we’ve missed. We’ll only mention these after you’ve approved each one.</p>' +
      groups +
      '<div class="custom-section">' +
        '<div class="section-label">Anything we missed</div>' +
        '<div class="chip-wrap" style="align-items:center">' +
          customChips(PRESET_OFFERS, 'offers') +
          addBox('offers', 'offerDraft', 'Free parking, pool, Wi-Fi…', 180) +
        '</div>' +
      '</div>' +
      '<p class="foot-note">Only what you pick can appear in content — and you approve every mention before it publishes.</p>' +
    '</div>';
  }

  function stepVoice() {
    var archCards = ARCHETYPES.map(function (a) { return card(a.title, a.desc, state.archetype === a.key, 'archetype', a.key); }).join('');
    var dims = DIMS.map(function (d) {
      var cur = state[d.key];
      var dots = [0, 1, 2, 3, 4].map(function (i) {
        return '<button type="button" class="dot' + (i === cur ? ' active' : '') + '" data-action="setNum" data-field="' + d.key + '" data-value="' + i + '"></button>';
      }).join('');
      return '<div class="dim-row"><span class="dim-left">' + esc(d.left) + '</span>' +
        '<div class="dim-track"><div class="dim-line"></div>' + dots + '</div>' +
        '<span class="dim-right">' + esc(d.right) + '</span></div>';
    }).join('');
    var loveChips = state.love.map(function (w) {
      return '<span class="word-chip love">' + esc(w) + '<button type="button" class="rm" data-action="toggle" data-field="love" data-value="' + esc(w) + '">' + X_SVG_SM + '</button></span>';
    }).join('');
    var banChips = state.banned.map(function (w) {
      return '<span class="word-chip banned">' + esc(w) + '<button type="button" class="rm" data-action="toggle" data-field="banned" data-value="' + esc(w) + '">' + X_SVG_SM + '</button></span>';
    }).join('');
    return '<div class="step" style="animation:rise .3s ease">' +
      '<h2>How should it sound?</h2>' +
      '<p class="lede">This is your brand voice — the rules every draft is written inside. The more you shape it here, the more each article sounds unmistakably like you. You still approve everything.</p>' +

      '<div class="section-label tight">Brand character</div>' +
      '<p class="section-sub">The role your hotel plays in a guest’s story — this shapes how confidently and how warmly we write.</p>' +
      '<div class="card-grid" style="margin-bottom:28px">' + archCards + '</div>' +

      '<div class="section-label tight">Voice attributes</div>' +
      '<p class="section-sub">Pick the traits that feel like you.</p>' +
      '<div class="chip-wrap">' + toggleChips(TONES, 'tones', true) + '</div>' +

      '<div class="section-label tight" style="margin-top:30px">Where you sit on each scale</div>' +
      '<p class="section-sub">Slide toward the side that fits your brand.</p>' +
      dims +

      '<div class="section-label tight" style="margin-top:28px">How should guests feel?</div>' +
      '<p class="section-sub">The emotional payoff every piece of content should point toward.</p>' +
      '<div class="chip-wrap">' + toggleChips(FEELINGS, 'feelings', true) + '</div>' +

      '<div style="margin-top:26px">' +
        '<div class="section-label tight" style="margin-bottom:11px">What makes you different</div>' +
        '<p class="section-sub" style="margin-bottom:10px">The thing a competitor down the road can’t honestly say about themselves.</p>' +
        '<textarea class="ta" style="min-height:56px" data-bind="differentiator" placeholder="What sets you apart...">' + esc(state.differentiator) + '</textarea>' +
      '</div>' +

      '<div class="two-col">' +
        '<div><div class="section-label tight" style="color:#2E7D5B;margin-bottom:11px">Words we love</div>' +
          '<div class="chip-wrap" style="align-items:center">' + loveChips +
          '<div class="word-add love"><input type="text" id="draft-loveDraft" data-bind="loveDraft" data-draft-for="love" value="' + esc(state.loveDraft) + '" placeholder="Add">' +
          '<button type="button" data-action="add" data-field="love" data-draft="loveDraft">Add</button></div></div></div>' +
        '<div><div class="section-label tight" style="color:#B0764A;margin-bottom:11px">Never say these</div>' +
          '<div class="chip-wrap" style="align-items:center">' + banChips +
          '<div class="word-add banned"><input type="text" id="draft-banDraft" data-bind="banDraft" data-draft-for="banned" value="' + esc(state.banDraft) + '" placeholder="Add">' +
          '<button type="button" data-action="add" data-field="banned" data-draft="banDraft">Add</button></div></div></div>' +
      '</div>' +

      '<div style="margin-top:26px">' +
        '<div class="section-label tight" style="margin-bottom:11px">Tagline <span style="text-transform:none;color:#A79A85;font-weight:500">(optional)</span></div>' +
        '<input class="line-input" type="text" data-bind="tagline" value="' + esc(state.tagline) + '" placeholder="A short line that sums you up">' +
      '</div>' +

      '<div style="margin-top:22px">' +
        '<div class="section-label tight" style="margin-bottom:11px">Your voice in one line</div>' +
        '<textarea class="ta" style="min-height:64px" data-bind="voiceStatement" placeholder="Describe your voice in a sentence...">' + esc(state.voiceStatement) + '</textarea>' +
      '</div>' +

      '<div class="sample-box">' +
        '<div class="label">A sample in your voice</div>' +
        '<p id="voiceSample">' + esc(voiceSampleText()) + '</p>' +
      '</div>' +
    '</div>';
  }

  function voiceSampleText() {
    if (state.voiceStatement.trim()) return '“' + state.voiceStatement.trim() + '”';
    return '“As you make your selections, a sample in your voice will take shape here.”';
  }

  function stepAudience() {
    var guestCards = GUESTS.map(function (g) { return card(g.title, g.desc, state.guests.indexOf(g.title) > -1, 'guests', g.title); }).join('');
    return '<div class="step" style="animation:rise .3s ease">' +
      '<h2>Who do you want to reach?</h2>' +
      '<p class="lede">Pick the guests you want more of, then sketch who they are. We’ll favor them whenever we spot a moment to post.</p>' +

      '<div class="section-label tight" style="margin-bottom:13px">Ideal guests</div>' +
      '<div class="card-grid">' + guestCards + '</div>' +
      '<div class="chip-wrap" style="align-items:center;margin-top:12px">' +
        customChips(PRESET_GUESTS, 'guests') +
        addBox('guests', 'guestDraft', 'Add another kind of guest…', 190) +
      '</div>' +

      '<div class="hr"></div>' +
      '<div class="tiny-heading">A bit more about them</div>' +

      '<div class="section-label">Age</div>' +
      '<div class="chip-wrap">' + toggleChips(AGES, 'ages', true) + '</div>' +

      '<div class="section-label" style="margin-top:24px">Where they come from</div>' +
      '<div class="chip-wrap" style="align-items:center">' + toggleChips(ORIGINS, 'origins', true) + customChips(ORIGINS, 'origins') + addBox('origins', 'originDraft', 'Add a country…', 130) + '</div>' +

      '<div class="section-label" style="margin-top:24px">What they’re into</div>' +
      '<div class="chip-wrap" style="align-items:center">' + toggleChips(INTERESTS, 'interests', true) + customChips(INTERESTS, 'interests') + addBox('interests', 'interestDraft', 'Add an interest…', 140) + '</div>' +

      '<div class="section-label" style="margin-top:24px">Typical stay</div>' +
      '<div class="chip-wrap">' + toggleChips(TRIP, 'trip', true) + '</div>' +
    '</div>';
  }

  function stepMonitor() {
    return '<div class="step" style="animation:rise .3s ease">' +
      '<h2>What should we watch nearby?</h2>' +
      '<p class="lede">Tell us what’s worth covering around you. When something’s coming up, we’ll write the articles and posts that pull in searches — and bring those guests to your door.</p>' +

      '<div class="section-label tight" style="margin-bottom:12px">How far should we look?</div>' +
      '<div class="chip-wrap">' + singleChips(RADII, 'radius', true) + '</div>' +

      '<div class="section-label tight" style="margin:26px 0 12px">What should we watch for?</div>' +
      '<div class="chip-wrap" style="align-items:center">' + toggleChips(MONITOR, 'monitor', true) + customChips(MONITOR, 'monitor') + addBox('monitor', 'monitorDraft', 'A regatta, a food-truck night…', 200) + '</div>' +

      '<div class="sample-box tight">' +
        '<div class="label">Why this helps</div>' +
        '<p>When something’s coming up nearby, we draft the articles guests actually search for — so your hotel shows up right as they plan. <span style="color:#8A7A63">e.g. a guide to a local flea market, published weeks ahead.</span></p>' +
      '</div>' +
    '</div>';
  }

  function stepDone() {
    var name = state.hotelName.trim() || 'Your hotel';
    return '<div class="done-wrap">' +
      '<div class="done-icon">' + DONE_SVG + '</div>' +
      '<h2>You’re all set.</h2>' +
      '<p>' + esc(name) + ' is ready. We’ll start watching for good moments to post — and you’ll approve every draft before it goes live.</p>' +
      '<div class="summary-card">' +
        summaryRow('Property', name) +
        summaryRow('Things you offer', state.offers.length + ' selected') +
        summaryRow('Voice', join(state.tones)) +
        summaryRow('Reaching for', join(state.guests)) +
        summaryRow('Watching nearby', state.monitor.length + ' topics · ' + (state.radius || '—')) +
      '</div>' +
      '<div class="done-actions">' +
        '<button type="button" class="btn-ghost" data-action="restart">Add another hotel</button>' +
        '<button type="button" class="btn-cta">Go to dashboard</button>' +
      '</div>' +
    '</div>';
  }
  function summaryRow(k, v) {
    return '<div class="summary-row"><span class="k">' + esc(k) + '</span><span class="v">' + esc(v) + '</span></div>';
  }

  var STEP_RENDERERS = { 1: stepBasics, 2: stepOffers, 3: stepVoice, 4: stepAudience, 5: stepMonitor };

  // ---- chrome (progress, footer, step label) ----
  function renderChrome() {
    var isWizard = state.step <= 5;
    var stepNum = Math.min(state.step, 5);
    document.getElementById('progressTrack').style.display = isWizard ? '' : 'none';
    document.getElementById('progressBar').style.width = (stepNum / 5 * 100) + '%';
    document.getElementById('stepLabel').style.display = isWizard ? '' : 'none';
    document.getElementById('stepLabel').textContent = 'Step ' + stepNum + ' of 5 · ' + LABELS[stepNum - 1];

    var footer = document.getElementById('footer');
    footer.style.display = isWizard ? '' : 'none';
    var backBtn = document.getElementById('backBtn');
    backBtn.style.visibility = state.step > 1 ? 'visible' : 'hidden';
    document.getElementById('autosaveNote').style.display = state.step === 1 ? '' : 'none';
    var cta = document.getElementById('ctaBtn');
    cta.textContent = state.submitting ? 'Saving…' : (state.step < 5 ? 'Continue' : 'Create hotel profile');
    cta.disabled = state.submitting;

    document.getElementById('previewToggle').style.display = isWizard ? '' : 'none';
    if (!isWizard) { state.preview = false; }
  }

  function renderStepContent() {
    var el = document.getElementById('stepContent');
    if (state.step === 6) {
      el.innerHTML = stepDone();
    } else {
      el.innerHTML = (STEP_RENDERERS[state.step] || stepBasics)();
    }
  }

  function renderPreview() {
    var panel = document.getElementById('previewPanel');
    panel.hidden = !state.preview;
    if (!state.preview) return;

    var name = state.hotelName.trim();
    var subParts = [state.location.trim(), state.propertyType.trim()].filter(Boolean);
    var blocks = '';
    if (state.offers.length) {
      blocks += '<div class="preview-block"><div class="pb-label">What you offer</div><div class="preview-pills">' +
        state.offers.map(function (o) { return '<span class="preview-pill">' + esc(o) + '</span>'; }).join('') + '</div></div>';
    }
    if (state.archetype) {
      blocks += '<div class="preview-block"><div class="pb-label">Brand character</div><div class="pb-value">The ' + esc(state.archetype) + '</div></div>';
    }
    if (state.tones.length) {
      blocks += '<div class="preview-block"><div class="pb-label">Voice</div><div class="pb-value">' + esc(join(state.tones)) + '</div></div>';
    }
    if (state.guests.length) {
      blocks += '<div class="preview-block"><div class="pb-label">Reaching for</div><div class="pb-value">' + esc(join(state.guests)) + '</div></div>';
    }
    if (state.interests.length) {
      blocks += '<div class="preview-block"><div class="pb-label">Interests</div><div class="pb-value">' + esc(join(state.interests)) + '</div></div>';
    }
    if (state.monitor.length) {
      blocks += '<div class="preview-block"><div class="pb-label">Watching · ' + esc(state.radius || '—') + '</div><div class="pb-value">' + esc(join(state.monitor)) + '</div></div>';
    }

    panel.innerHTML =
      '<div class="ph-head"><div class="ph-title">Your profile so far</div>' +
        '<button type="button" class="ph-close" data-action="toggle-preview">' + CLOSE_SVG + '</button></div>' +
      '<div class="preview-photo">' + PHOTO_SVG + '<span>Add a cover photo</span></div>' +
      '<h3>' + esc(name || 'Your hotel name') + '</h3>' +
      '<div class="preview-sub">' + esc(subParts.length ? subParts.join(' · ') : '—') + '</div>' +
      '<div class="preview-addr"><span>Address</span><span>' + esc(state.address.trim() || '—') + '</span></div>' +
      blocks;
  }

  function render(opts) {
    renderChrome();
    renderStepContent();
    renderPreview();
    if (opts && opts.focus) {
      var el = document.querySelector(opts.focus);
      if (el) { el.focus(); var v = el.value; el.value = ''; el.value = v; }
    }
  }

  // ---- navigation ----
  function validateStep1() {
    if (!state.hotelName.trim()) {
      state.stepError = 'Please tell us your hotel’s name before continuing.';
      return false;
    }
    state.stepError = '';
    return true;
  }

  function next() {
    if (state.step === 1 && !validateStep1()) { render(); return; }
    if (state.step === 5) { submit(); return; }
    state.step = Math.min(6, state.step + 1);
    render();
    document.querySelector('.main').scrollTop = 0;
  }
  function back() {
    state.step = Math.max(1, state.step - 1);
    render();
    document.querySelector('.main').scrollTop = 0;
  }
  function restart() {
    Object.assign(state, {
      step: 1, preview: false, submitting: false, submitError: '', stepError: '',
      hotelName: '', location: '', propertyType: '', address: '', rooms: '', website: '',
      offers: [], offerDraft: '',
      archetype: '', tones: [],
      d_formal: 2, d_serious: 2, d_reserved: 2, d_factual: 2,
      feelings: [], differentiator: '',
      love: [], loveDraft: '', banned: [], banDraft: '',
      tagline: '', voiceStatement: '',
      guests: [], guestDraft: '', ages: [], origins: [], originDraft: '',
      interests: [], interestDraft: '', trip: [],
      radius: '', monitor: [], monitorDraft: ''
    });
    render();
  }

  function buildPayload() {
    return {
      basics: {
        hotelName: state.hotelName.trim(), location: state.location.trim(), propertyType: state.propertyType.trim(),
        address: state.address.trim(), rooms: state.rooms.trim(), website: state.website.trim()
      },
      offers: { selected: state.offers.filter(function (o) { return PRESET_OFFERS.indexOf(o) > -1; }), custom: state.offers.filter(function (o) { return PRESET_OFFERS.indexOf(o) === -1; }) },
      voice: {
        archetype: state.archetype, tones: state.tones,
        dimensions: { formal: state.d_formal, serious: state.d_serious, reserved: state.d_reserved, factual: state.d_factual },
        feelings: state.feelings, differentiator: state.differentiator.trim(),
        love: state.love, banned: state.banned, tagline: state.tagline.trim(), voiceStatement: state.voiceStatement.trim()
      },
      audience: {
        guests: state.guests.filter(function (g) { return PRESET_GUESTS.indexOf(g) > -1; }),
        guestsCustom: state.guests.filter(function (g) { return PRESET_GUESTS.indexOf(g) === -1; }),
        ages: state.ages,
        origins: state.origins.filter(function (o) { return ORIGINS.indexOf(o) > -1; }),
        originsCustom: state.origins.filter(function (o) { return ORIGINS.indexOf(o) === -1; }),
        interests: state.interests.filter(function (i) { return INTERESTS.indexOf(i) > -1; }),
        interestsCustom: state.interests.filter(function (i) { return INTERESTS.indexOf(i) === -1; }),
        trip: state.trip
      },
      monitoring: {
        radius: state.radius,
        topics: state.monitor.filter(function (m) { return MONITOR.indexOf(m) > -1; }),
        topicsCustom: state.monitor.filter(function (m) { return MONITOR.indexOf(m) === -1; })
      }
    };
  }

  function submit() {
    state.submitting = true;
    state.submitError = '';
    render();
    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildPayload())
    }).then(function (res) {
      if (!res.ok) return res.json().then(function (j) { throw new Error(j.error || 'save_failed'); });
      return res.json();
    }).then(function () {
      state.submitting = false;
      state.step = 6;
      render();
      document.querySelector('.main').scrollTop = 0;
    }).catch(function (err) {
      state.submitting = false;
      state.submitError = 'Couldn’t save your profile — please try again.';
      state.stepError = state.submitError;
      render();
      console.error(err);
    });
  }

  // ---- event delegation ----
  var app = document.getElementById('app');

  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var action = el.dataset.action;
    var focusSel = null;
    if (action === 'toggle') { tog(el.dataset.field, el.dataset.value); }
    else if (action === 'setOne') { setOne(el.dataset.field, el.dataset.value); }
    else if (action === 'setNum') { setOne(el.dataset.field, Number(el.dataset.value)); }
    else if (action === 'add') {
      var added = addCustom(el.dataset.field, el.dataset.draft);
      if (added) focusSel = '#draft-' + el.dataset.draft;
    } else if (action === 'toggle-preview') { state.preview = !state.preview; }
    else if (action === 'restart') { e.preventDefault(); restart(); return; }
    else { return; }
    render(focusSel ? { focus: focusSel } : null);
  });

  document.getElementById('backBtn').addEventListener('click', back);
  document.getElementById('ctaBtn').addEventListener('click', next);
  document.getElementById('previewToggle').addEventListener('click', function () {
    state.preview = !state.preview;
    render();
  });

  app.addEventListener('input', function (e) {
    var el = e.target;
    var bind = el.dataset.bind;
    if (!bind) return;
    state[bind] = el.value;
    if (STEP1_PREVIEW_FIELDS.indexOf(bind) > -1) renderPreview();
    if (bind === 'voiceStatement') {
      var sample = document.getElementById('voiceSample');
      if (sample) sample.textContent = voiceSampleText();
    }
  });

  app.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var el = e.target;
    var draftFor = el.dataset.draftFor;
    if (!draftFor) return;
    e.preventDefault();
    var added = addCustom(draftFor, el.dataset.bind);
    render(added ? { focus: '#draft-' + el.dataset.bind } : null);
  });

  render();
})();
