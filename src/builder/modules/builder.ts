import { selectPage, type Model } from "./model";
import {
  type Texture,
  type Flip,
  type Rotate,
  type Blend,
  draw,
} from "./texture";
import { type Input } from "./input";

// open Dom2

// type textureDef = {
//   id: string,
//   url: string,
//   standardWidth: int,
//   standardHeight: int,
// }

// type imageDef = {
//   id: string,
//   url: string,
// }

// type thumnbnailDef = {url: string}

// type videoDef = {url: string}

// type instructionsDef = React.element

// type generatorDef = {
//   id: string,
//   name: string,
//   history: array<string>,
//   thumbnail: option<thumnbnailDef>,
//   video: option<videoDef>,
//   instructions: option<instructionsDef>,
//   images: array<imageDef>,
//   textures: array<textureDef>,
//   script: unit => unit,
// }

// type position = (int, int)

// type rectangleLegacy = {
//   x: int,
//   y: int,
//   w: int,
//   h: int,
// }

// type rectangle = (int, int, int, int)

// module Input = {
//   type rangeArgs = {
//     min: int,
//     max: int,
//     value: int,
//     step: int,
//   }

//   type textureArgs = {
//     standardWidth: int,
//     standardHeight: int,
//     choices: array<string>,
//   }

//   type id = string
//   type pageId = string

//   type t =
//     | Text(id, string)
//     | CustomStringInput(id, (string => unit) => React.element)
//     | RegionInput(pageId, (int, int, int, int), unit => unit)
//     | TextureInput(id, textureArgs)
//     | BooleanInput(id)
//     | SelectInput(id, array<string>)
//     | RangeInput(id, rangeArgs)
//     | ButtonInput(id, unit => unit)
// }

// module Model = {
//   module Variable = {
//     type t = [#Integer(int) | #String(string) | #Float(float) | #Boolean(bool)]

//     let toString = (value: t) => {
//       switch value {
//       | #String(value) => Some(value)
//       | _ => None
//       }
//     }

//     let toInteger = (value: t) => {
//       switch value {
//       | #Integer(value) => Some(value)
//       | _ => None
//       }
//     }

//     let toFloat = (value: t) => {
//       switch value {
//       | #Float(value) => Some(value)
//       | _ => None
//       }
//     }

//     let toBoolean = (value: t) => {
//       switch value {
//       | #Boolean(value) => Some(value)
//       | _ => None
//       }
//     }
//   }

//   type pageRegion = {
//     pageId: string,
//     region: (int, int, int, int),
//   }

//   type values = {
//     images: Js.Dict.t<Generator_ImageWithCanvas.t>,
//     textures: Js.Dict.t<Generator_Texture.t>,
//     booleans: Js.Dict.t<bool>,
//     selects: Js.Dict.t<string>,
//     ranges: Js.Dict.t<int>,
//     strings: Js.Dict.t<string>,
//     variables: Js.Dict.t<Variable.t>,
//   }

//   type t = {
//     inputs: array<Input.t>,
//     pages: array<Generator_Page.t>,
//     currentPage: option<Generator_Page.t>,
//     values: values,
//   }

//   let make = () => {
//     inputs: [],
//     pages: [],
//     currentPage: None,
//     values: {
//       images: Js.Dict.empty(),
//       textures: Js.Dict.empty(),
//       booleans: Js.Dict.empty(),
//       selects: Js.Dict.empty(),
//       ranges: Js.Dict.empty(),
//       strings: Js.Dict.empty(),
//       variables: Js.Dict.empty(),
//     },
//   }
// }

// let findPage = (model: Model.t, id) => model.pages->Js.Array2.find(page => page.id === id)

// let getCanvasWithContextPixelColor = (canvasWithContext: Generator_CanvasWithContext.t, x, y) => {
//   let {width, height, contextWithAlpha} = canvasWithContext
//   let data = Dom2.Context2d.getImageData(contextWithAlpha, 0, 0, width, height).data
//   let pixelIndex = y * width + x
//   let arrayIndex = pixelIndex * 4
//   let r = Belt.Array.get(data, arrayIndex)
//   let g = Belt.Array.get(data, arrayIndex + 1)
//   let b = Belt.Array.get(data, arrayIndex + 2)
//   let a = Belt.Array.get(data, arrayIndex + 3)
//   switch (r, g, b, a) {
//   | (Some(r), Some(g), Some(b), Some(a)) => Some((r, g, b, a))
//   | _ => None
//   }
// }

