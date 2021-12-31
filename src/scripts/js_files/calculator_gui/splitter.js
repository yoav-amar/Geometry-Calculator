// A function is used for dragging and moving
function dragElement(separator, direction, first_div, second_div)
{
    let md; // remember mouse down info
    const first  = document.getElementById(first_div);
    const second = document.getElementById(second_div);

    separator.onmousedown = onMouseDown;

    function onMouseDown(e)
    {
        md = {e,
              offsetLeft:  separator.offsetLeft,
              offsetTop:   separator.offsetTop,
              firstWidth:  first.offsetWidth,
              secondWidth: second.offsetWidth,
              firstHeight:  first.offsetHeight,
              secondHeight: second.offsetHeight
             };

        document.onmousemove = onMouseMove;
        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
        }
    }

    function onMouseMove(e)
    {
        let delta = {
            x: e.clientX - md.e.clientX,
            y: e.clientY - md.e.clientY
        };

        if (direction === "H" ) // Horizontal
        {
            // Prevent negative-sized elements
            delta.x = Math.min(Math.max(delta.x, -md.firstWidth),
                       md.secondWidth);

            let total_width = md.firstWidth + md.secondWidth;
            let first_width = Math.round(((md.firstWidth + delta.x) / total_width) * 100);
            let second_width = 100 - first_width;

            separator.style.left = md.offsetLeft + delta.x + "px";
            first.style.width = first_width + "%";
            second.style.width = second_width + "%";
        }

        if (direction === "V" ) // Vertical
        {
            // Prevent negative-sized elements
            delta.y = Math.min(Math.max(delta.y, -md.firstHeight),
                       md.secondHeight);

            let total_height = md.firstHeight + md.secondHeight;
            let first_height= Math.round(((md.firstHeight + delta.y) / total_height) * 100);
            let second_height = 100 - first_height;

            separator.style.bottom = md.offsetTop + delta.y + "px";
            first.style.height = first_height + "%";
            second.style.height = second_height + "%";
        }
    }
}


dragElement( document.getElementById("horizontal_separator"), "H", "data_space", "painter");
dragElement( document.getElementById("vertical_separator"), "V", "draw_space", "tool_bar");