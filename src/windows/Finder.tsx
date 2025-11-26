import { WindowControls } from "@/components";
import { locations } from "@/constants";
import WindowWrapper from "@/hoc/WindowWrapper";
import useLocationStore, { type locationType } from "@/store/location";
import useWindowStore from "@/store/window";
import clsx from "clsx";
import { Search } from "lucide-react";

function Finder() {
  const { openWindow } = useWindowStore();
  const { activeLocations, setActiveLocation } = useLocationStore();
  // console.log("Object.values(locations) >>>", Object.values(locations));

  const openItem = (item: any) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    console.log("openItem item >>>", item);
    openWindow(`${item.fileType}${item.kind}}` as any, item);
  };

  const renderList = (name: string, items: Partial<locationType>[]) => (
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
          {activeLocations?.children?.map((item: any) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
