<template>
  <section class="message-wrapper">
    <client-only>
      <quill-editor
        ref="editor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />
    </client-only>

    <a-form-model
      ref="form"
      layout="inline"
      :model="messageForm"
      :rules="rules"
    >
      <a-form-model-item prop="name">
        <a-input v-model="messageForm.name" placeholder="姓名">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="email">
        <a-input v-model="messageForm.email" type="email" placeholder="邮箱">
          <a-icon
            slot="prefix"
            type="mail"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          :disabled="messageForm.name === '' || messageForm.email === ''"
          @click="handleSubmit"
        >
          发布
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </section>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      content: '',
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'blockquote', 'code-block'],
            [
              { indent: '-1' },
              { indent: '+1' },
              { list: 'ordered' },
              { list: 'bullet' },
            ],
            ['link', 'image'],
          ],
        },
      },
      messageForm: {
        name: '',
        email: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          },
          {
            max: 10,
            message: '请输入10个字符以内的姓名',
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: '请输入正确的邮箱',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.message-wrapper {
  /deep/ .quill-editor {
    margin-bottom: 10px;
    .ql-container {
      min-height: 120px;
    }
  }
}
</style>