// let getTexturePixelColor = (model: Model.t, textureId, x, y) => {
//   let texture = Js.Dict.get(model.values.textures, textureId)
//   switch texture {
//   | None => None
//   | Some(texture) => getCanvasWithContextPixelColor(texture.imageWithCanvas.canvasWithContext, x, y)
//   }
// }

// let getImagePixelColor = (model: Model.t, imageId, x, y) => {
//   let imageWithCanvas = Js.Dict.get(model.values.images, imageId)
//   switch imageWithCanvas {
//   | None => None
//   | Some(imageWithCanvas) => getCanvasWithContextPixelColor(imageWithCanvas.canvasWithContext, x, y)
//   }
// }

// let getPagePixelColor = (model: Model.t, pageId, x, y) => {
//   let page = findPage(model, pageId)
//   switch page {
//   | None => None
//   | Some(page) => getCanvasWithContextPixelColor(page.canvasWithContext, x, y)
//   }
// }

// let getCurrentPagePixelColor = (model: Model.t, x, y) => {
//   switch model.currentPage {
//   | None => None
//   | Some(page) => getCanvasWithContextPixelColor(page.canvasWithContext, x, y)
//   }
// }

// let setVariable = (model: Model.t, id: string, value: Model.Variable.t) => {
//   let variables = Js.Dict.fromArray(Js.Dict.entries(model.values.variables))
//   Js.Dict.set(variables, id, value)
//   {
//     ...model,
//     values: {
//       ...model.values,
//       variables,
//     },
//   }
// }

// let getVariable = (model: Model.t, id: string) => {
//   Js.Dict.get(model.values.variables, id)
// }

// let getVariableMap = (model: Model.t, id: string, fn) => {
//   switch getVariable(model, id) {
//   | None => None
//   | Some(value) => fn(value)
//   }
// }

// let setStringVariable = (model: Model.t, id: string, value: string) => {
//   setVariable(model, id, #String(value))
// }

// let getStringVariable = (model: Model.t, id: string): option<string> => {
//   getVariableMap(model, id, Model.Variable.toString)
// }

// let setIntegerVariable = (model: Model.t, id: string, value: int) => {
//   setVariable(model, id, #Integer(value))
// }

// let getFloatVariable = (model: Model.t, id: string): option<float> => {
//   getVariableMap(model, id, Model.Variable.toFloat)
// }

// let setFloatVariable = (model: Model.t, id: string, value: float) => {
//   setVariable(model, id, #Float(value))
// }

// let getIntegerVariable = (model: Model.t, id: string): option<int> => {
//   getVariableMap(model, id, Model.Variable.toInteger)
// }

// let setBooleanVariable = (model: Model.t, id: string, value: bool) => {
//   setVariable(model, id, #Boolean(value))
// }

// let getBooleanVariable = (model: Model.t, id: string): option<bool> => {
//   getVariableMap(model, id, Model.Variable.toBoolean)
// }

// let hasInput = (model: Model.t, idToFind: string) => {
//   Js.Array2.find(model.inputs, input => {
//     let id = switch input {
//     | Text(id, _) => id
//     | RegionInput(_, _, _) => ""
//     | CustomStringInput(id, _) => id
//     | TextureInput(id, _) => id
//     | BooleanInput(id) => id
//     | SelectInput(id, _) => id
//     | RangeInput(id, _) => id
//     | ButtonInput(id, _) => id
//     }
//     id === idToFind
//   })
// }

// let clearStringInputValues = (model: Model.t) => {
//   {
//     ...model,
//     values: {
//       ...model.values,
//       strings: Js.Dict.empty(),
//     },
//   }
// }

// let setStringInputValue = (model: Model.t, id: string, value: string) => {
//   let strings = Js.Dict.fromArray(Js.Dict.entries(model.values.strings))
//   Js.Dict.set(strings, id, value)
//   {
//     ...model,
//     values: {
//       ...model.values,
//       strings,
//     },
//   }
// }

// let getStringInputValue = (model: Model.t, id: string) => {
//   let value = Js.Dict.get(model.values.strings, id)
//   switch value {
//   | None => ""
//   | Some(value) => value
//   }
// }

