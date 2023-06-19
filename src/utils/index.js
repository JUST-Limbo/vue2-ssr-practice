export const atClient = process.env.atClient == "true"
export const atServer = process.env.atServer == "true"

export function filterValidValues(obj, invalidValues = [undefined, null]) {
	// 使用 Object.entries() 方法将对象转换为一个 [key, value] 数组
	// 然后使用 filter() 方法筛选出属性值是有效的（不是 undefined 或 null）的项
	const validEntries = Object.entries(obj).filter(([key, value]) => {
		return !invalidValues.includes(value)
	})

	// 使用 Object.fromEntries() 方法将有效的 [key, value] 数组转换为对象
	const validObj = Object.fromEntries(validEntries)

	return validObj
}
