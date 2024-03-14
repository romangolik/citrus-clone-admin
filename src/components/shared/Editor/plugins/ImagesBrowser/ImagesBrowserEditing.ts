import { Plugin } from "@ckeditor/ckeditor5-core";

import ImagesBrowserCommand from "./ImagesBrowserCommand";

export default class ImagesBrowserEditing extends Plugin {
  public static get pluginName() {
    return "ImagesBrowserEditing" as const;
  }

  public init(): void {
    const editor = this.editor;
    
    editor.commands.add("browse", new ImagesBrowserCommand(editor));
  }
}
