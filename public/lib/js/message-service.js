//#region MessageService class

class MessageService {
    warn(value) {
        if (value) {
            let evt = new CustomEvent('app:warning', { detail: { msg: value }})
            document.dispatchEvent(evt);
        }
    }
    info(value) {
        if (value) {
            let evt = new CustomEvent('app:info', { detail: { msg: value }})
            document.dispatchEvent(evt);
        }
    }
    error(value) {
        if (value) {
            let evt = new CustomEvent('app:error', { detail: { msg: value }})
            document.dispatchEvent(evt);
        }
    }
}

window.logger = window.logger || new MessageService();

//#endregion
