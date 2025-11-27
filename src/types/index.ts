interface LocationInterface {
  id: number;
  type: LocationType;
  name: string;
  icon: string;
  kind: Kind;
}

export type LocationType = "work" | "about" | "resume" | "trash";
export type Kind = "folder" | "file";
export type FileType = "txt" | "url" | "img" | "fig" | "pdf";

export interface WindowDataInterface {
  id: number;
  name: string;
  icon: string;
  kind: Kind;
  fileType: FileType;
  position?: string;
  href?: string;
  description?: string[];
  imageUrl?: string;
}

export interface WorkLocationInterface extends LocationInterface {
  children: {
    id: number;
    name: string;
    icon: string;
    kind: Kind;
    position: string;
    windowPosition: string;
    children: WindowDataInterface[];
  }[];
}

export interface AboutLocationInterface extends LocationInterface {
  children: {
    id: number;
    name: string;
    icon: string;
    kind: Kind;
    fileType: FileType;
    position: string;
    imageUrl?: string;
    subtitle?: string;
    image?: string;
    description?: string[];
  }[];
}

export interface ResumeLocationInterface extends LocationInterface {
  children: {
    id: number;
    name: string;
    icon: string;
    kind: Kind;
    fileType: "pdf";
    // you can add `href` if you want to open a hosted resume
    // href: "/your/resume/path.pdf",
  }[];
}

export interface TrashLocationInterface extends LocationInterface {
  children: {
    id: number;
    name: string;
    icon: string;
    kind: Kind;
    fileType: FileType;
    position: string;
    imageUrl: string;
  }[];
}

export interface AllLocationsInterface {
  work: WorkLocationInterface;
  about: AboutLocationInterface;
  resume: ResumeLocationInterface;
  trash: TrashLocationInterface;
}

export type WindowConfigInterface = {
  [id in WindowConfigIdKeyType]: {
    isOpen: boolean;
    zIndex: number;
    data: WindowDataInterface | null;
  };
};

export type WindowConfigIdKeyType =
  | "resume"
  | "trash"
  | "finder"
  | "contact"
  | "safari"
  | "photos"
  | "terminal"
  | "txtfile"
  | "imgfile";
