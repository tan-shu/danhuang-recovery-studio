const defaultTherapists = [
  { id: 'li', name: '李老师', role: '康复治疗师', experience: '8 年临床经验', skills: ['肩颈体态', '运动损伤'], bio: '专注于肩颈不适、久坐体态与运动相关疼痛的功能恢复。治疗中会结合动作评估、手法处理与循序渐进的训练计划，帮助客户建立更稳定、可持续的日常活动方式。', certifications: ['运动康复认证', '筋膜技术认证'], availability: '周一至周六 · 09:30 - 18:00', color: '#1b769e' },
  { id: 'zhou', name: '周老师', role: '物理治疗师', experience: '6 年临床经验', skills: ['腰背疼痛', '产后康复'], bio: '主要服务腰背疼痛、骨盆稳定和产后运动恢复人群。重视每位客户的生活方式与活动目标，用清晰的阶段目标帮助身体重新找回力量与信心。', certifications: ['功能筛查认证', '产后康复进阶'], availability: '周二至周日 · 10:00 - 19:00', color: '#15a99d' },
  { id: 'chen', name: '陈老师', role: '运动康复师', experience: '5 年训练经验', skills: ['功能训练', '跑步损伤'], bio: '擅长将康复训练带回真实运动场景，重点关注跑步、力量训练和日常活动中的动作效率。适合希望在恢复后逐步回到运动节奏的客户。', certifications: ['体能训练认证', '跑步损伤训练'], availability: '周一至周五 · 11:00 - 20:00', color: '#d59339' },
];

const defaultServices = [
  { id: 'assessment', name: '初次评估与治疗', detail: '60 分钟 · 建档、评估与初步方案', price: '¥298', icon: 'clipboard-check' },
  { id: 'spine', name: '脊柱功能康复', detail: '60 分钟 · 手法治疗与动作训练', price: '使用计划', icon: 'activity' },
  { id: 'training', name: '运动损伤治疗', detail: '60 分钟 · 疼痛管理与功能恢复', price: '使用计划', icon: 'dumbbell' },
];

const dates = [
  { key: 'today', day: '今天', date: '08.23' },
  { key: 'tomorrow', day: '明天', date: '08.24' },
  { key: 'mon', day: '周一', date: '08.25' },
  { key: 'tue', day: '周二', date: '08.26' },
];

const defaultConfig = {
  brand: '蛋黄康复工作室',
  clinic: '滨江康复中心',
  customer: '林然',
  heroTitle: '从一次评估，\n开始有节奏的康复。',
  heroSubtitle: '专业评估、到店治疗与居家训练，都在同一份康复计划里。',
  planName: '脊柱功能康复计划',
  planStage: '第 2 阶段 · 稳定与强化',
  planDone: '4',
  planTotal: '12',
  planExpiry: '2026.10.30',
};

let therapists = JSON.parse(localStorage.getItem('rehab-therapists') || JSON.stringify(defaultTherapists));
let services = JSON.parse(localStorage.getItem('rehab-services') || JSON.stringify(defaultServices));
let config = { ...defaultConfig, ...JSON.parse(localStorage.getItem('rehab-config') || '{}') };

const state = {
  booking: JSON.parse(localStorage.getItem('rehab-booking') || 'null'),
  selectedService: 'spine', selectedTherapist: 'li', selectedDate: 'tomorrow', selectedTime: '',
  records: JSON.parse(localStorage.getItem('rehab-records') || '[{"date":"2026.08.18","title":"第 4 次治疗 · 稳定训练","content":"颈肩紧张感较前减轻。继续进行胸椎活动度练习与核心激活，每天 12 分钟。"},{"date":"2026.08.11","title":"第 3 次治疗 · 动作重建","content":"久坐后腰背紧张评分由 6 降至 4，建议工作时每 45 分钟起身活动。"}]'),
};

const el = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);

function renderTherapists() {
  el('#therapist-list').innerHTML = therapists.slice(0, 2).map((therapist) => `
    <button class="therapist-card therapist-card-button" data-action="open-therapist" data-therapist="${therapist.id}">
      <span class="therapist-photo" style="background:${therapist.color}">${therapist.name.slice(0, 1)}</span>
      <div class="therapist-info"><strong>${therapist.name} <small>${therapist.role}</small></strong><p>${therapist.experience}</p><div class="therapist-tags">${therapist.skills.map((skill) => `<span>${skill}</span>`).join('')}</div></div>
      <span class="icon-button therapist-open-icon" aria-hidden="true"><i class="icon icon-arrow-up-right"></i></span>
    </button>`).join('');
}

