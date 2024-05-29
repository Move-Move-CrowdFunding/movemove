/* eslint import/namespace: ['error', { allowComputed: true }] */
import { defineRule, configure } from 'vee-validate'

import { localize, setLocale } from '@vee-validate/i18n'
import * as AllRules from '@vee-validate/rules'

import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

//
// 調整觸發行為
// validateOnBlur：離開焦點時觸發，預設 true
// validateOnChange：欄位在 change 事件觸發，預設 true
// validateOnInput：輸入內容時觸發，預設 false
// validateOnModelUpdate：update:modelValue (v-model) 事件觸發，預設 true
configure({
  generateMessage: localize({
    zhTW,
    messages: {
      required: '此欄位為必填'
    }
  }),
  validateOnInput: true
})

setLocale('zhTW')

// 必須定義，用來封裝 plugin
export default defineNuxtPlugin((_nuxtApp) => {})
