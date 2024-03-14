import { Plugin } from "@ckeditor/ckeditor5-core";

import ImagesBrowserUI from "./ImagesBrowserUI";
import ImagesBrowserEditing from "./ImagesBrowserEditing";

export default class ImagesBrowser extends Plugin {
  public static get pluginName() {
    return "ImagesBrowser" as const;
  }

  public static get requires() {
    return [ImagesBrowserEditing, ImagesBrowserUI] as const;
  }
}