// let setBooleanInputValue = (model: Model.t, id: string, value: bool) => {
//   let booleans = Js.Dict.fromArray(Js.Dict.entries(model.values.booleans))
//   Js.Dict.set(booleans, id, value)
//   {
//     ...model,
//     values: {
//       ...model.values,
//       booleans,
//     },
//   }
// }

function setBooleanInputValue(model: Model, id: string, value: boolean): Model {
  const booleans = { ...model.values.booleans, [id]: value };
  return { ...model, values: { ...model.values, booleans } };
}

// let getBooleanInputValue = (model: Model.t, id: string) => {
//   let value = Js.Dict.get(model.values.booleans, id)
//   switch value {
//   | None => false
//   | Some(value) => value
//   }
// }

// let getBooleanInputValueWithDefault = (model: Model.t, id: string, default: bool) => {
//   let value = Js.Dict.get(model.values.booleans, id)
//   switch value {
//   | None => default
//   | Some(value) => value
//   }
// }

// let setSelectInputValue = (model: Model.t, id: string, value: string) => {
//   let selects = Js.Dict.fromArray(Js.Dict.entries(model.values.selects))
//   Js.Dict.set(selects, id, value)
//   {
//     ...model,
//     values: {
//       ...model.values,
//       selects,
//     },
//   }
// }

// let getSelectInputValue = (model: Model.t, id: string) => {
//   let value = Js.Dict.get(model.values.selects, id)
//   switch value {
//   | None => ""
//   | Some(value) => value
//   }
// }

// let setRangeInputValue = (model: Model.t, id: string, value: int) => {
//   let ranges = Js.Dict.fromArray(Js.Dict.entries(model.values.ranges))
//   Js.Dict.set(ranges, id, value)
//   {
//     ...model,
//     values: {
//       ...model.values,
//       ranges,
//     },
//   }
// }

export function setRangeInputValue(model: Model, id: string, value: number) {
  const ranges = { ...model.values.ranges, [id]: value };
  return { ...model, values: { ...model.values, ranges } };
}

// let getRangeInputValue = (model: Model.t, id: string): int => {
//   let value = Js.Dict.get(model.values.ranges, id)
//   switch value {
//   | None => 0
//   | Some(value) => value
//   }
// }

export function getRangeInputValue(model: Model, id: string) {
  return model.values.ranges[id] ?? 0;
}

// let hasBooleanValue = (model: Model.t, id: string) => {
//   switch Js.Dict.get(model.values.booleans, id) {
//   | None => false
//   | Some(_) => true
//   }
// }
export function hasBooleanValue(model: Model, id: string) {
  return model.values.booleans[id] !== undefined;
}

// let hasSelectValue = (model: Model.t, id: string) => {
//   switch Js.Dict.get(model.values.selects, id) {
//   | None => false
//   | Some(_) => true
//   }
// }

export function hasSelectValue(model: Model, id: string) {
  return model.values.selects[id] !== undefined;
}

// let hasRangeValue = (model: Model.t, id: string) => {
//   switch Js.Dict.get(model.values.ranges, id) {
//   | None => false
//   | Some(_) => true
//   }
// }

export function hasRangeValue(model: Model, id: string) {
  return model.values.ranges[id] !== undefined;
}

// let usePage = (model: Model.t, id) => {
//   let page = findPage(model, id)
//   switch page {
//   | Some(page) => {
//       ...model,
//       currentPage: Some(page),
//     }
//   | None => {
//       let page = Generator_Page.make(id)
//       let pages = Js.Array2.concat(model.pages, [page])
//       {
//         ...model,
//         pages,
//         currentPage: Some(page),
//       }
//     }
//   }
// }

export function usePage(model: Model, id: string) {
  const page = model.pages.find((page) => page.id === id);
  if (page) {
    return { ...model, currentPage: page };
  } else {
    const page = { id };
    const pages = [...model.pages, page];
    return { ...model, pages, currentPage: page };
  }
}

// let getDefaultPageId = () => "Page"

// let getCurrentPageId = (model: Model.t) => {
//   switch model.currentPage {
//   | None => getDefaultPageId()
//   | Some(page) => page.id
//   }
// }

export function getCurrentPageId(model: Model) {
  return model.currentPage?.id ?? "Page";
}

