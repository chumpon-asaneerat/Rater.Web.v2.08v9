<app>
    <yield/>
    <p>this is generate by riot v3.x. id: '{ opts.id }', text: '{ opts.text }'</p>
    <p>loca data: { lang.id } and { lang.text } </p>
    <button ref="change-button">Change</button>
    <style>
        :scope {
            margin: 0 auto;
        }
    </style>
    <script>
        let self = this;
        self.lang = { id: 'EN', text: 'English' };

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
        let changeButton = null;
        
        let bindEvents = () => {
            changeButton = self.refs["change-button"];
            //console.log(changeButton)
            changeButton.addEventListener('click', change)
        }
        let unbindEvents = () => {
            changeButton = self.refs["change-button"];
            //console.log(changeButton)
            changeButton.removeEventListener('click', change)
        }

        // riot handlers.
        this.on('mount', () => {
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
        });
    </script>
</app>
