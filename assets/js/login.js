$(function () {
  // 点击'去注册账户'的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide()
    $(".reg-box").show()
  })
  // 点击'去登录的链接'
  $("#link_login").on("click", function () {
    $(".login-box").show()
    $(".reg-box").hide()
  })

  // 从 layui中获取form对象
  let form = layui.form
  let layer = layui.layer
  // 通过

  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      // 通过形参拿到的是确认密码框中的内容
      let pwd = $(".reg-box [name=password]").val()
      console.log(pwd)
      if (pwd != value) {
        return "两次密码不一致"
      }
    },
  })

  // 监听注册表单
  // const baseURL = "http://big-event-api-t.itheima.net"
  $("#form_reg").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: `/api/reguser`,
      data: {
        username: $("#userName").val(),
        password: $("#passWord").val(),
      },
      success(res) {
        if (res.status !== 0) {
          return layer.msg("res.message")
        }
        layer.msg("注册成功，请登录！")
      },
    })
  })

  //   监听登录表单提交
  $("#form_login").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      method: "POST",
      url: `/api/login`,
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg("res.message")
        }
        layer.msg("登录成功！")
        localStorage.setItem('token', res.token)
        // 跳转后台
        location.href = '/index.html'

      }
    })
  })
  // 入口函数
})
