angular.module('84.notifications')
    .service('notificationSrv', function ($timeout) {
        var _me = this;
        this.notificationsList = [];
        var typeList = ['error', 'warning', 'info', 'success'];
        this.notify = function (msg, msgType, delay) {
            if(typeList.indexOf(msgType) <= 0) {
                // 0 inclusive to transform an error to a danger class
                msgType = 'danger';
            }
            this.notificationsList.push({msg: msg, msgType: msgType});
            
            $timeout(function () {
                _me.remove();
            }, (delay || 5) * 1000);
        },
        this.remove = function (idx) {
            if(!idx) {
                idx = 0;
            }
            _me.notificationsList.splice(idx,1);
        }
    });