function renderBooking() {
  el('#service-options').innerHTML = services.map((service) => `
    <button class="choice-card ${state.selectedService === service.id ? 'selected' : ''}" data-action="select-service" data-service="${service.id}">
      <span class="choice-icon"><i class="icon icon-${service.icon}"></i></span><span><strong>${service.name}</strong><small>${service.detail}</small></span><span class="price">${service.price}</span>
    </button>`).join('');
  el('#therapist-options').innerHTML = therapists.map((therapist) => `
    <button class="therapist-option ${state.selectedTherapist === therapist.id ? 'selected' : ''}" data-action="select-therapist" data-therapist="${therapist.id}">
      <span class="mini-photo" style="background:${therapist.color}">${therapist.name.slice(0, 1)}</span><strong>${therapist.name}</strong><small>${therapist.role.replace('康复治疗师', '康复师')}</small>
    </button>`).join('');
  el('#date-options').innerHTML = dates.map((date) => `
    <button class="date-option ${state.selectedDate === date.key ? 'selected' : ''}" data-action="select-date" data-date="${date.key}"><span>${date.day}</span><strong>${date.date}</strong></button>`).join('');
  const unavailable = state.selectedDate === 'today' ? ['10:00', '15:30'] : ['09:30'];
  el('#time-options').innerHTML = ['09:30', '10:00', '14:00', '15:30', '16:30', '18:00'].map((time) => `
    <button class="time-option ${state.selectedTime === time ? 'selected' : ''}" data-action="select-time" data-time="${time}" ${unavailable.includes(time) ? 'disabled' : ''}>${time}</button>`).join('');
  el('#confirm-booking').disabled = !state.selectedTime;
}

function renderArrival() {
  const booking = state.booking;
  el('#arrival-empty').classList.toggle('hidden', Boolean(booking));
  el('#arrival-booked').classList.toggle('hidden', !booking);
  el('#appointment-state').textContent = booking ? '已预约' : '尚未预约';
  el('#appointment-state').className = `state-pill ${booking ? 'active' : 'pending'}`;
  if (booking) {
    booking.service = services.find((service) => service.id === booking.service.id) || booking.service;
    booking.therapist = therapists.find((therapist) => therapist.id === booking.therapist.id) || booking.therapist;
    el('#appointment-time').textContent = booking.time;
    el('#appointment-service').textContent = booking.service.name;
    el('#appointment-details').textContent = `${booking.therapist.name} · ${config.clinic}`;
  }
}

function renderConfig() {
  el('#brand-name').textContent = config.brand;
  el('#clinic-name').textContent = config.clinic;
  el('#hero-title').textContent = config.heroTitle.replace(/<br\s*\/?\s*>/g, '\n');
  el('#hero-subtitle').textContent = config.heroSubtitle;
  el('#customer-name').textContent = config.customer;
  el('#customer-initial').textContent = config.customer.slice(0, 1) || '客';
  el('#plan-name').textContent = config.planName;
  el('#plan-stage').textContent = config.planStage;
  el('#plan-done').textContent = config.planDone;
  el('#plan-total').textContent = config.planTotal;
  el('#plan-expiry').textContent = config.planExpiry;
  document.title = `${config.brand} | 预约与治疗管理`;
}

function persistSettings() {
  localStorage.setItem('rehab-config', JSON.stringify(config));
  localStorage.setItem('rehab-therapists', JSON.stringify(therapists));
  localStorage.setItem('rehab-services', JSON.stringify(services));
}

