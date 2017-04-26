export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'new',
        data: {
          menu: {
            title: 'New Page',
            icon: 'ion-android-home', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      }
    ]
  }
];
