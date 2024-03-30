/*
 * Main and demo navigation arrays
 *
 * 'to' attribute points to the route name, not the path url
 */

export default {
  main: [
    {
      name: "Dashboard",
      to: "dashboard",
      icon: "si si-speedometer",
    },
    {
      name: "Items List",
      icon: "fa fa-gift",
      subActivePaths: "/items",
      sub: [
        {
          name: "Items List",
          to: "item-list",
        },
      ],
    },
    {
      name: "Category List",
      icon: "fa-user-secret",
      subActivePaths: "/categories",
      sub: [
        {
          name: "Category",
          to: "category-list",
        },
      ],
    },
    {
      name: "Sub Category List",
      icon: "fa-user-secret",
      subActivePaths: "/sub-categories",
      sub: [
        {
          name: "Sub Category",
          to: "sub-categories",
        },
      ],
    },
  ],
};
