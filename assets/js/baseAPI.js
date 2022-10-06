$.ajaxPrefilter(function(config){

// 封装一个函数
function format2json(source) {
  let target = {}
  source.split('&').forEach(function (el) {
    const [k1, k2] = el.split('=')
    target[k1] = decodeURIComponent(k2)

  })
  return JSON.stringify(target)

}

config.url = 'http://big-event-vue-api-t.itheima.net'+config.url

config.contentType = 'application/json'
config.data = format2json(config.data)

})