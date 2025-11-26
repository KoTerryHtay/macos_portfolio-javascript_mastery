import { WindowControls } from "@/components";
import WindowWrapper from "@/hoc/WindowWrapper";
import useWindowStore from "@/store/window";

function Image() {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data as any;

  if (!data) return null;

  console.log("ImageWindow data >>>", data);

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-5  bg-white">
        {imageUrl ? (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto max-h-[70vh] object-contain rounded"
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;
