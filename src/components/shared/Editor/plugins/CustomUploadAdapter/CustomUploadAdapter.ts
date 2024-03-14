import { Editor } from "@ckeditor/ckeditor5-core";
import {
  FileLoader,
  UploadAdapter,
  UploadResponse,
} from "@ckeditor/ckeditor5-upload";

class MyUploadAdapter implements UploadAdapter {
  loader: FileLoader;
  controller: AbortController;

  constructor(loader: FileLoader) {
    this.loader = loader;
    this.controller = new AbortController();
  }

  async upload(): Promise<UploadResponse> {
    const file = (await this.loader.file)!;

    const formData = new FormData();
    formData.append("images", file);

    const requestConfig = {
      url: `http://localhost:3000/api/products/upload-images?used=true`,
      data: formData,
      onUploadProgress: (evt: ProgressEvent) => {
        if (evt.lengthComputable) {
          this.loader.uploadTotal = evt.total;
          this.loader.uploaded = evt.loaded;
        }
      },
      signal: this.controller.signal,
    } as const;

    return this._sendHttpRequest(requestConfig)
      .then(async (data) => ({
        default: data[0].src,
      }))
      .catch(() => {
        const genericError = "Невдалося завантажити файл:" + ` ${file.name}.`;

        return Promise.reject(genericError);
      });
  }

  private _sendHttpRequest({
    url,
    data,
    onUploadProgress,
    signal,
  }: {
    url: string;
    signal: AbortSignal;
    data?: FormData | null;
    onUploadProgress?: (evt: ProgressEvent) => void;
  }): Promise<any> {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", url);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.responseType = "json";

    const abortCallback = () => {
      xhr.abort();
    };

    return new Promise<any>((resolve, reject) => {
      signal.throwIfAborted();
      signal.addEventListener("abort", abortCallback);

      xhr.addEventListener("loadstart", () => {
        signal.addEventListener("abort", abortCallback);
      });

      xhr.addEventListener("loadend", () => {
        signal.removeEventListener("abort", abortCallback);
      });

      xhr.addEventListener("error", () => {
        reject();
      });

      xhr.addEventListener("abort", () => {
        reject();
      });

      xhr.addEventListener("load", () => {
        const response = xhr.response;

        if (!response || response.statusCode >= 400) {
          return reject(response && response.message);
        }

        resolve(response);
      });

      if (onUploadProgress) {
        xhr.upload.addEventListener("progress", (evt) => {
          onUploadProgress(evt);
        });
      }

      xhr.send(data);
    });
  }

  abort(): void {
    this.controller.abort();
  }
}

export function CustomUploadAdapter(editor: Editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (
    loader: FileLoader
  ) => new MyUploadAdapter(loader);
}
