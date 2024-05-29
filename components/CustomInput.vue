<script setup lang="ts">
// const modalValue = defineModel()
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
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
  rules: {
    type: String,
    default: ''
  }
})
const { value, errorMessage, meta } = useField(() => props.name)
</script>
<template>
  <div class="flex w-full flex-shrink-0 flex-col space-y-2">
    <label v-if="label" :for="name" class="text-neutral-800">
      {{ label }}
      <span v-if="isRequired" class="text-warning-500">*</span>
    </label>
    <input
      :id="name"
      v-model="value"
      class="peer relative min-h-12 w-full appearance-none rounded-[3px] border border-neutral-400 p-3 outline-offset-0 transition-all focus:outline-0 focus:outline-offset-0"
      :class="{ 'border-warning-500': errorMessage, valid: meta.valid }"
      :placeholder="placeholder"
      :type="type || 'text'"
      :disabled="isDisabled"
      :readonly="isReadonly"
      :rules="rules"
    />
    <p :class="errorMessage ? ' pb-5 text-warning-500 peer-invalid:visible' : ''">
      {{ errorMessage }}
    </p>
  </div>
</template>
