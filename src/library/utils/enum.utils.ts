function count(enumObj: any, type: 'string' | 'mixed' | 'numeric' = 'string'): number {
  switch (type) {
    case 'string':
      return Object.keys(enumObj).length;
    case 'numeric':
      return Object.keys(enumObj).length / 2;
    case 'mixed':
      return Object.keys(enumObj).filter((v) => isNaN(Number(v))).length;
    default:
      return 0
  }
}

function getKeys(enumObj: any, type: 'string' | 'mixed' | 'numeric' = 'string'): any[] {
  switch (type) {
    case 'string':
      return Object
        .keys(enumObj)
        .filter((v) => isNaN(Number(v)))
    case 'numeric':
      return Object
        .keys(enumObj)
        .filter((v) => !isNaN(Number(v)))
    default:
      return []
  }
}

const enumUtil = {
  getKeys: getKeys,
  count: count
}

export default enumUtil
