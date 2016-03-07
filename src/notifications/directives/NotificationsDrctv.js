angular.module('84.notifications')
    .directive('notifications', [function () {
        return {
            replace : true,
            restrict : 'A',
            templateUrl : '/app/notifications/views/NotificationMessage.html',
            scope : {
                notifications : '=notificationsAttr'
            },
            /*link: function(scope, elem, attrs) {
                scope.$watch('notifications', function(value) {
                    alert(value);
                });
                scope.clearNotifications = function() {
                    scope.notificationsList = [];   
                }
            }*/
            controller: function ($scope, notificationSrv) {
                var counter = 0;
                
                $scope.notifications = notificationSrv.notificationsList;
                $scope.$watch('notificationSrv.notificationsList', function(newValue, oldValue) {
                    console.debug(oldValue);
                    console.debug(newValue);
                    $scope.notifications = notificationSrv.notificationsList;
                });
                
                $scope.addNotification = function (msg, msgType) {
                    counter++;
                    msg += counter;
                    notificationSrv.notify(msg, msgType, 5);
                }
                
                $scope.addNotification('This is a notification', 'info');
            }
        };
    }]);