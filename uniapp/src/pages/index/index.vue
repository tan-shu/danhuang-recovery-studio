<script setup>
import { computed, ref } from 'vue'
import { clients, dates, schedule, services, therapists, timeSlots, training } from '../../data/demo.js'

const activeView = ref('home')
const activeRole = ref('customer')
const showRoleMenu = ref(false)
const modal = ref('')
const modalId = ref('')
const selectedService = ref(services[0].id)
const selectedTherapist = ref(therapists[0].id)
const selectedDate = ref(dates[0].id)
const selectedTime = ref('')
const adminPeriod = ref('day')
const basicConsent = ref(false)
const healthConsent = ref(false)
const loggedIn = ref(Boolean(uni.getStorageSync('danhuang-auth')))
const phoneBound = ref(Boolean(uni.getStorageSync('danhuang-phone')))
const trainingDone = ref(Boolean(uni.getStorageSync('danhuang-training-done')))
const booking = ref(uni.getStorageSync('danhuang-booking') || null)

const currentTherapist = computed(() => therapists.find((item) => item.id === selectedTherapist.value) || therapists[0])
const currentClient = computed(() => clients.find((item) => item.id === modalId.value) || clients[0])
const modalTherapist = computed(() => therapists.find((item) => item.id === modalId.value) || therapists[0])
const filteredSchedule = computed(() => activeRole.value === 'admin' ? schedule : schedule.filter((item) => item.therapistId === selectedTherapist.value))
const navItems = [
  { id: 'home', label: '首页', icon: '⌂' },
  { id: 'booking', label: '预约', icon: '日' },
  { id: 'plan', label: '安排', icon: '训' },
  { id: 'profile', label: '我的', icon: '我' },
]

function therapistName(id) {
  return (therapists.find((item) => item.id === id) || {}).name || '待分配'
}

function clientName(id) {
  return (clients.find((item) => item.id === id) || {}).name || '客户'
}

function go(view) {
  activeView.value = view
  showRoleMenu.value = false
  modal.value = ''
  uni.pageScrollTo({ scrollTop: 0, duration: 160 })
}

function chooseRole(role) {
  activeRole.value = role
  if (role === 'therapist') go('workspace')
  if (role === 'admin') go('admin')
  if (role === 'customer') go('home')
}

function openTherapist(id) {
  modalId.value = id
  modal.value = 'therapist'
}

function openClient(id) {
  modalId.value = id
  modal.value = 'client'
}

function confirmBooking() {
  if (!selectedTime.value) return uni.showToast({ title: '请先选择时段', icon: 'none' })
  const service = services.find((item) => item.id === selectedService.value)
  const date = dates.find((item) => item.id === selectedDate.value)
  const value = { service: service.name, therapist: currentTherapist.value.name, date: date.full, weekday: date.weekday, time: selectedTime.value }
  booking.value = value
  uni.setStorageSync('danhuang-booking', value)
  uni.showToast({ title: '预约已确认', icon: 'success' })
  go('home')
}

function cancelBooking() {
  booking.value = null
  uni.removeStorageSync('danhuang-booking')
  uni.showToast({ title: '预约已取消', icon: 'none' })
}

function markTraining() {
  trainingDone.value = !trainingDone.value
  uni.setStorageSync('danhuang-training-done', trainingDone.value)
  uni.showToast({ title: trainingDone.value ? '今日训练已记录' : '已撤销完成状态', icon: 'none' })
}

function signIn() {
  if (!basicConsent.value) return uni.showToast({ title: '请先同意用户协议与隐私政策', icon: 'none' })
  // #ifdef MP-WEIXIN
  uni.login({ provider: 'weixin', success: () => completeSignIn('微信演示账户'), fail: () => uni.showToast({ title: '微信登录未完成', icon: 'none' }) })
  // #endif
  // #ifdef H5
  completeSignIn('Web 演示账户')
  // #endif
}

function completeSignIn(provider) {
  uni.setStorageSync('danhuang-auth', { provider, healthConsent: healthConsent.value, at: new Date().toISOString() })
  loggedIn.value = true
  uni.showToast({ title: '登录成功', icon: 'success' })
}

