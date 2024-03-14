import { Locale } from "@ckeditor/ckeditor5-utils";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import { icons, Plugin } from "@ckeditor/ckeditor5-core";

import type ImagesBrowserCommand from "./ImagesBrowserCommand";

export default class ImagesBrowserUI extends Plugin {
  public static get pluginName() {
    return "ImagesBrowserUI" as const;
  }

  public init(): void {
    const editor = this.editor;
    const t = editor.t;

    const command: ImagesBrowserCommand = editor.commands.get("browse") as ImagesBrowserCommand;

    const componentCreator = (locale: Locale) => {
      const button = new ButtonView(locale);

      button.set({
        label: t("Open file manager"),
        icon: icons.imageAssetManager,
        tooltip: true,
      });

      button.bind("isOn", "isEnabled").to(command, "value", "isEnabled");

      button.on("execute", () => {
        editor.execute("browse");
      });

      return button;
    };

    editor.ui.componentFactory.add("imagesBrowser", componentCreator);
  }
}