// let ensureCurrentPage = (model: Model.t) => {
//   switch model.currentPage {
//   | None => usePage(model, getDefaultPageId())
//   | Some(_) => model
//   }
// }

export function ensureCurrentPage(model: Model) {
  let currModel = model;
  if (!currModel.currentPage) {
    currModel = selectPage(model, "Page");
  }
  return currModel;
}

// let defineRegionInput = (model: Model.t, region: (int, int, int, int), callback) => {
//   let pageId = getCurrentPageId(model)
//   let inputs = Js.Array2.concat(model.inputs, [Input.RegionInput(pageId, region, callback)])
//   {...model, inputs}
// }

export function defineRegionInput(
  model: Model,
  region: [number, number, number, number],
  callback: () => void
) {
  const pageId = model.currentPage?.id ?? "Page";
  const input = { tag: "Region", pageId, region, callback };
  const inputs = [...model.inputs, input];
  return { ...model, inputs };
}

// let defineCustomStringInput = (
//   model: Model.t,
//   id: string,
//   fn: (string => unit) => React.element,
// ) => {
//   let inputs = Js.Array2.concat(model.inputs, [Input.CustomStringInput(id, fn)])
//   {...model, inputs}
// }

// export function defineCustomStringInput(
//   model: Model,
//   id: string,
//   render: (value: string) => React.ReactNode
// ) {
//   const input: Input = { kind: "CustomStringInput", id, render };
//   const inputs = [...model.inputs, input];
//   return { ...model, inputs };
// }

// let defineBooleanInput = (model: Model.t, id: string, initial: bool) => {
//   let inputs = Js.Array2.concat(model.inputs, [Input.BooleanInput(id)])
//   let newModel = {...model, inputs}
//   if !hasBooleanValue(model, id) {
//     setBooleanInputValue(newModel, id, initial)
//   } else {
//     newModel
//   }
// }

export function defineBooleanInput(
  model: Model,
  id: string,
  initial: boolean
): Model {
  let currModel = model;

  const input: Input = { kind: "BooleanInput", id };
  const inputs: Input[] = [...model.inputs, input];

  if (!hasBooleanValue(model, id)) {
    currModel = setBooleanInputValue(model, id, initial);
  }

  return { ...currModel, inputs };
}

// let defineButtonInput = (model: Model.t, id: string, onClick) => {
//   let inputs = Js.Array2.concat(model.inputs, [Input.ButtonInput(id, onClick)])
//   let newModel = {...model, inputs}
//   newModel
// }

export function defineButtonInput(
  model: Model,
  id: string,
  onClick: () => void
) {
  const input = { tag: "Button", id, value: onClick };
  const inputs = [...model.inputs, input];
  return { ...model, inputs };
}

// let defineSelectInput = (model: Model.t, id: string, options: array<string>) => {
//   let inputs = Js.Array2.concat(model.inputs, [Input.SelectInput(id, options)])
//   let newModel = {...model, inputs}
//   if !hasSelectValue(model, id) {
//     let value = Belt.Option.getWithDefault(options[0], "")
//     setSelectInputValue(newModel, id, value)
//   } else {
//     newModel
//   }
// }

export function defineSelectInput(model: Model, id: string, options: string[]) {
  const input = { tag: "Select", id, value: options[0] };
  const inputs = [...model.inputs, input];
  return { ...model, inputs };
}

// let defineRangeInput = (model: Model.t, id: string, rangeArgs: Input.rangeArgs) => {
//   let inputs = Js.Array2.concat(model.inputs, [Input.RangeInput(id, rangeArgs)])
//   let newModel = {...model, inputs}
//   if !hasRangeValue(model, id) {
//     setRangeInputValue(newModel, id, rangeArgs.value)
//   } else {
//     newModel
//   }
// }

export function defineRangeInput(
  model: Model,
  id: string,
  rangeArgs: { min: number; max: number; value: number; step: number }
) {
  const input = { tag: "Range", id, value: rangeArgs };
  const inputs = [...model.inputs, input];
  return { ...model, inputs };
}

// let defineTextureInput = (model: Model.t, id, options) => {
//   let input = Input.TextureInput(id, options)
//   let inputs = Js.Array2.concat(model.inputs, [input])
//   {
//     ...model,
//     inputs,
//   }
// }

