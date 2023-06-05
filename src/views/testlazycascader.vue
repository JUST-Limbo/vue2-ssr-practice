<template>
	<div>
		{{ result }}
		<el-cascader v-model="result" :options="options" :props="props"></el-cascader>
		<div>{{ options }}</div>
	</div>
</template>

<script>
let id = 0
export default {
	data() {
		return {
			result: ['1', '2', '3'],
			options: [],
			props: {
				lazy: true,
        // 初始化会执行一次
				lazyLoad(node, resolve) {
          console.log(19)
          console.log(node)
          // console.log(node, node.children, node.children.length, node.loaded)
          if (node.children&&node.children.length == 0) {
						const { level } = node
						setTimeout(() => {
							const nodes = Array.from({ length: level + 1 }).map((item) => ({
								value: `${(id += 10)}`,
								label: `选项${id}`,
								leaf: level >= 2
							}))
							// 通过调用resolve将子节点数据返回，通知组件数据加载完成
							resolve(nodes)
						}, 1000)
					} else {
            console.log(32)
						resolve([])
					}
				}
			}
		}
	},
	created() {
    console.log(1)
		setTimeout(() => {
      console.log(2)
			this.options = [
				{
					value: '1',
					label: '江苏省',
					children: [
						{
							value: '2',
							label: '南京市',
							children: [
								{ value: '3', label: '建邺区', leaf: true },
								{ value: '4', label: '秦淮区', leaf: true },
								{ value: '30', label: '江宁区', leaf: true }
							]
						},
						{
							value: '5',
							label: '镇江市',
							children: [
								{ value: '6', label: '润州区', leaf: true },
								{ value: '7', label: '京口区', leaf: true }
							]
						}
					]
				},
				{
					value: '8',
					label: '山东省',
					children: [
						{ value: '9', label: '济南市' },
						{ value: '10', label: '青岛市' }
					]
				}
			]
		}, 5000)
	}
}
</script>

<style></style>
