$(function(){
  const form = layui.form
  form.verity({
    nickname:function(value){

      if(value.length>6){
        return layui.layer.msg('昵称不能超过6个字符')
      }
    }

  })

  // 获取用户相关信息
  function initinfo(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success(res){
        if(res.code!==0) return layui.layer.msg('请求用户信息失败')

        form.val('userForm',res.data)
      }
    })
  }

  // 重新刷新用户信息/
  initinfo()

  $('btnReset').on('click',function(e){

    // 阻止默认重置行为
    e.preventDefault()

    // 重新调用
    initinfo()
  })
  // 监听表单的提交事件？
  $('.layui-btn').submit(function(e){
    e.preventDefault()
    $.ajax({
      method:'PUT',
      url:'/my/userinfo',
      data:form.val('userForm'),
      success(res){
        if(res.code!==0) return layui.layer.msg('更改信息失败')
        layui.layer.msg('更改信息成功')
        // 刷新整体页面
        window.parent.getUserInfo()
        //window.parent.  调用头像用户信息函数
      }
    })

  })

})