export function defineTextureInput(
  model: Model,
  id: string,
  options: { standardWidth: number; standardHeight: number; choices: string[] }
) {
  const input = { tag: "Texture", id, value: options };
  const inputs = [...model.inputs, input];
  return { ...model, inputs };
}

// let defineText = (model: Model.t, text: string) => {
//   let isText = input =>
//     switch input {
//     | Input.Text(_) => true
//     | _ => false
//     }
//   let textCount = model.inputs->Js.Array2.filter(isText)->Js.Array2.length
//   let id = "text-" ++ Js.Int.toString(textCount + 1)
//   let input = Input.Text(id, text)
//   let inputs = Js.Array2.concat(model.inputs, [input])
//   {
//     ...model,
//     inputs,
//   }
// }

export function defineText(model: Model, text: string) {
  const isText = (input: Input) => (input.kind === "Text" ? true : false);
  const textCount = model.inputs.filter(isText).length;
  const id = `text-${textCount + 1}`;
  const input = { tag: "Text", id, value: text };
  const inputs = [...model.inputs, input];
  return { ...model, inputs };
}

// let fillBackgroundColor = (model: Model.t, color: string) => {
//   switch model.currentPage {
//   | None => model
//   | Some(currentPage) => {
//       let currentPage = findPage(model, currentPage.id)
//       switch currentPage {
//       | None => model
//       | Some(currentPage) => {
//           let {width, height} = currentPage.canvasWithContext
//           let newCanvas = Generator_CanvasWithContext.make(width, height)
//           let previousFillStyle = newCanvas.context->Context2d.getFillStyle
//           newCanvas.context->Context2d.setFillStyle(color)
//           newCanvas.context->Context2d.fillRect(0, 0, width, height)
//           newCanvas.context->Context2d.drawCanvasXY(currentPage.canvasWithContext.canvas, 0, 0)
//           newCanvas.context->Context2d.setFillStyle(previousFillStyle)

//           let newCurrentPage = {
//             ...currentPage,
//             canvasWithContext: newCanvas,
//           }

//           let newPages = Belt.Array.map(model.pages, page => {
//             page.id === newCurrentPage.id ? newCurrentPage : page
//           })

//           let newModel = {
//             ...model,
//             pages: newPages,
//             currentPage: Some(newCurrentPage),
//           }

//           newModel
//         }
//       }
//     }
//   }
// }

export function fillBackgroundColor(model: Model, color: string) {
  const currentPage = model.currentPage;
  if (!currentPage) return;
  const newCanvas = document.createElement("canvas");
  newCanvas.width = currentPage.canvasWithContext.canvas.width;
  newCanvas.height = currentPage.canvasWithContext.canvas.height;
  const newContext = newCanvas.getContext("2d");
  if (!newContext) return;
  newContext.fillStyle = color;
  newContext.fillRect(0, 0, newCanvas.width, newCanvas.height);
  newContext.drawImage(currentPage.canvasWithContext.canvas, 0, 0);
  const newCanvasWithContext = {
    canvas: newCanvas,
    context: newContext,
  };
  const newPages = model.pages.map((page) =>
    page.id === currentPage.id
      ? { ...page, canvasWithContext: newCanvasWithContext }
      : page
  );
  return {
    ...model,
    pages: newPages,
    currentPage: { ...currentPage, canvasWithContext: newCanvasWithContext },
  };
}

// let fillRect = (model: Model.t, dest: rectangle, color: string) => {
//   let (x, y, w, h) = dest

//   switch model.currentPage {
//   | None => model
//   | Some(currentPage) => {
//       let context = currentPage.canvasWithContext.context
//       context->Context2d.setFillStyle(color)
//       context->Context2d.fillRect(x, y, w, h)

//       model
//     }
//   }
// }

export function fillRect(
  model: Model,
  [x, y, w, h]: [number, number, number, number],
  color: string
) {
  const currentPage = model.currentPage;
  if (!currentPage) return;
  const context = currentPage.canvasWithContext.context;
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
  return model;
}

// let getOffset = ((x1, y1): position, (x2, y2): position) => {
//   let x1 = Belt.Int.toFloat(x1)
//   let y1 = Belt.Int.toFloat(y1)
//   let x2 = Belt.Int.toFloat(x2)
//   let y2 = Belt.Int.toFloat(y2)

