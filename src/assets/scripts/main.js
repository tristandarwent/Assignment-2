// Wait for DOM to Load *
jQuery(function($) {
    
    // Create New Socket Connection using Socket.io *
    var socket = io();

    // Variables to hold X and Y positions for dragging the planets
    var downX, downY;
    var moveX, moveY;
    var distX, distY;

    // Calls function when click down is performed on planet class div
    $('.planet').bind('mousedown', function(e1){

        // Gets current position of cursor on mousedown
        downX = e1.clientX;
        downY = e1.clientY;

        // Gets current position of clicked on div on mousedown
        var shapeX = parseInt($(this).css('left'));
        var shapeY = parseInt($(this).css('top'));

        // Calls function when mouse is moved while click is still being held
        $(this).bind('mousemove', function(e2) {

            // Gets current position of cursor when moved
            moveX = e2.clientX;
            moveY = e2.clientY;

            // Calculates distance between mousedown and mousemove
            distX = moveX - downX;
            distY = moveY - downY;

            // Sets new coordinates based on cursor distance and position of div
            var newX = shapeX + distX;
            var newY = shapeY + distY;

            // Sets the top and left css properties with the new coordinates
            $(this).css('left', newX);
            $(this).css('top', newY);

            // Gets the id of the currently clicked on planet
            var shapeId = $(this).attr('id');

            // Emits id and coordinates of planet while being moved
            socket.emit('moveShape', shapeId, newX, newY);
        });
    });
    
    // When mouse button is released, remove the mousemove function from planets
    $(document).mouseup(function() {
        $('.planet').unbind('mousemove');
    });

    // Updates planets with new positions through sockets
    socket.on('update', function(id, x, y){
        $('#' + id).css('left', x);
        $('#' + id).css('top', y);
    });

});