/**
 * 文字列の配列を直接引数に指定することで、配列の各要素の値をキーとバリューに指定したオブジェクトを生成
 * 利用例：
 * const Hoge = rawStrArr2EnumLikeObj('H', 'O', 'G', 'E');
 * type THoge = keyof typeof Hoge; // 'H' | 'O' | 'G' | 'E' というUnion型が取得できる
 * @param o 文字列の配列
 */
export const rawStrArr2EnumLikeObj = <T extends string>(o: T[]): { [K in T]: K } => {
  return o.reduce((acc, curr) => {
    acc[curr] = curr;
    return acc;
  }, Object.create(null));
};
