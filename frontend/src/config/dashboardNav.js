import {
  HiOutlineChartBar,
  HiOutlineHome,
  HiOutlineWallet,
  HiOutlineArrowsRightLeft,
} from "react-icons/hi2";

/**
 * Central nav config — add new dashboard sections here without touching Sidebar markup.
 */
export const dashboardNavItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: HiOutlineHome,
    end: true,
  },
  {
    label: "Transactions",
    path: "/dashboard/transactions",
    icon: HiOutlineArrowsRightLeft,
  },
  {
    label: "Budgets",
    path: "/dashboard/budgets",
    icon: HiOutlineWallet,
  },
  {
    label: "Analytics",
    path: "/dashboard/analytics",
    icon: HiOutlineChartBar,
  },
];
