export class NotificationSrv {
    constructor ($timeout) {
        this.$timeout = $timeout;        
        this.notificationsList = [];
        this.typeList = ['error', 'warning', 'info', 'success'];
    }
    
    notify (msg, msgType, delay) {
        var _me = this;
        if(this.typeList.indexOf(msgType) <= 0) {
            // 0 inclusive to transform an error to a danger class
            msgType = 'danger';
        }
        this.notificationsList.push({msg: msg, msgType: msgType});
        
        this.$timeout(function () {
            _me.remove();
        }, (delay || 5) * 1000);
    }
    remove (idx) {
        if(!idx) {
            idx = 0;
        }
        this.notificationsList.splice(idx,1);
    }
}