function renderAdmin() {
  const serviceForms = services.map((service) => `<form class="admin-editor" data-editor="service" data-id="${service.id}">
    <div class="editor-title"><strong>${escapeHtml(service.name)}</strong><button type="button" class="delete-button" data-action="delete-service" data-id="${service.id}" title="删除项目" aria-label="删除 ${escapeHtml(service.name)}"><i class="icon icon-trash-2"></i></button></div>
    <label>项目名称<input name="name" value="${escapeHtml(service.name)}" /></label><label>服务说明<input name="detail" value="${escapeHtml(service.detail)}" /></label><label>价格 / 权益说明<input name="price" value="${escapeHtml(service.price)}" /></label>
    <button class="button secondary full" type="submit">保存项目</button></form>`).join('');
  const therapistForms = therapists.map((therapist) => `<form class="admin-editor" data-editor="therapist" data-id="${therapist.id}">
    <div class="editor-title"><strong>${escapeHtml(therapist.name)}</strong><button type="button" class="delete-button" data-action="delete-therapist" data-id="${therapist.id}" title="删除康复师" aria-label="删除 ${escapeHtml(therapist.name)}"><i class="icon icon-trash-2"></i></button></div>
    <label>姓名<input name="name" value="${escapeHtml(therapist.name)}" /></label><label>职称<input name="role" value="${escapeHtml(therapist.role)}" /></label><label>经验描述<input name="experience" value="${escapeHtml(therapist.experience)}" /></label><label>擅长方向（用逗号分开）<input name="skills" value="${escapeHtml(therapist.skills.join('，'))}" /></label><label>个人介绍<textarea name="bio">${escapeHtml(therapist.bio || '')}</textarea></label><label>认证 / 标签（用逗号分开）<input name="certifications" value="${escapeHtml((therapist.certifications || []).join('，'))}" /></label><label>可预约时间<input name="availability" value="${escapeHtml(therapist.availability || '')}" /></label>
    <button class="button secondary full" type="submit">保存康复师</button></form>`).join('');
  el('#admin-content').innerHTML = `
    <section class="admin-section"><div class="admin-section-heading"><div><h2>基础资料</h2><p>保存后，客户端首页会立即同步。</p></div><span class="state-pill active">本机草稿</span></div>
      <form id="admin-basics" class="admin-form"><label>工作室名称<input name="brand" value="${escapeHtml(config.brand)}" /></label><label>门店名称<input name="clinic" value="${escapeHtml(config.clinic)}" /></label><label>客户演示名称<input name="customer" value="${escapeHtml(config.customer)}" /></label><label>首页标题<input name="heroTitle" value="${escapeHtml(config.heroTitle.replace('<br />', ' '))}" /></label><label>首页说明<textarea name="heroSubtitle">${escapeHtml(config.heroSubtitle)}</textarea></label><button class="button primary full" type="submit"><i class="icon icon-save"></i> 保存基础资料</button></form></section>
    <section class="admin-section"><div class="admin-section-heading"><div><h2>治疗项目</h2><p>客户预约页会以这里的项目为准。</p></div><button class="icon-button" data-action="add-service" title="新增治疗项目" aria-label="新增治疗项目"><i class="icon icon-plus"></i></button></div><div class="editor-list">${serviceForms}</div></section>
    <section class="admin-section"><div class="admin-section-heading"><div><h2>康复师团队</h2><p>可维护预约列表和首页展示卡片。</p></div><button class="icon-button" data-action="add-therapist" title="新增康复师" aria-label="新增康复师"><i class="icon icon-plus"></i></button></div><div class="editor-list">${therapistForms}</div></section>
    <section class="admin-section"><div class="admin-section-heading"><div><h2>疗程计划</h2><p>用于客户查看康复阶段与次数。</p></div></div><form id="admin-plan" class="admin-form"><label>计划名称<input name="planName" value="${escapeHtml(config.planName)}" /></label><label>当前阶段<input name="planStage" value="${escapeHtml(config.planStage)}" /></label><div class="form-pair"><label>已完成次数<input name="planDone" type="number" min="0" value="${escapeHtml(config.planDone)}" /></label><label>总次数<input name="planTotal" type="number" min="1" value="${escapeHtml(config.planTotal)}" /></label></div><label>计划有效期<input name="planExpiry" value="${escapeHtml(config.planExpiry)}" /></label><button class="button primary full" type="submit"><i class="icon icon-save"></i> 保存疗程计划</button></form></section>
    <section class="admin-section reset-section"><div><h2>演示数据</h2><p>清除本机修改，并恢复到最初的示例内容。</p></div><button class="button danger" data-action="reset-demo"><i class="icon icon-rotate-ccw"></i> 恢复示例</button></section>`;
}

function showView(name) {
  document.querySelectorAll('.view').forEach((view) => view.classList.remove('active'));
  el(`#${name}-view`).classList.add('active');
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
  const actions = { home: 'home', booking: 'open-booking', plan: 'show-plan', profile: 'profile' };
  const active = document.querySelector(`[data-action="${actions[name]}"]`);
  if (active?.classList.contains('nav-item')) active.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function modal(title, content, className = '') {
  el('#modal-root').innerHTML = `<div class="modal-backdrop" data-action="close-modal"><section class="modal ${className}" role="dialog" aria-modal="true" aria-label="${title}"><div class="modal-head"><h2>${title}</h2><button class="icon-button" data-action="close-modal-button" aria-label="关闭"><i class="icon icon-x"></i></button></div>${content}</section></div>`;
}

function closeModal() { el('#modal-root').innerHTML = ''; }
function toast(message) { const node = el('#toast'); node.textContent = message; node.classList.add('show'); clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => node.classList.remove('show'), 2600); }

