//此模块是根据jsencrypt封装一个加密过程

import JSEncrypt from 'jsencrypt'

export function jsEncrypt(str) {
    //实例这个方法
    let encrypt = new JSEncrypt();
    //根据一款软件 随机生成一段key值  这个key值是两个相互的 前后端各有一个 然后我们根据这个key值可以进行加密解密处理
    let key=`MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlec7cf57opzCzTxrsSWmnycz0QVg9jA9syIDXyamt0cAypThrLpzFgCA6bTGoRTp5fjUzdQ1Z/PyN6L7BJ01EYQBdp6LERkqCNTySP1furoB1tlsxmi6lvYAFfJXgABJiAv7+5pZGilDtHvJDAduAZD2SKjg4etQom7bkAjV0GCwJnW6VkAUilgV+xwXhMDpjkzgNA6gdKVJjuF4n09fwRO4Y3bnypbOYLb0ks03QH1YkhJglEv6NrFpnUy1qFIkzKwgs0ieZ3qXW5yYmS/I3ZLcmsQ7RutCmJoqwTgfXodUGTxKCjIme+TeqcJmdHc84ElhIuk30nCFqYclehae8wIDAQAB`

    //将这个key值传给这个方法  然后后端调用这个方法传入另一个相对的key就会进行解密
    encrypt.setPublicKey(key);
    //进行加密
    let data = encrypt.encrypt(str);
    //因为+好可能有其他不好的影响 我们用%2b替换一下这个+号
    let code = encodeURI(data).replace(/\+/g, '%2B')

    //将加密后的字符串返回
    return code
}