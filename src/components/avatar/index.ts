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

export function update_query_parameters(
  key: string,
  val: string | number | boolean
) {
  const uri = window.location.href
    .replace(
      RegExp("([?&]" + key + "(?=[=&#]|$)[^#&]*|(?=#|$))"),
      "&" + key + "=" + encodeURIComponent(val)
    )
    .replace(/^([^?&]+)&/, "$1?");

  if (window.history.pushState) {
    window.history.pushState({ path: uri }, "", uri);
  } else {
    window.location.href = uri;
  }
}

export enum NotoCategory {
  Face = "face",
  Eyes = "eyes",
  Eyebrows = "eyebrows",
  Mouth = "mouth",
  Nose = "nose",
  Details = "details",
  Beard = "beard",
  Glasses = "glasses",
  Hairstyle = "hairstyle",
  Accessories = "accessories",
  Festival = "festival",
}

export interface NotoItem {
  category: NotoCategory;
  id: number;
}
export const notoAvatarProps = {
  categorys: [
    { category: NotoCategory.Face, count: 16 },
    { category: NotoCategory.Eyes, count: 14 },
    { category: NotoCategory.Eyebrows, count: 16 },
    { category: NotoCategory.Mouth, count: 20 },
    { category: NotoCategory.Nose, count: 14 },
    { category: NotoCategory.Details, count: 14 },
    { category: NotoCategory.Beard, count: 17 },
    { category: NotoCategory.Glasses, count: 15 },
    { category: NotoCategory.Hairstyle, count: 59 },
    { category: NotoCategory.Accessories, count: 16 },
    { category: NotoCategory.Festival, count: 11 },
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
