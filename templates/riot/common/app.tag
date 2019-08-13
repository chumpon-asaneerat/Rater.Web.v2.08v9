<app>
    <yield/>
    <p>this is generate by riot v3.x. id: '{ opts.id }', text: '{ opts.text }'</p>
    <p>loca data: { lang.id } and { lang.text } </p>
    <button onclick={ change }>Change</button>
    <style>
    </style>
    <script>
        let self = this;
        self.lang = {
            id: 'EN', text: 'English'
        }
        console.log('opts:', self.opts)

        change = (e) => {
            console.log('change button click!')
            if (self.lang.id === 'EN') {
                self.lang = {
                    id: 'TH', text: 'ไทย'
                }
            }
            else {
                self.lang = {
                    id: 'EN', text: 'English'
                }
            }
            console.log(self.lang)
        }
    </script>
</app>
