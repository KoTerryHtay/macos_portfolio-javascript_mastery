import { WindowControls } from "@/components";
import { locations } from "@/constants";
import WindowWrapper from "@/hoc/WindowWrapper";
import useLocationStore, { type LocationStore } from "@/store/location";
import useWindowStore from "@/store/window";
import type {
  FileType,
  WindowConfigIdKeyType,
  WindowDataInterface,
  WorkLocationInterface,
} from "@/types";
import clsx from "clsx";
import { Search } from "lucide-react";

const fileCheck = ["fig", "url"] as unknown as FileType;

function Finder() {
  const { openWindow } = useWindowStore();
  const { activeLocations, setActiveLocation } = useLocationStore();
  if (!activeLocations) return;

  console.log("activeLocations >>>", activeLocations);
  // console.log("Object.values(locations) >>>", Object.values(locations));

  const openItem = (item: WindowDataInterface) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder")
      //! check
      return setActiveLocation(item as unknown as LocationStore);
    if (fileCheck.includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    // console.log("openItem item >>>", item);
    // console.log("openWindow >>", `${item.fileType}${item.kind}`, "<ul >", item);
    openWindow(`${item.fileType}${item.kind}` as WindowConfigIdKeyType, item);
  };

  const renderList = (
    name: string,
    items: WorkLocationInterface["children"]
  ) => {
    // console.log(`renderList ${name} items >>>`, items);
    return (
      <div>
        <h3>{name}</h3>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => setActiveLocation(item)}
              className={clsx(
                item.id === activeLocations?.id ? "active" : "not-active"
              )}
            >
              <img src={item.icon} className="w-4" alt={item.name} />
              <p className="text-sm font-medium truncate">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          {renderList("Favorite", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>

        <ul className="content">
          {activeLocations?.children?.map((item) => {
            // console.log(
            //   "activeLocations content in Finder >>>",
            //   activeLocations
            // );
            if (!("position" in item)) return null;
            return (
              <li
                key={item.id}
                className={item?.position}
                onClick={() => openItem(item as WindowDataInterface)}
              >
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
