$(function () {

  const layer = layui.layer

  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)



// 上传按钮点击事件，点击后，弹出选择框
$('#btnChoose').on('click',function(){
 
  // 弹出文件选择框事件
  // $('#file').click()
  // id 选择器比较特殊，可以直接使用
  file.click() 
  
})
// 文件选择框的change事件
$('#file').on('change',function(e){
const fileList = e.target.files
if(fileList.length<=0){
  return  layer.msg('请选择图片')
}


const file = e.target.files[0]
// 需要转成blob格式的图片
const newImgURL = URL.createObjectURL(file)

// 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
$image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域

})





})
