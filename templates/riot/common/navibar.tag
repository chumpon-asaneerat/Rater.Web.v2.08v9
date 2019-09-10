<navibar>
    <div class="banner">
        <div>app</div>
    </div>
    <language-menu></language-menu>
    <links-menu></links-menu>
    <style>
        :scope {
            width: 100vw;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 90px 40px;
            grid-template-rows: 1fr;
            grid-template-areas: 
                'banner lang-menu links-menu';
            background: cornflowerblue;
            color: whitesmoke;
            user-select: none;
        }
        .banner {
            grid-area: banner;
            margin: 0;
            padding: 0 3px;
            display: flex;
            align-items: center;
            justify-content: stretch;
        }
        language-menu {
            grid-area: lang-menu;
            margin: 0 auto;
            padding: 0 3px;
            display: flex;
            align-items: center;
            justify-content: stretch;
        }
        links-menu {
            grid-area: links-menu;
            margin: 0 auto;
            padding: 0 3px;
            display: flex;
            align-items: center;
            justify-content: stretch;
        }
    </style>
    <script>
        let self = this;

        let bindEvents = () => {}
        let unbindEvents = () => {}

        this.on('mount', () => {
            bindEvents();
        });
        this.on('unmount', () => {
            unbindEvents();
        });
    </script>
</navibar>