<card-sample>    
    <flip-container>
        <yield to="front">
            <img src="public/assets/images/png/books/book1.png" style="width: 100%; height: auto;">
        </yield>
        <yield to="back">
            <h1>John Doe</h1>
            <p>Architect & Engineer</p>
            <p>We love that guy</p>
        </yield>
    </flip-container>
    <style>
        :scope {
            margin: 0 auto;
            padding: 0;
            width: 100%;
            height: 100%;
        }
    </style>
</card-sample>