import { Styles } from "@react-pdf/renderer"
type Style = Styles[string];

export function stlx(styles: stlx.StlxStyles) {
  const acc: Style[] = [];
  stlx.accumulate(acc, styles);
  return acc;
}

export namespace stlx {

  export type StlxStyle = Style | undefined | null | false;
  export type StlxStyles = Array<StlxStyle | StlxStyle[]>;

  export function accumulate(acc: Style[], styles: StlxStyles) {
    for (const style of styles) {
      if (Array.isArray(style)) {
        accumulate(acc, style);
      } else if (typeof style === "object" && style !== null) {
        acc.push(style);
      }
    }
  }

}