/*
 * @desc: 检验pageIndex(页码)
*/
const pageInfo = (
  isRequired = true,
  isDefault = 1,
  min = 1
) => {
  /*
   * 入参为int类型，如果是其他类型，会尝试转为int类型（convertType: 'int'）
   * 如果入参为空字符串，NaN，Null，会将其转换为未定义（widelyUndefined: true）
  */
  return {
    type: 'int',
    required: isRequired,
    default: isDefault,
    min: min,
    convertType: 'int',
    widelyUndefined: true
  }
}

/*
 * @desc: 校验金额(单位：分)
*/
const priceByPenny = (
  isRequired = true,
  min = 1
) => {
  return {
    type: 'int',
    required: isRequired,
    min: min,
    convertType: 'int'
  }
}

/*
 * @desc: 校验金额(包含小数点)
*/
const priceByDecimal = data => {
  return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(data)
}

module.exports = {
  pageInfo,
  priceByPenny,
  priceByDecimal
}