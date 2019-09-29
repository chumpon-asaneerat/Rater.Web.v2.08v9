<card-sample>    
    <dual-screen ref="flipper">
        <yield to="viewer">
            <div ref="view" class="view">
                <img src="public/assets/images/png/books/book1.png" style="width: 100%; height: auto;">
            </div>                
        </yield>
        <yield to="entry">
            <div ref="entry" class="entry">
                <div class="head">
                    <h1>John Doe</h1>
                    <p>Architect & Engineer</p>
                    <p>We love that guy</p>
                </div>
                <div class="input-ui">
                    <input type="text" value="" placeholder="enter some text">
                    <button ref="submit">Submit</button>
                </div>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>We love that guy</p>
                <p>Architect & Engineer</p>
            </div>
        </yield>
    </dual-screen>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
        }
        .view, .entry {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .head {
            text-align: center;
        }
        .input-ui {
            margin: 0 auto;
            padding: 5px;
            width: auto;
        }
    </style>
    <script>
        let self = this;
        //let flipper, view, entry;
        let flipper, view, submit;

        let bindEvents = () => {
            view.addEventListener('click', toggle);
            //entry.addEventListener('click', toggle);
            submit.addEventListener('click', toggle);
        }
        let unbindEvents = () => {
            submit.removeEventListener('click', toggle);
            //entry.removeEventListener('click', toggle);
            view.removeEventListener('click', toggle);
        }

        this.on('mount', () => {
            flipper = self.refs['flipper'];
            // The view/entry is in yield scope cannot be access via self variable.
            view = flipper.refs['view'];
            //entry = flipper.refs['entry'];
            submit = flipper.refs['submit'];
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            submit = null;
            //entry = null;
            view = null;
            flipper = null;            
        });

        let toggle = () => {            
            flipper.toggle();
        }
    </script>
</card-sample>