<osd>
    <div ref="msgbox" class="msg error">
    </div>
    <style>
        :scope {
            display: inline-block;
            position: absolute;
            margin: 0 auto;
            padding: 0;
            left: 50%;
            margin-left: -100px;
            right: 50px;
            bottom: 50px;
            z-index: 1000;
            background-color: transparent;
        }
        :scope .msg {
            display: block;
            position: relative;
            margin: 0;
            padding: 5px;
            padding-bottom: 10px;
            height: auto;
            width: 200px;
            color: white;
            background-color: rgba(0, 0, 0, .7);
            text-align: center;
            border: 0;
            border-radius: 8px;
            user-select: none;
            visibility: hidden;
        }
        :scope .msg.show {
            visibility: visible;
        }
        :scope .msg.show.info {
            color: whitesmoke;
            background-color: rgba(0, 0, 0, .7);
        }
        :scope .msg.show.warn {
            color: black;
            background-color: rgba(255, 255, 0, .7);
        }
        :scope .msg.show.error {
            color: yellow;
            background-color: rgba(255, 0, 0, .7);
        }
    </style>
    <script>
        //#region local variables

        let self = this;

        //#endregion

        //#region controls variables and methods

        let msgbox;
        let initCtrls = () => {
            msgbox = self.refs['msgbox'];            
        }
        let freeCtrls = () => {
            msgbox = null;
        }
        let clearInputs = () => {
            if (msgbox) msgbox.innerText = '';
        }

        //#endregion

        //#region events bind/unbind

        let bindEvents = () => {
            document.addEventListener('app:info', onInfo);
            document.addEventListener('app:warning', onWarn);
            document.addEventListener('app:error', onError);
        }
        let unbindEvents = () => {
            document.removeEventListener('app:error', onError);
            document.removeEventListener('app:warning', onWarn);
            document.removeEventListener('app:info', onInfo);
        }

        //#endregion

        //#region riot handlers

        this.on('mount', () => {
            initCtrls();
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            freeCtrls();
        });

        //#endregion

        //#region dom event handlers

        let onInfo = (e) => {
            let msg = e.detail.msg;
            if (msgbox) {
                msgbox.innerText = msg;
                msgbox.classList.add('info')
                msgbox.classList.add('show')
                autoClose();
            }
        }
        let onWarn = (e) => {
            let msg = e.detail.msg;
            if (msgbox) {
                msgbox.innerText = msg;
                msgbox.classList.add('warn')
                msgbox.classList.add('show')
                autoClose();
            }
        }
        let onError = (e) => {
            let msg = e.detail.msg;
            if (msgbox) {
                msgbox.innerText = msg;
                msgbox.classList.add('error')
                msgbox.classList.add('show')
                autoClose();
            }
        }

        //#endregion

        //#region private methods

        let close = () => {
            msgbox.classList.remove('info')
            msgbox.classList.remove('warn')
            msgbox.classList.remove('error')
            msgbox.classList.remove('show')
            msgbox.innerText = '';            
        }

        let autoClose = () => { setTimeout(() => { close(); }, 5000) };
        
        //#endregion
    </script>
</osd>