function showAppointments() {
  const current = state.booking ? `<article class="appointment-card"><div class="date-badge"><span>${state.booking.date.day}</span><b>${state.booking.date.date.slice(-2)}</b></div><div><h3>${state.booking.service.name}</h3><p>${state.booking.time} · ${state.booking.therapist.name}<br />滨江康复中心 · 2F 治疗区</p></div><span class="state-pill active">已确认</span></article>` : '<div class="empty-state"><div class="empty-icon"><i class="icon icon-calendar-x"></i></div><div><h3>还没有预约</h3><p>选一个方便的时间，让康复计划开始推进。</p></div></div>';
  modal('我的预约', `<div class="modal-list">${current}<article class="appointment-card"><div class="date-badge"><span>08 月</span><b>18</b></div><div><h3>脊柱功能康复</h3><p>16:30 · 李老师<br />已完成</p></div><span class="state-pill">已完成</span></article></div><button class="button primary full modal-action" data-action="open-booking">新增预约</button>`);
}

function showRecords() {
  modal('康复记录', `<div class="modal-list">${state.records.map((record) => `<article class="record-card"><time>${escapeHtml(record.date)}</time><h3>${escapeHtml(record.title)}</h3><p>${escapeHtml(record.content)}</p></article>`).join('')}</div><button class="button secondary full modal-action" data-action="add-record"><i class="icon icon-plus"></i> 新增治疗记录</button>`);
}

function openAssessment() {
  modal('评估建档', `<form class="assessment-form" id="assessment-form"><label>本次关注部位<select name="area"><option>肩颈与上背</option><option>腰背与骨盆</option><option>膝踝与下肢</option><option>运动损伤恢复</option></select></label><label>不适程度（0 - 10）<input name="score" type="number" min="0" max="10" value="4" /></label><label>当前困扰<textarea name="note" placeholder="例如：久坐后颈肩紧张，转头受限。"></textarea></label><button class="button primary full" type="submit">保存评估信息</button></form>`);
  el('#assessment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    state.records.unshift({ date: '2026.08.23', title: `评估建档 · ${data.get('area')}`, content: `不适程度：${data.get('score')} / 10。${data.get('note') || '已完成基础评估，待治疗师补充方案。'}` });
    localStorage.setItem('rehab-records', JSON.stringify(state.records)); closeModal(); toast('评估已写入康复档案');
  });
}

function addRecord() {
  modal('新增治疗记录', `<form class="assessment-form" id="record-form"><label>治疗阶段<input name="title" value="第 5 次治疗 · 功能训练" /></label><label>治疗反馈<textarea name="content" placeholder="记录本次反应、训练完成度和下次重点。"></textarea></label><button class="button primary full" type="submit">保存治疗记录</button></form>`);
  el('#record-form').addEventListener('submit', (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); state.records.unshift({ date: '2026.08.23', title: data.get('title'), content: data.get('content') || '治疗记录已保存。' }); localStorage.setItem('rehab-records', JSON.stringify(state.records)); closeModal(); toast('治疗记录已保存'); });
}

function openWorkspace() {
  const currentRow = state.booking ? `<div class="workspace-row"><time>${state.booking.time}</time><div><strong>${config.customer}</strong><small>${state.booking.service.name} · ${state.booking.therapist.name}</small></div><span>待到店</span></div>` : '';
  modal('治疗师工作台', `<div class="workspace-summary"><div><strong>${state.booking ? '3' : '2'}</strong><span>今日预约</span></div><div><strong>1</strong><span>待补记录</span></div><div><strong>86%</strong><span>到店率</span></div></div><div class="workspace-table">${currentRow}<div class="workspace-row"><time>14:00</time><div><strong>吴晨</strong><small>腰背疼痛治疗 · 周老师</small></div><span>已确认</span></div><div class="workspace-row"><time>15:30</time><div><strong>蒋远</strong><small>初次评估 · 李老师</small></div><span>待确认</span></div></div><p class="workspace-note">正式接入时，这里可通过 Microsoft Graph 将确认的预约写入 Outlook Calendar；客户治疗记录仍以业务数据库为准。</p><button class="button primary full modal-action" data-action="open-admin"><i class="icon icon-sliders-horizontal"></i> 后台数据管理</button>`, 'workspace');
}

