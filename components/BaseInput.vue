<template>
  <div class="flex w-full flex-shrink-0 flex-col space-y-2">
    <label class="text-neutral-800">
      {{ inputTitle }}
      <span v-if="isRequired" class="text-warning-500">*</span>
    </label>
    <input
      :type="type"
      class="peer relative min-h-12 w-full appearance-none rounded-[3px] border border-neutral-400 p-3 outline-offset-0 transition-all focus:outline-0 focus:outline-offset-0"
      value=""
      :placeholder="placeholder"
      isReadonly
      isDisabled
    />
    <p v-if="msg" class="text-warning-500 peer-invalid:visible">{{ msg }}</p>
  </div>
</template>
<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'text'
  },
  inputTitle: {
    type: String,
    default: 'input name'
  },
  formLabel: {
    type: String,
    default: 'input label'
  },
  placeholder: {
    type: String,
    default: 'placeholder'
  },
  isRequired: {
    type: Boolean,
    default: false
  },
  isReadonly: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  msg: {
    type: String,
    default: ''
  }
})
</script>
