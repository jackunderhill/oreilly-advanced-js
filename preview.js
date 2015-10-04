var Preview = (function() {
    
    var preview = {},
        div,
        img

    function setupLinks() {
        // find all links with data-preview
        var links = document.querySelectorAll('a[data-preview]')

        for (var i = 0; i < links.length; i++) {
            // attach click handlers
            links[i].onclick = openOverlay
        }
    }

    function createOverlay() {
        // create containing div
        div = document.createElement('div')
        div.className = 'previewOverlay'

        // insert img element
        img = document.createElement('img')
        div.appendChild(img)

        // add close button
        var close = document.createElement('a')
        close.className = 'close'

        // add click handler to button
        close.onclick = closeOverlay

        div.appendChild(close)

        // add div to page
        document.body.insertBefore(div, document.body.firstChild)

        // set up escape key control
        document.onkeydown = function(e) {
            e = e || window.event;
            if (e.keyCode == 27 && div.style.display === 'block') {
                closeOverlay()
            }
        }
    }

    function openOverlay(e) {
        // prevent click
        e.preventDefault()

        // insert correct img src
        img.src = e.target.href

        // show overlay
        div.style.display = 'block'

    }

    function closeOverlay() {
        div.style.display = 'none'
    }

    preview.init = function() {
        setupLinks()
        createOverlay()
    }

    return preview

})();