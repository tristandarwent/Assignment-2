// Wait for DOM to Load
jQuery(function($) {
    
    // Create New Socket Connection using Socket.io
    var socket = io();

    var downX, downY;
    var moveX, moveY;
    var distX, distY;

    $("body").append("<div class='box shape'></div>");
    $("body").append("<div class='circle shape'></div>");

    $('.shape').bind('mousedown', function(e1){

        downX = e1.clientX;
        downY = e1.clientY;
        var shapeX = parseInt($(this).css('left'));
        var shapeY = parseInt($(this).css('top'));

        $(this).bind('mousemove', function(e2) {
            moveX = e2.clientX;
            moveY = e2.clientY;

            distX = moveX - downX;
            distY = moveY - downY;

            var newX = shapeX + distX;
            var newY = shapeY + distY;

            $(this).css('left', newX);
            $(this).css('top', newY);

            socket.emit('shapeValues', newX, newY);
        });
    });

    $(document).mouseup(function() {
        $('.shape').unbind('mousemove');
    });

    socket.on('update', function(x, y){

    });

});