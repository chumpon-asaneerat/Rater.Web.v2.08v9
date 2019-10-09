<gallery>
    <div class="gallery-panel">
        <yield/>
    </div>
    <style>
        :scope {
            margin: 0;
            padding: 0;
            width: 100%;
            max-height: 90%;
        }
        :scope .gallery-panel {
            margin: 0;
            padding: 0;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            grid-template-rows: 1fr;        
            grid-gap: 3px;
        }
    </style>
    <script></script>
</gallery>