import NiceModal from "@ebay/nice-modal-react";
import { Font } from "@ckeditor/ckeditor5-font";
import { List } from "@ckeditor/ckeditor5-list";
import { Link } from "@ckeditor/ckeditor5-link";
import { Indent } from "@ckeditor/ckeditor5-indent";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { EditorConfig } from "@ckeditor/ckeditor5-core";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { Bold, Italic, Underline } from "@ckeditor/ckeditor5-basic-styles";
import {
  Image,
  ImageStyle,
  ImageUpload,
  ImageInsert,
  ImageResize,
  ImageCaption,
  ImageToolbar,
  PictureEditing,
} from "@ckeditor/ckeditor5-image";

import { ProductImageDto } from "@services/products";

import { Modals } from "@components/modals";

import ImagesBrowser from "../plugins/ImagesBrowser/ImagesBrowser";
import { CustomUploadAdapter } from "../plugins/CustomUploadAdapter";

import { SUPPORTED_IMAGE_FORMATS } from "@utils/constants/suported-image-formats";

type ImagesBrowserPlugin = {
  imagesBrowser: {
    openModal: () => void;
  };
};

//TODO: налаштувати вебпак під мову
export const EDITOR_CONFIGURATION: EditorConfig & ImagesBrowserPlugin = {
  extraPlugins: [CustomUploadAdapter],
  plugins: [
    Essentials,
    Bold,
    Italic,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImagesBrowser,
    ImageInsert,
    ImageResize,
    Indent,
    Link,
    List,
    Paragraph,
    Alignment,
    Font,
    PictureEditing,
    TextTransformation,
    Underline,
  ],
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "fontSize",
      "fontColor",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "outdent",
      "indent",
      "alignment",
      "|",
      "imageUpload",
      "imagesBrowser",
      "|",
      "bulletedList",
      "numberedList",
    ],
  },
  language: "ua",
  placeholder: "Введіть опис товару",
  fontSize: {
    options: [10, 12, 14, "default", 18, 20, 22],
    supportAllValues: true,
  },
  image: {
    toolbar: [
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "|",
      "toggleImageCaption",
      "imageTextAlternative",
    ],
    upload: {
      types: SUPPORTED_IMAGE_FORMATS.map((format) => format.split("/")[1]),
    },
  },
  imagesBrowser: {
    openModal: () => {
      NiceModal.show(Modals.InsertImageModal).then(
        (data: ProductImageDto[]) => {
          const sendEvent = new CustomEvent("images-selected", {
            detail: data.map((image) => image.src),
          });
          window.dispatchEvent(sendEvent);
        }
      );
    },
  },
};
