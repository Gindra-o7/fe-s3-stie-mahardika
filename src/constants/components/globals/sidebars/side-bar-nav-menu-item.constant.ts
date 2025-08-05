import { SideBarNavMenuItemsProps } from "@/interfaces/components/globals/sidebars/side-bar-nav-menu.interface";
import {
  BackpackIcon,
  LucideHistory,
} from "lucide-react";

export const SideBarNavMenuItems: SideBarNavMenuItemsProps = {
  mahasiswa: [
    {
      label: "Muroja'ah",
      menus: [
        {
          title: "Detail Riwayat",
          url: "/mahasiswa/murojaah/detail-riwayat",
          icon: LucideHistory,
        },
      ],
    },
  ],
  dosen: [
    {
      label: "Muroja'ah",
      menus: [
        {
          title: "Mahasiswa PA",
          url: "/dosen/murojaah/mahasiswa-pa",
          icon: BackpackIcon,
        },
      ],
    },
  ],
};
