// 本配置文件用于解析网络协议传送过来的二进制数据
// 可以设置多个通道，每个通道对应一个TCP连接传送过来的数据，数据帧为2进制数据串
export let channels = [
	{ //通道 0 开始
		"name":"gb_goosyds", // 通道1 名称
		"host":"home.goosy.org", // 通道 1 地址
		"port":2000, // 通道 1 端口
		"type": "TCP" // 通信协议类型
		"active": false, // 通道1是否为TCP客户端
		"struct":["nodeGD"],//定义在 vplc中的对应结构位置，[区域名，变量名1, 变量名2, ...]
	}, //通道 0 结束
]