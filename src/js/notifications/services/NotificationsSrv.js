export class NotificationSrv {
    constructor ($timeout) {
        this.notifCounter = 0;
        this.$timeout = $timeout;        
        this.notificationsList = [];
        this.typeList = ['error', 'warning', 'info', 'success'];
    }
    
    notify (msg, msgType, delay) {
        var _me = this;
        var id = 'notif-' + this.notifCounter++;                
        if (this.typeList.indexOf(msgType) <= 0) {
            // 0 inclusive to transform an error to a danger class
            msgType = 'danger';
        }
        this.notificationsList.push({id: id, msg: msg, msgType: msgType});
        this.$timeout(function () {
            _me.remove();
        }, (delay || 5) * 1000);
        return id;
    }
    remove (id) {
        if (typeof id !== 'undefined') {
            for (var i=this.notificationsList.length-1; i>=0; i--) {
                if (this.notificationsList[i].id === id) {
                    this.notificationsList.splice(i, 1);
                    break;
                }                
            }
        }
    }
}
