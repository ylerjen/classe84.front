export function NotificationDrctv ($timeout) {
    return {
        replace : true,
        restrict : 'A',
        templateUrl : '/src/js/notifications/views/NotificationMessage.html',
        scope : {
            notifications : '=notificationsAttr'
        },
        controller: function ($scope, notificationSrv) {            
            $scope.notifications = notificationSrv.notificationsList;
            $scope.$watch('notificationSrv.notificationsList', function(newValue, oldValue) {
                $scope.notifications = notificationSrv.notificationsList;
            });
            
            $scope.addNotification = function (msg, msgType, delay) {
                notificationSrv.notify(msg, msgType, delay);
            };
            
            $scope.removeNotification = function (id) {
                
                notificationSrv.remove(id);
                return false;
            };
            
            $scope.addNotification('This is a notification', 'info', 10);
        }
    };
}