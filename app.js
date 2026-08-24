const defaultTherapists = [
  { id: 'li', name: '李老师', role: '运动康复师', experience: '8 年从业经验', skills: ['肩颈体态', '运动表现恢复'], bio: '专注于肩颈不适、久坐体态与运动表现恢复。服务中会结合功能评估、动作支持与循序渐进的运动康复训练，帮助客户建立更稳定、可持续的日常活动方式。', certifications: ['运动康复认证', '筋膜技术认证'], availability: '周一至周六 · 09:30 - 18:00', color: '#1b769e' },
  { id: 'zhou', name: '周老师', role: '功能训练师', experience: '6 年从业经验', skills: ['腰背活动', '产后运动恢复'], bio: '主要服务腰背活动、骨盆稳定和产后运动恢复人群。重视每位客户的生活方式与活动目标，用清晰的阶段目标帮助身体重新找回力量与信心。', certifications: ['功能评估认证', '产后运动进阶'], availability: '周二至周日 · 10:00 - 19:00', color: '#15a99d' },
  { id: 'chen', name: '陈老师', role: '运动表现教练', experience: '5 年训练经验', skills: ['功能训练', '运动表现恢复'], bio: '擅长将运动康复训练带回真实运动场景，重点关注跑步、力量训练和日常活动中的动作效率。适合希望逐步回到运动节奏的客户。', certifications: ['体能训练认证', '跑步表现训练'], availability: '周一至周五 · 11:00 - 20:00', color: '#d59339' },
];

const defaultServices = [
  { id: 'assessment', name: '初次功能评估', detail: '60 分钟 · 建档、评估与行动建议', price: '¥298', icon: 'clipboard-check' },
  { id: 'spine', name: '脊柱功能训练', detail: '60 分钟 · 动作支持与运动康复训练', price: '使用次数', icon: 'activity' },
  { id: 'training', name: '运动表现恢复训练', detail: '60 分钟 · 不适管理与功能训练', price: '使用次数', icon: 'dumbbell' },
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
  heroSubtitle: '专业评估、到店预约与居家训练，会根据每次反馈灵活调整。',
  planName: '近期康复安排',
  planStage: '近期关注 · 胸椎活动与稳定训练',
  planDone: '4',
  planTotal: '12',
  planExpiry: '2026.10.30',
};

const defaultWorkspacePatients = [
  {
    id: 'wu', name: '吴晨', profile: '34 岁 · 产品经理', therapistId: 'zhou', demand: '久坐和通勤后腰背酸紧，希望能稳定完成每周两次力量训练。',
    stage: '第 1 阶段 · 动作舒适度与负荷调整', done: 2, total: 8, painBefore: 7, painNow: 4, nextFocus: '骨盆控制、髋屈肌放松与死虫式训练。',
    history: [
      { date: '2026.08.21', title: '第 2 次训练 · 骨盆稳定', content: '站立耐受时间提升至 40 分钟；久坐后仍有紧张感，已调整办公间歇策略。' },
      { date: '2026.08.14', title: '初次功能评估 · 腰背活动', content: '右侧腰方肌紧张明显，久坐后不适评分 7 / 10；建立活动反馈与居家训练安排。' },
    ],
  },
  {
    id: 'jiang', name: '蒋远', profile: '28 岁 · 跑步爱好者', therapistId: 'li', demand: '跑步后右膝外侧不适，目标是在秋季赛事前安全恢复 10 公里训练。',
    stage: '初次评估', done: 0, total: 6, painBefore: 6, painNow: 6, nextFocus: '跑姿筛查、髋外展力量测试与训练负荷调整。',
    history: [
      { date: '2026.08.23', title: '预约前问卷', content: '不适主要出现在跑步 5 公里后，下坡与久坐起身时较明显；暂未进行系统训练。' },
    ],
  },
  {
    id: 'zhang', name: '张予安', profile: '41 岁 · 咨询顾问', therapistId: 'chen', demand: '羽毛球扭伤后踝关节不稳，想恢复周末运动，同时改善单脚支撑信心。',
    stage: '第 2 阶段 · 功能回归', done: 5, total: 10, painBefore: 5, painNow: 2, nextFocus: '单脚控制、变向落地与渐进跳跃训练。',
    history: [
      { date: '2026.08.20', title: '第 5 次训练 · 动态稳定', content: '单脚平衡由 12 秒提升至 28 秒；低强度侧向移动无明显不适。' },
      { date: '2026.08.13', title: '第 4 次训练 · 负重控制', content: '踝关节活动度改善，开始加入轻阻力提踵与弹力带外翻。' },
      { date: '2026.07.30', title: '初次功能评估 · 踝关节运动表现', content: '踝关节活动受限，运动后不稳感明显，制定阶段性运动表现恢复安排。' },
    ],
  },
];

const defaultPatientConcerns = {
  lin: [
    { id: 'lin-neck', title: '颈肩紧张与转头受限', summary: '久坐后颈肩紧张、转头受限，希望恢复规律力量训练。', status: 'active', priority: 'primary', openedAt: '2026.07.20', updatedAt: '2026.08.23', closeReason: '', statusHistory: [] },
    { id: 'lin-back', title: '久坐后腰背紧张', summary: '长时间会议后偶发，目前不是主要处理目标。', status: 'monitoring', priority: 'secondary', openedAt: '2026.07.20', updatedAt: '2026.08.18', closeReason: '', statusHistory: [] },
    { id: 'lin-wrist', title: '右手腕训练后不适', summary: '日常活动基本正常，继续进行腕关节负荷适应训练。', status: 'home_training', priority: 'secondary', openedAt: '2026.06.12', updatedAt: '2026.08.11', closeReason: '', statusHistory: [] },
  ],
  wu: [
    { id: 'wu-back', title: '久坐后腰背活动受限', summary: '久坐和通勤后明显，希望稳定完成每周两次力量训练。', status: 'active', priority: 'primary', openedAt: '2026.08.14', updatedAt: '2026.08.21', closeReason: '', statusHistory: [] },
    { id: 'wu-hip', title: '右髋前侧紧张', summary: '深蹲后偶发，目前结合居家活动度训练跟进。', status: 'home_training', priority: 'secondary', openedAt: '2026.08.14', updatedAt: '2026.08.21', closeReason: '', statusHistory: [] },
  ],
  jiang: [
    { id: 'jiang-knee', title: '跑步后右膝外侧不适', summary: '约跑步 5 公里后出现，下坡与久坐起身时较明显。', status: 'active', priority: 'primary', openedAt: '2026.08.23', updatedAt: '2026.08.23', closeReason: '', statusHistory: [] },
  ],
  zhang: [
    { id: 'zhang-ankle', title: '左踝运动后稳定性不足', summary: '目标是恢复周末羽毛球和变向移动信心。', status: 'active', priority: 'primary', openedAt: '2026.07.30', updatedAt: '2026.08.20', closeReason: '', statusHistory: [] },
    { id: 'zhang-knee', title: '右膝上下楼偶发不适', summary: '目前没有持续不适，保留后续活动观察。', status: 'monitoring', priority: 'secondary', openedAt: '2026.05.18', updatedAt: '2026.07.30', closeReason: '', statusHistory: [] },
  ],
};

let therapists = JSON.parse(localStorage.getItem('rehab-therapists') || JSON.stringify(defaultTherapists));
let services = JSON.parse(localStorage.getItem('rehab-services') || JSON.stringify(defaultServices));
const serviceCopyMigrations = {
  '初次评估与治疗': '初次功能评估',
  '脊柱功能康复': '脊柱功能训练',
  '运动损伤治疗': '运动表现恢复训练',
};
const therapistRoleMigrations = { '康复治疗师': '运动康复师', '物理治疗师': '功能训练师' };
therapists = therapists.map((therapist) => ({
  ...therapist,
  role: therapistRoleMigrations[therapist.role] || therapist.role,
  experience: String(therapist.experience || '').replace('临床经验', '从业经验'),
  skills: (therapist.skills || []).map((skill) => skill === '运动损伤' ? '运动表现恢复' : skill),
  bio: String(therapist.bio || '').replaceAll('治疗中', '服务中').replaceAll('康复训练', '运动康复训练'),
}));
services = services.map((service) => ({ ...service, name: serviceCopyMigrations[service.name] || service.name, detail: String(service.detail || '').replace('手法治疗与动作训练', '动作支持与运动康复训练').replace('疼痛管理与功能恢复', '不适管理与功能训练') }));
services = services.map((service) => service.price === '使用计划' ? { ...service, price: '使用次数' } : service);
let config = { ...defaultConfig, ...JSON.parse(localStorage.getItem('rehab-config') || '{}') };
if (config.planName === '脊柱功能康复计划') config.planName = '近期康复安排';
if (config.planStage === '第 2 阶段 · 稳定与强化') config.planStage = '近期关注 · 胸椎活动与稳定训练';
if (config.heroSubtitle === '专业评估、到店治疗与居家训练，都在同一份康复计划里。') config.heroSubtitle = defaultConfig.heroSubtitle;
const defaultAuth = { loggedIn: false, role: 'customer', name: '', phone: '', provider: '', phoneAuthorized: false, basicConsent: false, sensitiveConsent: false, therapistId: '' };
let auth = { ...defaultAuth, ...JSON.parse(localStorage.getItem('rehab-auth') || '{}') };
let consentLog = JSON.parse(localStorage.getItem('rehab-consent-log') || '[]');
let patientConcernStore = JSON.parse(localStorage.getItem('rehab-patient-concerns') || '{}');
let adminRange = localStorage.getItem('rehab-admin-range') || 'day';
let adminDate = localStorage.getItem('rehab-admin-date') || '2026-08-23';

