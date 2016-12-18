const menuItems = [
  'about',
  'user',
  'event',
  'admin',
  'gallery',
  'contact'
];

class NavigationController {
    constructor() {
        this.navItems = menuItems;
        this.activeTab = 0;
    }
    isActive(index) {
        return this.activeTab === index;
    }
    select(index) {
        this.activeTab = index;
    }
}

export default {
    templateUrl: 'tpl/ui/nav.html',
    controller: NavigationController
}