function bindPhone(event) {
  if (event && event.detail && event.detail.errMsg && !event.detail.errMsg.includes('ok')) return uni.showToast({ title: '未获得手机号授权', icon: 'none' })
  phoneBound.value = true
  uni.setStorageSync('danhuang-phone', true)
  uni.showToast({ title: '手机号已绑定', icon: 'success' })
}

function logout() {
  uni.removeStorageSync('danhuang-auth')
  uni.removeStorageSync('danhuang-phone')
  loggedIn.value = false
  phoneBound.value = false
  uni.showToast({ title: '已退出演示账户', icon: 'none' })
}

function exportData(kind) {
  const rows = kind === 'clients'
    ? clients.map((item) => `${item.name},${therapistName(item.therapistId)},${item.stage},${item.done}/${item.total}`)
    : therapists.map((item) => `${item.name},${item.role},${item.experience},${item.availability}`)
  const heading = kind === 'clients' ? '客户,负责康复师,当前阶段,到店次数' : '康复师,角色,经验,可预约时间'
  const csv = `\ufeff${heading}\n${rows.join('\n')}`
  // #ifdef H5
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${kind === 'clients' ? '客户数据' : '康复师数据'}-demo.csv`
  link.click()
  URL.revokeObjectURL(link.href)
  uni.showToast({ title: 'CSV 已导出', icon: 'success' })
  // #endif
  // #ifdef MP-WEIXIN
  uni.setClipboardData({ data: csv, success: () => uni.showToast({ title: '数据已复制', icon: 'none' }) })
  // #endif
}
</script>

<template>
  <view class="app-shell">
    <view class="topbar safe-top">
      <view class="brand" @tap="go('home')">
        <view class="brand-mark">D</view>
        <view class="brand-copy"><text class="brand-name">蛋黄康复工作室</text><text class="brand-subtitle">Recovery · Movement · Performance</text></view>
      </view>
      <button class="role-button" @tap="showRoleMenu = !showRoleMenu"><text>{{ activeRole === 'customer' ? '客户' : activeRole === 'therapist' ? '康复师' : '管理员' }}</text><text class="chevron">⌄</text></button>
      <view v-if="showRoleMenu" class="role-menu"><button @tap="chooseRole('customer')">客户体验</button><button @tap="chooseRole('therapist')">康复师工作台</button><button @tap="chooseRole('admin')">管理员后台</button></view>
    </view>

    <view class="content">
      <view v-if="activeView === 'home'" class="screen home-screen">
        <view class="hero">
          <image class="hero-image" src="/static/rehab-consultation-hero.png" mode="aspectFill" />
          <view class="hero-overlay"><text class="eyebrow">FUNCTION · MOVEMENT · PERFORMANCE</text><text class="hero-title">专业功能评估与运动康复训练</text><text class="hero-copy">专业评估、到店预约与居家训练，会根据每次反馈灵活调整。</text><button class="hero-action" @tap="go('booking')">预约本次训练 →</button></view>
        </view>

        <view class="appointment-panel">
          <view class="section-heading compact"><view><text class="eyebrow">NEXT VISIT</text><text class="section-title">近期到店安排</text></view><text class="status-pill" :class="booking ? 'active' : ''">{{ booking ? '已预约' : '未预约' }}</text></view>
          <view v-if="booking" class="appointment-detail"><view class="date-block"><text>{{ booking.weekday }}</text><strong>{{ booking.date.slice(-2) }}</strong></view><view class="appointment-copy"><text class="item-title">{{ booking.service }}</text><text>{{ booking.time }} · {{ booking.therapist }}</text><text>滨江康复中心 · 2F 服务区</text></view><button class="icon-button" @tap="cancelBooking">×</button></view>
          <view v-else class="empty-appointment"><view class="empty-icon">···</view><view><text class="item-title">暂无到店计划</text><text>预约后将同步显示门店、康复师和时段。</text></view></view>
          <view class="button-row"><button class="primary-button" @tap="go('booking')">预约到店</button><button class="secondary-button" @tap="go('plan')">查看安排</button></view>
        </view>

        <view class="quick-grid">
          <button class="quick-item" @tap="go('booking')"><text class="quick-icon aqua">日</text><strong>预约到店</strong><text>选择时段与老师</text></button>
          <button class="quick-item" @tap="modal = 'assessment'"><text class="quick-icon blue">评</text><strong>功能评估</strong><text>评估与建档</text></button>
          <button class="quick-item" @tap="go('plan')"><text class="quick-icon yellow">卡</text><strong>服务卡项</strong><text>剩余 4 次</text></button>
          <button class="quick-item" @tap="go('plan')"><text class="quick-icon aqua">训</text><strong>居家训练</strong><text>今日 2 项</text></button>
        </view>

        <view class="metrics-grid"><view><text class="metric-label">剩余服务</text><strong>4<small> 次</small></strong><text>本期共 8 次</text></view><view><text class="metric-label">最近到店</text><strong>08.18</strong><text>脊柱功能训练</text></view><view><text class="metric-label">今日训练</text><strong>{{ trainingDone ? '已完成' : '待完成' }}</strong><text>约 20 分钟</text></view></view>

        <view class="team-section">
          <view class="section-heading"><view><text class="eyebrow">OUR TEAM</text><text class="section-title">康复师团队</text></view><text class="text-link">共 {{ therapists.length }} 位</text></view>
          <scroll-view class="team-scroll" scroll-x enable-flex><view class="team-row"><view v-for="person in therapists" :key="person.id" class="therapist-card" @tap="openTherapist(person.id)"><view class="portrait" :style="{ backgroundColor: person.color }">{{ person.name.slice(0, 1) }}</view><view class="therapist-copy"><text class="item-title">{{ person.name }} · {{ person.role }}</text><text>{{ person.experience }}</text><view class="tags"><text v-for="skill in person.skills" :key="skill">{{ skill }}</text></view></view><text class="card-arrow">›</text></view></view></scroll-view>
        </view>
        <view class="scope-note"><text class="scope-title">服务范围说明</text><text>本工作室提供功能评估、运动康复训练与运动表现恢复，不替代医疗机构提供疾病诊断、治疗或处方服务；如有明显不适，请及时咨询合格医疗机构。</text></view>
      </view>

      <view v-else-if="activeView === 'booking'" class="screen narrow-screen">
        <view class="page-heading"><text class="eyebrow">MAKE A BOOKING</text><text class="page-title">预约到店</text><text>选择服务、康复师和方便的时间。</text></view>
        <view class="form-section"><text class="form-label">1 · 选择服务</text><button v-for="item in services" :key="item.id" class="select-card" :class="{ selected: selectedService === item.id }" @tap="selectedService = item.id"><text class="service-icon">{{ item.icon }}</text><view><strong>{{ item.name }}</strong><text>{{ item.detail }}</text></view><text class="radio">{{ selectedService === item.id ? '●' : '○' }}</text></button></view>
        <view class="form-section"><text class="form-label">2 · 选择康复师</text><scroll-view class="teacher-picker" scroll-x enable-flex><view class="teacher-row"><button v-for="person in therapists" :key="person.id" class="teacher-chip" :class="{ selected: selectedTherapist === person.id }" @tap="selectedTherapist = person.id"><text class="teacher-avatar" :style="{ backgroundColor: person.color }">{{ person.name.slice(0, 1) }}</text><strong>{{ person.name }}</strong><text>{{ person.role }}</text></button></view></scroll-view></view>
        <view class="form-section"><text class="form-label">3 · 选择日期</text><view class="date-grid"><button v-for="item in dates" :key="item.id" :class="{ selected: selectedDate === item.id }" @tap="selectedDate = item.id"><text>{{ item.weekday }}</text><strong>{{ item.day }}</strong></button></view></view>
        <view class="form-section"><text class="form-label">4 · 可预约时段</text><view class="time-grid"><button v-for="time in timeSlots" :key="time" :class="{ selected: selectedTime === time }" @tap="selectedTime = time">{{ time }}</button></view></view>
        <button class="primary-button full" @tap="confirmBooking">确认预约</button>
      </view>

      <view v-else-if="activeView === 'plan'" class="screen narrow-screen">
        <view class="page-heading"><text class="eyebrow">FLEXIBLE ARRANGEMENT</text><text class="page-title">近期服务安排</text><text>预约与训练会根据每次反馈调整，不代表固定恢复进度或时限。</text></view>
        <view class="plan-card"><view class="section-heading compact"><view><text class="eyebrow">APPOINTMENT</text><text class="section-title">下次预约</text></view><text class="status-pill" :class="booking ? 'active' : ''">{{ booking ? '已确认' : '待预约' }}</text></view><view v-if="booking" class="plan-detail"><strong>{{ booking.date }} {{ booking.time }}</strong><text>{{ booking.service }} · {{ booking.therapist }}</text></view><view v-else class="plan-detail"><strong>暂无预约</strong><text>根据近期状态选择方便的时间。</text><button class="text-action" @tap="go('booking')">去预约 →</button></view></view>
        <view class="plan-card"><view class="section-heading compact"><view><text class="eyebrow">HOME TRAINING</text><text class="section-title">今日居家训练</text></view><text>{{ trainingDone ? '已完成' : '约 20 分钟' }}</text></view><view v-for="(item, index) in training" :key="item.title" class="training-item"><text class="training-index">{{ index + 1 }}</text><view><strong>{{ item.title }}</strong><text>{{ item.duration }} · {{ item.detail }}</text></view></view><button class="full" :class="trainingDone ? 'secondary-button' : 'primary-button'" @tap="markTraining">{{ trainingDone ? '撤销完成状态' : '标记今日已完成' }}</button><text class="fine-print">训练内容可由康复师根据反馈随时调整；出现明显不适时请停止并联系康复师。</text></view>
        <view class="plan-card"><text class="eyebrow">CURRENT CONCERNS</text><text class="section-title">当前诉求</text><view v-for="concern in clients[0].concerns" :key="concern.title" class="concern-row"><view><strong>{{ concern.title }}</strong><text>最近更新 · 2026.08.23</text></view><text class="concern-status" :class="concern.tone">{{ concern.status }}</text></view></view>
      </view>

      <view v-else-if="activeView === 'profile'" class="screen narrow-screen">
        <view class="page-heading"><text class="eyebrow">ACCOUNT & PRIVACY</text><text class="page-title">我的账户</text><text>预约、授权记录与个人服务档案。</text></view>
        <view v-if="!loggedIn" class="auth-card"><view class="auth-brand"><view class="wechat-mark">微</view><view><strong>微信快捷登录</strong><text>Web 版使用演示账户，小程序调用微信登录能力。</text></view></view><label class="consent-row" @tap="basicConsent = !basicConsent"><text class="checkbox">{{ basicConsent ? '✓' : '' }}</text><text>我已阅读并同意《用户协议》和《隐私政策》，授权处理账户、预约与通知所需的基础信息。</text></label><label class="consent-row" @tap="healthConsent = !healthConsent"><text class="checkbox">{{ healthConsent ? '✓' : '' }}</text><text>我单独同意为建立服务档案处理健康信息，包括当前诉求、功能评估结果、不适程度与训练反馈。</text></label><button class="primary-button full" @tap="signIn">微信授权登录</button><text class="fine-print">未同意健康信息授权仍可注册和预约，建立服务档案前会再次确认。</text></view>
        <view v-else class="auth-card"><view class="account-head"><view class="account-avatar">林</view><view><strong>林溪</strong><text>客户演示账户 · {{ phoneBound ? '手机号已绑定' : '手机号未绑定' }}</text></view></view><!-- #ifdef MP-WEIXIN --><button v-if="!phoneBound" class="primary-button full" open-type="getPhoneNumber" @getphonenumber="bindPhone">授权绑定手机号</button><!-- #endif --><!-- #ifdef H5 --><button v-if="!phoneBound" class="primary-button full" @tap="bindPhone">绑定手机号（Web 演示）</button><!-- #endif --><view class="privacy-summary"><strong>授权记录</strong><text>基础信息：账户标识、姓名、预约信息</text><text>敏感健康信息：{{ healthConsent ? '已单独授权' : '尚未授权' }}</text><text>手机号：{{ phoneBound ? '已授权' : '尚未授权' }}</text></view><button class="secondary-button full" @tap="openClient('lin')">查看我的服务档案</button><button class="text-action full" @tap="logout">退出演示账户</button></view>
        <view class="security-note"><strong>角色与权限</strong><text>客户只能查看自己的资料；康复师只能查看本人日程与负责客户；管理员可以查看工作室全部客户并导出分析数据。</text></view>
      </view>

      <view v-else-if="activeView === 'workspace'" class="screen dashboard-screen">
        <view class="page-heading dashboard-heading"><view><text class="eyebrow">THERAPIST WORKSPACE</text><text class="page-title">{{ currentTherapist.name }}的时间安排</text><text>今天 · 2026.08.24</text></view><button class="secondary-button" @tap="go('home')">返回客户端</button></view>
        <scroll-view class="workspace-tabs" scroll-x enable-flex><view class="teacher-row"><button v-for="person in therapists" :key="person.id" :class="{ selected: selectedTherapist === person.id }" @tap="selectedTherapist = person.id">{{ person.name }}</button></view></scroll-view>
        <view class="summary-grid"><view><strong>{{ filteredSchedule.length }}</strong><text>今日预约</text></view><view><strong>1</strong><text>待补记录</text></view><view><strong>{{ clients.filter((item) => item.therapistId === selectedTherapist).length }}</strong><text>负责客户</text></view></view>
        <view class="workspace-list"><view v-for="item in filteredSchedule" :key="item.time + item.clientId" class="schedule-row" @tap="openClient(item.clientId)"><text class="schedule-time">{{ item.time }}</text><view><strong>{{ clientName(item.clientId) }}</strong><text>{{ item.service }} · {{ item.status }}</text></view><text class="card-arrow">›</text></view><view v-if="!filteredSchedule.length" class="empty-state">今天暂无这位康复师的安排。</view></view>
        <view class="security-note"><strong>权限提示</strong><text>康复师账户仅显示本人日程和负责客户。预约可同步日历，但客户档案应以业务数据库为唯一数据来源。</text></view>
      </view>

      <view v-else-if="activeView === 'admin'" class="screen dashboard-screen">
        <view class="page-heading dashboard-heading"><view><text class="eyebrow">OPERATIONS</text><text class="page-title">运营概览</text><text>管理员视图 · 数据均为演示内容</text></view><button class="secondary-button" @tap="go('home')">返回客户端</button></view>
        <view class="period-control"><button v-for="period in ['day', 'week', 'month']" :key="period" :class="{ selected: adminPeriod === period }" @tap="adminPeriod = period">{{ period === 'day' ? '日' : period === 'week' ? '周' : '月' }}</button></view>
        <view class="admin-stats"><view><text>预约</text><strong>{{ adminPeriod === 'day' ? 3 : adminPeriod === 'week' ? 18 : 72 }}</strong><small>较上期 +12%</small></view><view><text>覆盖客户</text><strong>{{ adminPeriod === 'day' ? 3 : adminPeriod === 'week' ? 14 : 31 }}</strong><small>活跃服务中</small></view><view><text>完成率</text><strong>86%</strong><small>已确认与完成</small></view><view><text>待补记录</text><strong>2</strong><small>需要跟进</small></view></view>
        <view class="admin-band"><view class="section-heading"><view><text class="eyebrow">TEAM LOAD</text><text class="section-title">康复师工作量</text></view></view><view v-for="(person, index) in therapists" :key="person.id" class="load-row"><view class="portrait small" :style="{ backgroundColor: person.color }">{{ person.name.slice(0, 1) }}</view><view class="load-copy"><strong>{{ person.name }}</strong><view class="load-bar"><text :style="{ width: `${82 - index * 16}%`, backgroundColor: person.color }"></text></view></view><text>{{ 8 - index * 2 }} 次</text></view></view>
        <view class="admin-band"><view class="section-heading"><view><text class="eyebrow">CLIENT OVERVIEW</text><text class="section-title">客户概览</text></view><text class="text-link">{{ clients.length }} 位</text></view><view v-for="client in clients" :key="client.id" class="client-row" @tap="openClient(client.id)"><view><strong>{{ client.name }}</strong><text>{{ therapistName(client.therapistId) }} · {{ client.stage }}</text></view><text>{{ client.done }}/{{ client.total }} 次 ›</text></view></view>
        <view class="export-band"><view><strong>数据导出</strong><text>用于工作室内部运营分析</text></view><view class="button-row"><button class="secondary-button" @tap="exportData('therapists')">导出康复师</button><button class="primary-button" @tap="exportData('clients')">导出客户数据</button></view><text class="fine-print">客户导出文件包含敏感健康信息，仅限在已授权业务范围内使用，请控制访问并妥善存储。</text></view>
        <view class="settings-band"><text class="eyebrow">LESS USED</text><text class="section-title">基础设置</text><button>工作室资料 <text>›</text></button><button>服务项目 <text>›</text></button><button>康复师团队 <text>›</text></button><button>权限与授权日志 <text>›</text></button></view>
      </view>
    </view>

    <view v-if="['home', 'booking', 'plan', 'profile'].includes(activeView)" class="bottom-nav safe-bottom"><button v-for="item in navItems" :key="item.id" :class="{ active: activeView === item.id }" @tap="go(item.id)"><text class="nav-icon">{{ item.icon }}</text><text>{{ item.label }}</text></button></view>

    <view v-if="modal" class="modal-backdrop" @tap="modal = ''">
      <view class="modal-sheet" @tap.stop><view class="modal-handle"></view><button class="modal-close" @tap="modal = ''">×</button>
        <view v-if="modal === 'therapist'" class="modal-content"><view class="profile-head"><view class="portrait large" :style="{ backgroundColor: modalTherapist.color }">{{ modalTherapist.name.slice(0, 1) }}</view><view><text class="eyebrow">REHABILITATION COACH</text><text class="page-title">{{ modalTherapist.name }}</text><text>{{ modalTherapist.role }} · {{ modalTherapist.experience }}</text></view></view><view class="modal-section"><strong>个人介绍</strong><text>{{ modalTherapist.bio }}</text></view><view class="modal-section"><strong>擅长方向</strong><view class="tags"><text v-for="skill in modalTherapist.skills" :key="skill">{{ skill }}</text></view></view><view class="modal-section"><strong>专业认证</strong><view class="tags"><text v-for="item in modalTherapist.certifications" :key="item">{{ item }}</text></view></view><view class="availability"><text>可预约时间</text><strong>{{ modalTherapist.availability }}</strong></view><button class="primary-button full" @tap="selectedTherapist = modalId; go('booking')">预约这位康复师</button></view>
        <view v-else-if="modal === 'client'" class="modal-content"><view class="profile-head"><view class="account-avatar">{{ currentClient.name.slice(0, 1) }}</view><view><text class="eyebrow">CLIENT PROFILE</text><text class="page-title">{{ currentClient.name }}</text><text>{{ currentClient.profile }} · {{ therapistName(currentClient.therapistId) }}</text></view></view><view class="demand-card"><text>当前主要诉求</text><strong>{{ currentClient.demand }}</strong></view><view class="progress-card"><view><text>当前阶段</text><strong>{{ currentClient.stage }}</strong></view><strong>{{ currentClient.done }}<small>/{{ currentClient.total }} 次</small></strong></view><view class="score-grid"><view><text>初次反馈</text><strong>{{ currentClient.before }}/10</strong></view><view><text>近期反馈</text><strong>{{ currentClient.now }}/10</strong></view><view><text>剩余服务</text><strong>{{ currentClient.total - currentClient.done }} 次</strong></view></view><view class="modal-section"><strong>关注问题与历史</strong><view v-for="concern in currentClient.concerns" :key="concern.title" class="concern-row"><view><strong>{{ concern.title }}</strong><text>状态变更会保留历史记录</text></view><text class="concern-status" :class="concern.tone">{{ concern.status }}</text></view></view><view class="modal-section"><strong>服务记录</strong><view v-for="record in currentClient.records" :key="record.date + record.title" class="record-row"><text>{{ record.date }}</text><strong>{{ record.title }}</strong><text>{{ record.content }}</text></view></view><view class="feedback-note"><strong>问题关闭后的反馈</strong><text>关闭问题时收集目标达成度、近期状态、服务体验和后续意愿；反馈与原问题历史关联保存。</text></view></view>
        <view v-else class="modal-content"><text class="eyebrow">FUNCTIONAL ASSESSMENT</text><text class="page-title">功能评估与建档</text><text>建档前会单独请求健康信息授权。可记录当前诉求、活动情况、功能评估结果、不适程度、训练反馈和相关附件。</text><view class="security-note"><strong>最小必要原则</strong><text>仅管理员和负责康复师按权限查看；客户可查询授权记录并申请撤回。</text></view><button class="primary-button full" @tap="modal = ''; go('profile')">前往授权与建档</button></view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