//   let w = x2 -. x1
//   let h = y2 -. y1

//   /* When a line is drawn and its start and end coords are integer values, the
//   resulting line is drawn in between to rows of pixels, resulting in a line
//   that is two pixels wide and half transparent. To fix this, the line's start
//   and end positions need to be offset 0.5 pixels in the direction normal to the
//   line. The following code gets the angle of the line, and gets the components
//   for a translation in the direction perpendicular to the angle using vector
//   resolution: https://physics.info/vector-components/summary.shtml This results
//   in a fully opaque line with the correct width if the line is vertical or
//   horizontal, but antialiasing may still affect lines at other angles.
//  */
//   let angle = Js.Math.atan2(~y=h, ~x=w, ())
//   let ox = Js.Math.sin(angle) *. 0.5
//   let oy = Js.Math.cos(angle) *. 0.5

//   (ox, oy)
// }

export function getOffset(
  [x1, y1]: [number, number],
  [x2, y2]: [number, number]
) {
  const w = x2 - x1;
  const h = y2 - y1;
  const angle = Math.atan2(h, w);
  const ox = Math.sin(angle) * 0.5;
  const oy = Math.cos(angle) * 0.5;
  return [ox, oy];
}

// let drawLine = (
//   model: Model.t,
//   (x1, y1): position,
//   (x2, y2): position,
//   ~color: string,
//   ~width: int,
//   ~pattern: array<int>,
//   ~offset: int,
// ) => {
//   let (ox, oy) = getOffset((x1, y1), (x2, y2))

//   switch model.currentPage {
//   | None => model
//   | Some(currentPage) => {
//       let context = currentPage.canvasWithContext.context
//       context->Context2d.beginPath
//       context->Context2d.strokeStyle(color)
//       context->Context2d.lineWidth(width)
//       context->Context2d.setLineDash(pattern)
//       context->Context2d.lineDashOffset(offset)
//       context->Context2d.moveTo(Belt.Int.toFloat(x1) +. ox, Belt.Int.toFloat(y1) +. oy)
//       context->Context2d.lineTo(Belt.Int.toFloat(x2) +. ox, Belt.Int.toFloat(y2) +. oy)
//       context->Context2d.stroke

//       model
//     }
//   }
// }

export function drawLine(
  model: Model,
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
  {
    color,
    width,
    pattern,
    offset,
  }: {
    color: string;
    width: number;
    pattern: number[];
    offset: number;
  }
) {
  const currentPage = model.currentPage;
  if (!currentPage) return;
  const context = currentPage.canvasWithContext.context;
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = width;
  context.setLineDash(pattern);
  context.lineDashOffset = offset;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  return model;
}

// let drawImage = (model: Model.t, id: string, (x, y): position) => {
//   let model = ensureCurrentPage(model)
//   let currentPage = model.currentPage
//   let image = Js.Dict.get(model.values.images, id)
//   switch (currentPage, image) {
//   | (Some(page), Some(imageWithCanvas)) =>
//     Context2d.drawImageXY(page.canvasWithContext.context, imageWithCanvas.image, x, y)
//   | _ => ()
//   }
//   model
// }

export function drawImage(
  model: Model,
  id: string,
  [x, y]: [number, number]
): Model {
  let currModel = model;

  currModel = ensureCurrentPage(currModel);

  const currentPage = currModel.currentPage;

  if (!currentPage) {
    return currModel;
  }

  const imageWithCanvas = model.values.images[id];

  if (!imageWithCanvas) {
    return currModel;
  }

  currentPage.canvasWithContext.context.drawImage(imageWithCanvas.image, x, y);

  return currModel;
}

// let addImage = (model: Model.t, id: string, image: Image.t) => {
//   let imageWithCanvas = Generator_ImageWithCanvas.makeFromImage(image)
//   let images = Js.Dict.fromArray(Js.Dict.entries(model.values.images))
//   Js.Dict.set(images, id, imageWithCanvas)
//   {
//     ...model,
//     values: {
//       ...model.values,
//       images,
//     },
//   }
// }

function addImage(model: Model, id: string, image: HTMLImageElement) {
  const images = { ...model.values.images, [id]: image };
  return { ...model, values: { ...model.values, images } };
}

