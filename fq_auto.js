/*
番茄看看跳转微信文章真实阅读（疑似鉴权文章不自动返回），云扫码直接倒计时虚假阅读（疑似鉴权文章会跳转微信文章真实阅读，会自动返回（多前台跑云扫码时，鉴权文章标识数据会覆盖，可导致非疑似鉴权的文章也进入文章页面进行真实阅读）
注意：
1、ios13、iOS4版本的系统使用qx自测可行，如果是ios12系统的qx用户，老实用单独重写搞定番茄看看和云扫码的真实阅读
qx：
*/
[rewrite_local]
#^http://.+/yunonline/v1/task url script-response-body https://raw.githubusercontent.com/y2038558528/sync/feizao/fqkk_auto_read.js
^http://.+/(reada/jump|v1/jump|task/read)\? url script-response-header https://raw.githubusercontent.com/y2038558528/sync/feizao/fqkk_auto_read.js
^http://.+/mock/read url script-analyze-echo-response https://raw.githubusercontent.com/y2038558528/sync/feizao/fqkk_auto_read.js
^https?://mp\.weixin\.qq\.com/s.+?k=feizao url response-body </script> response-body setTimeout(()=>window.history.back(),10000); </script>
##注意：如果微信文章不自动返回，自查是否为ios12的系统，可试试以下重写
#^https?://mp\.weixin\.qq\.com/s.+? url response-body </script> response-body setTimeout(()=>window.history.back(),10000); </script>
[MITM]
hostname = mp.weixin.qq.com
