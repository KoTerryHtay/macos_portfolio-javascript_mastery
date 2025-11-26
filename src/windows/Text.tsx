import WindowWrapper from "@/hoc/WindowWrapper";

function Text() {
  return <>Text</>;
}

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