// let addTexture = (model: Model.t, id: string, texture: Generator_Texture.t) => {
//   let textures = Js.Dict.fromArray(Js.Dict.entries(model.values.textures))
//   Js.Dict.set(textures, id, texture)
//   {
//     ...model,
//     values: {
//       ...model.values,
//       textures,
//     },
//   }
// }

function addTexture(model: Model, id: string, texture: Texture) {
  const textures = { ...model.values.textures, [id]: texture };
  return { ...model, values: { ...model.values, textures } };
}

// let clearTexture = (model: Model.t, id: string) => {
//   let entries =
//     Js.Dict.entries(model.values.textures)->Js.Array2.filter(((textureId, _)) => textureId !== id)
//   let textures = Js.Dict.fromArray(entries)
//   {
//     ...model,
//     values: {
//       ...model.values,
//       textures,
//     },
//   }
// }

export function clearTexture(model: Model, id: string) {
  const textures = Object.fromEntries(
    Object.entries(model.values.textures).filter(
      ([textureId]) => textureId !== id
    )
  );
  return { ...model, values: { ...model.values, textures } };
}

// let drawTexture = (
//   model: Model.t,
//   id: string,
//   (sx, sy, sw, sh): rectangle,
//   (dx, dy, dw, dh): rectangle,
//   ~flip: Generator_Texture.flip,
//   ~rotate: Generator_Texture.rotate,
//   ~blend: Generator_Texture.blend,
//   ~pixelate: bool,
//   (),
// ) => {
//   let model = ensureCurrentPage(model)
//   let currentPage = model.currentPage
//   let texture = Js.Dict.get(model.values.textures, id)
//   switch (currentPage, texture) {
//   | (Some(page), Some(texture)) =>
//     Generator_Texture.draw(
//       texture,
//       page,
//       sx,
//       sy,
//       sw,
//       sh,
//       dx,
//       dy,
//       dw,
//       dh,
//       ~flip,
//       ~rotate,
//       ~blend,
//       ~pixelate,
//       (),
//     )
//   | _ => ()
//   }
//   model
// }

export function drawTexture(
  model: Model,
  id: string,
  [sx, sy, sw, sh]: [number, number, number, number],
  [dx, dy, dw, dh]: [number, number, number, number],
  {
    flip,
    rotate,
    blend,
    pixelate,
  }: {
    flip: Flip;
    rotate: Rotate;
    blend: Blend;
    pixelate: boolean;
  }
): Model {
  let currModel = model;

  currModel = ensureCurrentPage(currModel);

  const currentPage = currModel.currentPage;

  if (!currentPage) {
    return currModel;
  }

  const texture = model.values.textures[id];

  if (!texture) {
    return currModel;
  }

  draw(texture, currentPage, [sx, sy, sw, sh], [dx, dy, dw, dh], {
    flip,
    rotate,
    blend,
    pixelate,
  });

  return currModel;
}

// let hasImage = (model: Model.t, id: string) => {
//   let image = Js.Dict.get(model.values.images, id)
//   switch image {
//   | None => false
//   | Some(_) => true
//   }
// }

function hasImage(model: Model, id: string) {
  return model.values.images[id] !== undefined;
}

// let hasTexture = (model: Model.t, id: string) => {
//   let texture = Js.Dict.get(model.values.textures, id)
//   switch texture {
//   | None => false
//   | Some(_) => true
//   }
// }

function hasTexture(model: Model, id: string) {
  return model.values.textures[id] !== undefined;
}

// let drawText = (model: Model.t, text: string, position: position, size: int) => {
//   let model = ensureCurrentPage(model)
//   switch model.currentPage {
//   | None => ()
//   | Some(currentPage) => {
//       let (x, y) = position
//       let font = Belt.Int.toString(size) ++ "px sans-serif"
//       currentPage.canvasWithContext.context->Context2d.font(font)
//       currentPage.canvasWithContext.context->Context2d.fillText(text, x, y)
//     }
//   }
//   model
// }

export function drawText(
  model: Model,
  text: string,
  position: [number, number],
  size: number
) {
  const currentPage = model.currentPage;
  if (!currentPage) return;
  const [x, y] = position;
  const font = `${size}px sans-serif`;
  currentPage.canvasWithContext.context.font = font;
  currentPage.canvasWithContext.context.fillText(text, x, y);
  return model;
}