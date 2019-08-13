riot.tag2('app', '<yield></yield> <p>this is generate by riot v3.x. id: \'{opts.id}\', text: \'{opts.text}\'</p> <p>loca data: {lang.id} and {lang.text} </p> <button ref="change-button">Change</button>', 'app,[data-is="app"]{ margin: 0 auto; }', '', function(opts) {
        let self = this;
        self.lang = { id: 'EN', text: 'English' };

        let change = (e) => {

            if (self.lang.id === 'EN') {
                self.lang = { id: 'TH', text: 'ไทย' }
            }
            else {
                self.lang = { id: 'EN', text: 'English' }
            }

            self.update();
        }
        let changeButton = null;

        let bindEvents = () => {
            changeButton = self.refs["change-button"];

            changeButton.addEventListener('click', change)
        }
        let unbindEvents = () => {
            changeButton = self.refs["change-button"];

            changeButton.removeEventListener('click', change)
        }

        this.on('mount', () => {
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
        });
});
