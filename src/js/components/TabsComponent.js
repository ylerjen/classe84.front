export var TabsComponent = {
  transclude: true,
  controller: function MyTabsController() {
    var panes = this.panes = [];
    this.select = function(pane) {
      angular.forEach(panes, function(pane) {
        pane.selected = false;
      });
      pane.selected = true;
    };
    this.addPane = function(pane) {
      if (panes.length === 0) {
        this.select(pane);
      }
      panes.push(pane);
    };
  },
  templateUrl: '/src/js/components/tpl/tabs.html'
};

export var TabPaneComponent = {
  transclude: true,
  require: {
    tabsCtrl: '^tabs'
  },
  bindings: {
    title: '@',
    icon: '@'
  },
  controller: function() {
    this.$onInit = function() {
      this.tabsCtrl.addPane(this);
      console.log(this);
    };
  },
  templateUrl: '/src/js/components/tpl/tab-pane.html'
};