$(function () {
  const form = layui.form
  const layer = layui.layer


  // 设定规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    namePwd: function (value) {
      if (value === $('[name="old_pwd"]').val()) {
        return '新旧密码不能一样'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name="new_pwd"]').val()) {
        return '两次密码不一样'
      }
    }
  })

  // 监听表单的提交事件
  $('.layui-btn').on('submit', function (e) {

    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      method: 'PATCH',
      url: '/my/updatepwd',
      // data:$(this).serialize(),
      data: form.val('pwdForm'),  // 两种方法都可以获取表单数据
      success: function (res) {
        if (res.code !== 0) {
          return layer.msg('修改密码失败')
        }
        layer.msg('修改密码成功')

        // 清空表单数据
        $('.layui-form')[0].reset()
      }
    })
  })



})