function showTraining() { modal('今日居家训练', `<div class="modal-list"><article class="record-card"><time>约 12 分钟</time><h3>胸椎伸展与呼吸</h3><p>使用卷起的毛巾垫于上背，保持自然呼吸，完成 2 组，每组 8 次。</p></article><article class="record-card"><time>约 8 分钟</time><h3>颈部深屈肌激活</h3><p>轻轻收下巴，避免耸肩。完成 3 组，每组 10 次。</p></article></div><button class="button primary full modal-action" data-action="training-done"><i class="icon icon-circle-check"></i> 标记今日已完成</button>`); }

function showTeam() { modal('康复师团队', `<div class="therapist-list">${therapists.map((therapist) => `<article class="therapist-card"><span class="therapist-photo" style="background:${therapist.color}">${therapist.name.slice(0, 1)}</span><div class="therapist-info"><strong>${therapist.name} · ${therapist.role}</strong><p>${therapist.experience}</p><div class="therapist-tags">${therapist.skills.map((skill) => `<span>${skill}</span>`).join('')}</div></div><button class="button secondary" data-action="choose-therapist" data-therapist="${therapist.id}">预约</button></article>`).join('')}</div>`); }

function showTherapistProfile(id) {
  const therapist = therapists.find((item) => item.id === id); if (!therapist) return;
  const bio = therapist.bio || `${therapist.name}专注于${therapist.skills.join('、')}，会根据你的评估结果安排适合当前阶段的治疗与训练。`;
  const certifications = therapist.certifications?.length ? therapist.certifications : ['专业康复服务'];
  modal(`${therapist.name}的介绍`, `<div class="therapist-profile"><div class="therapist-profile-head"><span class="profile-portrait" style="background:${therapist.color}">${therapist.name.slice(0, 1)}</span><div><span class="section-kicker">REHABILITATION THERAPIST</span><h3>${escapeHtml(therapist.name)} <small>${escapeHtml(therapist.role)}</small></h3><p>${escapeHtml(therapist.experience)}</p></div></div><section class="profile-intro"><h4>个人介绍</h4><p>${escapeHtml(bio)}</p></section><section class="profile-intro"><h4>擅长方向</h4><div class="therapist-tags">${therapist.skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join('')}</div></section><section class="profile-intro"><h4>专业认证</h4><div class="therapist-tags">${certifications.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div></section><div class="availability"><i class="icon icon-calendar-clock"></i><span>可预约时间</span><strong>${escapeHtml(therapist.availability || '请在预约页查看可约时段')}</strong></div><button class="button primary full modal-action" data-action="choose-therapist" data-therapist="${therapist.id}"><i class="icon icon-calendar-check"></i> 预约 ${escapeHtml(therapist.name)}</button></div>`);
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]'); if (!target) return;
  const { action } = target.dataset;
  if (action === 'home') showView('home');
  if (action === 'open-booking') { closeModal(); showView('booking'); }
  if (action === 'show-plan') showView('plan');
  if (action === 'profile') showView('profile');
  if (action === 'close-modal' && target === event.target) closeModal();
  if (action === 'close-modal-button') closeModal();
  if (action === 'show-appointments') showAppointments();
  if (action === 'show-records') showRecords();
  if (action === 'open-assessment') openAssessment();
  if (action === 'add-record') addRecord();
  if (action === 'show-training') showTraining();
  if (action === 'training-done') { closeModal(); toast('很好，今日训练已完成'); }
  if (action === 'show-team') showTeam();
  if (action === 'open-therapist') showTherapistProfile(target.dataset.therapist);
  if (action === 'open-workspace') openWorkspace();
  if (action === 'open-admin') { closeModal(); renderAdmin(); showView('admin'); }
  if (action === 'select-service') { state.selectedService = target.dataset.service; renderBooking(); }
  if (action === 'select-therapist') { state.selectedTherapist = target.dataset.therapist; renderBooking(); }
  if (action === 'select-date') { state.selectedDate = target.dataset.date; state.selectedTime = ''; renderBooking(); }
  if (action === 'select-time' && !target.disabled) { state.selectedTime = target.dataset.time; renderBooking(); }
  if (action === 'choose-therapist') { state.selectedTherapist = target.dataset.therapist; closeModal(); renderBooking(); showView('booking'); }
  if (action === 'cancel-booking') { state.booking = null; localStorage.removeItem('rehab-booking'); renderArrival(); toast('预约已取消，时段已释放'); }
  if (action === 'confirm-booking' && state.selectedTime) {
    const service = services.find((item) => item.id === state.selectedService); const therapist = therapists.find((item) => item.id === state.selectedTherapist); const date = dates.find((item) => item.key === state.selectedDate);
    state.booking = { service, therapist, date, time: state.selectedTime }; localStorage.setItem('rehab-booking', JSON.stringify(state.booking)); renderArrival(); showView('home'); toast(`已确认 ${date.day} ${state.selectedTime} 的预约`);
  }
  if (action === 'add-service') { services.push({ id: `service-${Date.now()}`, name: '新治疗项目', detail: '60 分钟 · 请补充服务说明', price: '待设置', icon: 'activity' }); persistSettings(); renderAdmin(); toast('已新增一个治疗项目'); }
  if (action === 'add-therapist') { therapists.push({ id: `therapist-${Date.now()}`, name: '新老师', role: '康复治疗师', experience: '请补充经验', skills: ['待补充'], bio: '请补充这位康复师的个人介绍。', certifications: ['待补充'], availability: '请设置可预约时间', color: '#3599d9' }); persistSettings(); renderAdmin(); renderTherapists(); renderBooking(); toast('已新增一位康复师'); }
  if (action === 'delete-service') { if (services.length === 1) return toast('至少保留一个治疗项目'); services = services.filter((service) => service.id !== target.dataset.id); if (!services.some((service) => service.id === state.selectedService)) state.selectedService = services[0].id; persistSettings(); renderAdmin(); renderBooking(); toast('治疗项目已删除'); }
  if (action === 'delete-therapist') { if (therapists.length === 1) return toast('至少保留一位康复师'); therapists = therapists.filter((therapist) => therapist.id !== target.dataset.id); if (!therapists.some((therapist) => therapist.id === state.selectedTherapist)) state.selectedTherapist = therapists[0].id; persistSettings(); renderAdmin(); renderTherapists(); renderBooking(); toast('康复师已删除'); }
  if (action === 'reset-demo') { config = { ...defaultConfig }; therapists = structuredClone(defaultTherapists); services = structuredClone(defaultServices); ['rehab-config', 'rehab-therapists', 'rehab-services', 'rehab-booking', 'rehab-records'].forEach((key) => localStorage.removeItem(key)); state.booking = null; state.records = JSON.parse('[{"date":"2026.08.18","title":"第 4 次治疗 · 稳定训练","content":"颈肩紧张感较前减轻。继续进行胸椎活动度练习与核心激活，每天 12 分钟。"},{"date":"2026.08.11","title":"第 3 次治疗 · 动作重建","content":"久坐后腰背紧张评分由 6 降至 4，建议工作时每 45 分钟起身活动。"}]'); renderConfig(); renderTherapists(); renderBooking(); renderArrival(); renderAdmin(); toast('已恢复示例数据'); }
});

