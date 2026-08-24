export const therapists = [
  {
    id: 'li', name: '李老师', role: '运动康复师', experience: '8 年从业经验',
    skills: ['肩颈体态', '运动表现恢复'],
    bio: '专注于肩颈不适、久坐体态与运动表现恢复，结合功能评估、动作支持与循序渐进的运动康复训练。',
    certifications: ['运动康复认证', '筋膜技术认证'], availability: '周一至周六 · 09:30 - 18:00', color: '#087f91',
  },
  {
    id: 'zhou', name: '周老师', role: '功能训练师', experience: '6 年从业经验',
    skills: ['腰背活动', '产后运动恢复'],
    bio: '重视每位客户的生活方式与活动目标，用清晰的阶段目标帮助身体重新找回力量与信心。',
    certifications: ['功能评估认证', '产后运动进阶'], availability: '周二至周日 · 10:00 - 19:00', color: '#398fd1',
  },
  {
    id: 'chen', name: '陈老师', role: '运动表现教练', experience: '5 年训练经验',
    skills: ['功能训练', '运动表现恢复'],
    bio: '将运动康复训练带回真实运动场景，关注跑步、力量训练和日常活动中的动作效率。',
    certifications: ['体能训练认证', '跑步表现训练'], availability: '周一至周五 · 11:00 - 20:00', color: '#d99a2b',
  },
]

export const services = [
  { id: 'assessment', name: '功能评估', detail: '45 分钟 · 动作与活动能力评估', icon: '评' },
  { id: 'spine', name: '脊柱功能训练', detail: '60 分钟 · 动作支持与运动康复训练', icon: '脊' },
  { id: 'performance', name: '运动表现恢复训练', detail: '60 分钟 · 不适管理与功能训练', icon: '动' },
]

export const dates = [
  { id: '0825', weekday: '周二', day: '25', full: '2026-08-25' },
  { id: '0826', weekday: '周三', day: '26', full: '2026-08-26' },
  { id: '0827', weekday: '周四', day: '27', full: '2026-08-27' },
  { id: '0828', weekday: '周五', day: '28', full: '2026-08-28' },
]

export const timeSlots = ['09:30', '11:00', '14:00', '15:30', '17:00']

export const clients = [
  {
    id: 'lin', name: '林溪', profile: '31 岁 · 设计师', therapistId: 'li',
    stage: '近期关注 · 胸椎活动与稳定训练', done: 4, total: 8, before: 6, now: 3,
    demand: '久坐后颈肩紧张、转头受限，希望恢复规律力量训练并减少工作日疲劳。',
    concerns: [
      { title: '颈肩紧张与转头受限', status: '当前主要问题', tone: 'active' },
      { title: '右手腕训练后不适', status: '居家训练', tone: 'home' },
      { title: '左踝旧伤回访', status: '已关闭', tone: 'closed' },
    ],
    records: [
      { date: '2026.08.18', title: '第 4 次训练 · 稳定训练', content: '颈肩紧张感较前减轻，继续进行胸椎活动度练习与核心激活。' },
      { date: '2026.08.11', title: '第 3 次训练 · 动作重建', content: '久坐后紧张评分由 6 降至 4，建议每 45 分钟起身活动。' },
    ],
  },
  {
    id: 'wu', name: '吴晨', profile: '34 岁 · 产品经理', therapistId: 'zhou',
    stage: '动作舒适度与负荷调整', done: 2, total: 8, before: 7, now: 4,
    demand: '久坐和通勤后腰背酸紧，希望稳定完成每周两次力量训练。',
    concerns: [
      { title: '久坐后腰背活动受限', status: '当前主要问题', tone: 'active' },
      { title: '右髋前侧紧张', status: '居家训练', tone: 'home' },
    ],
    records: [{ date: '2026.08.21', title: '第 2 次训练 · 骨盆稳定', content: '站立耐受时间提升，已调整办公间歇策略。' }],
  },
  {
    id: 'jiang', name: '蒋远', profile: '28 岁 · 跑步爱好者', therapistId: 'li',
    stage: '初次功能评估', done: 0, total: 6, before: 6, now: 6,
    demand: '跑步后右膝外侧不适，希望逐步恢复 10 公里训练。',
    concerns: [{ title: '跑步后右膝外侧不适', status: '待评估', tone: 'pending' }],
    records: [{ date: '2026.08.23', title: '预约前问卷', content: '不适主要出现在跑步 5 公里后，下坡与久坐起身时较明显。' }],
  },
]

export const schedule = [
  { time: '09:30', clientId: 'lin', therapistId: 'li', service: '脊柱功能训练', status: '已完成' },
  { time: '11:00', clientId: 'jiang', therapistId: 'li', service: '功能评估', status: '待确认' },
  { time: '14:00', clientId: 'wu', therapistId: 'zhou', service: '腰背功能训练', status: '已确认' },
]

export const training = [
  { title: '胸椎伸展与呼吸', duration: '约 12 分钟', detail: '完成 2 组，每组 8 次，保持自然呼吸。' },
  { title: '颈部深屈肌激活', duration: '约 8 分钟', detail: '轻轻收下巴，避免耸肩，完成 3 组。' },
]
