<app>
    <p>this is generate by riot v3.x. id: '{ opts.id }', text: '{ opts.text }'</p>
    <p>loca data: { lang.id } and { lang.text } </p>
    <button ref="change-button">Change</button>
    <button ref="call-button">Callme</button>
    <yield/>
    <style>
        :scope {
            margin: 0 auto;
        }
    </style>
    <script>
        let self = this;
        self.lang = { id: 'EN', text: 'English' };

        console.log('opts:', this.opts)
        console.log('refs:', this.refs)
        console.log('tags:', this.tags)

        let change = (e) => {
            //console.log('change language.')
            if (self.lang.id === 'EN') {
                self.lang = { id: 'TH', text: 'ไทย' }
            }
            else {
                self.lang = { id: 'EN', text: 'English' }
            }
            //console.log(self.lang)
            self.update();
        }

        let cnt = 0;

        let callMe = (e) => {
            let footer = self.tags['page-footer'];
            footer.callme('test' + cnt++);
        }
        
        let changeButton = null;
        let callButton = null;
        
        let bindEvents = () => {
            changeButton = self.refs["change-button"];
            callButton = self.refs["call-button"];

            //console.log(changeButton)
            changeButton.addEventListener('click', change)
            callButton.addEventListener('click', callMe)
        }
        let unbindEvents = () => {
            changeButton = self.refs["change-button"];
            callButton = self.refs["call-button"];

            //console.log(changeButton)
            changeButton.removeEventListener('click', change)
            callButton.removeEventListener('click', callMe)

            callButton = null;
            changeButton = null;
        }

        // riot handlers.
        this.on('mount', () => {
            bindEvents();

            console.log('Screens:', this.tags['screen'])
        });
        this.on('unmount', () => {
            unbindEvents();
        });
    </script>
</app>
