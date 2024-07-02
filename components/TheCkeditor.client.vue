<script setup>
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

defineProps({
  onEditorBlur: {
    type: Function,
    default: () => {}
  }
})

const ckeditor = defineComponent(CKEditor.component)
const editorData = ref('')
const editorConfig = {
  placeholder: '請輸入提案說明, 至少 350 字'
}
</script>

<template>
  <ckeditor
    v-model="editorData"
    :editor="ClassicEditor"
    :config="editorConfig"
    @blur="onEditorBlur"
  >
  </ckeditor>
</template>
