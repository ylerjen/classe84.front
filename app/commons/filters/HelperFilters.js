angular.module('84.filters').filter('tel', function () {
    return function (tel) {
        if (!tel.trim()) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        if (value.indexOf(0) === '+') {
            // +41 79 123 45 67
            tel = value.substring(0, 3) + value.substring(3, 5) + value.substring(5, 8) + value.substring(8, 10) + value.substring(10, 12);
        } else {
            // 079 123 45 67
            tel = value.substring(0, 3) + value.substring(3, 6) + value.substring(6, 8) + value.substring(8, 10);
        }
        return tel;
    }
});