$(function(){

  // 调用 getUserInfo获取信息
  getUserInfo()
  let layer = layui.layer
  $('#btnLogout').on('click',function(){
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
      //do something
      // 1.清空本地存储中的token
      // 2.重新跳转到登录页面
      location.href = '/login.html'
      // 关闭confirm询问框
      layer.close(index)
    })
  })
})
// 获取用户基本信息
function getUserInfo(){
  $.ajax({
    method:'GET',
    url:'/my/userinfo',
    // headers就是请求头配置对象
    headers:{
      Authorization:localStorage.getItem('token') || ''
    },
    success:function(res){
      if(res.status !== 0){
        return layui.layer.msg('获取用户信息失败！')
      }
      // 调用renderAvatar渲染用户头像
      renderAvatar(res.data)
    }
  })
}
// 渲染用户头像
function renderAvatar(user){
  // 获取用户的名称
  let name = user.nickname || user.username
  // 设置欢迎文本
  $('#welcome').html('欢迎&nbsp;Z&nbsp;' + name)
  // 3.按需渲染用户的头像
  if(user.user_pic !== null){
    // 3.1 渲染图片
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
  }else{
    // 3.2 渲染文本头像
    $('.layui-nav-img').hide()
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
  }
}