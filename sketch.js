background(200);
cnv=createCanvas(400,400);
  var p = (windowWidth - width) / 2;
var q = (windowHeight - height) / 2;
cnv.position(p, q);
for(var i=0;i<grid.length;i++)
  {
    grid[i].show();
  }
var next=current.checkNeighbors();
  if(next)
    {
      next.visited=true;
      stack.push(current);
      removeWalls(current,next);
      current=next;
    }
  else if(stack.length>0)
  {
    current=stack.pop();
  }
current.highlight();
}
