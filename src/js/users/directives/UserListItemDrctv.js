export function UserListItemDrctv () {
    return {
        templateUrl: '/src/js/users/views/user-list-item.html',
        restrict: 'A',
        scope: {                
            user: "="
        }
    };
}