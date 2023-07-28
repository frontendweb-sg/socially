"use client";
import Picker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
  Props,
} from "emoji-picker-react";
import Box from "./Box";
import { forwardRef } from "react";

type EmojiProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  settings?: Props;
  setValue: (data: EmojiClickData, event: MouseEvent) => void;
};
type emojiRef = HTMLDivElement;
const EmojiPicker = forwardRef<emojiRef, EmojiProps>(
  ({ setValue, className, settings, ...rest }, ref) => {
    const handler = (emojiData: EmojiClickData, event: MouseEvent) => {
      setValue(emojiData, event);
    };
    return (
      <Box ref={ref} {...rest}>
        <Picker
          width="100%"
          emojiStyle={EmojiStyle.FACEBOOK}
          onEmojiClick={handler}
          {...settings}
        />
      </Box>
    );
  }
);

export {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation,
  type EmojiClickData,
};
export default EmojiPicker;
