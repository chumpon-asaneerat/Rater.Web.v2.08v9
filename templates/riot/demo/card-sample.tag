<card-sample>    
    <flip-container ref="flipper">
        <yield to="front">
            <div ref="view" class="view">
                <img src="public/assets/images/png/books/book1.png" style="width: 100%; height: auto;">
            </div>                
        </yield>
        <yield to="back">
            <div ref="entry" class="entry">
                <h1>John Doe</h1>
                <p>Architect & Engineer</p>
                <p>We love that guy</p>
            </div>
        </yield>
    </flip-container>
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
        }
    </style>
    <script>
        let self = this;
        let flipper, view, entry;

        let bindEvents = () => {
            view.addEventListener('click', toggle);
            entry.addEventListener('click', toggle);
        }
        let unbindEvents = () => {
            entry.removeEventListener('click', toggle);
            view.removeEventListener('click', toggle);
        }

        this.on('mount', () => {
            flipper = self.refs['flipper'];
            // The view/entry is in yield scope cannot be access via self variable.
            view = flipper.refs['view'];
            entry = flipper.refs['entry'];
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
            entry = null;
            view = null;
            flipper = null;            
        });

        let toggle = () => {            
            flipper.toggle();
        }
    </script>
</card-sample>