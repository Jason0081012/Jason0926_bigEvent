$(function () {
  $('#go2reg').on('click', function () {
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })
  $('#go2login').on('click', function () {
    $('.login-wrap').show()
    $('.reg-wrap').hide()
  })


  const form = layui.form
  const layer = layui.layer
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {

      const value1 = $('.reg-wrap [name="password"]').val()
      if (value !== value1) {
        return '两次密码不一致，请重新输入'
      }
    }
  })

  


  $('#regForm').on('submit', function (e) {

    e.preventDefault()
    // console.log($('#regForm').serialize())
// console.log(format2json($(this).serialize()));
    $.ajax({
      method: 'POST',
      url: '/api/reg',
      // contentType: 'application/json',
      // data: JSON.stringify({
      //   username: $('#regForm [name=username]').val(),
      //   password: $('#regForm [name=password]').val(),
      //   repassword: $('#regForm [name=repassword]').val()
      // }),
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.code !== 0) {
          return layer.msg('注册用户失败' + res.message)
        }
        layer.msg(res.message)
        $('#go2login').click()
      }
    })


  })

  $('#loginForm').submit(function(e){
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      contentType: 'application/json',
      // data: JSON.stringify({
      //   username: $('#regForm [name=username]').val(),
      //   password: $('#regForm [name=password]').val(),
      //   repassword: $('#regForm [name=repassword]').val()
      // }),
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.code !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('登录成功')
        // 把识别码存储到本地
        localStorage.setItem('token',res.token)

        // 跳转到主页
        location.href='/index.html'
      
      }
    })
  })
  
})