const state = {
  booking: JSON.parse(localStorage.getItem('rehab-booking') || 'null'),
  selectedService: 'spine', selectedTherapist: 'li', selectedDate: 'tomorrow', selectedTime: '',
  workspaceTherapist: 'li', authRole: 'customer', authConsentBasic: false, authConsentSensitive: false,
  trainingDone: localStorage.getItem('rehab-training-done') === 'true',
  records: JSON.parse(localStorage.getItem('rehab-records') || '[{"date":"2026.08.18","title":"第 4 次训练 · 稳定训练","content":"颈肩紧张感较前减轻。继续进行胸椎活动度练习与核心激活，每天 12 分钟。"},{"date":"2026.08.11","title":"第 3 次训练 · 动作重建","content":"久坐后腰背紧张评分由 6 降至 4，建议工作时每 45 分钟起身活动。"}]'),
};

const el = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const roleLabel = (role) => ({ customer: '客户', therapist: '康复师', admin: '管理员' }[role] || '访客');
const maskPhone = (phone) => phone ? `${phone.slice(0, 3)}****${phone.slice(-4)}` : '未绑定手机号';

function setPreviewMode(mode) {
  const nextMode = mode === 'mini' ? 'mini' : 'web';
  const shell = el('#preview-shell');
  if (!shell) return;
  shell.classList.toggle('web-preview', nextMode === 'web');
  shell.classList.toggle('mini-preview', nextMode === 'mini');
  document.body.classList.toggle('web-mode', nextMode === 'web');
  document.body.classList.toggle('mini-mode', nextMode === 'mini');
  document.querySelectorAll('[data-preview-mode]').forEach((button) => {
    const active = button.dataset.previewMode === nextMode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  localStorage.setItem('rehab-preview-mode', nextMode);
}

function persistAuth() { localStorage.setItem('rehab-auth', JSON.stringify(auth)); }
function persistConsentLog() { localStorage.setItem('rehab-consent-log', JSON.stringify(consentLog)); }
function recordConsent(scope, status, dataCategories, purpose) {
  consentLog.unshift({ id: `consent-${Date.now()}-${consentLog.length}`, scope, status, dataCategories, purpose, version: scope === 'health' ? '健康信息规则 v1.0' : '隐私政策 v1.0', at: new Date().toLocaleString('zh-CN', { hour12: false }) });
  persistConsentLog();
}

function renderAuth() {
  const signedIn = auth.loggedIn;
  const avatar = el('#auth-avatar');
  if (avatar) {
    avatar.textContent = signedIn ? (auth.name || roleLabel(auth.role)).slice(0, 1) : '微';
    avatar.setAttribute('aria-label', signedIn ? '打开账户菜单' : '微信登录或手机号登录');
    avatar.title = signedIn ? `${auth.name} · ${roleLabel(auth.role)}` : '登录';
  }
  const label = el('#auth-state-label');
  if (label) label.textContent = signedIn ? `${roleLabel(auth.role)} · ${maskPhone(auth.phone)}` : '未登录';
  const meta = el('#account-meta');
  if (meta) meta.textContent = signedIn ? `${auth.provider || '已登录'} · ${maskPhone(auth.phone)}` : '尚未登录 · 授权后可同步预约与康复安排';
}

function showAuth(preferredRole = state.authRole || 'customer') {
  state.authRole = preferredRole;
  const roleTabs = [
    { id: 'customer', name: '客户' },
    { id: 'therapist', name: '康复师' },
    { id: 'admin', name: '管理员' },
  ].map((role) => `<button class="auth-role-tab ${preferredRole === role.id ? 'active' : ''}" data-action="select-auth-role" data-role="${role.id}">${role.name}</button>`).join('');
  const intro = `<section class="auth-intro"><div class="auth-intro-top"><div><small>SECURE ACCOUNT</small><strong>${preferredRole === 'customer' ? '微信服务账户' : `${roleLabel(preferredRole)}工作台`}</strong></div><span class="auth-intro-icon"><i class="icon icon-shield-check"></i></span></div><p>${preferredRole === 'customer' ? '预约通知和康复安排会同步到你的微信账户。' : '仅限工作室授权人员访问客户资料与服务安排。'}</p></section>`;
  let content = '';
  if (auth.loggedIn) {
    const phoneAction = auth.role === 'customer' && !auth.phoneAuthorized
      ? '<button class="button secondary full" data-action="authorize-phone"><i class="icon icon-phone"></i> 授权绑定微信手机号</button>'
      : '';
    const healthConsent = auth.role === 'customer'
      ? `<div class="auth-consent-summary ${auth.sensitiveConsent ? 'granted' : ''}"><i class="icon icon-${auth.sensitiveConsent ? 'shield-check' : 'shield-alert'}"></i><span><strong>健康信息单独授权</strong><small>${auth.sensitiveConsent ? '已授权，可建立功能评估和训练记录' : '未授权，建立评估前需要单独确认'}</small></span></div><button class="button secondary full" data-action="show-consent-records"><i class="icon icon-clipboard-list"></i> 查看授权记录</button>`
      : '';
    content = `<div class="auth-account-summary"><span class="avatar">${escapeHtml((auth.name || roleLabel(auth.role)).slice(0, 1))}</span><div><strong>${escapeHtml(auth.name || roleLabel(auth.role))}</strong><small>${escapeHtml(roleLabel(auth.role))} · ${escapeHtml(maskPhone(auth.phone))}</small></div></div>${phoneAction}${healthConsent}<button class="button primary full" data-action="auth-enter-app"><i class="icon icon-arrow-right"></i> 进入${escapeHtml(roleLabel(auth.role))}入口</button><button class="button full auth-logout" data-action="auth-logout"><i class="icon icon-log-out"></i> 退出当前账号</button>`;
  } else if (preferredRole === 'customer') {
    content = `<div class="wechat-auth-card"><div><i class="icon icon-message-circle"></i><span><strong>微信快捷登录</strong><small>用于建立客户身份，不会在页面内保存微信凭证。</small></span></div></div><label class="auth-agreement" data-action="toggle-basic-consent"><input type="checkbox" ${state.authConsentBasic ? 'checked' : ''} /><span>我已阅读并同意《用户协议》和《隐私政策》，授权处理账户、预约与通知所需的基础信息。</span></label><label class="auth-agreement auth-sensitive-agreement" data-action="toggle-sensitive-consent"><input type="checkbox" ${state.authConsentSensitive ? 'checked' : ''} /><span>我单独同意为建立服务档案处理健康信息，包括当前诉求、功能评估结果、不适程度与训练反馈。</span></label><button class="button primary full" data-action="mock-wechat-login" ${state.authConsentBasic ? '' : 'disabled'}><i class="icon icon-message-circle"></i> 微信授权登录</button><p class="auth-secondary-note">手机号须主动授权；未勾选健康信息同意仍可注册和预约，建立服务档案前会再次确认。</p>`;
  } else {
    const person = preferredRole === 'therapist' ? (therapists.find((item) => item.id === 'li') || therapists[0]) : null;
    content = `<div class="wechat-auth-card"><div><i class="icon icon-lock-keyhole"></i><span><strong>工作室人员登录</strong><small>使用已备案手机号验证身份与工作权限。</small></span></div></div><form id="staff-login" class="staff-login-form"><label>手机号<input name="phone" inputmode="numeric" autocomplete="tel" maxlength="11" placeholder="请输入已备案手机号" /></label><label>验证码<div class="auth-code-row"><input name="code" inputmode="numeric" maxlength="6" placeholder="6 位验证码" /><button type="button" class="auth-send-code" data-action="send-staff-code">发送验证码</button></div></label><button class="button primary full" type="submit"><i class="icon icon-log-in"></i> 登录${escapeHtml(roleLabel(preferredRole))}入口</button></form><p class="auth-secondary-note">演示验证码：123456${person ? ` · 康复师演示账号：${escapeHtml(person.name)}` : ''}</p>`;
  }
  modal('账户登录', `${intro}<div class="auth-role-tabs">${roleTabs}</div><section class="auth-panel"><h3>${auth.loggedIn ? '当前登录账号' : preferredRole === 'customer' ? '登录后继续预约' : '验证工作账号'}</h3><p>${auth.loggedIn ? '如需切换身份，请先退出当前账号。' : preferredRole === 'customer' ? '可查看自己的预约、康复安排与居家训练。' : '登录后仅显示与你角色和权限匹配的资料。'}</p>${content}</section>`, 'auth-modal');
}

function ensureCustomer() {
  if (auth.loggedIn && auth.role === 'customer') return true;
  state.authConsentBasic = false; state.authConsentSensitive = false;
  showAuth('customer');
  return false;
}

function ensureStaff(role = 'therapist') {
  const allowed = role === 'admin' ? auth.role === 'admin' : ['therapist', 'admin'].includes(auth.role);
  if (auth.loggedIn && allowed) return true;
  state.authConsentBasic = false; state.authConsentSensitive = false;
  showAuth(role);
  return false;
}

function therapistName(id) { return therapists.find((therapist) => therapist.id === id)?.name || '待分配'; }

const concernStatusMeta = {
  active: { label: '处理中', tone: 'active' },
  home_training: { label: '居家训练', tone: 'home' },
  monitoring: { label: '观察中', tone: 'monitoring' },
  improved: { label: '已改善', tone: 'improved' },
  closed: { label: '已关闭', tone: 'closed' },
};

function patientConcerns(patient) {
  const stored = patientConcernStore[patient.id];
  const defaults = defaultPatientConcerns[patient.id] || [{ id: `${patient.id}-primary`, title: '当前主要问题', summary: patient.demand, status: 'active', priority: 'primary', openedAt: '2026.08.23', updatedAt: '2026.08.23', closeReason: '', statusHistory: [] }];
  return structuredClone(stored || defaults);
}

function persistPatientConcerns(patientId, concerns) {
  patientConcernStore[patientId] = concerns;
  localStorage.setItem('rehab-patient-concerns', JSON.stringify(patientConcernStore));
}

function updateConcern(patientId, concernId, changes, eventNote = '') {
  const patient = workspacePatients().find((entry) => entry.id === patientId);
  if (!patient) return;
  const concerns = structuredClone(patient.concerns);
  const concern = concerns.find((entry) => entry.id === concernId);
  if (!concern) return;
  const previousStatus = concern.status;
  Object.assign(concern, changes, { updatedAt: '2026.08.23' });
  if (changes.status && changes.status !== previousStatus) {
    concern.statusHistory = concern.statusHistory || [];
    concern.statusHistory.unshift({ from: previousStatus, to: changes.status, at: '2026.08.23', note: eventNote });
  }
  if (!['improved', 'closed'].includes(concern.status) && concern.priority === 'historical') concern.priority = 'secondary';
  if (['home_training', 'monitoring'].includes(concern.status) && concern.priority === 'primary') concern.priority = 'secondary';
  if (['improved', 'closed'].includes(concern.status)) concern.priority = 'historical';
  if (concern.status === 'active' && !concerns.some((entry) => entry.id !== concern.id && entry.priority === 'primary' && !['improved', 'closed'].includes(entry.status))) concern.priority = 'primary';
  if (concern.priority === 'primary') concerns.forEach((entry) => { if (entry.id !== concern.id && entry.priority === 'primary') entry.priority = 'secondary'; });
  if (!concerns.some((entry) => entry.priority === 'primary' && !['improved', 'closed'].includes(entry.status))) {
    const next = concerns.find((entry) => entry.status === 'active') || concerns.find((entry) => !['improved', 'closed'].includes(entry.status));
    if (next) next.priority = 'primary';
  }
  persistPatientConcerns(patientId, concerns);
}

function workspacePatients() {
  const currentTherapistId = state.booking?.therapist?.id || 'li';
  const patients = [{
    id: 'lin', name: config.customer, profile: '31 岁 · 产品设计师', therapistId: currentTherapistId,
    demand: '久坐后颈肩紧张、转头受限，希望恢复规律力量训练并减少工作日疲劳。',
    stage: config.planStage, done: Number(config.planDone), total: Number(config.planTotal), painBefore: 6, painNow: 3,
    nextFocus: '胸椎活动度、颈深屈肌激活与核心稳定训练。', history: state.records,
  }, ...defaultWorkspacePatients];
  return patients.map((patient) => ({ ...patient, concerns: patientConcerns(patient) }));
}

function workspaceSchedule() {
  const currentService = state.booking?.service?.name || '脊柱功能训练';
  const currentTime = state.booking?.time || '10:00';
  const currentTherapistId = state.booking?.therapist?.id || 'li';
  return [
    { time: currentTime, patientId: 'lin', therapistId: currentTherapistId, service: currentService, status: state.booking ? '待到店' : '已完成', tone: state.booking ? 'upcoming' : 'done' },
    { time: '14:00', patientId: 'wu', therapistId: 'zhou', service: '腰背功能训练', status: '已确认', tone: 'confirmed' },
    { time: '15:30', patientId: 'jiang', therapistId: 'li', service: '初次评估', status: '待评估', tone: 'pending' },
    { time: '17:00', patientId: 'zhang', therapistId: 'chen', service: '运动表现恢复训练', status: '训练中', tone: 'active' },
  ].sort((a, b) => a.time.localeCompare(b.time));
}

function adminDateKey(value) {
  const date = value instanceof Date ? value : new Date(`${value}T12:00:00`);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function adminDisplayDate(value) {
  return adminDateKey(value).replace(/-/g, '.');
}

function adminPeriod(range = adminRange, anchorValue = adminDate) {
  const anchor = new Date(`${anchorValue}T12:00:00`);
  const safeAnchor = Number.isNaN(anchor.getTime()) ? new Date('2026-08-23T12:00:00') : anchor;
  let start = new Date(safeAnchor);
  let end = new Date(safeAnchor);
  if (range === 'week') {
    const weekday = safeAnchor.getDay() || 7;
    start.setDate(safeAnchor.getDate() - weekday + 1);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
  }
  if (range === 'month') {
    start = new Date(safeAnchor.getFullYear(), safeAnchor.getMonth(), 1, 12);
    end = new Date(safeAnchor.getFullYear(), safeAnchor.getMonth() + 1, 0, 12);
  }
  const startKey = adminDateKey(start);
  const endKey = adminDateKey(end);
  return {
    range,
    startKey,
    endKey,
    label: range === 'day' ? `${adminDisplayDate(start)} · 日视图` : range === 'week' ? `${adminDisplayDate(start)} - ${adminDisplayDate(end)} · 周视图` : `${safeAnchor.getFullYear()} 年 ${safeAnchor.getMonth() + 1} 月 · 月视图`,
    shortLabel: range === 'day' ? '当天' : range === 'week' ? '本周' : '本月',
  };
}

function adminDateInPeriod(value, period) {
  const key = adminDateKey(String(value || '').replace(/\./g, '-'));
  return key >= period.startKey && key <= period.endKey;
}

function adminAnalyticsData() {
  const period = adminPeriod();
  const todaySchedule = workspaceSchedule().map((item) => ({ ...item, date: '2026-08-23' }));
  const historicalSchedule = [
    { date: '2026-08-22', time: '10:30', patientId: 'lin', therapistId: 'li', service: '脊柱功能康复', status: '已完成', tone: 'done' },
    { date: '2026-08-22', time: '15:00', patientId: 'zhang', therapistId: 'chen', service: '运动表现恢复训练', status: '已完成', tone: 'done' },
    { date: '2026-08-21', time: '14:00', patientId: 'wu', therapistId: 'zhou', service: '腰背功能训练', status: '已完成', tone: 'done' },
    { date: '2026-08-21', time: '16:30', patientId: 'lin', therapistId: 'li', service: '脊柱功能康复', status: '已完成', tone: 'done' },
    { date: '2026-08-20', time: '11:00', patientId: 'zhang', therapistId: 'chen', service: '运动表现恢复训练', status: '已完成', tone: 'done' },
    { date: '2026-08-19', time: '10:00', patientId: 'jiang', therapistId: 'li', service: '初次评估', status: '已完成', tone: 'done' },
    { date: '2026-08-18', time: '15:30', patientId: 'wu', therapistId: 'zhou', service: '腰背功能训练', status: '已完成', tone: 'done' },
    { date: '2026-08-12', time: '10:30', patientId: 'lin', therapistId: 'li', service: '脊柱功能康复', status: '已完成', tone: 'done' },
    { date: '2026-08-08', time: '16:00', patientId: 'zhang', therapistId: 'chen', service: '运动表现恢复训练', status: '已完成', tone: 'done' },
    { date: '2026-08-05', time: '14:30', patientId: 'wu', therapistId: 'zhou', service: '腰背功能训练', status: '已完成', tone: 'done' },
    { date: '2026-08-02', time: '11:30', patientId: 'jiang', therapistId: 'li', service: '初次评估', status: '已完成', tone: 'done' },
  ];
  const appointments = [...todaySchedule, ...historicalSchedule].filter((item) => adminDateInPeriod(item.date, period));
  const patients = workspacePatients();
  const concerns = patients.flatMap((patient) => patient.concerns).filter((concern) => adminDateInPeriod(concern.updatedAt || concern.openedAt, period));
  const newConcerns = patients.flatMap((patient) => patient.concerns).filter((concern) => adminDateInPeriod(concern.openedAt, period)).length;
  return {
    period,
    appointments,
    concerns,
    newConcerns,
    completed: appointments.filter((item) => item.tone === 'done').length,
    patientIds: [...new Set(appointments.map((item) => item.patientId))],
  };
}

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
      <span class="mini-photo" style="background:${therapist.color}">${therapist.name.slice(0, 1)}</span><strong>${therapist.name}</strong><small>${therapist.role.replace('运动康复师', '康复师')}</small>
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

function renderPlan() {
  const appointment = el('#plan-appointment');
  if (!appointment) return;
  if (state.booking) {
    const booking = state.booking;
    appointment.innerHTML = `<article class="arrangement-appointment"><div class="arrangement-appointment-date"><small>${escapeHtml(booking.date.day)}</small><strong>${escapeHtml(booking.date.date.slice(-2))}</strong></div><div><strong>${escapeHtml(booking.service.name)}</strong><small>${escapeHtml(booking.time)} · ${escapeHtml(booking.therapist.name)} · ${escapeHtml(config.clinic)}</small></div><span class="state-pill active">已确认</span></article>`;
  } else {
    appointment.innerHTML = '<div class="arrangement-empty"><i class="icon icon-calendar-plus"></i><span>还没有下一次到店预约</span><button data-action="open-booking">去预约</button></div>';
  }
  el('#plan-name').textContent = config.planName;
  el('#plan-focus').textContent = config.planStage;
  el('#plan-done').textContent = config.planDone;
  el('#plan-total').textContent = config.planTotal;
  el('#plan-remaining').textContent = Math.max(0, Number(config.planTotal) - Number(config.planDone));
  el('#remaining-count').textContent = Math.max(0, Number(config.planTotal) - Number(config.planDone));
  el('#plan-expiry').textContent = config.planExpiry;
  const trainingState = el('#training-state');
  trainingState.textContent = state.trainingDone ? '已完成' : '待完成';
  trainingState.classList.toggle('done', state.trainingDone);
}

function renderConfig() {
  el('#brand-name').textContent = config.brand;
  el('#clinic-name').textContent = config.clinic;
  el('#hero-title').textContent = config.heroTitle.replace(/<br\s*\/?\s*>/g, '\n');
  el('#hero-subtitle').textContent = config.heroSubtitle;
  el('#customer-name').textContent = config.customer;
  el('#customer-initial').textContent = config.customer.slice(0, 1) || '客';
  renderPlan();
  document.title = `${config.brand} | 预约与运动康复管理`;
}

function persistSettings() {
  localStorage.setItem('rehab-config', JSON.stringify(config));
  localStorage.setItem('rehab-therapists', JSON.stringify(therapists));
  localStorage.setItem('rehab-services', JSON.stringify(services));
}

function csvCell(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

function downloadCsv(filename, headers, rows) {
  const csv = `\uFEFF${[headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n')}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function exportTherapistsCsv() {
  const patients = workspacePatients();
  const analytics = adminAnalyticsData();
  const schedule = analytics.appointments;
  const rows = therapists.map((therapist) => {
    const assignedPatients = patients.filter((patient) => patient.therapistId === therapist.id);
    const appointments = schedule.filter((item) => item.therapistId === therapist.id);
    const appointmentPatients = new Set(appointments.map((item) => item.patientId));
    return [
      analytics.period.label,
      therapist.id,
      therapist.name,
      therapist.role,
      therapist.experience,
      therapist.skills.join('；'),
      (therapist.certifications || []).join('；'),
      therapist.availability || '',
      appointments.length,
      appointmentPatients.size,
      assignedPatients.length,
      appointments.filter((item) => item.tone === 'done').length,
    ];
  });
  downloadCsv(
    `康复师数据-${analytics.period.range}-${new Date().toISOString().slice(0, 10)}.csv`,
    ['统计范围', '康复师ID', '姓名', '职称', '经验', '擅长方向', '认证标签', '可预约时间', '本期预约数', '本期预约客户数', '负责客户总数', '本期待补记录数'],
    rows,
  );
}

function exportPatientsCsv() {
  const rows = workspacePatients().flatMap((patient) => {
    const latestRecord = patient.history?.[0] || {};
    return patient.concerns.map((concern) => [
      patient.id,
      patient.name,
      patient.profile,
      therapistName(patient.therapistId),
      concern.id,
      concern.title,
      concern.summary,
      concern.priority === 'primary' ? '主要问题' : concern.priority === 'historical' ? '历史问题' : '次要问题',
      concernStatusMeta[concern.status]?.label || concern.status,
      concern.openedAt || '',
      concern.updatedAt || '',
      concern.closedAt || '',
      concern.closeReason || '',
      concern.outcomeSummary || '',
      patient.done,
      patient.total,
      Math.max(0, patient.total - patient.done),
      latestRecord.date || '',
      latestRecord.title || '',
    ]);
  });
  downloadCsv(
    `客户康复数据-${new Date().toISOString().slice(0, 10)}.csv`,
    ['客户ID', '姓名', '基础资料', '负责康复师', '问题ID', '关注问题/当前诉求', '问题说明', '问题优先级', '问题状态', '开始日期', '最近更新', '关闭日期', '关闭原因', '结果摘要', '已到店次数', '服务总次数', '剩余次数', '最近记录日期', '最近记录标题'],
    rows,
  );
}

function renderAdmin() {
  const patients = workspacePatients();
  const analytics = adminAnalyticsData();
  const schedule = analytics.appointments;
  const concerns = analytics.concerns;
  const statusCounts = Object.fromEntries(Object.keys(concernStatusMeta).map((status) => [status, concerns.filter((concern) => concern.status === status).length]));
  const maxStatusCount = Math.max(1, ...Object.values(statusCounts));
  const statusRows = Object.entries(concernStatusMeta).map(([status, meta]) => `<div class="admin-status-row">
    <span class="concern-status ${meta.tone}">${meta.label}</span>
    <span class="admin-status-track"><i style="width:${statusCounts[status] ? Math.max(6, (statusCounts[status] / maxStatusCount) * 100) : 0}%"></i></span>
    <strong>${statusCounts[status]}</strong>
  </div>`).join('');
  const therapistRows = therapists.map((therapist) => {
    const appointmentCount = schedule.filter((item) => item.therapistId === therapist.id).length;
    const patientCount = patients.filter((patient) => patient.therapistId === therapist.id).length;
    const pendingCount = schedule.filter((item) => item.therapistId === therapist.id && item.tone === 'done').length;
    return `<div class="admin-data-row">
      <span class="admin-person"><i style="background:${escapeHtml(therapist.color)}">${escapeHtml(therapist.name.slice(0, 1))}</i><span><strong>${escapeHtml(therapist.name)}</strong><small>${escapeHtml(therapist.role)}</small></span></span>
      <span><strong>${appointmentCount}</strong><small>${analytics.period.shortLabel}预约</small></span>
      <span><strong>${patientCount}</strong><small>${analytics.period.shortLabel}覆盖客户</small></span>
      <span><strong>${pendingCount}</strong><small>待补记录</small></span>
    </div>`;
  }).join('');
  const patientRows = patients.map((patient) => {
    const primary = patient.concerns.find((concern) => concern.priority === 'primary') || patient.concerns[0];
    const status = concernStatusMeta[primary?.status] || concernStatusMeta.active;
    return `<button class="admin-patient-row" data-action="open-patient" data-patient="${patient.id}">
      <span class="admin-patient-name"><i>${escapeHtml(patient.name.slice(0, 1))}</i><span><strong>${escapeHtml(patient.name)}</strong><small>${escapeHtml(therapistName(patient.therapistId))} · ${patient.concerns.length} 个问题</small></span></span>
      <span class="admin-patient-concern"><strong>${escapeHtml(primary?.title || '暂无当前诉求')}</strong><small>最近记录 ${escapeHtml(patient.history?.[0]?.date || '暂无')}</small></span>
      <span class="concern-status ${status.tone}">${status.label}</span>
      <i class="icon icon-chevron-right"></i>
    </button>`;
  }).join('');
  const serviceForms = services.map((service) => `<form class="admin-editor" data-editor="service" data-id="${service.id}">
    <div class="editor-title"><strong>${escapeHtml(service.name)}</strong><button type="button" class="delete-button" data-action="delete-service" data-id="${service.id}" title="删除项目" aria-label="删除 ${escapeHtml(service.name)}"><i class="icon icon-trash-2"></i></button></div>
    <label>项目名称<input name="name" value="${escapeHtml(service.name)}" /></label><label>服务说明<input name="detail" value="${escapeHtml(service.detail)}" /></label><label>价格 / 权益说明<input name="price" value="${escapeHtml(service.price)}" /></label>
    <button class="button secondary full" type="submit">保存项目</button></form>`).join('');
  const therapistForms = therapists.map((therapist) => `<form class="admin-editor" data-editor="therapist" data-id="${therapist.id}">
    <div class="editor-title"><strong>${escapeHtml(therapist.name)}</strong><button type="button" class="delete-button" data-action="delete-therapist" data-id="${therapist.id}" title="删除康复师" aria-label="删除 ${escapeHtml(therapist.name)}"><i class="icon icon-trash-2"></i></button></div>
    <label>姓名<input name="name" value="${escapeHtml(therapist.name)}" /></label><label>职称<input name="role" value="${escapeHtml(therapist.role)}" /></label><label>经验描述<input name="experience" value="${escapeHtml(therapist.experience)}" /></label><label>擅长方向（用逗号分开）<input name="skills" value="${escapeHtml(therapist.skills.join('，'))}" /></label><label>个人介绍<textarea name="bio">${escapeHtml(therapist.bio || '')}</textarea></label><label>认证 / 标签（用逗号分开）<input name="certifications" value="${escapeHtml((therapist.certifications || []).join('，'))}" /></label><label>可预约时间<input name="availability" value="${escapeHtml(therapist.availability || '')}" /></label>
    <button class="button secondary full" type="submit">保存康复师</button></form>`).join('');
  el('#admin-content').innerHTML = `
    <section class="admin-overview">
      <div class="admin-overview-head"><div><span class="section-kicker">OPERATIONS · ${analytics.period.shortLabel.toUpperCase()}</span><h2>运营概览</h2><p>${analytics.period.label} · 当前工作室数据</p></div><span class="state-pill active">管理员视图</span></div>
      <div class="admin-period-toolbar"><div class="admin-range-tabs" role="group" aria-label="统计范围"><button class="${adminRange === 'day' ? 'active' : ''}" data-action="select-admin-range" data-range="day">日</button><button class="${adminRange === 'week' ? 'active' : ''}" data-action="select-admin-range" data-range="week">周</button><button class="${adminRange === 'month' ? 'active' : ''}" data-action="select-admin-range" data-range="month">月</button></div><label class="admin-date-picker"><span>统计日期</span><input id="admin-date" type="date" value="${escapeHtml(adminDate)}" /></label></div>
      <div class="admin-stat-grid">
        <article><span class="admin-stat-icon aqua"><i class="icon icon-calendar-check-2"></i></span><div><strong>${schedule.length}</strong><small>${analytics.period.shortLabel}预约</small></div></article>
        <article><span class="admin-stat-icon blue"><i class="icon icon-users"></i></span><div><strong>${analytics.patientIds.length}</strong><small>${analytics.period.shortLabel}覆盖客户</small></div></article>
        <article><span class="admin-stat-icon amber"><i class="icon icon-check-check"></i></span><div><strong>${analytics.completed}</strong><small>${analytics.period.shortLabel}已完成</small></div></article>
        <article><span class="admin-stat-icon green"><i class="icon icon-message-square-plus"></i></span><div><strong>${analytics.newConcerns}</strong><small>${analytics.period.shortLabel}新增问题</small></div></article>
      </div>
    </section>
    <section class="admin-analysis-section">
      <div class="admin-section-heading"><div><span class="section-kicker">ISSUE STATUS · ${analytics.period.shortLabel.toUpperCase()}</span><h2>问题状态分布</h2><p>按${analytics.period.shortLabel}内更新过的客户关注问题统计。</p></div><strong class="admin-total">${concerns.length}<small>本期问题</small></strong></div>
      <div class="admin-status-list">${concerns.length ? statusRows : '<div class="admin-analysis-empty"><i class="icon icon-calendar-search"></i><span>这个时间范围内暂无问题更新。</span></div>'}</div>
    </section>
    <section class="admin-analysis-section">
      <div class="admin-section-heading"><div><span class="section-kicker">TEAM LOAD · ${analytics.period.shortLabel.toUpperCase()}</span><h2>康复师工作量</h2><p>${analytics.period.shortLabel}预约、覆盖客户与待补记录。</p></div></div>
      <div class="admin-data-list">${therapistRows}</div>
    </section>
    <section class="admin-analysis-section">
      <div class="admin-section-heading"><div><span class="section-kicker">CLIENT OVERVIEW</span><h2>客户概览</h2><p>点击客户可查看完整问题与康复历史。</p></div></div>
      <div class="admin-patient-list">${patientRows}</div>
    </section>
    <section class="admin-export-section">
      <div class="admin-section-heading"><div><span class="section-kicker">DATA EXPORT</span><h2>分析数据导出</h2><p>CSV 可直接使用 Excel、Numbers 或分析工具打开。</p></div></div>
      <div class="admin-export-actions">
        <button class="button secondary" data-action="export-therapists"><i class="icon icon-download"></i><span>导出康复师数据<small>${therapists.length} 位康复师</small></span></button>
        <button class="button primary" data-action="export-patients"><i class="icon icon-file-down"></i><span>导出客户康复数据<small>${patients.length} 位客户 · ${patients.flatMap((patient) => patient.concerns).length} 个问题</small></span></button>
      </div>
      <p class="admin-export-note"><i class="icon icon-shield-alert"></i><span><strong>客户导出文件包含敏感健康信息</strong>仅限管理员在获得授权的业务范围内使用，请妥善存储并控制访问。</span></p>
    </section>
    <section class="admin-settings">
      <div class="admin-settings-heading"><span class="section-kicker">SYSTEM SETTINGS</span><h2>系统设置</h2><p>低频维护项默认收起，需要时再展开编辑。</p></div>
      <details class="admin-settings-group"><summary><span><i class="icon icon-building-2"></i><strong>基础资料</strong><small>工作室、门店与首页文案</small></span><i class="icon icon-chevron-down"></i></summary><div class="admin-settings-body"><form id="admin-basics" class="admin-form"><label>工作室名称<input name="brand" value="${escapeHtml(config.brand)}" /></label><label>门店名称<input name="clinic" value="${escapeHtml(config.clinic)}" /></label><label>客户演示名称<input name="customer" value="${escapeHtml(config.customer)}" /></label><label>首页标题<input name="heroTitle" value="${escapeHtml(config.heroTitle.replace('<br />', ' '))}" /></label><label>首页说明<textarea name="heroSubtitle">${escapeHtml(config.heroSubtitle)}</textarea></label><button class="button primary full" type="submit"><i class="icon icon-save"></i> 保存基础资料</button></form></div></details>
      <details class="admin-settings-group"><summary><span><i class="icon icon-stethoscope"></i><strong>服务项目</strong><small>${services.length} 个可预约项目</small></span><i class="icon icon-chevron-down"></i></summary><div class="admin-settings-body"><div class="admin-inline-head"><p>客户预约页会以这里的服务项目为准。</p><button class="icon-button" data-action="add-service" title="新增服务项目" aria-label="新增服务项目"><i class="icon icon-plus"></i></button></div><div class="editor-list">${serviceForms}</div></div></details>
      <details class="admin-settings-group"><summary><span><i class="icon icon-user-round-cog"></i><strong>康复师团队</strong><small>${therapists.length} 位在册康复师</small></span><i class="icon icon-chevron-down"></i></summary><div class="admin-settings-body"><div class="admin-inline-head"><p>维护预约列表、专业介绍和可预约时间。</p><button class="icon-button" data-action="add-therapist" title="新增康复师" aria-label="新增康复师"><i class="icon icon-plus"></i></button></div><div class="editor-list">${therapistForms}</div></div></details>
      <details class="admin-settings-group"><summary><span><i class="icon icon-list-checks"></i><strong>康复安排</strong><small>近期关注与服务次数</small></span><i class="icon icon-chevron-down"></i></summary><div class="admin-settings-body"><form id="admin-plan" class="admin-form"><label>安排名称<input name="planName" value="${escapeHtml(config.planName)}" /></label><label>近期关注<input name="planStage" value="${escapeHtml(config.planStage)}" /></label><div class="form-pair"><label>已到店次数<input name="planDone" type="number" min="0" value="${escapeHtml(config.planDone)}" /></label><label>服务总次数<input name="planTotal" type="number" min="1" value="${escapeHtml(config.planTotal)}" /></label></div><label>服务有效期<input name="planExpiry" value="${escapeHtml(config.planExpiry)}" /></label><button class="button primary full" type="submit"><i class="icon icon-save"></i> 保存康复安排</button></form></div></details>
      <details class="admin-settings-group admin-danger-group"><summary><span><i class="icon icon-rotate-ccw"></i><strong>演示数据</strong><small>恢复到最初的示例内容</small></span><i class="icon icon-chevron-down"></i></summary><div class="admin-settings-body reset-section"><div><p>此操作会清除本机的预约、授权与档案修改。</p></div><button class="button danger" data-action="reset-demo"><i class="icon icon-rotate-ccw"></i> 恢复示例</button></div></details>
    </section>`;
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

function showSensitiveConsent(nextAction = 'assessment') {
  modal('健康信息单独授权', `<section class="sensitive-consent"><div class="sensitive-consent-icon"><i class="icon icon-shield-alert"></i></div><div><span class="section-kicker">SENSITIVE HEALTH DATA</span><h3>建立服务档案前请单独确认</h3><p>为进行功能评估、形成运动康复训练安排和记录训练反馈，需要处理你的健康信息。</p></div><section class="sensitive-consent-list"><strong>本次会处理</strong><span>当前诉求、既往不适与活动情况</span><span>功能评估结果、不适程度与训练反馈</span><span>训练服务记录、康复安排及相关附件</span></section><section class="sensitive-consent-list"><strong>使用范围</strong><span>仅用于本工作室的预约服务、功能评估、运动康复训练与运动表现恢复；仅授权管理员及负责康复师按权限查看。</span></section><p class="sensitive-consent-note">你可在“账户与登录 - 授权记录”撤回授权。撤回后将停止新增健康信息记录；已保存信息的后续处理应以适用法律和服务所需为准。</p><button class="button primary full" data-action="grant-sensitive-consent" data-next="${nextAction}"><i class="icon icon-shield-check"></i> 同意并继续建档</button><button class="button secondary full" data-action="close-modal-button">暂不授权</button></section>`, 'sensitive-consent-modal');
}

function showConsentRecords() {
  const entries = consentLog.length ? consentLog.map((entry) => `<article class="consent-record"><div><span class="consent-status ${entry.status}">${entry.status === 'granted' ? '已授权' : '已撤回'}</span><strong>${entry.scope === 'health' ? '健康信息单独授权' : entry.scope === 'phone' ? '微信手机号授权' : '基础服务与账户授权'}</strong><small>${escapeHtml(entry.version)} · ${escapeHtml(entry.at)}</small></div><p>${escapeHtml(entry.dataCategories.join('、'))}</p><small>${escapeHtml(entry.purpose)}</small></article>`).join('') : '<div class="workspace-empty">暂无授权记录。</div>';
  const revokeAction = auth.sensitiveConsent ? '<button class="button full auth-logout" data-action="revoke-sensitive-consent"><i class="icon icon-ban"></i> 撤回健康信息授权</button>' : '';
  modal('授权记录', `<section class="consent-records"><p class="consent-records-intro">这里保留本机演示中的授权时间、规则版本、数据类别和授权状态。</p><div class="consent-record-list">${entries}</div>${revokeAction}</section>`, 'consent-records-modal');
}

function showAppointments() {
  const current = state.booking ? `<article class="appointment-card"><div class="date-badge"><span>${state.booking.date.day}</span><b>${state.booking.date.date.slice(-2)}</b></div><div><h3>${state.booking.service.name}</h3><p>${state.booking.time} · ${state.booking.therapist.name}<br />滨江康复中心 · 2F 服务区</p></div><span class="state-pill active">已确认</span></article>` : '<div class="empty-state"><div class="empty-icon"><i class="icon icon-calendar-x"></i></div><div><h3>还没有预约</h3><p>选一个方便的时间，与康复师确认下一次到店安排。</p></div></div>';
  modal('我的预约', `<div class="modal-list">${current}<article class="appointment-card"><div class="date-badge"><span>08 月</span><b>18</b></div><div><h3>脊柱功能训练</h3><p>16:30 · 李老师<br />已完成</p></div><span class="state-pill">已完成</span></article></div><button class="button primary full modal-action" data-action="open-booking">新增预约</button>`);
}

function showRecords() {
  modal('服务记录', `<div class="modal-list">${state.records.map((record) => `<article class="record-card"><time>${escapeHtml(record.date)}</time><h3>${escapeHtml(record.title)}</h3><p>${escapeHtml(record.content)}</p></article>`).join('')}</div><p class="auth-secondary-note">服务记录由负责康复师填写；客户可查看与自身运动康复相关的记录摘要。</p>`);
}

function openAssessment() {
  if (!auth.sensitiveConsent) { showSensitiveConsent('assessment'); return; }
  modal('功能评估建档', `<form class="assessment-form" id="assessment-form"><label>本次关注部位<select name="area"><option>肩颈与上背</option><option>腰背与骨盆</option><option>膝踝与下肢</option><option>运动表现恢复</option></select></label><label>不适程度（0 - 10）<input name="score" type="number" min="0" max="10" value="4" /></label><label>当前诉求<textarea name="note" placeholder="例如：久坐后颈肩紧张，转头受限。"></textarea></label><button class="button primary full" type="submit">保存评估信息</button></form>`);
  el('#assessment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    state.records.unshift({ date: '2026.08.23', title: `功能评估 · ${data.get('area')}`, content: `不适程度：${data.get('score')} / 10。${data.get('note') || '已完成基础评估，待康复师补充行动建议。'}` });
    localStorage.setItem('rehab-records', JSON.stringify(state.records)); closeModal(); toast('评估已写入康复档案');
  });
}

function addRecord() {
  modal('新增服务记录', `<form class="assessment-form" id="record-form"><label>训练阶段<input name="title" value="第 5 次训练 · 功能训练" /></label><label>训练反馈<textarea name="content" placeholder="记录本次反馈、训练完成度和下次重点。"></textarea></label><button class="button primary full" type="submit">保存服务记录</button></form>`);
  el('#record-form').addEventListener('submit', (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); state.records.unshift({ date: '2026.08.23', title: data.get('title'), content: data.get('content') || '服务记录已保存。' }); localStorage.setItem('rehab-records', JSON.stringify(state.records)); closeModal(); toast('服务记录已保存'); });
}

function openWorkspace() {
  if (!ensureStaff('therapist')) return;
  const patients = workspacePatients();
  const scheduled = workspaceSchedule();
  const isTherapist = auth.role === 'therapist';
  const activeTherapist = isTherapist ? auth.therapistId : state.workspaceTherapist;
  const scopedSchedule = scheduled.filter((item) => activeTherapist === 'all' || item.therapistId === activeTherapist);
  const pendingRecords = scopedSchedule.filter((item) => item.tone === 'done').length;
  const therapistTabs = isTherapist
    ? `<span class="workspace-role-note"><i class="icon icon-shield-check"></i> 当前账号仅可查看本人日程与客户档案</span>`
    : [{ id: 'all', name: '全部' }, ...therapists].map((therapist) => `<button class="workspace-tab ${activeTherapist === therapist.id ? 'active' : ''}" data-action="select-workspace-therapist" data-therapist="${therapist.id}">${escapeHtml(therapist.name)}</button>`).join('');
  const rows = scopedSchedule.map((item) => {
    const patient = patients.find((entry) => entry.id === item.patientId);
    if (!patient) return '';
    return `<button class="workspace-row" data-action="open-patient" data-patient="${patient.id}"><time>${item.time}</time><span class="workspace-avatar">${escapeHtml(patient.name.slice(0, 1))}</span><div><strong>${escapeHtml(patient.name)}</strong><small>${escapeHtml(item.service)} · ${escapeHtml(therapistName(item.therapistId))}</small></div><span class="workspace-status ${item.tone}">${escapeHtml(item.status)}</span></button>`;
  }).join('');
  const activeName = activeTherapist === 'all' ? '全体康复师' : therapistName(activeTherapist);
  const adminAction = auth.role === 'admin' ? '<button class="button secondary full modal-action" data-action="open-admin"><i class="icon icon-sliders-horizontal"></i> 后台数据管理</button>' : '';
  modal('康复师工作台', `<div class="workspace-heading"><div><span class="section-kicker">TODAY · 08.23</span><h3>${escapeHtml(activeName)}的时间安排</h3></div><span class="workspace-date"><i class="icon icon-calendar-days"></i> 今天</span></div><div class="workspace-tabs">${therapistTabs}</div><div class="workspace-summary"><div><strong>${scopedSchedule.length}</strong><span>今日预约</span></div><div><strong>${pendingRecords}</strong><span>待补记录</span></div><div><strong>${scopedSchedule.filter((item) => item.tone !== 'pending').length}</strong><span>已确认 / 完成</span></div></div><p class="workspace-hint"><i class="icon icon-mouse-pointer-click"></i> 点击客户，查看当前诉求、服务历史与训练进程。</p><div class="workspace-table">${rows || '<div class="workspace-empty">今天暂无这位康复师的安排。</div>'}</div><p class="workspace-note">日程可同步 Outlook Calendar；客户档案、服务记录和功能评估结果建议以业务数据库作为唯一数据来源。</p>${adminAction}`, 'workspace');
}

function showPatientDetail(id) {
  if (!ensureStaff('therapist')) return;
  const patient = workspacePatients().find((entry) => entry.id === id);
  if (!patient) return;
  const therapist = therapists.find((entry) => entry.id === patient.therapistId);
  const completed = Math.max(0, Math.min(patient.done, patient.total));
  const remaining = Math.max(0, patient.total - completed);
  const sortedConcerns = [...patient.concerns].sort((a, b) => ({ primary: 0, secondary: 1, historical: 2 }[a.priority] - ({ primary: 0, secondary: 1, historical: 2 }[b.priority])));
  const primaryConcern = sortedConcerns.find((concern) => concern.priority === 'primary' && !['improved', 'closed'].includes(concern.status));
  const concernCards = sortedConcerns.map((concern) => {
    const status = concernStatusMeta[concern.status] || concernStatusMeta.monitoring;
    const primaryAction = concern.priority !== 'primary' && !['improved', 'closed'].includes(concern.status) ? `<button class="concern-icon-button" data-action="set-primary-concern" data-patient="${patient.id}" data-concern="${concern.id}" title="设为主要问题" aria-label="将 ${escapeHtml(concern.title)} 设为主要问题"><i class="icon icon-star"></i></button>` : '';
    const options = Object.entries(concernStatusMeta).map(([value, meta]) => `<option value="${value}" ${concern.status === value ? 'selected' : ''}>${meta.label}</option>`).join('');
    const closeReason = concern.closeReason ? `<p class="concern-close-reason"><i class="icon icon-archive"></i> ${escapeHtml(concern.closeReason)}</p>` : '';
    const outcome = concern.outcomeSummary && ['improved', 'closed'].includes(concern.status) ? `<div class="concern-outcome"><strong>结果与遗留情况</strong><p>${escapeHtml(concern.outcomeSummary)}</p></div>` : '';
    const lastEvent = concern.statusHistory?.[0] ? `<small class="concern-last-event">最近变更：${escapeHtml(concernStatusMeta[concern.statusHistory[0].to]?.label || concern.statusHistory[0].to)} · ${escapeHtml(concern.statusHistory[0].at)}</small>` : '';
    return `<article class="concern-card ${status.tone}"><div class="concern-card-head"><div><span class="concern-priority ${concern.priority}">${concern.priority === 'primary' ? '当前主要问题' : concern.priority === 'historical' ? '历史问题' : '其他问题'}</span><h4>${escapeHtml(concern.title)}</h4></div><span class="concern-status ${status.tone}">${status.label}</span></div><p>${escapeHtml(concern.summary)}</p>${closeReason}${outcome}${lastEvent}<div class="concern-card-actions">${primaryAction}<label><span>状态</span><select class="concern-status-select" data-patient="${patient.id}" data-concern="${concern.id}" aria-label="更改 ${escapeHtml(concern.title)} 的状态">${options}</select></label></div></article>`;
  }).join('');
  const history = patient.history.map((record) => `<article class="patient-history-item"><time>${escapeHtml(record.date)}</time><div><h4>${escapeHtml(record.title)}</h4><p>${escapeHtml(record.content)}</p></div></article>`).join('');
  modal(`${patient.name}的客户档案`, `<div class="patient-detail"><section class="patient-detail-head"><span class="patient-detail-avatar" style="background:${therapist?.color || '#1595a2'}">${escapeHtml(patient.name.slice(0, 1))}</span><div><span class="section-kicker">CLIENT PROFILE</span><h3>${escapeHtml(patient.name)}</h3><p>${escapeHtml(patient.profile)} · 负责康复师：${escapeHtml(therapist?.name || '待分配')}</p></div></section><section class="patient-concerns"><div class="patient-section-title"><div><span class="section-kicker">CONCERNS</span><h4>关注问题与当前诉求</h4></div><button class="concern-add-button" data-action="add-concern" data-patient="${patient.id}"><i class="icon icon-plus"></i> 新增问题</button></div><div class="concern-list">${concernCards}</div></section><section class="patient-progress-card"><div class="patient-progress-head"><div><small>当前跟进${primaryConcern ? ` · ${escapeHtml(primaryConcern.title)}` : ''}</small><h4>${escapeHtml(patient.stage)}</h4></div><strong>${completed}<small> / ${patient.total} 次到店</small></strong></div><div class="patient-progress-metrics"><span>初次反馈 <b>${patient.painBefore}</b><small>/10</small></span><span>近期反馈 <b>${patient.painNow}</b><small>/10</small></span><span>剩余服务 <b>${remaining}</b><small>次</small></span></div></section><section class="patient-next"><i class="icon icon-target"></i><div><small>下次关注重点</small><p>${escapeHtml(patient.nextFocus)}</p></div></section><section class="patient-history"><div class="patient-section-title"><div><span class="section-kicker">CARE TIMELINE</span><h4>服务记录</h4></div><span>${patient.history.length} 条</span></div>${history}</section><button class="button secondary full modal-action" data-action="open-workspace"><i class="icon icon-arrow-left"></i> 返回时间安排</button></div>`, 'patient-modal');
}

function openAddConcern(patientId) {
  const patient = workspacePatients().find((entry) => entry.id === patientId);
  if (!patient) return;
  modal(`为 ${patient.name} 新增关注问题`, `<form id="concern-form" class="assessment-form" data-patient="${patient.id}"><label>问题名称<input name="title" placeholder="例如：左肩抬举时不适" required /></label><label>当前诉求<textarea name="summary" placeholder="出现时间、主要困扰、活动目标等" required></textarea></label><label>问题优先级<select name="priority"><option value="secondary">其他问题</option><option value="primary">设为当前主要问题</option></select></label><button class="button primary full" type="submit"><i class="icon icon-plus"></i> 保存问题</button></form>`);
}

function openCloseConcern(patientId, concernId) {
  const patient = workspacePatients().find((entry) => entry.id === patientId);
  const concern = patient?.concerns.find((entry) => entry.id === concernId);
  if (!patient || !concern) return;
  modal(`关闭：${concern.title}`, `<form id="close-concern-form" class="assessment-form" data-patient="${patient.id}" data-concern="${concern.id}"><label>关闭原因<select name="reason" required><option value="目标基本达到">目标基本达到</option><option value="转为长期自主管理">转为长期自主管理</option><option value="客户主动暂停">客户主动暂停</option><option value="建议寻求其他专业支持">建议寻求其他专业支持</option><option value="长期未到店">长期未到店</option><option value="其他原因">其他原因</option></select></label><label>结果与后续安排<textarea name="outcome" placeholder="例如：日常活动基本正常，运动后继续观察。" required></textarea></label><button class="button primary full" type="submit"><i class="icon icon-archive"></i> 确认关闭并保留历史</button><button class="button secondary full" type="button" data-action="open-patient" data-patient="${patient.id}">返回档案</button></form>`);
}

function showTraining() { modal('今日居家训练', `<div class="modal-list"><article class="record-card"><time>约 12 分钟</time><h3>胸椎伸展与呼吸</h3><p>使用卷起的毛巾垫于上背，保持自然呼吸，完成 2 组，每组 8 次。</p></article><article class="record-card"><time>约 8 分钟</time><h3>颈部深屈肌激活</h3><p>轻轻收下巴，避免耸肩。完成 3 组，每组 10 次。</p></article></div><button class="button ${state.trainingDone ? 'secondary' : 'primary'} full modal-action" data-action="training-done"><i class="icon icon-circle-check"></i> ${state.trainingDone ? '今日训练已完成' : '标记今日已完成'}</button><p class="auth-secondary-note">训练内容可由康复师根据当次反馈随时调整；出现明显不适时请停止并联系康复师。</p>`); }

function showTeam() { modal('康复师团队', `<div class="therapist-list">${therapists.map((therapist) => `<article class="therapist-card"><span class="therapist-photo" style="background:${therapist.color}">${therapist.name.slice(0, 1)}</span><div class="therapist-info"><strong>${therapist.name} · ${therapist.role}</strong><p>${therapist.experience}</p><div class="therapist-tags">${therapist.skills.map((skill) => `<span>${skill}</span>`).join('')}</div></div><button class="button secondary" data-action="choose-therapist" data-therapist="${therapist.id}">预约</button></article>`).join('')}</div>`); }

function showTherapistProfile(id) {
  const therapist = therapists.find((item) => item.id === id); if (!therapist) return;
  const bio = therapist.bio || `${therapist.name}专注于${therapist.skills.join('、')}，会根据你的功能评估结果安排适合当前阶段的运动康复训练。`;
  const certifications = therapist.certifications?.length ? therapist.certifications : ['专业康复服务'];
  modal(`${therapist.name}的介绍`, `<div class="therapist-profile"><div class="therapist-profile-head"><span class="profile-portrait" style="background:${therapist.color}">${therapist.name.slice(0, 1)}</span><div><span class="section-kicker">REHABILITATION COACH</span><h3>${escapeHtml(therapist.name)} <small>${escapeHtml(therapist.role)}</small></h3><p>${escapeHtml(therapist.experience)}</p></div></div><section class="profile-intro"><h4>个人介绍</h4><p>${escapeHtml(bio)}</p></section><section class="profile-intro"><h4>擅长方向</h4><div class="therapist-tags">${therapist.skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join('')}</div></section><section class="profile-intro"><h4>专业认证</h4><div class="therapist-tags">${certifications.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div></section><div class="availability"><i class="icon icon-calendar-clock"></i><span>可预约时间</span><strong>${escapeHtml(therapist.availability || '请在预约页查看可约时段')}</strong></div><button class="button primary full modal-action" data-action="choose-therapist" data-therapist="${therapist.id}"><i class="icon icon-calendar-check"></i> 预约 ${escapeHtml(therapist.name)}</button></div>`);
}

document.addEventListener('click', (event) => {
  const previewButton = event.target.closest('[data-preview-mode]');
  if (previewButton) {
    setPreviewMode(previewButton.dataset.previewMode);
    return;
  }
  const target = event.target.closest('[data-action]'); if (!target) return;
  const { action } = target.dataset;
  if (action === 'home') showView('home');
  if (action === 'auth-entry') {
    if (!auth.loggedIn) showAuth('customer');
    else showAuth(auth.role);
  }
  if (action === 'open-auth') showAuth(auth.loggedIn ? auth.role : 'customer');
  if (action === 'select-auth-role') { state.authRole = target.dataset.role; state.authConsentBasic = false; state.authConsentSensitive = false; showAuth(state.authRole); }
  if (action === 'toggle-basic-consent') { event.preventDefault(); state.authConsentBasic = !state.authConsentBasic; showAuth('customer'); }
  if (action === 'toggle-sensitive-consent') { event.preventDefault(); state.authConsentSensitive = !state.authConsentSensitive; showAuth('customer'); }
  if (action === 'mock-wechat-login') {
    if (!state.authConsentBasic) return;
    auth = { ...defaultAuth, loggedIn: true, role: 'customer', name: config.customer, provider: '微信授权登录', basicConsent: true, sensitiveConsent: state.authConsentSensitive };
    recordConsent('basic', 'granted', ['微信账户标识', '昵称/姓名', '预约信息'], '建立账户、预约服务与服务通知');
    if (auth.sensitiveConsent) recordConsent('health', 'granted', ['当前诉求', '功能评估结果', '不适程度', '训练与服务记录'], '建立服务档案、训练跟进与居家训练建议');
    persistAuth(); renderAuth(); showAuth('customer'); toast('微信身份已验证，请授权绑定手机号');
  }
  if (action === 'authorize-phone') {
    auth = { ...auth, phone: '13800138000', phoneAuthorized: true };
    recordConsent('phone', 'granted', ['微信绑定手机号'], '预约确认、到店提醒与必要服务联系');
    persistAuth(); renderAuth(); showAuth('customer'); toast('手机号已授权绑定');
  }
  if (action === 'grant-sensitive-consent') {
    auth = { ...auth, sensitiveConsent: true };
    recordConsent('health', 'granted', ['当前诉求', '功能评估结果', '不适程度', '训练与服务记录'], '建立服务档案、训练跟进与居家训练建议');
    persistAuth(); renderAuth();
    if (target.dataset.next === 'assessment') openAssessment();
    else { closeModal(); toast('健康信息授权已记录'); }
  }
  if (action === 'show-consent-records') showConsentRecords();
  if (action === 'revoke-sensitive-consent') {
    auth = { ...auth, sensitiveConsent: false };
    recordConsent('health', 'withdrawn', ['当前诉求', '功能评估结果', '不适程度', '训练与服务记录'], '客户主动撤回健康信息新增处理授权');
    persistAuth(); renderAuth(); showConsentRecords(); toast('已撤回健康信息授权');
  }
  if (action === 'send-staff-code') { target.textContent = '已发送'; target.classList.add('sent'); toast('演示验证码已发送'); }
  if (action === 'auth-enter-app') {
    closeModal();
    if (auth.role === 'customer') showView('profile');
    else if (auth.role === 'therapist') openWorkspace();
    else { renderAdmin(); showView('admin'); }
  }
  if (action === 'auth-logout') { auth = { ...defaultAuth }; localStorage.removeItem('rehab-auth'); state.authConsentBasic = false; state.authConsentSensitive = false; renderAuth(); closeModal(); showView('home'); toast('已退出当前账号'); }
  if (action === 'open-booking') { if (!ensureCustomer()) return; closeModal(); showView('booking'); }
  if (action === 'show-plan') { if (!ensureCustomer()) return; showView('plan'); }
  if (action === 'profile') { if (!ensureCustomer()) return; showView('profile'); }
  if (action === 'close-modal' && target === event.target) closeModal();
  if (action === 'close-modal-button') closeModal();
  if (action === 'show-appointments') { if (!ensureCustomer()) return; showAppointments(); }
  if (action === 'show-records') { if (!ensureCustomer()) return; showRecords(); }
  if (action === 'open-assessment') { if (!ensureCustomer()) return; openAssessment(); }
  if (action === 'add-record') addRecord();
  if (action === 'show-training') { if (!ensureCustomer()) return; showTraining(); }
  if (action === 'training-done') { state.trainingDone = true; localStorage.setItem('rehab-training-done', 'true'); renderPlan(); closeModal(); toast('今日居家训练已记录'); }
  if (action === 'show-team') showTeam();
  if (action === 'open-therapist') showTherapistProfile(target.dataset.therapist);
  if (action === 'open-workspace') openWorkspace();
  if (action === 'select-workspace-therapist' && auth.role === 'admin') { state.workspaceTherapist = target.dataset.therapist; openWorkspace(); }
  if (action === 'open-patient') showPatientDetail(target.dataset.patient);
  if (action === 'add-concern') openAddConcern(target.dataset.patient);
  if (action === 'set-primary-concern') { updateConcern(target.dataset.patient, target.dataset.concern, { priority: 'primary', status: 'active' }, '设为当前主要问题'); showPatientDetail(target.dataset.patient); toast('已更新当前主要问题'); }
  if (action === 'open-admin') { if (!ensureStaff('admin')) return; closeModal(); renderAdmin(); showView('admin'); }
  if (action === 'select-admin-range') {
    if (!ensureStaff('admin')) return;
    adminRange = ['day', 'week', 'month'].includes(target.dataset.range) ? target.dataset.range : 'day';
    localStorage.setItem('rehab-admin-range', adminRange);
    renderAdmin();
  }
  if (action === 'export-therapists') { if (!ensureStaff('admin')) return; exportTherapistsCsv(); toast('康复师数据已导出'); }
  if (action === 'export-patients') { if (!ensureStaff('admin')) return; exportPatientsCsv(); toast('客户康复数据已导出'); }
  if (action === 'select-service') { state.selectedService = target.dataset.service; renderBooking(); }
  if (action === 'select-therapist') { state.selectedTherapist = target.dataset.therapist; renderBooking(); }
  if (action === 'select-date') { state.selectedDate = target.dataset.date; state.selectedTime = ''; renderBooking(); }
  if (action === 'select-time' && !target.disabled) { state.selectedTime = target.dataset.time; renderBooking(); }
  if (action === 'choose-therapist') { if (!ensureCustomer()) return; state.selectedTherapist = target.dataset.therapist; closeModal(); renderBooking(); showView('booking'); }
  if (action === 'cancel-booking') { state.booking = null; localStorage.removeItem('rehab-booking'); renderArrival(); renderPlan(); toast('预约已取消，时段已释放'); }
  if (action === 'confirm-booking' && state.selectedTime) {
    const service = services.find((item) => item.id === state.selectedService); const therapist = therapists.find((item) => item.id === state.selectedTherapist); const date = dates.find((item) => item.key === state.selectedDate);
    state.booking = { service, therapist, date, time: state.selectedTime }; localStorage.setItem('rehab-booking', JSON.stringify(state.booking)); renderArrival(); renderPlan(); showView('home'); toast(`已确认 ${date.day} ${state.selectedTime} 的预约`);
  }
  if (action === 'add-service') { services.push({ id: `service-${Date.now()}`, name: '新服务项目', detail: '60 分钟 · 请补充服务说明', price: '待设置', icon: 'activity' }); persistSettings(); renderAdmin(); toast('已新增一个服务项目'); }
  if (action === 'add-therapist') { therapists.push({ id: `therapist-${Date.now()}`, name: '新老师', role: '运动康复师', experience: '请补充从业经验', skills: ['待补充'], bio: '请补充这位康复师的个人介绍。', certifications: ['待补充'], availability: '请设置可预约时间', color: '#3599d9' }); persistSettings(); renderAdmin(); renderTherapists(); renderBooking(); toast('已新增一位康复师'); }
  if (action === 'delete-service') { if (services.length === 1) return toast('至少保留一个服务项目'); services = services.filter((service) => service.id !== target.dataset.id); if (!services.some((service) => service.id === state.selectedService)) state.selectedService = services[0].id; persistSettings(); renderAdmin(); renderBooking(); toast('服务项目已删除'); }
  if (action === 'delete-therapist') { if (therapists.length === 1) return toast('至少保留一位康复师'); therapists = therapists.filter((therapist) => therapist.id !== target.dataset.id); if (!therapists.some((therapist) => therapist.id === state.selectedTherapist)) state.selectedTherapist = therapists[0].id; persistSettings(); renderAdmin(); renderTherapists(); renderBooking(); toast('康复师已删除'); }
  if (action === 'reset-demo') { config = { ...defaultConfig }; therapists = structuredClone(defaultTherapists); services = structuredClone(defaultServices); auth = { ...defaultAuth }; consentLog = []; patientConcernStore = {}; adminRange = 'day'; adminDate = '2026-08-23'; ['rehab-config', 'rehab-therapists', 'rehab-services', 'rehab-booking', 'rehab-records', 'rehab-auth', 'rehab-consent-log', 'rehab-training-done', 'rehab-patient-concerns', 'rehab-admin-range', 'rehab-admin-date'].forEach((key) => localStorage.removeItem(key)); state.booking = null; state.workspaceTherapist = 'li'; state.trainingDone = false; state.records = JSON.parse('[{"date":"2026.08.18","title":"第 4 次训练 · 稳定训练","content":"颈肩紧张感较前减轻。继续进行胸椎活动度练习与核心激活，每天 12 分钟。"},{"date":"2026.08.11","title":"第 3 次训练 · 动作重建","content":"久坐后腰背紧张评分由 6 降至 4，建议工作时每 45 分钟起身活动。"}]'); renderConfig(); renderAuth(); renderTherapists(); renderBooking(); renderArrival(); renderAdmin(); toast('已恢复示例数据'); }
});

document.addEventListener('change', (event) => {
  const adminDateInput = event.target.closest('#admin-date');
  if (adminDateInput) {
    adminDate = adminDateInput.value || '2026-08-23';
    localStorage.setItem('rehab-admin-date', adminDate);
    renderAdmin();
    return;
  }
  const select = event.target.closest('.concern-status-select');
  if (!select) return;
  const { patient, concern } = select.dataset;
  if (select.value === 'closed') { openCloseConcern(patient, concern); return; }
  const status = concernStatusMeta[select.value];
  updateConcern(patient, concern, { status: select.value, closeReason: select.value === 'active' ? '' : undefined }, `状态更新为${status?.label || select.value}`);
  showPatientDetail(patient);
  toast(`问题状态已更新为${status?.label || select.value}`);
});

document.addEventListener('submit', (event) => {
  const form = event.target; if (!(form instanceof HTMLFormElement)) return;
  event.preventDefault(); const data = new FormData(form);
  if (form.id === 'concern-form') {
    const patientId = form.dataset.patient;
    const patient = workspacePatients().find((entry) => entry.id === patientId);
    if (!patient) return;
    const concerns = structuredClone(patient.concerns);
    const priority = String(data.get('priority'));
    if (priority === 'primary') concerns.forEach((concern) => { if (concern.priority === 'primary') concern.priority = 'secondary'; });
    concerns.push({ id: `${patientId}-concern-${Date.now()}`, title: String(data.get('title')), summary: String(data.get('summary')), status: 'active', priority, openedAt: '2026.08.23', updatedAt: '2026.08.23', closeReason: '', statusHistory: [{ from: '', to: 'active', at: '2026.08.23', note: '新增问题' }] });
    persistPatientConcerns(patientId, concerns); showPatientDetail(patientId); toast('新问题已加入客户档案'); return;
  }
  if (form.id === 'close-concern-form') {
    const patientId = form.dataset.patient; const concernId = form.dataset.concern;
    const reason = String(data.get('reason')); const outcome = String(data.get('outcome'));
    updateConcern(patientId, concernId, { status: 'closed', closeReason: reason, outcomeSummary: outcome, closedAt: '2026.08.23' }, `${reason}：${outcome}`);
    showPatientDetail(patientId); toast('问题已关闭，历史记录继续保留'); return;
  }
  if (form.id === 'staff-login') {
    const phone = String(data.get('phone') || '').replace(/\D/g, '');
    const code = String(data.get('code') || '');
    if (phone.length !== 11) return toast('请输入 11 位已备案手机号');
    if (code !== '123456') return toast('演示环境请输入验证码 123456');
    const isTherapist = state.authRole === 'therapist';
    const therapist = therapists.find((item) => item.id === 'li') || therapists[0];
    auth = {
      ...defaultAuth,
      loggedIn: true,
      role: state.authRole,
      name: isTherapist ? (therapist?.name || '康复师') : '王管理员',
      phone,
      provider: '手机号验证码登录',
      phoneAuthorized: true,
      therapistId: isTherapist ? therapist?.id || '' : '',
    };
    persistAuth(); renderAuth(); closeModal();
    if (auth.role === 'therapist') openWorkspace();
    else { renderAdmin(); showView('admin'); }
    toast(`${roleLabel(auth.role)}身份已验证`);
    return;
  }
  if (form.id === 'admin-basics') { config = { ...config, ...Object.fromEntries(data.entries()) }; persistSettings(); renderConfig(); renderArrival(); toast('基础资料已同步到客户端'); }
  if (form.id === 'admin-plan') { config = { ...config, ...Object.fromEntries(data.entries()) }; persistSettings(); renderConfig(); toast('康复安排已保存'); }
  if (form.dataset.editor === 'service') { const service = services.find((item) => item.id === form.dataset.id); Object.assign(service, Object.fromEntries(data.entries())); persistSettings(); renderBooking(); renderArrival(); renderAdmin(); toast('服务项目已保存'); }
  if (form.dataset.editor === 'therapist') { const therapist = therapists.find((item) => item.id === form.dataset.id); const edited = Object.fromEntries(data.entries()); Object.assign(therapist, edited, { skills: edited.skills.split(/[，,]/).map((skill) => skill.trim()).filter(Boolean), certifications: edited.certifications.split(/[，,]/).map((item) => item.trim()).filter(Boolean) }); persistSettings(); renderTherapists(); renderBooking(); renderArrival(); renderAdmin(); toast('康复师资料已保存'); }
});

setPreviewMode(localStorage.getItem('rehab-preview-mode') || 'web');
renderConfig(); renderAuth(); renderTherapists(); renderBooking(); renderArrival(); renderPlan(); renderAdmin();