document.addEventListener('submit', (event) => {
  const form = event.target; if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault(); const data = new FormData(form);
  if (form.id === 'admin-basics') { config = { ...config, ...Object.fromEntries(data.entries()) }; persistSettings(); renderConfig(); renderArrival(); toast('基础资料已同步到客户端'); }
  if (form.id === 'admin-plan') { config = { ...config, ...Object.fromEntries(data.entries()) }; persistSettings(); renderConfig(); toast('疗程计划已保存'); }
  if (form.dataset.editor === 'service') { const service = services.find((item) => item.id === form.dataset.id); Object.assign(service, Object.fromEntries(data.entries())); persistSettings(); renderBooking(); renderArrival(); renderAdmin(); toast('治疗项目已保存'); }
  if (form.dataset.editor === 'therapist') { const therapist = therapists.find((item) => item.id === form.dataset.id); const edited = Object.fromEntries(data.entries()); Object.assign(therapist, edited, { skills: edited.skills.split(/[，,]/).map((skill) => skill.trim()).filter(Boolean), certifications: edited.certifications.split(/[，,]/).map((item) => item.trim()).filter(Boolean) }); persistSettings(); renderTherapists(); renderBooking(); renderArrival(); renderAdmin(); toast('康复师资料已保存'); }
});

renderConfig(); renderTherapists(); renderBooking(); renderArrival(); renderAdmin();
