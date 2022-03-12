import domtoimage from "dom-to-image";

export const elementToDataURI = async (
  elm: HTMLElement,
  size?: { width: number; height: number }
) => {
  const elmStyle = elm.style;
  const orgWidth = elmStyle.width;
  const orgHeight = elmStyle.height;
  const orgMaxWidth = elmStyle.maxWidth;
  const orgMaxHeight = elmStyle.maxHeight;
  if (size !== undefined) {
    elmStyle.width = `${size.width}px`;
    elmStyle.height = `${size.height}px`;
    elmStyle.maxWidth = `${size.width}px`;
    elmStyle.maxHeight = `${size.height}px`;
  }
  const dataURL = await domtoimage.toPng(elm, {
    width: size?.width,
    height: size?.height,
  });
  elmStyle.width = orgWidth;
  elmStyle.height = orgHeight;
  elmStyle.maxWidth = orgMaxWidth;
  elmStyle.maxHeight = orgMaxHeight;
  return dataURL;
};

export const downloadURI = (uri: string, name: string): null => {
  const link = document.createElement("a");
  link.download = `${name}`;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return null;
};

export interface NotoItem {
  category: string;
  id: number;
}
export const notoAvatarProps = {
  categorys: [
    { category: "face", count: 16 },
    { category: "eyes", count: 14 },
    { category: "eyebrows", count: 16 },
    { category: "mouth", count: 20 },
    { category: "nose", count: 14 },
    { category: "details", count: 14 },
    { category: "beard", count: 17 },
    { category: "glasses", count: 15 },
    { category: "hairstyle", count: 59 },
    { category: "accessories", count: 16 },
    { category: "festival", count: 11 },
  ],
};
export const assets: NotoItem[] = notoAvatarProps.categorys.flatMap((x) =>
  Array.from(Array(x.count).keys()).map((id) => ({
    category: x.category,
    id: id,
  }))
);
export const categorys = Array.from(
  assets
    .reduce((prev, crnt) => prev.add(crnt.category), new Set<string>())
    .values()
);

export const toPath = (x: NotoItem) => `/svg/${x.category}/${x.id}.svg`;

export const orderByCategory = (x: NotoItem, y: NotoItem): number => {
  const categorys = notoAvatarProps.categorys.map((c) => c.category);
  const xi = categorys.indexOf(x.category);
  const yi = categorys.indexOf(y.category);
  return xi - yi;
};

// キー "accessories"
// 値 {category: "accessories", id: 0}
// キー "beard"
// 値 {category: "beard", id: 0}
// キー "details"
// 値 {category: "details", id: 0}
// キー "eyebrows"
// 値 {category: "eyebrows", id: 10}
// キー "eyes"
// 値 {category: "eyes", id: 5}
// キー "face"
// 値 {category: "face", id: 10}
// キー "festival"
// 値 {category: "festival", id: 0}
// キー "glasses"
// 値 {category: "glasses", id: 0}
// キー "hairstyle"
// 値 {category: "hairstyle", id: 6}
// キー "mouth"
// 値 {category: "mouth", id: 18}
// キー "nose"
// 値 {category: "nose", id: 3}
