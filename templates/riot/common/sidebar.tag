<sidebar>
    <p>
    Context
    A new context is created for each item. These are tag instances. When loops are nested, all the children tags in the loop inherit any of their parent loop’s properties and methods they themselves have undefined. In this way, Riot avoids overriding things that should not be overridden by the parent tag.
    The parent can be explicitly accessed through the parent variable. For example:
    In the looped element everything but the each attribute belongs to the child context, so the title can be accessed directly and remove needs to be prefixed with parent. since the method is not a property of the looped item.
    The looped items are tag instances. Riot does not touch the original items so no new properties are added to them.
    After the event handler is executed the current tag instance is updated using this.update() (unless you set e.preventUpdate to true in your event handler) which causes all the looped items to execute as well. The parent notices that an item has been removed from the collection and removes the corresponding DOM node from the document.
    </p>
    <style>
        :scope {
            margin: 0 auto;
            background: silver;
        }
    </style>
    <script>
    </script>
</sidebar>