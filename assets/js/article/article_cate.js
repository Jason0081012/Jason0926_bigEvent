$(function () {
  const layer = layui.layer
  const form = layui.form
  initArtCateList()

  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      success(res) {
        console.log(res);
        if (res.code !== 0) return layer.msg('过去列表失败')
        // layer.msg('过去列表成功')
        // 调用template函数
        const htmlStr = template('tpl-cate', res)
        $('tbody').empty().append(htmlStr)
      }
    })
  }

  let index = null
  // 给添加类别，添加点击事件
  $('#btnAddCade').on('click', function () {
    index = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加分类名称',
      content: $('#dialog_add').html()
    });
  })

  let isEdit = false

  $('body').on('submit', '#addForm', function (e) {

    e.preventDefault()

    // 两个按钮公用一个弹窗

    if (isEdit) {
      $.ajax({
        method: 'PUT',
        url: '/my/cate/info',
        data: $(this).serialize(),  //调用form数据，包括id
        success(res) {
          if (res.code !== 0) return layer.msg('修改分类失败')
          layer.msg('修改分类成功')

          // 关闭弹窗
          layer.close(index)
          // 刷新列表
          initArtCateList()

          isEdit = false
        }
      })

    } else {
      $.ajax({
        method: 'POST',
        url: '/my/cate/add',
        data: $(this).serialize(),
        success(res) {
          if (res.code !== 0) {
            return layer.msg('添加分类失败')
          }
          layer.msg('添加分类成功')
          // 关闭弹窗
          layer.close(index)
          // 刷新列表
          initArtCateList()
        }
      })
    }
    


  })

  // let indexEdit = null
  // 给编辑添加点击事件
  $('tbody').on('click', '.btnEdit', function () {
    // console.log('修改了',$(this).attr('data-id'));
    isEdit = true
    index = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改分类名称',
      content: $('#dialog_add').html()
    })

    const id = $(this).attr('data-id')

    $.ajax({
      method: 'GET',
      url: '/my/cate/info?id=' + id,
      success(res) {
        if (res.code !== 0) return layer.msg('获取分类详情失败')

        // 快速给表单赋值
        form.val('addFormFilter', res.data)
      }
    })

  })
  $('tbody').on('clcik','.btnDelete',function(){
    const result = confirm('您确定要删除此分类嘛？')

    const id = $(this).attr('data-id')
    $.ajax({
      method:'DELETE',
      url:'/my/cate/del?id='+id,
      success(res){
        if(res.code!==0){
          return layer.msg('删除分类列表失败')
        }
        layer.msg('删除分类列表成功')
         // 刷新列表
         initArtCateList()
      }
    })
  })





})