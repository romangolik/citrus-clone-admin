import { Command, type Editor } from "@ckeditor/ckeditor5-core";

export default class ImagesBrowserCommand extends Command {
  public declare value: boolean;
  private _wrapper: Element | null = null;

  constructor(editor: Editor) {
    super(editor);

    this.stopListening( this.editor.model.document, 'change' );
    this.listenTo( this.editor.model.document, 'change', () => this.refresh(), { priority: 'low' } );
  }

  public override refresh(): void {
    const imageCommand = this.editor.commands.get("imageInsert");

    this.isEnabled = imageCommand.isEnabled;
  }

  public override execute(): void {
    const editor = this.editor;
    const config = this.editor.config.get("imagesBrowser") as any;

    config?.openModal();
    this.value = true;

    const handleSelectImages = (event: CustomEvent<string[] | null>) => {
      window.removeEventListener("images-selected", handleSelectImages);
      if (event.detail?.length) {
        editor.execute("insertImage", {
          source: event.detail,
        });
      }
      this.value = false;
    };

    window.addEventListener("images-selected", handleSelectImages);
  }
}
