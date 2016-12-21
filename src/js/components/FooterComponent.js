class FooterController {
    constructor(version) {
        this.frontVersion =  version.front;
    }
}



export default {
    templateUrl: '/tpl/ui/base/footer.html',
    controller: FooterController
};