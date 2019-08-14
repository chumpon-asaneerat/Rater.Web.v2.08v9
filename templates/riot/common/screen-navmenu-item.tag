<screen-navmenu-item>
    <div class="home-icon">
        <a href="#">
            <span class="fas fa-home"></span>
        </a>
    </div>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0, 2px;
            display: grid;
            grid-template-rows: 1fr;
            grid-template-columns: 1fr;
            grid-template-areas: 
                'home-icon';
            align-items: center;
            justify-content: stretch;
        }
        .home-icon {
            grid-area: home-icon;
            color: whitesmoke;
        }
        a {
            margin: 0 auto;
            color: whitesmoke;
        }
        a:link, a:visited { text-decoration: none; }
        a:hover, a:active {
            color: yellow;
            text-decoration: none;
        }
    </style>
    <script></script>
</screen-navmenu-item>